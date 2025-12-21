# Dayeuhkolot Bedas Serve (DBS)

> **Transformasi Digital Pelayanan Desa Dayeuhkolot**  
> *Sistem Informasi Pelayanan Publik & Pemetaan Geografis Terpadu*

![Tampilan Beranda Desktop](images/Dokumentasi/Desktop%20Beranda.jpeg)

---

## 📋 Tentang Proyek

**Dayeuhkolot Bedas Serve** adalah platform digital yang dirancang untuk menjembatani kebutuhan administrasi warga Desa Dayeuhkolot dengan efisiensi teknologi modern. Sistem ini mengintegrasikan layanan asisten virtual cerdas dan pemetaan geografis interaktif untuk memberikan akses informasi yang cepat, akurat, dan transparan.

![Tampilan Mobile Dashboard](images/Dokumentasi/Mobile%20Dashboard.jpeg)
*Tampilan responsif di perangkat mobile*

Dibangun dengan pendekatan *Mobile-First*, aplikasi ini menjamin pengalaman pengguna yang mulus baik melalui perangkat desktop maupun telepon pintar.

---

## ✨ Fitur Unggulan

### 🤖 Asisten Layanan Cerdas (Smart Chatbot)
![Tampilan Chatbot Desktop](images/Dokumentasi/Desktop%20Chatbot.jpeg)

*   **Respon Instan:** Menjawab pertanyaan seputar persyaratan administrasi (KTP, KK, SKCK, Akta, dll).
*   **Panduan Interaktif:** Menyediakan alur pengurusan, tautan sistem online, dan template surat.
*   **Antarmuka Percakapan:** Desain chat yang familiar dan mudah digunakan oleh semua kalangan usia.

### 🗺️ Peta Digital Desa (Interactive Map)
*   **Visualisasi Lokasi:** Menampilkan kantor pemerintahan, fasilitas umum, dan batas wilayah.
*   **Detail Lokasi:** Informasi lengkap (Foto, Alamat, Jam Operasional) pada setiap titik.
*   **Navigasi:** Integrasi langsung dengan Google Maps untuk penunjuk arah.

### ⚙️ Panel Administrasi Terpadu
![Dashboard Admin Desktop](images/Dokumentasi/Dashboard%20Beranda%20Admin.jpeg)

*   **Manajemen Konten:** Kontrol penuh atas data peta dan informasi layanan.
*   **Editor Peta Visual:** Fitur *Drag & Drop* marker untuk penentuan titik lokasi yang presisi.
*   **Manajemen Data JSON:** Kemudahan ekspor dan impor data lokasi.
*   **Desain Responsif:** Dashboard admin yang tetap fungsional di layar ponsel.

<img src="images/Dokumentasi/Mobile%20Dashboard%20Admin.jpeg" width="300" alt="Dashboard Admin Mobile" />
*Tampilan Admin pada Mobile*

---

## 🛠️ Teknologi

Proyek ini dibangun menggunakan teknologi web standar yang ringan, cepat, dan mudah dipelihara:

| Komponen | Teknologi | Deskripsi |
| :--- | :--- | :--- |
| **Frontend** | HTML5, CSS3 | Struktur semantik & Desain responsif dengan CSS Variables |
| **Logika** | JavaScript (ES6+) | Vanilla JS untuk performa maksimal tanpa dependensi berat |
| **Peta** | Leaflet.js | Library *open-source* untuk peta interaktif |
| **Data** | JSON | Penyimpanan data lokasi yang terstruktur dan portabel |
| **Styling** | Modern CSS | Flexbox, Grid, & Media Queries untuk adaptabilitas layar |

---

## 📂 Struktur Direktori

```
Dayeuhkolot/
├── 📄 index.html           # Halaman Utama (Landing Page)
├── 📄 chat.html            # Halaman Asisten Virtual
├── 📄 peta.html            # Halaman Peta Publik
├── 📄 admin.html           # Dashboard Admin Utama
├── 📄 admin_peta.html      # Editor Peta Admin
├── 🎨 styles.css           # Stylesheet Utama (Global)
├── 📜 script.js            # Logika Utama Aplikasi
├── 📜 map_logic.js         # Logika Peta (Publik)
├── 📜 admin_map_logic.js   # Logika Peta (Admin & Editor)
└── 📦 dayeuhkolot_places.json # Database Lokasi
```

---

## 🚀 Cara Penggunaan

Sistem ini bersifat **Static Web**, yang berarti dapat dijalankan langsung tanpa konfigurasi server backend yang rumit.

1.  **Instalasi:**
    *   Unduh atau *clone* repositori ini.
    *   Pastikan struktur folder sesuai dengan daftar di atas.

2.  **Menjalankan Aplikasi:**
    *   Buka file `index.html` menggunakan browser modern (Chrome, Edge, Firefox, Safari).
    *   Untuk pengalaman terbaik, gunakan ekstensi *Live Server* pada VS Code.

3.  **Akses Admin:**
    *   Masuk melalui tombol login di halaman utama (atau akses `admin.html`).
    *   Gunakan fitur Editor Peta untuk menambah atau mengubah lokasi fasilitas desa.

    ![Halaman Login Admin](images/Dokumentasi/Desktop&Mobile%20Login%20Admin.jpeg)
    *Halaman Login yang aman dan responsif*

---

## 📱 Kompatibilitas

Aplikasi telah diuji dan dioptimalkan untuk:
*   ✅ **Desktop:** Windows, macOS, Linux (Chrome/Edge/Firefox)
*   ✅ **Mobile:** Android & iOS (Tampilan responsif penuh)

---

## 📄 Lisensi & Kredit

**Dayeuhkolot Bedas Serve**  
Dikembangkan untuk Desa Dayeuhkolot.  
*Hak Cipta © 2025 - Dilindungi Undang-Undang.*
