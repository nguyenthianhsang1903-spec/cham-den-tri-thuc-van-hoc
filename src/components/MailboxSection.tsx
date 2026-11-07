import React, { useState, useEffect, useRef } from 'react';
import {
  Mail,
  Send,
  Heart,
  Sparkles,
  Search,
  Filter,
  PlusCircle,
  X,
  Download,
  BookOpen,
  Share2,
  Bookmark,
  CheckCircle2,
  Calendar,
  PenTool,
  Stamp,
  School,
  Flame,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Letter, INITIAL_LETTERS } from '../data/mailboxData';
import { LITERARY_WORKS } from '../data/worksData';
import { LiteraryWork } from '../types';

const STORAGE_KEY = 'vanhoc12_letters_v3_gialinh_anhsang_07112026';

const TAG_CONFIG = {
  all: { label: 'Tất cả thư gửi', color: 'bg-[#25234A] text-white' },
  '12a03': { label: 'Kỷ niệm 12A03-K60', color: 'bg-purple-100 text-purple-800 border-purple-300' },
  work_review: { label: 'Cảm nhận tác phẩm', color: 'bg-amber-100 text-amber-800 border-amber-300' },
  exam_wishes: { label: 'Chúc thi tốt nghiệp', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  teacher_love: { label: 'Tâm tình thầy trò', color: 'bg-rose-100 text-rose-800 border-rose-300' },
  youth_memories: { label: 'Thanh xuân tuổi 18', color: 'bg-blue-100 text-blue-800 border-blue-300' },
};

const STATIONERY_CONFIG = {
  vintage: {
    name: 'Hoa cúc Vintage',
    bgClass: 'bg-[#FDFBF7] border-[#E2D8C3]',
    accentColor: '#8C6D46',
    textColor: 'text-[#4A3B2C]',
    pattern: 'radial-gradient(#D6C2A5 0.75px, transparent 0.75px)',
  },
  lavender: {
    name: 'Tím Lavender 12A03',
    bgClass: 'bg-[#F9F7FD] border-[#D8CCF6]',
    accentColor: '#7C3AED',
    textColor: 'text-[#2E2050]',
    pattern: 'radial-gradient(#C4B5FD 0.75px, transparent 0.75px)',
  },
  lined: {
    name: 'Giấy kẻ ô ly học trò',
    bgClass: 'bg-[#FAFDF9] border-[#CDE5D1]',
    accentColor: '#166534',
    textColor: 'text-[#1F3D2A]',
    pattern: 'linear-gradient(transparent, transparent 27px, #E2EFE4 28px)',
  },
  gold: {
    name: 'Ánh kim trang trọng',
    bgClass: 'bg-[#FFFDF5] border-[#F2DE9D]',
    accentColor: '#B45309',
    textColor: 'text-[#452D12]',
    pattern: 'radial-gradient(#F5C76A 0.8px, transparent 0.8px)',
  },
  kraft: {
    name: 'Giấy Kraft mộc mạc',
    bgClass: 'bg-[#F6EFE6] border-[#D5C2AB]',
    accentColor: '#78350F',
    textColor: 'text-[#3E2514]',
    pattern: 'radial-gradient(#BFA487 0.75px, transparent 0.75px)',
  },
};

const STAMP_CONFIG = {
  yen_lang: { label: 'THPT Yên Lãng', sub: 'K60 · 2026', icon: '🏫', color: 'border-purple-600 bg-purple-50 text-purple-900' },
  tay_tien: { label: 'Tây Tiến', sub: 'Quang Dũng', icon: '⛰️', color: 'border-emerald-600 bg-emerald-50 text-emerald-900' },
  voi_vang: { label: 'Vội Vàng', sub: 'Xuân Diệu', icon: '🌸', color: 'border-rose-600 bg-rose-50 text-rose-900' },
  pho_nho: { label: 'Lor-ca', sub: 'Thanh Thảo', icon: '🎸', color: 'border-indigo-600 bg-indigo-50 text-indigo-900' },
  phuong_vi: { label: 'Phượng Vĩ', sub: 'Tuổi 18', icon: '🌺', color: 'border-amber-600 bg-amber-50 text-amber-900' },
};

export const MailboxSection: React.FC = () => {
  const [letters, setLetters] = useState<Letter[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const filtered = parsed.filter(
            (l: Letter) =>
              l.senderName === 'Lưu Gia Linh' ||
              l.senderName === 'Nguyễn Thị Ánh Sáng' ||
              l.id.startsWith('letter-user-')
          );
          if (filtered.length > 0) {
            return filtered.map((l: Letter) => {
              if (l.senderName === 'Lưu Gia Linh' || l.senderName === 'Nguyễn Thị Ánh Sáng') {
                return { ...l, date: '07-11-2026' };
              }
              return l;
            });
          }
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_LETTERS;
  });

  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [activeLetter, setActiveLetter] = useState<Letter | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form states
  const [formSender, setFormSender] = useState('');
  const [formClass, setFormClass] = useState('Lớp 12A03-K60 – Trường THPT Yên Lãng');
  const [formRole, setFormRole] = useState('Học sinh');
  const [formTitle, setFormTitle] = useState('');
  const [formTag, setFormTag] = useState<'12a03' | 'work_review' | 'exam_wishes' | 'youth_memories' | 'teacher_love'>('12a03');
  const [formRelatedWork, setFormRelatedWork] = useState('');
  const [formStationery, setFormStationery] = useState<'vintage' | 'lavender' | 'lined' | 'gold' | 'kraft'>('lavender');
  const [formStamp, setFormStamp] = useState<'tay_tien' | 'voi_vang' | 'yen_lang' | 'pho_nho' | 'phuong_vi'>('yen_lang');
  const [formContent, setFormContent] = useState('');
  const [formError, setFormError] = useState('');

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(letters));
    } catch (e) {
      console.error('Failed to save letters to localStorage', e);
    }
  }, [letters]);

  // Handle Like
  const handleLike = (letterId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLetters((prev) =>
      prev.map((l) => {
        if (l.id === letterId) {
          const already = !!l.userLiked;
          return {
            ...l,
            likes: already ? l.likes - 1 : l.likes + 1,
            userLiked: !already,
          };
        }
        return l;
      })
    );
  };

  // Submit new letter
  const handleSubmitLetter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formSender.trim()) {
      setFormError('Vui lòng nhập họ tên hoặc bút danh của bạn.');
      return;
    }
    if (!formTitle.trim()) {
      setFormError('Vui lòng nhập tiêu đề bức thư.');
      return;
    }
    if (!formContent.trim() || formContent.trim().length < 15) {
      setFormError('Nội dung thư nên có ít nhất 15 ký tự để gửi gắm trọn vẹn cảm xúc.');
      return;
    }

    const now = new Date();
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yyyy = now.getFullYear();
    const today = `${dd}-${mm}-${yyyy}`;

    const newLetter: Letter = {
      id: `letter-user-${Date.now()}`,
      senderName: formSender.trim(),
      senderRole: formRole.trim() || 'Học sinh',
      schoolOrClass: formClass.trim() || 'Trường THPT Yên Lãng',
      date: today,
      title: formTitle.trim(),
      content: formContent.trim(),
      tag: formTag,
      relatedWork: formRelatedWork ? formRelatedWork : undefined,
      stationery: formStationery,
      stamp: formStamp,
      likes: 1,
      userLiked: true,
    };

    setLetters([newLetter, ...letters]);
    setIsWriteModalOpen(false);
    setFormError('');

    // Reset some form fields
    setFormTitle('');
    setFormContent('');

    // Fire confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#A78BFA', '#F5C76A', '#EC4899', '#3B82F6'],
      });
    } catch {
      // ignore
    }
  };

  // Filter letters
  const filteredLetters = letters.filter((l) => {
    const matchTag = selectedTag === 'all' || l.tag === selectedTag;
    const matchSearch =
      searchQuery === '' ||
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.relatedWork && l.relatedWork.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchTag && matchSearch;
  });

  // Export Letter as PNG
  const downloadLetterImage = (letter: Letter) => {
    setIsDownloading(true);
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 1500;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsDownloading(false);
      return;
    }

    // Background based on stationery
    const stConfig = STATIONERY_CONFIG[letter.stationery];
    const bgGradients: Record<string, [string, string]> = {
      vintage: ['#FAF6ED', '#EDE3D1'],
      lavender: ['#FAF7FE', '#EDE5FC'],
      lined: ['#F6FCF7', '#E5F4E7'],
      gold: ['#FFFDF2', '#F9ECC7'],
      kraft: ['#F6EFE6', '#E4D3BD'],
    };
    const [c1, c2] = bgGradients[letter.stationery] || ['#FAF6ED', '#EDE3D1'];

    const grad = ctx.createLinearGradient(0, 0, 0, 1500);
    grad.addColorStop(0, c1);
    grad.addColorStop(1, c2);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 1500);

    // Subtle paper noise / border frame
    ctx.strokeStyle = stConfig.accentColor;
    ctx.lineWidth = 4;
    ctx.strokeRect(40, 40, 1120, 1420);

    ctx.strokeStyle = `${stConfig.accentColor}44`;
    ctx.lineWidth = 1;
    ctx.strokeRect(50, 50, 1100, 1400);

    // Header banner: Trường THPT Yên Lãng - Lớp 12A03-K60
    ctx.fillStyle = '#25234A';
    ctx.fillRect(80, 80, 1040, 84);

    ctx.fillStyle = '#F5C76A';
    ctx.font = 'bold 22px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('HỘP THƯ VĂN HỌC 12 – TRƯỜNG THPT YÊN LÃNG (LỚP 12A03-K60)', 600, 120);

    ctx.fillStyle = '#FFF9F0';
    ctx.font = 'italic 16px system-ui, sans-serif';
    ctx.fillText('Dự án: Lưu Gia Linh & Nguyễn Thị Ánh Sáng · Kết nối tri thức với cuộc sống 2026', 600, 146);

    // Stamp drawing (Top right)
    const stampX = 940;
    const stampY = 190;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(stampX, stampY, 160, 190);
    ctx.strokeStyle = '#25234A';
    ctx.lineWidth = 3;
    ctx.setLineDash([6, 4]);
    ctx.strokeRect(stampX + 4, stampY + 4, 152, 182);
    ctx.setLineDash([]);

    const stInfo = STAMP_CONFIG[letter.stamp];
    ctx.fillStyle = '#25234A';
    ctx.font = '40px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(stInfo.icon, stampX + 80, stampY + 70);

    ctx.fillStyle = '#25234A';
    ctx.font = 'bold 15px system-ui, sans-serif';
    ctx.fillText(stInfo.label, stampX + 80, stampY + 115);
    ctx.font = '13px system-ui, sans-serif';
    ctx.fillStyle = '#666';
    ctx.fillText(stInfo.sub, stampX + 80, stampY + 138);

    ctx.fillStyle = '#A78BFA';
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.fillText('BƯU CHÍNH YÊN LÃNG', stampX + 80, stampY + 165);

    // Postmark Circle
    ctx.strokeStyle = '#9333EA';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(stampX - 20, stampY + 80, 45, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = '#9333EA';
    ctx.font = 'bold 10px system-ui, sans-serif';
    ctx.fillText('YÊN LÃNG 12A03', stampX - 20, stampY + 75);
    ctx.fillText(letter.date, stampX - 20, stampY + 92);

    // Letter Metadata (Left)
    ctx.textAlign = 'left';
    ctx.fillStyle = stConfig.accentColor;
    ctx.font = 'bold 16px system-ui, sans-serif';
    ctx.fillText('NGƯỜI GỬI:', 100, 220);

    ctx.fillStyle = '#1E1B4B';
    ctx.font = 'bold 28px Georgia, serif';
    ctx.fillText(letter.senderName, 210, 220);

    ctx.fillStyle = '#555';
    ctx.font = '16px system-ui, sans-serif';
    ctx.fillText(`${letter.senderRole} · ${letter.schoolOrClass}`, 100, 255);
    ctx.fillText(`Ngày gửi: ${letter.date} · Thể loại: ${TAG_CONFIG[letter.tag]?.label || 'Tâm tình'}`, 100, 285);

    if (letter.relatedWork) {
      ctx.fillStyle = '#7C3AED';
      ctx.font = 'italic bold 17px system-ui, sans-serif';
      ctx.fillText(`📖 Cảm hứng từ tác phẩm: ${letter.relatedWork}`, 100, 320);
    }

    // Divider
    ctx.strokeStyle = `${stConfig.accentColor}66`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(100, 350);
    ctx.lineTo(1100, 350);
    ctx.stroke();

    // Letter Title
    ctx.fillStyle = '#1E1B4B';
    ctx.font = 'bold 36px Georgia, serif';
    ctx.textAlign = 'left';

    // Wrap title if long
    const words = letter.title.split(' ');
    let line = '';
    let curY = 410;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > 980 && n > 0) {
        ctx.fillText(line, 100, curY);
        line = words[n] + ' ';
        curY += 46;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 100, curY);
    curY += 30;

    // Content background lines (if lined)
    ctx.fillStyle = '#2C2523';
    ctx.font = '24px Georgia, serif';
    const contentWords = letter.content.split(' ');
    let cLine = '';
    curY += 40;

    for (let i = 0; i < contentWords.length; i++) {
      const test = cLine + contentWords[i] + ' ';
      if (ctx.measureText(test).width > 980 && i > 0) {
        ctx.fillText(cLine, 100, curY);
        cLine = contentWords[i] + ' ';
        curY += 40;
      } else {
        cLine = test;
      }
    }
    ctx.fillText(cLine, 100, curY);

    // Wax seal / Signature at bottom
    ctx.fillStyle = stConfig.accentColor;
    ctx.font = 'italic 20px Georgia, serif';
    ctx.textAlign = 'right';
    ctx.fillText(`Ký tên: ${letter.senderName}`, 1080, 1340);
    ctx.font = '16px system-ui, sans-serif';
    ctx.fillText(letter.schoolOrClass, 1080, 1370);

    // Footer credits
    ctx.fillStyle = '#666';
    ctx.font = '14px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Lưu giữ kỷ niệm thanh xuân cùng VĂN HỌC 12 – CHẠM ĐẾN TRI THỨC', 600, 1420);

    // Export image
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `hop-thu-12a03-${letter.id}.png`;
    a.click();
    setIsDownloading(false);
  };

  const handleCopyLink = (letterId: string) => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setCopiedId(letterId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#25234A] via-[#322F5E] to-[#1E1B4B] text-[#FFF9F0] p-8 md:p-12 mb-10 shadow-2xl border border-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#A78BFA]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F5C76A]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#F5C76A] text-xs font-semibold uppercase tracking-wider mb-4">
            <Mail className="w-4 h-4 text-[#F5C76A]" />
            <span>Hộp thư lưu bút · Lớp 12A03-K60 · THPT Yên Lãng</span>
          </div>

          <h1 className="font-serif-literary text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#FFF9F0] tracking-tight leading-tight mb-4">
            HỘP THƯ VĂN HỌC & CẢM XÚC
          </h1>

          <p className="text-base sm:text-lg text-[#FFF9F0]/85 font-sans leading-relaxed mb-6">
            Nơi lưu giữ những dòng cảm xúc chân thành, lời chúc thi cử may mắn, cảm nhận về 32 tác phẩm Ngữ văn 12 và những kỷ niệm tuổi 18 dưới mái trường THPT Yên Lãng. Hãy gửi gắm tâm tư của bạn vào đây!
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#F5C76A] to-[#E5B54F] text-[#25234A] font-bold text-sm shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <PenTool className="w-4 h-4" />
              <span>Gửi thư cảm xúc mới</span>
            </button>

            <div className="flex items-center gap-4 text-xs sm:text-sm text-[#FFF9F0]/70 pl-2">
              <span className="flex items-center gap-1.5">
                <Bookmark className="w-4 h-4 text-[#A78BFA]" />
                <strong>{letters.length}</strong> bức thư đã gửi
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                <strong>{letters.reduce((acc, curr) => acc + curr.likes, 0)}</strong> lượt đồng cảm
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-4 md:p-6 mb-8">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Tìm theo tiêu đề, người gửi, tác phẩm (Tây Tiến, Vội vàng, 12A03...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#A78BFA]/50 focus:border-[#A78BFA]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
              >
                Xóa
              </button>
            )}
          </div>

          <button
            onClick={() => setIsWriteModalOpen(true)}
            className="md:hidden flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25234A] text-white font-medium text-sm"
          >
            <PlusCircle className="w-4 h-4 text-[#F5C76A]" />
            <span>Viết thư</span>
          </button>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider flex items-center gap-1 mr-1 flex-shrink-0">
            <Filter className="w-3.5 h-3.5" /> Lọc:
          </span>
          {Object.entries(TAG_CONFIG).map(([key, val]) => {
            const isSelected = selectedTag === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedTag(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-[#25234A] text-[#FFF9F0] shadow-sm'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {val.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Letters Grid */}
      {filteredLetters.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8">
          <Mail className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <h3 className="font-serif-literary text-lg font-bold text-stone-700 mb-1">
            Chưa tìm thấy bức thư phù hợp
          </h3>
          <p className="text-sm text-stone-500 mb-4 max-w-md mx-auto">
            Không có kết quả nào cho bộ lọc hoặc từ khóa hiện tại. Bạn có thể là người đầu tiên viết thư cho chủ đề này!
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedTag('all');
            }}
            className="px-4 py-2 rounded-lg bg-stone-100 text-stone-700 text-sm font-medium hover:bg-stone-200"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLetters.map((letter) => {
            const st = STATIONERY_CONFIG[letter.stationery] || STATIONERY_CONFIG.vintage;
            const stamp = STAMP_CONFIG[letter.stamp] || STAMP_CONFIG.yen_lang;
            const tagCfg = TAG_CONFIG[letter.tag] || TAG_CONFIG.all;

            return (
              <div
                key={letter.id}
                onClick={() => setActiveLetter(letter)}
                className={`group relative rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer flex flex-col justify-between ${st.bgClass}`}
                style={{
                  backgroundImage: st.pattern,
                }}
              >
                {/* Top: Postage Stamp & Postmark */}
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    {/* Tag badge */}
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border ${tagCfg.color}`}>
                      {tagCfg.label}
                    </span>

                    {/* Miniature Stamp */}
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <div
                        className={`border-2 border-dashed px-2 py-1 rounded text-center shadow-xs flex items-center gap-1 ${stamp.color}`}
                        title={`Con tem: ${stamp.label}`}
                      >
                        <span className="text-sm">{stamp.icon}</span>
                        <div className="text-left">
                          <p className="text-[10px] font-bold leading-none">{stamp.label}</p>
                          <p className="text-[8px] opacity-75 leading-none mt-0.5">{stamp.sub}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sender Info */}
                  <div className="mb-3">
                    <h3 className="font-serif-literary text-lg font-bold text-stone-900 group-hover:text-[#25234A] line-clamp-2 leading-snug">
                      {letter.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-1">
                      <span className="font-semibold text-stone-700">{letter.senderName}</span>
                      <span>·</span>
                      <span className="truncate">{letter.schoolOrClass}</span>
                    </div>
                  </div>

                  {/* Related Work Badge */}
                  {letter.relatedWork && (
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-purple-50 border border-purple-200 text-purple-700 text-[11px] font-medium mb-3">
                      <BookOpen className="w-3 h-3 text-purple-600" />
                      <span className="truncate max-w-[200px]">{letter.relatedWork}</span>
                    </div>
                  )}

                  {/* Content Snippet */}
                  <p className="text-sm text-stone-700/90 leading-relaxed font-sans line-clamp-4 italic">
                    “{letter.content}”
                  </p>
                </div>

                {/* Bottom Bar: Date & Actions */}
                <div className="mt-6 pt-3 border-t border-stone-200/80 flex items-center justify-between text-xs text-stone-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    <span>{letter.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => handleLike(letter.id, e)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                        letter.userLiked
                          ? 'bg-rose-50 text-rose-600 border border-rose-200'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          letter.userLiked ? 'fill-rose-500 text-rose-500' : 'text-stone-400'
                        }`}
                      />
                      <span>{letter.likes}</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadLetterImage(letter);
                      }}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors"
                      title="Lưu ảnh phong thư kỷ niệm"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Write Letter Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8">
            {/* Modal Header */}
            <div className="bg-[#25234A] text-[#FFF9F0] px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#F5C76A]/20 flex items-center justify-center text-[#F5C76A]">
                  <PenTool className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-literary text-lg font-bold">
                    Viết thư vào Hộp thư cảm xúc
                  </h3>
                  <p className="text-xs text-[#FFF9F0]/70">
                    Gửi gắm lưu bút thanh xuân · THPT Yên Lãng Lớp 12A03-K60
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#FFF9F0] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmitLetter} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {formError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                  {formError}
                </div>
              )}

              {/* Sender Name & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Họ tên hoặc Bút danh của bạn <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Lưu Gia Linh, Ánh Sáng, Cậu bạn ngồi bàn cuối..."
                    value={formSender}
                    onChange={(e) => setFormSender(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#A78BFA]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Trường / Lớp của bạn
                  </label>
                  <input
                    type="text"
                    placeholder="VD: Lớp 12A03-K60 – Trường THPT Yên Lãng"
                    value={formClass}
                    onChange={(e) => setFormClass(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#A78BFA]"
                  />
                </div>
              </div>

              {/* Title & Tag */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Tiêu đề bức thư <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Gửi thanh xuân 18, Nhớ về Tây Tiến..."
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#A78BFA]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Chủ đề thư
                  </label>
                  <select
                    value={formTag}
                    onChange={(e) => setFormTag(e.target.value as any)}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#A78BFA]"
                  >
                    <option value="12a03">Kỷ niệm 12A03-K60</option>
                    <option value="work_review">Cảm nhận tác phẩm văn học</option>
                    <option value="exam_wishes">Lời chúc vượt vũ môn 2026</option>
                    <option value="teacher_love">Tâm tình gửi thầy cô</option>
                    <option value="youth_memories">Thanh xuân tuổi 18</option>
                  </select>
                </div>
              </div>

              {/* Associated Literary Work */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Gắn liền với tác phẩm nào trong SGK 12? (Tùy chọn)
                </label>
                <select
                  value={formRelatedWork}
                  onChange={(e) => setFormRelatedWork(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#A78BFA]"
                >
                  <option value="">-- Không chọn / Cảm xúc chung --</option>
                  {LITERARY_WORKS.map((w: LiteraryWork) => (
                    <option key={w.id} value={`${w.title} (${w.author})`}>
                      {w.title} – {w.author} (Kì {w.semester})
                    </option>
                  ))}
                </select>
              </div>

              {/* Stationery Background Picker */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Chọn mẫu giấy thư & phong cách trình bày
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {Object.entries(STATIONERY_CONFIG).map(([key, st]) => {
                    const active = formStationery === key;
                    return (
                      <button
                        type="button"
                        key={key}
                        onClick={() => setFormStationery(key as any)}
                        className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                          active
                            ? 'border-[#25234A] ring-2 ring-[#A78BFA]/50 bg-purple-50 font-bold'
                            : 'border-stone-200 hover:border-stone-300 bg-stone-50'
                        }`}
                      >
                        <div className="w-full h-3 rounded mb-1.5" style={{ backgroundColor: st.accentColor }} />
                        <span className="block truncate text-[11px]">{st.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Stamp Picker */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Dán con tem văn học yêu thích
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {Object.entries(STAMP_CONFIG).map(([key, st]) => {
                    const active = formStamp === key;
                    return (
                      <button
                        type="button"
                        key={key}
                        onClick={() => setFormStamp(key as any)}
                        className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                          active
                            ? 'border-[#25234A] ring-2 ring-[#A78BFA]/50 bg-purple-50'
                            : 'border-stone-200 bg-stone-50 hover:border-stone-300'
                        }`}
                      >
                        <span className="text-xl block mb-0.5">{st.icon}</span>
                        <p className="text-[10px] font-bold text-stone-800 leading-none">{st.label}</p>
                        <p className="text-[8px] text-stone-500 leading-none mt-0.5">{st.sub}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Content */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-stone-700">
                    Nội dung tâm tình / Cảm xúc <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[11px] text-stone-400">
                    {formContent.length} ký tự
                  </span>
                </div>
                <textarea
                  required
                  rows={5}
                  placeholder="Viết những cảm nghĩ chân thực nhất về tác phẩm, lời chúc gửi tới các bạn 12A03 hay những tâm tư thời áo trắng..."
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#A78BFA] leading-relaxed"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsWriteModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 text-sm font-medium"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#25234A] to-[#3B3868] text-[#FFF9F0] text-sm font-bold shadow hover:shadow-lg transition-all"
                >
                  <Send className="w-4 h-4 text-[#F5C76A]" />
                  <span>Thả thư vào hòm thư</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Detail Letter Modal */}
      {activeLetter && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8">
            {/* Top Bar */}
            <div className="bg-[#25234A] text-[#FFF9F0] px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#F5C76A]" />
                <span className="text-xs uppercase tracking-wider font-semibold text-[#A78BFA]">
                  Lưu bút Văn học 12 · THPT Yên Lãng
                </span>
              </div>
              <button
                onClick={() => setActiveLetter(null)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-[#FFF9F0] flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Letter Paper Body */}
            <div
              className={`p-8 md:p-10 ${
                STATIONERY_CONFIG[activeLetter.stationery]?.bgClass || 'bg-[#FDFBF7]'
              }`}
              style={{
                backgroundImage: STATIONERY_CONFIG[activeLetter.stationery]?.pattern,
              }}
            >
              {/* Header inside paper */}
              <div className="flex items-start justify-between gap-4 mb-6 pb-6 border-b border-stone-300/80">
                <div>
                  <span
                    className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-md mb-2 border ${
                      TAG_CONFIG[activeLetter.tag]?.color
                    }`}
                  >
                    {TAG_CONFIG[activeLetter.tag]?.label}
                  </span>
                  <h2 className="font-serif-literary text-2xl md:text-3xl font-bold text-stone-900 leading-tight">
                    {activeLetter.title}
                  </h2>
                  <div className="flex items-center gap-2 text-xs text-stone-600 mt-2">
                    <span className="font-bold text-stone-800">{activeLetter.senderName}</span>
                    <span>·</span>
                    <span>{activeLetter.schoolOrClass}</span>
                    <span>·</span>
                    <span>{activeLetter.date}</span>
                  </div>
                </div>

                {/* Stamp */}
                <div className="flex-shrink-0">
                  <div
                    className={`border-2 border-dashed p-2.5 rounded-lg text-center shadow-xs ${
                      STAMP_CONFIG[activeLetter.stamp]?.color || 'border-purple-600 bg-purple-50 text-purple-900'
                    }`}
                  >
                    <span className="text-2xl block mb-0.5">
                      {STAMP_CONFIG[activeLetter.stamp]?.icon}
                    </span>
                    <p className="text-[11px] font-bold leading-none">
                      {STAMP_CONFIG[activeLetter.stamp]?.label}
                    </p>
                    <p className="text-[9px] opacity-75 leading-none mt-0.5">
                      {STAMP_CONFIG[activeLetter.stamp]?.sub}
                    </p>
                  </div>
                </div>
              </div>

              {/* Related work reminder */}
              {activeLetter.relatedWork && (
                <div className="mb-6 p-3 rounded-xl bg-purple-50/80 border border-purple-200/80 flex items-center gap-2 text-xs text-purple-900">
                  <BookOpen className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <span>
                    Bức thư lấy cảm hứng từ tác phẩm: <strong>{activeLetter.relatedWork}</strong>
                  </span>
                </div>
              )}

              {/* Letter Main Content */}
              <div className="font-serif text-base md:text-lg text-stone-800 leading-relaxed space-y-4 whitespace-pre-wrap pb-6">
                {activeLetter.content}
              </div>

              {/* Signature */}
              <div className="pt-6 border-t border-stone-300/80 text-right">
                <p className="text-xs uppercase tracking-wider text-stone-500 font-sans">
                  Người viết thư
                </p>
                <p className="font-serif-literary text-xl font-bold text-[#25234A] mt-1">
                  {activeLetter.senderName}
                </p>
                <p className="text-xs text-stone-500 font-sans">{activeLetter.schoolOrClass}</p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="bg-stone-50 px-6 py-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => handleLike(activeLetter.id)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeLetter.userLiked
                    ? 'bg-rose-500 text-white'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${
                    activeLetter.userLiked ? 'fill-white text-white' : 'text-rose-500'
                  }`}
                />
                <span>Đồng cảm ({activeLetter.likes})</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => downloadLetterImage(activeLetter)}
                  disabled={isDownloading}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25234A] text-[#FFF9F0] text-xs font-bold hover:bg-[#3B3868] transition-colors shadow-xs"
                >
                  <Download className="w-4 h-4 text-[#F5C76A]" />
                  <span>{isDownloading ? 'Đang tạo ảnh...' : 'Lưu ảnh phong thư (PNG)'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
