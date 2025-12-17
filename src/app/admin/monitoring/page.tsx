"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Users,
  Clock,
  Camera,
  CameraOff,
  AlertTriangle,
  Eye,
  Ban,
  RefreshCw,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data
const activeSessions = [
  { id: "1", name: "Tryout UTBK Saintek Batch 1", token: "UTB-2024A" },
  { id: "2", name: "UAS Matematika Kelas 11", token: "MAT-11B" },
];

const participants = [
  {
    id: "1",
    name: "Ahmad Fadillah",
    email: "ahmad@student.com",
    progress: 45,
    totalQuestions: 100,
    cameraStatus: "active" as const,
    violations: 0,
    startTime: "09:05:23",
  },
  {
    id: "2",
    name: "Budi Santoso",
    email: "budi@student.com",
    progress: 38,
    totalQuestions: 100,
    cameraStatus: "active" as const,
    violations: 1,
    startTime: "09:02:15",
  },
  {
    id: "3",
    name: "Citra Dewi",
    email: "citra@student.com",
    progress: 52,
    totalQuestions: 100,
    cameraStatus: "inactive" as const,
    violations: 2,
    startTime: "09:00:45",
  },
  {
    id: "4",
    name: "Dimas Pratama",
    email: "dimas@student.com",
    progress: 67,
    totalQuestions: 100,
    cameraStatus: "active" as const,
    violations: 0,
    startTime: "09:01:30",
  },
  {
    id: "5",
    name: "Eka Putri",
    email: "eka@student.com",
    progress: 23,
    totalQuestions: 100,
    cameraStatus: "active" as const,
    violations: 3,
    startTime: "09:08:12",
  },
];

const violationLogs = [
  {
    id: "1",
    participantName: "Citra Dewi",
    type: "tab_switch",
    time: "09:15:32",
    message: "Membuka tab lain",
  },
  {
    id: "2",
    participantName: "Budi Santoso",
    type: "tab_switch",
    time: "09:12:45",
    message: "Membuka tab lain",
  },
  {
    id: "3",
    participantName: "Citra Dewi",
    type: "camera_off",
    time: "09:10:18",
    message: "Kamera mati",
  },
  {
    id: "4",
    participantName: "Eka Putri",
    type: "tab_switch",
    time: "09:08:55",
    message: "Membuka tab lain",
  },
  {
    id: "5",
    participantName: "Eka Putri",
    type: "window_blur",
    time: "09:06:22",
    message: "Keluar dari window",
  },
];

export default function MonitoringPage() {
  const [selectedSession, setSelectedSession] = useState(activeSessions[0].id);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredParticipants = participants.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Monitoring</h1>
          <p className="text-muted-foreground">
            Pantau peserta ujian secara real-time
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedSession} onValueChange={setSelectedSession}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Pilih sesi" />
            </SelectTrigger>
            <SelectContent>
              {activeSessions.map((session) => (
                <SelectItem key={session.id} value={session.id}>
                  {session.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Peserta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              <span className="text-2xl font-bold">{participants.length}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Kamera Aktif
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-green-500" />
              <span className="text-2xl font-bold">
                {participants.filter((p) => p.cameraStatus === "active").length}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Kamera Mati
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CameraOff className="h-5 w-5 text-red-500" />
              <span className="text-2xl font-bold">
                {
                  participants.filter((p) => p.cameraStatus === "inactive")
                    .length
                }
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Pelanggaran
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <span className="text-2xl font-bold">
                {participants.reduce((sum, p) => sum + p.violations, 0)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Participants List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Daftar Peserta</CardTitle>
                  <CardDescription>
                    Peserta yang sedang mengerjakan
                  </CardDescription>
                </div>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari peserta..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredParticipants.map((participant) => (
                  <div
                    key={participant.id}
                    className="flex items-center gap-4 p-3 rounded-lg border bg-zinc-50 dark:bg-zinc-800/50"
                  >
                    {/* Camera indicator */}
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        participant.cameraStatus === "active"
                          ? "bg-green-100 dark:bg-green-900/30"
                          : "bg-red-100 dark:bg-red-900/30"
                      }`}
                    >
                      {participant.cameraStatus === "active" ? (
                        <Camera className="h-5 w-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <CameraOff className="h-5 w-5 text-red-600 dark:text-red-400" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{participant.name}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {participant.email}
                      </p>
                    </div>

                    {/* Progress */}
                    <div className="text-center">
                      <p className="text-sm font-medium">
                        {participant.progress}/{participant.totalQuestions}
                      </p>
                      <p className="text-xs text-muted-foreground">soal</p>
                    </div>

                    {/* Progress bar */}
                    <div className="w-24">
                      <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{
                            width: `${
                              (participant.progress /
                                participant.totalQuestions) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Violations */}
                    {participant.violations > 0 && (
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30">
                        <AlertTriangle className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                        <span className="text-xs font-medium text-orange-600 dark:text-orange-400">
                          {participant.violations}
                        </span>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500"
                      >
                        <Ban className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Violation Logs */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Log Pelanggaran</CardTitle>
              <CardDescription>Aktivitas mencurigakan terbaru</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {violationLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-start gap-3 p-2 rounded bg-zinc-50 dark:bg-zinc-800/50"
                  >
                    <div className="h-8 w-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">
                        {log.participantName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {log.message}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        {log.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
