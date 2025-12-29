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
      logs: 'bedas_audit_logs',
      surveys: 'bedas_surveys',
      survey_stats: 'bedas_survey_stats', // PERMANENT LOG
      aggregates: 'bedas_survey_aggregates', // LIGHTWEIGHT COUNTERS
      counts: 'bedas_counts' // GLOBAL COUNTERS (Hemat Bandwidth)
    };
    this.initialized = false;
    this.db = null;
    this.init();
  }

  async init() {
    if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
      this.db = firebase.database();
      
      // AUTO ANONYMOUS AUTH (Only for Public Pages)
      const isAdminPage = window.location.pathname.includes('admin.html') || window.location.pathname.includes('login.html');
      
      if (firebase.auth && !isAdminPage) {
        try {
          await firebase.auth().signInAnonymously();
          console.log('BedasDB: Anonymous Auth Success (Warga Mode)');
        } catch(e) {
          console.error('Anonymous Auth Failed:', e);
        }
      }

      console.log('BedasDB: Firebase Connected');
      this.initialized = true;
      // Coba migrasi data lokal ke cloud jika cloud kosong
      this.checkAndMigrate();
      // Cek counter
      this.checkAndMigrateCounts();
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

  _getRef(collectionKey) {
    if (!this.db) throw new Error("Database not initialized");
    const path = this.collectionNames[collectionKey];
    if (!path) throw new Error(`Invalid collection key: ${collectionKey}`);
    return this.db.ref(path);
  }

  async getAll(collectionKey) {
    try {
        const ref = this._getRef(collectionKey);
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
    const path = this.collectionNames[collectionKey];
    if (!path) { console.error('Invalid collection:', collectionKey); return; }

    const ref = this.db.ref(path + '/' + data.id);
    await ref.set(data);
    return data;
  }

  async update(collectionKey, id, newData) {
    if (!this.db) return;
    const path = this.collectionNames[collectionKey];
    if (!path) return;
    
    const ref = this.db.ref(path + '/' + id);
    await ref.update(newData);
  }

  async delete(collectionKey, id) {
    if (!this.db) return;
    const path = this.collectionNames[collectionKey];
    if (!path) return;

    const ref = this.db.ref(path + '/' + id);
    await ref.remove();
  }

  async setAll(collectionKey, dataArray) {
    if (!this.db) return;
    const path = this.collectionNames[collectionKey];
    if (!path) {
        console.error(`CRITICAL: Attempted to setAll on invalid key '${collectionKey}'. Operation aborted.`);
        return;
    }
    // Overwrite seluruh node (cocok untuk array yang butuh urutan)
    const ref = this.db.ref(path);
    await ref.set(dataArray);
  }

  async deleteAll(collectionKey) {
    if (!this.db) return;
    const path = this.collectionNames[collectionKey];
    if (!path) return;

    const ref = this.db.ref(path);
    await ref.remove();
  }

  // --- REAL-TIME LISTENERS ---
  subscribe(collectionKey, callback) {
    if (!this.db) return;
    const path = this.collectionNames[collectionKey];
    if (!path) return;

    const ref = this.db.ref(path);
    
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

  subscribeAggregates(callback) {
      if (!this.db) return;
      const ref = this.db.ref(this.collectionNames.aggregates);
      ref.on('value', (snapshot) => {
          const val = snapshot.val() || { puas:0, cukup:0, kurang:0, total:0 };
          callback(val);
      });
  }

  unsubscribe(collectionKey) {
      if (!this.db) return;
      const ref = this.db.ref(this.collectionNames[collectionKey]);
      ref.off();
  }


  // --- SPECIFIC HELPERS (Keep interface identical) ---

  async getSubmissions() { return this.getAll('submissions'); }
  async addSubmission(data) { 
      // Increment Counter (Hemat Bandwidth for Index)
      try {
        const countRef = this.db.ref(this.collectionNames.counts + '/served_total');
        countRef.transaction(c => (c || 0) + 1);
      } catch(e) { console.error(e); }

      return this.add('submissions', data); 
  }
  
  async getStats() { return this.getAll('stats'); }
  async addStat(data) { 
      // Increment Counter
      try {
        const countRef = this.db.ref(this.collectionNames.counts + '/served_total');
        countRef.transaction(c => (c || 0) + 1);
      } catch(e) { console.error(e); }

      return this.add('stats', data); 
  }

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

  async clearLogs() {
      if (!this.db) return;
      return this.db.ref(this.collectionNames.logs).remove();
  }

  async getPlaces() { return this.getAll('places'); }
  async savePlaces(data) { return this.setAll('places', data); }

  // --- SURVEY HELPERS ---
  async getSurveys() { return this.getAll('surveys'); }
  
  async getSurveyAggregates() {
      // 1. Coba ambil data aggregates (hemat bandwidth)
      try {
          const ref = this._getRef('aggregates');
          const snapshot = await ref.once('value');
          let agg = snapshot.val();

          // 2. Jika kosong, cek apakah perlu migrasi dari stats lama
          if (!agg) {
              const stats = await this.getAll('survey_stats');
              if (stats && stats.length > 0) {
                  agg = { puas:0, cukup:0, kurang:0, total:0 };
                  stats.forEach(s => {
                      const r = (s.rating || '').toLowerCase().trim();
                      if(r === 'puas' || (r.includes('puas') && !r.includes('tidak'))) agg.puas++;
                      else if(r === 'cukup') agg.cukup++;
                      else if(r === 'tidak_puas' || r === 'kurang' || r.includes('tidak')) agg.kurang++;
                      agg.total++;
                  });
                  await ref.set(agg);
              }
          }
          return agg || { puas:0, cukup:0, kurang:0, total:0 };
      } catch(e) {
          return { puas:0, cukup:0, kurang:0, total:0 };
      }
  }

  async getSurveyStats() {
      // Return Permanent Stats (Full List)
      // MIGRATION CHECK: Jika Stats kosong tapi Active ada, copy Active -> Stats
      try {
          let stats = await this.getAll('survey_stats');
          if (!stats || stats.length === 0) {
              const active = await this.getAll('surveys');
              if (active && active.length > 0) {
                  await this.setAll('survey_stats', active);
                  
                  // Also trigger aggregate build
                  this.getSurveyAggregates(); 
                  
                  return active;
              }
          }
          return stats;
      } catch(e) { return []; }
  }

  async addSurvey(data) { 
    // Check if submission_id exists to prevent duplicates (One-to-One logic)
    if (data.submission_id) {
        const surveys = await this.getSurveys();
        const exists = surveys.find(s => s.submission_id === data.submission_id);
        if (exists) {
            console.warn('Survey already exists for this submission.');
            return exists;
        }
    }
    
    // 1. Add to Active (bedas_surveys)
    await this.add('surveys', data);
    
    // 2. Add to Permanent Stats (bedas_survey_stats)
    try {
        await this.add('survey_stats', data);
    } catch(e) { console.error('Failed to sync survey stats', e); }

    // 3. Update Aggregates (Atomic Increment) - Hemat Bandwidth
    try {
        const r = (data.rating || '').toLowerCase().trim();
        let key = 'kurang';
        if(r === 'puas' || (r.includes('puas') && !r.includes('tidak'))) key = 'puas';
        else if(r === 'cukup') key = 'cukup';
        
        const aggRef = this._getRef('aggregates');
        
        // Update Total
        aggRef.child('total').transaction(current => (current || 0) + 1);
        // Update Specific Rating
        aggRef.child(key).transaction(current => (current || 0) + 1);
        
    } catch(e) { console.error('Failed to update aggregates', e); }

    return data;
  }

}

// Global Instance
window.BedasDB = new BedasDBService();
