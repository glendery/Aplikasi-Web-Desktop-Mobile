const defaultServices = [
    // --- LAYANAN 1-5 ---
    {
        title: "Identitas Kependudukan Digital (IKD)",
        keywords: ["ikd", "digital", "ktp digital"],
        description: "Identitas Kependudukan Digital adalah informasi elektronik yang merepresentasikan Dokumen Kependudukan dan data balikan dalam aplikasi digital melalui gawai yang menampilkan Data Pribadi sebagai identitas yang bersangkutan.",
        requirements: [
            "Memiliki Smartphone",
            "Minimal versi Android 8.0",
            "Memiliki KTP-el atau sudah melakukan perekaman",
            "Memiliki email dan nomor HP aktif",
            "Memiliki jaringan Internet yang stabil"
        ],
        procedure: [
            "Unduh Aplikasi 'Identitas Kependudukan Digital' di Google Playstore",
            "Buka aplikasi dan pilih 'Setuju' terhadap syarat dan ketentuan IKD",
            "Lakukan Pengisian NIK, email, dan Nomor HP yang aktif, lalu Klik Verifikasi Data",
            "Pilih tombol ambil foto untuk melakukan pemadanan Face Recognition",
            "Lakukan pengambilan foto dan kemudian pilih scan QR-Code (Scan QR-Code akan dibantu dan dilakukan oleh petugas)",
            "Masuk ke email, buka pesan email dari Kementerian Dalam Negeri, dan pilih tombol aktivasi",
            "Masukan kode aktivasi yang ada di email serta captcha, lalu klik tombol aktifkan",
            "Proses aktivasi IKD selesai. Segera ubah PIN di menu pengaturan demi keamanan"
        ]
    },

    {
        title: "Pencatatan Biodata WNI Dalam Wilayah NKRI",
        keywords: ["biodata wni", "biodata"],
        description: "Pencatatan biodata WNI yang bertempat tinggal dalam wilayah NKRI dengan melengkapi dokumen persyaratan.",
        requirements: [
            "Surat pengantar (asli) dari rukun tetangga (RT) dan rukun warga (RW) atau sebutan lain",
            "Fotokopi dokumen atau bukti Peristiwa Kependudukan dan Peristiwa Penting",
            "Fotokopi bukti pendidikan terakhir"
        ],
        procedure: [
            "WNI mengisi formulir F.1.01",
            "WNI menyerahkan surat pengantar RT/RW (tidak perlu untuk bayi baru lahir dari orang tua yang sudah terdaftar)",
            "WNI menyerahkan fotokopi dokumen peristiwa penting (seperti paspor, surat keterangan lahir dari RS/Puskesmas)",
            "WNI menyerahkan fotokopi ijazah terakhir",
            "Jika tidak memiliki dokumen kependudukan/pendidikan, mengisi F.1.04 (Surat Pernyataan Tidak Memiliki Dokumen Kependudukan)",
            "Jika menumpang KK/kost/kontrak, lampirkan surat pernyataan tidak keberatan dari pemilik rumah",
            "Dinas menerbitkan Biodata"
        ],
        procedureOnline: [
            "Pemohon mendownload aplikasi Identitas Kependudukan Digital (IKD) dari Playstore/Appstore",
            "Pemohon melakukan login akun terlebih dahulu dengan memasukan PIN yang sudah didaftarkan",
            "Pemohon memilih menu Pelayanan di halaman utama",
            "Pemohon memilih layanan permohonan Cetak Biodata yang akan diajukan",
            "Pemohon memilih anggota keluarga yang akan diajukan Cetak Biodata kemudian masukkan captcha dan pilih Ajukan",
            "Dokumen yang sudah disetujui dan sudah di TTE akan dikirim otomatis oleh sistem melalui email pemohon berupa QR Code dan PIN",
            "Pemohon mencetak melalui mesin ADM terdekat"
        ]
    },
    {
        title: "Pencatatan Biodata WNI Di Luar Wilayah NKRI",
        keywords: ["biodata luar negeri", "wni luar negeri"],
        description: "Pencatatan biodata WNI yang bertempat tinggal di luar wilayah NKRI.",
        requirements: [
            "Fotokopi Dokumen Perjalanan Republik Indonesia",
            "Surat keterangan yang menunjuk domisili",
            "Fotokopi dokumen atau bukti Peristiwa Kependudukan dan Peristiwa Penting",
            "Fotokopi bukti pendidikan terakhir"
        ],
        procedure: [
            "WNI mengisi F-1.01",
            "WNI menyerahkan fotokopi dokumen perjalanan RI (paspor/SPLP)",
            "WNI menyerahkan surat keterangan domisili dari instansi berwenang",
            "WNI menyerahkan fotokopi bukti peristiwa kependudukan (surat keterangan lahir)",
            "WNI menyerahkan fotokopi ijazah terakhir",
            "Petugas menyerahkan Surat Pemberitahuan NIK (F-1.10) dan Biodata"
        ]
    },
    {
        title: "Pencatatan Biodata Warga Negara Asing",
        keywords: ["biodata warga negara asing", "biodata asing", "biodata WARGA NEGARA ASING"],
        description: "Pencatatan biodata untuk Warga Negara Asing yang tinggal di Indonesia.",
        requirements: [
            "Fotokopi Dokumen Perjalanan",
            "Fotokopi kartu izin tinggal terbatas (KITAS) atau izin tinggal tetap (KITAP)"
        ],
        procedure: [
            "Warga Negara Asing mengisi F-1.01",
            "Warga Negara Asing menyerahkan fotokopi paspor",
            "Warga Negara Asing menyerahkan fotokopi KITAS atau KITAP",
            "Pemohon mendownload aplikasi IKD dari Playstore/Appstore",
            "Login akun dengan memasukkan PIN",
            "Pilih menu Pelayanan di halaman utama",
            "Pilih layanan permohonan Cetak Biodata yang diajukan",
            "Pilih anggota keluarga, masukkan captcha, dan pilih Ajukan",
            "Dokumen yang disetujui dan ditandatangani elektronik (TTE) dikirim otomatis via email berupa QR Code dan PIN",
            "Pemohon mencetak dokumen melalui mesin ADM terdekat menggunakan QR Code dan PIN tersebut"
        ]
    },
    {
        title: "Penerbitan Kartu Keluarga (KK) Baru Karena Membentuk Keluarga Baru",
        keywords: ["kk baru", "nikah", "kk nikah"],
        description: "Penerbitan KK baru untuk pasangan yang baru menikah atau membentuk keluarga baru.",
        requirements: [
            "Fotokopi buku nikah/kutipan akta perkawinan atau kutipan akta perceraian",
            "SPTJM perkawinan/perceraian belum tercatat (F-1.05) jika tidak dapat melampirkan kutipan akta"
        ],
        procedure: [
            "Penduduk mengisi F-1.01",
            "Menyerahkan bukti nikah/cerai atau SPTJM yang ditandatangani kedua pihak",
            "Saksi tidak perlu melampirkan fotokopi KTP-el",
            "Hubungi Admin Kecamatan Dayeuhkolot atau datang ke Loket Disdukcapil/MPP",
            "Login atau Daftar akun baru (lengkapi data diri dan masukkan OTP dari email)",
            "Pilih menu layanan Administrasi Kependudukan dan Pencatatan Sipil",
            "Pilih Layanan 'KK Baru karena Pernikahan'",
            "Ikuti petunjuk: Mengisi Formulir dan mengupload berkas asli (scan/foto)",
            "Dokumen yang disetujui dikirim via email (QR Code dan PIN)",
            "Cetak dokumen melalui mesin ADM terdekat"
        ]
    },
    {
        title: "Penerbitan KK Baru Karena Penggantian Kepala Keluarga (Kematian)",
        keywords: ["kk ganti kepala", "kk kematian", "kepala keluarga meninggal"],
        description: "Penerbitan KK baru karena kepala keluarga meninggal.",
        requirements: [
            "Fotokopi akta kematian",
            "Fotokopi KK lama"
        ],
        procedure: [
            "Penduduk mengisi F.1.02",
            "Melampirkan fotokopi akta kematian dan KK lama",
            "Jika seluruh anggota keluarga <17 tahun, perlu kepala keluarga dewasa (saudara pindah masuk atau anak dititipkan ke KK saudara lain dengan surat pernyataan wali)",
            "Datang ke Loket Disdukcapil/MPP atau hubungi Admin Kecamatan",
            "Pilih menu layanan Administrasi Kependudukan",
            "Pilih layanan 'Update atau Perubahan Data KK'",
            "Isi formulir dan upload berkas persyaratan asli",
            "Dokumen hasil dikirim via email (QR Code dan PIN)",
            "Cetak di mesin ADM",
            "Dinas menerbitkan KK Baru"
        ]
    },
    {
        title: "Penerbitan KK Baru Karena Pisah KK Dalam Satu Alamat",
        keywords: ["pisah kk", "pecah kk"],
        description: "Penerbitan KK baru untuk pemisahan keluarga dalam satu alamat.",
        requirements: [
            "Fotokopi KK lama",
            "Berumur sekurang-kurangnya 17 tahun atau sudah kawin/pernah kawin (dibuktikan dengan KTP-el)"
        ],
        procedure: [
            "Penduduk mengini F-1.02",
            "Melampirkan fotokopi buku nikah/akta cerai (jika pisah karena pernikahan/perceraian)",
            "Melampirkan KK lama",
            "Datang ke Loket Disdukcapil/MPP atau hubungi Admin Kecamatan",
            "Pilih menu layanan Administrasi Kependudukan",
            "Pilih layanan 'KK Baru karena Pisah KK'",
            "Isi formulir dan upload berkas persyaratan asli",
            "Dokumen hasil dikirim via email (QR Code dan PIN)",
            "Cetak di mesin ADM",
            "Dinas menerbitkan KK Baru"
        ]
    },
    {
        title: "Penerbitan Kartu Keluarga Karena Perubahan Data",
        keywords: ["ubah kk", "ganti data kk", "update kk"],
        description: "Penerbitan KK baru karena adanya perubahan data dalam KK.",
        requirements: [
            "KK lama",
            "Fotokopi surat keterangan/bukti perubahan Peristiwa Kependudukan (cth: Paspor, SKPWNI) dan Peristiwa Penting"
        ],
        procedure: [
            "Penduduk mengisi F-1.02",
            "Melampirkan KK lama",
            "Mengisi F-1.06 karena perubahan elemen data dalam KK",
            "Melampirkan bukti perubahan (bukti peristiwa kependudukan/penting)",
            "Jika pindah KK usia <17 tahun: lampirkan surat pernyataan pengasuhan ortu (pindah keluar) atau surat bersedia menampung (pindah datang)",
            "Datang ke Loket Disdukcapil/MPP atau hubungi Admin Kecamatan",
            "Pilih menu layanan Administrasi Kependudukan",
            "Pilih layanan 'Update atau Perubahan Data KK'",
            "Isi formulir dan upload berkas persyaratan asli",
            "Dokumen hasil dikirim via email (QR Code dan PIN)",
            "Cetak di mesin ADM",
            "Dinas menerbitkan KK Baru"
        ]
    },
    {
        title: "Penerbitan Kartu Keluarga Karena Hilang/Rusak",
        keywords: ["kk hilang", "kk rusak"],
        description: "Penerbitan KK baru karena KK hilang atau rusak.",
        requirements: [
            "Surat keterangan hilang dari kepolisian atau KK yang rusak",
            "Fotokopi KTP-el",
            "Fotokopi kartu izin tinggal tetap (untuk Warga Negara Asing)"
        ],
        procedure: [
            "Penduduk mengisi F-1.02 (tidak perlu fotokopi KTP-el jika NIK sudah diisi di formulir)",
            "Menyerahkan KK rusak atau surat kehilangan kepolisian",
            "Datang ke Loket Disdukcapil/MPP atau hubungi Admin Kecamatan",
            "Pilih menu layanan Administrasi Kependudukan",
            "Pilih layanan 'Cetak Ulang KK' atau 'KK Hilang atau Rusak'",
            "Isi formulir dan upload berkas persyaratan asli",
            "Dokumen hasil dikirim via email (QR Code dan PIN)",
            "Cetak di mesin ADM"
        ]
    },
    {
        title: "Penerbitan KTP-el Baru Untuk WNI",
        keywords: ["ktp baru", "bikin ktp"],
        description: "Penerbitan KTP-el baru untuk warga negara Indonesia yang telah memenuhi syarat usia dan persyaratan lainnya.",
        requirements: [
            "Telah berusia 17 tahun, sudah kawin, atau pernah kawin",
            "Fotokopi KK"
        ],
        procedure: [
            "Koordinasikan antrian melalui Admin Kecamatan atau datang ke Loket Disdukcapil/MPP",
            "Datang ke kantor Disdukcapil/MPP sesuai tanggal booking, perlihatkan QR Code antrian ke Customer Service untuk discan",
            "Serahkan formulir dan persyaratan ke petugas",
            "Tunggu proses pencetakan",
            "Ambil KTP-el di loket pengambilan"
        ]
    },
    {
        title: "Penerbitan KTP-el Baru karena Pindah, Perubahan Data, Rusak, dan Hilang (WNI)",
        keywords: ["ganti ktp", "ktp rusak", "ktp hilang", "ktp pindah"],
        description: "Penerbitan KTP-el baru untuk WNI karena berbagai alasan seperti pindah, ubah data, rusak atau hilang.",
        requirements: [
            "SKP (jika pindah datang)",
            "KTP-el lama dan bukti perubahan data (jika ubah data)",
            "KTP-el rusak (jika rusak)",
            "Surat kehilangan dari kepolisian (jika hilang)"
        ],
        procedure: [
            "Mengisi F-1.02",
            "Melampirkan persyaratan sesuai kondisi (SKP, Bukti Ubah Data, KTP Rusak, atau Surat Kehilangan)",
            "Dinas menarik KTP-el lama (jika ada) dan memusnahkannya",
            "Ambil nomor antrian di Loket Disdukcapil/MPP atau koordinasi melalui Admin Kecamatan",
            "Datang ke kantor Disdukcapil/MPP sesuai jadwal, scan barcode antrian",
            "Serahkan formulir dan persyaratan",
            "Tunggu pencetakan dan ambil KTP-el di loket"
        ]
    },
    {
        title: "Penerbitan KTP-el Baru Untuk Warga Negara Asing",
        keywords: ["ktp warga negara asing", "ktp asing", "ktp WARGA NEGARA ASING"],
        description: "Penerbitan KTP-el baru untuk Warga Negara Asing yang tinggal di Indonesia dan memenuhi syarat.",
        requirements: [
            "Telah berusia 17 tahun/kawin/pernah kawin",
            "Fotokopi KK",
            "Fotokopi Dokumen Perjalanan",
            "Fotokopi kartu izin tinggal tetap (KITAP)"
        ],
        procedure: [
            "Warga Negara Asing mengisi F-1.02",
            "Melampirkan fotokopi KK",
            "Menunjukkan fotokopi Dokumen Perjalanan dan KITAP",
            "Ambil nomor antrian di Loket Disdukcapil/MPP atau koordinasi melalui Admin Kecamatan",
            "Datang ke kantor Disdukcapil sesuai jadwal, scan barcode antrian",
            "Serahkan formulir dan persyaratan",
            "Tunggu pencetakan dan ambil KTP-el di loket",
            "Disdukcapil menerbitkan KTP-el"
        ]
    },
    {
        title: "Penerbitan KTP-el Warga Negara Asing (Pindah, Ubah Data, Rusak, Hilang, Perpanjangan)",
        keywords: ["ganti ktp warga negara asing", "ktp warga negara asing rusak", "ganti ktp WARGA NEGARA ASING", "ktp WARGA NEGARA ASING rusak"],
        description: "Penerbitan KTP-el baru untuk Warga Negara Asing karena berbagai alasan (pindah, ubah, rusak, hilang, perpanjangan).",
        requirements: [
            "SKP (jika pindah datang)",
            "KTP-el lama dan bukti perubahan data (jika ubah data)",
            "KTP-el lama (jika perpanjangan)",
            "KTP-el rusak (jika rusak)",
            "Surat kehilangan dari kepolisian (jika hilang)"
        ],
        procedure: [
            "Mengisi F-1.02",
            "Melampirkan persyaratan sesuai kondisi",
            "Dinas menarik dan memusnahkan KTP-el lama",
            "Ambil nomor antrian di Loket Disdukcapil/MPP atau koordinasi melalui Admin Kecamatan",
            "Datang ke LOKET DINAS (bukan MPP) sesuai jadwal",
            "Disdukcapil menerbitkan KTP-el baru"
        ]
    },
    {
        title: "Penerbitan Kartu Identitas Anak (KIA) Baru Untuk Anak WNI",
        keywords: ["kia baru", "kartu anak", "kia wni"],
        description: "Penerbitan KIA baru untuk anak WNI berusia di bawah 17 tahun.",
        requirements: [
            "Fotokopi kutipan akta kelahiran (tunjukkan aslinya)",
            "KK asli orang tua/wali",
            "KTP-el asli kedua orang tua/wali",
            "Foto Anak berwarna ukuran 2x3 sebanyak 2 lembar (untuk anak 5-17 tahun kurang 1 hari)"
        ],
        procedure: [
            "Mengisi F-1.02 (tidak perlu serah KK/KTP ortu jika sudah isi formulir ini)",
            "Melampirkan fotokopi Akta Kelahiran",
            "Datang langsung ke tempat pelayanan (RSUD, MPP, Kecamatan) tanpa booking online",
            "Serahkan formulir, persyaratan, dan email aktif",
            "Tunggu dokumen elektronik KIA dikirim ke email (QR Code)",
            "Cetak KIA di mesin ADM menggunakan QR Code",
            "Ambil fisik KIA. Catatan: KIA Hilang lampirkan surat kehilangan; KIA Rusak lampirkan fisik rusak; Pindah Datang lampirkan SKP",
            "Dinas menerbitkan KIA Baru"
        ]
    },
    {
        title: "Penerbitan KIA Baru Untuk Anak Warga Negara Asing",
        keywords: ["kia warga negara asing", "kartu anak asing", "kia WARGA NEGARA ASING"],
        description: "Penerbitan KIA baru untuk anak Warga Negara Asing yang tinggal di Indonesia.",
        requirements: [
            "Fotokopi paspor dan ITAP",
            "KK asli orang tua/wali",
            "KTP-el asli kedua orang tua/wali",
            "Foto Anak berwarna ukuran 2x3 sebanyak 2 lembar (untuk anak 5-17 tahun)"
        ],
        procedure: [
            "Mengisi F-1.02",
            "Menyerahkan fotokopi paspor dan ITAP",
            "Datang langsung ke tempat pelayanan (RSUD, MPP, Kecamatan) tanpa booking online",
            "Serahkan formulir, persyaratan, dan email aktif",
            "Tunggu dokumen elektronik KIA (QR Code) dikirim ke email",
            "Cetak KIA di mesin ADM",
            "Ambil fisik KIA",
            "Dinas menerbitkan KIA Baru"
        ]
    },
    {
        title: "Perpindahan Penduduk WNI Dalam NKRI (SKPWNI)",
        keywords: ["pindah", "skpwni", "surat pindah"],
        description: "Surat keterangan pindah untuk WNI yang pindah ke daerah lain dalam NKRI.",
        requirements: [
            "Fotokopi Kartu Keluarga"
        ],
        procedure: [
            "Mengisi F-1.03",
            "Jika menumpang, lampirkan surat pernyataan tidak keberatan pemilik rumah",
            "Jika kepala keluarga tidak pindah, KK nomor tetap diterbitkan",
            "Datang ke Loket Disdukcapil/MPP atau hubungi Admin Kecamatan",
            "Pilih menu layanan 'Surat Keterangan Pindah WNI (SKPWNI)'",
            "Isi formulir dan upload berkas asli",
            "Dokumen hasil dikirim via email (QR Code dan PIN)",
            "Cetak SKPWNI di mesin ADM",
            "KTP-el/KIA ditarik di daerah tujuan",
            "Dinas menerbitkan Surat Keterangan Pindah WNI (SKPWNI)"
        ]
    },
    {
        title: "Perpindahan Penduduk Warga Negara Asing ITAP Dalam NKRI",
        keywords: ["pindah warga negara asing itap", "pindah asing", "pindah WARGA NEGARA ASING itap"],
        description: "Surat keterangan pindah untuk Warga Negara Asing dengan izin tinggal tetap (KITAP) yang pindah dalam NKRI.",
        requirements: [
            "Fotokopi KK",
            "Fotokopi KTP-el",
            "Fotokopi Dokumen Perjalanan",
            "Fotokopi kartu izin tinggal tetap (KITAP)"
        ],
        procedure: [
            "Mengisi F-1.03",
            "Dinas menerbitkan SKP",
            "Datang ke Loket Disdukcapil/MPP atau hubungi Admin Kecamatan",
            "Pilih menu layanan SKPWNI (berlaku juga untuk Warga Negara Asing)",
            "Isi formulir dan upload berkas asli",
            "Dokumen hasil dikirim via email (QR Code dan PIN)",
            "Cetak di mesin ADM",
            "KTP-el/KIA ditarik di daerah tujuan"
        ]
    },
    {
        title: "Perpindahan Penduduk Warga Negara Asing ITAS Dalam NKRI",
        keywords: ["pindah warga negara asing itas", "sktt pindah", "pindah WARGA NEGARA ASING itas"],
        description: "Surat keterangan pindah untuk Warga Negara Asing dengan izin tinggal terbatas (KITAS) yang pindah dalam NKRI.",
        requirements: [
            "Fotokopi surat keterangan tempat tinggal (SKTT)",
            "Fotokopi dokumen Perjalanan",
            "Fotokopi kartu izin tinggal terbatas (KITAS)"
        ],
        procedure: [
            "Mengisi F-1.03",
            "Dinas menerbitkan SKP",
            "Datang ke Loket Disdukcapil/MPP atau hubungi Admin Kecamatan",
            "Pilih menu layanan SKPWNI",
            "Isi formulir dan upload berkas asli",
            "Dokumen hasil dikirim via email (QR Code dan PIN)",
            "Cetak di mesin ADM",
            "SKTT ditarik di daerah tujuan"
        ]
    },
    {
        title: "Perpindahan Penduduk WNI Keluar Wilayah NKRI",
        keywords: ["pindah luar negeri", "skpln"],
        description: "Surat keterangan pindah untuk WNI yang pindah ke luar negeri.",
        requirements: [
            "KK",
            "KTP-el"
        ],
        procedure: [
            "Mengisi F-1.03",
            "Ambil nomor antrian Layanan SKPLN di loket MPP (tanpa booking online)",
            "Serahkan formulir dan persyaratan",
            "Terima resi dan tunggu proses",
            "Ambil dokumen SKPLN di loket pengambilan",
            "Dinas menerbitkan SKPLN (Surat Keterangan Pindah Luar Negeri)"
        ]
    },
    {
        title: "Perpindahan Penduduk WNI Datang Dari Luar Negeri",
        keywords: ["datang dari luar negeri", "skdln"],
        description: "Surat keterangan datang untuk WNI yang kembali dari luar negeri.",
        requirements: [
            "Fotokopi Dokumen Perjalanan RI",
            "SKPLN dari Dinas atau SKP dari Perwakilan RI"
        ],
        procedure: [
            "Mengisi F-1.03",
            "Ambil nomor antrian Layanan SKDLN di loket MPP (tanpa booking online)",
            "Serahkan formulir dan persyaratan",
            "Terima resi dan tunggu proses",
            "Ambil Surat Keterangan Datang dari Luar Negeri (SKDLN) di loket",
            "Dinas menerbitkan KK, KTP-el, KIA alamat baru"
        ]
    },
    {
        title: "Pendaftaran Bagi Warga Negara Asing ITAS Datang Dari Luar NKRI",
        keywords: ["warga negara asing datang", "itas baru", "WARGA NEGARA ASING datang"],
        description: "Pendaftaran dan penerbitan SKTT untuk Warga Negara Asing dengan ITAS yang datang dari luar NKRI.",
        requirements: [
            "Fotokopi Dokumen Perjalanan",
            "Fotokopi kartu izin tinggal terbatas (ITAS)"
        ],
        procedure: [
            "Mengisi F-1.03",
            "Dinas menerbitkan SKTT sesuai masa berlaku ITAS",
            "Ambil nomor antrian Layanan Pindah Datang di loket MPP (tanpa booking online)",
            "Serahkan formulir, persyaratan, dan email aktif",
            "Tunggu proses input SIAK",
            "Dokumen KK baru (QR Code) dikirim ke email",
            "Cetak KK di mesin ADM",
            "Ambil dokumen fisik di loket (jika ada)"
        ]
    },
    {
        title: "Pencatatan Kelahiran WNI Dalam Wilayah NKRI",
        keywords: ["akta kelahiran", "akta lahir", "kelahiran", "kelahiran wni"],
        description: "Pencatatan kelahiran WNI dan penerbitan akta kelahiran.",
        requirements: [
            "Fotokopi surat keterangan kelahiran (RS/Puskesmas/Bidan/Desa)",
            "Fotokopi buku nikah/kutipan akta perkawinan",
            "Fotokopi KK",
            "SPTJM kebenaran data kelahiran (F-2.03) jika tidak ada surat lahir",
            "SPTJM kebenaran pasangan suami istri (F-2.04) jika tidak ada buku nikah"
        ],
        procedure: [
            "Mengisi F-2.01",
            "Datang ke Loket Disdukcapil/MPP atau hubungi Admin Kecamatan",
            "Pilih menu layanan 'Akta Kelahiran (0-18 Tahun)'",
            "Isi formulir dan upload berkas asli",
            "Dokumen hasil dikirim via email (QR Code dan PIN)",
            "Cetak Kutipan Akta Kelahiran di mesin ADM",
            "Dinas menerbitkan kutipan akta kelahiran"
        ]
    },
    {
        title: "Pencatatan Kelahiran Warga Negara Asing",
        keywords: ["akta kelahiran", "akta lahir", "akta lahir warga negara asing", "kelahiran", "kelahiran asing", "akta lahir WARGA NEGARA ASING"],
        description: "Pencatatan kelahiran Warga Negara Asing dan penerbitan akta kelahiran.",
        requirements: [
            "Fotokopi surat keterangan kelahiran",
            "Fotokopi buku nikah/kutipan akta perkawinan",
            "Fotokopi Dokumen Perjalanan",
            "Fotokopi KTP-el/KITAS/KITAP/Visa Kunjungan orang tua"
        ],
        procedure: [
            "Mengisi F-2.01",
            "Ikuti prosedur umum Akta Kelahiran di Loket Disdukcapil/MPP",
            "Isi formulir dan upload berkas persyaratan asli",
            "Tunggu verifikasi",
            "Terima QR Code via email",
            "Cetak di mesin ADM",
            "Dinas menerbitkan kutipan akta kelahiran"
        ]
    },
    {
        title: "Pencatatan Lahir Mati",
        keywords: ["lahir mati", "akta lahir mati"],
        description: "Pencatatan peristiwa lahir mati dan penerbitan surat keterangan.",
        requirements: [
            "Fotokopi surat keterangan lahir mati (RS/Bidan/Desa) ATAU Pernyataan orang tua",
            "Fotokopi KK orang tua"
        ],
        procedure: [
            "Mengisi F-2.01",
            "Ambil nomor antrian di Loket MPP (tanpa booking online)",
            "Serahkan formulir dan persyaratan",
            "Terima resi penerimaan berkas",
            "Tunggu proses",
            "Ambil Surat Keterangan Lahir Mati di loket pengambilan",
            "Dinas menerbitkan surat keterangan lahir mati"
        ]
    },
    {
        title: "Pencatatan Kematian Dalam Wilayah NKRI",
        keywords: ["akta kematian", "meninggal", "kematian"],
        description: "Pencatatan kematian dan penerbitan akta kematian.",
        requirements: [
            "Fotokopi surat kematian (Dokter/Desa/Polisi)",
            "Fotokopi Dokumen Perjalanan RI (jika WNI bukan penduduk) atau Paspor (jika Warga Negara Asing)",
            "Fotokopi KK/KTP yang meninggal"
        ],
        procedure: [
            "Mengisi F-2.01",
            "Datang ke Loket Disdukcapil/MPP atau hubungi Admin Kecamatan",
            "Pilih layanan Akta Kematian",
            "Isi formulir dan upload berkas asli",
            "Dokumen hasil dikirim via email (QR Code)",
            "Cetak Akta Kematian di mesin ADM",
            "Ambil fisik dokumen di mesin ADM",
            "Dinas menerbitkan kutipan akta kematian"
        ]
    },
    {
        title: "Pencatatan Perkawinan WNI",
        keywords: ["akta kawin", "nikah non muslim"],
        description: "Pencatatan perkawinan WNI dan penerbitan akta perkawinan.",
        requirements: [
            "Fotokopi surat keterangan perkawinan agama",
            "Pas foto berwarna suami dan istri (4x6, 1 lembar)",
            "KTP-el Asli dan KK Asli",
            "Fotokopi akta kematian/perceraian (jika janda/duda)"
        ],
        procedure: [
            "Mengisi F-2.01",
            "Datang ke Loket MPP, ambil nomor antrian Akta Perkawinan",
            "Serahkan formulir dan persyaratan",
            "Terima resi penerimaan",
            "Suami Istri & 2 Saksi HADIR saat pencatatan",
            "Pejabat melakukan pencatatan",
            "Terima Kutipan Akta Perkawinan di loket dan file PDF via email/WA"
        ]
    },
    {
        title: "Pencatatan Perkawinan Warga Negara Asing",
        keywords: ["kawin warga negara asing", "nikah asing", "kawin WARGA NEGARA ASING"],
        description: "Pencatatan perkawinan Warga Negara Asing dan penerbitan akta perkawinan.",
        requirements: [
            "Fotokopi surat keterangan perkawinan agama",
            "Pas foto berwarna suami dan istri",
            "Fotokopi dokumen Perjalanan",
            "Fotokopi SKTT/KITAS",
            "KTP-el Asli dan KK Asli",
            "Fotokopi izin perkawinan dari negara asal"
        ],
        procedure: [
            "Mengisi F-2.01",
            "Datang ke Loket MPP, ambil nomor antrian Akta Perkawinan",
            "Serahkan formulir dan persyaratan",
            "Terima resi penerimaan",
            "Suami Istri & 2 Saksi HADIR saat pencatatan",
            "Pejabat melakukan pencatatan",
            "Terima Kutipan Akta Perkawinan di loket dan file PDF via email/WA"
        ]
    },
    {
        title: "Pencatatan Pembatalan Perkawinan",
        keywords: ["batal nikah", "pembatalan kawin"],
        description: "Pencatatan pembatalan perkawinan dan penerbitan akta pembatalan.",
        requirements: [
            "Fotokopi salinan putusan pengadilan berkekuatan hukum tetap",
            "Fotokopi kutipan akta perkawinan",
            "KTP-el Asli dan KK Asli"
        ],
        procedure: [
            "Mengisi F-2.01",
            "Datang ke Loket MPP, ambil antrian Pembatalan Akta Perkawinan",
            "Serahkan formulir dan persyaratan",
            "Pejabat melakukan pencatatan pembatalan",
            "Terima Kutipan Pembatalan di loket dan file PDF"
        ]
    },
    {
        title: "Pencatatan Perceraian",
        keywords: ["akta cerai", "cerai"],
        description: "Pencatatan perceraian dan penerbitan akta perceraian.",
        requirements: [
            "Fotokopi Salinan putusan pengadilan yang telah mempunyai kekuatan hukum tetap",
            "Kutipan akta perkawinan asli",
            "KTP-el Asli dan KK Asli"
        ],
        procedure: [
            "Mengisi F-2.01",
            "Datang ke Loket MPP, ambil antrian Akta Perceraian",
            "Serahkan formulir dan persyaratan",
            "Terima resi penerimaan",
            "Pejabat melakukan pencatatan perceraian",
            "Terima Kutipan Akta Perceraian di loket dan file PDF via email/WA"
        ]
    },
    {
        title: "Pencatatan Pembatalan Perceraian",
        keywords: ["batal cerai"],
        description: "Pencatatan pembatalan perceraian dan penerbitan akta pembatalan.",
        requirements: [
            "Fotokopi salinan putusan pengadilan yang telah mempunyai kekuatan hukum tetap",
            "Kutipan akta perceraian asli",
            "KTP-el Asli dan KK Asli"
        ],
        procedure: [
            "Mengisi F-2.01",
            "Datang ke Loket MPP, ambil antrian Pembatalan Akta Perceraian",
            "Serahkan formulir dan persyaratan",
            "Pejabat melakukan pencatatan pembatalan",
            "Terima Kutipan Pembatalan Akta Perceraian di loket dan file PDF via email/WA"
        ]
    },
    {
        title: "Pencatatan Pengangkatan Anak",
        keywords: ["adopsi", "angkat anak"],
        description: "Pencatatan pengangkatan anak dan penerbitan catatan pinggir akta kelahiran.",
        requirements: [
            "Fotokopi salinan penetapan pengadilan",
            "Kutipan akta kelahiran anak",
            "Fotokopi KK orang tua angkat",
            "Fotokopi Dokumen Perjalanan (jika Orang Tua Angkat Warga Negara Asing)"
        ],
        procedure: [
            "Mengisi F-2.01",
            "Datang ke Loket MPP, ambil antrian Layanan Pencatatan Pengangkatan Anak",
            "Serahkan formulir dan persyaratan",
            "Terima resi penerimaan",
            "Tunggu proses penyelesaian catatan pinggir",
            "Ambil catatan pinggir Pengangkatan Anak pada Kutipan Akta Kelahiran di loket"
        ]
    },
    {
        title: "Pencatatan Pengakuan Anak",
        keywords: ["pengakuan anak", "anak diakui"],
        description: "Pencatatan pengakuan anak biologis dan penerbitan akta pengakuan.",
        requirements: [
            "Asli surat pernyataan pengakuan anak dari ayah biologis (disetujui ibu) ATAU fotokopi penetapan pengadilan",
            "Fotokopi surat keterangan perkawinan agama",
            "Kutipan akta kelahiran anak",
            "Fotokopi KK ayah atau ibu"
        ],
        procedure: [
            "Mengisi F-2.01",
            "Datang ke Loket MPP, ambil antrian Layanan Pencatatan Pengakuan Anak",
            "Serahkan formulir dan persyaratan",
            "Terima resi penerimaan",
            "Tunggu proses penyelesaian Akta Pengakuan Anak & Catatan Pinggir",
            "Ambil Kutipan Akta Pengakuan Anak dan Kutipan Akta Kelahiran di loket"
        ]
    },
    {
        title: "Pengakuan Anak (Lahir Luar Kawin Sah)",
        keywords: ["anak luar kawin", "pengakuan"],
        description: "Pencatatan pengakuan anak lahir luar kawin sah melalui penetapan pengadilan.",
        requirements: [
            "Fotokopi salinan penetapan pengadilan",
            "Kutipan akta kelahiran",
            "Fotokopi KK"
        ],
        procedure: [
            "Mengisi F-2.01",
            "Datang ke Loket MPP, ambil antrian Layanan Pencatatan Pengakuan Anak",
            "Serahkan formulir dan persyaratan",
            "Terima resi penerimaan",
            "Tunggu proses penyelesaian Akta Pengakuan Anak & Catatan Pinggir",
            "Ambil dokumen di loket pengambilan"
        ]
    },
    {
        title: "Pencatatan Pengesahan Anak WNI",
        keywords: ["pengesahan anak wni", "sah anak"],
        description: "Pencatatan pengesahan anak WNI melalui perkawinan orang tua setelah kelahiran.",
        requirements: [
            "Kutipan akta kelahiran",
            "Fotokopi kutipan akta perkawinan agama (terjadi sebelum anak lahir)",
            "Fotokopi KK orangtua"
        ],
        procedure: [
            "Mengisi F-2.01",
            "Datang ke Loket MPP, ambil antrian Layanan Pencatatan Pengesahan Anak",
            "Serahkan formulir dan persyaratan",
            "Terima resi penerimaan",
            "Tunggu proses penyelesaian Akta Pengesahan Anak & Catatan Pinggir",
            "Ambil dokumen di loket pengambilan"
        ]
    },
    {
        title: "Pencatatan Pengesahan Anak Warga Negara Asing",
        keywords: ["pengesahan anak warga negara asing", "pengesahan anak WARGA NEGARA ASING"],
        description: "Pencatatan pengesahan anak Warga Negara Asing melalui perkawinan orang tua.",
        requirements: [
            "Kutipan akta kelahiran",
            "Fotokopi kutipan akta perkawinan agama",
            "Fotokopi KK orang tua",
            "Fotokopi Dokumen Perjalanan ayah/ibu Warga Negara Asing"
        ],
        procedure: [
            "Mengisi F-2.01",
            "Datang ke Loket MPP, ambil antrian Layanan Pencatatan Pengesahan Anak",
            "Serahkan formulir dan persyaratan",
            "Terima resi penerimaan",
            "Tunggu proses penyelesaian Akta",
            "Ambil dokumen di loket"
        ]
    },
    {
        title: "Pengesahan Anak (Lahir Sebelum Ortu Nikah Sah Negara)",
        keywords: ["pengesahan anak", "nikah siri"],
        description: "Pencatatan pengesahan anak yang lahir sebelum orang tua nikah sah menurut negara.",
        requirements: [
            "Fotokopi salinan penetapan pengadilan",
            "Kutipan akta kelahiran",
            "Fotokopi KK"
        ],
        procedure: [
            "Mengisi F-2.01",
            "Datang ke Loket MPP, ambil antrian Layanan Pencatatan Pengesahan Anak",
            "Serahkan formulir dan persyaratan",
            "Terima resi penerimaan",
            "Tunggu proses penyelesaian Akta",
            "Ambil dokumen di loket"
        ]
    },
    {
        title: "Pencatatan Perubahan Nama Penduduk",
        keywords: ["ganti nama", "ubah nama"],
        description: "Pencatatan perubahan nama penduduk melalui penetapan pengadilan.",
        requirements: [
            "Fotokopi salinan penetapan pengadilan negeri",
            "Kutipan akta Pencatatan Sipil",
            "Fotokopi KK"
        ],
        procedure: [
            "Mengisi F-2.01",
            "Datang ke Loket MPP, ambil antrian Layanan Pencatatan Perubahan Nama",
            "Serahkan formulir dan persyaratan",
            "Terima resi penerimaan",
            "Tunggu proses penyelesaian",
            "Ambil Kutipan Akta dengan Catatan Pinggir Perubahan Nama di loket"
        ]
    },
    {
        title: "Pencatatan Peristiwa Penting Lainnya",
        keywords: ["peristiwa penting", "ganti kelamin"],
        description: "Pencatatan peristiwa penting lainnya seperti ganti kelamin, dll.",
        requirements: [
            "Fotokopi salinan penetapan pengadilan negeri tentang Peristiwa Penting lainnya",
            "Kutipan akta Pencatatan Sipil",
            "Fotokopi KK"
        ],
        procedure: [
            "Mengisi F-2.01",
            "Datang ke Loket MPP, ambil antrian Layanan Pencatatan Peristiwa Penting Lainnya",
            "Serahkan formulir dan persyaratan",
            "Terima resi penerimaan",
            "Tunggu proses penyelesaian",
            "Ambil dokumen dengan Catatan Pinggir di loket"
        ]
    },
    {
        title: "Pencatatan Pembetulan Akta Pencatatan Sipil",
        keywords: ["benerin akta", "akta salah tulis"],
        description: "Pencatatan pembetulan akta karena kesalahan redaksional dalam penulisan.",
        requirements: [
            "Fotokopi dokumen autentik yang menjadi persyaratan pembuatan Akta (cth: Ijazah/Buku Nikah)",
            "Kutipan akta Pencatatan Sipil yang salah tulis redaksional"
        ],
        procedure: [
            "Mengisi F-2.01",
            "Datang ke Loket MPP, ambil antrian Layanan Pencatatan Pembetulan Akta",
            "Serahkan formulir dan persyaratan",
            "Terima resi penerimaan",
            "Tunggu proses penyelesaian",
            "Ambil Kutipan Akta Baru sesuai pembetulan di loket"
        ]
    },
    {
        title: "Layanan PERMOHONAN AHLI WARIS",
        keywords: ["ahli waris", "waris", "surat waris"],
        description: "Layanan permohonan surat keterangan ahli waris dengan persyaratan lengkap.",
        requirements: [
            "F.C KTP dan KK semua ahli waris",
            "F.C Akte Kelahiran / Kenal Lahir semua ahli waris",
            "F.C Surat / Akta Kematian Pewaris (yang meninggal)",
            "F.C Surat Nikah Pewaris (dilegalisir) / F.C Akta Cerai (dilegalisir) apabila sudah cerai",
            "Registrasi Buku Pendaftaran Nikah dari KUA (apabila tidak ada Surat/Akta Nikah)",
            "F.C KTP dua orang saksi (saksi di luar/selain ahli waris)",
            "Surat Keterangan dari Kelurahan/Desa apabila ada perbedaan identitas",
            "Materai Rp. 10.000,- (2 buah)",
            "Photo Copy KTP RT, RW",
            "Surat Kesaksian Tidak Memiliki Keturunan (apabila almarhum tidak memiliki keturunan)",
            "Surat Pernyataan apabila diperlukan"
        ],
        procedure: [],
        templates: [
            { title: "Surat Bagan Ahli Waris (PDF)", url: "Template Waris/SURAT BAGAN AHLI WARIS.pdf" },
            { title: "Surat Kuasa (PDF)", url: "Template Waris/SURAT KUASA.pdf" },
            { title: "Surat Pernyataan Dua Orang Saksi (PDF)", url: "Template Waris/SURAT PERNYATAAN DUA ORANG SAKSI.pdf" },
            { title: "Surat Pernyataan Pemohon Ahli Waris (PDF)", url: "Template Waris/SURAT PERNYATAAN PEMOHON SURAT KETERANGAN AHLI WARIS.pdf" }
        ]
    },
    {
        title: "Pencatatan Pembatalan Akta Sipil (Pengadilan)",
        keywords: ["batal akta pengadilan"],
        description: "Pencatatan pembatalan akta sipil berdasarkan putusan pengadilan.",
        requirements: [
            "Fotokopi salinan putusan pengadilan yang telah mempunyai kekuatan hukum tetap",
            "Kutipan akta Pencatatan Sipil yang dibatalkan",
            "Fotokopi KK"
        ],
        procedure: [
            "Mengisi F-2.01",
            "Datang ke Loket MPP, ambil antrian Layanan Pencatatan Pembatalan Akta",
            "Serahkan formulir dan persyaratan",
            "Terima resi penerimaan",
            "Tunggu proses penyelesaian",
            "Ambil dokumen hasil (Catatan Pinggir & Pencabutan) di loket"
        ]
    },
    {
        title: "Pencatatan Pembatalan Akta Sipil (Tanpa Pengadilan/Contrarius Actus)",
        keywords: ["batal akta", "contrarius actus"],
        description: "Pencatatan pembatalan akta sipil tanpa pengadilan melalui contrarius actus.",
        requirements: [
            "Kutipan akta Pencatatan Sipil yang dibatalkan",
            "Fotokopi dokumen pendukung yang menguatkan pembatalan",
            "Fotokopi KK",
            "Surat pernyataan tanggung jawab mutlak (SPTJM)"
        ],
        procedure: [
            "Mengisi F-2.01",
            "Datang ke Loket MPP, ambil antrian Layanan Pencatatan Pembatalan Akta",
            "Serahkan formulir dan persyaratan",
            "Terima resi penerimaan",
            "Tunggu proses penyelesaian",
            "Ambil dokumen hasil (Catatan Pinggir & Pencabutan) di loket"
        ]
    },
    {
        title: "Pencatatan Perubahan Status Kewarganegaraan WNA Menjadi WNI",
        keywords: ["jadi wni", "naturalisasi"],
        description: "Pencatatan perubahan status kewarganegaraan dari WNA menjadi WNI melalui naturalisasi.",
        requirements: [
            "Fotokopi Keputusan Presiden/Menteri tentang pewarganegaraan",
            "Berita acara pengucapan sumpah",
            "Kutipan Akta Pencatatan Sipil Asli",
            "KK Asli & KTP-el Asli",
            "Fotokopi Dokumen Perjalanan"
        ],
        procedure: [
            "Mengisi F-2.01",
            "Datang ke Loket MPP, ambil antrian Layanan Perubahan Status Kewarganegaraan",
            "Serahkan formulir dan persyaratan",
            "Terima resi penerimaan",
            "Tunggu proses penyelesaian",
            "Ambil Catatan Pinggir / Surat Keterangan di loket"
        ]
    },
    {
        title: "Pencatatan Anak Berkewarganegaraan Ganda (ABG) - Pendaftaran",
        keywords: ["abg", "kewarganegaraan ganda"],
        description: "Pencatatan pendaftaran anak berkewarganegaraan ganda (ABG).",
        requirements: [
            "Fotokopi Sertifikat Bukti Pendaftaran ABG dari Kantor Imigrasi/Perwakilan RI",
            "Kutipan akta kelahiran asli"
        ],
        procedure: [
            "Pemohon melapor ke Dinas atau Perwakilan RI",
            "Serahkan berkas persyaratan",
            "Petugas memberikan Catatan Pinggir pada Akta Kelahiran"
        ]
    },
    {
        title: "Pencatatan ABG Memilih Menjadi WNI",
        keywords: ["abg wni", "anak pilih wni"],
        description: "Pencatatan perubahan status ABG yang memilih menjadi WNI.",
        requirements: [
            "Fotokopi Keputusan Menteri tentang perubahan status kewarganegaraan",
            "Kutipan akta Pencatatan Sipil asli",
            "Fotokopi KK bagi Penduduk WNI"
        ],
        procedure: [
            "Pemohon melapor ke Dinas atau Perwakilan RI",
            "Serahkan berkas persyaratan",
            "Petugas memberikan Catatan Pinggir pada Akta Sipil"
        ]
    },
    {
        title: "Pencatatan ABG Memilih Menjadi WNA",
        keywords: ["abg wna", "anak pilih wna"],
        description: "Pencatatan perubahan status ABG yang memilih menjadi WNA.",
        requirements: [
            "Fotokopi Surat Bukti Penyerahan Dokumen Kewarganegaraan dan Keimigrasian",
            "Asli kutipan akta kelahiran"
        ],
        procedure: [
            "Pemohon melapor ke Dinas atau Perwakilan RI",
            "Serahkan berkas persyaratan",
            "Petugas memberikan Catatan Pinggir pada Akta Kelahiran"
        ]
    }
];
