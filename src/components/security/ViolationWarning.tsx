"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, XCircle } from "lucide-react";

interface ViolationWarningProps {
  open: boolean;
  onClose: () => void;
  violationType: "tab_switch" | "window_blur" | "camera_off";
  currentCount: number;
  maxCount: number;
}

const violationMessages = {
  tab_switch: {
    title: "Tab Terdeteksi!",
    description: "Anda terdeteksi membuka tab lain.",
  },
  window_blur: {
    title: "Keluar dari Window!",
    description: "Anda terdeteksi meninggalkan halaman ujian.",
  },
  camera_off: {
    title: "Kamera Mati!",
    description: "Kamera Anda terdeteksi tidak aktif.",
  },
};

export function ViolationWarning({
  open,
  onClose,
  violationType,
  currentCount,
  maxCount,
}: ViolationWarningProps) {
  const isDisqualified = currentCount >= maxCount;
  const message = violationMessages[violationType];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle
            className={`flex items-center gap-2 ${
              isDisqualified ? "text-red-600" : "text-orange-600"
            }`}
          >
            {isDisqualified ? (
              <XCircle className="h-5 w-5" />
            ) : (
              <AlertTriangle className="h-5 w-5" />
            )}
            {isDisqualified ? "Diskualifikasi!" : message.title}
          </DialogTitle>
          <DialogDescription className="space-y-3">
            <p>{message.description}</p>
            {!isDisqualified ? (
              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <p className="text-sm font-medium text-orange-700 dark:text-orange-400">
                  Peringatan {currentCount} dari {maxCount}
                </p>
                <p className="text-xs text-orange-600 dark:text-orange-300 mt-1">
                  {maxCount - currentCount} pelanggaran lagi akan mengakibatkan
                  diskualifikasi otomatis.
                </p>
              </div>
            ) : (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <p className="text-sm font-medium text-red-700 dark:text-red-400">
                  Anda telah melanggar batas maksimal pelanggaran.
                </p>
                <p className="text-xs text-red-600 dark:text-red-300 mt-1">
                  Ujian Anda telah otomatis dikumpulkan dan ditandai sebagai
                  diskualifikasi.
                </p>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onClose} className="w-full">
            {isDisqualified ? "Tutup" : "Saya Mengerti"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
