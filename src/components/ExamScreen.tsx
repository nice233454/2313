import { useState, useCallback } from 'react';
import { ChevronRight, Flag } from 'lucide-react';
import { Question, ExamResult } from '../types';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';
import Timer from './Timer';

interface ExamScreenProps {
  questions: Question[];
  onFinish: (result: ExamResult) => void;
}

const EXAM_DURATION = 20 * 60;

export default function ExamScreen({ questions, onFinish }: ExamScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [revealed, setRevealed] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [startTime] = useState(Date.now());
  const [timerRunning, setTimerRunning] = useState(true);

  const question = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  const correctCount = answers.filter((a, i) => a === questions[i].correct_index).length;
  const wrongCount = answers.filter((a, i) => a !== null && a !== questions[i].correct_index).length;

  const handleSelect = useCallback((index: number) => {
    setSelectedIndex(index);
    setRevealed(true);
    const newAnswers = [...answers];
    newAnswers[currentIndex] = index;
    setAnswers(newAnswers);
  }, [answers, currentIndex]);

  const handleNext = useCallback(() => {
    if (isLast) {
      finishExam(answers);
      return;
    }
    setCurrentIndex(prev => prev + 1);
    setSelectedIndex(answers[currentIndex + 1] ?? null);
    setRevealed(answers[currentIndex + 1] !== null);
  }, [isLast, answers, currentIndex]);

  const finishExam = useCallback((finalAnswers: (number | null)[]) => {
    setTimerRunning(false);
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const score = finalAnswers.filter((a, i) => a === questions[i].correct_index).length;
    const mistakes = finalAnswers.filter((a, i) => a !== null && a !== questions[i].correct_index).length;
    const unanswered = finalAnswers.filter(a => a === null).length;
    const totalMistakes = mistakes + unanswered;

    onFinish({
      score,
      total: questions.length,
      passed: totalMistakes <= 2,
      timeSpent,
      mistakes: totalMistakes,
      answers: finalAnswers,
      questions,
    });
  }, [startTime, questions, onFinish]);

  const handleTimeExpire = useCallback(() => {
    finishExam(answers);
  }, [answers, finishExam]);

  const handleSkip = () => {
    if (isLast) {
      finishExam(answers);
      return;
    }
    setCurrentIndex(prev => prev + 1);
    setSelectedIndex(answers[currentIndex + 1] ?? null);
    setRevealed(answers[currentIndex + 1] !== null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Flag size={14} className="text-white" />
            </div>
            <span className="font-black text-slate-900 text-base hidden sm:block">Экзамен ПДД</span>
          </div>
          <div className="flex-1 max-w-xs">
            <ProgressBar
              current={currentIndex + 1}
              total={questions.length}
              correctCount={correctCount}
              wrongCount={wrongCount}
            />
          </div>
          <Timer
            totalSeconds={EXAM_DURATION}
            onExpire={handleTimeExpire}
            running={timerRunning}
          />
        </div>
      </header>

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-6 flex flex-col">
        <div className="mb-4 flex items-center gap-2">
          <span className="text-2xl font-black text-slate-900">
            {currentIndex + 1}.
          </span>
          <span className="text-slate-400 text-sm font-medium">
            Выберите правильный ответ
          </span>
        </div>

        <QuestionCard
          question={question}
          selectedIndex={selectedIndex}
          onSelect={handleSelect}
          revealed={revealed}
        />

        <div className="mt-6 flex items-center justify-between gap-4">
          {!revealed ? (
            <button
              onClick={handleSkip}
              className="px-5 py-2.5 text-slate-500 hover:text-slate-700 font-medium text-sm transition-colors border border-slate-200 rounded-xl hover:border-slate-300 hover:bg-slate-50"
            >
              Пропустить
            </button>
          ) : (
            <div />
          )}

          {revealed && (
            <button
              onClick={handleNext}
              className="ml-auto flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-blue-200"
            >
              {isLast ? 'Завершить экзамен' : 'Следующий вопрос'}
              <ChevronRight size={18} />
            </button>
          )}

          {!revealed && isLast && (
            <button
              onClick={() => finishExam(answers)}
              className="ml-auto flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl transition-all duration-200"
            >
              <Flag size={16} />
              Завершить
            </button>
          )}
        </div>

        <div className="mt-8 flex flex-wrap gap-1.5 justify-center">
          {questions.map((_, i) => {
            const ans = answers[i];
            const isCorrect = ans === questions[i].correct_index;
            const isWrong = ans !== null && !isCorrect;
            const isCurrent = i === currentIndex;

            return (
              <button
                key={i}
                onClick={() => {
                  setCurrentIndex(i);
                  setSelectedIndex(answers[i]);
                  setRevealed(answers[i] !== null);
                }}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all duration-200 border-2 ${
                  isCurrent
                    ? 'border-blue-500 bg-blue-600 text-white scale-110'
                    : isCorrect
                    ? 'border-emerald-300 bg-emerald-100 text-emerald-700'
                    : isWrong
                    ? 'border-rose-300 bg-rose-100 text-rose-700'
                    : 'border-slate-200 bg-white text-slate-500 hover:border-blue-300'
                }`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
