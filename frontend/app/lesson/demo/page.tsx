"use client";

import { useRouter } from "next/navigation";
import { DEMO_LESSON } from "@/lib/seed-lesson";
import { useLesson } from "@/hooks/useLesson";
import { LessonFlow } from "@/components/lesson/LessonFlow";
import { ExerciseRenderer } from "@/components/lesson/ExerciseRenderer";
import { FeedbackBanner } from "@/components/lesson/FeedbackBanner";
import { AIFeedbackCard } from "@/components/lesson/AIFeedbackCard";

export default function DemoLessonPage() {
  const router = useRouter();
  const { session, currentExercise, submitAnswer, submitFreeText, completeInfoCard, continueLesson } =
    useLesson(DEMO_LESSON.exercises);

  if (session.phase === "complete") {
    router.push(`/lesson/demo/complete?xp=${session.xpEarned}`);
    return null;
  }

  const exerciseTypes = ["vocabulary", "reading"];
  const isInfoCard = exerciseTypes.includes(currentExercise?.exercise_type ?? "");

  return (
    <div className="min-h-dvh flex flex-col" style={{ backgroundColor: "var(--blest-cream)" }}>
      <LessonFlow
        current={session.currentIndex}
        total={session.exercises.length}
        lives={session.lives}
        xpEarned={session.xpEarned}
        onClose={() => router.push("/")}
      />

      <div
        className="flex-1 px-4 py-8 overflow-y-auto"
        style={{ paddingBottom: session.phase === "feedback" ? "180px" : "32px" }}
      >
        <div className="max-w-lg mx-auto">
          {currentExercise && session.phase !== "ai_feedback" && (
            <>
              <p className="text-xs font-semibold uppercase tracking-wide mb-5" style={{ color: "var(--blest-ink-soft)", opacity: 0.5 }}>
                {session.currentIndex + 1} of {session.exercises.length}
              </p>
              <ExerciseRenderer
                exercise={currentExercise}
                onSubmit={(isCorrect, explanation) => submitAnswer(null, isCorrect, explanation)}
                onSubmitFreeText={submitFreeText}
                onContinueInfo={completeInfoCard}
                isAiLoading={session.phase === "ai_loading"}
              />
            </>
          )}
        </div>
      </div>

      {session.phase === "feedback" && session.feedbackState && !isInfoCard && (
        <FeedbackBanner
          isCorrect={session.feedbackState.isCorrect}
          explanation={session.feedbackState.explanation}
          onContinue={continueLesson}
        />
      )}

      {session.phase === "ai_feedback" && session.aiFeedback && (
        <AIFeedbackCard feedback={session.aiFeedback} onContinue={continueLesson} />
      )}
    </div>
  );
}
