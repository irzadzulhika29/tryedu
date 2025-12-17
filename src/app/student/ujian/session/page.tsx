"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Flag,
  ChevronLeft,
  ChevronRight,
  Clock,
  Camera,
  Send,
  AlertTriangle,
  CameraOff,
  CameraIcon,
} from "lucide-react";
import Webcam from "react-webcam";
import { MultipleChoice } from "@/components/questions/MultipleChoice";
import { ShortAnswer } from "@/components/questions/ShortAnswer";
import { FillBlank } from "@/components/questions/FillBlank";
import { Matching } from "@/components/questions/Matching";

// Mock questions data
const mockQuestions = [
  {
    id: "1",
    type: "multiple_choice" as const,
    text: "Diketahui fungsi f(x) = 2x² + 3x - 5. Nilai dari f(3) adalah...",
    options: ["16", "20", "22", "28"],
    correctAnswer: "C",
  },
  {
    id: "2",
    type: "multiple_choice" as const,
    text: "Dalam sebuah segitiga ABC, jika sudut A = 60° dan sudut B = 75°, maka sudut C adalah...",
    options: ["35°", "45°", "55°", "65°"],
    correctAnswer: "B",
  },
  {
    id: "3",
    type: "short_answer" as const,
    text: "Hitunglah hasil dari 15 × 8 + 45 ÷ 9",
    correctAnswer: "125",
  },
  {
    id: "4",
    type: "fill_blank" as const,
    text: "Indonesia merdeka pada tanggal ___ Agustus tahun ___.",
    blanks: ["17", "1945"],
  },
  {
    id: "5",
    type: "matching" as const,
    text: "Pasangkan negara dengan ibu kotanya:",
    pairs: [
      { left: "Indonesia", right: "Jakarta" },
      { left: "Jepang", right: "Tokyo" },
      { left: "Thailand", right: "Bangkok" },
      { left: "Malaysia", right: "Kuala Lumpur" },
    ],
  },
  {
    id: "6",
    type: "multiple_choice" as const,
    text: 'Siapakah yang menulis novel "Laskar Pelangi"?',
    options: [
      "Pramoedya Ananta Toer",
      "Andrea Hirata",
      "Tere Liye",
      "Habiburrahman El Shirazy",
    ],
    correctAnswer: "B",
  },
  {
    id: "7",
    type: "short_answer" as const,
    text: "Sebutkan nama planet terbesar di tata surya kita!",
    correctAnswer: "Jupiter",
  },
  {
    id: "8",
    type: "multiple_choice" as const,
    text: "Satuan SI untuk gaya adalah...",
    options: ["Joule", "Watt", "Newton", "Pascal"],
    correctAnswer: "C",
  },
];

type Answer = {
  value: string | string[] | Record<string, string>;
  flagged: boolean;
};

type ViolationType =
  | "tab_switch"
  | "no_face"
  | "multiple_faces"
  | "face_not_visible";

export default function ExamSessionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "XXX-XXX";
  const webcamRef = useRef<Webcam>(null);
  const violationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const faceDetectionIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [timeLeft, setTimeLeft] = useState(180 * 60); // 180 minutes in seconds
  const [violationCount, setViolationCount] = useState(0);
  const [showViolationWarning, setShowViolationWarning] = useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [webcamEnabled, setWebcamEnabled] = useState(true);
  const [webcamError, setWebcamError] = useState<string | null>(null);
  const [lastViolationType, setLastViolationType] =
    useState<ViolationType | null>(null);
  const [violationLog, setViolationLog] = useState<
    { type: ViolationType; timestamp: number; screenshot?: string }[]
  >([]);

  const questions = mockQuestions;
  const question = questions[currentQuestion];

  // Handle webcam error
  const handleWebcamError = useCallback((error: string | DOMException) => {
    console.error("Webcam error:", error);
    setWebcamError(
      "Tidak dapat mengakses kamera. Pastikan kamera tidak digunakan aplikasi lain."
    );
    setWebcamEnabled(false);
  }, []);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Tab/Window visibility detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setViolationCount((prev) => {
          const newCount = prev + 1;
          setLastViolationType("tab_switch");

          // Capture screenshot if webcam is available
          const screenshot = webcamRef.current?.getScreenshot();

          // Log the violation with timestamp and optional screenshot
          setViolationLog((prev) => [
            ...prev,
            {
              type: "tab_switch",
              timestamp: Date.now(),
              screenshot: screenshot || undefined,
            },
          ]);

          if (newCount >= 3) {
            // Auto-submit (disqualify)
            handleSubmit();
          } else {
            setShowViolationWarning(true);
          }
          return newCount;
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Face detection simulation (in a real app, you'd use a computer vision library)
  useEffect(() => {
    if (!webcamEnabled || webcamError) return;

    faceDetectionIntervalRef.current = setInterval(() => {
      try {
        // Simulate face detection by checking if webcam feed is available
        // In a real app, we would analyze the video feed to detect face presence
        const video = webcamRef.current?.video;
        if (video) {
          // In a real implementation, we would run face detection here
          // This is just a simulation
          const hasFace = Math.random() > 0.1; // Simulate 90% of the time face is detected

          if (!hasFace) {
            setViolationCount((prev) => {
              const newCount = prev + 1;
              setLastViolationType("no_face");

              // Capture screenshot on violation
              const screenshot = webcamRef.current?.getScreenshot();

              // Log the violation with timestamp and optional screenshot
              setViolationLog((prev) => [
                ...prev,
                {
                  type: "no_face",
                  timestamp: Date.now(),
                  screenshot: screenshot || undefined,
                },
              ]);

              if (newCount >= 3) {
                handleSubmit();
              } else {
                setShowViolationWarning(true);
              }
              return newCount;
            });
          }
        }
      } catch (error) {
        console.error("Face detection error:", error);
      }
    }, 5000); // Check every 5 seconds

    return () => {
      if (faceDetectionIntervalRef.current) {
        clearInterval(faceDetectionIntervalRef.current);
      }
    };
  }, [webcamEnabled, webcamError]);

  // Request notification permission when exam starts
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswer = useCallback(
    (questionId: string, value: Answer["value"]) => {
      setAnswers((prev) => ({
        ...prev,
        [questionId]: {
          ...prev[questionId],
          value,
          flagged: prev[questionId]?.flagged || false,
        },
      }));
    },
    []
  );

  const toggleFlag = () => {
    setAnswers((prev) => ({
      ...prev,
      [question.id]: {
        ...prev[question.id],
        value: prev[question.id]?.value || "",
        flagged: !prev[question.id]?.flagged,
      },
    }));
  };

  const goToQuestion = (index: number) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestion(index);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // In a real app, we would save answers to backend
      console.log("Submitting answers:", answers);
      console.log("Violations:", violationCount);
      console.log("Violation log:", violationLog);

      // Send violation log to backend if there are violations
      if (violationLog.length > 0) {
        // In a real implementation, we would send the violation data to a backend API
        // This could include the screenshots and timestamps of violations
        try {
          const response = await fetch("/api/exam-violations", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token,
              violations: violationLog,
              violationCount,
              answers: Object.keys(answers).length, // Number of answered questions
              totalQuestions: questions.length,
            }),
          });

          if (!response.ok) {
            console.error(
              "Failed to submit violation report:",
              response.statusText
            );
          }
        } catch (err) {
          console.error("Error submitting violation report:", err);
        }
      }

      // Send answers to backend as well
      try {
        const response = await fetch("/api/submit-answers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            answers,
            timeLeft,
            violationCount,
          }),
        });

        if (!response.ok) {
          console.error("Failed to submit answers:", response.statusText);
        }
      } catch (err) {
        console.error("Error submitting answers:", err);
      }

      // Navigate to completion page regardless of API success for simulation
      router.push("/student/ujian/selesai");
    } catch (error) {
      console.error("Submission error:", error);
      // Navigate to completion page anyway for simulation
      router.push("/student/ujian/selesai");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getQuestionStatus = (index: number) => {
    const q = questions[index];
    const answer = answers[q.id];
    if (answer?.flagged) return "flagged";
    if (answer?.value) return "answered";
    return "unanswered";
  };

  const answeredCount = Object.keys(answers).filter(
    (id) => answers[id]?.value
  ).length;

  const violationMessages: Record<ViolationType, string> = {
    tab_switch: "Membuka tab/aplikasi lain",
    no_face: "Wajah tidak terdeteksi di kamera",
    multiple_faces: "Wajah lain terdeteksi",
    face_not_visible: "Wajah tidak terlihat dengan jelas",
  };

  return (
    <div className="flex h-screen bg-zinc-100 dark:bg-zinc-900">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex items-center justify-between h-14 px-4 bg-white dark:bg-zinc-800 border-b">
          <div className="flex items-center gap-4">
            <span className="font-medium">
              Soal {currentQuestion + 1} dari {questions.length}
            </span>
            <Button
              variant={answers[question.id]?.flagged ? "default" : "outline"}
              size="sm"
              onClick={toggleFlag}
            >
              <Flag className="h-4 w-4 mr-1" />
              {answers[question.id]?.flagged ? "Ditandai" : "Tandai"}
            </Button>
          </div>

          {/* Timer */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-sm ${
              timeLeft < 300
                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                : timeLeft < 600
                ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                : "bg-zinc-100 dark:bg-zinc-700"
            }`}
          >
            <Clock className="h-4 w-4" />
            {formatTime(timeLeft)}
          </div>

          {/* Camera Status */}
          <div className="flex items-center gap-2">
            {webcamError ? (
              <div className="flex items-center gap-1 px-2 py-1 rounded bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs">
                <CameraOff className="h-3 w-3" />
                <span>Kamera bermasalah</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 px-2 py-1 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs">
                <CameraIcon className="h-3 w-3" />
                <span>Kamera aktif</span>
              </div>
            )}
          </div>
        </header>

        {/* Question Area */}
        <main className="flex-1 overflow-auto p-6">
          <Card className="max-w-3xl mx-auto">
            <CardContent className="p-6">
              {question.type === "multiple_choice" && (
                <MultipleChoice
                  question={question}
                  answer={answers[question.id]?.value as string}
                  onAnswer={(value) => handleAnswer(question.id, value)}
                />
              )}
              {question.type === "short_answer" && (
                <ShortAnswer
                  question={question}
                  answer={answers[question.id]?.value as string}
                  onAnswer={(value) => handleAnswer(question.id, value)}
                />
              )}
              {question.type === "fill_blank" && (
                <FillBlank
                  question={question}
                  answer={answers[question.id]?.value as string[]}
                  onAnswer={(value) => handleAnswer(question.id, value)}
                />
              )}
              {question.type === "matching" && (
                <Matching
                  question={question}
                  answer={answers[question.id]?.value as Record<string, string>}
                  onAnswer={(value) => handleAnswer(question.id, value)}
                />
              )}
            </CardContent>
          </Card>
        </main>

        {/* Navigation */}
        <footer className="flex items-center justify-between h-16 px-4 bg-white dark:bg-zinc-800 border-t">
          <Button
            variant="outline"
            onClick={() => goToQuestion(currentQuestion - 1)}
            disabled={currentQuestion === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Sebelumnya
          </Button>

          <span className="text-sm text-muted-foreground">
            {answeredCount} dari {questions.length} terjawab
          </span>

          {currentQuestion === questions.length - 1 ? (
            <Button onClick={() => setShowSubmitDialog(true)}>
              <Send className="h-4 w-4 mr-1" />
              Kumpulkan
            </Button>
          ) : (
            <Button onClick={() => goToQuestion(currentQuestion + 1)}>
              Selanjutnya
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </footer>
      </div>

      {/* Question Navigation Sidebar */}
      <aside className="w-64 bg-white dark:bg-zinc-800 border-l p-4 overflow-auto">
        <h3 className="font-medium mb-4">Navigasi Soal</h3>
        <div className="grid grid-cols-5 gap-2">
          {questions.map((q, index) => {
            const status = getQuestionStatus(index);
            return (
              <button
                key={q.id}
                onClick={() => goToQuestion(index)}
                className={`h-9 w-9 rounded text-sm font-medium transition-colors
                  ${
                    currentQuestion === index
                      ? "ring-2 ring-primary ring-offset-2"
                      : ""
                  }
                  ${
                    status === "answered"
                      ? "bg-green-500 text-white"
                      : status === "flagged"
                      ? "bg-orange-500 text-white"
                      : "bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300"
                  }
                `}
              >
                {index + 1}
              </button>
            );
          })}
        </div>

        <div className="mt-6 space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-green-500" />
            <span>Terjawab</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-orange-500" />
            <span>Ditandai</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-zinc-100 dark:bg-zinc-700" />
            <span>Belum dijawab</span>
          </div>
        </div>

        {/* Violation indicator */}
        {violationCount > 0 && (
          <div className="mt-6 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">
                Pelanggaran: {violationCount}/3
              </span>
            </div>
            {lastViolationType && (
              <p className="text-xs mt-1 text-red-600 dark:text-red-400">
                Terakhir: {violationMessages[lastViolationType]}
              </p>
            )}
          </div>
        )}

        {/* Webcam preview */}
        <div className="mt-6">
          <h3 className="font-medium mb-2">Preview Kamera</h3>
          <div className="relative w-full h-32 rounded overflow-hidden bg-zinc-900 border">
            {webcamError ? (
              <div className="w-full h-full flex items-center justify-center text-zinc-400">
                <CameraOff className="h-8 w-8" />
              </div>
            ) : (
              <Webcam
                ref={webcamRef}
                audio={false}
                className="w-full h-full object-cover"
                videoConstraints={{ facingMode: "user" }}
                onUserMedia={() => setWebcamEnabled(true)}
                onUserMediaError={handleWebcamError}
                screenshotFormat="image/jpeg"
              />
            )}
            {!webcamError && (
              <div className="absolute bottom-1 right-1">
                <Camera className="h-3 w-3 text-white drop-shadow" />
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Violation Warning Dialog */}
      <Dialog
        open={showViolationWarning}
        onOpenChange={(open) => {
          if (!open) setShowViolationWarning(false);
        }}
        modal={true}
      >
        <DialogContent
          className="sm:max-w-md"
          aria-describedby="violation-warning-description"
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Peringatan Pelanggaran!
            </DialogTitle>
            <DialogDescription id="violation-warning-description">
              {lastViolationType &&
                `Terjadi pelanggaran: ${violationMessages[lastViolationType]}.`}
              <br />
              Ini adalah peringatan ke-{violationCount} dari 3. Pelanggaran
              selanjutnya akan mengakibatkan diskualifikasi.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowViolationWarning(false)} autoFocus>
              Saya Mengerti
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Submit Confirmation Dialog */}
      <Dialog
        open={showSubmitDialog}
        onOpenChange={(open) => {
          if (!open) setShowSubmitDialog(false);
        }}
        modal={true}
      >
        <DialogContent aria-describedby="submit-dialog-description">
          <DialogHeader>
            <DialogTitle>Kumpulkan Jawaban?</DialogTitle>
            <DialogDescription id="submit-dialog-description">
              Anda telah menjawab {answeredCount} dari {questions.length} soal.
              {answeredCount < questions.length && (
                <span className="block mt-2 text-orange-600">
                  Masih ada {questions.length - answeredCount} soal yang belum
                  dijawab!
                </span>
              )}
              {violationCount > 0 && (
                <span className="block mt-2 text-red-600">
                  Anda telah melakukan {violationCount} pelanggaran selama
                  ujian.
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowSubmitDialog(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setShowSubmitDialog(false);
                }
              }}
            >
              Kembali
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            >
              {isSubmitting ? "Mengirim..." : "Ya, Kumpulkan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
