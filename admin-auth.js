/**
 * BEDAS SERVE - Secure Admin Authentication Module
 * Menggunakan Web Crypto API untuk hashing dan sessionStorage untuk manajemen sesi.
 */

const AUTH_CONFIG = {
  // Default credential hash (admin / password123) - SHA-256
  // Dalam produksi, ini harus diambil dari database backend.
  DEFAULT_USER: 'admin',
  DEFAULT_PASS_HASH: '8ed958c816ea7e3cdea3f1269c423f7d4c040148baa6564080193072bf94c2a0', 
  SALT: 'bedas-secure-salt-v1', // Simple client-side salt
  MAX_ATTEMPTS: 5,
  LOCKOUT_TIME: 15 * 60 * 1000, // 15 menit
  SESSION_DURATION: 60 * 60 * 1000 // 1 jam
};

const DB_KEYS = {
  SESSION: 'bedas_admin_session',
  ATTEMPTS: 'bedas_login_attempts',
  AUDIT: 'bedas_audit_log',
  PASSWORD: 'bedas_admin_password_hash', // New key for password
  LAST_ACTIVE: 'bedas_admin_last_active' // New key for activity tracking
};

// --- Role-Based Access Control (RBAC) ---
const ROLE_CONFIG = {
  admin: { permissions: ['*'] },
  editor: { permissions: [
    'read',
    'add_komitmen','edit_komitmen',
    'add_social','edit_social',
    'add_service','edit_service',
    'add_gallery','edit_gallery'
  ] }
};

// --- Utilities ---

async function hashString(str) {
  const msgBuffer = new TextEncoder().encode(str + AUTH_CONFIG.SALT);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function getAttempts() {
  try {
    const data = JSON.parse(localStorage.getItem(DB_KEYS.ATTEMPTS) || '{}');
    if (data.lockoutUntil && Date.now() > data.lockoutUntil) {
      return { count: 0, lockoutUntil: null };
    }
    return data;
  } catch {
    return { count: 0, lockoutUntil: null };
  }
}

function recordAttempt(success) {
  const attempts = getAttempts();
  if (success) {
    localStorage.removeItem(DB_KEYS.ATTEMPTS);
  } else {
    attempts.count = (attempts.count || 0) + 1;
    if (attempts.count >= AUTH_CONFIG.MAX_ATTEMPTS) {
      attempts.lockoutUntil = Date.now() + AUTH_CONFIG.LOCKOUT_TIME;
    }
    localStorage.setItem(DB_KEYS.ATTEMPTS, JSON.stringify(attempts));
  }
  return attempts;
}

// --- Audit Log ---

function logActivity(action, details, user = 'admin') {
  const entry = {
    id: Date.now().toString(36) + Math.random().toString(36).substr(2),
    ts: new Date().toISOString(),
    user,
    action,
    details,
    ip: '127.0.0.1' // Simulasi
  };
  
  if (window.BedasDB) {
      window.BedasDB.addLog(entry).catch(e => console.error('Log failed', e));
  } else {
      const logs = JSON.parse(localStorage.getItem(DB_KEYS.AUDIT) || '[]');
      logs.unshift(entry);
      if (logs.length > 100) logs.pop();
      localStorage.setItem(DB_KEYS.AUDIT, JSON.stringify(logs));
  }
}

// --- Auth Functions ---

async function login(username, password) {
  // 1. Cek Rate Limit
  const attempts = getAttempts();
  if (attempts.lockoutUntil && Date.now() < attempts.lockoutUntil) {
    const waitMin = Math.ceil((attempts.lockoutUntil - Date.now()) / 60000);
    throw new Error(`Terlalu banyak percobaan gagal. Coba lagi dalam ${waitMin} menit.`);
  }

  // 2. Simulasi Delay Network (untuk mencegah timing attack)
  await new Promise(r => setTimeout(r, 800));

  // 3. Validasi Credential
  const passHash = await hashString(password);
  
  // Ambil password tersimpan atau default
  const storedHash = localStorage.getItem(DB_KEYS.PASSWORD) || AUTH_CONFIG.DEFAULT_PASS_HASH;
  
  if (username === AUTH_CONFIG.DEFAULT_USER && passHash === storedHash) {
    // Sukses
    recordAttempt(true);
    
    // Buat Session
    const session = {
      token: Array.from(crypto.getRandomValues(new Uint8Array(32))).map(b => b.toString(16).padStart(2,'0')).join(''),
      user: username,
      role: 'admin',
      expiry: Date.now() + AUTH_CONFIG.SESSION_DURATION
    };
    
    sessionStorage.setItem(DB_KEYS.SESSION, JSON.stringify(session));
    localStorage.setItem(DB_KEYS.LAST_ACTIVE, Date.now()); // Set initial activity
    logActivity('LOGIN', 'Login berhasil');
    return { success: true };
  } else {
    // Gagal
    const newAttempts = recordAttempt(false);
    logActivity('LOGIN_FAILED', `Percobaan login gagal: ${username}`);
    
    if (newAttempts.lockoutUntil) {
      throw new Error('Akun terkunci sementara karena terlalu banyak percobaan gagal.');
    }
    throw new Error('Username atau password salah.');
  }
}

async function changePassword(newPassword) {
    if(!newPassword || newPassword.length < 6) throw new Error('Password minimal 6 karakter');
    const newHash = await hashString(newPassword);
    localStorage.setItem(DB_KEYS.PASSWORD, newHash);
    logActivity('CHANGE_PASSWORD', 'Password admin diubah permanen');
    return true;
}

function logout() {
  logActivity('LOGOUT', 'User logout');
  sessionStorage.removeItem(DB_KEYS.SESSION);
  localStorage.removeItem(DB_KEYS.LAST_ACTIVE);
  window.location.href = 'login.html';
}

function checkSession() {
  try {
    const session = JSON.parse(sessionStorage.getItem(DB_KEYS.SESSION));
    if (!session || !session.token || Date.now() > session.expiry) {
      return false;
    }
    
    // Check inactivity (10 minutes = 600000 ms)
    const lastActive = parseInt(localStorage.getItem(DB_KEYS.LAST_ACTIVE) || '0');
    if (Date.now() - lastActive > 600000) { 
        return false; // Session expired due to inactivity
    }
    
    return true;
  } catch {
    return false;
  }
}

function updateActivity() {
    localStorage.setItem(DB_KEYS.LAST_ACTIVE, Date.now());
}

function requireAuth() {
  if (!checkSession()) {
    // If session invalid or expired, clear it
    sessionStorage.removeItem(DB_KEYS.SESSION);
    window.location.href = 'login.html?return=' + encodeURIComponent(window.location.pathname);
  }
}

function getSession() {
  try { return JSON.parse(sessionStorage.getItem(DB_KEYS.SESSION) || 'null'); } catch { return null; }
}

function getCurrentUser() {
  const s = getSession();
  return s && s.user ? s.user : 'anonymous';
}

function can(action) {
  const s = getSession();
  if (!s || !s.role) return false;
  const role = s.role;
  const cfg = ROLE_CONFIG[role] || { permissions: [] };
  if (cfg.permissions.includes('*')) return true;
  return cfg.permissions.includes(action);
}

// Export global
window.AdminAuth = {
  login,
  logout,
  checkSession,
  requireAuth,
  logActivity,
  getAuditLogs: async () => { 
      if(window.BedasDB) return await window.BedasDB.getLogs(); 
      return JSON.parse(localStorage.getItem(DB_KEYS.AUDIT) || '[]'); 
  },
  getSession,
  getCurrentUser,
  can,
  changePassword,
  updateActivity
};
