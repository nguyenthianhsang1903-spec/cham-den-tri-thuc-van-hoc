import React, { useRef, useState } from 'react';
import { useMusic, PlaylistItem } from '../context/MusicContext';
import {
  Music,
  Upload,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Repeat1,
  Shuffle,
  Volume2,
  VolumeX,
  Trash2,
  X,
  Disc3,
  Sparkles,
  FileAudio,
  CheckCircle2,
  AlertCircle,
  FolderPlus,
  Radio,
  SlidersHorizontal,
  Headphones
} from 'lucide-react';

interface MusicPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MusicPlayerModal: React.FC<MusicPlayerModalProps> = ({ isOpen, onClose }) => {
  const {
    playlist,
    currentTrackIndex,
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    repeatMode,
    isShuffle,
    uploadStatus,
    togglePlay,
    playTrack,
    nextTrack,
    prevTrack,
    seekTo,
    setVolume,
    toggleRepeat,
    toggleShuffle,
    uploadFiles,
    deleteTrack,
    clearCustomPlaylist,
  } = useMusic();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(volume);

  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    if (!secs || isNaN(secs) || !isFinite(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await uploadFiles(e.target.files);
      // Reset input value so same files can be re-selected if needed
      e.target.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await uploadFiles(e.dataTransfer.files);
    }
  };

  const handleToggleMute = () => {
    if (isMuted) {
      setVolume(previousVolume || 0.7);
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#25234A]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FFF9F0] w-full max-w-4xl max-h-[92vh] rounded-3xl shadow-2xl border-2 border-[#A78BFA] flex flex-col overflow-hidden text-[#25234A]">
        {/* Modal Header */}
        <div className="px-5 sm:px-8 py-4 bg-gradient-to-r from-[#25234A] via-[#332F63] to-[#25234A] text-white flex items-center justify-between border-b border-[#F5C76A]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#8B5CF6]/30 border border-[#F5C76A]/40 flex items-center justify-center text-[#F5C76A]">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif-literary text-lg sm:text-xl font-bold text-[#FFF9F0]">
                  Góc Âm Nhạc & Tải List Nhạc Cá Nhân
                </h3>
                <span className="hidden sm:inline text-[11px] font-sans px-2 py-0.5 rounded-full bg-[#F5C76A] text-[#25234A] font-bold">
                  12A03-K60
                </span>
              </div>
              <p className="text-xs text-white/75 font-sans">
                Tải lên các bài hát yêu thích (.mp3, .wav, .m4a) của bạn để vừa nghe vừa ôn bài Ngữ văn 12
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Đóng cửa sổ âm nhạc"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* UPLOAD DROPZONE SECTION */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-3xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 group ${
              isDragging
                ? 'border-[#8B5CF6] bg-[#8B5CF6]/15 scale-[1.01]'
                : 'border-[#8B5CF6]/40 hover:border-[#8B5CF6] bg-white hover:bg-[#F5EFE6]/60 shadow-xs'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="audio/*,.mp3,.wav,.m4a,.ogg,.flac,.aac"
              onChange={handleFileChange}
              className="hidden"
            />

            <div className="max-w-md mx-auto space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] text-white mx-auto flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <FolderPlus className="w-7 h-7 text-[#F5C76A]" />
              </div>

              <div>
                <p className="text-base sm:text-lg font-bold text-[#25234A]">
                  Bấm vào đây để tải bài hát của bạn lên
                </p>
                <p className="text-xs sm:text-sm text-[#25234A]/70 mt-1">
                  Hoặc kéo thả file trực tiếp vào đây (Hỗ trợ nhiều file cùng lúc: <strong>.MP3, .WAV, .M4A, .OGG</strong>)
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#A78BFA]/15 text-[#6D28D9] text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Tự động lưu vào trình duyệt của bạn – Không bị mất khi tải lại trang!</span>
              </div>
            </div>
          </div>

          {/* Upload Status Notification */}
          {uploadStatus && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center gap-2.5 animate-in slide-in-from-top-1">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{uploadStatus}</span>
            </div>
          )}

          {/* NOW PLAYING CONTROLLER CARD */}
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#25234A] to-[#342F66] text-white shadow-xl border border-[#F5C76A]/30">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Spinning Disc / Track Info */}
              <div className="md:col-span-5 flex items-center gap-4">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0">
                  <div
                    className={`w-full h-full rounded-full bg-gradient-to-tr from-stone-900 via-stone-800 to-stone-900 border-4 border-stone-700 shadow-xl flex items-center justify-center ${
                      isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
                    }`}
                  >
                    <div className="w-6 h-6 rounded-full bg-[#F5C76A] border-2 border-stone-900 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-stone-900" />
                    </div>
                  </div>
                  {isPlaying && (
                    <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500" />
                    </span>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-[#F5C76A]">
                      {currentTrack ? 'Nhạc của bạn' : 'Chưa có bài hát'}
                    </span>
                  </div>
                  <h4 className="font-serif-literary text-lg sm:text-xl font-bold text-white truncate mt-1">
                    {currentTrack?.title || 'Chưa chọn bài hát'}
                  </h4>
                  <p className="text-xs text-white/70 truncate mt-0.5">
                    {currentTrack?.artist || 'Chọn một bài trong danh sách bên dưới'}
                  </p>
                </div>
              </div>

              {/* Controls & Seeker */}
              <div className="md:col-span-7 space-y-3">
                {/* Scrubbing Bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-white/70 font-mono">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    onChange={(e) => seekTo(Number(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#F5C76A]"
                  />
                </div>

                {/* Main Action Buttons */}
                <div className="flex items-center justify-between pt-1">
                  {/* Shuffle Button */}
                  <button
                    onClick={toggleShuffle}
                    className={`p-2 rounded-xl transition-colors cursor-pointer ${
                      isShuffle ? 'text-[#F5C76A] bg-white/15' : 'text-white/60 hover:text-white'
                    }`}
                    title={isShuffle ? 'Tắt phát ngẫu nhiên' : 'Bật phát ngẫu nhiên'}
                  >
                    <Shuffle className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-3">
                    {/* Previous Track */}
                    <button
                      onClick={prevTrack}
                      className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer hover:scale-105 active:scale-95"
                      title="Bài trước"
                    >
                      <SkipBack className="w-5 h-5" />
                    </button>

                    {/* Play / Pause Primary Button */}
                    <button
                      onClick={togglePlay}
                      className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#F5C76A] to-[#E5B54F] text-[#25234A] flex items-center justify-center font-bold shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                      title={isPlaying ? 'Tạm dừng' : 'Phát nhạc'}
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6 fill-[#25234A]" />
                      ) : (
                        <Play className="w-6 h-6 fill-[#25234A] ml-0.5" />
                      )}
                    </button>

                    {/* Next Track */}
                    <button
                      onClick={nextTrack}
                      className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer hover:scale-105 active:scale-95"
                      title="Bài kế tiếp"
                    >
                      <SkipForward className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Repeat Mode */}
                  <button
                    onClick={toggleRepeat}
                    className={`p-2 rounded-xl transition-colors cursor-pointer ${
                      repeatMode !== 'none' ? 'text-[#F5C76A] bg-white/15' : 'text-white/60 hover:text-white'
                    }`}
                    title={
                      repeatMode === 'one'
                        ? 'Lặp lại 1 bài'
                        : repeatMode === 'all'
                        ? 'Lặp lại toàn bộ danh sách'
                        : 'Không lặp lại'
                    }
                  >
                    {repeatMode === 'one' ? <Repeat1 className="w-4 h-4" /> : <Repeat className="w-4 h-4" />}
                  </button>

                  {/* Volume Slider */}
                  <div className="hidden sm:flex items-center gap-2">
                    <button
                      onClick={handleToggleMute}
                      className="text-white/70 hover:text-white cursor-pointer"
                    >
                      {volume === 0 || isMuted ? (
                        <VolumeX className="w-4 h-4 text-rose-300" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => {
                        setIsMuted(false);
                        setVolume(Number(e.target.value));
                      }}
                      className="w-16 h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#F5C76A]"
                      title={`Âm lượng: ${Math.round(volume * 100)}%`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PLAYLIST SECTION */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#25234A]/10">
              <div className="flex items-center gap-3">
                <h4 className="font-serif-literary text-lg font-bold text-[#25234A]">
                  List nhạc của bạn ({playlist.length} bài)
                </h4>
                {playlist.length > 0 && (
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    Đã tải {playlist.length} bài
                  </span>
                )}
              </div>

              {playlist.length > 0 && (
                <button
                  onClick={() => {
                    if (window.confirm('Bạn có chắc muốn xóa tất cả các bài hát đã tải lên không?')) {
                      clearCustomPlaylist();
                    }
                  }}
                  className="p-1.5 px-3 rounded-xl text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors cursor-pointer text-xs flex items-center gap-1.5 font-bold border border-rose-200"
                  title="Xóa toàn bộ nhạc cá nhân"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Xóa hết nhạc đã tải</span>
                </button>
              )}
            </div>

            {/* Song Items List */}
            {playlist.length === 0 ? (
              <div className="text-center py-10 px-4 bg-white rounded-2xl border border-dashed border-[#25234A]/20 space-y-3">
                <FileAudio className="w-10 h-10 text-[#8B5CF6]/50 mx-auto" />
                <p className="text-sm font-bold text-[#25234A]">List nhạc của bạn đang trống</p>
                <p className="text-xs text-[#25234A]/70 max-w-sm mx-auto">
                  Hãy bấm vào ô tải nhạc ở phía trên để thêm các bài hát yêu thích (.mp3, .wav, .m4a) của bạn từ máy tính hoặc điện thoại!
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 rounded-xl bg-[#8B5CF6] text-white text-xs font-bold hover:bg-[#7C3AED] transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Tải bài hát ngay</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2 max-h-64 sm:max-h-80 overflow-y-auto pr-1">
                {playlist.map((track) => {
                  const isCurrent = currentTrack?.id === track.id;
                  const originalIndex = playlist.findIndex((t) => t.id === track.id);

                  return (
                    <div
                      key={track.id}
                      onClick={() => playTrack(originalIndex)}
                      className={`p-3 sm:p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 group ${
                        isCurrent
                          ? 'bg-[#8B5CF6]/15 border-[#8B5CF6] shadow-xs'
                          : 'bg-white hover:bg-[#FFF9F0] border-[#25234A]/10'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Play Indicator */}
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                            isCurrent
                              ? 'bg-[#8B5CF6] text-white'
                              : 'bg-[#25234A]/5 text-[#25234A] group-hover:bg-[#8B5CF6]/20 group-hover:text-[#6D28D9]'
                          }`}
                        >
                          {isCurrent && isPlaying ? (
                            <div className="flex items-end gap-0.5 h-3">
                              <span className="w-0.5 bg-white rounded-full animate-bounce h-3" />
                              <span className="w-0.5 bg-white rounded-full animate-bounce h-2 delay-75" />
                              <span className="w-0.5 bg-white rounded-full animate-bounce h-3.5 delay-150" />
                            </div>
                          ) : (
                            <Play className="w-4 h-4 ml-0.5" />
                          )}
                        </div>

                        {/* Title & Metadata */}
                        <div className="min-w-0">
                          <p
                            className={`text-sm font-bold truncate ${
                              isCurrent ? 'text-[#6D28D9]' : 'text-[#25234A]'
                            }`}
                          >
                            {track.title}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-[#25234A]/60 mt-0.5">
                            <span className="px-2 py-0.2 rounded-md bg-emerald-50 text-emerald-700 font-semibold text-[10px]">
                              File của bạn
                            </span>
                            {track.size && <span>{formatFileSize(track.size)}</span>}
                          </div>
                        </div>
                      </div>

                      {/* Right: Duration & Delete */}
                      <div className="flex items-center gap-3 shrink-0">
                        {track.duration > 0 && (
                          <span className="text-xs font-mono text-[#25234A]/70">
                            {formatTime(track.duration)}
                          </span>
                        )}

                        {track.isCustom && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteTrack(track.id);
                            }}
                            className="p-1.5 rounded-lg text-[#25234A]/40 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Xóa bài hát này"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer Note */}
        <div className="px-6 py-3.5 bg-white border-t border-[#25234A]/10 flex flex-wrap items-center justify-between gap-3 text-xs text-[#25234A]/70">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
            <span>Âm nhạc kích hoạt sóng não Alpha, giúp ghi nhớ tác phẩm văn học 12 nhanh gấp 2 lần.</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#25234A] text-white font-bold hover:bg-[#383466] transition-colors cursor-pointer"
          >
            Đóng lại
          </button>
        </div>
      </div>
    </div>
  );
};
