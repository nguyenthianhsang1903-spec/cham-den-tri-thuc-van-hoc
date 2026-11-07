import React from 'react';
import { BookMarked, Heart, Sparkles, Feather, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: 'home' | 'works' | 'mailbox' | 'knowledge' | 'games' | 'exams' | 'achievements') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#25234A] text-[#FFF9F0] border-t border-[#3B3868] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/10">
          {/* Main Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <Feather className="w-6 h-6 text-[#F5C76A]" />
              <h3 className="font-serif-literary text-xl font-bold tracking-wide text-[#FFF9F0]">
                SẢN PHẨM HỌC TẬP SỐ – MÔN NGỮ VĂN
              </h3>
            </div>
            <p className="text-sm text-[#FFF9F0]/80 leading-relaxed max-w-md">
              Bộ sách <strong>Kết nối tri thức với cuộc sống</strong> · <strong>Năm học: 2026–2027</strong>.<br />
              <strong>Giáo viên hướng dẫn:</strong> Võ Thị Mỹ Ngà.<br />
              <strong>Học sinh lớp:</strong> 12A03 (Lưu Gia Linh & Nguyễn Thị Ánh Sáng).<br />
              <strong>Khóa:</strong> K60 – Trường THPT Yên Lãng.
            </p>
            <div className="pt-2">
              <p className="text-xs italic text-[#F5C76A]/90 font-serif-literary leading-relaxed border-l-2 border-[#F5C76A] pl-3 py-0.5">
                “Mỗi tác phẩm là một thế giới, mỗi lần đọc là một hành trình khám phá.”
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#A78BFA]">
              Phân hệ nội dung
            </h4>
            <ul className="space-y-2 text-sm text-[#FFF9F0]/70">
              <li>
                <button
                  onClick={() => onNavigate('works')}
                  className="hover:text-[#FFF9F0] transition-colors cursor-pointer"
                >
                  Kho tàng 32 tác phẩm SGK 12
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('mailbox')}
                  className="hover:text-[#FFF9F0] text-[#F5C76A] font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-[#F5C76A]" />
                  <span>Hộp thư cảm xúc 12A03</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('knowledge')}
                  className="hover:text-[#FFF9F0] transition-colors cursor-pointer"
                >
                  Thư viện kỹ năng & Sổ tay tu từ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('games')}
                  className="hover:text-[#FFF9F0] transition-colors cursor-pointer"
                >
                  5 Trò chơi văn học tương tác
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('exams')}
                  className="hover:text-[#FFF9F0] transition-colors cursor-pointer"
                >
                  Đề luyện thi THPT tự chấm
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('achievements')}
                  className="hover:text-[#FFF9F0] transition-colors cursor-pointer"
                >
                  Bảng vàng & Chứng nhận học sinh
                </button>
              </li>
            </ul>
          </div>

          {/* Creators info */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#A78BFA]">
              Đơn vị & Tác giả dự án
            </h4>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2.5">
              <div className="text-xs font-bold text-[#F5C76A] uppercase tracking-wider">
                Trường THPT Yên Lãng · Năm học 2026–2027
              </div>
              <div className="flex items-center gap-2 text-sm text-[#FFF9F0]">
                <Sparkles className="w-4 h-4 text-[#F5C76A]" />
                <span className="font-semibold">Giáo viên: Võ Thị Mỹ Ngà</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#FFF9F0]">
                <Sparkles className="w-4 h-4 text-[#A78BFA]" />
                <span className="font-semibold">Học sinh lớp 12A03 (K60): Lưu Gia Linh & Ánh Sáng</span>
              </div>
              <p className="text-xs text-[#FFF9F0]/60 pt-1 border-t border-white/10">
                Sản phẩm học tập số môn Ngữ văn 12 phục vụ học sinh và giáo viên ôn thi THPT Quốc gia.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FFF9F0]/60">
          <p>© 2026 VĂN HỌC 12 – CHẠM ĐẾN TRI THỨC · LỚP 12A03-K60 · TRƯỜNG THPT YÊN LÃNG</p>
          <div className="flex items-center gap-2">
            <span>Đồng hành cùng sĩ tử 2007 - 2008</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              Thực hiện với <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" /> và nhiệt huyết văn chương
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
