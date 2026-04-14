import { useState, useCallback } from 'react';
import { supabase } from './lib/supabase';
import { AppScreen, Question, ExamResult } from './types';
import StartScreen from './components/StartScreen';
import ExamScreen from './components/ExamScreen';
import ResultScreen from './components/ResultScreen';

const EXAM_QUESTION_COUNT = 20;

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('start');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [result, setResult] = useState<ExamResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleStart = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .order('number');

      if (error) throw error;

      const parsed: Question[] = (data ?? []).map((row: Record<string, unknown>) => ({
        ...row,
        options: Array.isArray(row.options) ? row.options : JSON.parse(row.options as string),
      })) as Question[];

      const selected = shuffleArray(parsed).slice(0, EXAM_QUESTION_COUNT);
      setQuestions(selected);
      setScreen('exam');
    } catch (err) {
      console.error('Failed to load questions:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFinish = useCallback(async (examResult: ExamResult) => {
    setResult(examResult);
    setScreen('result');

    await supabase.from('exam_results').insert({
      score: examResult.score,
      total: examResult.total,
      passed: examResult.passed,
      time_spent: examResult.timeSpent,
      mistakes: examResult.mistakes,
    });
  }, []);

  const handleRestart = useCallback(() => {
    setQuestions([]);
    setResult(null);
    setScreen('start');
  }, []);

  if (screen === 'start') {
    return <StartScreen onStart={handleStart} loading={loading} />;
  }

  if (screen === 'exam' && questions.length > 0) {
    return <ExamScreen questions={questions} onFinish={handleFinish} />;
  }

  if (screen === 'result' && result) {
    return <ResultScreen result={result} onRestart={handleRestart} />;
  }

  return null;
}
