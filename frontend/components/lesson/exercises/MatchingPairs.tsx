"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { MatchingContent } from "@/types";

interface Props {
  content: MatchingContent;
  onSubmit: (isCorrect: boolean, explanation: string) => void;
}

type Match = { left: string; right: string };

export function MatchingPairs({ content, onSubmit }: Props) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matched, setMatched] = useState<Match[]>([]);
  const [wrongPair, setWrongPair] = useState<{ left: string; right: string } | null>(null);

  const shuffledRight = useState(() =>
    [...content.pairs.map((p) => p.right)].sort(() => Math.random() - 0.5)
  )[0];

  const isMatchedLeft = (s: string) => matched.some((m) => m.left === s);
  const isMatchedRight = (s: string) => matched.some((m) => m.right === s);

  const handleLeft = (item: string) => {
    if (isMatchedLeft(item)) return;
    setSelectedLeft(item);
    setWrongPair(null);
    if (selectedRight) tryMatch(item, selectedRight);
  };

  const handleRight = (item: string) => {
    if (isMatchedRight(item)) return;
    setSelectedRight(item);
    setWrongPair(null);
    if (selectedLeft) tryMatch(selectedLeft, item);
  };

  const tryMatch = (left: string, right: string) => {
    const correct = content.pairs.find((p) => p.left === left && p.right === right);
    if (correct) {
      setMatched((prev) => [...prev, { left, right }]);
      setSelectedLeft(null);
      setSelectedRight(null);
    } else {
      setWrongPair({ left, right });
      setTimeout(() => {
        setSelectedLeft(null);
        setSelectedRight(null);
        setWrongPair(null);
      }, 600);
    }
  };

  const allMatched = matched.length === content.pairs.length;

  const getLeftStyle = (item: string): React.CSSProperties => {
    if (isMatchedLeft(item))
      return { borderColor: "#86efac", backgroundColor: "#f0fdf4", color: "#166534", cursor: "default" };
    if (selectedLeft === item)
      return { borderColor: "var(--blest-olive)", backgroundColor: "var(--blest-olive-softer)", color: "var(--blest-ink)" };
    if (wrongPair?.left === item)
      return { borderColor: "#fca5a5", backgroundColor: "#fff1f2", color: "#991b1b" };
    return { borderColor: "var(--blest-cream-dark)", backgroundColor: "white", color: "var(--blest-ink-soft)" };
  };

  const getRightStyle = (item: string): React.CSSProperties => {
    if (isMatchedRight(item))
      return { borderColor: "#86efac", backgroundColor: "#f0fdf4", color: "#166534", cursor: "default" };
    if (selectedRight === item)
      return { borderColor: "var(--blest-olive)", backgroundColor: "var(--blest-olive-softer)", color: "var(--blest-ink)" };
    if (wrongPair?.right === item)
      return { borderColor: "#fca5a5", backgroundColor: "#fff1f2", color: "#991b1b" };
    return { borderColor: "var(--blest-cream-dark)", backgroundColor: "white", color: "var(--blest-ink-soft)" };
  };

  return (
    <div className="flex flex-col gap-5 w-full max-w-lg mx-auto">
      <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--blest-ink-soft)" }}>
        Match the pairs
      </p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          {content.pairs.map((pair) => (
            <button
              key={pair.left}
              onClick={() => handleLeft(pair.left)}
              className="w-full text-left px-3 py-2.5 rounded-xl border-2 text-sm font-medium transition-all"
              style={getLeftStyle(pair.left)}
            >
              {pair.left}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {shuffledRight.map((right) => (
            <button
              key={right}
              onClick={() => handleRight(right)}
              className="w-full text-left px-3 py-2.5 rounded-xl border-2 text-sm transition-all"
              style={getRightStyle(right)}
            >
              {right}
            </button>
          ))}
        </div>
      </div>
      {allMatched && (
        <button
          onClick={() => onSubmit(true, "Great job! You matched all the pairs correctly.")}
          className="w-full h-12 text-base font-semibold rounded-xl transition-opacity hover:opacity-90 flex items-center justify-center gap-2"
          style={{ backgroundColor: "#16a34a", color: "white" }}
        >
          <Check size={18} />
          Check
        </button>
      )}
    </div>
  );
}
