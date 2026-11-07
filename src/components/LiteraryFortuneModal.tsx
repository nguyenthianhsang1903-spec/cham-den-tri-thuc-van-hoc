import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, X, Copy, Check, RefreshCw, Star, Flame, BookOpen } from 'lucide-react';
import { soundEngine } from '../utils/audioAmbience';
import { useProgress } from '../context/ProgressContext';

interface FortuneCard {
  id: string;
  hexagram: string; // e.g. "Thượng Cát - Bút Lực Vô Song"
  luckLevel: 'Đại Cát' | 'Thượng Cát' | 'Đại Lợi' | 'Như Ý';
  quote: string;
  source: string;
  author: string;
  semester: 1 | 2;
  message: string; // Lời bình & thông điệp thi cử
  examTip: string; // Lời khuyên viết văn
  luckySymbol: string; // Thần khí may mắn
}

const FORTUNE_CARDS: FortuneCard[] = [
  {
    id: 'f1',
    hexagram: 'Bút Lực Thần Kỳ · Khí Phách Hào Hoa',
    luckLevel: 'Đại Cát',
    quote: 'Sông Mã gầm lên khúc độc hành... Mắt trừng gửi mộng qua biên giới / Đêm mơ Hà Nội dáng kiều thơm',
    source: 'Tây Tiến',
    author: 'Quang Dũng',
    semester: 1,
    message: 'Bạn sở hữu nguồn năng lượng dồi dào và cảm xúc bay bổng. Những bài văn của bạn trong các kỳ thi sắp tới sẽ gây ấn tượng bởi sự hào hoa, sâu sắc và câu chữ đắt giá!',
    examTip: 'Khi phân tích thơ Tây Tiến, hãy làm nổi bật sự hòa quyện giữa chất lãng mạn mộng mơ và cảm hứng bi tráng phi thường của người lính.',
    luckySymbol: 'Bút Lông Vàng Trạng Nguyên'
  },
  {
    id: 'f2',
    hexagram: 'Toàn Vẹn Nhân Cách · Tâm Sáng Như Gương',
    luckLevel: 'Thượng Cát',
    quote: 'Không thể bên trong một đằng bên ngoài một nẻo được. Tôi muốn được là tôi toàn vẹn!',
    source: 'Hồn Trương Ba, da Hàng Thịt',
    author: 'Lưu Quang Vũ',
    semester: 2,
    message: 'Tâm trí bạn đang sáng rõ và kiên định. Đi thi với sự tự tin là chính mình, viết từ sự chân thành của trái tim thì điểm số sẽ luôn rực rỡ.',
    examTip: 'Đề nghị luận về vở kịch này luôn yêu cầu liên hệ thực tế: bài học sống trung thực, không thỏa hiệp với cái giả dối dung tục.',
    luckySymbol: 'Quả Thị Vàng Hương Thơm'
  },
  {
    id: 'f3',
    hexagram: 'Ý Chí Thép · Bất Khuất Sinh Tồn',
    luckLevel: 'Đại Cát',
    quote: 'Con người không được sinh ra để dành cho thất bại. Con người có thể bị hủy diệt nhưng không thể bị đánh bại.',
    source: 'Trở về (Ông già và biển cả)',
    author: 'Ernest Hemingway',
    semester: 2,
    message: 'Dù phía trước là núi bài tập hay áp lực thi cử lớp 12, sự bền bỉ sắt đá của bạn sẽ biến mọi thử thách thành vinh quang rực rỡ!',
    examTip: 'Vận dụng nguyên lý "tảng băng trôi" để phân tích: con cá kiếm và biển cả không chỉ là thiên nhiên mà là biểu tượng của ước mơ lớn lao.',
    luckySymbol: 'Chiếc Ngư Lao Thép'
  },
  {
    id: 'f4',
    hexagram: 'Thanh Xuân Rực Rỡ · Giao Cảm Cuồng Nhiệt',
    luckLevel: 'Như Ý',
    quote: 'Mau đi thôi! Mùa chưa ngả chiều hôm / Ta muốn ôm cả sự sống mới bắt đầu mơn mởn!',
    source: 'Vội vàng',
    author: 'Xuân Diệu',
    semester: 2,
    message: 'Năm học cuối cấp quý giá từng giây phút. Sự say mê và tình yêu học tập của bạn đang ở độ chín muồi nhất. Hãy bứt phá mạnh mẽ!',
    examTip: 'Chú ý quan niệm thời gian tuyến tính một đi không trở lại của Xuân Diệu và nhịp điệu cuống quýt của bài thơ.',
    luckySymbol: 'Cánh Bướm Tình Yêu'
  },
  {
    id: 'f5',
    hexagram: 'Tráng Chí Ngút Trời · Bền Lòng Báo Quốc',
    luckLevel: 'Thượng Cát',
    quote: 'Quốc thù vị báo đầu tiên bạch / Kỷ độ Long Tuyền đái nguyệt ma',
    source: 'Cảm hoài',
    author: 'Đặng Dung',
    semester: 1,
    message: 'Khí phách kiên cường của bạn sẽ giúp bạn giữ vững phong độ trước những câu hỏi khó và đề văn phân hóa cao.',
    examTip: 'So sánh hào khí Đông A thời Trần với khí thế thời Hậu Trần để thấy chiều sâu bi tráng mà không hề bi lụy.',
    luckySymbol: 'Thanh Kiếm Long Tuyền Ánh Trăng'
  },
  {
    id: 'f6',
    hexagram: 'Hoa Phúc Nở Rộ · Lương Tri Thức Tỉnh',
    luckLevel: 'Đại Lợi',
    quote: 'Hoa tử huyền nở trắng rừng... Muối của rừng mang lại sự bình yên và phước lành cho muôn loài.',
    source: 'Muối của rừng',
    author: 'Nguyễn Huy Thiệp',
    semester: 1,
    message: 'Lòng trắc ẩn và sự tử tế là chiếc chìa khóa vạn năng. Khi viết văn bằng cả tấm lòng hướng thiện, bạn sẽ chạm vào trái tim người chấm.',
    examTip: 'Làm nổi bật hành trình thức tỉnh nhân tính của ông Diểu và thông điệp sinh thái sâu sắc về mối quan hệ giữa người và tự nhiên.',
    luckySymbol: 'Đóa Hoa Tử Huyền Tinh Khôi'
  },
  {
    id: 'f7',
    hexagram: 'Chính Nghĩa Vững Bền · Hùng Biện Đanh Thép',
    luckLevel: 'Đại Cát',
    quote: 'Nước Việt Nam có quyền hưởng tự do và độc lập, và sự thật đã thành một nước tự do độc lập.',
    source: 'Tuyên ngôn Độc lập',
    author: 'Hồ Chí Minh',
    semester: 2,
    message: 'Tư duy logic và khả năng lập luận của bạn đang đạt đỉnh phong độ. Đề nghị luận xã hội hoặc văn học nghị luận sẽ là điểm tựa điểm 9+!',
    examTip: 'Nắm vững nghệ thuật lập luận "gậy ông đập lưng ông" và tính chính xác mẫu mực của văn chính luận Chủ tịch Hồ Chí Minh.',
    luckySymbol: 'Ngôi Sao Vàng Ba Đình'
  },
  {
    id: 'f8',
    hexagram: 'Nghệ Thuật Bất Tử · Tiếng Đàn Tự Do',
    luckLevel: 'Như Ý',
    quote: 'tiếng ghi-ta tròn bọt nước vỡ tan... li-la li-la li-la... giọt nước mắt vầng trăng',
    source: 'Đàn ghi ta của Lor-ca',
    author: 'Thanh Thảo',
    semester: 1,
    message: 'Sức sáng tạo bay bổng không giới hạn! Bạn có năng khiếu cảm thụ những hình ảnh tượng trưng siêu thực mới mẻ.',
    examTip: 'Khai thác các biện pháp chuyển đổi cảm giác (nghe thấy màu sắc, nhìn thấy âm thanh) để tăng điểm sáng tạo cho bài văn.',
    luckySymbol: 'Cây Đàn Ghi-ta Tím'
  },
  {
    id: 'f9',
    hexagram: 'Ánh Lửa Lạc Quan · Vượt Mọi Gian Khó',
    luckLevel: 'Thượng Cát',
    quote: 'Sơn thôn thiếu nữ ma bao túc / Bao túc ma hoàn, lô dĩ hồng',
    source: 'Mộ (Chiều tối)',
    author: 'Hồ Chí Minh',
    semester: 2,
    message: 'Ngay trong bóng tối, một chữ "hồng" làm bừng sáng cả bầu trời. Dù gặp đề thi bất ngờ, bạn vẫn sẽ luôn tìm ra hướng giải quyết xuất sắc!',
    examTip: 'Phân tích chữ "hồng" như nhãn tự của toàn bài, thể hiện sự chuyển động từ tối sang sáng, từ lạnh lẽo sang ấm áp của tinh thần Bác.',
    luckySymbol: 'Lò Than Hồng Xóm Núi'
  },
  {
    id: 'f10',
    hexagram: 'Tình Yêu Vô Tận · Thấu Suốt Trái Tim',
    luckLevel: 'Đại Lợi',
    quote: 'Trái tim anh là cõi vô biên không bờ bến... Chứa chan tình yêu và niềm khát khao hiểu biết.',
    source: 'Bài thơ số 28',
    author: 'Rabindranath Tagore',
    semester: 1,
    message: 'Sự thấu cảm sâu sắc giúp bạn luôn hiểu trọn vẹn yêu cầu của đề bài và nắm bắt tinh tế thế giới nội tâm của các nhân vật.',
    examTip: 'Nhấn mạnh triết lý phương Đông về tình yêu: tôn trọng sự bí ẩn thiêng liêng của tâm hồn bạn đời, không chiếm đoạt vị kỷ.',
    luckySymbol: 'Đèn Dầu Tri Thức Phương Đông'
  }
];

interface LiteraryFortuneModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiteraryFortuneModal: React.FC<LiteraryFortuneModalProps> = ({ isOpen, onClose }) => {
  const { addPoints } = useProgress();
  const [isShaking, setIsShaking] = useState(false);
  const [currentCard, setCurrentCard] = useState<FortuneCard | null>(null);
  const [copied, setCopied] = useState(false);
  const [drawCount, setDrawCount] = useState(0);

  if (!isOpen) return null;

  const handleDrawCard = () => {
    setIsShaking(true);
    soundEngine.playChime();

    setTimeout(() => {
      // Pick random card
      const randomIndex = Math.floor(Math.random() * FORTUNE_CARDS.length);
      const chosen = FORTUNE_CARDS[randomIndex];
      setCurrentCard(chosen);
      setIsShaking(false);
      setDrawCount((prev) => prev + 1);

      // Award study bonus points
      addPoints(25, true);

      // Confetti effect
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 900);
  };

  const handleCopy = () => {
    if (!currentCard) return;
    const text = `"${currentCard.quote}" — ${currentCard.source} (${currentCard.author}).\nQuẻ may mắn: ${currentCard.hexagram} (${currentCard.luckLevel})!\n[Văn học 12 – Chạm đến tri thức · THPT Yên Lãng, Lớp 12A03-K60]`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#25234A]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#FFF9F0] via-white to-[#FFF9F0] rounded-3xl border-2 border-[#F5C76A] shadow-2xl p-6 sm:p-9 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#25234A]/5 hover:bg-[#25234A]/10 text-[#25234A] flex items-center justify-center cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5C76A]/30 border border-[#F5C76A] text-[#25234A] text-xs sm:text-sm font-bold tracking-wide">
            <Sparkles className="w-4 h-4 text-[#D97706]" />
            <span>Trường THPT Yên Lãng · Lớp 12A03-K60 · Gieo Quẻ Mùa Thi 12</span>
          </div>
          <h2 className="font-serif-literary text-2xl sm:text-3xl lg:text-4xl font-bold text-[#25234A]">
            Rút Thẻ Cảm Hứng & May Mắn Đầu Ngày
          </h2>
          <p className="text-sm sm:text-base text-[#25234A]/80 max-w-lg mx-auto">
            Mỗi quẻ là một câu văn/câu thơ kiệt tác lớp 12, kèm theo lời chúc may mắn và bí kíp làm bài thi tốt nghiệp!
          </p>
        </div>

        {/* Fortune Drawing Tube / Display Area */}
        {!currentCard ? (
          <div className="text-center py-8 px-4 space-y-6">
            <div className={`relative inline-block transition-transform duration-300 ${isShaking ? 'animate-bounce scale-110' : ''}`}>
              <div className="w-32 h-44 sm:w-40 sm:h-56 mx-auto rounded-3xl bg-gradient-to-br from-[#25234A] to-[#3B3875] border-4 border-[#F5C76A] shadow-2xl flex flex-col items-center justify-center text-white p-4 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#F5C76A]/20 via-transparent to-transparent" />
                <BookOpen className="w-12 h-12 text-[#F5C76A] mb-3 animate-pulse" />
                <span className="font-serif-literary text-lg sm:text-xl font-bold text-[#F5C76A] tracking-wider text-center">
                  ỐNG QUẺ TRI THỨC
                </span>
                <span className="text-[11px] text-white/70 mt-1 uppercase tracking-widest">
                  12 THỰC CHIẾN
                </span>
              </div>
            </div>

            <div>
              <button
                disabled={isShaking}
                onClick={handleDrawCard}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#D97706] via-[#F5C76A] to-[#D97706] text-[#25234A] font-bold text-lg sm:text-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-3 mx-auto"
              >
                <Sparkles className="w-6 h-6 text-[#25234A]" />
                <span>{isShaking ? 'Đang gieo quẻ...' : 'Gieo quẻ lấy may (+25 điểm)'}</span>
              </button>
              <p className="text-xs text-[#25234A]/60 mt-3 font-medium">
                Gợi ý: Mỗi ngày rút một quẻ để lấy cảm hứng văn học và thêm tự tin trước mỗi giờ học.
              </p>
            </div>
          </div>
        ) : (
          /* Card Revealed */
          <div className="space-y-6 animate-in zoom-in-95 duration-300">
            {/* The Golden Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#FFFDF7] via-white to-[#FFF9EE] border-2 border-[#F5C76A] shadow-xl relative space-y-5">
              {/* Top Banner of Card */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#F5C76A]/30">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl bg-amber-100 text-amber-900 text-xs sm:text-sm font-bold border border-amber-300 flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-amber-600 fill-amber-500" />
                    <span>{currentCard.luckLevel}</span>
                  </span>
                  <span className="text-xs font-bold text-[#6D28D9] px-2.5 py-1 rounded-lg bg-[#A78BFA]/20">
                    Học kì {currentCard.semester}
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#25234A]/70">
                  Thần khí: <strong className="text-[#D97706]">{currentCard.luckySymbol}</strong>
                </div>
              </div>

              {/* Hexagram Name */}
              <div className="text-center">
                <h3 className="font-serif-literary text-xl sm:text-2xl font-bold text-[#25234A] tracking-tight">
                  {currentCard.hexagram}
                </h3>
              </div>

              {/* Iconic Quote */}
              <div className="p-5 rounded-2xl bg-[#25234A] text-white text-center space-y-2 shadow-inner">
                <p className="font-serif-literary italic text-lg sm:text-xl text-[#FFF9F0] leading-relaxed">
                  "{currentCard.quote}"
                </p>
                <p className="text-xs sm:text-sm font-bold text-[#F5C76A] tracking-wide">
                  — {currentCard.source} ({currentCard.author})
                </p>
              </div>

              {/* Fortune Message */}
              <div className="space-y-3 text-[#25234A]">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#D97706] flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-amber-500" />
                    <span>Lời bình & Vận may học tập:</span>
                  </h4>
                  <p className="text-sm sm:text-base leading-relaxed text-[#25234A]/90 mt-1 font-medium">
                    {currentCard.message}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#A78BFA]/10 border border-[#A78BFA]/30">
                  <h4 className="text-xs sm:text-sm font-bold text-[#6D28D9] flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-[#8B5CF6]" />
                    <span>Bí kíp thực chiến thi tốt nghiệp:</span>
                  </h4>
                  <p className="text-xs sm:text-sm leading-relaxed text-[#25234A]/90 mt-1 font-medium">
                    {currentCard.examTip}
                  </p>
                </div>
              </div>

              {/* Bonus Notification */}
              <div className="text-center pt-1">
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Chúc mừng bạn đã nhận +25 điểm may mắn vào sổ học bạ!</span>
                </span>
              </div>
            </div>

            {/* Actions: Copy quote & Draw another */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleCopy}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white border border-[#25234A]/20 hover:border-[#8B5CF6] text-sm sm:text-base font-bold text-[#25234A] transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">Đã chép danh ngôn!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#8B5CF6]" />
                    <span>Sao chép câu danh ngôn</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDrawCard}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#25234A] hover:bg-[#8B5CF6] text-white text-sm sm:text-base font-bold transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Gieo quẻ khác ({drawCount} lần)</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
