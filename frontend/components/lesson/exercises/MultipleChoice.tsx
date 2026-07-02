"use client";

import { useState } from "react";
import { MultipleChoiceContent } from "@/types";
import { cn } from "@/lib/utils";

interface Props {
  content: MultipleChoiceContent;
  onSubmit: (isCorrect: boolean, explanation: string) => void;
}

export function MultipleChoice({ content, onSubmit }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleCheck = () => {
    if (selected === null) return;
    const isCorrect = selected === content.correct_index;
    onSubmit(isCorrect, content.explanation);
  };

  return (
    <div className="flex flex-col gap-5 w-full max-w-lg mx-auto">
      <p className="text-base font-semibold" style={{ color: "var(--blest-ink)" }}>{content.question}</p>
      <div className="space-y-3">
        {content.options.map((option, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={cn("w-full text-left px-4 py-3 rounded-xl border-2 text-sm transition-all")}
            style={
              selected === i
                ? {
                    borderColor: "var(--blest-olive)",
                    backgroundColor: "var(--blest-olive-softer)",
                    color: "var(--blest-ink)",
                    fontWeight: 500,
                  }
                : {
                    borderColor: "var(--blest-cream-dark)",
                    backgroundColor: "white",
                    color: "var(--blest-ink-soft)",
                  }
            }
          >
            {option}
          </button>
        ))}
      </div>
      <button
        onClick={handleCheck}
        disabled={selected === null}
        className="w-full h-12 text-base font-semibold rounded-xl transition-opacity hover:opacity-90 disabled:opacity-40"
        style={{ backgroundColor: "var(--blest-ink)", color: "var(--blest-cream)" }}
      >
        Check
      </button>
    </div>
  );
}
