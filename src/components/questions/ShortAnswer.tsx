"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ShortAnswerProps {
  question: {
    id: string;
    text: string;
  };
  answer?: string;
  onAnswer: (value: string) => void;
}

export function ShortAnswer({ question, answer, onAnswer }: ShortAnswerProps) {
  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg font-medium leading-relaxed">{question.text}</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`answer-${question.id}`}>Jawaban Anda</Label>
        <Input
          id={`answer-${question.id}`}
          type="text"
          placeholder="Ketik jawaban Anda di sini..."
          value={answer || ""}
          onChange={(e) => onAnswer(e.target.value)}
          className="text-base"
        />
        <p className="text-sm text-muted-foreground">
          Tuliskan jawaban singkat sesuai dengan pertanyaan di atas
        </p>
      </div>
    </div>
  );
}
