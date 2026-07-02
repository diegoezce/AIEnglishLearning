"use client";

import { CheckCircle2, XCircle } from "lucide-react";

interface Props {
  isCorrect: boolean;
  explanation: string;
  onContinue: () => void;
}

export function FeedbackBanner({ isCorrect, explanation, onContinue }: Props) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 p-5 border-t-2 space-y-3"
      style={
        isCorrect
          ? { backgroundColor: "#f0fdf4", borderColor: "#86efac" }
          : { backgroundColor: "#fff1f2", borderColor: "#fca5a5" }
      }
    >
      <div className="flex items-start gap-3 max-w-lg mx-auto">
        {isCorrect
          ? <CheckCircle2 size={24} className="text-green-500 shrink-0 mt-0.5" />
          : <XCircle size={24} className="text-red-400 shrink-0 mt-0.5" />
        }
        <div className="space-y-1">
          <p className="font-bold text-sm" style={{ color: isCorrect ? "#166534" : "#991b1b" }}>
            {isCorrect ? "Correct!" : "Not quite"}
          </p>
          <p className="text-sm" style={{ color: isCorrect ? "#15803d" : "#b91c1c" }}>
            {explanation}
          </p>
        </div>
      </div>
      <div className="max-w-lg mx-auto">
        <button
          onClick={onContinue}
          className="w-full h-11 font-semibold rounded-xl text-sm transition-opacity hover:opacity-90"
          style={
            isCorrect
              ? { backgroundColor: "#16a34a", color: "white" }
              : { backgroundColor: "#dc2626", color: "white" }
          }
        >
          Continue
        </button>
      </div>
    </div>
  );
}
