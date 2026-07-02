"use client";

import { useState } from "react";
import { FillInBlankContent } from "@/types";

interface Props {
  content: FillInBlankContent;
  onSubmit: (isCorrect: boolean, explanation: string) => void;
}

export function FillInBlank({ content, onSubmit }: Props) {
  const blankCount = content.blanks.length;
  const [filled, setFilled] = useState<(string | null)[]>(Array(blankCount).fill(null));
  const [usedWords, setUsedWords] = useState<Set<string>>(new Set());

  const parts = content.template.split(/(\{blank_\d+\})/);

  const fillBlank = (word: string) => {
    const nextEmpty = filled.indexOf(null);
    if (nextEmpty === -1) return;
    const next = [...filled];
    next[nextEmpty] = word;
    setFilled(next);
    setUsedWords((prev) => new Set([...prev, word]));
  };

  const clearBlank = (index: number) => {
    const word = filled[index];
    if (!word) return;
    const next = [...filled];
    next[index] = null;
    setFilled(next);
    setUsedWords((prev) => {
      const s = new Set(prev);
      s.delete(word);
      return s;
    });
  };

  const allFilled = filled.every((f) => f !== null);

  const handleCheck = () => {
    const isCorrect = filled.every((f, i) => f === content.blanks[i]);
    const explanation = isCorrect
      ? "Perfect! You matched all the blanks correctly."
      : `The correct answers were: ${content.blanks.join(", ")}.`;
    onSubmit(isCorrect, explanation);
  };

  return (
    <div className="flex flex-col gap-5 w-full max-w-lg mx-auto">
      <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--blest-ink-soft)" }}>
        Fill in the blanks
      </p>
      <div
        className="rounded-xl p-4 text-sm leading-8"
        style={{ backgroundColor: "var(--blest-cream-dark)", color: "var(--blest-ink-soft)" }}
      >
        {parts.map((part, i) => {
          const match = part.match(/\{blank_(\d+)\}/);
          if (match) {
            const idx = parseInt(match[1]);
            return (
              <button
                key={i}
                onClick={() => clearBlank(idx)}
                className="inline-block min-w-[100px] mx-1 px-2 py-0.5 border-b-2 text-center font-medium transition-all rounded"
                style={
                  filled[idx]
                    ? {
                        borderColor: "var(--blest-olive)",
                        color: "var(--blest-ink)",
                        backgroundColor: "var(--blest-olive-softer)",
                      }
                    : {
                        borderColor: "var(--blest-ink-soft)",
                        color: "var(--blest-ink-soft)",
                        opacity: 0.5,
                      }
                }
              >
                {filled[idx] || `blank ${idx + 1}`}
              </button>
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        {content.word_bank.map((word) => (
          <button
            key={word}
            onClick={() => fillBlank(word)}
            disabled={usedWords.has(word)}
            className="px-3 py-1.5 rounded-lg border text-sm font-medium transition-all"
            style={
              usedWords.has(word)
                ? {
                    borderColor: "var(--blest-cream-dark)",
                    color: "var(--blest-ink-soft)",
                    backgroundColor: "var(--blest-cream-dark)",
                    opacity: 0.4,
                    cursor: "not-allowed",
                  }
                : {
                    borderColor: "var(--blest-olive-soft)",
                    color: "var(--blest-olive-ink)",
                    backgroundColor: "white",
                  }
            }
          >
            {word}
          </button>
        ))}
      </div>
      <button
        onClick={handleCheck}
        disabled={!allFilled}
        className="w-full h-12 text-base font-semibold rounded-xl transition-opacity hover:opacity-90 disabled:opacity-40"
        style={{ backgroundColor: "var(--blest-ink)", color: "var(--blest-cream)" }}
      >
        Check
      </button>
    </div>
  );
}
