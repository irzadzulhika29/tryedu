"use client";

import { useState, useEffect, useCallback } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExamTimerProps {
  initialSeconds: number;
  onTimeUp?: () => void;
  onWarning?: (secondsLeft: number) => void;
  warningThreshold?: number;
  criticalThreshold?: number;
  className?: string;
}

export function ExamTimer({
  initialSeconds,
  onTimeUp,
  onWarning,
  warningThreshold = 600, // 10 minutes
  criticalThreshold = 300, // 5 minutes
  className,
}: ExamTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [hasWarned, setHasWarned] = useState(false);

  const formatTime = useCallback((seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hrs > 0) {
      return `${hrs.toString().padStart(2, "0")}:${mins
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  useEffect(() => {
    if (!hasWarned && timeLeft <= warningThreshold && timeLeft > 0) {
      setHasWarned(true);
      onWarning?.(timeLeft);
    }
  }, [timeLeft, warningThreshold, hasWarned, onWarning]);

  const getTimerStyle = () => {
    if (timeLeft <= criticalThreshold) {
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 animate-pulse";
    }
    if (timeLeft <= warningThreshold) {
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
    }
    return "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300";
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-sm font-medium transition-colors",
        getTimerStyle(),
        className
      )}
    >
      <Clock className="h-4 w-4" />
      <span>{formatTime(timeLeft)}</span>
    </div>
  );
}
