export interface MindmapBranch {
  title: string;
  items: string[];
}

export interface MindmapNode {
  centralTheme: string;
  branches: MindmapBranch[];
}

export interface CharacterAnalysis {
  name: string;
  role: string;
  characteristics: string[];
  significance: string;
}

export interface ExamTopicPrompt {
  topic: string;
  type: 'Nghị luận văn học' | 'Nghị luận xã hội' | 'Đọc hiểu';
  guide: {
    intro: string;
    body: string[];
    conclusion: string;
    bonusPoints?: string;
  };
}

export interface LiteraryWork {
  id: string;
  title: string;
  author: string;
  authorYears: string;
  authorBio: string;
  unit: string; // e.g. "Bài 1: Khả năng lớn lao của tiểu thuyết"
  semester: 1 | 2;
  genre: string; // e.g. "Tiểu thuyết hiện thực", "Thơ tự do", "Tùy bút"
  yearCreated: string;
  backgroundAndOrigin: string;
  mainContent: string;
  themeAndMessage: string;
  contentValue: string[];
  artisticValue: string[];
  charactersOrSymbols: CharacterAnalysis[];
  keyQuotes: string[];
  mindmap: MindmapNode;
  examPrompts: ExamTopicPrompt[];
  tags: string[];
  readingType?: 'chinh' | 'doc_mo_rong' | 'thuc_hanh_doc';
  authorImage?: string;
}

export interface KnowledgeTopic {
  id: string;
  category: 'genre' | 'reading_comprehension' | 'social_essay' | 'literary_essay' | 'methods' | 'rhetoric' | 'thpt_review';
  categoryTitle: string;
  title: string;
  summary: string;
  keyPoints: string[];
  stepsOrFormula?: string[];
  examples?: {
    prompt?: string;
    sample?: string;
    analysis?: string;
  }[];
  mindmapOverview?: {
    root: string;
    leaves: string[];
  };
}

export type GameDifficulty = 'easy' | 'medium' | 'hard';

export interface TriviaQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: GameDifficulty;
  workReference: string;
  semester?: 1 | 2;
}

export interface AuthorClueGame {
  id: string;
  workName: string;
  clues: string[];
  options: string[];
  correctAuthor: string;
  explanation: string;
  difficulty: GameDifficulty;
  semester?: 1 | 2;
}

export interface GuessWorkGame {
  id: string;
  quoteOrClue: string;
  hint: string;
  options: string[];
  correctWork: string;
  author: string;
  explanation: string;
  difficulty: GameDifficulty;
  semester?: 1 | 2;
}

export interface LiteraturePuzzle {
  id: string;
  category: 'quote' | 'concept' | 'author_work';
  scrambledWords: string[];
  originalText: string;
  hint: string;
  workReference: string;
  difficulty: GameDifficulty;
  semester?: 1 | 2;
}

export interface ObstacleQuestion {
  level: number;
  title: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  points: number;
  semester?: 1 | 2;
}

export interface ExamQuestion {
  id: string;
  question: string;
  options?: string[];
  correctIndex?: number; // For multiple-choice
  modelAnswer?: string; // For short-answer / essay
  explanation: string;
  maxScore: number;
  type: 'multiple_choice' | 'short_answer';
}

export interface ExamPractice {
  id: string;
  title: string;
  type: 'doc_hieu' | 'nghi_luan_van_hoc' | 'nghi_luan_xa_hoi' | 'kiem_tra_15p' | 'tong_hop_45p';
  typeLabel: string;
  durationMinutes: number;
  readingPassage?: {
    source: string;
    text: string;
  };
  essayPrompt?: {
    question: string;
    outline: {
      intro: string;
      body: string[];
      conclusion: string;
    };
    criteria: string[];
  };
  questions: ExamQuestion[];
  totalScore: number;
}

export interface UserStats {
  playerName: string;
  totalPoints: number;
  correctAnswersCount: number;
  gamesCompletedCount: number;
  testsCompletedCount: number;
  studiedWorksIds: string[];
  bookmarkedWorksIds: string[];
  gameHighScores: {
    trivia: number;
    author: number;
    guessWork: number;
    puzzle: number;
    obstacle: number;
  };
  unlockedAchievements: string[];
}
