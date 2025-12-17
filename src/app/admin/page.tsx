"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  BookOpen,
  Users,
  Calendar,
  TrendingUp,
  Plus,
  ArrowRight,
  Clock,
  CheckCircle,
} from "lucide-react";

// Mock data for dashboard
const stats = [
  {
    label: "Total Paket Soal",
    value: "12",
    icon: BookOpen,
    color: "text-blue-500",
  },
  { label: "Sesi Aktif", value: "3", icon: Calendar, color: "text-green-500" },
  {
    label: "Total Peserta",
    value: "156",
    icon: Users,
    color: "text-purple-500",
  },
  {
    label: "Rata-rata Nilai",
    value: "78.5",
    icon: TrendingUp,
    color: "text-orange-500",
  },
];

const recentActivities = [
  {
    id: 1,
    type: "exam",
    message: "Sesi 'Matematika Dasar' telah selesai",
    time: "2 jam lalu",
  },
  {
    id: 2,
    type: "question",
    message: "Paket soal 'Fisika Kelas 12' ditambahkan",
    time: "5 jam lalu",
  },
  {
    id: 3,
    type: "user",
    message: "25 peserta bergabung ke sesi 'Bahasa Indonesia'",
    time: "1 hari lalu",
  },
];

const activeSessions = [
  {
    id: 1,
    name: "Tryout UTBK Saintek",
    participants: 45,
    remaining: "1:23:45",
  },
  {
    id: 2,
    name: "UAS Matematika Kelas 11",
    participants: 32,
    remaining: "0:45:12",
  },
  {
    id: 3,
    name: "Latihan Bahasa Inggris",
    participants: 18,
    remaining: "2:00:00",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Selamat datang di panel admin EduTry
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/admin/bank-soal/buat">
              <Plus className="h-4 w-4 mr-2" />
              Buat Paket Soal
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/sesi-ujian/buat">
              <Calendar className="h-4 w-4 mr-2" />
              Buat Sesi Ujian
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Active Sessions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Sesi Aktif</CardTitle>
                <CardDescription>Ujian yang sedang berlangsung</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/monitoring">
                  Lihat Semua
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50"
                >
                  <div className="flex-1">
                    <p className="font-medium">{session.name}</p>
                    <p className="text-sm text-muted-foreground">
                      <Users className="h-3 w-3 inline mr-1" />
                      {session.participants} peserta
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <span className="font-mono">{session.remaining}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
            <CardDescription>Riwayat aktivitas sistem</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Aksi Cepat</CardTitle>
          <CardDescription>
            Pintasan ke fitur yang sering digunakan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Button
              variant="outline"
              className="h-auto py-4 flex-col gap-2"
              asChild
            >
              <Link href="/admin/bank-soal">
                <BookOpen className="h-6 w-6" />
                <span>Kelola Bank Soal</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex-col gap-2"
              asChild
            >
              <Link href="/admin/sesi-ujian">
                <Calendar className="h-6 w-6" />
                <span>Kelola Sesi Ujian</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex-col gap-2"
              asChild
            >
              <Link href="/admin/monitoring">
                <Users className="h-6 w-6" />
                <span>Monitoring Peserta</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex-col gap-2"
              asChild
            >
              <Link href="/admin/laporan">
                <TrendingUp className="h-6 w-6" />
                <span>Lihat Laporan</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
