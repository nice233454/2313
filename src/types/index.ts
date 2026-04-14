export interface Question {
  id: string;
  number: number;
  text: string;
  options: string[];
  correct_index: number;
  category: string;
  explanation: string;
}

export interface ExamState {
  questions: Question[];
  currentIndex: number;
  answers: (number | null)[];
  startTime: number;
  finished: boolean;
}

export interface ExamResult {
  score: number;
  total: number;
  passed: boolean;
  timeSpent: number;
  mistakes: number;
  answers: (number | null)[];
  questions: Question[];
}

export type AppScreen = 'start' | 'exam' | 'result';
