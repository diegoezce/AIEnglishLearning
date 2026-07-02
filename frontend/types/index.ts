export type ExerciseType =
  | "vocabulary"
  | "reading"
  | "multiple_choice"
  | "fill_in_blank"
  | "matching"
  | "drag_drop"
  | "free_text";

export interface VocabularyContent {
  word: string;
  phonetic: string;
  definition: string;
  example: string;
}

export interface ReadingContent {
  title: string;
  body: string;
  key_points: string[];
}

export interface MultipleChoiceContent {
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
}

export interface FillInBlankContent {
  template: string;
  blanks: string[];
  word_bank: string[];
}

export interface MatchingContent {
  pairs: { left: string; right: string }[];
}

export interface DragDropContent {
  items: { id: string; label: string }[];
  correct_order: string[];
}

export interface FreeTextContent {
  instruction: string;
  context: string;
  rubric: string;
  min_words: number;
  sample_answer: string;
}

export type ExerciseContent =
  | VocabularyContent
  | ReadingContent
  | MultipleChoiceContent
  | FillInBlankContent
  | MatchingContent
  | DragDropContent
  | FreeTextContent;

export interface Exercise {
  id: string;
  position: number;
  exercise_type: ExerciseType;
  content: ExerciseContent;
  requires_ai: boolean;
  xp_value: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  xp_reward: number;
  exercises: Exercise[];
}

export type LessonPhase =
  | "exercise"
  | "feedback"
  | "ai_loading"
  | "ai_feedback"
  | "complete";

export interface AttemptRecord {
  exerciseId: string;
  userAnswer: unknown;
  isCorrect: boolean;
  xpEarned: number;
  aiFeedback?: AIFeedback;
}

export interface AIFeedback {
  score: number;
  feedback: string;
  what_worked: string;
  to_improve: string;
}

export interface LessonSession {
  exercises: Exercise[];
  currentIndex: number;
  answers: AttemptRecord[];
  lives: number;
  xpEarned: number;
  phase: LessonPhase;
  feedbackState: { isCorrect: boolean; explanation: string } | null;
  aiFeedback: AIFeedback | null;
}
