import React, { useState } from 'react';
import {
  GraduationCap,
  Calendar,
  UserCheck,
  Users,
  Building2,
  Sparkles,
  BookOpen,
  Award,
  Feather,
  ChevronDown,
  ChevronUp,
  Heart,
  CheckCircle2,
  FileText
} from 'lucide-react';

interface IntroductionSectionProps {
  onNavigateToWorks?: () => void;
  onNavigateToMailbox?: () => void;
}

export const IntroductionSection: React.FC<IntroductionSectionProps> = ({
  onNavigateToWorks,
  onNavigateToMailbox,
}) => {
  const [showFullDossier, setShowFullDossier] = useState(false);

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#25234A] via-[#2F2B5C] to-[#1E1B43] text-white p-6 sm:p-8 lg:p-10 border-2 border-[#F5C76A] shadow-2xl">
      {/* Decorative Guilloche / Golden Background Glows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#F5C76A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#8B5CF6]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Outer Delicate Border Line */}
      <div className="relative z-10 space-y-6 sm:space-y-8">
        {/* Top Header Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[#F5C76A] text-xs font-bold tracking-wide uppercase">
            <Building2 className="w-4 h-4 text-[#F5C76A]" />
            <span>Trường THPT Yên Lãng · Mê Linh, Hà Nội</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-purple-200 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#F5C76A]" />
            <span>Công trình chuyển đổi số học đường 2026–2027</span>
          </div>
        </div>

        {/* Ceremonial Project Title Banner */}
        <div className="text-center space-y-2.5 max-w-4xl mx-auto py-2">
          <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#F5C76A] font-bold">
            BÁO CÁO & GIỚI THIỆU ĐỀ ÁN HỌC ĐƯỜNG
          </p>

          <h1 className="font-serif-literary text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-[#FFF9F0] uppercase drop-shadow-sm">
            SẢN PHẨM HỌC TẬP SỐ
          </h1>

          <div className="inline-block">
            <h2 className="font-serif-literary text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F5C76A] via-[#FDE047] to-[#F5C76A] tracking-wide">
              MÔN NGỮ VĂN
            </h2>
            <div className="h-1 w-28 bg-[#F5C76A] mx-auto rounded-full mt-1.5" />
          </div>

          <p className="text-xs sm:text-sm text-white/80 max-w-2xl mx-auto pt-1 font-sans">
            Chương trình Giáo dục phổ thông mới – Bộ sách <strong>Kết nối tri thức với cuộc sống</strong>
          </p>
        </div>

        {/* 4 Core Metadata Pillars Required by Brief */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {/* 1. Năm học */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#F5C76A]/60 transition-all backdrop-blur-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase tracking-wider text-white/60 font-semibold">Thời gian</span>
              <div className="w-8 h-8 rounded-lg bg-[#F5C76A]/20 flex items-center justify-center text-[#F5C76A]">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <div>
              <p className="text-xs text-white/70 font-medium">Năm học:</p>
              <p className="font-serif-literary text-xl sm:text-2xl font-bold text-[#F5C76A] tracking-tight">
                2026–2027
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-white/10 text-[11px] text-white/60 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Chuẩn SGK mới</span>
            </div>
          </div>

          {/* 2. Giáo viên */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#F5C76A]/60 transition-all backdrop-blur-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase tracking-wider text-white/60 font-semibold">Cố vấn chuyên môn</span>
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-[#A78BFA]">
                <UserCheck className="w-4 h-4" />
              </div>
            </div>
            <div>
              <p className="text-xs text-white/70 font-medium">Giáo viên:</p>
              <p className="font-serif-literary text-xl sm:text-2xl font-bold text-white tracking-tight">
                Võ Thị Mỹ Ngà
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-white/10 text-[11px] text-white/60 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-[#F5C76A]" />
              <span>Giáo viên bộ môn Ngữ văn</span>
            </div>
          </div>

          {/* 3. Học sinh lớp */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#F5C76A]/60 transition-all backdrop-blur-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase tracking-wider text-white/60 font-semibold">Tập thể tác giả</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div>
              <p className="text-xs text-white/70 font-medium">Học sinh lớp:</p>
              <p className="font-serif-literary text-xl sm:text-2xl font-bold text-white tracking-tight">
                12A03
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-white/10 text-[11px] text-white/60 flex items-center gap-1.5">
              <Feather className="w-3.5 h-3.5 text-[#F5C76A]" />
              <span className="truncate">Lưu Gia Linh & Ánh Sáng</span>
            </div>
          </div>

          {/* 4. Khóa & Trường */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#F5C76A]/60 transition-all backdrop-blur-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase tracking-wider text-white/60 font-semibold">Đơn vị đào tạo</span>
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-[#F5C76A]">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div>
              <p className="text-xs text-white/70 font-medium">Khóa:</p>
              <p className="font-serif-literary text-xl sm:text-2xl font-bold text-[#F5C76A] tracking-tight">
                K60
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-white/10 text-[11px] text-white/60 flex items-center gap-1.5 truncate">
              <Building2 className="w-3.5 h-3.5 text-white/80 shrink-0" />
              <span className="truncate">Trường THPT Yên Lãng</span>
            </div>
          </div>
        </div>

        {/* Project Statement & Toggle Full Dossier */}
        <div className="p-4 sm:p-5 rounded-2xl bg-black/20 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-white/95 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#F5C76A]" />
              <span>Thông điệp đề án: “Văn học kết nối tri thức – Chắp cánh ước mơ mùa thi 2026–2027”</span>
            </p>
            <p className="text-xs text-white/75 leading-relaxed">
              Dự án chuyển đổi số toàn diện do học sinh lớp 12A03 (Khóa K60 – THPT Yên Lãng) thực hiện dưới sự hướng dẫn của cô giáo Võ Thị Mỹ Ngà. Tích hợp trọn bộ 32 tác phẩm, thư viện ôn tập, trắc nghiệm tương tác và hộp thư lưu bút.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setShowFullDossier(!showFullDossier)}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors flex items-center gap-1.5 cursor-pointer border border-white/15"
            >
              <FileText className="w-3.5 h-3.5 text-[#F5C76A]" />
              <span>{showFullDossier ? 'Thu gọn hồ sơ' : 'Xem hồ sơ đề án'}</span>
              {showFullDossier ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Detailed Dossier Accordion */}
        {showFullDossier && (
          <div className="p-6 rounded-2xl bg-[#1A173B]/90 border border-[#F5C76A]/40 space-y-5 animate-in fade-in duration-200 text-sm">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#F5C76A]" />
                <h3 className="font-serif-literary text-lg font-bold text-[#F5C76A]">
                  HỒ SƠ ĐỀ ÁN SẢN PHẨM HỌC TẬP SỐ MÔN NGỮ VĂN
                </h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-[#F5C76A]/20 text-[#F5C76A] font-mono font-bold">
                MÃ ĐỀ ÁN: THPT-YL-12A03-K60-VAN
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div className="space-y-3">
                <div>
                  <h4 className="font-bold text-white flex items-center gap-1.5 mb-1 text-xs uppercase tracking-wider text-[#A78BFA]">
                    1. Đơn vị chủ trì & Tổ chức
                  </h4>
                  <ul className="space-y-1 text-white/80">
                    <li>• <strong>Đơn vị:</strong> Trường THPT Yên Lãng (Mê Linh, Hà Nội)</li>
                    <li>• <strong>Khóa học:</strong> Khóa K60</li>
                    <li>• <strong>Lớp:</strong> 12A03</li>
                    <li>• <strong>Năm học thực hiện:</strong> 2026–2027</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-white flex items-center gap-1.5 mb-1 text-xs uppercase tracking-wider text-[#A78BFA]">
                    2. Cán bộ hướng dẫn & Học sinh nghiên cứu
                  </h4>
                  <ul className="space-y-1 text-white/80">
                    <li>• <strong>Giáo viên hướng dẫn:</strong> Cô Võ Thị Mỹ Ngà (Giáo viên bộ môn Ngữ văn)</li>
                    <li>• <strong>Học sinh trưởng nhóm:</strong> Lưu Gia Linh (Lớp 12A03)</li>
                    <li>• <strong>Học sinh đồng thực hiện:</strong> Nguyễn Thị Ánh Sáng (Lớp 12A03)</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="font-bold text-white flex items-center gap-1.5 mb-1 text-xs uppercase tracking-wider text-[#A78BFA]">
                    3. Mục tiêu & Ý nghĩa đề án
                  </h4>
                  <p className="text-white/80 leading-relaxed">
                    Xây dựng không gian học tập trực tuyến trực quan, số hóa toàn diện nội dung Ngữ văn 12 (bộ sách Kết nối tri thức với cuộc sống), phát triển năng lực tự học, cảm thụ văn học, tư duy phản biện và lưu giữ những giá trị nhân văn của thời học trò K60 THPT Yên Lãng.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-white flex items-center gap-1.5 mb-1 text-xs uppercase tracking-wider text-[#A78BFA]">
                    4. Các tính năng cốt lõi
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <span className="p-2 rounded bg-white/5 border border-white/5">📚 32 tác phẩm SGK (Tập 1 & 2)</span>
                    <span className="p-2 rounded bg-white/5 border border-white/5">💡 Sơ đồ tư duy & Phân tích sâu</span>
                    <span className="p-2 rounded bg-white/5 border border-white/5">💌 Hộp thư lưu bút 12A03</span>
                    <span className="p-2 rounded bg-white/5 border border-white/5">🎮 5 Trò chơi & Đề thi thử</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-white/70">
              <span className="italic">
                “Kính tặng thầy cô Trường THPT Yên Lãng và tập thể 12A03-K60 với tất cả niềm tri ân sâu sắc.”
              </span>
              <span className="font-semibold text-[#F5C76A]">
                Năm học 2026–2027 · GV: Võ Thị Mỹ Ngà
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
