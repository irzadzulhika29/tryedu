"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Camera,
  CameraOff,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Wifi,
  Monitor,
  Clock,
} from "lucide-react";
import Webcam from "react-webcam";

interface CheckItem {
  id: string;
  label: string;
  icon: React.ElementType;
  status: "pending" | "checking" | "passed" | "failed";
}

export default function PreCheckPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "XXX-XXX";
  const webcamRef = useRef<Webcam>(null);

  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [checks, setChecks] = useState<CheckItem[]>([
    {
      id: "browser",
      label: "Browser kompatibel",
      icon: Monitor,
      status: "pending",
    },
    {
      id: "connection",
      label: "Koneksi internet",
      icon: Wifi,
      status: "pending",
    },
    { id: "camera", label: "Kamera webcam", icon: Camera, status: "pending" },
  ]);
  const [allPassed, setAllPassed] = useState(false);

  const updateCheck = useCallback((id: string, status: CheckItem["status"]) => {
    setChecks((prev) =>
      prev.map((check) => (check.id === id ? { ...check, status } : check))
    );
  }, []);

  // Run system checks
  useEffect(() => {
    // Check browser
    setTimeout(() => {
      updateCheck("browser", "checking");
      setTimeout(() => {
        updateCheck("browser", "passed");
      }, 500);
    }, 300);

    // Check connection
    setTimeout(() => {
      updateCheck("connection", "checking");
      setTimeout(() => {
        updateCheck("connection", navigator.onLine ? "passed" : "failed");
      }, 500);
    }, 800);
  }, [updateCheck]);

  // Check camera when enabled
  useEffect(() => {
    if (cameraEnabled) {
      updateCheck("camera", "passed");
    }
  }, [cameraEnabled, updateCheck]);

  // Check if all passed
  useEffect(() => {
    const allChecksPassed = checks.every((check) => check.status === "passed");
    setAllPassed(allChecksPassed);
  }, [checks]);

  const handleCameraError = (error: string | DOMException) => {
    console.error("Camera error:", error);
    setCameraError(
      "Tidak dapat mengakses kamera. Pastikan izin kamera diberikan."
    );
    updateCheck("camera", "failed");
  };

  const handleCameraReady = () => {
    setCameraEnabled(true);
    setCameraError(null);
  };

  const startExam = () => {
    router.push(`/student/ujian/session?token=${token}`);
  };

  return (
    <div className="w-full py-8 px-4 md:px-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Persiapan Ujian
            </h1>
            <p className="text-muted-foreground">
              Token:{" "}
              <code className="font-mono bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                {token}
              </code>
            </p>
          </div>
        </div>

        {/* Camera Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Preview Kamera
            </CardTitle>
            <CardDescription>
              Kamera wajib aktif selama ujian berlangsung
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-video bg-zinc-900 rounded-lg overflow-hidden">
              {!cameraEnabled && !cameraError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <CameraOff className="h-12 w-12 mb-4 opacity-50" />
                  <p className="text-sm opacity-75">Menunggu akses kamera...</p>
                </div>
              )}
              {cameraError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-red-900/50">
                  <XCircle className="h-12 w-12 mb-4 text-red-400" />
                  <p className="text-sm text-center px-4">{cameraError}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => window.location.reload()}
                  >
                    Coba Lagi
                  </Button>
                </div>
              )}
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                className="w-full h-full object-cover"
                onUserMedia={handleCameraReady}
                onUserMediaError={handleCameraError}
                videoConstraints={{
                  facingMode: "user",
                  width: 640,
                  height: 480,
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* System Checks */}
        <Card>
          <CardHeader>
            <CardTitle>Pemeriksaan Sistem</CardTitle>
            <CardDescription>
              Pastikan semua persyaratan terpenuhi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {checks.map((check) => {
                const Icon = check.icon;
                return (
                  <div
                    key={check.id}
                    className="flex items-center gap-3 p-3 rounded-lg border bg-zinc-50 dark:bg-zinc-800/50"
                  >
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <span className="flex-1">{check.label}</span>
                    {check.status === "pending" && (
                      <span className="text-sm text-muted-foreground">
                        Menunggu
                      </span>
                    )}
                    {check.status === "checking" && (
                      <span className="text-sm text-blue-500">
                        Memeriksa...
                      </span>
                    )}
                    {check.status === "passed" && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    {check.status === "failed" && (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Warning */}
        <Card className="border-orange-200 dark:border-orange-900/50 bg-orange-50/50 dark:bg-orange-900/10">
          <CardContent className="flex items-start gap-3 pt-6">
            <AlertTriangle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-orange-700 dark:text-orange-400">
                Perhatian!
              </p>
              <ul className="mt-1 space-y-1 text-orange-600 dark:text-orange-300">
                <li>• Kamera akan terus aktif selama ujian</li>
                <li>• Dilarang membuka tab/aplikasi lain</li>
                <li>
                  • Pelanggaran akan tercatat dan dapat mengakibatkan
                  diskualifikasi
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Exam Info */}
        <Card>
          <CardContent className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold">100</p>
                <p className="text-xs text-muted-foreground">Soal</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">180 menit</p>
                  <p className="text-xs text-muted-foreground">Durasi</p>
                </div>
              </div>
            </div>
            <Button size="lg" disabled={!allPassed} onClick={startExam}>
              Mulai Ujian
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
