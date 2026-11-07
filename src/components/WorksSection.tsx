import React, { useState, useMemo } from 'react';
import { LITERARY_WORKS } from '../data/worksData';
import { LiteraryWork } from '../types';
import { useProgress } from '../context/ProgressContext';
import { downloadWorkInfographic } from '../utils/cardExporter';
import { soundEngine } from '../utils/audioAmbience';
import {
  Search,
  BookOpen,
  Bookmark,
  CheckCircle2,
  Sparkles,
  X,
  ChevronRight,
  Layers,
  HelpCircle,
  Quote,
  UserCheck,
  Type,
  Download,
  Share2,
  Check,
  Award
} from 'lucide-react';

interface WorksSectionProps {
  initialSelectedWorkId?: string | null;
  onClearInitialSelectedWork?: () => void;
}

export const WorksSection: React.FC<WorksSectionProps> = ({
  initialSelectedWorkId,
  onClearInitialSelectedWork
}) => {
  const { stats, toggleWorkStudied, toggleWorkBookmarked } = useProgress();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSemester, setSelectedSemester] = useState<'all' | 1 | 2>('all');
  const [selectedUnit, setSelectedUnit] = useState<string>('all');
  const [activeTabFilter, setActiveTabFilter] = useState<'all' | 'studied' | 'bookmarked'>('all');
  const [readerFontSize, setReaderFontSize] = useState<'normal' | 'large' | 'xlarge'>('large');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const [activeWork, setActiveWork] = useState<LiteraryWork | null>(() => {
    if (initialSelectedWorkId) {
      return LITERARY_WORKS.find((w) => w.id === initialSelectedWorkId) || null;
    }
    return null;
  });

  // Unique units
  const units = useMemo(() => {
    const list = selectedSemester === 'all'
      ? LITERARY_WORKS
      : LITERARY_WORKS.filter((w) => w.semester === selectedSemester);
    const set = new Set(list.map((w) => w.unit));
    return Array.from(set);
  }, [selectedSemester]);

  // Filtered works
  const filteredWorks = useMemo(() => {
    return LITERARY_WORKS.filter((work) => {
      const matchSearch =
        searchQuery === '' ||
        work.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        work.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        work.unit.toLowerCase().includes(searchQuery.toLowerCase()) ||
        work.mainContent.toLowerCase().includes(searchQuery.toLowerCase());

      const matchSemester = selectedSemester === 'all' || work.semester === selectedSemester;
      const matchUnit = selectedUnit === 'all' || work.unit === selectedUnit;

      const matchTab =
        activeTabFilter === 'all' ||
        (activeTabFilter === 'studied' && stats.studiedWorksIds.includes(work.id)) ||
        (activeTabFilter === 'bookmarked' && stats.bookmarkedWorksIds.includes(work.id));

      return matchSearch && matchSemester && matchUnit && matchTab;
    });
  }, [searchQuery, selectedSemester, selectedUnit, activeTabFilter, stats.studiedWorksIds, stats.bookmarkedWorksIds]);

  const handleSelectWork = (work: LiteraryWork) => {
    setActiveWork(work);
  };

  const handleCloseDetail = () => {
    setActiveWork(null);
    if (onClearInitialSelectedWork) {
      onClearInitialSelectedWork();
    }
  };

  const handleDownload = async (e: React.MouseEvent, work: LiteraryWork) => {
    e.stopPropagation();
    setDownloadingId(work.id);
    soundEngine.playChime();
    await downloadWorkInfographic(work);
    setTimeout(() => setDownloadingId(null), 1500);
  };

  const getReadingTypeLabel = (type?: 'chinh' | 'doc_mo_rong' | 'thuc_hanh_doc') => {
    switch (type) {
      case 'doc_mo_rong':
        return { label: 'Đọc mở rộng', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
      case 'thuc_hanh_doc':
        return { label: 'Thực hành đọc', color: 'bg-amber-100 text-amber-900 border-amber-300' };
      default:
        return { label: 'Văn bản chính', color: 'bg-[#A78BFA]/25 text-[#5B21B6] border-[#A78BFA]/40' };
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#A78BFA]/20 text-[#25234A] text-xs sm:text-sm font-bold tracking-wide">
          <BookOpen className="w-5 h-5 text-[#8B5CF6]" />
          <span>Trường THPT Yên Lãng · Lớp 12A03-K60 · SGK Kết nối tri thức 2026</span>
        </div>
        <h1 className="font-serif-literary text-3xl sm:text-4xl lg:text-5xl font-bold text-[#25234A] tracking-tight">
          Kho tàng tác phẩm Ngữ văn 12
        </h1>
        <p className="text-base sm:text-lg text-[#25234A]/90 leading-relaxed font-medium">
          Đầy đủ 32 tác phẩm của <strong>Học kì I (Bài 1 – 5: 17 tác phẩm)</strong> và{' '}
          <strong>Học kì II (Bài 6 – 9: 15 tác phẩm)</strong> kèm chân dung tác gia, sơ đồ tư duy, và tính năng tải ảnh thẻ tác phẩm chất lượng cao về máy.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 sm:p-7 rounded-3xl border border-[#25234A]/15 shadow-sm space-y-5">
        {/* Semester Segmented Control */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#25234A]/10">
          <div className="flex items-center gap-2.5">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#25234A]">Học kì:</span>
            <div className="inline-flex p-1.5 rounded-2xl bg-[#25234A]/5 gap-1.5">
              <button
                onClick={() => {
                  setSelectedSemester('all');
                  setSelectedUnit('all');
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedSemester === 'all'
                    ? 'bg-[#25234A] text-white shadow-sm'
                    : 'text-[#25234A]/70 hover:text-[#25234A] hover:bg-white/60'
                }`}
              >
                Cả năm (32 tác phẩm)
              </button>
              <button
                onClick={() => {
                  setSelectedSemester(1);
                  setSelectedUnit('all');
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedSemester === 1
                    ? 'bg-[#8B5CF6] text-white shadow-sm'
                    : 'text-[#25234A]/70 hover:text-[#25234A] hover:bg-white/60'
                }`}
              >
                Học kì 1 (Tập 1 · 17 bài)
              </button>
              <button
                onClick={() => {
                  setSelectedSemester(2);
                  setSelectedUnit('all');
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedSemester === 2
                    ? 'bg-[#D97706] text-white shadow-sm'
                    : 'text-[#25234A]/70 hover:text-[#25234A] hover:bg-white/60'
                }`}
              >
                Học kì 2 (Tập 2 · 15 bài)
              </button>
            </div>
          </div>

          {/* Quick tab filters: All / Studied / Bookmarked */}
          <div className="inline-flex p-1.5 rounded-2xl bg-[#25234A]/5 text-xs sm:text-sm gap-1">
            <button
              onClick={() => setActiveTabFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-colors cursor-pointer ${
                activeTabFilter === 'all' ? 'bg-white text-[#25234A] shadow-xs' : 'text-[#25234A]/70'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setActiveTabFilter('studied')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-colors cursor-pointer ${
                activeTabFilter === 'studied' ? 'bg-white text-emerald-800 shadow-xs' : 'text-[#25234A]/70'
              }`}
            >
              Đã học ({stats.studiedWorksIds.length})
            </button>
            <button
              onClick={() => setActiveTabFilter('bookmarked')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-colors cursor-pointer ${
                activeTabFilter === 'bookmarked' ? 'bg-white text-amber-900 shadow-xs' : 'text-[#25234A]/70'
              }`}
            >
              Đã lưu ({stats.bookmarkedWorksIds.length})
            </button>
          </div>
        </div>

        {/* Search Input & Unit selector */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 text-[#25234A]/40 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm tác phẩm, tên tác giả (VD: Vũ Trọng Phụng, Ma Văn Kháng, Quang Dũng, Lưu Quang Vũ, Xuân Diệu...)..."
              className="w-full pl-12 pr-12 py-3.5 rounded-2xl border border-[#25234A]/20 text-base focus:outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20 transition-all bg-[#FFF9F0]/30 text-[#25234A]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#25234A]/50 hover:text-[#25234A] cursor-pointer"
              >
                Xóa
              </button>
            )}
          </div>

          <div className="w-full sm:w-80">
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl border border-[#25234A]/20 text-sm font-semibold focus:outline-none focus:border-[#8B5CF6] bg-white text-[#25234A] cursor-pointer"
            >
              <option value="all">Tất cả bài học trong SGK (Bài 1 – 9)</option>
              {units.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-sm text-[#25234A]/70 font-semibold flex items-center justify-between">
          <span>
            Đang hiển thị <strong>{filteredWorks.length}</strong> / 32 tác phẩm
          </span>
          <span className="text-xs text-[#8B5CF6] hidden sm:inline">
            Hỗ trợ lưu ảnh thẻ bài học trực tiếp về thiết bị (PNG 1200x1600)
          </span>
        </div>
      </div>

      {/* Main Works Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorks.map((work) => {
          const isStudied = stats.studiedWorksIds.includes(work.id);
          const isBookmarked = stats.bookmarkedWorksIds.includes(work.id);
          const readingBadge = getReadingTypeLabel(work.readingType);
          const isDownloading = downloadingId === work.id;

          // Compute author initials
          const authorInitials = work.author.split(' ').map((n) => n[0]).slice(-2).join('');

          return (
            <div
              key={work.id}
              className={`p-6 sm:p-7 rounded-3xl bg-white border-2 transition-all duration-200 flex flex-col justify-between group hover:shadow-xl ${
                activeWork?.id === work.id
                  ? 'border-[#8B5CF6] ring-4 ring-[#8B5CF6]/20 shadow-md'
                  : 'border-[#25234A]/10 hover:border-[#8B5CF6]/60'
              }`}
            >
              <div className="space-y-4">
                {/* Semester tag & reading badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-lg border ${
                        work.semester === 1
                          ? 'bg-[#A78BFA]/20 text-[#5B21B6] border-[#A78BFA]/30'
                          : 'bg-amber-100 text-amber-900 border-amber-300'
                      }`}
                    >
                      Học kì {work.semester}
                    </span>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${readingBadge.color}`}>
                      {readingBadge.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => handleDownload(e, work)}
                      className="p-2 rounded-xl text-[#25234A]/50 hover:text-[#8B5CF6] hover:bg-[#8B5CF6]/10 transition-colors cursor-pointer"
                      title="Lưu ảnh thẻ tác phẩm về máy (PNG)"
                    >
                      {isDownloading ? <Check className="w-5 h-5 text-emerald-600" /> : <Download className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWorkBookmarked(work.id);
                      }}
                      className={`p-2 rounded-xl transition-colors cursor-pointer ${
                        isBookmarked
                          ? 'text-[#D97706] bg-amber-100'
                          : 'text-[#25234A]/40 hover:text-[#25234A] hover:bg-[#25234A]/5'
                      }`}
                      title={isBookmarked ? 'Bỏ lưu' : 'Đánh dấu tác phẩm'}
                    >
                      <Bookmark className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWorkStudied(work.id);
                      }}
                      className={`p-2 rounded-xl transition-colors cursor-pointer ${
                        isStudied
                          ? 'text-emerald-700 bg-emerald-100'
                          : 'text-[#25234A]/40 hover:text-emerald-600 hover:bg-[#25234A]/5'
                      }`}
                      title={isStudied ? 'Đã học (+30 điểm)' : 'Đánh dấu đã học'}
                    >
                      <CheckCircle2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Author portrait avatar & Work Title */}
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#25234A] to-[#433E78] text-[#F5C76A] font-serif-literary font-bold text-base flex items-center justify-center shrink-0 border-2 border-[#F5C76A]/60 shadow-xs">
                    {authorInitials}
                  </div>
                  <div>
                    <h3 className="font-serif-literary text-2xl font-bold text-[#25234A] group-hover:text-[#8B5CF6] transition-colors leading-snug">
                      {work.title}
                    </h3>
                    <p className="text-sm font-semibold text-[#25234A]/80 mt-0.5">
                      Tác giả: <strong className="text-[#25234A]">{work.author}</strong> ({work.authorYears})
                    </p>
                  </div>
                </div>

                {/* Unit info */}
                <div className="text-xs text-[#8B5CF6] font-bold bg-[#A78BFA]/10 px-3 py-1.5 rounded-xl border border-[#A78BFA]/20">
                  {work.unit}
                </div>

                {/* Summary with high contrast and readable size */}
                <p className="text-base text-[#25234A]/90 line-clamp-3 leading-relaxed font-medium">
                  {work.mainContent}
                </p>
              </div>

              {/* Bottom CTA */}
              <div className="pt-4 mt-5 border-t border-[#25234A]/10 flex items-center justify-between">
                <span className="text-xs text-[#25234A]/60 font-semibold">
                  Thể loại: {work.genre}
                </span>
                <button
                  onClick={() => handleSelectWork(work)}
                  className="px-4 py-2.5 rounded-xl bg-[#25234A] text-white text-sm font-bold hover:bg-[#8B5CF6] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Khám phá chi tiết</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredWorks.length === 0 && (
        <div className="p-12 text-center rounded-3xl bg-white border border-[#25234A]/10 space-y-4">
          <p className="text-xl font-bold text-[#25234A]">Không tìm thấy tác phẩm phù hợp</p>
          <p className="text-base text-[#25234A]/70">Hãy thử xóa bộ lọc tìm kiếm hoặc từ khóa tra cứu.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedSemester('all');
              setSelectedUnit('all');
              setActiveTabFilter('all');
            }}
            className="px-6 py-3 rounded-xl bg-[#25234A] text-white text-sm font-bold cursor-pointer"
          >
            Đặt lại tất cả bộ lọc
          </button>
        </div>
      )}

      {/* Detailed Work Modal / Study Deck */}
      {activeWork && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="relative bg-[#FFF9F0] w-full max-w-5xl max-h-[92vh] rounded-3xl shadow-2xl border-2 border-[#25234A]/20 flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 sm:p-8 bg-white border-b border-[#25234A]/10 flex flex-wrap items-start justify-between gap-4 sticky top-0 z-10 shadow-xs">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-bold text-[#8B5CF6]">
                  <span className="px-3 py-1 rounded-lg bg-[#A78BFA]/20 text-[#6D28D9]">
                    Học kì {activeWork.semester} (Tập {activeWork.semester})
                  </span>
                  <span>{activeWork.unit}</span>
                  <span>·</span>
                  <span className="text-[#25234A]/70">{activeWork.genre}</span>
                </div>
                <h2 className="font-serif-literary text-2xl sm:text-3xl lg:text-4xl font-bold text-[#25234A]">
                  {activeWork.title}
                </h2>
                <p className="text-base text-[#25234A]/80 font-medium">
                  Tác giả: <strong className="text-[#25234A]">{activeWork.author}</strong> ({activeWork.authorYears})
                </p>
                <p className="text-xs text-[#8B5CF6] font-semibold">
                  Trường THPT Yên Lãng · Lớp 12A03-K60 · Thực hiện: Lưu Gia Linh & Nguyễn Thị Ánh Sáng
                </p>
              </div>

              {/* Reader font size scaler, download & close button */}
              <div className="flex items-center gap-2.5">
                {/* Download Infographic Button */}
                <button
                  onClick={(e) => handleDownload(e, activeWork)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#F5C76A] to-[#FBBF24] text-[#25234A] text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-sm hover:scale-105 transition-all cursor-pointer border border-[#F5C76A]"
                  title="Tải ảnh thẻ tác phẩm chất lượng cao (PNG 1200x1600)"
                >
                  <Download className="w-4 h-4 text-[#25234A]" />
                  <span>{downloadingId === activeWork.id ? 'Đang lưu ảnh...' : 'Lưu ảnh thẻ (PNG)'}</span>
                </button>

                {/* Font Size Adjuster */}
                <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl bg-[#25234A]/5 border border-[#25234A]/10">
                  <span className="text-xs font-bold px-2 text-[#25234A]/60 flex items-center gap-1">
                    <Type className="w-3.5 h-3.5" />
                    <span>Cỡ chữ:</span>
                  </span>
                  <button
                    onClick={() => setReaderFontSize('normal')}
                    className={`px-2 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                      readerFontSize === 'normal' ? 'bg-white shadow-xs text-[#25234A]' : 'text-[#25234A]/60'
                    }`}
                  >
                    Vừa
                  </button>
                  <button
                    onClick={() => setReaderFontSize('large')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                      readerFontSize === 'large' ? 'bg-white shadow-xs text-[#8B5CF6]' : 'text-[#25234A]/60'
                    }`}
                  >
                    Lớn
                  </button>
                  <button
                    onClick={() => setReaderFontSize('xlarge')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                      readerFontSize === 'xlarge' ? 'bg-white shadow-xs text-[#D97706]' : 'text-[#25234A]/60'
                    }`}
                  >
                    Rất lớn
                  </button>
                </div>

                <button
                  onClick={() => toggleWorkStudied(activeWork.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    stats.studiedWorksIds.includes(activeWork.id)
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-white border border-[#25234A]/20 text-[#25234A] hover:bg-emerald-50'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{stats.studiedWorksIds.includes(activeWork.id) ? 'Đã học' : 'Đánh dấu đã học'}</span>
                </button>

                <button
                  onClick={handleCloseDetail}
                  className="p-2 rounded-xl text-[#25234A]/70 hover:text-[#25234A] hover:bg-[#25234A]/10 transition-colors cursor-pointer"
                  title="Đóng cửa sổ"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Body with dynamic font size */}
            <div
              className={`p-6 sm:p-10 space-y-9 overflow-y-auto ${
                readerFontSize === 'xlarge'
                  ? 'text-xl leading-loose'
                  : readerFontSize === 'large'
                  ? 'text-lg leading-relaxed'
                  : 'text-base leading-normal'
              }`}
            >
              {/* Section: Author bio & Context */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#25234A]/10 space-y-3">
                  <h4 className="font-serif-literary text-xl sm:text-2xl font-bold text-[#25234A] flex items-center gap-2">
                    <UserCheck className="w-6 h-6 text-[#8B5CF6]" />
                    <span>Tiểu sử & Phong cách tác giả</span>
                  </h4>
                  <p className="text-[#25234A] leading-relaxed font-medium">
                    {activeWork.authorBio}
                  </p>
                </div>

                <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#25234A]/10 space-y-3">
                  <h4 className="font-serif-literary text-xl sm:text-2xl font-bold text-[#25234A] flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-[#D97706]" />
                    <span>Hoàn cảnh sáng tác & Xuất xứ</span>
                  </h4>
                  <p className="text-[#25234A] leading-relaxed font-medium">
                    {activeWork.backgroundAndOrigin}
                  </p>
                </div>
              </div>

              {/* Section: Main Content & Theme */}
              <div className="p-7 sm:p-8 rounded-2xl bg-white border border-[#25234A]/10 space-y-6">
                <div>
                  <h4 className="font-serif-literary text-xl sm:text-2xl font-bold text-[#25234A]">
                    Tóm tắt nội dung chính
                  </h4>
                  <p className="text-[#25234A] mt-2.5 leading-relaxed font-medium">
                    {activeWork.mainContent}
                  </p>
                </div>

                <div className="pt-5 border-t border-[#25234A]/10">
                  <h4 className="font-serif-literary text-xl sm:text-2xl font-bold text-[#25234A]">
                    Chủ đề & Thông điệp tư tưởng
                  </h4>
                  <p className="text-[#25234A] mt-2.5 leading-relaxed font-medium">
                    {activeWork.themeAndMessage}
                  </p>
                </div>
              </div>

              {/* Section: Content & Art Values */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#25234A]/10 space-y-4">
                  <h4 className="font-serif-literary text-xl sm:text-2xl font-bold text-[#25234A] flex items-center gap-2">
                    <Layers className="w-6 h-6 text-[#8B5CF6]" />
                    <span>Giá trị nội dung</span>
                  </h4>
                  <ul className="space-y-3 text-[#25234A]">
                    {activeWork.contentValue.map((val, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-[#8B5CF6] font-bold text-xl leading-none mt-0.5">•</span>
                        <span className="leading-relaxed font-medium">{val}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#25234A]/10 space-y-4">
                  <h4 className="font-serif-literary text-xl sm:text-2xl font-bold text-[#25234A] flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-[#D97706]" />
                    <span>Giá trị nghệ thuật</span>
                  </h4>
                  <ul className="space-y-3 text-[#25234A]">
                    {activeWork.artisticValue.map((val, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-[#D97706] font-bold text-xl leading-none mt-0.5">•</span>
                        <span className="leading-relaxed font-medium">{val}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Section: Character Analysis */}
              <div className="space-y-5">
                <h4 className="font-serif-literary text-2xl sm:text-3xl font-bold text-[#25234A]">
                  Phân tích nhân vật & Hình tượng tiêu biểu
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {activeWork.charactersOrSymbols.map((char, idx) => (
                    <div key={idx} className="p-6 sm:p-7 rounded-2xl bg-white border border-[#25234A]/10 space-y-3.5">
                      <div className="flex items-start justify-between gap-2 border-b border-[#25234A]/10 pb-3">
                        <h5 className="font-serif-literary text-xl font-bold text-[#25234A]">
                          {char.name}
                        </h5>
                        <span className="text-xs text-[#8B5CF6] font-bold bg-[#A78BFA]/15 px-3 py-1 rounded-lg">
                          {char.role}
                        </span>
                      </div>
                      <ul className="space-y-2 text-[#25234A] pt-1">
                        {char.characteristics.map((c, cIdx) => (
                          <li key={cIdx} className="flex items-start gap-2.5">
                            <span className="text-[#8B5CF6] font-bold">✓</span>
                            <span className="leading-relaxed font-medium">{c}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="pt-2 text-sm sm:text-base text-[#25234A]/90 italic font-medium border-t border-[#25234A]/5">
                        <strong className="text-[#25234A]">Ý nghĩa tư tưởng:</strong> {char.significance}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section: Key Quotes */}
              <div className="p-7 sm:p-8 rounded-2xl bg-[#25234A] text-white space-y-5 shadow-lg">
                <div className="flex items-center gap-2.5 text-lg font-bold text-[#F5C76A]">
                  <Quote className="w-6 h-6" />
                  <span>Những câu văn, câu thơ đắt giá làm dẫn chứng</span>
                </div>
                <div className="space-y-3.5">
                  {activeWork.keyQuotes.map((quote, idx) => (
                    <blockquote
                      key={idx}
                      className="p-5 rounded-2xl bg-white/10 border border-white/15 text-lg sm:text-xl font-serif-literary italic text-white/95 leading-relaxed"
                    >
                      “{quote}”
                    </blockquote>
                  ))}
                </div>
              </div>

              {/* Section: Mindmap Visualization */}
              <div className="p-7 sm:p-8 rounded-2xl bg-white border border-[#25234A]/10 space-y-5">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif-literary text-xl sm:text-2xl font-bold text-[#25234A] flex items-center gap-2.5">
                    <Layers className="w-6 h-6 text-[#8B5CF6]" />
                    <span>Sơ đồ tư duy tổng hợp kiến thức</span>
                  </h4>
                  <span className="text-xs sm:text-sm font-bold text-[#8B5CF6]">Phân nhánh trực quan</span>
                </div>

                <div className="p-6 sm:p-7 rounded-2xl bg-[#FFF9F0] border border-[#25234A]/10 space-y-6">
                  {/* Central theme bubble */}
                  <div className="text-center">
                    <span className="inline-block px-7 py-3.5 rounded-full bg-[#25234A] text-white font-serif-literary text-lg sm:text-xl font-bold shadow-md">
                      {activeWork.mindmap.centralTheme}
                    </span>
                  </div>

                  {/* Branches Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {activeWork.mindmap.branches.map((branch, bIdx) => (
                      <div key={bIdx} className="p-5 rounded-2xl bg-white border border-[#25234A]/10 space-y-3 shadow-xs">
                        <h5 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#8B5CF6] border-b border-[#25234A]/10 pb-2">
                          {branch.title}
                        </h5>
                        <ul className="space-y-2 text-sm sm:text-base text-[#25234A]">
                          {branch.items.map((item, iIdx) => (
                            <li key={iIdx} className="flex items-start gap-2 leading-relaxed font-medium">
                              <span className="text-[#F5C76A] font-bold">↳</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section: Exam Prompts & Essay Guide */}
              <div className="p-7 sm:p-8 rounded-2xl bg-white border border-[#25234A]/10 space-y-5">
                <div className="flex items-center gap-2.5">
                  <HelpCircle className="w-6 h-6 text-[#8B5CF6]" />
                  <h4 className="font-serif-literary text-xl sm:text-2xl font-bold text-[#25234A]">
                    Dạng đề thi THPT thường gặp & Hướng dẫn làm bài
                  </h4>
                </div>

                <div className="space-y-5">
                  {activeWork.examPrompts.map((prompt, pIdx) => (
                    <div key={pIdx} className="p-6 sm:p-7 rounded-2xl bg-[#FFF9F0] border border-[#25234A]/15 space-y-4">
                      <div className="flex items-start justify-between gap-3 border-b border-[#25234A]/10 pb-3">
                        <p className="font-serif-literary text-lg sm:text-xl font-bold text-[#25234A]">
                          Đề {pIdx + 1}: {prompt.topic}
                        </p>
                        <span className="text-xs px-3 py-1.5 rounded-lg bg-[#A78BFA]/20 text-[#25234A] font-bold shrink-0">
                          {prompt.type}
                        </span>
                      </div>

                      <div className="space-y-3 text-base text-[#25234A] leading-relaxed font-medium">
                        <p><strong>Mở bài:</strong> {prompt.guide.intro}</p>
                        <div>
                          <strong>Thân bài:</strong>
                          <ul className="list-disc pl-6 mt-2 space-y-2 text-sm sm:text-base text-[#25234A]">
                            {prompt.guide.body.map((b, bIdx) => (
                              <li key={bIdx}>{b}</li>
                            ))}
                          </ul>
                        </div>
                        <p><strong>Kết bài:</strong> {prompt.guide.conclusion}</p>
                        {prompt.guide.bonusPoints && (
                          <p className="text-[#6D28D9] font-bold pt-1 border-t border-[#25234A]/10">
                            <strong>✦ Điểm cộng sáng tạo:</strong> {prompt.guide.bonusPoints}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 bg-white border-t border-[#25234A]/10 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-semibold text-[#25234A]/60">
                Thực hiện: <strong>Lưu Gia Linh & Nguyễn Thị Ánh Sáng</strong> · Lớp 12A03-K60, THPT Yên Lãng
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => handleDownload(e, activeWork)}
                  className="px-5 py-2.5 rounded-xl bg-[#8B5CF6] text-white text-sm font-bold hover:bg-[#7C3AED] transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Tải ảnh thẻ tác phẩm (PNG)</span>
                </button>
                <button
                  onClick={handleCloseDetail}
                  className="px-7 py-2.5 rounded-xl bg-[#25234A] text-white text-sm font-bold hover:bg-[#8B5CF6] transition-colors cursor-pointer shadow-sm"
                >
                  Đóng tác phẩm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
