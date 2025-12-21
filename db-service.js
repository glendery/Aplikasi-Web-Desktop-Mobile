/**
 * BedasDB - Unified Data Service (Firebase Realtime Database)
 * Mengelola penyimpanan data via Firebase (Cloud Sync).
 * Mendukung sinkronisasi antar perangkat.
 */

class BedasDBService {
  constructor() {
    this.collectionNames = {
      submissions: 'bedas_submissions',
      stats: 'bedas_submissions_stats',
      services: 'bedas_services_db',
      gallery: 'bedas_gallery',
      komitmen: 'bedas_komitmen',
      social: 'bedas_social',
      places: 'bedas_places', // Untuk peta
      featured: 'bedas_featured_services',
      popular: 'bedas_popular_services',
      gallery_cfg: 'bedas_gallery_config',
      positions_cfg: 'bedas_positions_config',
      logs: 'bedas_audit_logs'
    };
    this.initialized = false;
    this.db = null;
    this.init();
  }

  async init() {
    if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
      this.db = firebase.database();
      console.log('BedasDB: Firebase Connected');
      this.initialized = true;
      // Coba migrasi data lokal ke cloud jika cloud kosong
      this.checkAndMigrate();
    } else {
      console.error('BedasDB: Firebase SDK not found or config missing!');
      alert('Koneksi Database Gagal. Pastikan file firebase-config.js sudah diisi dengan benar.');
    }
  }

  // --- MIGRATION HELPERS ---
  async checkAndMigrate() {
    try {
      const checkRef = this.db.ref(this.collectionNames.services);
      const snapshot = await checkRef.once('value');
      if (!snapshot.exists()) {
        console.log('BedasDB: Cloud kosong, memulai migrasi dari LocalStorage...');
        await this.migrateLocalToCloud();
      }
    } catch (e) {
      console.error('Migration Check Failed:', e);
    }
  }

  async migrateLocalToCloud() {
    for (const [key, colName] of Object.entries(this.collectionNames)) {
      const localData = localStorage.getItem(colName);
      if (localData) {
        try {
          const parsed = JSON.parse(localData);
          // Upload ke Firebase
          await this.db.ref(colName).set(parsed);
          console.log(`Migrated ${key} to Cloud.`);
        } catch (e) {
          console.warn(`Skipping ${key}, invalid JSON.`);
        }
      }
    }
    alert('Sinkronisasi Awal Selesai! Data lokal telah diunggah ke Cloud.');
  }

  // --- GENERIC HELPERS ---

  async getAll(collectionKey) {
    if (!this.db) return [];
    try {
        const ref = this.db.ref(this.collectionNames[collectionKey]);
        const snapshot = await ref.once('value');
        const val = snapshot.val();
        
        if (!val) return [];
        if (Array.isArray(val)) return val;
        // Jika format Object (id-based), konversi ke Array agar kompatibel dengan UI
        return Object.values(val);
    } catch(e) { 
        console.error(`Error getting ${collectionKey}:`, e);
        return []; 
    }
  }

  async add(collectionKey, data) {
    if (!this.db) return;
    if (!data.id) {
        data.id = Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    // Gunakan set pada path ID agar update mudah
    const ref = this.db.ref(this.collectionNames[collectionKey] + '/' + data.id);
    await ref.set(data);
    return data;
  }

  async update(collectionKey, id, newData) {
    if (!this.db) return;
    const ref = this.db.ref(this.collectionNames[collectionKey] + '/' + id);
    await ref.update(newData);
  }

  async delete(collectionKey, id) {
    if (!this.db) return;
    const ref = this.db.ref(this.collectionNames[collectionKey] + '/' + id);
    await ref.remove();
  }

  async setAll(collectionKey, dataArray) {
    if (!this.db) return;
    // Overwrite seluruh node (cocok untuk array yang butuh urutan)
    const ref = this.db.ref(this.collectionNames[collectionKey]);
    await ref.set(dataArray);
  }

  async deleteAll(collectionKey) {
    if (!this.db) return;
    const ref = this.db.ref(this.collectionNames[collectionKey]);
    await ref.remove();
  }

  // --- REAL-TIME LISTENERS ---
  subscribe(collectionKey, callback) {
    if (!this.db) return;
    const ref = this.db.ref(this.collectionNames[collectionKey]);
    
    ref.on('value', (snapshot) => {
        const val = snapshot.val();
        let data = [];
        if (val) {
            if (Array.isArray(val)) data = val;
            else data = Object.values(val);
        }
        callback(data);
    });
  }

  unsubscribe(collectionKey) {
      if (!this.db) return;
      const ref = this.db.ref(this.collectionNames[collectionKey]);
      ref.off();
  }


  // --- SPECIFIC HELPERS (Keep interface identical) ---

  async getSubmissions() { return this.getAll('submissions'); }
  async addSubmission(data) { return this.add('submissions', data); }
  
  async getStats() { return this.getAll('stats'); }
  async addStat(data) { return this.add('stats', data); }

  async getServices() { return this.getAll('services'); }
  async saveServices(data) { return this.setAll('services', data); }

  async getFeatured() { return this.getAll('featured'); }
  async saveFeatured(data) { return this.setAll('featured', data); }

  async getPopular() { return this.getAll('popular'); }
  async savePopular(data) { return this.setAll('popular', data); }
  
  async getGallery() { return this.getAll('gallery'); }
  async saveGallery(data) { return this.setAll('gallery', data); }

  async getKomitmen() { return this.getAll('komitmen'); }
  async saveKomitmen(data) { return this.setAll('komitmen', data); }
  
  async getSocial() { return this.getAll('social'); }
  async saveSocial(data) { return this.setAll('social', data); }

  async getGalleryCfg() {
    const defaultCfg = {interval_ms:2500, animation_ms:500, priority_order:['Camat','Wakil Camat']};
    try {
      const snapshot = await this.db.ref(this.collectionNames.gallery_cfg).once('value');
      return snapshot.val() || defaultCfg;
    } catch(e) { return defaultCfg; }
  }

  async saveGalleryCfg(data) {
    if (!this.db) return;
    await this.db.ref(this.collectionNames.gallery_cfg).set(data);
  }

  async getPositions() {
    const defaultPos = ['Camat','Wakil Camat','Sekretaris Kecamatan','Kasi Pemerintahan','Kasi Pelayanan'];
    try {
        const snapshot = await this.db.ref(this.collectionNames.positions_cfg).once('value');
        return snapshot.val() || defaultPos;
    } catch(e) { return defaultPos; }
  }

  async savePositions(list) {
    if (!this.db) return;
    await this.db.ref(this.collectionNames.positions_cfg).set(list);
  }

  async getLogs() { 
      // Logs biasanya Array, tapi kita pastikan return Array
      return this.getAll('logs'); 
  }
  async addLog(data) {
      // Untuk logs, kita bisa pakai push agar efisien, atau unshift array.
      // Karena admin.html mengharapkan array terurut (terbaru di atas), 
      // Firebase tidak punya unshift.
      // Strategi: Ambil semua, unshift, simpan balik (seperti LocalStorage).
      // INI TIDAK EFISIEN UNTUK DATA BESAR, tapi konsisten dengan logic lama.
      // Dan menjaga urutan array [new, old, old...]
      
      try {
          const logs = await this.getLogs();
          logs.unshift(data);
          if(logs.length > 200) logs.pop(); // Limit 200
          await this.setAll('logs', logs);
      } catch(e) { console.error(e); }
  }

  async getPlaces() { return this.getAll('places'); }
  async savePlaces(data) { return this.setAll('places', data); }

}

// Global Instance
window.BedasDB = new BedasDBService();
