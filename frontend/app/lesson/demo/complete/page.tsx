"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { Trophy, Zap, BookCheck, Target } from "lucide-react";
import { DEMO_LESSON } from "@/lib/seed-lesson";

function CompleteContent() {
  const params = useSearchParams();
  const router = useRouter();
  const xpEarned = parseInt(params.get("xp") ?? "0");
  const maxXp = DEMO_LESSON.exercises.reduce((sum, e) => sum + e.xp_value, 0) + DEMO_LESSON.xp_reward;
  const accuracy = Math.round((xpEarned / maxXp) * 100);

  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center px-4 text-center gap-8"
      style={{ backgroundColor: "var(--blest-cream)" }}
    >
      <div className="space-y-3">
        <div
          className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto"
          style={{ backgroundColor: "var(--blest-olive-soft)" }}
        >
          <Trophy size={40} style={{ color: "var(--blest-olive)" }} />
        </div>
        <h1
          className="text-4xl font-bold"
          style={{ color: "var(--blest-ink)", fontFamily: "var(--font-newsreader)" }}
        >
          Lesson Complete!
        </h1>
        <p style={{ color: "var(--blest-ink-soft)" }}>You finished &ldquo;{DEMO_LESSON.title}&rdquo;</p>
      </div>

      <div
        className="rounded-2xl p-6 w-full max-w-sm space-y-4"
        style={{ backgroundColor: "white", border: "1px solid var(--blest-cream-dark)" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2" style={{ color: "var(--blest-ink-soft)" }}>
            <Zap size={16} style={{ color: "var(--blest-olive)" }} />
            <span className="text-sm font-medium">XP Earned</span>
          </div>
          <span className="text-2xl font-extrabold" style={{ color: "var(--blest-olive)" }}>+{xpEarned}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2" style={{ color: "var(--blest-ink-soft)" }}>
            <BookCheck size={16} style={{ color: "var(--blest-ink-soft)" }} />
            <span className="text-sm font-medium">Exercises</span>
          </div>
          <span className="font-bold" style={{ color: "var(--blest-ink)" }}>{DEMO_LESSON.exercises.length} completed</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2" style={{ color: "var(--blest-ink-soft)" }}>
            <Target size={16} style={{ color: "var(--blest-ink-soft)" }} />
            <span className="text-sm font-medium">Accuracy</span>
          </div>
          <span className="font-bold" style={{ color: accuracy >= 80 ? "var(--blest-olive-ink)" : "#b45309" }}>
            {accuracy}%
          </span>
        </div>
      </div>

      <div className="space-y-3 w-full max-w-sm">
        <button
          onClick={() => router.push("/lesson/demo")}
          className="w-full h-12 font-semibold rounded-xl transition-opacity hover:opacity-90"
          style={{ backgroundColor: "var(--blest-ink)", color: "var(--blest-cream)" }}
        >
          Practice Again
        </button>
        <button
          onClick={() => router.push("/")}
          className="w-full h-12 font-semibold rounded-xl transition-opacity hover:opacity-80"
          style={{
            backgroundColor: "transparent",
            border: "2px solid var(--blest-cream-dark)",
            color: "var(--blest-ink-soft)",
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default function LessonCompletePage() {
  return (
    <Suspense fallback={<div className="min-h-dvh flex items-center justify-center">Loading…</div>}>
      <CompleteContent />
    </Suspense>
  );
}
