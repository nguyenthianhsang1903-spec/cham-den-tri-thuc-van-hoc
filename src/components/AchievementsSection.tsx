import React, { useState } from 'react';
import { useProgress, ACHIEVEMENTS_LIST } from '../context/ProgressContext';
import {
  Trophy,
  Award,
  Sparkles,
  Zap,
  CheckCircle2,
  BookOpen,
  Gamepad2,
  Flame,
  RotateCcw,
  Edit2,
  UserCheck
} from 'lucide-react';

export const AchievementsSection: React.FC = () => {
  const { stats, updatePlayerName, resetProgress } = useProgress();

  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(stats.playerName);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    updatePlayerName(nameInput);
    setIsEditingName(false);
  };

  // Sample honor roll leaderboard
  const leaderboard = [
    { rank: 1, name: 'Lưu Gia Linh', points: 1980, badge: 'Thủ khoa Văn 12 · 12A03-K60' },
    { rank: 2, name: 'Nguyễn Thị Ánh Sáng', points: 1950, badge: 'Thủ khoa Văn 12 · 12A03-K60' },
    { rank: 3, name: 'Trần Minh Quân', points: 1420, badge: 'Bậc thầy văn chương' },
    { rank: 4, name: stats.playerName, points: Math.max(stats.totalPoints, 750), badge: 'Nhà khám phá tri thức', isCurrent: true },
    { rank: 5, name: 'Lê Hoàng Yến Nhi', points: 680, badge: 'Người yêu văn học' },
    { rank: 6, name: 'Phạm Đức Anh', points: 540, badge: 'Người yêu văn học' },
  ].sort((a, b) => b.points - a.points);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5C76A]/20 text-[#25234A] text-xs sm:text-sm font-bold">
          <Trophy className="w-4 h-4 text-[#D97706]" />
          <span>Trường THPT Yên Lãng · Lớp 12A03-K60 · Bảng vàng danh dự</span>
        </div>
        <h1 className="font-serif-literary text-3xl sm:text-4xl font-bold text-[#25234A]">
          Bảng vinh danh & Tiến trình học tập
        </h1>
        <p className="text-base text-[#25234A]/80 leading-relaxed font-medium">
          Ghi nhận toàn bộ điểm số, số câu trả lời chính xác, video bài học và danh hiệu đạt được của học sinh trong hành trình chinh phục Ngữ văn 12.
        </p>
      </div>

      {/* User Profile Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#25234A]/10 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#25234A]/10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#A78BFA]/20 border border-[#8B5CF6]/30 flex items-center justify-center text-2xl shadow-inner">
              🎓
            </div>
            <div>
              {isEditingName ? (
                <form onSubmit={handleSaveName} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="px-3 py-1 text-sm rounded-lg border border-[#8B5CF6] font-semibold text-[#25234A] focus:outline-none"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-3 py-1 rounded-lg bg-[#25234A] text-white text-xs font-semibold"
                  >
                    Lưu
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingName(false)}
                    className="text-xs text-[#25234A]/60"
                  >
                    Hủy
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-2">
                  <h3 className="font-serif-literary text-xl sm:text-2xl font-bold text-[#25234A]">
                    {stats.playerName}
                  </h3>
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="p-1 text-[#25234A]/40 hover:text-[#25234A] transition-colors"
                    title="Đổi tên hiển thị"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
              <p className="text-xs text-[#25234A]/70 flex items-center gap-1.5 mt-0.5">
                <Sparkles className="w-3.5 h-3.5 text-[#F5C76A]" />
                <span>
                  Danh hiệu cao nhất:{' '}
                  <strong className="text-[#8B5CF6]">
                    {stats.totalPoints >= 1000
                      ? 'Bậc thầy văn chương'
                      : stats.totalPoints >= 500
                      ? 'Nhà khám phá tri thức'
                      : stats.totalPoints >= 200
                      ? 'Người yêu văn học'
                      : 'Người mới khởi hành'}
                  </strong>
                </span>
              </p>
            </div>
          </div>

          {/* Reset progress toggle */}
          <div>
            {!showResetConfirm ? (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="text-xs text-[#25234A]/50 hover:text-rose-600 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Đặt lại tiến trình</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 p-2 rounded-xl bg-rose-50 border border-rose-200 text-xs">
                <span className="text-rose-800">Bạn chắc chắn muốn xóa điểm?</span>
                <button
                  onClick={() => {
                    resetProgress();
                    setShowResetConfirm(false);
                  }}
                  className="px-2 py-1 rounded bg-rose-600 text-white font-semibold"
                >
                  Xác nhận
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-2 py-1 text-slate-600"
                >
                  Hủy
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 4 Stat Highlights */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-[#FFF9F0] border border-[#25234A]/10">
            <div className="flex items-center gap-2 text-xs text-[#25234A]/60">
              <Zap className="w-4 h-4 text-[#F5C76A]" />
              <span>Tổng điểm tích lũy</span>
            </div>
            <p className="text-2xl font-bold font-serif-literary text-[#25234A] mt-1">
              {stats.totalPoints}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF9F0] border border-[#25234A]/10">
            <div className="flex items-center gap-2 text-xs text-[#25234A]/60">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Số câu trả lời đúng</span>
            </div>
            <p className="text-2xl font-bold font-serif-literary text-[#25234A] mt-1">
              {stats.correctAnswersCount}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF9F0] border border-[#25234A]/10">
            <div className="flex items-center gap-2 text-xs text-[#25234A]/60">
              <Gamepad2 className="w-4 h-4 text-[#8B5CF6]" />
              <span>Trò chơi hoàn thành</span>
            </div>
            <p className="text-2xl font-bold font-serif-literary text-[#25234A] mt-1">
              {stats.gamesCompletedCount}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF9F0] border border-[#25234A]/10">
            <div className="flex items-center gap-2 text-xs text-[#25234A]/60">
              <BookOpen className="w-4 h-4 text-[#D97706]" />
              <span>Tác phẩm đã học</span>
            </div>
            <p className="text-2xl font-bold font-serif-literary text-[#25234A] mt-1">
              {stats.studiedWorksIds.length}
            </p>
          </div>
        </div>
      </div>

      {/* Achievements Badges Grid */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#25234A]/10 shadow-lg space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif-literary text-xl sm:text-2xl font-bold text-[#25234A]">
              Huy hiệu danh dự đạt được
            </h3>
            <p className="text-xs text-[#25234A]/70 mt-0.5">
              Mở khóa các danh hiệu khi tích lũy điểm và vượt qua các thử thách văn học
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#A78BFA]/20 text-[#25234A]">
            {stats.unlockedAchievements.length} / {ACHIEVEMENTS_LIST.length} Đã mở
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ACHIEVEMENTS_LIST.map((ach) => {
            const isUnlocked = stats.unlockedAchievements.includes(ach.id);
            return (
              <div
                key={ach.id}
                className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                  isUnlocked
                    ? 'border-[#8B5CF6]/40 bg-[#FFF9F0] shadow-xs'
                    : 'border-[#25234A]/10 bg-slate-50/50 opacity-50 grayscale'
                }`}
              >
                <div className="text-3xl p-2 rounded-xl bg-white border border-[#25234A]/10 shrink-0">
                  {ach.icon}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif-literary text-sm font-bold text-[#25234A]">
                      {ach.title}
                    </h4>
                    {isUnlocked && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                        Đạt được
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#25234A]/70 leading-relaxed">
                    {ach.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Leaderboard Honor Roll */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#25234A]/10 shadow-lg space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif-literary text-xl sm:text-2xl font-bold text-[#25234A]">
              Bảng vàng danh dự học tập
            </h3>
            <p className="text-xs text-[#25234A]/70 mt-0.5">
              Xếp hạng thi đua giữa các học sinh toàn quốc tham gia rèn luyện
            </p>
          </div>
          <div className="flex items-center gap-1 text-xs text-[#8B5CF6] font-semibold">
            <Award className="w-4 h-4" />
            <span>Năm học 2026–2027 · THPT Yên Lãng</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#25234A]/10 text-xs text-[#25234A]/60 font-semibold uppercase tracking-wider">
                <th className="pb-3 px-3">Hạng</th>
                <th className="pb-3 px-3">Học sinh</th>
                <th className="pb-3 px-3">Danh hiệu</th>
                <th className="pb-3 px-3 text-right">Tổng điểm</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#25234A]/5">
              {leaderboard.map((item, idx) => (
                <tr
                  key={idx}
                  className={`transition-colors ${
                    item.isCurrent
                      ? 'bg-[#A78BFA]/15 font-bold text-[#25234A]'
                      : 'hover:bg-[#FFF9F0]/50 text-[#25234A]/80'
                  }`}
                >
                  <td className="py-3 px-3">
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                  </td>
                  <td className="py-3 px-3 flex items-center gap-2">
                    <span>{item.name}</span>
                    {item.isCurrent && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#25234A] text-white">
                        Bạn
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-xs text-[#8B5CF6] font-medium">
                    {item.badge}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-[#25234A]">
                    {item.points} đ
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
