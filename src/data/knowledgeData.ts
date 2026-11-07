import { KnowledgeTopic } from '../types';

export const KNOWLEDGE_TOPICS: KnowledgeTopic[] = [
  {
    id: 'the-loai-tieu-thuyet-hien-dai',
    category: 'genre',
    categoryTitle: 'Kiến thức thể loại',
    title: 'Đặc trưng tiểu thuyết hiện đại & dòng ý thức',
    summary: 'Nắm vững các bình diện của tiểu thuyết hiện đại theo SGK Kết nối tri thức: cốt truyện đa tuyến, nhân vật tâm lý phức tạp, điểm nhìn trần thuật và dòng ý thức phi tuyến tính.',
    keyPoints: [
      'Cốt truyện đa tuyến: Không tuân theo trình tự thời gian biên niên nghiêm ngặt, đan xen hồi ức, hiện tại và dự cảm tương lai.',
      'Nhân vật tâm lý phức tạp: Không còn phân tuyến rạch ròi thiện - ác đơn giản; đào sâu những vùng tối, góc khuất và xung đột vô thức.',
      'Điểm nhìn trần thuật dịch chuyển: Kết hợp ngôi thứ nhất (xưng Tôi chứng kiến/trải nghiệm) và ngôi thứ ba toàn tri hoặc bán toàn tri.',
      'Kỹ thuật dòng ý thức: Tái hiện dòng suy nghĩ miên man, rời rạc tự nhiên của nhân vật như trong "Nỗi buồn chiến tranh".'
    ],
    stepsOrFormula: [
      'Bước 1: Xác định kiểu người kể chuyện và điểm nhìn trần thuật (bên trong hay bên ngoài).',
      'Bước 2: Phân tích kết cấu thời gian nghệ thuật (thời gian sự kiện hay thời gian tâm lý).',
      'Bước 3: Mổ xẻ các xung đột nội tâm và chiều sâu suy tưởng của nhân vật.',
      'Bước 4: Đánh giá tư tưởng nhân văn và thông điệp mà tác giả gửi gắm.'
    ],
    examples: [
      {
        prompt: 'Nhận diện điểm nhìn trần thuật trong "Nỗi buồn chiến tranh" (Bảo Ninh).',
        analysis: 'Điểm nhìn chủ yếu xuất phát từ tâm tư của nhân vật Kiên - một cái nhìn nhuốm màu hồi ức, hoài niệm đau xót, đan xen giữa quá khứ chiến trường khốc liệt và hiện tại cô độc thời bình.'
      }
    ],
    mindmapOverview: {
      root: 'Tiểu thuyết hiện đại',
      leaves: ['Cốt truyện phi tuyến tính', 'Nhân vật đa diện', 'Điểm nhìn linh hoạt', 'Dòng ý thức nội tâm']
    }
  },
  {
    id: 'the-loai-tho-tuong-trung-sieu-thuc',
    category: 'genre',
    categoryTitle: 'Kiến thức thể loại',
    title: 'Thế giới thơ tượng trưng và siêu thực',
    summary: 'Khám phá thế giới thi ca hiện đại với các yếu tố tượng trưng, tương giao cảm giác và biểu tượng đa tầng nghĩa theo định hướng Bài 2 SGK Ngữ văn 12.',
    keyPoints: [
      'Hệ thống biểu tượng đa nghĩa: Không miêu tả sự vật như nó vốn có mà biến nó thành ẩn dụ cho số phận, tư tưởng nghệ thuật.',
      'Sự tương giao của các giác quan: Kết hợp âm thanh, màu sắc, xúc giác (nghe thấy màu sắc, nhìn thấy âm thanh - như "tiếng đàn bọt nước", "áo choàng đỏ gắt").',
      'Xóa nhòa ranh giới thực - mộng: Tiềm thức và trực giác đóng vai trò dẫn dắt dòng chảy cảm xúc thơ.',
      'Giải phóng hình thức câu thơ: Lối thơ không viết hoa đầu dòng, ngắt nhịp tự do, tạo nhịp điệu nhạc tính tự thân.'
    ],
    stepsOrFormula: [
      'Bước 1: Giải mã lớp nghĩa bề mặt của hình ảnh và từ ngữ độc lạ.',
      'Bước 2: Tìm mối liên hệ tương giao cảm giác và trường liên tưởng của biểu tượng.',
      'Bước 3: Kết nối với hoàn cảnh số phận tác giả và thời đại sáng tác.',
      'Bước 4: Đánh giá quan niệm nghệ thuật và khát vọng cách tân thơ ca.'
    ],
    mindmapOverview: {
      root: 'Thơ tượng trưng - siêu thực',
      leaves: ['Biểu tượng đa tầng', 'Tương giao cảm giác', 'Ranh giới thực mộng', 'Cách tân cấu trúc câu thơ']
    }
  },
  {
    id: 'phuong-phap-doc-hieu-van-ban',
    category: 'reading_comprehension',
    categoryTitle: 'Phương pháp đọc hiểu',
    title: 'Chiến thuật đạt điểm tối đa phần Đọc hiểu (4 cấp độ)',
    summary: 'Quy trình xử lý chuẩn 4 câu hỏi đọc hiểu trong đề thi: Nhận biết (0.5đ - 0.75đ), Thông hiểu (0.75đ - 1.0đ), Vận dụng (0.75đ - 1.0đ), Vận dụng cao (0.5đ - 1.0đ).',
    keyPoints: [
      'Mức 1 - Nhận biết: Chỉ ra thể thơ, phương thức biểu đạt, biện pháp tu từ, từ ngữ/hình ảnh có sẵn trong ngữ liệu. Nguyên tắc: Trả lời thẳng, ngắn gọn, chính xác tuyệt đối.',
      'Mức 2 - Thông hiểu: Giải thích ý nghĩa của một câu văn/câu thơ hoặc thông điệp của một hình ảnh. Công thức: Nghĩa đen (bề mặt) + Nghĩa bóng (ẩn dụ, tư tưởng tác giả).',
      'Mức 3 - Vận dụng: Nêu tác dụng của biện pháp tu từ, giải thích vì sao tác giả lại nói như vậy. Công thức 3 vế: Tên BPTT + Biểu hiện cụ thể + Tác dụng (gợi hình, gợi cảm, nhấn mạnh nội dung).',
      'Mức 4 - Vận dụng cao: Bày tỏ quan điểm đồng tình/không đồng tình và rút ra thông điệp cuộc sống. Công thức: Nêu rõ quan điểm (Đồng tình/Không đồng tình/Đồng tình một phần) + Lý giải 2-3 luận điểm logic + Liên hệ bản thân ngắn gọn.'
    ],
    stepsOrFormula: [
      'Công thức trả lời Tác dụng BPTT: (1) Chỉ rõ dấu hiệu trong văn bản -> (2) Tăng tính sinh động, biểu cảm, gợi hình -> (3) Làm nổi bật chủ đề/cảm xúc của tác giả.',
      'Công thức câu Thông điệp ý nghĩa nhất: (1) Nêu thông điệp -> (2) Vì sao thông điệp ấy quan trọng đối với xã hội -> (3) Rút ra hành động cụ thể cho bản thân.'
    ],
    examples: [
      {
        prompt: 'Anh/chị có đồng tình với quan điểm: "Thất bại là bài học quý giá nhất để trưởng thành" không? Vì sao?',
        sample: 'Tôi hoàn toàn đồng tình với quan điểm trên. Bởi vì: Thứ nhất, thất bại giúp ta nhìn nhận khách quan những thiếu sót, lỗ hổng kiến thức để kịp thời bồi đắp. Thứ hai, đối diện và vượt qua nghịch cảnh sẽ rèn luyện cho con người ý chí kiên cường, bản lĩnh vững vàng. Tuy nhiên, thất bại chỉ có giá trị khi ta biết đứng dậy và rút ra bài học kinh nghiệm thay vì nản lòng buông xuôi.'
      }
    ]
  },
  {
    id: 'cach-viet-nghi-luan-xa-hoi',
    category: 'social_essay',
    categoryTitle: 'Nghị luận xã hội',
    title: 'Công thức 5 bước vàng viết đoạn văn 200 chữ (NLXH)',
    summary: 'Hướng dẫn viết đoạn văn nghị luận xã hội chuẩn cấu trúc 200 từ, dung lượng 2/3 trang giấy thi, không lạc đề, lập luận đanh thép và dẫn chứng giàu sức thuyết phục.',
    keyPoints: [
      'Độ dài chuẩn: Khoảng 20 - 25 dòng (200 - 250 chữ), viết thành MỘT ĐOẠN VĂN duy nhất, không xuống dòng tùy tiện.',
      'Công thức M-T-D-B-K: Mở đoạn (1 câu dẫn vào vấn đề) -> Thích nghĩa/Biểu hiện (2-3 câu) -> Bàn luận & Dẫn chứng (8-10 câu) -> Phản đề/Mở rộng (2-3 câu) -> Bài học nhận thức & hành động (2 câu).',
      'Quy tắc chọn dẫn chứng: Dẫn chứng phải có tính thời sự, người thật việc thật, tiêu biểu (nhân vật truyền cảm hứng, sự kiện văn hóa/khoa học/thể thao), không lấy dẫn chứng chung chung mông lung.'
    ],
    stepsOrFormula: [
      '1. Mở đoạn (1 câu): Nêu trực tiếp vấn đề cần nghị luận từ đề bài.',
      '2. Giải thích (2 câu): Giải thích từ khóa trọng tâm + Khẳng định bản chất cốt lõi của vấn đề.',
      '3. Phân tích & Bàn luận (6-8 câu): Trả lời câu hỏi Vì sao? Nó mang lại ý nghĩa/giá trị gì cho bản thân và cộng đồng?',
      '4. Dẫn chứng thực tế (3-4 câu): Nêu ngắn gọn 1 dẫn chứng điển hình và chỉ ra bài học từ dẫn chứng.',
      '5. Phản đề & Mở rộng (2-3 câu): Phê phán những biểu hiện đi ngược lại hoặc cái nhìn phiến diện.',
      '6. Kết đoạn (2 câu): Bài học cho bản thân: Tôi nhận thức được điều gì và sẽ hành động như thế nào?'
    ],
    examples: [
      {
        prompt: 'Viết đoạn văn khoảng 200 chữ về ý nghĩa của lòng dũng cảm đối với thế hệ trẻ.',
        sample: 'Dũng cảm chính là ngọn hải đăng soi sáng bản lĩnh của tuổi trẻ giữa những phong ba bão táp của cuộc đời. Dũng cảm không phải là sự liều lĩnh mù quáng, mà là sự kiên định dám đương đầu với thử thách, dám đối diện với sai lầm và dũng cảm cất lên tiếng nói bảo vệ lẽ phải. Trong thời đại số biến động không ngừng, lòng dũng cảm giúp người trẻ dám bước ra khỏi vùng an toàn, dám dấn thân sáng tạo và hiện thực hóa ước mơ. Ngược lại, nếu hèn nhát và thỏa hiệp với thói an phận, con người sẽ tự triệt tiêu tiềm năng của chính mình. Là một học sinh lớp 12 trước ngưỡng cửa cuộc đời, tôi tự nhắc nhở bản thân cần rèn luyện sự dũng cảm từ những việc nhỏ nhất: dám trung thực trong học tập và dám kiên trì theo đuổi đam mê.'
      }
    ]
  },
  {
    id: 'cach-viet-nghi-luan-van-hoc',
    category: 'literary_essay',
    categoryTitle: 'Nghị luận văn học',
    title: 'Cấu trúc bài văn Nghị luận văn học đạt điểm 8.5+',
    summary: 'Khung bài viết hoàn chỉnh phân tích đoạn trích thơ, văn xuôi, nhân vật và phong cách tác giả theo yêu cầu đề thi tốt nghiệp THPT mới.',
    keyPoints: [
      'Mở bài gián tiếp: Dẫn dắt bằng một nhận định văn học, một câu thơ hay hoặc một đặc trưng thi pháp của thời đại trước khi nêu tác giả, tác phẩm và vấn đề nghị luận.',
      'Khái quát chung: Nêu xuất xứ, hoàn cảnh sáng tác, vị trí đoạn trích và cảm hứng chủ đạo để tạo phông nền vững chắc.',
      'Thân bài chia luận điểm rành mạch: Mỗi luận điểm phân tích cả hai phương diện NỘI DUNG gắn liền với NGHỆ THUẬT (không phân tích nghệ thuật tách rời ở cuối bài).',
      'Đánh giá nâng cao (chốt vấn đề): Đánh giá phong cách cá nhân của tác giả, đóng góp cho nền văn học và bài học tiếp nhận cho người đọc.'
    ],
    stepsOrFormula: [
      'Công thức mở bài gián tiếp qua nhận định: "Nhà văn X từng nhận định rằng: [...] Quả thật, văn chương chỉ đạt đến đỉnh cao khi chạm vào nơi sâu kín nhất của tâm hồn con người. Điều đó được minh chứng rực rỡ qua tác phẩm Y của tác giả Z, đặc biệt là qua đoạn trích..."',
      'Cấu trúc đoạn thân bài: Luận điểm -> Dẫn chứng -> Phân tích chi tiết nghệ thuật (từ ngữ, nhịp điệu, biện pháp tu từ) -> Bình luận chiều sâu tư tưởng -> Chuyển ý mượt mà.'
    ]
  },
  {
    id: 'bien-phap-tu-tu-tieng-viet',
    category: 'rhetoric',
    categoryTitle: 'Biện pháp tu từ',
    title: 'Sổ tay 12 biện pháp tu từ thường gặp và cách phân tích',
    summary: 'Bảng tra cứu nhanh các biện pháp tu từ từ vựng và cú pháp trong chương trình THPT, dấu hiệu nhận biết và tác dụng nghệ thuật đặc trưng.',
    keyPoints: [
      '1. So sánh: Đối chiếu sự vật A với sự vật B có nét tương đồng (từ so sánh: như, là, tựa). Tác dụng: Gợi hình cụ thể, làm cho sự vật trở nên sống động, tăng sức gợi cảm.',
      '2. Ẩn dụ: Gọi tên sự vật A bằng sự vật B dựa trên mối quan hệ tương đồng (hình thức, cách thức, phẩm chất, cảm giác). Tác dụng: Tăng hàm súc, chiều sâu suy tưởng.',
      '3. Hoán dụ: Gọi tên sự vật A bằng sự vật B dựa trên mối quan hệ tương cận (gần gũi: bộ phận - toàn thể, vật chứa đựng - vật bị chứa đựng, dấu hiệu - sự vật).',
      '4. Điệp từ / Điệp ngữ: Lặp lại từ ngữ để nhấn mạnh cảm xúc, tạo nhịp điệu dồn dập, ngân vang.',
      '5. Nói giảm nói tránh: Dùng cách diễn đạt tế nhị, tránh gây cảm giác đau thương, ghê sợ hoặc thô thiển ("anh về đất", "đã khuất").',
      '6. Phép tương phản (Đối lập): Đặt các hình ảnh, tính chất trái ngược nhau cạnh nhau để làm nổi bật sự gay gắt của hoàn cảnh hoặc xung đột nội tâm.',
      '7. Đảo ngữ: Thay đổi trật tự cấu trúc ngữ pháp thông thường để nhấn mạnh tính chất, trạng thái nổi bật ("Dốc lên khúc khuỷu dốc thăm thẳm", "Lom khom dưới núi tiều vài chú").',
      '8. Liệt kê: Sắp xếp nối tiếp các từ, cụm từ cùng loại để diễn tả đầy đủ, phong phú các khía cạnh của đời sống.'
    ],
    mindmapOverview: {
      root: '12 Biện pháp tu từ',
      leaves: ['So sánh & Ẩn dụ', 'Hoán dụ & Nhân hóa', 'Điệp & Đối lập', 'Đảo ngữ & Liệt kê', 'Nói giảm & Câu hỏi tu từ']
    }
  },
  {
    id: 'bi-kip-on-thi-tot-nghiep-thpt',
    category: 'thpt_review',
    categoryTitle: 'Ôn thi tốt nghiệp THPT',
    title: 'Cẩm nang ôn luyện Ngữ văn theo cấu trúc đề mới 2025 - 2026',
    summary: 'Chiến lược phân bổ thời gian làm bài 120 phút, kỹ năng phân tích đề thi và ma trận kiến thức trọng tâm cần nắm vững.',
    keyPoints: [
      'Phân bổ thời gian 120 phút khoa học: Đọc hiểu (15 - 20 phút) -> Nghị luận xã hội đoạn văn 200 chữ (20 - 25 phút) -> Nghị luận văn học bài văn đầy đủ (70 - 75 phút) -> Soát lại bài thi (5 phút).',
      'Kỹ thuật gạch chân từ khóa trong đề thi: Luôn dùng bút chì gạch chân: Thao tác lập luận yêu cầu (phân tích/cảm nhận/bình luận), Giới hạn dẫn chứng (đoạn thơ nào, chi tiết nào), Vấn đề cốt lõi cần làm sáng tỏ.',
      'Tránh 3 lỗi mất điểm oan: Lỗi viết sai chính tả và dùng từ tối nghĩa; Lỗi phân tích văn xuôi mà diễn xuôi lại cốt truyện; Lỗi phân tích thơ mà quên chỉ ra từ ngữ, vần nhịp và biện pháp tu từ.'
    ],
    stepsOrFormula: [
      '3 phút đầu: Đọc lướt toàn bộ đề thi một lượt, nắm tổng thể.',
      'Làm bài theo thứ tự đề thi: Đọc hiểu -> NLXH -> NLVH (giúp tâm lý làm bài tuần tự, tích lũy điểm chắc chắn).',
      'Luôn dành 5 phút cuối kiểm tra: Sửa lỗi chính tả, bổ sung dấu câu, kiểm tra mã đề và thông tin cá nhân.'
    ]
  }
];
