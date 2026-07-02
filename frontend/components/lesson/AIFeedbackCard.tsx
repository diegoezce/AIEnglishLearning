"use client";

import { ThumbsUp, TrendingUp } from "lucide-react";
import { AIFeedback } from "@/types";

interface Props {
  feedback: AIFeedback;
  onContinue: () => void;
}

function ScoreRing({ score }: { score: number }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? "var(--blest-olive)" : score >= 60 ? "#d97706" : "#dc2626";

  return (
    <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 96 96">
        <circle cx="48" cy="48" r={radius} fill="none" stroke="var(--blest-cream-dark)" strokeWidth="8" />
        <circle
          cx="48"
          cy="48"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="text-center">
        <p className="text-2xl font-bold" style={{ color }}>{score}</p>
        <p className="text-xs" style={{ color: "var(--blest-ink-soft)" }}>/ 100</p>
      </div>
    </div>
  );
}

export function AIFeedbackCard({ feedback, onContinue }: Props) {
  const isGood = feedback.score >= 60;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end justify-center z-50">
      <div
        className="rounded-t-3xl w-full max-w-lg p-6 space-y-5"
        style={{ backgroundColor: "var(--blest-cream)" }}
      >
        <div className="flex items-center gap-5">
          <ScoreRing score={feedback.score} />
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-wide"
              style={{ color: "var(--blest-ink-soft)" }}
            >
              AI Evaluation
            </p>
            <p
              className="text-base font-bold mt-1"
              style={{ color: isGood ? "var(--blest-olive-ink)" : "#b45309" }}
            >
              {isGood ? "Good prompt!" : "Keep practicing"}
            </p>
            <p className="text-sm mt-0.5" style={{ color: "var(--blest-ink-soft)" }}>{feedback.feedback}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div
            className="rounded-xl p-3 space-y-2"
            style={{ backgroundColor: "var(--blest-olive-softer)", border: "1px solid var(--blest-olive-soft)" }}
          >
            <div className="flex items-center gap-1.5">
              <ThumbsUp size={12} style={{ color: "var(--blest-olive-ink)" }} />
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--blest-olive-ink)" }}>
                What worked
              </p>
            </div>
            <p className="text-sm" style={{ color: "var(--blest-ink)" }}>{feedback.what_worked}</p>
          </div>
          <div
            className="rounded-xl p-3 space-y-2"
            style={{ backgroundColor: "#fffbeb", border: "1px solid #fef3c7" }}
          >
            <div className="flex items-center gap-1.5">
              <TrendingUp size={12} style={{ color: "#b45309" }} />
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#b45309" }}>
                To improve
              </p>
            </div>
            <p className="text-sm" style={{ color: "#92400e" }}>{feedback.to_improve}</p>
          </div>
        </div>

        <button
          onClick={onContinue}
          className="w-full h-12 font-semibold rounded-xl text-sm transition-opacity hover:opacity-90"
          style={{ backgroundColor: "var(--blest-ink)", color: "var(--blest-cream)" }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
