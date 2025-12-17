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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Plus,
  Trash2,
  GripVertical,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
  Save,
} from "lucide-react";

type QuestionType =
  | "multiple_choice"
  | "short_answer"
  | "fill_blank"
  | "matching";

interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options?: string[];
  answer?: string;
  pairs?: { left: string; right: string }[];
}

const questionTypeLabels: Record<QuestionType, string> = {
  multiple_choice: "Pilihan Ganda",
  short_answer: "Isian Singkat",
  fill_blank: "Fill in the Blank",
  matching: "Menjodohkan",
};

export default function BuatPaketSoalPage() {
  const [packageName, setPackageName] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  const addQuestion = (type: QuestionType) => {
    const newQuestion: Question = {
      id: `q-${Date.now()}`,
      type,
      text: "",
      options: type === "multiple_choice" ? ["", "", "", ""] : undefined,
      pairs: type === "matching" ? [{ left: "", right: "" }] : undefined,
    };
    setQuestions([...questions, newQuestion]);
    setExpandedQuestion(newQuestion.id);
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, ...updates } : q))
    );
  };

  const updateOption = (
    questionId: string,
    optionIndex: number,
    value: string
  ) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId && q.options) {
          const newOptions = [...q.options];
          newOptions[optionIndex] = value;
          return { ...q, options: newOptions };
        }
        return q;
      })
    );
  };

  const addPair = (questionId: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId && q.pairs) {
          return { ...q, pairs: [...q.pairs, { left: "", right: "" }] };
        }
        return q;
      })
    );
  };

  const updatePair = (
    questionId: string,
    pairIndex: number,
    side: "left" | "right",
    value: string
  ) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId && q.pairs) {
          const newPairs = [...q.pairs];
          newPairs[pairIndex] = { ...newPairs[pairIndex], [side]: value };
          return { ...q, pairs: newPairs };
        }
        return q;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/bank-soal">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Buat Paket Soal</h1>
          <p className="text-muted-foreground">
            Tambah paket soal baru ke bank soal
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Package Info */}
          <Card>
            <CardHeader>
              <CardTitle>Informasi Paket</CardTitle>
              <CardDescription>Detail dasar paket soal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Paket</Label>
                <Input
                  id="name"
                  placeholder="contoh: Tryout UTBK Saintek 2024"
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  placeholder="Deskripsi singkat tentang paket soal ini..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Questions List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Daftar Soal</CardTitle>
                  <CardDescription>
                    {questions.length} soal ditambahkan
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {questions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>
                    Belum ada soal. Tambahkan soal baru menggunakan tombol di
                    samping.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {questions.map((question, index) => (
                    <div
                      key={question.id}
                      className="border rounded-lg bg-zinc-50 dark:bg-zinc-800/50"
                    >
                      {/* Question Header */}
                      <div
                        className="flex items-center gap-3 p-3 cursor-pointer"
                        onClick={() =>
                          setExpandedQuestion(
                            expandedQuestion === question.id
                              ? null
                              : question.id
                          )
                        }
                      >
                        <GripVertical className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium text-sm">
                          Soal {index + 1}
                        </span>
                        <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">
                          {questionTypeLabels[question.type]}
                        </span>
                        <span className="flex-1 text-sm text-muted-foreground truncate">
                          {question.text || "(belum ada teks soal)"}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeQuestion(question.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                        {expandedQuestion === question.id ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </div>

                      {/* Question Content (Expanded) */}
                      {expandedQuestion === question.id && (
                        <div className="p-4 pt-0 border-t space-y-4">
                          <div className="space-y-2">
                            <Label>Teks Soal</Label>
                            <Textarea
                              placeholder="Tulis pertanyaan di sini..."
                              value={question.text}
                              onChange={(e) =>
                                updateQuestion(question.id, {
                                  text: e.target.value,
                                })
                              }
                              rows={3}
                            />
                            <Button variant="outline" size="sm">
                              <ImageIcon className="h-4 w-4 mr-2" />
                              Tambah Gambar
                            </Button>
                          </div>

                          {/* Multiple Choice Options */}
                          {question.type === "multiple_choice" &&
                            question.options && (
                              <div className="space-y-2">
                                <Label>Pilihan Jawaban</Label>
                                {question.options.map((option, optIndex) => (
                                  <div
                                    key={optIndex}
                                    className="flex gap-2 items-center"
                                  >
                                    <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                                      {String.fromCharCode(65 + optIndex)}
                                    </span>
                                    <Input
                                      placeholder={`Pilihan ${String.fromCharCode(
                                        65 + optIndex
                                      )}`}
                                      value={option}
                                      onChange={(e) =>
                                        updateOption(
                                          question.id,
                                          optIndex,
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                ))}
                                <div className="space-y-2 pt-2">
                                  <Label>Kunci Jawaban</Label>
                                  <Select
                                    value={question.answer}
                                    onValueChange={(v) =>
                                      updateQuestion(question.id, { answer: v })
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Pilih jawaban benar" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {question.options.map((_, i) => (
                                        <SelectItem
                                          key={i}
                                          value={String.fromCharCode(65 + i)}
                                        >
                                          Pilihan {String.fromCharCode(65 + i)}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            )}

                          {/* Short Answer */}
                          {question.type === "short_answer" && (
                            <div className="space-y-2">
                              <Label>Kunci Jawaban</Label>
                              <Input
                                placeholder="Jawaban yang benar..."
                                value={question.answer || ""}
                                onChange={(e) =>
                                  updateQuestion(question.id, {
                                    answer: e.target.value,
                                  })
                                }
                              />
                            </div>
                          )}

                          {/* Fill in the Blank */}
                          {question.type === "fill_blank" && (
                            <div className="space-y-2">
                              <Label>Petunjuk</Label>
                              <p className="text-sm text-muted-foreground">
                                Gunakan tanda{" "}
                                <code className="bg-zinc-200 dark:bg-zinc-700 px-1 rounded">
                                  ___
                                </code>{" "}
                                untuk menandai bagian yang harus diisi.
                              </p>
                              <Label>Kunci Jawaban</Label>
                              <Input
                                placeholder="Jawaban untuk bagian yang kosong..."
                                value={question.answer || ""}
                                onChange={(e) =>
                                  updateQuestion(question.id, {
                                    answer: e.target.value,
                                  })
                                }
                              />
                            </div>
                          )}

                          {/* Matching */}
                          {question.type === "matching" && question.pairs && (
                            <div className="space-y-2">
                              <Label>Pasangan</Label>
                              {question.pairs.map((pair, pairIndex) => (
                                <div
                                  key={pairIndex}
                                  className="flex gap-2 items-center"
                                >
                                  <Input
                                    placeholder="Kiri"
                                    value={pair.left}
                                    onChange={(e) =>
                                      updatePair(
                                        question.id,
                                        pairIndex,
                                        "left",
                                        e.target.value
                                      )
                                    }
                                  />
                                  <span className="text-muted-foreground">
                                    ↔
                                  </span>
                                  <Input
                                    placeholder="Kanan"
                                    value={pair.right}
                                    onChange={(e) =>
                                      updatePair(
                                        question.id,
                                        pairIndex,
                                        "right",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              ))}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => addPair(question.id)}
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Tambah Pasangan
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Add Question */}
          <Card>
            <CardHeader>
              <CardTitle>Tambah Soal</CardTitle>
              <CardDescription>Pilih tipe soal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => addQuestion("multiple_choice")}
              >
                <Plus className="h-4 w-4 mr-2" />
                Pilihan Ganda
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => addQuestion("short_answer")}
              >
                <Plus className="h-4 w-4 mr-2" />
                Isian Singkat
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => addQuestion("fill_blank")}
              >
                <Plus className="h-4 w-4 mr-2" />
                Fill in the Blank
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => addQuestion("matching")}
              >
                <Plus className="h-4 w-4 mr-2" />
                Menjodohkan
              </Button>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Aksi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Simpan Paket
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
