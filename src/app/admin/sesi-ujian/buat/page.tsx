"use client";

import { useState } from "react";
import Link from "next/link";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Key, Copy, Check, Calendar, Clock } from "lucide-react";

// Mock data for question packages
const questionPackages = [
  { id: "1", name: "Tryout UTBK Saintek 2024", questionCount: 100 },
  { id: "2", name: "UAS Matematika Kelas 12", questionCount: 40 },
  { id: "3", name: "Latihan Fisika Bab 1-5", questionCount: 50 },
  { id: "4", name: "Tryout Bahasa Inggris", questionCount: 60 },
];

export default function BuatSesiUjianPage() {
  const [sessionName, setSessionName] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [duration, setDuration] = useState("90");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [generatedToken, setGeneratedToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generateToken = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let token = "";
    for (let i = 0; i < 3; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    token += "-";
    for (let i = 0; i < 3; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedToken(token);
  };

  const copyToken = () => {
    if (generatedToken) {
      navigator.clipboard.writeText(generatedToken);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/sesi-ujian">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Buat Sesi Ujian</h1>
          <p className="text-muted-foreground">Jadwalkan sesi ujian baru</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Session Info */}
          <Card>
            <CardHeader>
              <CardTitle>Informasi Sesi</CardTitle>
              <CardDescription>Detail dasar sesi ujian</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Sesi</Label>
                <Input
                  id="name"
                  placeholder="contoh: Tryout UTBK Saintek Batch 1"
                  value={sessionName}
                  onChange={(e) => setSessionName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="package">Paket Soal</Label>
                <Select
                  value={selectedPackage}
                  onValueChange={setSelectedPackage}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih paket soal" />
                  </SelectTrigger>
                  <SelectContent>
                    {questionPackages.map((pkg) => (
                      <SelectItem key={pkg.id} value={pkg.id}>
                        {pkg.name} ({pkg.questionCount} soal)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Durasi (menit)</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="90"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Schedule */}
          <Card>
            <CardHeader>
              <CardTitle>Jadwal</CardTitle>
              <CardDescription>
                Atur waktu mulai dan berakhirnya sesi
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Tanggal Mulai</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="startDate"
                      type="date"
                      className="pl-9"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startTime">Waktu Mulai</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="startTime"
                      type="time"
                      className="pl-9"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="endDate">Tanggal Berakhir</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="endDate"
                      type="date"
                      className="pl-9"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">Waktu Berakhir</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="endTime"
                      type="time"
                      className="pl-9"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Token Generator */}
          <Card>
            <CardHeader>
              <CardTitle>Token Akses</CardTitle>
              <CardDescription>Generate kode untuk peserta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {generatedToken ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border-2 border-dashed border-primary/20">
                    <code className="text-2xl font-bold font-mono tracking-wider text-primary">
                      {generatedToken}
                    </code>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={copyToken}
                      className="h-10 w-10"
                    >
                      {copied ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <Copy className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    Bagikan token ini kepada peserta
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={generateToken}
                  >
                    <Key className="h-4 w-4 mr-2" />
                    Generate Ulang
                  </Button>
                </div>
              ) : (
                <Button className="w-full" onClick={generateToken}>
                  <Key className="h-4 w-4 mr-2" />
                  Generate Token
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Aksi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                className="w-full"
                disabled={!sessionName || !selectedPackage}
              >
                Simpan & Publikasi
              </Button>
              <Button variant="outline" className="w-full">
                Simpan sebagai Draft
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
