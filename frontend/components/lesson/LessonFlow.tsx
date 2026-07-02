"use client";

import { Heart, Zap } from "lucide-react";

interface Props {
  current: number;
  total: number;
  lives: number;
  xpEarned: number;
  onClose: () => void;
}

export function LessonFlow({ current, total, lives, xpEarned, onClose }: Props) {
  const progress = (current / total) * 100;

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 border-b"
      style={{ borderColor: "var(--blest-cream-dark)", backgroundColor: "var(--blest-cream)" }}
    >
      <button
        onClick={onClose}
        className="text-lg shrink-0 transition-opacity hover:opacity-60 font-light"
        style={{ color: "var(--blest-ink-soft)" }}
      >
        ✕
      </button>

      <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ backgroundColor: "var(--blest-cream-dark)" }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%`, backgroundColor: "var(--blest-olive)" }}
        />
      </div>

      <div className="flex items-center gap-0.5 shrink-0">
        {Array.from({ length: 3 }).map((_, i) => (
          <Heart
            key={i}
            size={16}
            className={i < lives ? "fill-red-500 text-red-500" : "text-gray-300 fill-gray-200"}
          />
        ))}
      </div>

      <div className="flex items-center gap-1 text-sm font-semibold shrink-0" style={{ color: "var(--blest-olive-ink)" }}>
        <Zap size={14} className="fill-current" />
        {xpEarned}
      </div>
    </div>
  );
}
