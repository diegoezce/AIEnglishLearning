"use client";

import { BookOpen } from "lucide-react";
import { VocabularyContent } from "@/types";

interface Props {
  content: VocabularyContent;
  onContinue: () => void;
}

export function VocabularyCard({ content, onContinue }: Props) {
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{ backgroundColor: "var(--blest-olive-soft)" }}
      >
        <BookOpen size={32} style={{ color: "var(--blest-olive)" }} />
      </div>
      <div
        className="rounded-2xl p-6 w-full text-center space-y-3"
        style={{
          backgroundColor: "var(--blest-olive-softer)",
          border: "1px solid var(--blest-olive-soft)",
        }}
      >
        <p
          className="text-2xl font-bold"
          style={{ color: "var(--blest-ink)", fontFamily: "var(--font-newsreader)" }}
        >
          {content.word}
        </p>
        <p className="text-sm font-mono" style={{ color: "var(--blest-olive)" }}>{content.phonetic}</p>
        <p className="text-base leading-relaxed" style={{ color: "var(--blest-ink-soft)" }}>{content.definition}</p>
      </div>
      <div
        className="rounded-xl p-4 w-full"
        style={{ backgroundColor: "#fffbeb", border: "1px solid #fef3c7" }}
      >
        <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "#b45309" }}>Example</p>
        <p className="text-sm italic" style={{ color: "var(--blest-ink-soft)" }}>"{content.example}"</p>
      </div>
      <button
        onClick={onContinue}
        className="w-full h-12 text-base font-semibold rounded-xl transition-opacity hover:opacity-90"
        style={{ backgroundColor: "var(--blest-ink)", color: "var(--blest-cream)" }}
      >
        Got it →
      </button>
    </div>
  );
}
