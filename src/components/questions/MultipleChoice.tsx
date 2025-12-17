"use client";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface MultipleChoiceProps {
  question: {
    id: string;
    text: string;
    options: string[];
  };
  answer?: string;
  onAnswer: (value: string) => void;
}

export function MultipleChoice({
  question,
  answer,
  onAnswer,
}: MultipleChoiceProps) {
  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg font-medium leading-relaxed">{question.text}</p>
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => {
          const optionLabel = String.fromCharCode(65 + index); // A, B, C, D
          const isSelected = answer === optionLabel;

          return (
            <button
              key={index}
              onClick={() => onAnswer(optionLabel)}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-lg border-2 text-left transition-all",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600"
              )}
            >
              <span
                className={cn(
                  "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm",
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                )}
              >
                {optionLabel}
              </span>
              <span className={cn("flex-1", isSelected && "font-medium")}>
                {option}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
