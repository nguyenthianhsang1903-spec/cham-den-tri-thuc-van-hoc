import React from 'react';
import { useMusic } from '../context/MusicContext';
import { Play, Pause, SkipForward, Headphones, Music, FolderPlus, X } from 'lucide-react';

export const FloatingMusicBar: React.FC = () => {
  const { currentTrack, isPlaying, togglePlay, nextTrack, openModal, playlist } = useMusic();
  const [isDismissed, setIsDismissed] = React.useState(false);

  // If nothing in playlist, don't show the bar
  if (playlist.length === 0) {
    return null;
  }

  // If dismissed, show mini floating button
  if (isDismissed) {
    return (
      <button
        onClick={() => {
          setIsDismissed(false);
          openModal();
        }}
        className="fixed bottom-5 right-5 z-40 p-3 rounded-full bg-[#25234A] text-[#F5C76A] shadow-xl hover:scale-110 active:scale-95 transition-all border-2 border-[#F5C76A] cursor-pointer flex items-center gap-2 group"
        title="Mở trình phát nhạc & Tải bài hát"
      >
        <Music className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        <span className="hidden group-hover:inline text-xs font-bold text-white pr-1">
          Nhạc của bạn
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-4 sm:right-6 z-40 max-w-sm sm:max-w-md w-full bg-[#25234A]/95 text-white rounded-2xl shadow-2xl border-2 border-[#A78BFA] backdrop-blur-md p-3 flex items-center justify-between gap-3 animate-in slide-in-from-bottom-3 duration-200">
      {/* Clickable song info to open modal */}
      <div
        onClick={openModal}
        className="flex items-center gap-2.5 min-w-0 flex-1 cursor-pointer hover:opacity-90 transition-opacity"
        title="Bấm để mở danh sách & tải nhạc cá nhân"
      >
        <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/30 border border-[#F5C76A]/40 flex items-center justify-center text-[#F5C76A] shrink-0">
          {isPlaying ? (
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 bg-[#F5C76A] rounded-full animate-bounce h-3" />
              <span className="w-0.5 bg-[#F5C76A] rounded-full animate-bounce h-2 delay-75" />
              <span className="w-0.5 bg-[#F5C76A] rounded-full animate-bounce h-3.5 delay-150" />
            </div>
          ) : (
            <Music className="w-5 h-5" />
          )}
        </div>

        <div className="min-w-0">
          <p className="text-xs font-bold truncate text-[#FFF9F0]">
            {currentTrack?.title || 'Phát nhạc học tập'}
          </p>
          <p className="text-[10px] text-[#A78BFA] truncate">
            {currentTrack?.isCustom ? 'Nhạc của bạn' : 'Bấm để quản lý playlist / Tải nhạc'}
          </p>
        </div>
      </div>

      {/* Control buttons */}
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={togglePlay}
          className="p-2 rounded-xl bg-gradient-to-r from-[#F5C76A] to-[#E5B54F] text-[#25234A] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title={isPlaying ? 'Tạm dừng' : 'Phát tiếp'}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-[#25234A]" />
          ) : (
            <Play className="w-4 h-4 fill-[#25234A] ml-0.5" />
          )}
        </button>

        <button
          onClick={nextTrack}
          className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
          title="Bài kế tiếp"
        >
          <SkipForward className="w-4 h-4" />
        </button>

        <button
          onClick={openModal}
          className="p-2 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white transition-all cursor-pointer flex items-center gap-1 text-xs font-bold"
          title="Tải list nhạc của bạn lên"
        >
          <FolderPlus className="w-3.5 h-3.5 text-[#F5C76A]" />
          <span className="hidden sm:inline">Tải nhạc</span>
        </button>

        <button
          onClick={() => setIsDismissed(true)}
          className="p-1 text-white/50 hover:text-white transition-colors cursor-pointer ml-1"
          title="Thu gọn"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
