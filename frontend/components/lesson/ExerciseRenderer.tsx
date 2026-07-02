"use client";

import { Exercise, FreeTextContent, MultipleChoiceContent, FillInBlankContent, MatchingContent, DragDropContent, VocabularyContent, ReadingContent } from "@/types";
import { VocabularyCard } from "./exercises/VocabularyCard";
import { ReadingBlock } from "./exercises/ReadingBlock";
import { MultipleChoice } from "./exercises/MultipleChoice";
import { FillInBlank } from "./exercises/FillInBlank";
import { MatchingPairs } from "./exercises/MatchingPairs";
import { DragDrop } from "./exercises/DragDrop";
import { FreeTextPrompt } from "./exercises/FreeTextPrompt";

interface Props {
  exercise: Exercise;
  onSubmit: (isCorrect: boolean, explanation: string) => void;
  onSubmitFreeText: (answer: string) => Promise<void>;
  onContinueInfo: () => void;
  isAiLoading: boolean;
}

export function ExerciseRenderer({ exercise, onSubmit, onSubmitFreeText, onContinueInfo, isAiLoading }: Props) {
  switch (exercise.exercise_type) {
    case "vocabulary":
      return <VocabularyCard content={exercise.content as VocabularyContent} onContinue={onContinueInfo} />;
    case "reading":
      return <ReadingBlock content={exercise.content as ReadingContent} onContinue={onContinueInfo} />;
    case "multiple_choice":
      return <MultipleChoice content={exercise.content as MultipleChoiceContent} onSubmit={onSubmit} />;
    case "fill_in_blank":
      return <FillInBlank content={exercise.content as FillInBlankContent} onSubmit={onSubmit} />;
    case "matching":
      return <MatchingPairs content={exercise.content as MatchingContent} onSubmit={onSubmit} />;
    case "drag_drop":
      return <DragDrop content={exercise.content as DragDropContent} onSubmit={onSubmit} />;
    case "free_text":
      return <FreeTextPrompt content={exercise.content as FreeTextContent} onSubmit={onSubmitFreeText} isLoading={isAiLoading} />;
    default:
      return <div className="text-gray-400 text-sm">Unknown exercise type</div>;
  }
}
