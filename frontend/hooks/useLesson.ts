"use client";

import { useState, useCallback } from "react";
import { LessonSession, Exercise, AIFeedback, AttemptRecord } from "@/types";
import { evaluatePrompt } from "@/lib/api";
import { FreeTextContent } from "@/types";

function xpForResult(exercise: Exercise, isCorrect: boolean, aiScore?: number): number {
  if (exercise.exercise_type === "free_text") {
    if (!aiScore) return 1;
    if (aiScore >= 80) return 5;
    if (aiScore >= 60) return 3;
    return 1;
  }
  if (exercise.exercise_type === "vocabulary" || exercise.exercise_type === "reading") return 1;
  return isCorrect ? 2 : 0;
}

export function useLesson(exercises: Exercise[]) {
  const [session, setSession] = useState<LessonSession>({
    exercises,
    currentIndex: 0,
    answers: [],
    lives: 3,
    xpEarned: 0,
    phase: "exercise",
    feedbackState: null,
    aiFeedback: null,
  });

  const currentExercise = session.exercises[session.currentIndex];

  const advanceToNext = useCallback((session: LessonSession): LessonSession => {
    const nextIndex = session.currentIndex + 1;
    if (nextIndex >= session.exercises.length) {
      return { ...session, phase: "complete", feedbackState: null, aiFeedback: null };
    }
    return { ...session, currentIndex: nextIndex, phase: "exercise", feedbackState: null, aiFeedback: null };
  }, []);

  // Called for non-AI exercises
  const submitAnswer = useCallback(
    (userAnswer: unknown, isCorrect: boolean, explanation: string) => {
      setSession((prev) => {
        const xp = xpForResult(prev.exercises[prev.currentIndex], isCorrect);
        const attempt: AttemptRecord = {
          exerciseId: prev.exercises[prev.currentIndex].id,
          userAnswer,
          isCorrect,
          xpEarned: xp,
        };
        return {
          ...prev,
          answers: [...prev.answers, attempt],
          xpEarned: prev.xpEarned + xp,
          lives: isCorrect ? prev.lives : Math.max(0, prev.lives - 1),
          phase: "feedback",
          feedbackState: { isCorrect, explanation },
        };
      });
    },
    []
  );

  // Called for vocabulary/reading cards — no right/wrong
  const completeInfoCard = useCallback(() => {
    setSession((prev) => {
      const attempt: AttemptRecord = {
        exerciseId: prev.exercises[prev.currentIndex].id,
        userAnswer: null,
        isCorrect: true,
        xpEarned: 1,
      };
      return advanceToNext({
        ...prev,
        answers: [...prev.answers, attempt],
        xpEarned: prev.xpEarned + 1,
      });
    });
  }, [advanceToNext]);

  // Called for free_text exercises
  const submitFreeText = useCallback(
    async (userAnswer: string) => {
      setSession((prev) => ({ ...prev, phase: "ai_loading" }));
      try {
        const content = currentExercise.content as FreeTextContent;
        const result = await evaluatePrompt(userAnswer, {
          instruction: content.instruction,
          context: content.context,
          rubric: content.rubric,
          sample_answer: content.sample_answer,
        });
        const aiFeedback: AIFeedback = result;
        setSession((prev) => {
          const xp = xpForResult(prev.exercises[prev.currentIndex], true, aiFeedback.score);
          const attempt: AttemptRecord = {
            exerciseId: prev.exercises[prev.currentIndex].id,
            userAnswer,
            isCorrect: aiFeedback.score >= 60,
            xpEarned: xp,
            aiFeedback,
          };
          return {
            ...prev,
            answers: [...prev.answers, attempt],
            xpEarned: prev.xpEarned + xp,
            phase: "ai_feedback",
            aiFeedback,
          };
        });
      } catch {
        // On AI failure, give participation XP and continue
        setSession((prev) => {
          const attempt: AttemptRecord = {
            exerciseId: prev.exercises[prev.currentIndex].id,
            userAnswer,
            isCorrect: false,
            xpEarned: 1,
          };
          return {
            ...prev,
            answers: [...prev.answers, attempt],
            xpEarned: prev.xpEarned + 1,
            phase: "feedback",
            feedbackState: { isCorrect: false, explanation: "AI evaluation unavailable. Great effort!" },
          };
        });
      }
    },
    [currentExercise]
  );

  const continueLesson = useCallback(() => {
    setSession((prev) => advanceToNext(prev));
  }, [advanceToNext]);

  return {
    session,
    currentExercise,
    submitAnswer,
    submitFreeText,
    completeInfoCard,
    continueLesson,
  };
}
