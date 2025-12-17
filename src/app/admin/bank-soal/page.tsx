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
  FileText,
  Pencil,
  Trash2,
  Eye,
  Copy,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data
const questionPackages = [
  {
    id: "1",
    name: "Tryout UTBK Saintek 2024",
    description: "Paket soal lengkap untuk persiapan UTBK Saintek",
    questionCount: 100,
    createdAt: "2024-01-15",
    status: "published",
  },
  {
    id: "2",
    name: "UAS Matematika Kelas 12",
    description: "Ujian akhir semester matematika",
    questionCount: 40,
    createdAt: "2024-01-10",
    status: "draft",
  },
  {
    id: "3",
    name: "Latihan Fisika Bab 1-5",
    description: "Latihan soal fisika mekanika dan termodinamika",
    questionCount: 50,
    createdAt: "2024-01-05",
    status: "published",
  },
  {
    id: "4",
    name: "Tryout Bahasa Inggris",
    description: "Reading, listening, dan grammar",
    questionCount: 60,
    createdAt: "2024-01-01",
    status: "published",
  },
];

export default function BankSoalPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPackages = questionPackages.filter(
    (pkg) =>
      pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bank Soal</h1>
          <p className="text-muted-foreground">
            Kelola paket soal dan butir soal
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/bank-soal/buat">
            <Plus className="h-4 w-4 mr-2" />
            Buat Paket Baru
          </Link>
        </Button>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari paket soal..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Package Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPackages.map((pkg) => (
          <Card
            key={pkg.id}
            className="group hover:shadow-md transition-shadow"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{pkg.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {pkg.description}
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      Lihat Detail
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="h-4 w-4 mr-2" />
                      Duplikasi
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Hapus
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span>{pkg.questionCount} soal</span>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    pkg.status === "published"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                  }`}
                >
                  {pkg.status === "published" ? "Dipublikasi" : "Draft"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Dibuat: {new Date(pkg.createdAt).toLocaleDateString("id-ID")}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredPackages.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">
            Tidak ada paket soal ditemukan
          </h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery
              ? "Coba ubah kata kunci pencarian"
              : "Mulai dengan membuat paket soal baru"}
          </p>
          <Button asChild>
            <Link href="/admin/bank-soal/buat">
              <Plus className="h-4 w-4 mr-2" />
              Buat Paket Baru
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
