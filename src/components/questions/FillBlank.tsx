"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

interface FillBlankProps {
  question: {
    id: string;
    text: string;
    blanks: string[];
  };
  answer?: string[];
  onAnswer: (value: string[]) => void;
}

export function FillBlank({ question, answer, onAnswer }: FillBlankProps) {
  const [answers, setAnswers] = useState<string[]>(answer || []);

  // Parse text to find blank positions
  const parts = question.text.split(/___/);
  const blankCount = parts.length - 1;

  useEffect(() => {
    // Initialize answers array if needed
    if (answers.length !== blankCount) {
      setAnswers(new Array(blankCount).fill(""));
    }
  }, [blankCount, answers.length]);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
    onAnswer(newAnswers);
  };

  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg font-medium leading-relaxed">
          Lengkapi kalimat berikut:
        </p>
      </div>

      <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
        <p className="text-lg leading-loose">
          {parts.map((part, index) => (
            <span key={index}>
              {part}
              {index < parts.length - 1 && (
                <Input
                  type="text"
                  value={answers[index] || ""}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className="inline-block w-32 mx-1 text-center text-base h-9 border-b-2 border-t-0 border-x-0 rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-primary"
                  placeholder={`(${index + 1})`}
                />
              )}
            </span>
          ))}
        </p>
      </div>

      <p className="text-sm text-muted-foreground">
        Isi bagian yang kosong dengan jawaban yang tepat
      </p>
    </div>
  );
}
