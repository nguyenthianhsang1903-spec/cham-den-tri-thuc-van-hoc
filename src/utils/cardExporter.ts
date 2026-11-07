import { LiteraryWork } from '../types';

/**
 * Generates and downloads a high-resolution (1200x1600px) literary study infographic card.
 * Includes THPT Yên Lãng, Lớp 12A03-K60, Lưu Gia Linh & Nguyễn Thị Ánh Sáng branding.
 * Ensures that when saved, all contents are crystal clear, self-contained, and completely visible.
 */
export async function downloadWorkInfographic(work: LiteraryWork): Promise<void> {
  const width = 1200;
  const height = 1600;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Background: Warm Paper / Cream
  ctx.fillStyle = '#FFF9F0';
  ctx.fillRect(0, 0, width, height);

  // Outer Decorative Borders
  ctx.strokeStyle = '#25234A';
  ctx.lineWidth = 10;
  ctx.strokeRect(30, 30, width - 60, height - 60);

  ctx.strokeStyle = '#F5C76A';
  ctx.lineWidth = 4;
  ctx.strokeRect(45, 45, width - 90, height - 90);

  // Corner ornaments
  const corners = [
    [55, 55],
    [width - 55, 55],
    [55, height - 55],
    [width - 55, height - 55]
  ];
  ctx.fillStyle = '#8B5CF6';
  corners.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, Math.PI * 2);
    ctx.fill();
  });

  // Top Header Banner (School & Project Branding)
  ctx.fillStyle = '#25234A';
  ctx.fillRect(50, 50, width - 100, 150);

  // School & Class Text
  ctx.fillStyle = '#F5C76A';
  ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('TRƯỜNG THPT YÊN LÃNG · LỚP 12A03 - K60 · NĂM HỌC 2026–2027', width / 2, 92);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 34px "Lora", serif';
  ctx.fillText('SẢN PHẨM HỌC TẬP SỐ – MÔN NGỮ VĂN', width / 2, 138);

  ctx.fillStyle = '#A78BFA';
  ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('GV hướng dẫn: Võ Thị Mỹ Ngà · Học sinh thực hiện: Lưu Gia Linh & Nguyễn Thị Ánh Sáng', width / 2, 175);

  // Work Title Banner
  ctx.fillStyle = '#8B5CF6';
  ctx.fillRect(70, 230, width - 140, 110);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 44px "Lora", serif';
  ctx.fillText(work.title, width / 2, 285);

  ctx.fillStyle = '#F5C76A';
  ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`${work.unit} · Học kì ${work.semester} · Thể loại: ${work.genre}`, width / 2, 322);

  // Two Column Layout: Author on Left, Summary on Right
  // Left: Author Card Box
  ctx.fillStyle = '#FFFFFF';
  ctx.strokeStyle = '#25234A';
  ctx.lineWidth = 3;
  ctx.fillRect(70, 360, 480, 260);
  ctx.strokeRect(70, 360, 480, 260);

  // Author Avatar Badge
  ctx.fillStyle = '#25234A';
  ctx.beginPath();
  ctx.arc(140, 440, 50, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#F5C76A';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(140, 440, 50, 0, Math.PI * 2);
  ctx.stroke();

  // Author Initials Monogram
  const initials = work.author.split(' ').map(n => n[0]).slice(-2).join('');
  ctx.fillStyle = '#F5C76A';
  ctx.font = 'bold 36px "Lora", serif';
  ctx.textAlign = 'center';
  ctx.fillText(initials, 140, 452);

  // Author details
  ctx.textAlign = 'left';
  ctx.fillStyle = '#25234A';
  ctx.font = 'bold 28px "Lora", serif';
  ctx.fillText(work.author, 210, 430);

  ctx.fillStyle = '#8B5CF6';
  ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`Năm sinh: ${work.authorYears}`, 210, 460);

  ctx.fillStyle = '#D97706';
  ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`Năm sáng tác: ${work.yearCreated}`, 210, 488);

  // Author bio text
  ctx.fillStyle = '#25234A';
  ctx.font = '16px "Plus Jakarta Sans", sans-serif';
  const bioWords = work.authorBio.slice(0, 150) + '...';
  wrapText(ctx, bioWords, 90, 530, 440, 24);

  // Right: Context & Background Box
  ctx.fillStyle = '#FFFFFF';
  ctx.strokeStyle = '#25234A';
  ctx.lineWidth = 3;
  ctx.fillRect(580, 360, 550, 260);
  ctx.strokeRect(580, 360, 550, 260);

  ctx.fillStyle = '#D97706';
  ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('HOÀN CẢNH SÁNG TÁC & XUẤT XỨ', 600, 400);

  ctx.fillStyle = '#25234A';
  ctx.font = '17px "Plus Jakarta Sans", sans-serif';
  wrapText(ctx, work.backgroundAndOrigin, 600, 435, 510, 26);

  // Section 2: Main Content & Humanitarian Message
  ctx.fillStyle = '#FFFFFF';
  ctx.strokeStyle = '#25234A';
  ctx.lineWidth = 3;
  ctx.fillRect(70, 645, 1060, 220);
  ctx.strokeRect(70, 645, 1060, 220);

  ctx.fillStyle = '#8B5CF6';
  ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('TÓM TẮT NỘI DUNG & THÔNG ĐIỆP NHÂN VĂN', 95, 685);

  ctx.fillStyle = '#25234A';
  ctx.font = '18px "Plus Jakarta Sans", sans-serif';
  wrapText(ctx, work.mainContent, 95, 720, 1010, 26);

  ctx.fillStyle = '#6D28D9';
  ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Thông điệp cốt lõi:', 95, 805);
  ctx.fillStyle = '#25234A';
  ctx.font = 'italic 18px "Plus Jakarta Sans", sans-serif';
  wrapText(ctx, work.themeAndMessage, 275, 805, 830, 26);

  // Section 3: Iconic Golden Quotes (Trích Dẫn Vàng)
  ctx.fillStyle = '#25234A';
  ctx.fillRect(70, 890, 1060, 220);

  ctx.fillStyle = '#F5C76A';
  ctx.font = 'bold 24px "Lora", serif';
  ctx.fillText('✦ NHỮNG CÂU VĂN, CÂU THƠ ĐẮT GIÁ LÀM DẪN CHỨNG ✦', 95, 935);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'italic 20px "Lora", serif';
  const quotesToDraw = work.keyQuotes.slice(0, 3);
  let quoteY = 980;
  quotesToDraw.forEach((quote) => {
    ctx.fillText(`“${quote.slice(0, 85)}${quote.length > 85 ? '...' : ''}”`, 100, quoteY);
    quoteY += 42;
  });

  // Section 4: Mindmap Highlights (Sơ Đồ Tư Duy Phân Nhánh)
  ctx.fillStyle = '#FFFFFF';
  ctx.strokeStyle = '#25234A';
  ctx.lineWidth = 3;
  ctx.fillRect(70, 1135, 1060, 340);
  ctx.strokeRect(70, 1135, 1060, 340);

  ctx.fillStyle = '#25234A';
  ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('SƠ ĐỒ TƯ DUY KIẾN THỨC TRỌNG TÂM', 95, 1175);

  // Draw 4 mini branch cards
  const branches = work.mindmap.branches.slice(0, 4);
  const cardW = 235;
  branches.forEach((b, idx) => {
    const cardX = 95 + idx * 255;
    ctx.fillStyle = '#FFF9F0';
    ctx.fillRect(cardX, 1200, cardW, 250);
    ctx.strokeStyle = '#A78BFA';
    ctx.lineWidth = 2;
    ctx.strokeRect(cardX, 1200, cardW, 250);

    ctx.fillStyle = '#8B5CF6';
    ctx.font = 'bold 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(b.title.slice(0, 24), cardX + 12, 1230);

    ctx.fillStyle = '#25234A';
    ctx.font = '14px "Plus Jakarta Sans", sans-serif';
    let itemY = 1260;
    b.items.slice(0, 4).forEach((item) => {
      ctx.fillText(`• ${item.slice(0, 24)}`, cardX + 12, itemY);
      itemY += 26;
    });
  });

  // Bottom Footer
  ctx.fillStyle = '#25234A';
  ctx.fillRect(50, height - 100, width - 100, 50);

  ctx.fillStyle = '#F5C76A';
  ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('TRƯỜNG THPT YÊN LÃNG · LỚP 12A03-K60 · LƯU GIA LINH & NGUYỄN THỊ ÁNH SÁNG', width / 2, height - 68);

  // Convert to image blob and download
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeTitle = work.title.replace(/[^a-zA-Z0-9à-ỹÀ-Ỹ\s]/g, '').trim().replace(/\s+/g, '_');
    link.download = `VanHoc12_${safeTitle}_THPT_YenLang_12A03K60.png`;
    link.href = url;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }, 'image/png');
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(' ');
  let line = '';
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, currentY);
}
