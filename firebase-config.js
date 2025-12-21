// KONFIGURASI FIREBASE
// Diambil dari screenshot user

const firebaseConfig = {
  apiKey: "AIzaSyBmfgEW_po8JqvVmBNS_Nxf5AIKY568Gwk",
  authDomain: "bedaserve-90c39.firebaseapp.com",
  projectId: "bedaserve-90c39",
  storageBucket: "bedaserve-90c39.firebasestorage.app",
  messagingSenderId: "462010407830",
  appId: "1:462010407830:web:0caaf98f7eda7d6fe0dbb7",
  // Database URL (Updated to Singapore Region)
  databaseURL: "https://bedaserve-90c39-default-rtdb.asia-southeast1.firebasedatabase.app" 
};

// Initialize Firebase
if (typeof firebase !== 'undefined') {
  try {
      firebase.initializeApp(firebaseConfig);
      console.log('Firebase initialized successfully');
  } catch(e) {
      console.error('Firebase initialization error:', e);
  }
} else {
  console.error('Firebase SDK not found!');
}
