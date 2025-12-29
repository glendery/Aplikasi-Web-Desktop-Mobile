// KONFIGURASI FIREBASE - Dayeuhkolot Bedas
// Diperbarui pada: 2025-12-29

const firebaseConfig = {
  apiKey: "AIzaSyAhQzsxEDxKk6RcBHoc1kWnrkvPj6MXH3E",
  authDomain: "dayeuhkolot-bedas.firebaseapp.com",
  // Perhatikan: URL Database harus bersih tanpa spasi atau backtick
  databaseURL: "https://dayeuhkolot-bedas-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dayeuhkolot-bedas",
  storageBucket: "dayeuhkolot-bedas.firebasestorage.app",
  messagingSenderId: "282073106610",
  appId: "1:282073106610:web:e4f745c09ed058743261ab"
};

// Initialize Firebase (Compat/Global Mode)
if (typeof firebase !== 'undefined') {
  try {
      // Mencegah inisialisasi ganda
      if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
          console.log('Firebase initialized successfully (New Project: dayeuhkolot-bedas)');
      }
  } catch(e) {
      console.error('Firebase initialization error:', e);
      alert('Gagal menghubungkan ke database: ' + e.message);
  }
} else {
  console.error('Firebase SDK not found! Pastikan script Firebase dimuat di HTML.');
}
