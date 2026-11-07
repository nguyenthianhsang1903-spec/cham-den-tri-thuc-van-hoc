export interface Letter {
  id: string;
  senderName: string;
  senderRole: string; // e.g. "Học sinh 12A03-K60", "Lưu Gia Linh", "Nguyễn Thị Ánh Sáng"
  schoolOrClass: string;
  date: string;
  title: string;
  content: string;
  tag: '12a03' | 'work_review' | 'exam_wishes' | 'youth_memories' | 'teacher_love';
  relatedWork?: string;
  stationery: 'vintage' | 'lavender' | 'lined' | 'gold' | 'kraft';
  stamp: 'tay_tien' | 'voi_vang' | 'yen_lang' | 'pho_nho' | 'phuong_vi';
  likes: number;
  userLiked?: boolean;
}

export const INITIAL_LETTERS: Letter[] = [
  {
    id: 'letter-1',
    senderName: 'Lưu Gia Linh',
    senderRole: 'Đồng tác giả dự án · Học sinh 12A03-K60',
    schoolOrClass: 'Lớp 12A03-K60 – Trường THPT Yên Lãng',
    date: '07-11-2026',
    title: 'Gửi 12A03-K60 và những ngày tháng mười tám rực rỡ',
    content: 'Khi bắt tay cùng Ánh Sáng tạo nên trang web Văn Học 12 này, mình chỉ nghĩ đơn giản là muốn làm một điều gì đó thật đẹp cho lớp mình, cho mái trường Yên Lãng thân yêu. Văn học với chúng mình không phải là những bài phân tích khô khan, mà là sự đồng điệu với Quang Dũng trên đỉnh Pha Luông hùng vĩ, là khát vọng sống hết mình cùng Xuân Diệu trong "Vội vàng". Chúc cả tập thể 12A03-K60 của chúng ta sẽ cùng nhau vượt vũ môn thành công, chạm tay vào ước mơ đại học và giữ mãi nụ cười hồn nhiên của tuổi học trò!',
    tag: '12a03',
    relatedWork: 'Vội vàng (Xuân Diệu)',
    stationery: 'lavender',
    stamp: 'yen_lang',
    likes: 48,
  },
  {
    id: 'letter-2',
    senderName: 'Nguyễn Thị Ánh Sáng',
    senderRole: 'Đồng tác giả dự án · Học sinh 12A03-K60',
    schoolOrClass: 'Lớp 12A03-K60 – Trường THPT Yên Lãng',
    date: '07-11-2026',
    title: 'Những nốt nhạc văn chương chạm đến trái tim',
    content: 'Từng dòng chữ trên website này là bao đêm hai đứa tỉ mỉ chọn lọc kiến thức SGK Kết nối tri thức. Mình yêu nhất hình tượng người lính Tây Tiến hào hoa, bi tráng và tiếng đàn Lor-ca ngân vang trong đêm Tây Ban Nha. Văn chương đã dạy cho mình biết trân trọng hiện tại, biết cảm thương với số phận con người và kiên định với lý tưởng sống. Cảm ơn thầy cô Yên Lãng đã luôn truyền lửa đam mê!',
    tag: 'work_review',
    relatedWork: 'Tây Tiến (Quang Dũng)',
    stationery: 'vintage',
    stamp: 'tay_tien',
    likes: 42,
  }
];
