import { Trophy, XCircle, RotateCcw, CheckCircle, Clock, BookOpen, AlertTriangle } from 'lucide-react';
import { ExamResult } from '../types';

interface ResultScreenProps {
  result: ExamResult;
  onRestart: () => void;
}

export default function ResultScreen({ result, onRestart }: ResultScreenProps) {
  const { score, total, passed, timeSpent, mistakes, questions, answers } = result;
  const percentage = Math.round((score / total) * 100);

  const minutes = Math.floor(timeSpent / 60);
  const seconds = timeSpent % 60;

  const wrongQuestions = questions
    .map((q, i) => ({ q, answer: answers[i], index: i }))
    .filter(({ q, answer }) => answer === null || answer !== q.correct_index);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4 py-10">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-3xl shadow-2xl mb-6 ${
            passed ? 'bg-emerald-500 shadow-emerald-900/50' : 'bg-rose-500 shadow-rose-900/50'
          }`}>
            {passed ? (
              <Trophy size={48} className="text-white" />
            ) : (
              <XCircle size={48} className="text-white" />
            )}
          </div>

          <div className={`inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full border mb-4 ${
            passed
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
              : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
          }`}>
            {passed ? 'Экзамен сдан' : 'Экзамен не сдан'}
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
            {score} / {total}
          </h1>
          <p className="text-slate-400 text-lg">
            {percentage}% правильных ответов
          </p>

          {passed ? (
            <p className="text-emerald-300 font-medium mt-3">
              Поздравляем! Вы успешно прошли теоретический экзамен ПДД.
            </p>
          ) : (
            <p className="text-rose-300 font-medium mt-3">
              К сожалению, допущено слишком много ошибок. Повторите материал и попробуйте снова.
            </p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/20 mx-auto mb-2">
              <CheckCircle size={20} className="text-emerald-400" />
            </div>
            <p className="text-white font-black text-2xl">{score}</p>
            <p className="text-slate-500 text-xs mt-0.5">верных</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-rose-500/20 mx-auto mb-2">
              <AlertTriangle size={20} className="text-rose-400" />
            </div>
            <p className="text-white font-black text-2xl">{mistakes}</p>
            <p className="text-slate-500 text-xs mt-0.5">ошибок</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/20 mx-auto mb-2">
              <Clock size={20} className="text-blue-400" />
            </div>
            <p className="text-white font-black text-2xl">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </p>
            <p className="text-slate-500 text-xs mt-0.5">затрачено</p>
          </div>
        </div>

        {wrongQuestions.length > 0 && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
            <h2 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
              <BookOpen size={15} className="text-rose-400" />
              Вопросы с ошибками ({wrongQuestions.length})
            </h2>
            <div className="flex flex-col gap-3 max-h-72 overflow-y-auto pr-1">
              {wrongQuestions.map(({ q, answer, index }) => (
                <div key={q.id} className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4">
                  <p className="text-slate-200 text-sm font-medium mb-2">
                    <span className="text-rose-400 font-bold mr-1.5">#{index + 1}</span>
                    {q.text}
                  </p>
                  {answer !== null && (
                    <p className="text-rose-300 text-xs mb-1">
                      Ваш ответ: <span className="font-medium">{q.options[answer]}</span>
                    </p>
                  )}
                  {answer === null && (
                    <p className="text-slate-500 text-xs mb-1 italic">Вопрос пропущен</p>
                  )}
                  <p className="text-emerald-300 text-xs">
                    Правильно: <span className="font-medium">{q.options[q.correct_index]}</span>
                  </p>
                  <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                    {q.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onRestart}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-base rounded-2xl transition-all duration-200 shadow-xl shadow-blue-900/40"
          >
            <RotateCcw size={18} />
            Пройти снова
          </button>
        </div>
      </div>
    </div>
  );
}
