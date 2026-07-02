"use client";

import { Check } from "lucide-react";
import { ReadingContent } from "@/types";

interface Props {
  content: ReadingContent;
  onContinue: () => void;
}

export function ReadingBlock({ content, onContinue }: Props) {
  return (
    <div className="flex flex-col gap-5 w-full max-w-lg mx-auto">
      <h2
        className="text-xl font-bold"
        style={{ color: "var(--blest-ink)", fontFamily: "var(--font-newsreader)" }}
      >
        {content.title}
      </h2>
      <div className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "var(--blest-ink-soft)" }}>
        {content.body}
      </div>
      <div
        className="rounded-xl p-4 space-y-2"
        style={{ backgroundColor: "var(--blest-olive-softer)", border: "1px solid var(--blest-olive-soft)" }}
      >
        <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--blest-olive-ink)" }}>
          Key points
        </p>
        <ul className="space-y-1.5">
          {content.key_points.map((point, i) => (
            <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--blest-ink)" }}>
              <Check size={14} className="shrink-0 mt-0.5" style={{ color: "var(--blest-olive)" }} />
              {point}
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={onContinue}
        className="w-full h-12 text-base font-semibold rounded-xl transition-opacity hover:opacity-90"
        style={{ backgroundColor: "var(--blest-ink)", color: "var(--blest-cream)" }}
      >
        Continue →
      </button>
    </div>
  );
}
