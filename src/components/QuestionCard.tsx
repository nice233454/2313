import { CheckCircle, XCircle } from 'lucide-react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  selectedIndex: number | null;
  onSelect: (index: number) => void;
  revealed: boolean;
}

const optionLetters = ['А', 'Б', 'В', 'Г'];

export default function QuestionCard({ question, selectedIndex, onSelect, revealed }: QuestionCardProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-start gap-3 mb-1">
          <span className="inline-block bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shrink-0 mt-0.5">
            {question.category}
          </span>
        </div>
        <p className="text-slate-900 text-lg font-semibold leading-relaxed mt-3">
          {question.text}
        </p>
      </div>

      <div className="grid gap-3">
        {question.options.map((option, index) => {
          const isSelected = selectedIndex === index;
          const isCorrect = index === question.correct_index;
          const isWrong = revealed && isSelected && !isCorrect;
          const showCorrect = revealed && isCorrect;

          let baseClass =
            'relative flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 select-none';

          if (!revealed) {
            baseClass += isSelected
              ? ' border-blue-500 bg-blue-50 shadow-md shadow-blue-100'
              : ' border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-sm';
          } else if (showCorrect) {
            baseClass += ' border-emerald-500 bg-emerald-50 cursor-default';
          } else if (isWrong) {
            baseClass += ' border-rose-500 bg-rose-50 cursor-default';
          } else {
            baseClass += ' border-slate-100 bg-slate-50 opacity-60 cursor-default';
          }

          return (
            <button
              key={index}
              className={baseClass}
              onClick={() => !revealed && onSelect(index)}
              disabled={revealed}
            >
              <span
                className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  !revealed
                    ? isSelected
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-500'
                    : showCorrect
                    ? 'bg-emerald-500 text-white'
                    : isWrong
                    ? 'bg-rose-500 text-white'
                    : 'bg-slate-200 text-slate-400'
                }`}
              >
                {optionLetters[index]}
              </span>
              <span
                className={`text-base leading-snug ${
                  !revealed
                    ? isSelected
                      ? 'text-blue-900 font-medium'
                      : 'text-slate-700'
                    : showCorrect
                    ? 'text-emerald-800 font-medium'
                    : isWrong
                    ? 'text-rose-800 font-medium'
                    : 'text-slate-500'
                }`}
              >
                {option}
              </span>
              {revealed && showCorrect && (
                <CheckCircle size={20} className="ml-auto text-emerald-500 shrink-0" />
              )}
              {revealed && isWrong && (
                <XCircle size={20} className="ml-auto text-rose-500 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {revealed && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 animate-in fade-in duration-300">
          <span className="text-amber-500 shrink-0 mt-0.5">💡</span>
          <p className="text-amber-800 text-sm leading-relaxed">
            <span className="font-semibold">Пояснение: </span>
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
