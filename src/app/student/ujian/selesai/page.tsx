"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home, FileText, Clock, BarChart3 } from "lucide-react";

export default function ExamCompletePage() {
  return (
    <div className="w-full py-16 px-4 md:px-6">
      <div className="text-center space-y-6">
        {/* Success Icon */}
        <div className="mx-auto w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Ujian Selesai!</h1>
          <p className="text-muted-foreground">
            Jawaban Anda telah berhasil dikumpulkan
          </p>
        </div>

        {/* Summary Card */}
        <Card className="text-left">
          <CardHeader>
            <CardTitle>Ringkasan</CardTitle>
            <CardDescription>Detail pengerjaan ujian Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
                <FileText className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                <p className="text-2xl font-bold">8</p>
                <p className="text-xs text-muted-foreground">Soal Dijawab</p>
              </div>
              <div className="text-center p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
                <Clock className="h-6 w-6 mx-auto mb-2 text-orange-500" />
                <p className="text-2xl font-bold">45:32</p>
                <p className="text-xs text-muted-foreground">Waktu Digunakan</p>
              </div>
              <div className="text-center p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
                <BarChart3 className="h-6 w-6 mx-auto mb-2 text-green-500" />
                <p className="text-2xl font-bold">-</p>
                <p className="text-xs text-muted-foreground">Nilai</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center mt-4">
              Nilai akan diumumkan setelah semua peserta selesai mengerjakan
            </p>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link href="/student">
              <Home className="h-4 w-4 mr-2" />
              Kembali ke Dashboard
            </Link>
          </Button>
        </div>

        {/* Tips */}
        <div className="pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            Terima kasih telah menggunakan EduTry. Semoga sukses!
          </p>
        </div>
      </div>
    </div>
  );
}
