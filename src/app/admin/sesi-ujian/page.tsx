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
import {
  Plus,
  Search,
  MoreHorizontal,
  Calendar,
  Users,
  Clock,
  Play,
  Pause,
  Copy,
  Pencil,
  Trash2,
  Eye,
  Key,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data
const examSessions = [
  {
    id: "1",
    name: "Tryout UTBK Saintek Batch 1",
    packageName: "Tryout UTBK Saintek 2024",
    token: "UTB-2024A",
    duration: 180,
    startTime: "2024-01-20T09:00:00",
    endTime: "2024-01-20T12:00:00",
    participants: 45,
    status: "active",
  },
  {
    id: "2",
    name: "UAS Matematika Kelas 12A",
    packageName: "UAS Matematika Kelas 12",
    token: "MAT-12A",
    duration: 120,
    startTime: "2024-01-22T10:00:00",
    endTime: "2024-01-22T12:00:00",
    participants: 0,
    status: "scheduled",
  },
  {
    id: "3",
    name: "Latihan Fisika Mingguan",
    packageName: "Latihan Fisika Bab 1-5",
    token: "FIS-W01",
    duration: 90,
    startTime: "2024-01-15T14:00:00",
    endTime: "2024-01-15T15:30:00",
    participants: 32,
    status: "finished",
  },
];

const statusConfig = {
  active: {
    label: "Berlangsung",
    color:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  scheduled: {
    label: "Terjadwal",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  finished: {
    label: "Selesai",
    color: "bg-zinc-100 text-zinc-700 dark:bg-zinc-700/30 dark:text-zinc-400",
  },
};

export default function SesiUjianPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSessions = examSessions.filter(
    (session) =>
      session.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.token.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const copyToken = (token: string) => {
    navigator.clipboard.writeText(token);
    // Could add toast notification here
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sesi Ujian</h1>
          <p className="text-muted-foreground">Kelola jadwal dan sesi ujian</p>
        </div>
        <Button asChild>
          <Link href="/admin/sesi-ujian/buat">
            <Plus className="h-4 w-4 mr-2" />
            Buat Sesi Baru
          </Link>
        </Button>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari sesi atau token..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Sessions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Sesi</CardTitle>
          <CardDescription>{examSessions.length} sesi ujian</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 font-medium text-muted-foreground">
                    Nama Sesi
                  </th>
                  <th className="pb-3 font-medium text-muted-foreground">
                    Token
                  </th>
                  <th className="pb-3 font-medium text-muted-foreground">
                    Waktu
                  </th>
                  <th className="pb-3 font-medium text-muted-foreground">
                    Durasi
                  </th>
                  <th className="pb-3 font-medium text-muted-foreground">
                    Peserta
                  </th>
                  <th className="pb-3 font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="pb-3 font-medium text-muted-foreground"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredSessions.map((session) => (
                  <tr key={session.id} className="group">
                    <td className="py-4">
                      <div>
                        <p className="font-medium">{session.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {session.packageName}
                        </p>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <code className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-sm font-mono">
                          {session.token}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => copyToken(session.token)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {new Date(session.startTime).toLocaleDateString(
                          "id-ID",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(session.startTime).toLocaleTimeString(
                          "id-ID",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}{" "}
                        -{" "}
                        {new Date(session.endTime).toLocaleTimeString("id-ID", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        {session.duration} menit
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {session.participants}
                      </div>
                    </td>
                    <td className="py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          statusConfig[
                            session.status as keyof typeof statusConfig
                          ].color
                        }`}
                      >
                        {
                          statusConfig[
                            session.status as keyof typeof statusConfig
                          ].label
                        }
                      </span>
                    </td>
                    <td className="py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            Lihat Detail
                          </DropdownMenuItem>
                          {session.status === "active" && (
                            <DropdownMenuItem>
                              <Users className="h-4 w-4 mr-2" />
                              Monitoring
                            </DropdownMenuItem>
                          )}
                          {session.status === "scheduled" && (
                            <>
                              <DropdownMenuItem>
                                <Play className="h-4 w-4 mr-2" />
                                Mulai Sekarang
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                            </>
                          )}
                          {session.status === "active" && (
                            <DropdownMenuItem>
                              <Pause className="h-4 w-4 mr-2" />
                              Hentikan
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <Key className="h-4 w-4 mr-2" />
                            Regenerasi Token
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredSessions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium">Tidak ada sesi ditemukan</h3>
              <p className="mb-4">Buat sesi ujian baru untuk memulai</p>
              <Button asChild>
                <Link href="/admin/sesi-ujian/buat">
                  <Plus className="h-4 w-4 mr-2" />
                  Buat Sesi Baru
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
