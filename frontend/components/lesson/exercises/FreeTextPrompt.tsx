"use client";

import { useState } from "react";
import { Bot, Loader2 } from "lucide-react";
import { FreeTextContent } from "@/types";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  content: FreeTextContent;
  onSubmit: (answer: string) => Promise<void>;
  isLoading: boolean;
}

export function FreeTextPrompt({ content, onSubmit, isLoading }: Props) {
  const [value, setValue] = useState("");
  const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
  const meetsMinimum = wordCount >= content.min_words;

  return (
    <div className="flex flex-col gap-5 w-full max-w-lg mx-auto">
      <div className="flex items-start gap-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: "var(--blest-olive-soft)" }}
        >
          <Bot size={18} style={{ color: "var(--blest-olive)" }} />
        </div>
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--blest-olive)" }}>
            AI Challenge
          </p>
          <p className="text-base font-semibold" style={{ color: "var(--blest-ink)" }}>{content.instruction}</p>
        </div>
      </div>
      <div
        className="rounded-xl p-4 text-sm"
        style={{ backgroundColor: "#fffbeb", border: "1px solid #fef3c7", color: "#92400e" }}
      >
        <span className="font-semibold">Situation: </span>{content.context}
      </div>
      <div className="space-y-2">
        <Textarea
          placeholder="Write your AI prompt here..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="min-h-[140px] resize-none rounded-xl text-sm"
          style={{ borderColor: "var(--blest-cream-dark)", backgroundColor: "white" }}
          disabled={isLoading}
        />
        <div className="flex justify-between items-center text-xs" style={{ color: "var(--blest-ink-soft)", opacity: 0.6 }}>
          <span>{wordCount} words</span>
          {!meetsMinimum && <span>Minimum {content.min_words} words</span>}
        </div>
      </div>
      <button
        onClick={() => onSubmit(value)}
        disabled={!meetsMinimum || isLoading}
        className="w-full h-12 text-base font-semibold rounded-xl transition-opacity hover:opacity-90 disabled:opacity-40 flex items-center justify-center gap-2"
        style={{ backgroundColor: "var(--blest-ink)", color: "var(--blest-cream)" }}
      >
        {isLoading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            AI is evaluating…
          </>
        ) : (
          "Submit for AI Review"
        )}
      </button>
    </div>
  );
}
