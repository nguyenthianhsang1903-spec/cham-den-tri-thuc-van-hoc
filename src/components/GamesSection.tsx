import React, { useState, useEffect, useCallback, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  TRIVIA_QUESTIONS,
  AUTHOR_GAMES,
  GUESS_WORK_GAMES,
  LITERATURE_PUZZLES,
  OBSTACLE_QUESTIONS
} from '../data/gamesData';
import { useProgress } from '../context/ProgressContext';
import { soundEngine } from '../utils/audioAmbience';
import {
  Gamepad2,
  Trophy,
  Timer,
  CheckCircle,
  XCircle,
  RotateCcw,
  Sparkles,
  Award,
  Zap,
  ArrowRight,
  Flame,
  HelpCircle,
  Check,
  BookOpen,
  Filter
} from 'lucide-react';

type GameMode = 'trivia' | 'author' | 'guessWork' | 'puzzle' | 'obstacle';

export const GamesSection: React.FC = () => {
  const { addPoints, recordGameCompletion, stats } = useProgress();

  const [activeGame, setActiveGame] = useState<GameMode>('trivia');
  const [selectedSemester, setSelectedSemester] = useState<'all' | 1 | 2>('all');

  // Shared Game State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(35);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Puzzle specific state
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [puzzlePool, setPuzzlePool] = useState<string[]>([]);
  const [puzzleResult, setPuzzleResult] = useState<'correct' | 'wrong' | null>(null);

  // Filtered lists based on semester
  const filteredTrivia = useMemo(() => {
    return selectedSemester === 'all'
      ? TRIVIA_QUESTIONS
      : TRIVIA_QUESTIONS.filter((q) => q.semester === selectedSemester);
  }, [selectedSemester]);

  const filteredAuthor = useMemo(() => {
    return selectedSemester === 'all'
      ? AUTHOR_GAMES
      : AUTHOR_GAMES.filter((q) => q.semester === selectedSemester);
  }, [selectedSemester]);

  const filteredGuess = useMemo(() => {
    return selectedSemester === 'all'
      ? GUESS_WORK_GAMES
      : GUESS_WORK_GAMES.filter((q) => q.semester === selectedSemester);
  }, [selectedSemester]);

  const filteredPuzzle = useMemo(() => {
    return selectedSemester === 'all'
      ? LITERATURE_PUZZLES
      : LITERATURE_PUZZLES.filter((q) => q.semester === selectedSemester);
  }, [selectedSemester]);

  const filteredObstacle = useMemo(() => {
    return selectedSemester === 'all'
      ? OBSTACLE_QUESTIONS
      : OBSTACLE_QUESTIONS.filter((q) => q.semester === selectedSemester);
  }, [selectedSemester]);

  // Active question list according to current game
  const currentListLength = useMemo(() => {
    switch (activeGame) {
      case 'trivia': return filteredTrivia.length;
      case 'author': return filteredAuthor.length;
      case 'guessWork': return filteredGuess.length;
      case 'puzzle': return filteredPuzzle.length;
      case 'obstacle': return filteredObstacle.length;
    }
  }, [activeGame, filteredTrivia, filteredAuthor, filteredGuess, filteredPuzzle, filteredObstacle]);

  // Fire celebratory confetti
  const triggerConfetti = useCallback(() => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 }
    });
  }, []);

  // Initialize Puzzle Pool when current puzzle or semester changes
  useEffect(() => {
    if (activeGame === 'puzzle' && filteredPuzzle[currentIndex]) {
      setPuzzlePool([...filteredPuzzle[currentIndex].scrambledWords]);
      setSelectedWords([]);
      setPuzzleResult(null);
    }
  }, [activeGame, currentIndex, filteredPuzzle]);

  // Reset state when changing semester or game mode
  const resetGame = useCallback(() => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setIsGameOver(false);
    setTimeLeft(activeGame === 'obstacle' ? 40 : 35);
    setIsTimerRunning(true);
    setSelectedWords([]);
    setPuzzleResult(null);
  }, [activeGame]);

  useEffect(() => {
    resetGame();
  }, [selectedSemester, resetGame]);

  const handleSelectGame = (mode: GameMode) => {
    setActiveGame(mode);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setIsGameOver(false);
    setTimeLeft(mode === 'obstacle' ? 40 : 35);
    setIsTimerRunning(true);
    setSelectedWords([]);
    setPuzzleResult(null);
  };

  // Timer countdown
  useEffect(() => {
    if (!isTimerRunning || isGameOver || isAnswered) return;

    if (timeLeft <= 0) {
      setIsAnswered(true);
      setStreak(0);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isTimerRunning, isGameOver, isAnswered]);

  // Answering regular multiple choice questions
  const handleAnswerOption = (index: number) => {
    if (isAnswered) return;

    setSelectedOption(index);
    setIsAnswered(true);
    setIsTimerRunning(false);

    let isCorrect = false;
    let pointAward = 50;

    if (activeGame === 'trivia') {
      const q = filteredTrivia[currentIndex];
      if (q) {
        isCorrect = index === q.correctIndex;
        pointAward = q.difficulty === 'hard' ? 80 : q.difficulty === 'medium' ? 50 : 35;
      }
    } else if (activeGame === 'author') {
      const q = filteredAuthor[currentIndex];
      if (q) {
        isCorrect = q.options[index] === q.correctAuthor;
        pointAward = 50;
      }
    } else if (activeGame === 'guessWork') {
      const q = filteredGuess[currentIndex];
      if (q) {
        isCorrect = q.options[index] === q.correctWork;
        pointAward = 50;
      }
    } else if (activeGame === 'obstacle') {
      const q = filteredObstacle[currentIndex];
      if (q) {
        isCorrect = index === q.correctIndex;
        pointAward = q.points;
      }
    }

    if (isCorrect) {
      soundEngine.playChime();
      const comboBonus = streak * 15;
      const totalEarned = pointAward + comboBonus;
      setScore((prev) => prev + totalEarned);
      setStreak((prev) => prev + 1);
      addPoints(totalEarned, true);
      triggerConfetti();
    } else {
      setStreak(0);
    }
  };

  // Next Question
  const handleNextQuestion = () => {
    if (currentIndex + 1 >= currentListLength) {
      setIsGameOver(true);
      recordGameCompletion(activeGame, score);
      triggerConfetti();
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(activeGame === 'obstacle' ? 40 : 35);
      setIsTimerRunning(true);
    }
  };

  // Jump to question
  const handleJumpQuestion = (qIndex: number) => {
    setCurrentIndex(qIndex);
    setSelectedOption(null);
    setIsAnswered(false);
    setTimeLeft(activeGame === 'obstacle' ? 40 : 35);
    setIsTimerRunning(true);
  };

  // Puzzle Actions
  const handlePickWord = (word: string, poolIndex: number) => {
    if (puzzleResult) return;
    const newPool = [...puzzlePool];
    newPool.splice(poolIndex, 1);
    setPuzzlePool(newPool);
    setSelectedWords([...selectedWords, word]);
  };

  const handleRemoveWord = (word: string, selectedIndex: number) => {
    if (puzzleResult) return;
    const newSelected = [...selectedWords];
    newSelected.splice(selectedIndex, 1);
    setSelectedWords(newSelected);
    setPuzzlePool([...puzzlePool, word]);
  };

  const handleCheckPuzzle = () => {
    const curPuzzle = filteredPuzzle[currentIndex];
    if (!curPuzzle) return;
    const userSentence = selectedWords.join(' ').trim().toLowerCase();
    const targetSentence = curPuzzle.originalText.trim().toLowerCase();

    if (userSentence === targetSentence) {
      soundEngine.playChime();
      setPuzzleResult('correct');
      const pointAward = 75 + streak * 15;
      setScore((prev) => prev + pointAward);
      setStreak((prev) => prev + 1);
      addPoints(pointAward, true);
      triggerConfetti();
    } else {
      setPuzzleResult('wrong');
      setStreak(0);
    }
  };

  const currentTrivia = filteredTrivia[currentIndex];
  const currentAuthor = filteredAuthor[currentIndex];
  const currentGuess = filteredGuess[currentIndex];
  const currentPuzzle = filteredPuzzle[currentIndex];
  const currentObstacle = filteredObstacle[currentIndex];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#A78BFA]/20 text-[#25234A] text-sm font-bold tracking-wide">
          <Gamepad2 className="w-5 h-5 text-[#8B5CF6]" />
          <span>Đấu trường trò chơi Ngữ văn 12 · Chuẩn SGK Kết nối tri thức</span>
        </div>
        <h1 className="font-serif-literary text-3xl sm:text-4xl lg:text-5xl font-bold text-[#25234A] tracking-tight">
          Góc trò chơi trí tuệ & tương tác
        </h1>
        <p className="text-base sm:text-lg text-[#25234A]/80 leading-relaxed font-medium">
          Thiết kế chữ to rõ ràng, độ tương phản cao, phân chia nội dung rõ rệt theo <strong>Học kì I (Tập 1)</strong> và <strong>Học kì II (Tập 2)</strong>.
        </p>
      </div>

      {/* SEMESTER FILTER BAR */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#25234A]/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Filter className="w-5 h-5 text-[#8B5CF6]" />
          <span className="text-sm font-bold uppercase tracking-wider text-[#25234A]">
            Lọc theo kỳ học:
          </span>
        </div>
        <div className="inline-flex p-1.5 rounded-2xl bg-[#25234A]/5 gap-1.5 w-full sm:w-auto">
          <button
            onClick={() => setSelectedSemester('all')}
            className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-sm sm:text-base font-bold transition-all cursor-pointer ${
              selectedSemester === 'all'
                ? 'bg-[#25234A] text-white shadow-md'
                : 'text-[#25234A]/70 hover:text-[#25234A] hover:bg-white/60'
            }`}
          >
            Tất cả các kì (Toàn khóa)
          </button>
          <button
            onClick={() => setSelectedSemester(1)}
            className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-sm sm:text-base font-bold transition-all cursor-pointer ${
              selectedSemester === 1
                ? 'bg-[#8B5CF6] text-white shadow-md'
                : 'text-[#25234A]/70 hover:text-[#25234A] hover:bg-white/60'
            }`}
          >
            Học kì I (Tập 1 · Bài 1 - 5)
          </button>
          <button
            onClick={() => setSelectedSemester(2)}
            className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-sm sm:text-base font-bold transition-all cursor-pointer ${
              selectedSemester === 2
                ? 'bg-[#D97706] text-white shadow-md'
                : 'text-[#25234A]/70 hover:text-[#25234A] hover:bg-white/60'
            }`}
          >
            Học kì II (Tập 2 · Bài 6 - 9)
          </button>
        </div>
      </div>

      {/* Game Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-2 rounded-3xl bg-[#25234A]/5 border border-[#25234A]/10">
        {[
          { id: 'trivia', label: '1. Thử tài hiểu biết', count: `${filteredTrivia.length} câu`, desc: 'Trắc nghiệm 4 đáp án' },
          { id: 'author', label: '2. Ai là tác giả?', count: `${filteredAuthor.length} câu`, desc: 'Giải mã danh tính' },
          { id: 'guessWork', label: '3. Đoán tác phẩm', count: `${filteredGuess.length} câu`, desc: 'Truy tìm trích dẫn' },
          { id: 'puzzle', label: '4. Mảnh ghép văn học', count: `${filteredPuzzle.length} câu`, desc: 'Ghép từ thành câu thơ' },
          { id: 'obstacle', label: '5. Chướng ngại vật', count: `${filteredObstacle.length} ải`, desc: 'Leo dốc điểm cao' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleSelectGame(tab.id as GameMode)}
            className={`p-4 rounded-2xl text-left transition-all cursor-pointer ${
              activeGame === tab.id
                ? 'bg-white text-[#25234A] shadow-md border-2 border-[#8B5CF6] ring-2 ring-[#8B5CF6]/20'
                : 'text-[#25234A]/70 hover:bg-white/80 hover:text-[#25234A]'
            }`}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm sm:text-base font-bold leading-tight">{tab.label}</p>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#A78BFA]/20 text-[#6D28D9]">
                {tab.count}
              </span>
            </div>
            <p className="text-xs text-[#25234A]/60 mt-1 font-medium">{tab.desc}</p>
          </button>
        ))}
      </div>

      {/* Main Game Arena Box */}
      <div className="bg-white rounded-3xl border border-[#25234A]/15 shadow-xl p-6 sm:p-10 space-y-8">
        {/* Top Arena Dashboard: Level, Timer, Score, Streak */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#25234A]/10">
          <div className="flex items-center gap-3">
            <span className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#6D28D9] px-4 py-2 rounded-xl bg-[#A78BFA]/20 border border-[#A78BFA]/30">
              Câu {currentIndex + 1} / {currentListLength}
            </span>

            {/* Streak indicator */}
            {streak > 1 && (
              <span className="flex items-center gap-1.5 text-sm font-bold text-amber-900 bg-amber-100 px-3.5 py-2 rounded-xl shadow-xs animate-bounce border border-amber-300">
                <Flame className="w-5 h-5 text-amber-600 fill-amber-500" />
                <span>Combo x{streak} (+{streak * 15}đ)</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-base font-bold">
            {/* Countdown Timer */}
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl border text-base font-bold ${
                timeLeft <= 7
                  ? 'border-rose-400 bg-rose-50 text-rose-700 animate-pulse'
                  : 'border-[#25234A]/15 bg-[#FFF9F0] text-[#25234A]'
              }`}
            >
              <Timer className="w-5 h-5 text-[#8B5CF6]" />
              <span>{timeLeft}s</span>
            </div>

            {/* Current Game Score */}
            <div className="flex items-center gap-2 px-5 py-2 rounded-2xl bg-[#25234A] text-white text-base">
              <Zap className="w-5 h-5 text-[#F5C76A]" />
              <span>{score} điểm</span>
            </div>
          </div>
        </div>

        {/* Question jumper buttons bar */}
        {currentListLength > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {Array.from({ length: currentListLength }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleJumpQuestion(idx)}
                className={`w-9 h-9 rounded-xl text-sm font-bold transition-all shrink-0 cursor-pointer ${
                  currentIndex === idx
                    ? 'bg-[#8B5CF6] text-white ring-2 ring-[#8B5CF6]/40 shadow-sm'
                    : 'bg-[#FFF9F0] text-[#25234A] hover:bg-[#A78BFA]/30 border border-[#25234A]/15'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        )}

        {/* Progress bar */}
        <div className="w-full bg-[#25234A]/10 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#F5C76A] h-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / Math.max(currentListLength, 1)) * 100}%` }}
          />
        </div>

        {/* GAME CONTENT: If not Game Over */}
        {!isGameOver ? (
          <div className="space-y-8 pt-2">
            {/* 1. THỬ TÀI HIỂU BIẾT */}
            {activeGame === 'trivia' && currentTrivia && (
              <div className="space-y-7">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-[#8B5CF6] uppercase tracking-wider px-3 py-1 rounded-lg bg-[#A78BFA]/15">
                      Tác phẩm: {currentTrivia.workReference}
                    </span>
                    <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-lg">
                      Học kì {currentTrivia.semester}
                    </span>
                  </div>
                  <h3 className="font-serif-literary text-2xl sm:text-3xl lg:text-4xl font-bold text-[#25234A] leading-snug">
                    {currentTrivia.question}
                  </h3>
                </div>

                {/* 4 Options with high contrast & large text */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentTrivia.options.map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === currentTrivia.correctIndex;
                    let btnStyle = 'border-2 border-[#25234A]/15 bg-[#FFF9F0]/70 text-[#25234A] hover:border-[#8B5CF6] hover:bg-white shadow-xs';

                    if (isAnswered) {
                      if (isCorrect) {
                        btnStyle = 'border-2 border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-4 ring-emerald-500/20';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'border-2 border-rose-500 bg-rose-50 text-rose-950 font-medium';
                      } else {
                        btnStyle = 'border-2 border-[#25234A]/10 bg-white/40 text-[#25234A]/40 opacity-40';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isAnswered}
                        onClick={() => handleAnswerOption(idx)}
                        className={`p-5 sm:p-6 rounded-2xl text-left text-lg sm:text-xl transition-all flex items-start gap-4 cursor-pointer leading-relaxed ${btnStyle}`}
                      >
                        <span className="w-9 h-9 rounded-full bg-[#8B5CF6]/15 text-[#6D28D9] font-bold text-base flex items-center justify-center shrink-0 mt-0.5 border border-[#8B5CF6]/30">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="font-semibold">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Card */}
                {isAnswered && (
                  <div className="p-6 sm:p-7 rounded-2xl bg-[#FFF9F0] border-2 border-[#25234A]/15 space-y-4 animate-in fade-in duration-200">
                    <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold">
                      {selectedOption === currentTrivia.correctIndex ? (
                        <>
                          <CheckCircle className="w-6 h-6 text-emerald-600" />
                          <span className="text-emerald-800">Chính xác tuyệt vời! Bạn nhận được điểm thưởng!</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-6 h-6 text-rose-600" />
                          <span className="text-rose-800">Chưa chính xác! Xem kiến thức trọng tâm bên dưới:</span>
                        </>
                      )}
                    </div>
                    <p className="text-base sm:text-lg text-[#25234A] leading-relaxed font-medium pl-8 border-l-4 border-[#8B5CF6]">
                      {currentTrivia.explanation}
                    </p>
                    <div className="pt-2 pl-8">
                      <button
                        onClick={handleNextQuestion}
                        className="px-7 py-3.5 rounded-xl bg-[#25234A] text-white text-base font-bold hover:bg-[#8B5CF6] transition-colors flex items-center gap-2.5 cursor-pointer shadow-md"
                      >
                        <span>Câu tiếp theo ({currentIndex + 2}/{currentListLength})</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 2. AI LÀ TÁC GIẢ? */}
            {activeGame === 'author' && currentAuthor && (
              <div className="space-y-7">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-[#8B5CF6] uppercase tracking-wider px-3 py-1 rounded-lg bg-[#A78BFA]/15">
                      Tác phẩm gợi ý: {currentAuthor.workName}
                    </span>
                    <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-lg">
                      Học kì {currentAuthor.semester}
                    </span>
                  </div>
                  <h3 className="font-serif-literary text-2xl sm:text-3xl lg:text-4xl font-bold text-[#25234A]">
                    Ai là tác giả của tác phẩm trên?
                  </h3>
                </div>

                {/* Clues Card */}
                <div className="p-6 sm:p-7 rounded-2xl bg-[#FFF9F0] border-2 border-[#25234A]/15 space-y-3">
                  <p className="text-sm font-bold uppercase tracking-wider text-[#D97706] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D97706]" />
                    <span>Manh mối nhận diện chân dung tác gia:</span>
                  </p>
                  <ul className="space-y-2.5 text-base sm:text-lg text-[#25234A]">
                    {currentAuthor.clues.map((clue, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-3">
                        <span className="text-[#8B5CF6] font-bold text-xl leading-none mt-0.5">✦</span>
                        <span className="leading-relaxed font-medium">{clue}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentAuthor.options.map((authorName, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = authorName === currentAuthor.correctAuthor;
                    let btnStyle = 'border-2 border-[#25234A]/15 bg-[#FFF9F0]/70 text-[#25234A] hover:border-[#8B5CF6] hover:bg-white shadow-xs';

                    if (isAnswered) {
                      if (isCorrect) {
                        btnStyle = 'border-2 border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-4 ring-emerald-500/20';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'border-2 border-rose-500 bg-rose-50 text-rose-950 font-medium';
                      } else {
                        btnStyle = 'border-2 border-[#25234A]/10 bg-white/40 text-[#25234A]/40 opacity-40';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isAnswered}
                        onClick={() => handleAnswerOption(idx)}
                        className={`p-5 sm:p-6 rounded-2xl text-left text-lg sm:text-xl transition-all flex items-center gap-4 cursor-pointer font-bold ${btnStyle}`}
                      >
                        <span className="w-9 h-9 rounded-full bg-[#8B5CF6]/15 text-[#6D28D9] font-bold text-base flex items-center justify-center shrink-0 border border-[#8B5CF6]/30">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{authorName}</span>
                      </button>
                    );
                  })}
                </div>

                {isAnswered && (
                  <div className="p-6 sm:p-7 rounded-2xl bg-[#FFF9F0] border-2 border-[#25234A]/15 space-y-4 animate-in fade-in duration-200">
                    <p className="text-base sm:text-lg text-[#25234A] leading-relaxed font-medium pl-8 border-l-4 border-[#8B5CF6]">
                      {currentAuthor.explanation}
                    </p>
                    <div className="pl-8">
                      <button
                        onClick={handleNextQuestion}
                        className="px-7 py-3.5 rounded-xl bg-[#25234A] text-white text-base font-bold hover:bg-[#8B5CF6] transition-colors flex items-center gap-2.5 cursor-pointer shadow-md"
                      >
                        <span>Câu tiếp theo</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. ĐOÁN TÊN TÁC PHẨM */}
            {activeGame === 'guessWork' && currentGuess && (
              <div className="space-y-7">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-[#8B5CF6] uppercase tracking-wider px-3 py-1 rounded-lg bg-[#A78BFA]/15">
                      Tác giả sáng tác: {currentGuess.author}
                    </span>
                    <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-lg">
                      Học kì {currentGuess.semester}
                    </span>
                  </div>
                  <h3 className="font-serif-literary text-2xl sm:text-3xl lg:text-4xl font-bold text-[#25234A]">
                    Đoạn trích dưới đây thuộc tác phẩm nào?
                  </h3>
                </div>

                <div className="p-6 sm:p-8 rounded-2xl bg-[#25234A] text-white space-y-4 shadow-lg">
                  <p className="font-serif-literary italic text-lg sm:text-2xl leading-relaxed text-[#FFF9F0]">
                    {currentGuess.quoteOrClue}
                  </p>
                  <p className="text-sm sm:text-base text-[#F5C76A] pt-2 font-semibold border-t border-white/10">
                    💡 Gợi ý văn học: {currentGuess.hint}
                  </p>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentGuess.options.map((workName, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = workName === currentGuess.correctWork;
                    let btnStyle = 'border-2 border-[#25234A]/15 bg-[#FFF9F0]/70 text-[#25234A] hover:border-[#8B5CF6] hover:bg-white shadow-xs';

                    if (isAnswered) {
                      if (isCorrect) {
                        btnStyle = 'border-2 border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-4 ring-emerald-500/20';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'border-2 border-rose-500 bg-rose-50 text-rose-950 font-medium';
                      } else {
                        btnStyle = 'border-2 border-[#25234A]/10 bg-white/40 text-[#25234A]/40 opacity-40';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isAnswered}
                        onClick={() => handleAnswerOption(idx)}
                        className={`p-5 sm:p-6 rounded-2xl text-left text-lg sm:text-xl transition-all flex items-center gap-4 cursor-pointer font-bold ${btnStyle}`}
                      >
                        <span className="w-9 h-9 rounded-full bg-[#8B5CF6]/15 text-[#6D28D9] font-bold text-base flex items-center justify-center shrink-0 border border-[#8B5CF6]/30">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{workName}</span>
                      </button>
                    );
                  })}
                </div>

                {isAnswered && (
                  <div className="p-6 sm:p-7 rounded-2xl bg-[#FFF9F0] border-2 border-[#25234A]/15 space-y-4 animate-in fade-in duration-200">
                    <p className="text-base sm:text-lg text-[#25234A] leading-relaxed font-medium pl-8 border-l-4 border-[#8B5CF6]">
                      {currentGuess.explanation}
                    </p>
                    <div className="pl-8">
                      <button
                        onClick={handleNextQuestion}
                        className="px-7 py-3.5 rounded-xl bg-[#25234A] text-white text-base font-bold hover:bg-[#8B5CF6] transition-colors flex items-center gap-2.5 cursor-pointer shadow-md"
                      >
                        <span>Câu tiếp theo</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 4. MẢNH GHÉP VĂN HỌC (ANAGRAM / UNSCRAMBLE) */}
            {activeGame === 'puzzle' && currentPuzzle && (
              <div className="space-y-7">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-[#8B5CF6] uppercase tracking-wider px-3 py-1 rounded-lg bg-[#A78BFA]/15">
                      Tác phẩm: {currentPuzzle.workReference}
                    </span>
                    <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-lg">
                      Học kì {currentPuzzle.semester}
                    </span>
                  </div>
                  <h3 className="font-serif-literary text-2xl sm:text-3xl lg:text-4xl font-bold text-[#25234A]">
                    Sắp xếp các từ bị xáo trộn để tạo thành câu hoàn chỉnh
                  </h3>
                  <p className="text-base text-[#25234A]/80 font-medium">Gợi ý: {currentPuzzle.hint}</p>
                </div>

                {/* Target Sentence Drop Area */}
                <div className="min-h-28 p-6 rounded-2xl border-2 border-dashed border-[#8B5CF6] bg-[#FFF9F0] flex flex-wrap items-center gap-3">
                  {selectedWords.length === 0 ? (
                    <span className="text-base text-[#25234A]/60 italic font-medium">
                      Nhấn vào các từ bên dưới để ghép vào đây theo thứ tự chính xác...
                    </span>
                  ) : (
                    selectedWords.map((word, wIdx) => (
                      <button
                        key={wIdx}
                        onClick={() => handleRemoveWord(word, wIdx)}
                        className="px-5 py-3 rounded-xl bg-[#25234A] text-white text-base sm:text-lg font-bold hover:bg-rose-600 transition-colors cursor-pointer shadow-sm flex items-center gap-2"
                        title="Bấm để trả về ngân hàng từ"
                      >
                        <span>{word}</span>
                        <span className="text-xs text-rose-300">✕</span>
                      </button>
                    ))
                  )}
                </div>

                {/* Word Pool Area */}
                <div className="space-y-3">
                  <p className="text-sm font-bold uppercase tracking-wider text-[#25234A]">
                    Ngân hàng từ sẵn có (nhấn để chọn):
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    {puzzlePool.map((word, pIdx) => (
                      <button
                        key={pIdx}
                        onClick={() => handlePickWord(word, pIdx)}
                        className="px-5 py-3 rounded-2xl bg-white border-2 border-[#25234A]/20 hover:border-[#8B5CF6] hover:bg-[#A78BFA]/10 text-base sm:text-lg font-bold text-[#25234A] transition-all cursor-pointer shadow-xs"
                      >
                        {word}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4 pt-2">
                  <button
                    disabled={selectedWords.length === 0 || puzzleResult !== null}
                    onClick={handleCheckPuzzle}
                    className="px-7 py-3.5 rounded-xl bg-[#25234A] text-white text-base font-bold hover:bg-[#8B5CF6] transition-colors disabled:opacity-50 cursor-pointer shadow-md"
                  >
                    Kiểm tra kết quả
                  </button>

                  <button
                    onClick={() => {
                      setPuzzlePool([...currentPuzzle.scrambledWords]);
                      setSelectedWords([]);
                      setPuzzleResult(null);
                    }}
                    className="px-5 py-3.5 rounded-xl bg-white border border-[#25234A]/20 text-sm font-bold text-[#25234A] hover:bg-[#25234A]/5 transition-colors cursor-pointer"
                  >
                    Làm lại
                  </button>
                </div>

                {/* Puzzle Result feedback */}
                {puzzleResult && (
                  <div className="p-6 sm:p-7 rounded-2xl bg-[#FFF9F0] border-2 border-[#25234A]/15 space-y-3 animate-in fade-in duration-200">
                    <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold">
                      {puzzleResult === 'correct' ? (
                        <>
                          <CheckCircle className="w-6 h-6 text-emerald-600" />
                          <span className="text-emerald-800">Ghép câu hoàn toàn chính xác! Xuất sắc!</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-6 h-6 text-rose-600" />
                          <span className="text-rose-800">Thứ tự chưa chuẩn. Hãy thử làm lại hoặc xem đáp án gốc:</span>
                        </>
                      )}
                    </div>
                    <p className="text-base sm:text-lg text-[#25234A] leading-relaxed font-serif-literary italic pl-8 border-l-4 border-[#8B5CF6]">
                      "{currentPuzzle.originalText}"
                    </p>
                    <div className="pl-8 pt-2">
                      <button
                        onClick={handleNextQuestion}
                        className="px-7 py-3.5 rounded-xl bg-[#25234A] text-white text-base font-bold hover:bg-[#8B5CF6] transition-colors flex items-center gap-2.5 cursor-pointer shadow-md"
                      >
                        <span>Câu tiếp theo</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 5. VƯỢT CHƯỚNG NGẠI VẬT */}
            {activeGame === 'obstacle' && currentObstacle && (
              <div className="space-y-7">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider px-3.5 py-1 rounded-lg bg-[#25234A]">
                      Ải {currentObstacle.level} / 10
                    </span>
                    <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-lg">
                      +{currentObstacle.points} điểm
                    </span>
                    <span className="text-xs font-bold text-[#6D28D9] bg-[#A78BFA]/20 px-3 py-1 rounded-lg">
                      Học kì {currentObstacle.semester}
                    </span>
                  </div>
                  <h3 className="font-serif-literary text-2xl sm:text-3xl lg:text-4xl font-bold text-[#25234A]">
                    {currentObstacle.title}
                  </h3>
                  <p className="text-lg sm:text-xl text-[#25234A] leading-relaxed font-semibold mt-2">
                    {currentObstacle.question}
                  </p>
                </div>

                {/* Options */}
                <div className="space-y-3.5">
                  {currentObstacle.options.map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === currentObstacle.correctIndex;
                    let btnStyle = 'border-2 border-[#25234A]/15 bg-[#FFF9F0]/70 text-[#25234A] hover:border-[#8B5CF6] hover:bg-white shadow-xs';

                    if (isAnswered) {
                      if (isCorrect) {
                        btnStyle = 'border-2 border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-4 ring-emerald-500/20';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'border-2 border-rose-500 bg-rose-50 text-rose-950 font-medium';
                      } else {
                        btnStyle = 'border-2 border-[#25234A]/10 bg-white/40 text-[#25234A]/40 opacity-40';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isAnswered}
                        onClick={() => handleAnswerOption(idx)}
                        className={`w-full p-5 sm:p-6 rounded-2xl text-left text-base sm:text-lg transition-all flex items-start gap-4 cursor-pointer ${btnStyle}`}
                      >
                        <span className="w-9 h-9 rounded-full bg-[#8B5CF6]/15 text-[#6D28D9] font-bold text-base flex items-center justify-center shrink-0 mt-0.5 border border-[#8B5CF6]/30">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="leading-relaxed font-semibold">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {isAnswered && (
                  <div className="p-6 sm:p-7 rounded-2xl bg-[#FFF9F0] border-2 border-[#25234A]/15 space-y-4 animate-in fade-in duration-200">
                    <p className="text-base sm:text-lg text-[#25234A] leading-relaxed font-medium pl-8 border-l-4 border-[#8B5CF6]">
                      {currentObstacle.explanation}
                    </p>
                    <div className="pl-8">
                      <button
                        onClick={handleNextQuestion}
                        className="px-7 py-3.5 rounded-xl bg-[#25234A] text-white text-base font-bold hover:bg-[#8B5CF6] transition-colors flex items-center gap-2.5 cursor-pointer shadow-md"
                      >
                        <span>Ải tiếp theo ({currentIndex + 2}/{currentListLength})</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* GAME OVER / VICTORY SCREEN */
          <div className="py-12 text-center space-y-6">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-[#8B5CF6] to-[#F5C76A] flex items-center justify-center shadow-lg animate-bounce">
              <Trophy className="w-12 h-12 text-[#25234A]" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif-literary text-3xl sm:text-4xl font-bold text-[#25234A]">
                Hoàn thành xuất sắc thử thách!
              </h3>
              <p className="text-lg text-[#25234A]/80 font-medium">
                Bạn đã ghi được tổng cộng <strong className="text-[#8B5CF6]">{score} điểm</strong>!
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={resetGame}
                className="px-7 py-3.5 rounded-2xl bg-[#25234A] text-white text-base font-bold hover:bg-[#8B5CF6] transition-colors flex items-center gap-2.5 cursor-pointer shadow-md"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Chơi lại phần này</span>
              </button>

              <button
                onClick={() => {
                  const modes: GameMode[] = ['trivia', 'author', 'guessWork', 'puzzle', 'obstacle'];
                  const nextMode = modes[(modes.indexOf(activeGame) + 1) % modes.length];
                  handleSelectGame(nextMode);
                }}
                className="px-7 py-3.5 rounded-2xl bg-white border-2 border-[#8B5CF6] text-[#8B5CF6] text-base font-bold hover:bg-[#8B5CF6]/10 transition-colors flex items-center gap-2.5 cursor-pointer shadow-sm"
              >
                <Sparkles className="w-5 h-5" />
                <span>Thử trò chơi khác</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
