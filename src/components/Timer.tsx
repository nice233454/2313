import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  totalSeconds: number;
  onExpire: () => void;
  running: boolean;
  onTick?: (remaining: number) => void;
}

export default function Timer({ totalSeconds, onExpire, running, onTick }: TimerProps) {
  const [remaining, setRemaining] = useState(totalSeconds);

  useEffect(() => {
    setRemaining(totalSeconds);
  }, [totalSeconds]);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setRemaining(prev => {
        const next = prev - 1;
        onTick?.(next);
        if (next <= 0) {
          clearInterval(interval);
          onExpire();
          return 0;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [running, onExpire, onTick]);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const isWarning = remaining <= 60;
  const isDanger = remaining <= 30;

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-bold text-lg transition-all duration-300 ${
        isDanger
          ? 'bg-rose-100 text-rose-700 animate-pulse'
          : isWarning
          ? 'bg-amber-100 text-amber-700'
          : 'bg-blue-50 text-blue-700'
      }`}
    >
      <Clock size={18} className="flex-shrink-0" />
      <span>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
}
