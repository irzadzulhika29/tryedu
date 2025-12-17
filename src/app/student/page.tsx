"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Key,
  ArrowRight,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  FileText,
} from "lucide-react";

// Mock data for exam history
const examHistory = [
  {
    id: "1",
    name: "Tryout UTBK Saintek 2024",
    date: "2024-01-15",
    score: 85,
    totalQuestions: 100,
    status: "completed" as const,
  },
  {
    id: "2",
    name: "Latihan Matematika Dasar",
    date: "2024-01-10",
    score: 72,
    totalQuestions: 50,
    status: "completed" as const,
  },
  {
    id: "3",
    name: "Tryout Bahasa Inggris",
    date: "2024-01-05",
    score: null,
    totalQuestions: 60,
    status: "disqualified" as const,
  },
];

export default function StudentDashboard() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!token.trim()) {
      setError("Masukkan token ujian");
      return;
    }

    // Simulate token validation
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Navigate to pre-check page
      router.push(`/student/ujian/pre-check?token=${token}`);
    }, 1000);
  };

  return (
    <div className="w-full py-8 px-4 md:px-6">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Selamat Datang!</h1>
          <p className="text-muted-foreground">
            Masukkan token ujian untuk memulai
          </p>
        </div>

        {/* Token Input Card */}
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Masuk ke Ujian
            </CardTitle>
            <CardDescription>
              Masukkan kode token yang diberikan oleh pengawas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="token">Token Ujian</Label>
                <Input
                  id="token"
                  placeholder="contoh: ABC-123"
                  value={token}
                  onChange={(e) => setToken(e.target.value.toUpperCase())}
                  className="text-center text-lg font-mono tracking-wider"
                  maxLength={10}
                />
                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  "Memverifikasi..."
                ) : (
                  <>
                    Mulai Ujian
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Exam History */}
        <Card>
          <CardHeader>
            <CardTitle>Riwayat Ujian</CardTitle>
            <CardDescription>Ujian yang pernah kamu kerjakan</CardDescription>
          </CardHeader>
          <CardContent>
            {examHistory.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Belum ada riwayat ujian</p>
              </div>
            ) : (
              <div className="space-y-3">
                {examHistory.map((exam) => (
                  <div
                    key={exam.id}
                    className="flex items-center gap-4 p-4 rounded-lg border bg-zinc-50 dark:bg-zinc-800/50"
                  >
                    {/* Status Icon */}
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        exam.status === "completed"
                          ? "bg-green-100 dark:bg-green-900/30"
                          : "bg-red-100 dark:bg-red-900/30"
                      }`}
                    >
                      {exam.status === "completed" ? (
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{exam.name}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(exam.date).toLocaleDateString("id-ID")}
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          {exam.totalQuestions} soal
                        </span>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="text-right">
                      {exam.status === "completed" ? (
                        <>
                          <p className="text-2xl font-bold">{exam.score}</p>
                          <p className="text-xs text-muted-foreground">Nilai</p>
                        </>
                      ) : (
                        <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                          Diskualifikasi
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Syarat Ujian</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Koneksi internet stabil
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Kamera webcam berfungsi
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Browser Chrome/Firefox terbaru
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Peraturan Ujian</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-500" />
                  Kamera harus aktif selama ujian
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-500" />
                  Dilarang membuka tab/aplikasi lain
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-500" />
                  3x pelanggaran = diskualifikasi
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
