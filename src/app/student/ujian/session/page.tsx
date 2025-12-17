import ExamSessionContent from "./ExamSessionContent";
import { Suspense } from "react";

export default function ExamSessionPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen bg-zinc-100 dark:bg-zinc-900">Loading exam session...</div>}>
      <ExamSessionContent />
    </Suspense>
  );
}
