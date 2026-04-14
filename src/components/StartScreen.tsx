import { BookOpen, Clock, CheckCircle, AlertTriangle, Car, Trophy } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
  loading: boolean;
}

export default function StartScreen({ onStart, loading }: StartScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-blue-600 shadow-2xl shadow-blue-900/50 mb-6">
            <Car size={40} className="text-white" />
          </div>
          <div className="inline-block bg-blue-500/20 text-blue-300 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full border border-blue-500/30 mb-4">
            Автошкола — Теоретический экзамен
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
            Экзамен ПДД
          </h1>
          <p className="text-blue-200/80 text-lg max-w-md mx-auto">
            Проверьте свои знания Правил дорожного движения Российской Федерации
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-6">
          <h2 className="text-white font-bold text-base mb-4 flex items-center gap-2">
            <BookOpen size={16} className="text-blue-400" />
            Условия экзамена
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600/30 flex items-center justify-center shrink-0">
                <BookOpen size={18} className="text-blue-400" />
              </div>
              <div>
                <p className="text-white font-bold text-xl">20</p>
                <p className="text-slate-400 text-xs">вопросов</p>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600/30 flex items-center justify-center shrink-0">
                <Clock size={18} className="text-blue-400" />
              </div>
              <div>
                <p className="text-white font-bold text-xl">20</p>
                <p className="text-slate-400 text-xs">минут</p>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-rose-600/30 flex items-center justify-center shrink-0">
                <AlertTriangle size={18} className="text-rose-400" />
              </div>
              <div>
                <p className="text-white font-bold text-xl">2</p>
                <p className="text-slate-400 text-xs">макс. ошибок</p>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-600/30 flex items-center justify-center shrink-0">
                <Trophy size={18} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-white font-bold text-xl">18+</p>
                <p className="text-slate-400 text-xs">правильных</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 mb-6">
          <h2 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
            <CheckCircle size={15} className="text-emerald-400" />
            Категории вопросов
          </h2>
          <div className="flex flex-wrap gap-2">
            {['Скоростной режим', 'Дорожные знаки', 'Разметка', 'Светофоры', 'Приоритет', 'Манёвры', 'Остановка и стоянка', 'Обгон', 'ДТП', 'Документы', 'Безопасность', 'Пешеходы'].map(cat => (
              <span key={cat} className="bg-white/5 border border-white/10 text-slate-300 text-xs px-3 py-1 rounded-full">
                {cat}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={onStart}
          disabled={loading}
          className="w-full py-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-lg rounded-2xl transition-all duration-200 shadow-xl shadow-blue-900/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Загрузка вопросов...
            </>
          ) : (
            <>
              <Car size={20} />
              Начать экзамен
            </>
          )}
        </button>

        <p className="text-center text-slate-500 text-xs mt-4">
          Вопросы выбираются случайным образом из банка заданий ПДД РФ
        </p>
      </div>
    </div>
  );
}
