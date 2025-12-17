Spesifikasi Sistem & Alur Kerja Website Tryout Online

1. Ringkasan Proyek

Website aplikasi Computer Based Test (CBT) modern yang dirancang untuk pelaksanaan tryout online yang aman dan interaktif. Aplikasi ini memfasilitasi Admin (Guru/Pembuat Soal) untuk membuat soal yang variatif dan User (Siswa) untuk mengerjakan ujian dengan sistem keamanan proctoring sederhana (kamera & deteksi tab).

Tech Stack

Frontend: Next.js (App Router), React, Tailwind CSS.

UI Library: shadcn/ui, Lucide Icons.

Backend & Database: Supabase (PostgreSQL, Auth, Storage, Edge Functions).

State Management: Zustand (untuk timer & jawaban sementara).

Form & Validasi: React Hook Form + Zod.

Fitur Khusus:

react-webcam (Akses Kamera).

dnd-kit (Drag & Drop soal menjodohkan).

tiptap (Rich text editor untuk pembuatan soal).

2. Fitur Utama

A. Role: Admin

Dashboard Analytics: Melihat statistik peserta, rata-rata nilai, dan sesi aktif.

Manajemen Bank Soal (CRUD):

Membuat paket soal.

Menambah butir soal dengan 4 tipe:

Pilihan Ganda (PG).

Isian Singkat.

Fill the Blank (Melengkapi kalimat).

Menjodohkan (Drag & Drop).

Upload gambar/audio pada soal.

Manajemen Sesi Ujian:

Membuat sesi baru dari Bank Soal.

Mengatur durasi & waktu mulai/selesai.

Generate Token Unik (misal: X7B-99A).

Monitoring & Hasil:

Melihat siapa saja yang sedang mengerjakan.

Melihat log pelanggaran (berapa kali pindah tab).

Export nilai peserta.

B. Role: User (Siswa)

Autentikasi: Login Email/Password atau Google Auth.

Sistem Token: Masuk ke ujian hanya dengan Token valid.

Proctoring (Anti-Curang):

Wajib Kamera: Ujian tidak bisa dimulai jika izin kamera ditolak. Kamera akan aktif di pojok layar selama ujian (bisa dikembangkan untuk ambil foto random tiap 5 menit).

Deteksi Tab/Window: Sistem mendeteksi jika user meninggalkan halaman ujian (pindah tab atau buka aplikasi lain).

Interface Ujian:

Navigasi nomor soal.

Penanda soal (ragu-ragu).

Timer mundur (auto-submit jika habis).

Penyimpanan jawaban otomatis (local storage + sync database).

Hasil: Melihat skor instan (opsional, tergantung setting admin).

3. User Flow (Alur Pengguna)

Alur Admin (Persiapan Ujian)

Login ke Dashboard Admin.

Masuk menu Bank Soal -> Buat Paket Baru (misal: "Matematika Dasar").

Input Soal satu per satu sesuai tipe (PG, Menjodohkan, dll).

Masuk menu Sesi Ujian -> Pilih Paket Soal -> Set Waktu (misal: 90 menit).

Klik Generate Token.

Sistem memberikan Kode Token (misal: MATH24) untuk dibagikan ke siswa.

Alur User (Pengerjaan Soal - Dengan Keamanan)

Login ke Aplikasi.

Di Dashboard, input Kode Token (MATH24) -> Klik "Mulai".

Pemeriksaan Sistem (Pre-Flight Check):

Browser meminta izin akses Kamera.

Kondisi:

Jika Ditolak: Muncul pesan "Anda wajib mengaktifkan kamera untuk melanjutkan". Tombol "Mulai Ujian" terkunci.

Jika Diizinkan: Preview kamera muncul, tombol "Mulai Ujian" terbuka.

User masuk ke Halaman Ujian (Fullscreen Mode recommended).

Proses Pengerjaan:

User menjawab soal.

Skenario Pelanggaran:

User membuka tab baru untuk Google jawaban.

Sistem mendeteksi visibilitychange.

Action: Muncul peringatan full screen "Dilarang membuka tab lain! Peringatan 1/3".

Jika peringatan mencapai batas maksimal, sistem melakukan Auto-Submit (Diskualifikasi).

User klik Selesai atau Waktu Habis.

Sistem mengirim jawaban ke server -> Server menghitung nilai.

User melihat halaman "Terima Kasih" atau Skor (jika diizinkan).

4. Struktur Database Tambahan (Supabase)

Untuk mendukung fitur keamanan, kita perlu tabel tambahan atau field baru di skema sebelumnya:

Tabel: exam_logs (Mencatat aktivitas mencurigakan)

id (uuid)

attempt_id (fk ke student_attempts)

log_type (enum: 'tab_switch', 'window_blur', 'camera_off')

timestamp (datetime)

snapshot_url (text, nullable) -> Jika Anda ingin menyimpan foto bukti pelanggaran ke Supabase Storage.

Update Tabel: student_attempts

violation_count (int, default: 0) -> Menghitung total pelanggaran.

is_disqualified (boolean, default: false) -> Status jika melanggar aturan fatal.