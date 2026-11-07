import { TriviaQuestion, AuthorClueGame, GuessWorkGame, LiteraturePuzzle, ObstacleQuestion } from '../types';

export const TRIVIA_QUESTIONS: TriviaQuestion[] = [
  // --- HỌC KÌ I ---
  {
    id: 'tr-hk1-1',
    question: 'Tác phẩm "Xuân Tóc Đỏ cứu quốc" trích từ chương nào của kiệt tác tiểu thuyết "Số đỏ"?',
    options: ['Chương I và II', 'Chương XIX và XX', 'Chương VIII và IX', 'Chương cuối cùng'],
    correctIndex: 1,
    explanation: 'Đoạn trích thuộc chương XIX và XX của tiểu thuyết "Số đỏ" (1936), phơi bày đỉnh điểm tấn bi hài kịch khi một kẻ lưu manh hạ lưu được tôn sùng thành vĩ nhân cứu quốc.',
    difficulty: 'easy',
    workReference: 'Xuân Tóc Đỏ cứu quốc',
    semester: 1
  },
  {
    id: 'tr-hk1-2',
    question: 'Trong "Mùa lá rụng trong vườn" của Ma Văn Kháng, biến cố nào phản ánh rõ nét sự va đập giữa chuẩn mực truyền thống và kinh tế thị trường thời mở cửa?',
    options: [
      'Cụ Bằng quyết định bán ngôi nhà cổ ở Hà Nội',
      'Nhân vật Cừ vượt biên trái phép, còn Lý năng động chạy theo đồng tiền',
      'Đông bỏ nghề dạy học đi buôn bán đường dài',
      'Bà Bằng đột ngột lâm bệnh nặng qua đời'
    ],
    correctIndex: 1,
    explanation: 'Ma Văn Kháng tập trung vào bi kịch gia đình cụ Bằng thời mở cửa: Cừ bỏ trốn ra nước ngoài gây vết thương đau xót, cô dâu Lý sắc sảo khéo léo nhưng thực dụng, đối lập nề nếp gia phong của cụ Bằng.',
    difficulty: 'medium',
    workReference: 'Mùa lá rụng trong vườn',
    semester: 1
  },
  {
    id: 'tr-hk1-3',
    question: 'Trong tiểu thuyết "Cuộc đời của Pi" (trích đoạn "Trên xuồng cứu nạn"), người bạn đồng hành bất đắc dĩ của cậu bé Pi Patel là ai?',
    options: ['Một chú báo đốm châu Phi', 'Con hổ Bengal tên Richard Parker', 'Một con chó săn trung thành', 'Một chú sư tử già'],
    correctIndex: 1,
    explanation: 'Pi sống sót giữa đại dương cùng con hổ Bengal khổng lồ tên Richard Parker. Nỗi sợ hãi và việc phải thuần hóa, chăm sóc con mãnh thú này đã giữ cho Pi tỉnh táo để sinh tồn.',
    difficulty: 'easy',
    workReference: 'Trên xuồng cứu nạn',
    semester: 1
  },
  {
    id: 'tr-hk1-4',
    question: 'Hai câu thơ "Thù hận mang mang đầu bạc khát / Mài gươm dưới nguyệt đã bao phen" trong "Cảm hoài" là của danh tướng nào thời Hậu Trần?',
    options: ['Trần Bình Trọng', 'Đặng Dung', 'Trần Khát Chân', 'Nguyễn Biểu'],
    correctIndex: 1,
    explanation: 'Đặng Dung là tướng lĩnh trung liệt thời Hậu Trần, dù thế cuộc suy vi vẫn ngút ngàn khí phách: "Quốc thù vị báo đầu tiên bạch / Kỷ độ Long Tuyền đái nguyệt ma".',
    difficulty: 'easy',
    workReference: 'Cảm hoài',
    semester: 1
  },
  {
    id: 'tr-hk1-5',
    question: 'Trong bài thơ "Tây Tiến", Quang Dũng đã miêu tả nỗi nhớ của mình bằng cụm từ độc đáo nào ngay khổ đầu?',
    options: ['Nhớ da diết', 'Nhớ chơi vơi', 'Nhớ khôn nguôi', 'Nhớ ngút ngàn'],
    correctIndex: 1,
    explanation: 'Quang Dũng viết: "Sông Mã xa rồi Tây Tiến ơi! / Nhớ về rừng núi, nhớ chơi vơi" - một trạng thái hoài niệm lơ lửng, mênh mang giữa không gian và thời gian.',
    difficulty: 'easy',
    workReference: 'Tây Tiến',
    semester: 1
  },
  {
    id: 'tr-hk1-6',
    question: 'Chuỗi âm thanh tượng thanh "li-la li-la li-la" trong bài thơ "Đàn ghi ta của Lor-ca" mô phỏng điều gì?',
    options: [
      'Tiếng vó ngựa của lính phát-xít Tây Ban Nha',
      'Tiếng đàn ghi ta vang ngân và hình ảnh hoa tử đinh hương (lilac)',
      'Tiếng chuông nhà thờ rung hồi báo tử',
      'Tiếng sóng vỗ bờ sông Guadalquivir'
    ],
    correctIndex: 1,
    explanation: 'Âm thanh "li-la li-la li-la" vừa là nốt đàn ghi ta thánh thót, vừa gợi đóa hoa đinh hương (lilac) tím biếc của nghệ thuật bất tử trước bạo tàn.',
    difficulty: 'medium',
    workReference: 'Đàn ghi ta của Lor-ca',
    semester: 1
  },
  {
    id: 'tr-hk1-7',
    question: 'Triết lý cốt lõi về tình yêu trong "Bài thơ số 28" của đại thi hào Rabindranath Tagore là gì?',
    options: [
      'Tình yêu là sự thấu hiểu tuyệt đối và kiểm soát trọn vẹn',
      'Trái tim người yêu như một đại dương bí ẩn, vô biên, không thể chiếm đoạt hay tường tận hoàn toàn',
      'Tình yêu chỉ tồn tại khi đôi bên cùng hy sinh ước mơ riêng',
      'Tình yêu là mật ngọt của sự mù quáng không cần lý trí'
    ],
    correctIndex: 1,
    explanation: 'Tagore khẳng định trái tim con người là một cõi vô biên bí ẩn: "Trái tim anh cũng thế, người yêu hỡi... Nó là cõi vô biên không bờ bến / Em chẳng thể nào đo lường hết được đâu".',
    difficulty: 'medium',
    workReference: 'Bài thơ số 28',
    semester: 1
  },
  {
    id: 'tr-hk1-8',
    question: 'Trong "Nhìn về vốn văn hóa dân tộc", giáo sư Trần Đình Hượu chỉ ra đặc điểm nổi bật nhất trong lối sống và tâm hồn người Việt là gì?',
    options: ['Chuộng sự phi thường, đồ sộ, kỳ vĩ', 'Chuộng sự bình dị, thanh lịch, chừng mực và gắn với cái đẹp đời thường', 'Sùng bái thần quyền tuyệt đối', 'Thích phiêu lưu khám phá biển khơi'],
    correctIndex: 1,
    explanation: 'Tác giả nhận định: người Việt không chuộng cái kỳ vĩ, phi thường mà yêu thích sự thanh nhã, hài hòa, chuộng cái vừa phải, gắn chặt với cuộc sống thường nhật ấm cúng.',
    difficulty: 'easy',
    workReference: 'Nhìn về vốn văn hóa dân tộc',
    semester: 1
  },
  {
    id: 'tr-hk1-9',
    question: 'Trong truyện ngắn "Muối của rừng" của Nguyễn Huy Thiệp, nhân vật ông Diểu vào rừng với mục đích gì và ra về với tâm thế ra sao?',
    options: [
      'Đi tìm vàng và thất vọng trở về tay trắng',
      'Đi săn khỉ bằng súng mới, chứng kiến tình mẫu tử loài vật nên đã phóng sinh và ra về trong mưa xuân thanh thản',
      'Đi hái thuốc chữa bệnh cho vợ và bị lạc trong rừng sâu',
      'Đi khai thác gỗ quý và gặp thú dữ tấn công'
    ],
    correctIndex: 1,
    explanation: 'Ông Diểu bắn hạ khỉ đực, chứng kiến tình cảm khỉ cái và khỉ con đã thức tỉnh lương tri. Ông cứu chữa cho khỉ đực, phóng sinh nó rồi trần truồng đi về giữa rừng hoa tử huyền nở rộ (muối của rừng).',
    difficulty: 'medium',
    workReference: 'Muối của rừng',
    semester: 1
  },
  {
    id: 'tr-hk1-10',
    question: 'Trong "Hải khẩu linh từ" (Đoàn Thị Điểm), người phụ nữ tiết liệt tuẫn tiết ở cửa biển Thần Phù để giữ trọn danh dự và trinh bạch là ai?',
    options: ['Vũ Nương', 'Thái sư phu nhân', 'Nàng Chế Thắng Phu nhân Nguyễn Thị Bích Châu', 'Liễu Hạnh công chúa'],
    correctIndex: 2,
    explanation: 'Truyện kể về Chế Thắng phu nhân Nguyễn Thị Bích Châu, người dâng "Kê minh thập sách" rồi tuẫn tiết nơi cửa biển để xin thần linh phù hộ cho đoàn quân vua Trần.',
    difficulty: 'hard',
    workReference: 'Hải khẩu linh từ',
    semester: 1
  },
  {
    id: 'tr-hk1-11',
    question: 'Vở hài kịch kinh điển "Quan thanh tra" của Nikolai Gogol (trích đoạn "Nhân vật quan trọng") vạch trần thói xấu nào của bộ máy quan chức?',
    options: [
      'Sự trung thực quá mức của quan lại tỉnh lẻ',
      'Thói xu nịnh mù quáng, tham nhũng, lạm quyền và nỗi khiếp sợ hoảng loạn trước cấp trên',
      'Lòng dũng cảm dám chống lại bạo quyền',
      'Sự hy sinh quên mình vì lợi ích của người dân nghèo'
    ],
    correctIndex: 1,
    explanation: 'Gogol xây dựng bức tranh châm biếm sâu cay: đám quan chức địa phương run rẩy, xun xoe, hối lộ cho một gã công chức quèn Khlestakov chỉ vì lầm tưởng hắn là Quan thanh tra.',
    difficulty: 'easy',
    workReference: 'Nhân vật quan trọng',
    semester: 1
  },
  {
    id: 'tr-hk1-12',
    question: 'Trong trích đoạn kịch "Giấu của" (vở "Quẫn" của tác giả Lộng Chương), bà Đại Cát có hành vi bi hài kịch nào?',
    options: [
      'Đem vàng bạc nộp hết cho ủy ban kháng chiến',
      'Điên cuồng tìm chỗ chôn giấu vàng bạc, đồ quý khắp nhà vì sợ bị tịch thu trong cải tạo công thương',
      'Chia đều tài sản cho người nghèo trong xóm',
      'Bán rẻ toàn bộ tài sản để mở trường học'
    ],
    correctIndex: 1,
    explanation: 'Bà Đại Cát cùng người nhà lo âu đến mức hoang tưởng, tìm đủ mọi ngóc ngách từ gầm giường, ống cống, hố rác để nhét vàng giấu của, tạo nên tiếng cười phê phán thói ích kỷ tư hữu.',
    difficulty: 'medium',
    workReference: 'Giấu của',
    semester: 1
  },

  // --- HỌC KÌ II ---
  {
    id: 'tr-hk2-1',
    question: 'Trong "Tuyên ngôn Độc lập" (1945), Chủ tịch Hồ Chí Minh đã trích dẫn hai bản tuyên ngôn tiến bộ nào của thế giới để mở đầu?',
    options: [
      'Tuyên ngôn Độc lập Mỹ (1776) và Tuyên ngôn Nhân quyền & Dân quyền Pháp (1789)',
      'Hiến chương Liên Hợp Quốc và Tuyên ngôn Phổ quát về Nhân quyền',
      'Đại Hiến chương Magna Carta của Anh và Tuyên ngôn Mỹ',
      'Bình Ngô đại cáo và Nam quốc sơn hà'
    ],
    correctIndex: 0,
    explanation: 'Bác mở đầu bằng cách trích dẫn Tuyên ngôn Độc lập của Mỹ (1776) và Tuyên ngôn Nhân quyền & Dân quyền của Cách mạng Pháp (1789) để tạo cơ sở pháp lý và chính nghĩa quốc tế vững chắc.',
    difficulty: 'easy',
    workReference: 'Tuyên ngôn Độc lập',
    semester: 2
  },
  {
    id: 'tr-hk2-2',
    question: 'Hình ảnh chuyển đổi không gian - ánh sáng kì diệu nhất ở cuối bài thơ "Mộ" (Chiều tối) của Hồ Chí Minh là gì?',
    options: [
      'Chòm mây trôi về cuối chân trời',
      'Cánh chim mỏi bay về rừng tìm chốn ngủ',
      'Lò than đỏ rực trong xóm núi làm bừng sáng cả bầu trời đêm',
      'Vầng trăng rằm chiếu sáng đường gập ghềnh'
    ],
    correctIndex: 2,
    explanation: 'Chữ "hồng" ở cuối bài thơ (Lô tẩu viên ma ma túc / Ma hoàn lô dĩ hồng) như nhãn tự, thắp sáng cả thi phẩm, xua tan bóng tối và mệt mỏi, thể hiện tinh thần lạc quan cách mạng.',
    difficulty: 'easy',
    workReference: 'Mộ',
    semester: 2
  },
  {
    id: 'tr-hk2-3',
    question: 'Bài thơ "Nguyên tiêu" (Rằm tháng giêng) được Bác Hồ sáng tác vào năm nào và trong bối cảnh lịch sử nào?',
    options: [
      'Năm 1941 tại hang Pác Bó khi mới về nước',
      'Năm 1948 tại chiến khu Việt Bắc trong thời kỳ đầu kháng chiến chống Pháp',
      'Năm 1954 ngay sau chiến thắng Điện Biên Phủ',
      'Năm 1960 tại Hà Nội trong đại hội Đảng'
    ],
    correctIndex: 1,
    explanation: 'Thi phẩm được viết vào đêm trăng rằm tháng giêng năm Mậu Tý (1948) trên dòng sông Đáy tại chiến khu Việt Bắc, sau khi Người cùng các đồng chí bàn bạc việc quân trở về.',
    difficulty: 'medium',
    workReference: 'Nguyên tiêu',
    semester: 2
  },
  {
    id: 'tr-hk2-4',
    question: 'Trong tác phẩm "Những trò lố hay là Va-ren và Phan Bội Châu", thái độ của nhà chí sĩ Phan Bội Châu trước những lời đường mật của Toàn quyền Va-ren là gì?',
    options: [
      'Lớn tiếng tranh luận và phê phán chính quyền thực dân',
      'Giữ sự im lặng khinh bỉ, đôi mắt mở to nhìn thẳng rồi mỉm cười kín đáo và có lời đồn nhổ vào mặt hắn',
      'Rơi nước mắt nhận lời hợp tác để cứu tính mạng',
      'Gửi thư cảm tạ chính phủ Pháp'
    ],
    correctIndex: 1,
    explanation: 'Trước bài diễn thuyết lố bịch và trơ trẽn của Va-ren, Phan Bội Châu giữ vững tư thế kiêu hãnh của bậc ái quốc vĩ đại: ngắm nhìn như một con thú lạ, cười mỉm ngạo nghễ và khinh bỉ tột cùng.',
    difficulty: 'medium',
    workReference: 'Những trò lố hay là Va-ren và Phan Bội Châu',
    semester: 2
  },
  {
    id: 'tr-hk2-5',
    question: 'Tác phẩm phóng sự "Việc làng" của nhà văn Ngô Tất Tố (trích đoạn "Nghệ thuật băm thịt gà") phơi bày hủ tục kinh hoàng nào ở làng quê Việt Nam xưa?',
    options: [
      'Hủ tục thách cưới và tảo hôn',
      'Tệ nạn cờ bạc rượu chè tràn lan',
      'Hủ tục xôi thịt, ngôi thứ nơi đình trung khiến người nông dân khốn đốn, khuynh gia bại sản',
      'Hủ tục mê tín dị đoan xem bói gieo quẻ'
    ],
    correctIndex: 2,
    explanation: 'Ngô Tất Tố miêu tả chi tiết kỹ nghệ băm thịt gà sao cho đủ chia cho hàng trăm suất theo ngôi thứ thứ bậc ở chốn đình trung, vạch trần gánh nặng hủ tục đè nát sinh mạng nông dân.',
    difficulty: 'easy',
    workReference: 'Nghệ thuật băm thịt gà',
    semester: 2
  },
  {
    id: 'tr-hk2-6',
    question: 'Nhà học giả Đào Duy Anh trong hồi ký "Nhớ nghĩ chiều hôm" (trích đoạn "Bước vào đời") đã lựa chọn con đường dấn thân nào cho tuổi trẻ?',
    options: [
      'Chấp nhận làm công chức mẫn cán cho Pháp để an nhàn hưởng lộc',
      'Từ bỏ quan trường, tham gia Hội Phục Việt, làm báo, viết từ điển và cống hiến trọn đời cho văn hóa học thuật nước nhà',
      'Sang phương Tây định cư kinh doanh thương mại',
      'Lên vùng cao ẩn dật trồng hoa làm thơ'
    ],
    correctIndex: 1,
    explanation: 'Đào Duy Anh thể hiện nhân cách trí thức trung kiên: từ bỏ lối sống êm ấm để hòa mình vào phong trào yêu nước, lập Quan hải tùng thư truyền bá tư tưởng mới cho quốc dân.',
    difficulty: 'medium',
    workReference: 'Bước vào đời',
    semester: 2
  },
  {
    id: 'tr-hk2-7',
    question: 'Quan niệm sống mới mẻ, hiện đại và táo bạo nhất của thi sĩ Xuân Diệu trong bài thơ "Vội vàng" là gì?',
    options: [
      'Cuộc đời là bể khổ, con người cần lánh đời nhập thiền',
      'Thiên đường ở ngay trên mặt đất trần thế; hãy sống vội vàng, cuống quýt để tận hiến và tận hưởng tuổi trẻ',
      'Chỉ có thiên nhiên là vĩnh cửu còn con người hoàn toàn vô nghĩa',
      'Thời gian là vòng tuần hoàn vô tận, tuổi trẻ sẽ luôn trở lại'
    ],
    correctIndex: 1,
    explanation: 'Xuân Diệu coi trần gian là bữa tiệc thanh sắc rực rỡ nhất ("Tháng giêng ngon như một cặp môi gần"). Ông thúc giục con người hãy sống gấp gáp, mãnh liệt để không phí hoài thanh xuân.',
    difficulty: 'easy',
    workReference: 'Vội vàng',
    semester: 2
  },
  {
    id: 'tr-hk2-8',
    question: 'Hình tượng con cá kiếm khổng lồ trong "Ông già và biển cả" (Ernest Hemingway) tượng trưng cho điều gì?',
    options: [
      'Sự hung dữ độc ác của đại dương đối với loài người',
      'Vẻ đẹp kiêu dũng, kỳ vĩ của tự nhiên và đối thủ xứng tầm, biểu tượng của ước mơ lớn lao mà con người khát khao chinh phục',
      'Sự may mắn ngẫu nhiên không cần trả giá',
      'Một món lợi kinh tế giúp ông lão trở nên giàu có'
    ],
    correctIndex: 1,
    explanation: 'Con cá kiếm không đơn thuần là con mồi mà là một người anh em cao quý, biểu tượng của ước mơ kỳ vĩ trong triết lý "con người có thể bị hủy diệt nhưng không thể bị đánh bại".',
    difficulty: 'medium',
    workReference: 'Trở về',
    semester: 2
  },
  {
    id: 'tr-hk2-9',
    question: 'Thông điệp nhân sinh sâu sắc nhất trong vở kịch "Hồn Trương Ba, da hàng thịt" của Lưu Quang Vũ là gì?',
    options: [
      'Con người phải thỏa hiệp với bản năng để tồn tại dễ dàng',
      'Không thể sống bên trong một đằng bên ngoài một nẻo; con người chỉ thực sự hạnh phúc khi được sống là chính mình toàn vẹn',
      'Thể xác luôn chiến thắng và quyết định tâm hồn trong mọi hoàn cảnh',
      'Phép thuật thần tiên có thể sửa chữa mọi sai lầm của con người'
    ],
    correctIndex: 1,
    explanation: 'Lời thoại bất hủ của Trương Ba: "Không thể bên trong một đằng, bên ngoài một nẻo được. Tôi muốn được là tôi toàn vẹn" đúc kết giá trị cốt lõi về sự thống nhất giữa tâm hồn và thể xác.',
    difficulty: 'easy',
    workReference: 'Hồn Trương Ba, da Hàng Thịt',
    semester: 2
  },
  {
    id: 'tr-hk2-10',
    question: 'Bài học triết học nào được rút ra từ văn bản "Pa-ra-na" của nhà nhân chủng học Claude Lévi-Strauss?',
    options: [
      'Nền văn minh phương Tây là kiểu mẫu duy nhất mà mọi dân tộc phải noi theo',
      'Cần tôn trọng tính đa dạng văn hóa, lắng nghe tự nhiên và bảo vệ những cộng đồng bản địa trước sự tàn phá của đô thị hóa cơ học',
      'Tất cả các dòng sông đều phải được ngăn đập làm thủy điện',
      'Con người cần nhanh chóng khai hoang toàn bộ rừng nhiệt đới'
    ],
    correctIndex: 1,
    explanation: 'Claude Lévi-Strauss qua hành trình thám hiểm Pa-ra-na đã thức tỉnh nhân loại về cái giá đắt của sự hủy diệt tự nhiên và nhấn mạnh sự cần thiết của việc tôn trọng hệ sinh thái và bản sắc các dân tộc.',
    difficulty: 'medium',
    workReference: 'Pa-ra-na',
    semester: 2
  }
];

export const AUTHOR_GAMES: AuthorClueGame[] = [
  // Semester 1
  {
    id: 'au-hk1-1',
    workName: 'Xuân Tóc Đỏ cứu quốc (Số đỏ)',
    clues: [
      'Ông được mệnh danh là "ông vua phóng sự đất Bắc" thời kỳ 1930 - 1945.',
      'Sở hữu ngòi bút trào phúng bậc thầy với giọng văn cay đắng, xót xa trước xã hội "chó đểu".',
      'Mất sớm ở tuổi 27 vì bệnh lao phổi, để lại nhiều kiệt tác như "Số đỏ", "Giông tố", "Cơm thầy cơm cô".'
    ],
    options: ['Vũ Trọng Phụng', 'Nam Cao', 'Ngô Tất Tố', 'Nguyễn Công Hoan'],
    correctAuthor: 'Vũ Trọng Phụng',
    explanation: 'Vũ Trọng Phụng (1912 - 1939) là cây bút trào phúng vô song trong văn học hiện thực phê phán Việt Nam.',
    difficulty: 'easy',
    semester: 1
  },
  {
    id: 'au-hk1-2',
    workName: 'Mùa lá rụng trong vườn',
    clues: [
      'Tên khai sinh là Đinh Trọng Đoàn, từng có thời gian dài gắn bó với vùng cao Tây Bắc.',
      'Được trao Giải thưởng Hồ Chí Minh về Văn học Nghệ thuật năm 2012.',
      'Tác phẩm của ông chuyên sâu sắc sảo về đề tài gia đình, đạo đức và sự biến thiên văn hóa thời kỳ Đổi mới.'
    ],
    options: ['Ma Văn Kháng', 'Nguyễn Khải', 'Nguyễn Minh Châu', 'Lê Lựu'],
    correctAuthor: 'Ma Văn Kháng',
    explanation: 'Nhà văn Ma Văn Kháng nổi tiếng với tiểu thuyết "Mùa lá rụng trong vườn", "Đám cưới không có giấy giá thú", "Mưa mùa hạ".',
    difficulty: 'medium',
    semester: 1
  },
  {
    id: 'au-hk1-3',
    workName: 'Tây Tiến',
    clues: [
      'Là một nghệ sĩ đa tài: làm thơ, viết văn, vẽ tranh và soạn nhạc.',
      'Thơ ông mang vẻ đẹp vừa hồn hậu, vừa lãng mạn, hào hoa, đậm chất lính thủ đô.',
      'Từng là đại đội trưởng trong đoàn quân Tây Tiến tiến về miền Tây Bắc bảo vệ biên cương.'
    ],
    options: ['Quang Dũng', 'Chính Hữu', 'Tố Hữu', 'Hoàng Cầm'],
    correctAuthor: 'Quang Dũng',
    explanation: 'Quang Dũng (Bùi Đình Diệm) sáng tác "Tây Tiến" tại Phù Lưu Chanh năm 1948 khi nhớ về đơn vị cũ.',
    difficulty: 'easy',
    semester: 1
  },
  {
    id: 'au-hk1-4',
    workName: 'Đàn ghi ta của Lor-ca',
    clues: [
      'Là một trong những gương mặt tiêu biểu nhất của thế hệ nhà thơ trẻ thời chống Mỹ cứu nước.',
      'Phong cách thơ cách tân táo bạo, giàu chất suy tư triết lý, ngôn ngữ giàu tính nhạc và biểu tượng siêu thực.',
      'Tác giả của trường ca "Những người đi tới biển" và tập thơ "Khối vuông ru-bích".'
    ],
    options: ['Thanh Thảo', 'Nguyễn Khoa Điềm', 'Phạm Tiến Duật', 'Hữu Thỉnh'],
    correctAuthor: 'Thanh Thảo',
    explanation: 'Thanh Thảo luôn tìm tòi, đổi mới thi pháp thơ Việt Nam hiện đại, thể hiện rõ trong "Đàn ghi ta của Lor-ca".',
    difficulty: 'easy',
    semester: 1
  },
  {
    id: 'au-hk1-5',
    workName: 'Muối của rừng',
    clues: [
      'Xuất hiện trên văn đàn cuối thập niên 1980 như một hiện tượng gây chấn động với những truyện ngắn đổi mới tư duy nghệ thuật.',
      'Văn phong sắc sảo, cô đọng, giàu ẩn dụ triết lý về nhân tính và sinh thái.',
      'Tác giả các tác phẩm nổi tiếng như "Tướng về hưu", "Kiếm sắc", "Vàng lửa", "Thương nhớ đồng quê".'
    ],
    options: ['Nguyễn Huy Thiệp', 'Bảo Ninh', 'Nguyễn Khắc Trường', 'Hồ Anh Thái'],
    correctAuthor: 'Nguyễn Huy Thiệp',
    explanation: 'Nguyễn Huy Thiệp (1950 - 2021) là một trong những nhà văn có ảnh hưởng lớn nhất thời kỳ Đổi mới.',
    difficulty: 'medium',
    semester: 1
  },
  {
    id: 'au-hk1-6',
    workName: 'Cảm hoài',
    clues: [
      'Là danh tướng trung thần thời Hậu Trần, con trai của Đặng Tất.',
      'Cùng vua Trùng Quang Đế chống lại quân xâm lược nhà Minh trong gian khổ hiểm nguy.',
      'Bài thơ duy nhất còn lưu lại của ông toát lên khí phách bi tráng, hoài bão cứu nước chưa thành.'
    ],
    options: ['Đặng Dung', 'Nguyễn Trãi', 'Phạm Ngũ Lão', 'Trần Hưng Đạo'],
    correctAuthor: 'Đặng Dung',
    explanation: 'Đặng Dung (? - 1414) để lại bài thơ chữ Hán "Cảm hoài" lẫm liệt, ngời sáng ngọn lửa yêu nước.',
    difficulty: 'hard',
    semester: 1
  },

  // Semester 2
  {
    id: 'au-hk2-1',
    workName: 'Tuyên ngôn Độc lập & Nhật kí trong tù',
    clues: [
      'Anh hùng giải phóng dân tộc, Nhà văn hóa kiệt xuất được UNESCO vinh danh.',
      'Sáng tác nhiều thể loại: chính luận sắc bén, truyện kí trào phúng, thơ chữ Hán cổ điển và thơ cách mạng.',
      'Đọc bản Tuyên ngôn Độc lập tại Quảng trường Ba Đình ngày 2/9/1945 khai sinh nước VNDCCH.'
    ],
    options: ['Hồ Chí Minh', 'Trường Chinh', 'Phạm Văn Đồng', 'Võ Nguyên Giáp'],
    correctAuthor: 'Hồ Chí Minh',
    explanation: 'Chủ tịch Hồ Chí Minh là lãnh tụ vĩ đại đồng thời là danh nhân văn hóa để lại di sản văn học đồ sộ.',
    difficulty: 'easy',
    semester: 2
  },
  {
    id: 'au-hk2-2',
    workName: 'Nghệ thuật băm thịt gà (Việc làng)',
    clues: [
      'Nhà văn, nhà báo, nhà nghiên cứu uyên bác gắn liền với đề tài nông thôn Việt Nam trước Cách mạng.',
      'Tác giả của tiểu thuyết hiện thực xuất sắc "Tắt đèn" và phóng sự "Lều chõng".',
      'Hiểu biết sâu sắc từng lề thói, phong tục và nỗi khổ cùng cực của người nông dân dưới chế độ thực dân nửa phong kiến.'
    ],
    options: ['Ngô Tất Tố', 'Nam Cao', 'Nguyễn Tuân', 'Nguyên Hồng'],
    correctAuthor: 'Ngô Tất Tố',
    explanation: 'Ngô Tất Tố (1894 - 1954) với tập phóng sự "Việc làng" đã phanh phui những ung nhọt hủ tục đình trung làng quê.',
    difficulty: 'easy',
    semester: 2
  },
  {
    id: 'au-hk2-3',
    workName: 'Vội vàng',
    clues: [
      'Được Hoài Thanh tôn vinh là "nhà thơ mới nhất trong các nhà thơ mới".',
      'Đem vào thơ Việt Nam nguồn cảm xúc yêu đương nồng nàn, cảm quan thời gian gấp gáp và cái "Tôi" cuồng nhiệt.',
      'Tác giả các tập thơ bất hủ như "Thơ thơ" (1938) và "Gửi hương cho gió" (1945).'
    ],
    options: ['Xuân Diệu', 'Huy Cận', 'Hàn Mặc Tử', 'Chế Lan Viên'],
    correctAuthor: 'Xuân Diệu',
    explanation: 'Xuân Diệu (1916 - 1985) là "ông hoàng thơ tình", biểu tượng cho tinh thần tươi mới của phong trào Thơ mới.',
    difficulty: 'easy',
    semester: 2
  },
  {
    id: 'au-hk2-4',
    workName: 'Hồn Trương Ba, da Hàng Thịt',
    clues: [
      'Là nhà viết kịch tài hoa bậc nhất của sân khấu kịch hiện đại Việt Nam thập niên 1980.',
      'Các vở kịch của ông luôn sôi nổi tính thời sự, chứa đựng những câu hỏi triết học sâu sắc về nhân sinh và đạo đức.',
      'Cùng vợ là nữ thi sĩ Xuân Quỳnh qua đời trong một tai nạn giao thông bi thảm năm 1988.'
    ],
    options: ['Lưu Quang Vũ', 'Đào Hồng Cẩm', 'Nguyễn Huy Tưởng', 'Nguyễn Đình Thi'],
    correctAuthor: 'Lưu Quang Vũ',
    explanation: 'Lưu Quang Vũ (1948 - 1988) để lại kho tàng kịch nghệ đồ sộ như "Hồn Trương Ba, da hàng thịt", "Tôi và chúng ta", "Lời thề thứ 9".',
    difficulty: 'easy',
    semester: 2
  },
  {
    id: 'au-hk2-5',
    workName: 'Trở về (Ông già và biển cả)',
    clues: [
      'Nhà văn Mỹ vĩ đại từng nhận giải Nobel Văn học năm 1954.',
      'Đề xướng nguyên lý văn chương nổi tiếng "Tảng băng trôi" (một phần nổi, bảy phần chìm).',
      'Từng tham gia các cuộc thế chiến và nội chiến Tây Ban Nha, tác giả "Giã từ vũ khí", "Chuông nguyện hồn ai".'
    ],
    options: ['Ernest Hemingway', 'F. Scott Fitzgerald', 'William Faulkner', 'John Steinbeck'],
    correctAuthor: 'Ernest Hemingway',
    explanation: 'Ernest Hemingway (1899 - 1961) bất tử với phong cách ngắn gọn, gợi nhiều liên tưởng sâu kín.',
    difficulty: 'medium',
    semester: 2
  }
];

export const GUESS_WORK_GAMES: GuessWorkGame[] = [
  // Semester 1
  {
    id: 'gw-hk1-1',
    quoteOrClue: '"Hỡi công chúng! Mi chưa hiểu rõ những sự hy sinh cao thượng của ta... Ta đã vì các ngươi mà bỏ cả chức vô địch quần vợt Xiêm La!"',
    hint: 'Trích từ màn kịch trào phúng đỉnh cao khi một kẻ lang băm mồm mép trở thành người hùng giải cứu dân tộc.',
    options: ['Xuân Tóc Đỏ cứu quốc', 'Nhân vật quan trọng', 'Giấu của', 'Cẩn thận hão'],
    correctWork: 'Xuân Tóc Đỏ cứu quốc',
    author: 'Vũ Trọng Phụng',
    explanation: 'Xuân Tóc Đỏ bịa đặt sự hy sinh giả tạo trước hàng vạn quần chúng ngu muội tung hô hắn như một đấng cứu thế.',
    difficulty: 'easy',
    semester: 1
  },
  {
    id: 'gw-hk1-2',
    quoteOrClue: '"Tây Tiến đoàn binh không mọc tóc / Quân xanh màu lá dữ oai hùm / Mắt trừng gửi mộng qua biên giới / Đêm mơ Hà Nội dáng kiều thơm"',
    hint: 'Bức tượng đài bi tráng về người lính hào hoa thời kháng chiến chống Pháp.',
    options: ['Tây Tiến', 'Đồng chí', 'Đàn ghi ta của Lor-ca', 'Cảm hoài'],
    correctWork: 'Tây Tiến',
    author: 'Quang Dũng',
    explanation: 'Khổ thơ thứ ba của "Tây Tiến" tạc dựng chân dung người lính với vẻ đẹp vừa gân guốc, vừa lãng mạn mộng mơ.',
    difficulty: 'easy',
    semester: 1
  },
  {
    id: 'gw-hk1-3',
    quoteOrClue: '"tiếng ghi-ta nâu / bầu trời cô gái ấy / tiếng ghi-ta lá xanh biết mấy / tiếng ghi-ta tròn bọt nước vỡ tan"',
    hint: 'Hình ảnh âm thanh chuyển hóa màu sắc và sự ra đi oan khốc của nhà thơ tự do Tây Ban Nha.',
    options: ['Đàn ghi ta của Lor-ca', 'Bài thơ số 28', 'Vội vàng', 'Khúc đồng quê'],
    correctWork: 'Đàn ghi ta của Lor-ca',
    author: 'Thanh Thảo',
    explanation: 'Thanh Thảo sử dụng biện pháp hoán dụ và ẩn dụ chuyển đổi cảm giác để khắc họa số phận mong manh của nghệ thuật trước bạo tàn.',
    difficulty: 'easy',
    semester: 1
  },
  {
    id: 'gw-hk1-4',
    quoteOrClue: '"Thế là hết! Một con vật dũng mãnh, đầy tình nghĩa đồng loại... Ông bỗng cảm thấy hổ thẹn, một nỗi hổ thẹn của kẻ chiến thắng trước một sinh vật kiêu hãnh."',
    hint: 'Khoảnh khắc thức tỉnh nhân tính của người thợ săn già sau khi bắn trúng chú khỉ đực.',
    options: ['Muối của rừng', 'Trên xuồng cứu nạn', 'Bến trần gian', 'Mùa lá rụng trong vườn'],
    correctWork: 'Muối của rừng',
    author: 'Nguyễn Huy Thiệp',
    explanation: 'Chi tiết ông Diểu buông súng, băng bó vết thương cho khỉ đực và phóng sinh nó phản ánh sự hòa giải giữa con người và thiên nhiên.',
    difficulty: 'medium',
    semester: 1
  },
  {
    id: 'gw-hk1-5',
    quoteOrClue: '"Vàng này là mồ hôi nước mắt chắt bóp bao năm! Giấu ở đâu bây giờ? Dưới gầm chạn hay vùi xuống hố than?"',
    hint: 'Cảnh tượng dở khóc dở cười của gia đình phú hào tìm cách cất giấu tài sản riêng trong thời kỳ hợp tác hóa.',
    options: ['Giấu của', 'Nhân vật quan trọng', 'Mùa lá rụng trong vườn', 'Nghệ thuật băm thịt gà'],
    correctWork: 'Giấu của (trích Quẫn)',
    author: 'Lộng Chương',
    explanation: 'Vở kịch "Quẫn" của Lộng Chương tạo nên tiếng cười trào lộng phê phán thói ích kỷ tư hữu của giai cấp tư sản phản tiến bộ.',
    difficulty: 'medium',
    semester: 1
  },

  // Semester 2
  {
    id: 'gw-hk2-1',
    quoteOrClue: '"Nước Việt Nam có quyền hưởng tự do và độc lập, và sự thật đã thành một nước tự do, độc lập. Toàn thể dân tộc Việt Nam quyết đem tất cả tinh thần và lực lượng..."',
    hint: 'Lời tuyên thệ đanh thép, thiêng liêng kết thúc văn kiện lịch sử vĩ đại ngày 2/9/1945.',
    options: ['Tuyên ngôn Độc lập', 'Bình Ngô đại cáo', 'Lời kêu gọi toàn quốc kháng chiến', 'Hịch tướng sĩ'],
    correctWork: 'Tuyên ngôn Độc lập',
    author: 'Hồ Chí Minh',
    explanation: 'Đoạn kết hào hùng của Tuyên ngôn Độc lập khẳng định ý chí kiên định bảo vệ nền độc lập tự do vừa giành được.',
    difficulty: 'easy',
    semester: 2
  },
  {
    id: 'gw-hk2-2',
    quoteOrClue: '"Quyện điểu quy lâm tầm túc thụ / Cô vân mạn mạn độ thiên không / Sơn thôn thiếu nữ ma bao túc / Bao túc ma hoàn, lô dĩ hồng"',
    hint: 'Bài thơ tứ tuyệt chữ Hán miêu tả bức tranh thiên nhiên chiều muộn và sức sống ấm áp của con người lao động nơi xóm núi.',
    options: ['Mộ (Chiều tối)', 'Nguyên tiêu', 'Cảm hoài', 'Ngắm trăng'],
    correctWork: 'Mộ (Chiều tối)',
    author: 'Hồ Chí Minh',
    explanation: 'Bài thơ "Mộ" trích từ "Nhật kí trong tù" chuyển từ nỗi buồn cô đơn sang niềm vui ấm áp qua hình ảnh lò than rực hồng.',
    difficulty: 'easy',
    semester: 2
  },
  {
    id: 'gw-hk2-3',
    quoteOrClue: '"Mau đi thôi! Mùa chưa ngả chiều hôm / Ta muốn ôm / Cả sự sống mới bắt đầu mơn mởn / Ta muốn thâu trong một cái hôn nhiều..."',
    hint: 'Khúc ca sôi nổi cuống quýt của chàng thi sĩ tha thiết giao cảm với cuộc đời và tuổi trẻ.',
    options: ['Vội vàng', 'Tây Tiến', 'Đàn ghi ta của Lor-ca', 'Nguyên tiêu'],
    correctWork: 'Vội vàng',
    author: 'Xuân Diệu',
    explanation: 'Đoạn cuối bài "Vội vàng" với nhịp điệu dồn dập, điệp từ "ta muốn" thể hiện khát khao chiếm lĩnh cuộc sống ngút ngàn của Xuân Diệu.',
    difficulty: 'easy',
    semester: 2
  },
  {
    id: 'gw-hk2-4',
    quoteOrClue: '"Tôi không thể sống bên trong một đằng bên ngoài một nẻo được! Tôi muốn được là tôi toàn vẹn!"',
    hint: 'Lời thoại triết lý sâu sắc của một người làm vườn thanh cao khi không chấp nhận dung tục hóa nhân cách.',
    options: ['Hồn Trương Ba, da Hàng Thịt', 'Nhân vật quan trọng', 'Giấu của', 'Cẩn thận hão'],
    correctWork: 'Hồn Trương Ba, da Hàng Thịt',
    author: 'Lưu Quang Vũ',
    explanation: 'Trương Ba phản kháng quyết liệt sự sai bảo của thân xác anh hàng thịt thô phàm để bảo tồn linh hồn cao khiết.',
    difficulty: 'easy',
    semester: 2
  },
  {
    id: 'gw-hk2-5',
    quoteOrClue: '"Một con gà mà băm thành ba trăm miếng đều tăm tắp, đủ lệ đủ mâm làng nước. Thiếu một miếng là cả họ mất mặt nơi chiếu giữa!"',
    hint: 'Phóng sự chân thực đến đau đớn về hủ tục xôi thịt đình làng trói buộc sinh mệnh người dân quê.',
    options: ['Nghệ thuật băm thịt gà', 'Bước vào đời', 'Việc làng', 'Mùa lá rụng trong vườn'],
    correctWork: 'Nghệ thuật băm thịt gà',
    author: 'Ngô Tất Tố',
    explanation: 'Ngô Tất Tố miêu tả kỹ nghệ mổ gà băm thịt như một gánh nặng tâm lý và tài chính bi thảm của người nông dân cùng quẫn vì danh hão.',
    difficulty: 'easy',
    semester: 2
  }
];

export const LITERATURE_PUZZLES: LiteraturePuzzle[] = [
  // Semester 1
  {
    id: 'pz-hk1-1',
    category: 'quote',
    scrambledWords: ['chơi vơi', 'Sông Mã', 'nhớ về', 'xa rồi', 'rừng núi,', 'Tây Tiến ơi!'],
    originalText: 'Sông Mã xa rồi Tây Tiến ơi! Nhớ về rừng núi, nhớ chơi vơi',
    hint: 'Hai câu thơ mở đầu thi phẩm Tây Tiến nói về nỗi nhớ da diết của Quang Dũng.',
    workReference: 'Tây Tiến',
    difficulty: 'easy',
    semester: 1
  },
  {
    id: 'pz-hk1-2',
    category: 'quote',
    scrambledWords: ['bọt nước', 'tiếng ghi-ta', 'vỡ tan', 'tròn', 'li-la li-la li-la'],
    originalText: 'tiếng ghi-ta tròn bọt nước vỡ tan li-la li-la li-la',
    hint: 'Hình ảnh âm thanh gợi sự hy sinh bi tráng và bất tử của thi sĩ Lor-ca.',
    workReference: 'Đàn ghi ta của Lor-ca',
    difficulty: 'medium',
    semester: 1
  },
  {
    id: 'pz-hk1-3',
    category: 'quote',
    scrambledWords: ['Long Tuyền', 'Quốc thù', 'đầu tiên bạch', 'vị báo', 'đái nguyệt ma'],
    originalText: 'Quốc thù vị báo đầu tiên bạch Kỷ độ Long Tuyền đái nguyệt ma',
    hint: 'Câu thơ chữ Hán hào hùng bi tráng trong "Cảm hoài" của Đặng Dung.',
    workReference: 'Cảm hoài',
    difficulty: 'hard',
    semester: 1
  },

  // Semester 2
  {
    id: 'pz-hk2-1',
    category: 'quote',
    scrambledWords: ['tự do', 'quyền hưởng', 'Nước Việt Nam', 'và sự thật', 'có', 'độc lập'],
    originalText: 'Nước Việt Nam có quyền hưởng tự do và độc lập và sự thật đã thành một nước tự do độc lập',
    hint: 'Lời khẳng định quyền dân tộc thiêng liêng trong Tuyên ngôn Độc lập.',
    workReference: 'Tuyên ngôn Độc lập',
    difficulty: 'easy',
    semester: 2
  },
  {
    id: 'pz-hk2-2',
    category: 'quote',
    scrambledWords: ['Tôi muốn', 'toàn vẹn', 'là tôi', 'được', 'Không thể', 'bên trong một đằng'],
    originalText: 'Không thể bên trong một đằng bên ngoài một nẻo Tôi muốn được là tôi toàn vẹn',
    hint: 'Tuyên ngôn triết học nhân sinh của nhân vật Trương Ba trong kịch Lưu Quang Vũ.',
    workReference: 'Hồn Trương Ba, da Hàng Thịt',
    difficulty: 'easy',
    semester: 2
  },
  {
    id: 'pz-hk2-3',
    category: 'quote',
    scrambledWords: ['Xuân đang tới', 'nghĩa là', 'Xuân đương qua', 'xuân đương tới', 'xuân còn non'],
    originalText: 'Xuân đương tới nghĩa là xuân đương qua Xuân còn non nghĩa là xuân sẽ già',
    hint: 'Cảm thức thời gian một đi không trở lại trong thi phẩm "Vội vàng" của Xuân Diệu.',
    workReference: 'Vội vàng',
    difficulty: 'medium',
    semester: 2
  }
];

export const OBSTACLE_QUESTIONS: ObstacleQuestion[] = [
  // Level 1 - 5: HK1
  {
    level: 1,
    title: 'Cửa ải 1: Tiếng cười thế thái (HK1)',
    question: 'Trong "Xuân Tóc Đỏ cứu quốc", bằng cách nào một tên nhặt bóng quần vợt bỗng trở thành "anh hùng cứu quốc"?',
    options: [
      'Hắn đánh thắng trận quần vợt quyết định trước quán quân Xiêm La',
      'Hắn chủ ý chịu thua trận đấu quần vợt theo chỉ đạo ngoại giao rồi diễn thuyết giả nhân giả nghĩa mị dân',
      'Hắn dùng tiền mua chuộc toàn bộ trọng tài',
      'Hắn lập công bắt được giặc thám báo'
    ],
    correctIndex: 1,
    explanation: 'Vì mục đích ngoại giao giữ thể diện cho nước Xiêm, Xuân nhường thắng rồi đứng lên hô hào mình hy sinh vì hòa bình, làm cả khán đài xúc động mù quáng.',
    points: 10,
    semester: 1
  },
  {
    level: 2,
    title: 'Cửa ải 2: Khí phách sông núi (HK1)',
    question: 'Chi tiết "Áo bào thay chiếu anh về đất / Sông Mã gầm lên khúc độc hành" trong Tây Tiến nhằm giảm nhẹ điều gì và nâng cao phẩm chất gì?',
    options: [
      'Giảm nhẹ nỗi buồn quê hương, nâng cao tinh thần kỷ luật',
      'Giảm nhẹ sự khốc liệt của cái chết bằng ngôn từ tráng lệ (áo bào, về đất), nâng tầm hy sinh thành khúc tráng ca sông núi tiễn đưa',
      'Phê phán sự thiếu thốn thuốc men của quân đội',
      'Miêu tả phong tục an táng của người dân tộc thiểu số'
    ],
    correctIndex: 1,
    explanation: 'Quang Dũng đã sử dụng thủ pháp mỹ lệ hóa và tráng sĩ hóa để biến đau thương thành khí phách anh hùng bất tử của người chiến sĩ vô danh.',
    points: 15,
    semester: 1
  },
  {
    level: 3,
    title: 'Cửa ải 3: Âm vang cách tân (HK1)',
    question: 'Hình tượng "tiếng đàn ghi ta" trong thơ Thanh Thảo mang ý nghĩa biểu tượng nhiều tầng nào?',
    options: [
      'Chỉ là nhạc cụ gảy bài ca dân gian du mục',
      'Biểu tượng cho tâm hồn, nghệ thuật tự do, tình yêu cái đẹp và số phận mong manh bi tráng của thi sĩ Lor-ca',
      'Biểu tượng cho vũ khí hủy diệt kẻ thù',
      'Khúc nhạc chia tay của đôi trai gái'
    ],
    correctIndex: 1,
    explanation: 'Tiếng đàn chính là linh hồn Lor-ca, biểu tượng của khát vọng tự do và nghệ thuật chân chính không bao giờ tàn lụi trước bạo quyền phát xít.',
    points: 20,
    semester: 1
  },
  {
    level: 4,
    title: 'Cửa ải 4: Lương tri và sinh thái (HK1)',
    question: 'Ý nghĩa của loài "hoa tử huyền" (muối của rừng) chỉ nở ba mươi năm một lần ở cuối truyện ngắn của Nguyễn Huy Thiệp là gì?',
    options: [
      'Là loài hoa đem lại giàu sang phú quý tức thì cho người hái',
      'Biểu tượng của sự may mắn, bình yên, sự thanh sạch của thiên nhiên đón chào sự hồi sinh của lương tri con người',
      'Một loài hoa độc hại trong rừng cấm',
      'Loan báo một trận lũ quét sắp xảy ra'
    ],
    correctIndex: 1,
    explanation: 'Hoa tử huyền nở trắng rừng tượng trưng cho muối đất của tự nhiên ban tặng khi con người biết sám hối, biết dừng tay trước sự tàn sát muôn loài.',
    points: 25,
    semester: 1
  },
  {
    level: 5,
    title: 'Cửa ải 5: Bi kịch thời mở cửa (HK1)',
    question: 'Trong "Mùa lá rụng trong vườn" của Ma Văn Kháng, hình tượng cụ Bằng cùng bữa cơm tất niên chiều 30 Tết đại diện cho giá trị cốt lõi nào?',
    options: [
      'Sự bảo thủ lạc hậu cần phải nhanh chóng xóa bỏ',
      'Cột trụ tâm linh, sự gắn kết huyết thống và vẻ đẹp văn hóa truyền thống cần được nâng niu bảo tồn giữa biến động thời cuộc',
      'Thói gia trưởng áp đặt lên thế hệ trẻ',
      'Khao khát làm giàu bằng mọi giá'
    ],
    correctIndex: 1,
    explanation: 'Cụ Bằng là biểu tượng của nhân cách văn hóa Thăng Long nghìn năm, bữa cơm tất niên là không gian thiêng liêng gìn giữ sự lương thiện và hòa hợp gia đình.',
    points: 30,
    semester: 1
  },

  // Level 6 - 10: HK2
  {
    level: 6,
    title: 'Cửa ải 6: Ánh sáng chính nghĩa (HK2)',
    question: 'Về mặt nghệ thuật lập luận, "Tuyên ngôn Độc lập" của Hồ Chí Minh đạt đến đỉnh cao nhờ yếu tố then chốt nào?',
    options: [
      'Sử dụng nhiều từ ngữ địa phương mộc mạc',
      'Hệ thống luận điểm chặt chẽ, dẫn chứng lịch sử xác thực không thể chối cãi, lập luận đanh thép "gậy ông đập lưng ông"',
      'Chỉ dựa vào cảm xúc chủ quan để lay động lòng người',
      'Trích dẫn toàn bộ luật pháp cổ đại phương Đông'
    ],
    correctIndex: 1,
    explanation: 'Bác lấy chính tuyên ngôn của Pháp và Mỹ làm căn cứ pháp lý, rồi vạch trần tội ác thực tế của thực dân Pháp bằng chứng cứ lịch sử sắt đá, bẻ gãy luận điệu "bảo hộ" xảo quyệt.',
    points: 35,
    semester: 2
  },
  {
    level: 7,
    title: 'Cửa ải 7: Tinh thần thép trong thơ tù (HK2)',
    question: 'Chất "thép" hòa quyện với chất "tình" trong bài thơ "Mộ" (Chiều tối) của Hồ Chí Minh được thể hiện tinh tế nhất qua điều gì?',
    options: [
      'Những khẩu hiệu đấu tranh quyết liệt vang dội',
      'Phong thái ung dung tự tại, vượt lên đọa đày xích xiềng để hướng về sự sống ấm áp của con người lao động',
      'Lời tố cáo cai ngục đối xử tàn bạo',
      'Ý định vượt ngục ngay trong đêm tối'
    ],
    correctIndex: 1,
    explanation: 'Người tù bị giải đi trong cảnh chiều muộn đói rét nhưng tâm hồn vẫn rộng mở, rung động trước vẻ đẹp thiên nhiên và ấm lòng trước hình ảnh cô gái xóm núi xay ngô bên bếp lửa hồng.',
    points: 40,
    semester: 2
  },
  {
    level: 8,
    title: 'Cửa ải 8: Triết lý sống gấp (HK2)',
    question: 'Câu thơ "Xuân đương tới nghĩa là xuân đương qua / Xuân còn non nghĩa là xuân sẽ già" thể hiện quan niệm thời gian mang tính cách tân thế nào của Xuân Diệu?',
    options: [
      'Thời gian là tuần hoàn bất tận như quan niệm cổ điển phương Đông',
      'Thời gian là một dòng chảy tuyến tính một đi không trở lại, mỗi khoảnh khắc trôi qua là một sự mất mát vĩnh viễn',
      'Thời gian không có thật, chỉ là ảo ảnh',
      'Thời gian phụ thuộc hoàn toàn vào ý chí chủ quan của nhà thơ'
    ],
    correctIndex: 1,
    explanation: 'Xuân Diệu từ bỏ quan niệm vũ trụ tuần hoàn của người xưa để nhìn nhận thời gian theo bước chân tuyến tính phương Tây: đời người hữu hạn nên phải sống gấp gáp, cống hiến hết mình.',
    points: 45,
    semester: 2
  },
  {
    level: 9,
    title: 'Cửa ải 9: Đỉnh cao kịch triết lý (HK2)',
    question: 'Vì sao Trương Ba kiên quyết từ chối đề nghị của Đế Thích nhập vào xác cu Tị?',
    options: [
      'Vì xác cu Tị quá nhỏ bé không thể làm việc nặng nhọc',
      'Vì thấu hiểu nếu tiếp tục vay mượn thân xác, bi kịch chắp vá và tha hóa sẽ lại tiếp diễn và làm khổ thêm sinh linh vô tội; ông chọn cái chết thanh thản để được là chính mình',
      'Vì Đế Thích yêu cầu Trương Ba nộp nhiều vàng bạc',
      'Vì gia đình cu Tị kiên quyết phản đối'
    ],
    correctIndex: 1,
    explanation: 'Trương Ba không muốn cu Tị phải chết oan và không chấp nhận kéo dài cuộc sống giả tạo chắp vá. Sự lựa chọn dũng cảm trả lại sự sống cho đứa trẻ khẳng định nhân cách cao thượng vẹn nguyên.',
    points: 50,
    semester: 2
  },
  {
    level: 10,
    title: 'Cửa ải 10: Tinh thần bất diệt (HK2)',
    question: 'Tuyên ngôn bất hủ "Con người không được sinh ra để dành cho thất bại. Con người có thể bị hủy diệt nhưng không thể bị đánh bại" là của tác phẩm nào?',
    options: [
      'Ông già và biển cả (Trở về - Ernest Hemingway)',
      'Số đỏ (Vũ Trọng Phụng)',
      'Hồn Trương Ba, da Hàng Thịt (Lưu Quang Vũ)',
      'Nhiệt đới buồn (Claude Lévi-Strauss)'
    ],
    correctIndex: 0,
    explanation: 'Lời phát biểu của ông lão Santiago khi chiến đấu kiệt cùng trước đàn cá mập hung dữ giữa đại dương là bài ca bất tử tôn vinh ý chí, nghị lực phi thường của con người trước nghịch cảnh.',
    points: 60,
    semester: 2
  }
];
