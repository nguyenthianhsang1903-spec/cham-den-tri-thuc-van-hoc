import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  saveAudioTrack,
  getAllAudioTracks,
  deleteAudioTrack,
  clearAllAudioTracks,
  StoredAudioTrack
} from '../utils/musicDB';
import { soundEngine } from '../utils/audioAmbience';

export interface PlaylistItem {
  id: string;
  title: string;
  artist: string;
  duration: number; // in seconds
  isCustom: boolean;
  size?: number;
  blob?: Blob;
  objectUrl?: string;
  sourceType: 'user_upload' | 'synthesizer';
}

interface MusicContextType {
  playlist: PlaylistItem[];
  currentTrackIndex: number;
  currentTrack: PlaylistItem | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  repeatMode: 'none' | 'all' | 'one';
  isShuffle: boolean;
  isModalOpen: boolean;
  isLoading: boolean;
  uploadStatus: string | null;

  // Actions
  togglePlay: () => void;
  playTrack: (index: number) => void;
  playTrackById: (id: string) => void;
  pause: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  seekTo: (seconds: number) => void;
  setVolume: (vol: number) => void;
  toggleRepeat: () => void;
  toggleShuffle: () => void;
  uploadFiles: (files: FileList | File[]) => Promise<number>;
  deleteTrack: (id: string) => Promise<void>;
  clearCustomPlaylist: () => Promise<void>;
  openModal: () => void;
  closeModal: () => void;
}

const DEFAULT_PRESET_TRACKS: PlaylistItem[ = [
  {
    id: "nhac-1",
    title: "Nhạc nền lạ",
    artist: "Lớp 12A03",
    duration: 180,
    isCustom: false,
    sourceType: "synthesizer",
    objectUrl: "/nhac-nen-la.mp3.mp3"
  },
  {
    id: "nhac-2",
    title: "Nhạc nền lofi",
    artist: "Lớp 12A03",
    duration: 180,
    isCustom: false,
    sourceType: "synthesizer",
    objectUrl: "/nhac-nen-loi.mp3.mp3"
  },
  {
    id: "nhac-3",
    title: "Nhạc nền mặt trời",
    artist: "Lớp 12A03",
    duration: 180,
    isCustom: false,
    sourceType: "synthesizer",
    objectUrl: "/nhac-nen-mat-troi.mp3.mp3"
  },
  {
    id: "nhac-4",
    title: "Nhạc nền nam",
    artist: "Lớp 12A03",
    duration: 180,
    isCustom: false,
    sourceType: "synthesizer",
    objectUrl: "/nhac-nen-nam.mp3.mp3"
  }
];

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playlist, setPlaylist] = useState<PlaylistItem[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolumeState] = useState<number>(0.7);
  const [repeatMode, setRepeatMode] = useState<'none' | 'all' | 'one'>('all');
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  // Hidden native audio element for custom uploaded tracks
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthTimerRef = useRef<number | null>(null);

  // Load custom tracks from IndexedDB on startup
  useEffect(() => {
    let isMounted = true;
    const loadStoredTracks = async () => {
      try {
        const stored = await getAllAudioTracks();
        if (!isMounted) return;

        const customItems: PlaylistItem[] = stored.map((t) => {
          const objectUrl = URL.createObjectURL(t.blob);
          return {
            id: t.id,
            title: t.name,
            artist: 'Nhạc của bạn tải lên',
            duration: t.duration || 0,
            size: t.size,
            isCustom: true,
            blob: t.blob,
            objectUrl,
            sourceType: 'user_upload',
          };
        });

        setPlaylist(customItems);
      } catch (e) {
        console.error('Failed to load stored custom tracks', e);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadStoredTracks();

    // Setup native audio element
    const audio = new Audio();
    audio.volume = volume;
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleAudioEnded = () => {
      handleNextTrack();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleAudioEnded);

    return () => {
      isMounted = false;
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleAudioEnded);
      audio.pause();
      soundEngine.stopMusic();
      if (synthTimerRef.current) clearInterval(synthTimerRef.current);
    };
  }, []);

  const currentTrack = playlist[currentTrackIndex] || null;

  // Watch volume change
  const setVolume = (newVol: number) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    setVolumeState(clamped);
    if (audioRef.current) {
      audioRef.current.volume = clamped;
    }
    soundEngine.setVolume(clamped);
  };

  // Internal trigger play for current track
  const executePlay = (track: PlaylistItem) => {
    if (track.sourceType === 'user_upload' && track.objectUrl) {
      // Stop synthesizer if it was playing
      soundEngine.stopMusic();
      if (synthTimerRef.current) clearInterval(synthTimerRef.current);

      if (audioRef.current) {
        if (audioRef.current.src !== track.objectUrl) {
          audioRef.current.src = track.objectUrl;
          audioRef.current.load();
        }
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn('Playback error:', err);
            setIsPlaying(false);
          });
      }
    } else {
      // Synthesizer track
      if (audioRef.current) {
        audioRef.current.pause();
      }
      soundEngine.stopMusic();
      soundEngine.toggleMusic();
      setIsPlaying(true);
      setCurrentTime(0);
      setDuration(track.duration || 180);

      if (synthTimerRef.current) clearInterval(synthTimerRef.current);
      synthTimerRef.current = window.setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= (track.duration || 180)) {
            handleNextTrack();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  const pause = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
    soundEngine.stopMusic();
    if (synthTimerRef.current) {
      clearInterval(synthTimerRef.current);
      synthTimerRef.current = null;
    }
  };

  const togglePlay = () => {
    if (playlist.length === 0) {
      openModal();
      return;
    }
    if (isPlaying) {
      pause();
    } else {
      if (!currentTrack && playlist.length > 0) {
        playTrack(0);
      } else if (currentTrack) {
        executePlay(currentTrack);
      }
    }
  };

  const playTrack = (index: number) => {
    if (index < 0 || index >= playlist.length) return;
    setCurrentTrackIndex(index);
    executePlay(playlist[index]);
  };

  const playTrackById = (id: string) => {
    const idx = playlist.findIndex((t) => t.id === id);
    if (idx !== -1) {
      playTrack(idx);
    }
  };

  const handleNextTrack = () => {
    if (playlist.length === 0) return;

    if (repeatMode === 'one' && currentTrack) {
      if (currentTrack.sourceType === 'user_upload' && audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      } else {
        executePlay(currentTrack);
      }
      return;
    }

    if (isShuffle && playlist.length > 1) {
      let nextIdx = Math.floor(Math.random() * playlist.length);
      if (nextIdx === currentTrackIndex) {
        nextIdx = (nextIdx + 1) % playlist.length;
      }
      playTrack(nextIdx);
      return;
    }

    const nextIndex = currentTrackIndex + 1;
    if (nextIndex < playlist.length) {
      playTrack(nextIndex);
    } else if (repeatMode === 'all') {
      playTrack(0);
    } else {
      pause();
    }
  };

  const nextTrack = () => {
    handleNextTrack();
  };

  const prevTrack = () => {
    if (playlist.length === 0) return;
    // If more than 3 seconds in, restart current track
    if (currentTime > 3) {
      seekTo(0);
      return;
    }
    const prevIndex = currentTrackIndex - 1;
    if (prevIndex >= 0) {
      playTrack(prevIndex);
    } else {
      playTrack(playlist.length - 1);
    }
  };

  const seekTo = (seconds: number) => {
    const clamped = Math.max(0, Math.min(duration, seconds));
    setCurrentTime(clamped);
    if (currentTrack?.sourceType === 'user_upload' && audioRef.current) {
      audioRef.current.currentTime = clamped;
    }
  };

  const toggleRepeat = () => {
    setRepeatMode((prev) => {
      if (prev === 'none') return 'all';
      if (prev === 'all') return 'one';
      return 'none';
    });
  };

  const toggleShuffle = () => {
    setIsShuffle((prev) => !prev);
  };

  // Upload user files to IndexedDB and add to current playlist
  const uploadFiles = async (files: FileList | File[]): Promise<number> => {
    const fileArray = Array.from(files).filter((f) =>
      f.type.startsWith('audio/') ||
      /\.(mp3|wav|m4a|aac|ogg|flac|webm)$/i.test(f.name)
    );

    if (fileArray.length === 0) {
      setUploadStatus('Vui lòng chọn file âm thanh hợp lệ (.mp3, .wav, .m4a, .ogg)!');
      setTimeout(() => setUploadStatus(null), 4000);
      return 0;
    }

    setUploadStatus(`Đang lưu ${fileArray.length} bài hát vào bộ nhớ của bạn...`);
    const newItems: PlaylistItem[] = [];

    for (const file of fileArray) {
      try {
        const stored: StoredAudioTrack = await saveAudioTrack(file);
        const objectUrl = URL.createObjectURL(stored.blob);
        newItems.push({
          id: stored.id,
          title: stored.name,
          artist: 'Nhạc của bạn tải lên',
          duration: stored.duration || 0,
          size: stored.size,
          isCustom: true,
          blob: stored.blob,
          objectUrl,
          sourceType: 'user_upload',
        });
      } catch (err) {
        console.error('Error saving audio file', file.name, err);
      }
    }

    if (newItems.length > 0) {
      // Put user uploaded tracks at the top of the playlist
      setPlaylist((prev) => [...newItems, ...prev]);
      setUploadStatus(`Thành công! Đã thêm ${newItems.length} bài hát vào List nhạc của bạn.`);
      setTimeout(() => setUploadStatus(null), 4000);

      // Automatically play the newly uploaded track if not playing
      if (!isPlaying) {
        setCurrentTrackIndex(0);
        executePlay(newItems[0]);
      }
    } else {
      setUploadStatus('Không thể lưu file. Vui lòng thử lại!');
      setTimeout(() => setUploadStatus(null), 4000);
    }

    return newItems.length;
  };

  const deleteTrack = async (id: string) => {
    const trackToDelete = playlist.find((t) => t.id === id);
    if (!trackToDelete || !trackToDelete.isCustom) return;

    if (trackToDelete.objectUrl) {
      URL.revokeObjectURL(trackToDelete.objectUrl);
    }

    await deleteAudioTrack(id);

    const newPlaylist = playlist.filter((t) => t.id !== id);
    setPlaylist(newPlaylist);

    // If deleting the currently playing track, switch to next or pause
    if (currentTrack?.id === id) {
      if (newPlaylist.length > 0) {
        const nextIdx = Math.min(currentTrackIndex, newPlaylist.length - 1);
        setCurrentTrackIndex(nextIdx);
        executePlay(newPlaylist[nextIdx]);
      } else {
        pause();
      }
    }
  };

  const clearCustomPlaylist = async () => {
    playlist.forEach((t) => {
      if (t.objectUrl) URL.revokeObjectURL(t.objectUrl);
    });
    await clearAllAudioTracks();
    setPlaylist(DEFAULT_PRESET_TRACKS);
    if (currentTrack?.isCustom) {
      pause();
      setCurrentTrackIndex(0);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <MusicContext.Provider
      value={{
        playlist,
        currentTrackIndex,
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        volume,
        repeatMode,
        isShuffle,
        isModalOpen,
        isLoading,
        uploadStatus,
        togglePlay,
        playTrack,
        playTrackById,
        pause,
        nextTrack,
        prevTrack,
        seekTo,
        setVolume,
        toggleRepeat,
        toggleShuffle,
        uploadFiles,
        deleteTrack,
        clearCustomPlaylist,
        openModal,
        closeModal,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
