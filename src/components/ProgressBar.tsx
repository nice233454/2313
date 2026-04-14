interface ProgressBarProps {
  current: number;
  total: number;
  correctCount: number;
  wrongCount: number;
}

export default function ProgressBar({ current, total, correctCount, wrongCount }: ProgressBarProps) {
  const progress = (current / total) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-slate-600">
            Вопрос <span className="text-slate-900">{current}</span> из <span className="text-slate-900">{total}</span>
          </span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-sm font-medium text-emerald-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              {correctCount}
            </span>
            <span className="flex items-center gap-1 text-sm font-medium text-rose-600">
              <span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span>
              {wrongCount}
            </span>
          </div>
        </div>
        <span className="text-sm text-slate-500">{Math.round(progress)}%</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex mt-1 gap-0.5">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="flex-1 h-1 rounded-sm transition-all duration-300"
            style={{
              backgroundColor:
                i < current - 1
                  ? 'transparent'
                  : 'transparent',
            }}
          />
        ))}
      </div>
    </div>
  );
}
