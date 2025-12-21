# BEDAS SERVE Icon Style Guide

## Prinsip Desain
- Konsistensi brand: gunakan biru utama `#1E3A8A` sebagai warna ikon inti; latar (ring) memakai gradasi palet harmonis.
- Kejelasan makna: motif merepresentasikan objek layanan (ID card, family book, certificate, house pin, wedding rings, passport, dll).
- Keterbacaan: kontras tinggi, bentuk sederhana, stroke tegas.

## Spesifikasi Teknis
- Format: SVG (inline atau file), PNG hasil ekspor untuk kebutuhan raster.
- Ukuran referensi: 48×48 px untuk UI, ring 22–28 px, konten ikon 18–20 px.
- Performa: SVG dioptimasi, warna berbasis CSS (currentColor) opsional.
- Mode: dukung dark/light via penyesuaian saturasi/brightness di `.theme-alt`.
- Aksesibilitas: animasi dinonaktifkan otomatis dengan `prefers-reduced-motion: reduce`.

## Palet
- `palette-blue`, `palette-indigo`, `palette-purple`, `palette-green`, `palette-gold`, `palette-navy`, `palette-teal`, `palette-cyan`, `palette-rose`, `palette-orange`.
- Minimal 3 variasi warna per ikon; varian dipilih deterministik dari judul layanan.

## Animasi
- Hover: `anim-bounce` (400ms), `anim-rotate` (500ms), `anim-scale`, `anim-move`.
- Loop opsional: `anim-pulse` (1200ms) untuk penekanan ringan.
- Easing: cubic-bezier(.22,.61,.36,1) untuk gerakan natural.

## Pemetaan Motif (Kategori)
- Identitas (IKD, KTP): `ktp.svg`.
- Kartu Keluarga (KK): `kk.svg`.
- Akta (lahir, mati, kawin, cerai, pengakuan/pengesahan/pembatalan, pembetulan): `akta.svg` + badges kontekstual.
- Domisili & Pindah/Datang (SKP, SKPWNI, SKTT, Biodata): `domisili.svg`.
- Nikah/Perkawinan: `nikah.svg`.
- Paspor/Keimigrasian/Naturalisasi/ABG: `paspor.svg`.

## Variasi & Opsi
- Setiap layanan memiliki 3 opsi kombinasi palet (A/B/C) dan animasi (bounce/rotate/pulse).
- Variasi ditampilkan di `icons-preview.html` untuk review cepat.

## Implementasi
- Gunakan komponen tombol dengan struktur: `<span class="icon-wrap palette-..."><img class="icon" src="..."></span> Label`.
- Palet ditentukan melalui fungsi `paletteForTitle(title)` di `chat.html`.
- Animasi per konteks ditentukan via kelas (`anim-bounce`, dll).

## Pengujian Pengguna
- Observasi: kecepatan identifikasi, kesesuaian makna, distraksi animasi.
- Kumpulkan event klik/hover melalui `trackEvent` untuk analitik varian.

## Catatan
- Ikon tambahan untuk subkategori (KIA, Biodata, Kematian, Perubahan Nama, dll.) dapat diturunkan dari motif inti dengan badge kecil atau variasi detail; tetap sederhana untuk menjaga performa.

