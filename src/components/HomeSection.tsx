import React from 'react';
import {
  BookOpen,
  Gamepad2,
  BrainCircuit,
  FileCheck2,
  Award,
  ArrowRight,
  Sparkles,
  Feather,
  Compass,
  Star,
  Flame,
  Mail,
  PenTool,
  Heart,
  Users,
  GraduationCap
} from 'lucide-react';
import { IntroductionSection } from './IntroductionSection';

interface HomeSectionProps {
  onNavigate: (tab: 'home' | 'works' | 'mailbox' | 'knowledge' | 'games' | 'exams' | 'achievements') => void;
  onSelectWork: (workId: string) => void;
  onOpenFortune: () => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ onNavigate, onSelectWork, onOpenFortune }) => {
  return (
    <div className="space-y-12 sm:space-y-20">
      {/* 1. PHẦN GIỚI THIỆU ĐẦU TIÊN: SẢN PHẨM HỌC TẬP SỐ - MÔN NGỮ VĂN */}
      <IntroductionSection
        onNavigateToWorks={() => onNavigate('works')}
        onNavigateToMailbox={() => onNavigate('mailbox')}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-2 pb-6 lg:pt-4 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#A78BFA]/20 text-[#25234A] text-xs sm:text-sm font-bold tracking-wide">
              <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
              <span>Năm học 2026–2027 · GV: Võ Thị Mỹ Ngà · Lớp 12A03-K60 · THPT Yên Lãng</span>
            </div>

            <h1 className="font-serif-literary text-3xl sm:text-5xl lg:text-6xl font-bold text-[#25234A] leading-[1.2] text-balance">
              “Văn học không chỉ để đọc, mà còn để cảm nhận và khám phá”
            </h1>

            <p className="text-lg sm:text-xl text-[#25234A]/85 leading-relaxed font-medium">
              Chào mừng bạn đến với <strong>VĂN HỌC 12 – CHẠM ĐẾN TRI THỨC</strong>, kho tàng học tập số kết hợp
              sơ đồ tư duy, hệ thống 32 tác phẩm toàn diện (Tập 1 & Tập 2), <strong>Hộp thư cảm xúc & Lưu bút thanh xuân</strong> tương tác và đấu trường trò chơi thực tế dành cho học sinh,
              thầy cô và những ai yêu thích văn chương.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('works')}
                className="px-7 py-4 rounded-2xl bg-[#25234A] text-[#FFF9F0] font-bold text-base hover:bg-[#383466] transition-all shadow-lg hover:shadow-xl flex items-center gap-2.5 group cursor-pointer"
              >
                <span>Khám phá 32 tác phẩm</span>
                <ArrowRight className="w-5 h-5 text-[#F5C76A] group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('mailbox')}
                className="px-7 py-4 rounded-2xl bg-[#8B5CF6] text-white font-bold text-base hover:bg-[#7C3AED] transition-all shadow-md hover:shadow-lg flex items-center gap-2.5 cursor-pointer"
              >
                <Mail className="w-5 h-5 text-[#F5C76A]" />
                <span>Hộp thư cảm xúc 12A03</span>
              </button>

              <button
                onClick={() => onNavigate('games')}
                className="px-6 py-4 rounded-2xl bg-white border-2 border-[#25234A]/20 text-[#25234A] font-bold text-base hover:bg-[#25234A]/5 transition-all shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <Gamepad2 className="w-5 h-5 text-[#8B5CF6]" />
                <span>Trò chơi tương tác</span>
              </button>
            </div>

            {/* Creators highlight */}
            <div className="pt-6 border-t border-[#25234A]/10 flex flex-wrap items-center gap-y-2 gap-x-8 text-sm text-[#25234A]">
              <span className="font-bold uppercase tracking-wider text-xs text-[#8B5CF6]">
                Đơn vị & Tác giả:
              </span>
              <span className="flex items-center gap-2 font-bold text-base text-[#25234A]">
                <Feather className="w-4 h-4 text-[#8B5CF6]" />
                Lưu Gia Linh
              </span>
              <span className="flex items-center gap-2 font-bold text-base text-[#25234A]">
                <Feather className="w-4 h-4 text-[#8B5CF6]" />
                Nguyễn Thị Ánh Sáng
              </span>
              <span className="px-3 py-1 rounded-xl bg-amber-100 text-amber-900 font-bold text-xs">
                Lớp 12A03-K60 · THPT Yên Lãng
              </span>
            </div>
          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white aspect-[16/10] lg:aspect-[4/3] group">
              <img
                src="/src/assets/images/hero_literary_study_1793974936394.jpg"
                alt="Bàn học văn học nghệ thuật với sách mở và bút mực tím"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#25234A]/85 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs uppercase tracking-wider text-[#F5C76A] font-bold">
                  Trường THPT Yên Lãng – Lớp 12A03-K60
                </span>
                <p className="font-serif-literary text-xl font-bold">
                  Kho tàng Ngữ văn 12 toàn diện & Hộp thư cảm xúc
                </p>
              </div>
            </div>

            {/* Floating badge */}
            <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-white p-4 sm:p-5 rounded-3xl shadow-xl border border-[#25234A]/10 items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#A78BFA]/20 flex items-center justify-center text-[#8B5CF6] shrink-0">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <p className="text-xs text-[#25234A]/60 font-semibold">Trường THPT Yên Lãng 2026</p>
                <p className="text-base font-bold text-[#25234A]">Cả 2 học kì · 32 Tác phẩm trọn vẹn</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED: HỘP THƯ VĂN HỌC & CẢM XÚC BANNER */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#25234A] via-[#35306B] to-[#1E1B4B] text-white p-6 sm:p-10 border-2 border-[#A78BFA] shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5C76A]/20 border border-[#F5C76A]/40 text-[#F5C76A] text-xs font-bold tracking-wider uppercase">
              <Mail className="w-4 h-4 text-[#F5C76A]" />
              <span>Góc chia sẻ cảm xúc & lưu bút · Lớp 12A03-K60</span>
            </div>
            <h2 className="font-serif-literary text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FFF9F0] leading-snug">
              Hộp Thư Văn Học & Lưu Bút Thanh Xuân
            </h2>
            <p className="text-base sm:text-lg text-white/85 leading-relaxed font-normal">
              Nơi mọi người có thể tự do trải lòng, gửi gắm những rung cảm sâu sắc trước vẻ đẹp của văn chương, lời chúc thi cử may mắn và những dòng lưu bút ý nghĩa của tuổi 18 dưới mái trường THPT Yên Lãng. Bạn có thể chọn phong cách giấy thư vintage, dán tem danh tác và tải ảnh thư kỷ niệm về máy!
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('mailbox')}
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#F5C76A] to-[#E5B54F] text-[#25234A] font-bold text-base shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2.5"
              >
                <PenTool className="w-5 h-5 text-[#25234A]" />
                <span>Viết & Gửi thư cảm xúc ngay</span>
              </button>
              <span className="text-xs text-white/70">
                5 Phong cách giấy thư · Con tem văn học · Xuất ảnh thư PNG sắc nét
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 relative group cursor-pointer" onClick={() => onNavigate('mailbox')}>
            <div className="rounded-3xl p-6 bg-[#FFF9F0] text-[#25234A] border-2 border-[#F5C76A] shadow-2xl relative transform group-hover:rotate-1 transition-all">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8B5CF6]">
                  Lưu bút 12A03-K60
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-rose-50 text-rose-600 font-semibold flex items-center gap-1">
                  <Heart className="w-3 h-3 fill-rose-500" /> Đồng cảm
                </span>
              </div>
              <p className="font-serif-literary text-base font-bold text-[#25234A] mb-1">
                “Gửi 12A03-K60 và những ngày tháng mười tám rực rỡ”
              </p>
              <p className="text-xs text-stone-600 italic line-clamp-3 mb-4">
                Văn học với chúng mình không phải là những bài phân tích khô khan, mà là sự đồng điệu với Quang Dũng trên đỉnh Pha Luông hùng vĩ, là khát vọng sống hết mình cùng Xuân Diệu...
              </p>
              <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-200">
                <span className="font-semibold text-stone-800">Lưu Gia Linh & Ánh Sáng</span>
                <span className="text-[#8B5CF6] font-bold">Bấm để đọc thêm &rarr;</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE ENGAGING FEATURE: GIEO QUẺ VĂN HỌC BANNER */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#25234A] via-[#37336D] to-[#25234A] text-white p-6 sm:p-10 border-2 border-[#F5C76A] shadow-2xl">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#F5C76A]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5C76A]/20 border border-[#F5C76A]/40 text-[#F5C76A] text-xs font-bold tracking-wider uppercase">
              <Flame className="w-4 h-4 text-[#F5C76A]" />
              <span>Góc tương tác lôi cuốn · Độc quyền lớp 12A03-K60</span>
            </div>
            <h2 className="font-serif-literary text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FFF9F0]">
              Gieo Quẻ Văn Học – Rút Thẻ Cảm Hứng Mùa Thi
            </h2>
            <p className="text-base sm:text-lg text-white/85 max-w-2xl font-normal leading-relaxed">
              Bạn đang hồi hộp trước kỳ thi hay cần một luồng cảm hứng viết bài? Hãy lắc ống quẻ tri thức để nhận câu danh ngôn văn học kiệt tác, lời bình may mắn và <strong>+25 điểm thưởng</strong> ngay lập tức!
            </p>
          </div>

          <button
            onClick={onOpenFortune}
            className="shrink-0 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#F5C76A] via-[#FDE047] to-[#F5C76A] text-[#25234A] font-bold text-base sm:text-lg shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-3"
          >
            <Sparkles className="w-6 h-6 text-[#25234A]" />
            <span>Gieo quẻ lấy may ngay!</span>
          </button>
        </div>
      </section>

      {/* Quick Statistics Strip */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-6 rounded-3xl bg-white border border-[#25234A]/10 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#A78BFA]/20 flex items-center justify-center text-[#8B5CF6] shrink-0">
            <BookOpen className="w-7 h-7" />
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-bold font-serif-literary text-[#25234A]">32</p>
            <p className="text-sm text-[#25234A]/80 font-bold">Tác phẩm cả 2 học kì</p>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#25234A]/10 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center text-[#7C3AED] shrink-0">
            <Mail className="w-7 h-7" />
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-bold font-serif-literary text-[#25234A]">Hộp thư</p>
            <p className="text-sm text-[#25234A]/80 font-bold">Lưu bút cảm xúc 12A03</p>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#25234A]/10 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center text-[#6D28D9] shrink-0">
            <Gamepad2 className="w-7 h-7" />
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-bold font-serif-literary text-[#25234A]">5 Game</p>
            <p className="text-sm text-[#25234A]/80 font-bold">Đấu trường trí tuệ phân kỳ</p>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#25234A]/10 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
            <FileCheck2 className="w-7 h-7" />
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-bold font-serif-literary text-[#25234A]">10 Ải</p>
            <p className="text-sm text-[#25234A]/80 font-bold">Vượt chướng ngại vật</p>
          </div>
        </div>
      </section>

      {/* Featured Literary Works Spotlight */}
      <section className="p-8 sm:p-10 rounded-3xl bg-white border border-[#25234A]/10 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif-literary text-2xl sm:text-3xl font-bold text-[#25234A]">
              Tác phẩm tiêu biểu của 2 học kì
            </h2>
            <p className="text-sm text-[#25234A]/70 font-medium">
              Nhấn vào từng tác phẩm để mở trực tiếp sơ đồ tư duy, hướng dẫn làm bài và tải ảnh thẻ bài học
            </p>
          </div>
          <button
            onClick={() => onNavigate('works')}
            className="text-sm font-bold text-[#8B5CF6] hover:underline flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <span>Xem tất cả 32 tác phẩm</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { id: 'xuan-toc-do-cuu-quoc', title: 'Xuân Tóc Đỏ cứu quốc', author: 'Vũ Trọng Phụng', genre: 'Tiểu thuyết trào phúng', sem: 'Học kì 1 (Bài 1)' },
            { id: 'tay-tien', title: 'Tây Tiến', author: 'Quang Dũng', genre: 'Thơ lãng mạn bi tráng', sem: 'Học kì 1 (Bài 2)' },
            { id: 'muoi-cua-rung', title: 'Muối của rừng', author: 'Nguyễn Huy Thiệp', genre: 'Truyện huyền thoại', sem: 'Học kì 1 (Bài 4)' },
            { id: 'tuyen-ngon-doc-lap', title: 'Tuyên ngôn Độc lập', author: 'Hồ Chí Minh', genre: 'Văn chính luận bất hủ', sem: 'Học kì 2 (Bài 6)' },
            { id: 'voi-vang', title: 'Vội vàng', author: 'Xuân Diệu', genre: 'Thơ mới đỉnh cao', sem: 'Học kì 2 (Bài 9)' },
            { id: 'hon-truong-ba-da-hang-thit', title: 'Hồn Trương Ba, da hàng thịt', author: 'Lưu Quang Vũ', genre: 'Kịch triết lý nhân sinh', sem: 'Học kì 2 (Bài 9)' }
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => {
                onNavigate('works');
                onSelectWork(item.id);
              }}
              className="p-6 rounded-2xl bg-[#FFF9F0] border-2 border-[#25234A]/10 hover:border-[#8B5CF6] hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-xs font-bold text-[#25234A]/70">
                <span className="text-[#8B5CF6]">{item.sem}</span>
                <span>{item.genre}</span>
              </div>
              <h4 className="font-serif-literary text-xl font-bold text-[#25234A] group-hover:text-[#8B5CF6] transition-colors mt-2">
                {item.title}
              </h4>
              <p className="text-sm text-[#25234A]/80 font-semibold mt-1">Tác giả: {item.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Creators Card & School Attribution */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        <div className="md:col-span-8 p-8 sm:p-10 rounded-3xl bg-[#25234A] text-white flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#F5C76A] text-xs font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Năm học: 2026–2027 · Khóa K60 – Trường THPT Yên Lãng</span>
            </div>
            <h3 className="font-serif-literary text-2xl sm:text-3xl font-bold leading-snug">
              Sản phẩm học tập số môn Ngữ văn 12
            </h3>
            <p className="text-base text-white/85 leading-relaxed font-normal">
              Được nghiên cứu và xây dựng bởi hai học sinh <strong>Lưu Gia Linh</strong> và <strong>Nguyễn Thị Ánh Sáng</strong> (Lớp 12A03, Khóa K60, Trường THPT Yên Lãng), dưới sự hướng dẫn chuyên môn của giáo viên <strong>Võ Thị Mỹ Ngà</strong> trong năm học 2026–2027. Website đem đến một hệ sinh thái học tập đa giác quan: từ kho 32 tác phẩm chuẩn SGK Kết nối tri thức, sơ đồ tư duy, thư viện kỹ năng đến hộp thư lưu bút và trò chơi tương tác thực chiến.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-xs text-[#F5C76A] font-bold uppercase tracking-wider">Giáo viên hướng dẫn</p>
              <p className="font-serif-literary text-lg font-bold text-white mt-1">Cô Võ Thị Mỹ Ngà</p>
              <p className="text-xs text-white/70 mt-0.5">Giáo viên bộ môn Ngữ văn</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-xs text-[#F5C76A] font-bold uppercase tracking-wider">Học sinh thực hiện</p>
              <p className="font-serif-literary text-lg font-bold text-white mt-1">Lưu Gia Linh</p>
              <p className="text-xs text-white/70 mt-0.5">Lớp 12A03-K60 · THPT Yên Lãng</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-xs text-[#F5C76A] font-bold uppercase tracking-wider">Học sinh thực hiện</p>
              <p className="font-serif-literary text-lg font-bold text-white mt-1">Nguyễn Thị Ánh Sáng</p>
              <p className="text-xs text-white/70 mt-0.5">Lớp 12A03-K60 · THPT Yên Lãng</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-4 rounded-3xl overflow-hidden shadow-lg border border-[#25234A]/10 bg-white relative min-h-64">
          <img
            src="/src/assets/images/literature_library_books_1793974937139.jpg"
            alt="Thư viện văn học sách và ghi chú"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>
    </div>
  );
};
