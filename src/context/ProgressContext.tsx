import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserStats } from '../types';

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  requiredCondition: (stats: UserStats) => boolean;
}

export const ACHIEVEMENTS_LIST: AchievementItem[] = [
  {
    id: 'starter',
    title: 'Khởi Hành Tri Thức',
    description: 'Bắt đầu hành trình khám phá môn Ngữ văn 12',
    icon: '🌱',
    requiredCondition: (stats) => stats.totalPoints >= 10 || stats.studiedWorksIds.length >= 1
  },
  {
    id: 'literature_lover',
    title: 'Người Yêu Văn Học',
    description: 'Tích lũy được từ 200 điểm trở lên từ các trò chơi và bài kiểm tra',
    icon: '✨',
    requiredCondition: (stats) => stats.totalPoints >= 200
  },
  {
    id: 'knowledge_explorer',
    title: 'Nhà Khám Phá Tri Thức',
    description: 'Tích lũy được từ 500 điểm và học ít nhất 3 tác phẩm',
    icon: '🧭',
    requiredCondition: (stats) => stats.totalPoints >= 500 && stats.studiedWorksIds.length >= 3
  },
  {
    id: 'promising_writer',
    title: 'Cây Bút Triển Vọng',
    description: 'Hoàn thành ít nhất 2 bài luyện tập hoặc kiểm tra',
    icon: '✍️',
    requiredCondition: (stats) => stats.testsCompletedCount >= 2
  },
  {
    id: 'game_master',
    title: 'Chiến Binh Trò Chơi',
    description: 'Chơi và hoàn thành ít nhất 5 lượt trò chơi văn học',
    icon: '🎯',
    requiredCondition: (stats) => stats.gamesCompletedCount >= 5
  },
  {
    id: 'literature_master',
    title: 'Bậc Thầy Văn Chương',
    description: 'Tích lũy trên 1000 điểm và đạt đỉnh cao kiến thức',
    icon: '👑',
    requiredCondition: (stats) => stats.totalPoints >= 1000
  },
  {
    id: 'valedictorian',
    title: 'Thủ Khoa Văn 12',
    description: 'Vượt qua tất cả 7 nấc thang trong Vượt chướng ngại vật',
    icon: '🏆',
    requiredCondition: (stats) => stats.gameHighScores.obstacle >= 1500
  }
];

const DEFAULT_STATS: UserStats = {
  playerName: 'Sĩ tử lớp 12',
  totalPoints: 0,
  correctAnswersCount: 0,
  gamesCompletedCount: 0,
  testsCompletedCount: 0,
  studiedWorksIds: [],
  bookmarkedWorksIds: [],
  gameHighScores: {
    trivia: 0,
    author: 0,
    guessWork: 0,
    puzzle: 0,
    obstacle: 0
  },
  unlockedAchievements: ['starter']
};

interface ProgressContextType {
  stats: UserStats;
  updatePlayerName: (name: string) => void;
  addPoints: (points: number, isCorrectAnswer?: boolean) => void;
  recordGameCompletion: (gameType: keyof UserStats['gameHighScores'], score: number) => void;
  recordTestCompletion: (score: number) => void;
  toggleWorkStudied: (workId: string) => void;
  toggleWorkBookmarked: (workId: string) => void;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const STORAGE_KEY = 'vanhoc12_user_stats';

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<UserStats>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_STATS, ...parsed };
      }
    } catch {
      // fallback
    }
    return DEFAULT_STATS;
  });

  // Check achievements whenever stats change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    } catch {
      // storage unavailable
    }
  }, [stats]);

  const checkAndUnlockAchievements = (currentStats: UserStats): string[] => {
    const newlyUnlocked = [...currentStats.unlockedAchievements];
    ACHIEVEMENTS_LIST.forEach((ach) => {
      if (!newlyUnlocked.includes(ach.id) && ach.requiredCondition(currentStats)) {
        newlyUnlocked.push(ach.id);
      }
    });
    return newlyUnlocked;
  };

  const updatePlayerName = (name: string) => {
    setStats((prev) => ({ ...prev, playerName: name.trim() || 'Sĩ tử lớp 12' }));
  };

  const addPoints = (points: number, isCorrectAnswer = false) => {
    setStats((prev) => {
      const next: UserStats = {
        ...prev,
        totalPoints: prev.totalPoints + points,
        correctAnswersCount: isCorrectAnswer ? prev.correctAnswersCount + 1 : prev.correctAnswersCount
      };
      next.unlockedAchievements = checkAndUnlockAchievements(next);
      return next;
    });
  };

  const recordGameCompletion = (gameType: keyof UserStats['gameHighScores'], score: number) => {
    setStats((prev) => {
      const currentHigh = prev.gameHighScores[gameType] || 0;
      const next: UserStats = {
        ...prev,
        gamesCompletedCount: prev.gamesCompletedCount + 1,
        totalPoints: prev.totalPoints + score,
        gameHighScores: {
          ...prev.gameHighScores,
          [gameType]: Math.max(currentHigh, score)
        }
      };
      next.unlockedAchievements = checkAndUnlockAchievements(next);
      return next;
    });
  };

  const recordTestCompletion = (score: number) => {
    setStats((prev) => {
      const next: UserStats = {
        ...prev,
        testsCompletedCount: prev.testsCompletedCount + 1,
        totalPoints: prev.totalPoints + Math.round(score * 10)
      };
      next.unlockedAchievements = checkAndUnlockAchievements(next);
      return next;
    });
  };

  const toggleWorkStudied = (workId: string) => {
    setStats((prev) => {
      const exists = prev.studiedWorksIds.includes(workId);
      const updated = exists
        ? prev.studiedWorksIds.filter((id) => id !== workId)
        : [...prev.studiedWorksIds, workId];
      const next: UserStats = {
        ...prev,
        studiedWorksIds: updated,
        totalPoints: !exists ? prev.totalPoints + 30 : prev.totalPoints
      };
      next.unlockedAchievements = checkAndUnlockAchievements(next);
      return next;
    });
  };

  const toggleWorkBookmarked = (workId: string) => {
    setStats((prev) => {
      const exists = prev.bookmarkedWorksIds.includes(workId);
      const updated = exists
        ? prev.bookmarkedWorksIds.filter((id) => id !== workId)
        : [...prev.bookmarkedWorksIds, workId];
      return {
        ...prev,
        bookmarkedWorksIds: updated
      };
    });
  };

  const resetProgress = () => {
    setStats(DEFAULT_STATS);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <ProgressContext.Provider
      value={{
        stats,
        updatePlayerName,
        addPoints,
        recordGameCompletion,
        recordTestCompletion,
        toggleWorkStudied,
        toggleWorkBookmarked,
        resetProgress
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
