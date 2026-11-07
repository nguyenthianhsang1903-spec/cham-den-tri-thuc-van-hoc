import React, { useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import { useMusic } from '../context/MusicContext';
import { BookOpen, Sparkles, Award, Menu, X, Music, Volume2, VolumeX, Mail, FolderPlus } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'works' | 'mailbox' | 'knowledge' | 'games' | 'exams' | 'achievements';
  setActiveTab: (tab: 'home' | 'works' | 'mailbox' | 'knowledge' | 'games' | 'exams' | 'achievements') => void;
  onOpenFortune: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenFortune }) => {
  const { stats } = useProgress();
  const { currentTrack, isPlaying, togglePlay, openModal, playlist } = useMusic();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const customCount = playlist.filter((t) => t.isCustom).length;

  const navLinks = [
    { id: 'home', label: 'Trang chủ' },
    { id: 'works', label: 'Kho tác phẩm' },
    { id: 'mailbox', label: 'Hộp thư cảm xúc' },
    { id: 'knowledge', label: 'Thư viện' },
    { id: 'games', label: 'Trò chơi' },
    { id: 'exams', label: 'Thử thách' },
    { id: 'achievements', label: 'Thành tích' },
  ] as const;

  const handleNavClick = (id: typeof activeTab) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FFF9F0]/95 backdrop-blur-md border-b border-[#25234A]/10 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Brand Wordmark with School & Class Branding */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left font-serif-literary text-lg sm:text-xl font-bold tracking-tight text-[#25234A] hover:text-[#7C3AED] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2.5 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-[#8B5CF6] text-white flex items-center justify-center shadow-xs">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline">VĂN HỌC 12</span>
              <span className="sm:hidden">VĂN HỌC 12</span>
              <span className="hidden lg:inline text-[11px] font-sans font-bold px-2.5 py-0.5 rounded-full bg-[#A78BFA]/20 text-[#6D28D9]">
                THPT Yên Lãng · 12A03-K60 · 2026–2027
              </span>
            </div>
          </div>
        </button>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-semibold text-[#25234A]/80">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors whitespace-nowrap shrink-0 py-1.5 border-b-2 text-sm font-bold cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'text-[#25234A] border-[#8B5CF6]'
                    : 'text-[#25234A]/70 hover:text-[#25234A] border-transparent'
                }`}
              >
                {link.id === 'mailbox' && <Mail className="w-4 h-4 text-[#8B5CF6]" />}
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Buttons: Sound/Upload, Fortune Card, Points */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Music Controller & Playlist Trigger */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={togglePlay}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl transition-all flex items-center gap-2 text-xs font-bold cursor-pointer border ${
                isPlaying
                  ? 'bg-gradient-to-r from-purple-100 to-amber-100 text-[#25234A] border-purple-300 ring-2 ring-purple-400/20 shadow-xs'
                  : 'bg-white border-[#25234A]/15 text-[#25234A]/70 hover:text-[#25234A] hover:bg-[#25234A]/5'
              }`}
              title={isPlaying ? `Đang phát: ${currentTrack?.title} (Bấm để tạm dừng)` : 'Bật nhạc học tập 12A03'}
            >
              {isPlaying ? (
                <>
                  <div className="flex items-end gap-0.5 h-3.5">
                    <span className="w-1 bg-[#8B5CF6] rounded-full animate-bounce h-3" />
                    <span className="w-1 bg-[#F5C76A] rounded-full animate-bounce h-2 delay-75" />
                    <span className="w-1 bg-[#10B981] rounded-full animate-bounce h-3.5 delay-150" />
                  </div>
                  <span className="hidden xl:inline text-[#6D28D9] max-w-28 truncate">
                    {currentTrack?.title || 'Đang phát'}
                  </span>
                </>
              ) : (
                <>
                  <Music className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span className="hidden xl:inline">Bật nhạc</span>
                </>
              )}
            </button>

            {/* Direct Music Upload / Playlist Modal Trigger */}
            <button
              onClick={openModal}
              className="px-2.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#6D28D9] text-xs font-bold transition-all border border-purple-200 cursor-pointer flex items-center gap-1.5 shadow-2xs"
              title="Tải list nhạc của bạn lên & Quản lý danh sách bài hát"
            >
              <FolderPlus className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span className="hidden sm:inline">Tải list nhạc</span>
              {customCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-[#8B5CF6] text-white text-[10px] font-mono">
                  {customCount}
                </span>
              )}
            </button>
          </div>

          {/* Gieo Quẻ Button */}
          <button
            onClick={onOpenFortune}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#F5C76A] to-[#FBBF24] text-[#25234A] text-xs font-bold hover:shadow-md transition-all cursor-pointer shadow-2xs border border-[#F5C76A]"
            title="Gieo quẻ may mắn và nhận danh ngôn truyền cảm hứng"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#25234A]" />
            <span className="hidden sm:inline">Gieo quẻ</span>
          </button>

          {/* Points Pill */}
          <button
            onClick={() => handleNavClick('achievements')}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#25234A] text-[#FFF9F0] text-xs font-bold hover:bg-[#343163] transition-colors whitespace-nowrap shadow-xs cursor-pointer"
          >
            <Award className="w-3.5 h-3.5 text-[#F5C76A]" />
            <span>{stats.totalPoints}đ</span>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#25234A] hover:bg-[#25234A]/10 rounded-xl transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#25234A]/15 bg-[#FFF9F0] px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top-2 duration-150">
          <div className="px-3 py-1 text-xs font-bold text-[#8B5CF6]">
            Trường THPT Yên Lãng · Lớp 12A03-K60
          </div>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-base font-bold transition-colors cursor-pointer flex items-center justify-between ${
                activeTab === link.id
                  ? 'bg-[#A78BFA]/25 text-[#25234A]'
                  : 'text-[#25234A]/80 hover:bg-[#25234A]/5'
              }`}
            >
              <span>{link.label}</span>
              {link.id === 'mailbox' && <Mail className="w-4 h-4 text-[#8B5CF6]" />}
            </button>
          ))}

          {/* Music Upload & Playlist in Mobile Menu */}
          <button
            onClick={() => {
              openModal();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-3 rounded-xl bg-purple-50 text-[#6D28D9] font-bold text-sm flex items-center justify-between border border-purple-200 cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <FolderPlus className="w-4 h-4 text-[#8B5CF6]" />
              <span>Tải list nhạc của bạn lên</span>
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#8B5CF6] text-white font-mono">
              {customCount > 0 ? `${customCount} bài` : '+ Tải ngay'}
            </span>
          </button>

          <div className="pt-3 border-t border-[#25234A]/10 flex items-center justify-between px-2 text-sm">
            <button
              onClick={() => {
                onOpenFortune();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 font-bold text-[#D97706]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Gieo quẻ may mắn</span>
            </button>
            <span className="font-bold text-[#25234A] flex items-center gap-1 bg-[#25234A]/5 px-3 py-1 rounded-lg">
              <Award className="w-4 h-4 text-[#F5C76A]" />
              {stats.totalPoints} điểm
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
