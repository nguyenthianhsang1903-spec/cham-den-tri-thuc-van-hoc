import { ExamPractice } from '../types';

export const EXAM_PRACTICES: ExamPractice[] = [
  {
    id: 'de-doc-hieu-so-1',
    title: 'Đề luyện tập Đọc hiểu văn bản số 01: Sức mạnh của sự kiên trì và văn hóa đọc',
    type: 'doc_hieu',
    typeLabel: 'Đọc hiểu văn bản',
    durationMinutes: 20,
    totalScore: 10,
    readingPassage: {
      source: 'Trích "Sống có giá trị" – NXB Trẻ',
      text: `“Mỗi trang sách được mở ra không đơn thuần là việc tiếp nhận những ký tự đen trên nền giấy trắng, mà là cuộc hội ngộ kỳ diệu giữa hai tâm hồn. Ở đó, người đọc được bước vào những cuộc đời chưa từng trải nghiệm, được ngắm nhìn thế giới bằng đôi mắt của một người khác, và trên hết, được lắng nghe những nhịp đập sâu thẳm của chính lòng mình.\n\nTrong thời đại kỹ thuật số ào ạt hôm nay, con người ta dễ dàng bị cuốn theo những thông tin vụn vặt, nông nổi trên màn hình phát sáng. Nhưng chỉ có việc đọc sâu, đọc chậm mới nuôi dưỡng được khả năng tư duy độc lập và năng lực thấu cảm – phẩm chất tối thượng làm nên tính người. Đọc sách không làm cho chúng ta biến thành người khác, mà giúp chúng ta trở thành phiên bản trọn vẹn và sâu sắc nhất của chính mình.”`
    },
    questions: [
      {
        id: 'dh-q1',
        question: 'Xác định phương thức biểu đạt chính được sử dụng trong đoạn trích trên.',
        options: ['Tự sự', 'Nghị luận', 'Biểu cảm', 'Thuyết minh'],
        correctIndex: 1,
        explanation: 'Phương thức biểu đạt chính là Nghị luận, vì tác giả dùng lý lẽ và dẫn chứng nhằm bàn luận về giá trị của văn hóa đọc.',
        maxScore: 2,
        type: 'multiple_choice'
      },
      {
        id: 'dh-q2',
        question: 'Theo tác giả, việc đọc sâu và đọc chậm giúp nuôi dưỡng những phẩm chất quan trọng nào ở con người?',
        options: [
          'Khả năng ghi nhớ siêu tốc và tính toán nhanh nhẹn',
          'Khả năng tư duy độc lập và năng lực thấu cảm',
          'Kỹ năng giao tiếp hoạt ngôn và tìm kiếm thông tin',
          'Sự thích ứng với công nghệ số hiện đại'
        ],
        correctIndex: 1,
        explanation: 'Trong đoạn 2, tác giả nêu rõ: "chỉ có việc đọc sâu, đọc chậm mới nuôi dưỡng được khả năng tư duy độc lập và năng lực thấu cảm".',
        maxScore: 2,
        type: 'multiple_choice'
      },
      {
        id: 'dh-q3',
        question: 'Câu văn: "Mỗi trang sách được mở ra không đơn thuần là việc tiếp nhận những ký tự đen trên nền giấy trắng, mà là cuộc hội ngộ kỳ diệu giữa hai tâm hồn" sử dụng biện pháp tu từ nào?',
        options: ['So sánh và tương phản', 'Nói giảm nói tránh', 'Đảo ngữ', 'Chơi chữ'],
        correctIndex: 0,
        explanation: 'Tác giả dùng quan hệ từ tương phản (không đơn thuần là A mà là B) và nghệ thuật so sánh ngầm (cuộc hội ngộ kỳ diệu) làm nổi bật ý nghĩa thiêng liêng của việc đọc.',
        maxScore: 2,
        type: 'multiple_choice'
      },
      {
        id: 'dh-q4',
        question: 'Anh/chị hiểu như thế nào về câu nói: "Đọc sách... giúp chúng ta trở thành phiên bản trọn vẹn và sâu sắc nhất của chính mình"?',
        options: [
          'Đọc sách giúp ta có nhiều bằng cấp hơn người khác',
          'Đọc sách soi rọi tâm hồn, bồi đắp tri thức và giúp ta thấu hiểu, hoàn thiện bản thân mỗi ngày',
          'Đọc sách giúp ta tích lũy của cải vật chất nhanh chóng',
          'Đọc sách biến ta thành một nhân vật hoàn hảo không tì vết'
        ],
        correctIndex: 1,
        explanation: 'Đọc sách là tấm gương soi chiếu nội tâm, bồi dưỡng lòng nhân ái, mở rộng tầm nhìn, giúp ta nhận ra giá trị đích thực của bản thân để sống có ý nghĩa hơn.',
        maxScore: 2,
        type: 'multiple_choice'
      },
      {
        id: 'dh-q5',
        question: 'Thông điệp sâu sắc nhất mà anh/chị rút ra được từ ngữ liệu trên là gì?',
        options: [
          'Nên từ bỏ hoàn toàn các thiết bị công nghệ số',
          'Cần rèn luyện thói quen đọc sách chủ động, đọc sâu để làm giàu thế giới tinh thần giữa thời đại số',
          'Chỉ nên đọc những cuốn sách văn học kinh điển',
          'Đọc sách là việc bắt buộc chỉ dành cho học sinh, sinh viên'
        ],
        correctIndex: 1,
        explanation: 'Thông điệp ý nghĩa nhất là khuyên mỗi cá nhân cần gìn giữ thói quen đọc sâu để duy trì tư duy độc lập và trái tim giàu lòng trắc ẩn giữa nhịp sống số ồn ào.',
        maxScore: 2,
        type: 'multiple_choice'
      }
    ]
  },
  {
    id: 'de-kiem-tra-15p',
    title: 'Bài kiểm tra 15 phút: Tác giả và tác phẩm trọng tâm Ngữ văn 12',
    type: 'kiem_tra_15p',
    typeLabel: 'Kiểm tra 15 phút',
    durationMinutes: 15,
    totalScore: 10,
    questions: [
      {
        id: '15p-1',
        question: 'Tác phẩm nào trong SGK Ngữ văn 12 phản ánh bi kịch con người không được sống là chính mình?',
        options: ['Tây Tiến', 'Vợ chồng A Phủ', 'Hồn Trương Ba, da hàng thịt', 'Xuân Tóc Đỏ cứu quốc'],
        correctIndex: 2,
        explanation: 'Vở kịch "Hồn Trương Ba, da hàng thịt" của Lưu Quang Vũ đặt ra bi kịch nhân vật phải sống bên trong một đằng, bên ngoài một nẻo.',
        maxScore: 2,
        type: 'multiple_choice'
      },
      {
        id: '15p-2',
        question: 'Chi tiết "bốn bát bánh đúc" xuất hiện trong tác phẩm nào và gắn với nhân vật nào?',
        options: ['Xuân Tóc Đỏ - Số đỏ', 'Tràng và Thị - Vợ nhặt', 'A Phủ - Vợ chồng A Phủ', 'Kiên và Phương - Nỗi buồn chiến tranh'],
        correctIndex: 1,
        explanation: 'Trong "Vợ nhặt" của Kim Lân, bốn bát bánh đúc là chi tiết Tràng thèm ăn đãi Thị, dẫn đến mối nhân duyên nhặt vợ giữa nạn đói năm 1945.',
        maxScore: 2,
        type: 'multiple_choice'
      },
      {
        id: '15p-3',
        question: 'Nhà văn nào được mệnh danh là "chuyên viên cao cấp về tiếng Việt", sở hữu phong cách "tài hoa, uyên bác"?',
        options: ['Nguyễn Tuân', 'Tô Hoài', 'Bảo Ninh', 'Hoàng Phủ Ngọc Tường'],
        correctIndex: 0,
        explanation: 'Nguyễn Tuân với tác phẩm "Người lái đò Sông Đà" là đỉnh cao của phong cách nghệ thuật tài hoa, uyên bác.',
        maxScore: 2,
        type: 'multiple_choice'
      },
      {
        id: '15p-4',
        question: 'Chương "Đất Nước" của Nguyễn Khoa Điềm thuộc tác phẩm trường ca nào?',
        options: ['Mặt đường khát vọng', 'Những người đi tới biển', 'Trường ca Đất Nước', 'Khối vuông ru-bích'],
        correctIndex: 0,
        explanation: 'Đoạn trích Đất Nước thuộc phần đầu chương V của trường ca "Mặt đường khát vọng" sáng tác năm 1971.',
        maxScore: 2,
        type: 'multiple_choice'
      },
      {
        id: '15p-5',
        question: 'Hình tượng tiếng đàn Lor-ca trong bài thơ của Thanh Thảo được so sánh như hình ảnh nào?',
        options: ['Như ngọn lửa thiêng', 'Như cỏ mọc hoang', 'Như dòng thác cuộn', 'Như hoa ban trắng'],
        correctIndex: 1,
        explanation: 'Câu thơ: "không ai chôn cất tiếng đàn / tiếng đàn như cỏ mọc hoang" khẳng định sức sống tự nhiên, bất diệt của nghệ thuật.',
        maxScore: 2,
        type: 'multiple_choice'
      }
    ]
  },
  {
    id: 'de-tong-hop-45p',
    title: 'Bài kiểm tra tổng hợp 45 phút: Khảo sát kiến thức học kì và kỹ năng làm bài',
    type: 'tong_hop_45p',
    typeLabel: 'Kiểm tra tổng hợp 45 phút',
    durationMinutes: 45,
    totalScore: 10,
    questions: [
      {
        id: 'th-1',
        question: 'Đặc trưng cơ bản nhất của bút pháp trào phúng trong đoạn trích "Xuân Tóc Đỏ cứu quốc" là gì?',
        options: [
          'Dùng tiếng cười chế giễu nhẹ nhàng, êm đềm',
          'Sử dụng nghệ thuật phóng đại, nghịch lý và tương phản gay gắt giữa bản chất và hiện tượng',
          'Sử dụng yếu tố kì ảo huyền bí thần tiên',
          'Kết hợp dòng ý thức phi tuyến tính'
        ],
        correctIndex: 1,
        explanation: 'Vũ Trọng Phụng sử dụng nghệ thuật phóng đại và tương phản trào phúng: một kẻ vô lại thất bại trong thể thao lại được tâng bốc thành anh hùng cứu quốc.',
        maxScore: 1.25,
        type: 'multiple_choice'
      },
      {
        id: 'th-2',
        question: 'Hai câu thơ "Tây Tiến đoàn binh không mọc tóc / Quân xanh màu lá dữ oai hùm" khắc họa điều gì ở người lính Tây Tiến?',
        options: [
          'Ngoại hình hung dữ đáng sợ nơi thôn dã',
          'Hiện thực gian khổ, bệnh tật do sốt rét rừng nhưng vẫn giữ trọn khí phách kiêu hùng, quả cảm',
          'Sự suy sụp tinh thần chiến đấu vì đói khát',
          'Sự lập dị của tầng lớp thanh niên Hà thành'
        ],
        correctIndex: 1,
        explanation: 'Dù bị bệnh sốt rét làm rụng tóc ("không mọc tóc") và da xanh xao ("quân xanh màu lá"), người lính vẫn toát lên khí phách "dữ oai hùm" lẫm liệt.',
        maxScore: 1.25,
        type: 'multiple_choice'
      },
      {
        id: 'th-3',
        question: 'Hành động Ngô Tử Văn đốt đền tà trong "Chuyện chức phán sự đền Tản Viên" thể hiện phẩm chất gì?',
        options: [
          'Tính khí bốc đồng, ngông cuồng coi thường thánh thần',
          'Lòng dũng cảm, tinh thần khảng khái cương trực dám đứng lên tiêu trừ cái ác bảo vệ dân gian',
          'Muốn nổi danh khắp cõi trần gian',
          'Sự xúi giục của Thổ thần đất Lạng Giang'
        ],
        correctIndex: 1,
        explanation: 'Tử Văn đốt đền xuất phát từ tấm lòng vì dân, căm ghét sự tà gian, được chuẩn bị trang nghiêm sau khi tắm rửa chay tịnh.',
        maxScore: 1.25,
        type: 'multiple_choice'
      },
      {
        id: 'th-4',
        question: 'Trong tác phẩm "Vợ chồng A Phủ", yếu tố nào khơi gợi lại sức sống tiềm tàng và ký ức tươi đẹp của Mị trong đêm tình mùa xuân?',
        options: ['Tiếng khóc của đứa con nhỏ', 'Tiếng sáo gọi bạn yêu lơ lửng bay ngoài đầu núi', 'Mùi khói bếp than ấm', 'Tiếng chuông nhà thờ'],
        correctIndex: 1,
        explanation: 'Tiếng sáo tha thiết gọi bạn tình đã đánh thức tâm hồn ngủ quên của Mị, đưa Mị từ cõi vô cảm trở về với ý thức thanh xuân.',
        maxScore: 1.25,
        type: 'multiple_choice'
      },
      {
        id: 'th-5',
        question: 'Trong "Vợ nhặt", chi tiết "nồi cháo cám" (được bà cụ Tứ gọi đùa là chè khoán) mang ý nghĩa nghệ thuật gì?',
        options: [
          'Món ăn đặc sản của làng ngụ cư ngày Tết',
          'Biểu tượng xót xa cho hoàn cảnh nghèo đói cùng cực, đồng thời làm sáng ngời tình thương và nỗ lực đem lại niềm vui cho con cái của người mẹ',
          'Sự lãng phí lương thực trong nạn đói',
          'Lời trách móc của bà cụ Tứ dành cho con dâu'
        ],
        correctIndex: 1,
        explanation: 'Nồi cháo cám đắng chát nhưng đượm tình mẹ bao la; dù bữa ăn nghèo khổ đến đáy cùng, mẹ vẫn cố thắp lên niềm lạc quan và hướng về tương lai.',
        maxScore: 1.25,
        type: 'multiple_choice'
      },
      {
        id: 'th-6',
        question: 'Vì sao trong "Người lái đò Sông Đà", Nguyễn Tuân gọi người lái đò là "tay lái ra hoa", một "nghệ sĩ" trên sông nước?',
        options: [
          'Vì ông lái đò vừa chèo thuyền vừa vẽ tranh và ngâm thơ',
          'Vì ông đã biến công việc lao động mưu sinh hiểm nguy thành một nghệ thuật thuần thục, mưu trí và tuyệt đẹp',
          'Vì ông có xuất thân từ một gia đình trí thức Hà Nội',
          'Vì chiếc thuyền của ông được trang trí hoa tươi rực rỡ'
        ],
        correctIndex: 1,
        explanation: 'Bằng sự am hiểu tường tận quy luật của thác đá và tài điều khiển con thuyền dũng mãnh, ông lái đò đã nâng công việc lao động nhọc nhằn lên tầm nghệ thuật trác tuyệt.',
        maxScore: 1.25,
        type: 'multiple_choice'
      },
      {
        id: 'th-7',
        question: 'Khi chảy qua vùng cố đô Huế, dòng sông Hương được Hoàng Phủ Ngọc Tường so sánh với điệu nhạc nào?',
        options: ['Một bản hành khúc sôi động hào hùng', 'Một điệu slow tình cảm dành riêng cho Huế', 'Một khúc hát giao duyên quan họ', 'Bản giao hưởng hiện đại'],
        correctIndex: 1,
        explanation: 'Hoàng Phủ Ngọc Tường viết sông Hương chảy chậm rãi, êm đềm như "một điệu slow tình cảm dành riêng cho Huế".',
        maxScore: 1.25,
        type: 'multiple_choice'
      },
      {
        id: 'th-8',
        question: 'Điểm khác biệt căn bản trong quan niệm về "Đất Nước" của Nguyễn Khoa Điềm so với văn học trung đại phong kiến là gì?',
        options: [
          'Gắn Đất Nước với triều đại và công đức của các đấng đế vương',
          'Khẳng định Đất Nước thuộc về Nhân dân - những con người bình dị vô danh làm nên lịch sử và văn hóa',
          'Coi Đất Nước chỉ là biên giới địa lý trên bản đồ',
          'Nhìn nhận Đất Nước qua góc nhìn huyền thoại tâm linh'
        ],
        correctIndex: 1,
        explanation: 'Nguyễn Khoa Điềm đã phát hiện Đất Nước từ cội nguồn Nhân dân, đưa quan niệm Đất Nước trở về với cội rễ đời sống của quần chúng nhân dân.',
        maxScore: 1.25,
        type: 'multiple_choice'
      }
    ]
  },
  {
    id: 'de-nghi-luan-xa-hoi',
    title: 'Đề luyện viết Nghị luận xã hội: Lòng dũng cảm và tinh thần trách nhiệm của người trẻ',
    type: 'nghi_luan_xa_hoi',
    typeLabel: 'Nghị luận xã hội',
    durationMinutes: 25,
    totalScore: 10,
    essayPrompt: {
      question: 'Viết một đoạn văn khoảng 200 chữ trình bày suy nghĩ của anh/chị về ý nghĩa của lòng dũng cảm vượt qua giới hạn của bản thân đối với học sinh lớp 12 trước ngưỡng cửa cuộc đời.',
      outline: {
        intro: 'Dẫn dắt trực tiếp: Lòng dũng cảm vượt qua vùng an toàn là chìa khóa mở ra cánh cửa trưởng thành cho người trẻ.',
        body: [
          'Giải thích: Lòng dũng cảm không phải là sự liều lĩnh mù quáng, mà là bản lĩnh dám đối diện với nỗi sợ thất bại, kiên trì theo đuổi ước mơ và tự chịu trách nhiệm về lựa chọn của mình.',
          'Ý nghĩa: Giúp người trẻ khám phá và khai phóng những năng lực tiềm ẩn; rèn luyện sức bền tinh thần trước áp lực thi cử và biến động cuộc sống.',
          'Dẫn chứng thực tế: Các bạn trẻ vượt khó khởi nghiệp, những tấm gương học sinh kiên trì ôn luyện vượt qua nghịch cảnh.',
          'Phản đề: Phê phán thói an phận thủ thường, sợ sai, sợ khó hoặc trốn tránh trách nhiệm cá nhân.'
        ],
        conclusion: 'Khẳng định bài học nhận thức và hành động: Mỗi học sinh cần nuôi dưỡng ngọn lửa tự tin, dám nghĩ, dám làm và không ngừng hoàn thiện bản thân.'
      },
      criteria: [
        'Đảm bảo hình thức đoạn văn nghị luận 200 chữ: Không xuống dòng, diễn đạt mạch lạc (1.0 điểm).',
        'Xác định đúng vấn đề nghị luận: Lòng dũng cảm vượt qua giới hạn bản thân (1.0 điểm).',
        'Triển khai vấn đề logic, lập luận chặt chẽ, dẫn chứng xác thực và thuyết phục (6.0 điểm).',
        'Chính tả, ngữ pháp, phong cách diễn đạt trong sáng, giàu cảm xúc (1.0 điểm).',
        'Sáng tạo, có suy nghĩ riêng sâu sắc, mới mẻ (1.0 điểm).'
      ]
    },
    questions: []
  },
  {
    id: 'de-nghi-luan-van-hoc',
    title: 'Đề luyện viết Nghị luận văn học: Phân tích vẻ đẹp bi tráng trong bài thơ Tây Tiến',
    type: 'nghi_luan_van_hoc',
    typeLabel: 'Nghị luận văn học',
    durationMinutes: 70,
    totalScore: 10,
    essayPrompt: {
      question: 'Cảm nhận của anh/chị về vẻ đẹp bi tráng và lãng mạn của hình tượng người lính Tây Tiến trong đoạn thơ sau:\n\n“Tây Tiến đoàn binh không mọc tóc\nQuân xanh màu lá dữ oai hùm\nMắt trừng gửi mộng qua biên giới\nĐêm mơ Hà Nội dáng kiều thơm\n\nRải rác biên cương mồ viễn xứ\nChiến trường đi chẳng tiếc đời xanh\nÁo bào thay chiếu, anh về đất\nSông Mã gầm lên khúc độc hành”\n(Quang Dũng, Tây Tiến, Ngữ văn 12)',
      outline: {
        intro: 'Giới thiệu nhà thơ Quang Dũng - hồn thơ tài hoa, lãng mạn; tác phẩm Tây Tiến và vị trí đoạn trích thể hiện đỉnh cao cảm hứng bi tráng và lãng mạn.',
        body: [
          'Luận điểm 1: Vẻ đẹp bi tráng qua ngoại hình khác thường và khí phách kiêu hùng ("không mọc tóc", "quân xanh màu lá", "dữ oai hùm").',
          'Luận điểm 2: Tâm hồn hào hoa, lãng mạn của những chàng trai đất Thăng Long ("mộng qua biên giới", "đêm mơ Hà Nội dáng kiều thơm").',
          'Luận điểm 3: Lý tưởng cống hiến cao cả và sự hi sinh thanh thản, thiêng liêng ("Chiến trường đi chẳng tiếc đời xanh", "Áo bào thay chiếu, anh về đất", khúc tráng ca sông Mã).',
          'Luận điểm 4: Đặc sắc nghệ thuật: Bút pháp lãng mạn kết hợp cảm quan bi tráng, ngôn từ giàu chất tạo hình, phối thanh đối lập và sử dụng từ Hán Việt cổ kính.'
        ],
        conclusion: 'Khẳng định giá trị bất tử của tượng đài người lính Tây Tiến trong nền thơ ca kháng chiến và tình cảm tri ân của thế hệ hôm nay.'
      },
      criteria: [
        'Đúng cấu trúc bài văn nghị luận văn học: Đủ Mở bài, Thân bài, Kết bài (1.0 điểm).',
        'Xác định đúng vấn đề: Vẻ đẹp bi tráng và lãng mạn của người lính Tây Tiến qua đoạn thơ (1.0 điểm).',
        'Phân tích sâu sắc cả nội dung tư tưởng lẫn nghệ thuật thơ Quang Dũng (6.0 điểm).',
        'Chính tả, dùng từ, liên kết câu mượt mà (1.0 điểm).',
        'Đánh giá nâng cao, so sánh văn học và phong cách cá nhân độc đáo (1.0 điểm).'
      ]
    },
    questions: []
  }
];
