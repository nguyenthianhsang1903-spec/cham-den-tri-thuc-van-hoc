import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { EXAM_PRACTICES } from '../data/examsData';
import { ExamPractice, ExamQuestion } from '../types';
import { useProgress } from '../context/ProgressContext';
import {
  FileCheck2,
  Clock,
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  BookOpen,
  HelpCircle,
  Send,
  AlertCircle,
  Check
} from 'lucide-react';

export const ExamsSection: React.FC = () => {
  const { addPoints, recordTestCompletion } = useProgress();

  const [selectedExamId, setSelectedExamId] = useState<string>(EXAM_PRACTICES[0].id);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scoreAchieved, setScoreAchieved] = useState<number | null>(null);

  // Timer state
  const [secondsRemaining, setSecondsRemaining] = useState<number>(EXAM_PRACTICES[0].durationMinutes * 60);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const currentExam = EXAM_PRACTICES.find((e) => e.id === selectedExamId) || EXAM_PRACTICES[0];

  // Switch Exam
  const handleSelectExam = (exam: ExamPractice) => {
    setSelectedExamId(exam.id);
    setUserAnswers({});
    setIsSubmitted(false);
    setScoreAchieved(null);
    setSecondsRemaining(exam.durationMinutes * 60);
    setIsTimerActive(false);
  };

  // Timer tick
  useEffect(() => {
    if (!isTimerActive || isSubmitted) return;

    if (secondsRemaining <= 0) {
      handleSubmitExam();
      return;
    }

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsRemaining, isTimerActive, isSubmitted]);

  const handleStartExam = () => {
    setIsTimerActive(true);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmitExam = () => {
    if (isSubmitted) return;
    setIsTimerActive(false);
    setIsSubmitted(true);

    if (currentExam.questions.length > 0) {
      let earned = 0;
      currentExam.questions.forEach((q) => {
        if (userAnswers[q.id] === q.correctIndex) {
          earned += q.maxScore;
        }
      });

      // Round to 1 decimal
      const finalScore = Math.round(earned * 10) / 10;
      setScoreAchieved(finalScore);
      recordTestCompletion(finalScore);

      if (finalScore >= 6) {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(userAnswers).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
          <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Mục 4: Thử thách kiểm tra</span>
        </div>
        <h1 className="font-serif-literary text-3xl sm:text-4xl font-bold text-[#25234A]">
          Khảo sát & Luyện đề chuẩn cấu trúc THPT
        </h1>
        <p className="text-sm text-[#25234A]/80 leading-relaxed">
          Đề luyện tập đọc hiểu, bài kiểm tra 15 phút, đề kiểm tra tổng hợp 45 phút và hướng dẫn làm
          văn nghị luận. Hệ thống tự động chấm điểm khách quan, cung cấp lời giải thích và barem chi tiết.
        </p>
      </div>

      {/* Exam Type Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 p-1.5 rounded-2xl bg-[#25234A]/5 border border-[#25234A]/10">
        {EXAM_PRACTICES.map((exam) => (
          <button
            key={exam.id}
            onClick={() => handleSelectExam(exam)}
            className={`p-3 rounded-xl text-left transition-all cursor-pointer ${
              selectedExamId === exam.id
                ? 'bg-white text-[#25234A] shadow-md border border-[#8B5CF6]/30 ring-1 ring-[#8B5CF6]/20'
                : 'text-[#25234A]/70 hover:bg-white/60 hover:text-[#25234A]'
            }`}
          >
            <p className="text-xs font-bold leading-tight">{exam.typeLabel}</p>
            <p className="text-[10px] text-[#25234A]/50 mt-1 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{exam.durationMinutes} phút</span>
            </p>
          </button>
        ))}
      </div>

      {/* Main Exam Paper */}
      <div className="bg-white rounded-3xl border border-[#25234A]/10 shadow-lg p-6 sm:p-8 space-y-8">
        {/* Exam Title & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#25234A]/10">
          <div>
            <span className="text-xs font-bold text-[#8B5CF6] uppercase tracking-wider">
              {currentExam.typeLabel} · Điểm tối đa: {currentExam.totalScore}
            </span>
            <h2 className="font-serif-literary text-xl sm:text-2xl font-bold text-[#25234A] mt-1">
              {currentExam.title}
            </h2>
          </div>

          {/* Time & Submission Controls */}
          {currentExam.questions.length > 0 && (
            <div className="flex items-center gap-3">
              <div
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-semibold ${
                  secondsRemaining < 120
                    ? 'border-rose-400 bg-rose-50 text-rose-700 animate-pulse'
                    : 'border-[#25234A]/10 bg-[#FFF9F0] text-[#25234A]'
                }`}
              >
                <Clock className="w-4 h-4 text-[#8B5CF6]" />
                <span>Thời gian: {formatTimer(secondsRemaining)}</span>
              </div>

              {!isTimerActive && !isSubmitted && (
                <button
                  onClick={handleStartExam}
                  className="px-4 py-2 rounded-xl bg-[#25234A] text-white text-xs font-semibold hover:bg-[#8B5CF6] transition-colors cursor-pointer"
                >
                  Bắt đầu tính giờ
                </button>
              )}

              {isTimerActive && !isSubmitted && (
                <button
                  onClick={handleSubmitExam}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Nộp bài ({answeredCount}/{currentExam.questions.length})</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Reading Passage if available */}
        {currentExam.readingPassage && (
          <div className="p-6 rounded-2xl bg-[#FFF9F0] border border-[#25234A]/10 space-y-3">
            <div className="flex items-center justify-between text-xs text-[#25234A]/70">
              <span className="font-bold text-[#8B5CF6] uppercase tracking-wider">Ngữ liệu đọc hiểu</span>
              <span className="italic">{currentExam.readingPassage.source}</span>
            </div>
            <div className="font-serif-literary text-xs sm:text-sm text-[#25234A]/90 whitespace-pre-line leading-relaxed border-l-2 border-[#8B5CF6]/40 pl-4 py-1">
              {currentExam.readingPassage.text}
            </div>
          </div>
        )}

        {/* Essay Prompt if this is an Essay Practice */}
        {currentExam.essayPrompt && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[#25234A] text-white space-y-3">
              <span className="text-xs font-bold text-[#F5C76A] uppercase tracking-wider">
                Yêu cầu đề bài
              </span>
              <p className="font-serif-literary text-sm sm:text-base leading-relaxed text-white/95 whitespace-pre-line">
                {currentExam.essayPrompt.question}
              </p>
            </div>

            {/* Essay Guide & Outline */}
            <div className="p-6 rounded-2xl bg-white border border-[#25234A]/10 space-y-4">
              <h4 className="font-serif-literary text-base font-bold text-[#25234A] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#8B5CF6]" />
                <span>Gợi ý dàn bài chi tiết từ chuyên gia</span>
              </h4>

              <div className="space-y-3 text-xs sm:text-sm text-[#25234A]/85">
                <div className="p-3.5 rounded-xl bg-[#FFF9F0]">
                  <p className="font-bold text-[#25234A]">1. Mở bài:</p>
                  <p className="text-xs text-[#25234A]/80 mt-1">
                    {currentExam.essayPrompt.outline.intro}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FFF9F0]">
                  <p className="font-bold text-[#25234A]">2. Thân bài:</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1.5 text-xs text-[#25234A]/80">
                    {currentExam.essayPrompt.outline.body.map((item, bIdx) => (
                      <li key={bIdx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FFF9F0]">
                  <p className="font-bold text-[#25234A]">3. Kết bài:</p>
                  <p className="text-xs text-[#25234A]/80 mt-1">
                    {currentExam.essayPrompt.outline.conclusion}
                  </p>
                </div>
              </div>

              {/* Grading criteria */}
              <div className="pt-4 border-t border-[#25234A]/10 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-[#D97706]">
                  Tiêu chí chấm điểm và barem phân hóa (10 điểm):
                </p>
                <ul className="space-y-1.5 text-xs text-[#25234A]/80">
                  {currentExam.essayPrompt.criteria.map((crit, cIdx) => (
                    <li key={cIdx} className="flex items-start gap-2">
                      <span className="text-[#8B5CF6] font-bold">✓</span>
                      <span>{crit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Multiple Choice Questions List */}
        {currentExam.questions.length > 0 && (
          <div className="space-y-8">
            {currentExam.questions.map((q, idx) => {
              const isSelected = userAnswers[q.id] !== undefined;
              const chosenOption = userAnswers[q.id];
              const isCorrect = isSubmitted && chosenOption === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className={`p-6 rounded-2xl border transition-all ${
                    isSubmitted
                      ? isCorrect
                        ? 'border-emerald-300 bg-emerald-50/30'
                        : 'border-rose-300 bg-rose-50/20'
                      : 'border-[#25234A]/10 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-serif-literary text-lg sm:text-xl font-bold text-[#25234A] leading-snug">
                      Câu {idx + 1}: {q.question}
                    </p>
                    <span className="text-xs sm:text-sm font-bold text-[#8B5CF6] px-2.5 py-1 rounded-lg bg-[#A78BFA]/20 shrink-0">
                      {q.maxScore} điểm
                    </span>
                  </div>

                  {/* Options */}
                  {q.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-5">
                      {q.options.map((opt, oIdx) => {
                        const optSelected = chosenOption === oIdx;
                        let optStyle = 'border-[#25234A]/15 bg-[#FFF9F0]/50 text-[#25234A] hover:border-[#8B5CF6] hover:bg-white shadow-2xs';

                        if (optSelected && !isSubmitted) {
                          optStyle = 'border-[#8B5CF6] bg-[#A78BFA]/20 text-[#25234A] font-bold ring-2 ring-[#8B5CF6]/30';
                        }

                        if (isSubmitted) {
                          if (oIdx === q.correctIndex) {
                            optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/30';
                          } else if (optSelected && oIdx !== q.correctIndex) {
                            optStyle = 'border-rose-400 bg-rose-50 text-rose-900 font-medium';
                          } else {
                            optStyle = 'border-[#25234A]/10 bg-white/40 text-[#25234A]/40 opacity-50';
                          }
                        }

                        return (
                          <button
                            key={oIdx}
                            disabled={isSubmitted}
                            onClick={() => handleSelectOption(q.id, oIdx)}
                            className={`p-4 sm:p-5 rounded-2xl border text-left text-sm sm:text-base transition-all flex items-start gap-3.5 cursor-pointer ${optStyle}`}
                          >
                            <span className="w-7 h-7 rounded-full bg-[#25234A]/5 font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 mt-0.5">
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span className="leading-relaxed">{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Explanation after submission */}
                  {isSubmitted && (
                    <div className="mt-4 p-5 rounded-2xl bg-white border border-[#25234A]/10 space-y-1.5 text-sm sm:text-base">
                      <p className="font-bold text-[#25234A] flex items-center gap-2">
                        {chosenOption === q.correctIndex ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-rose-600" />
                        )}
                        <span>Lời giải thích chi tiết:</span>
                      </p>
                      <p className="text-[#25234A]/85 leading-relaxed pl-7">
                        {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Bottom Submit Banner */}
            {!isSubmitted ? (
              <div className="p-6 rounded-2xl bg-[#FFF9F0] border border-[#25234A]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-[#25234A]/70">
                  Đã hoàn thành <strong>{answeredCount}</strong> / {currentExam.questions.length} câu hỏi.
                </div>
                <button
                  onClick={handleSubmitExam}
                  className="px-6 py-2.5 rounded-xl bg-[#25234A] text-white font-semibold text-xs sm:text-sm hover:bg-[#8B5CF6] transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Nộp bài & Xem điểm</span>
                </button>
              </div>
            ) : (
              /* Score Result Card */
              <div className="p-6 rounded-2xl bg-[#25234A] text-white text-center space-y-4 animate-in zoom-in-95 duration-200">
                <Award className="w-12 h-12 text-[#F5C76A] mx-auto" />
                <div>
                  <h3 className="font-serif-literary text-2xl font-bold">
                    Kết quả bài kiểm tra: {scoreAchieved} / {currentExam.totalScore} Điểm
                  </h3>
                  <p className="text-xs text-white/80 mt-1">
                    {scoreAchieved !== null && scoreAchieved >= 8
                      ? 'Xuất sắc! Bạn nắm rất vững kiến thức trọng tâm của bài học.'
                      : scoreAchieved !== null && scoreAchieved >= 5
                      ? 'Khá tốt! Hãy ôn lại những câu làm sai để củng cố thêm kiến thức.'
                      : 'Hãy đọc lại phần tóm tắt tác phẩm và thư viện kiến thức để đạt kết quả cao hơn.'}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setUserAnswers({});
                    setIsSubmitted(false);
                    setScoreAchieved(null);
                    setSecondsRemaining(currentExam.durationMinutes * 60);
                    setIsTimerActive(false);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-white text-[#25234A] font-semibold text-xs hover:bg-[#FFF9F0] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Làm lại bài kiểm tra</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
