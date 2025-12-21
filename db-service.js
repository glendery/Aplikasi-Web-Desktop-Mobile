/**
 * BedasDB - Unified Data Service
 * Mengelola penyimpanan data baik via Firebase (Online) atau LocalStorage (Offline/Fallback).
 */

class BedasDBService {
  constructor() {
    this.useFirebase = false;
    this.firebaseDisabled = false; // Kill switch if critical error
    this.db = null;
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
  }

  // Handle critical errors (like project not found)
  _handleFirebaseError(e) {
      if(e && e.code === 'not-found' || (e.message && e.message.includes('database (default) does not exist'))) {
          console.warn('BedasDB: Critical Firebase Error. Switching to Offline Mode permanently for this session.');
          this.useFirebase = false;
          this.firebaseDisabled = true;
          return true; // Handled
      }
      return false; // Not critical
  }

  async init() {
    // Cek apakah firebaseConfig tersedia dan valid
    if (typeof firebaseConfig !== 'undefined' && firebaseConfig.apiKey) {
      try {
        // Cek apakah Firebase SDK sudah dimuat
        if (typeof firebase !== 'undefined') {
          if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
          }
          this.db = firebase.firestore();
          
          // Test Connection immediately to catch 'not-found' error early
          try {
             // Try to access a non-existent doc just to check connection/existence
             await this.db.collection('init_check').doc('test').get();
          } catch(err) {
             if(this._handleFirebaseError(err)) {
                 console.log('BedasDB: Menggunakan LocalStorage (Offline Mode - Config Error)');
                 return;
             }
          }

          // Initialize Analytics if available
          if (firebase.analytics) {
            firebase.analytics();
          }
          // Enable offline persistence if possible
          try {
            await this.db.enablePersistence();
          } catch (err) {
            console.warn('Firebase persistence disabled:', err.code);
          }
          
          if(!this.firebaseDisabled) {
              this.useFirebase = true;
              console.log('BedasDB: Menggunakan Firebase (Cloud Mode)');
              return;
          }
        }
      } catch (e) {
        console.error('BedasDB: Gagal inisialisasi Firebase', e);
      }
    }
    console.log('BedasDB: Menggunakan LocalStorage (Local Mode)');
  }

  // --- GENERIC HELPERS ---

  async getAll(collectionKey) {
    if (this.useFirebase && !this.firebaseDisabled) {
        try {
            const snapshot = await this.db.collection(this.collectionNames[collectionKey]).get();
            let items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            
            // SMART SYNC: If Cloud is empty but Local has data, SEED Cloud from Local
            if (items.length === 0) {
                try {
                    const localRaw = localStorage.getItem(this.collectionNames[collectionKey]);
                    const localData = localRaw ? JSON.parse(localRaw) : [];
                    if (localData.length > 0) {
                        console.log(`[BedasDB] Seeding Cloud from Local for ${collectionKey}`);
                        // Don't await this to speed up UI, but trigger the save
                        this.setAll(collectionKey, localData).catch(e => console.error(e));
                        return localData; 
                    }
                } catch(err) { console.error(err); }
            }

            // Normal Sync: Cloud is source of truth (if not empty)
            if (items.length > 0) {
                localStorage.setItem(this.collectionNames[collectionKey], JSON.stringify(items));
            }
            
            return items;
        } catch(e) {
            console.error('DB Read Error (Firebase), falling back to LocalStorage:', e);
            this._handleFirebaseError(e);
            // Fallback to local storage
            try {
                const localData = localStorage.getItem(this.collectionNames[collectionKey]);
                return localData ? JSON.parse(localData) : [];
            } catch(err) { return []; }
        }
    } 
    
    // LocalStorage Logic
    try {
        const localData = localStorage.getItem(this.collectionNames[collectionKey]);
        return localData ? JSON.parse(localData) : [];
    } catch(e) { return []; }
  }

  async add(collectionKey, data) {
    if (!data.id) {
        // Generate ID jika belum ada
        data.id = Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    if (this.useFirebase && !this.firebaseDisabled) {
      try {
        // Gunakan ID dari data sebagai Doc ID agar konsisten
        await this.db.collection(this.collectionNames[collectionKey]).doc(data.id).set(data);
        // Also update LocalStorage for consistency immediately
        this._updateLocal(collectionKey, data, 'add');
        return data;
      } catch (e) {
        console.error('DB Write Error (Firebase), falling back to LocalStorage:', e);
        this._handleFirebaseError(e);
        // Fallback execution continues below
      }
    } 
    
    // LocalStorage Logic (Fallback or Default)
    return this._updateLocal(collectionKey, data, 'add');
  }

  async update(collectionKey, id, newData) {
    if (this.useFirebase && !this.firebaseDisabled) {
      try {
        await this.db.collection(this.collectionNames[collectionKey]).doc(id).update(newData);
        // Sync local
        const current = (await this.getAll(collectionKey)).find(x => x.id === id) || {};
        this._updateLocal(collectionKey, { ...current, ...newData, id }, 'update');
        return;
      } catch(e) {
         console.error('DB Update Error (Firebase), falling back to LocalStorage:', e);
         this._handleFirebaseError(e);
      }
    }
    
    // LocalStorage Fallback
    const list = await this._getLocal(collectionKey);
    const idx = list.findIndex(item => item.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...newData };
      localStorage.setItem(this.collectionNames[collectionKey], JSON.stringify(list));
    }
  }

  async delete(collectionKey, id) {
    if (this.useFirebase && !this.firebaseDisabled) {
      try {
        await this.db.collection(this.collectionNames[collectionKey]).doc(id).delete();
        this._updateLocal(collectionKey, { id }, 'delete');
        return;
      } catch(e) {
        console.error('DB Delete Error (Firebase), falling back to LocalStorage:', e);
        this._handleFirebaseError(e);
      }
    }
    
    // LocalStorage Fallback
    this._updateLocal(collectionKey, { id }, 'delete');
  }

  // Helper for LocalStorage updates
  async _getLocal(collectionKey) {
      try {
        return JSON.parse(localStorage.getItem(this.collectionNames[collectionKey]) || '[]');
      } catch(e) { return []; }
  }

  _updateLocal(collectionKey, data, action) {
      try {
          const key = this.collectionNames[collectionKey];
          let list = JSON.parse(localStorage.getItem(key) || '[]');
          if (action === 'add') {
             const exists = list.findIndex(x => x.id === data.id);
             if(exists === -1) list.push(data);
             else list[exists] = data;
          } else if (action === 'update') {
             const idx = list.findIndex(x => x.id === data.id);
             if(idx !== -1) list[idx] = { ...list[idx], ...data };
          } else if (action === 'delete') {
             list = list.filter(x => x.id !== data.id);
          }
          localStorage.setItem(key, JSON.stringify(list));
          return data;
      } catch(e) { console.error('Local Cache Error', e); return data; }
  }

  async setAll(collectionKey, dataArray) {
    if (this.useFirebase && !this.firebaseDisabled) {
        // Sync logic: Delete items not in dataArray, Update/Add items in dataArray.
        try {
            const collectionRef = this.db.collection(this.collectionNames[collectionKey]);
            const snapshot = await collectionRef.get();
            const batch = this.db.batch();
            
            // 1. Identify IDs in new data
            const newIds = new Set();
            dataArray.forEach(item => {
                if(!item.id) item.id = Date.now().toString(36) + Math.random().toString(36).substr(2);
                newIds.add(item.id);
            });

            // 2. Delete docs not in new data
            snapshot.docs.forEach(doc => {
                if (!newIds.has(doc.id)) {
                    batch.delete(doc.ref);
                }
            });

            // 3. Set/Update new data
            dataArray.forEach(item => {
                const docRef = collectionRef.doc(item.id);
                batch.set(docRef, item);
            });

            await batch.commit();
            // Sync LocalStorage
            localStorage.setItem(this.collectionNames[collectionKey], JSON.stringify(dataArray));
            return;
        } catch(e) {
            console.error('BedasDB: Sync Error (Firebase), falling back to LocalStorage:', e);
            this._handleFirebaseError(e);
            // Fallback to LocalStorage
        }
    } 
    
    // LocalStorage Fallback
    localStorage.setItem(this.collectionNames[collectionKey], JSON.stringify(dataArray));
  }

  async deleteAll(collectionKey) {
    if (this.useFirebase && !this.firebaseDisabled) {
        try {
            const collectionRef = this.db.collection(this.collectionNames[collectionKey]);
            const snapshot = await collectionRef.get();
            const batch = this.db.batch();
            snapshot.docs.forEach(doc => batch.delete(doc.ref));
            await batch.commit();
            localStorage.removeItem(this.collectionNames[collectionKey]);
            return;
        } catch(e) {
            console.error('BedasDB: DeleteAll Error (Firebase), falling back to LocalStorage:', e);
            this._handleFirebaseError(e);
        }
    } 
    
    // LocalStorage Fallback
    localStorage.removeItem(this.collectionNames[collectionKey]);
  }


  // --- SPECIFIC HELPERS ---

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
    if (this.useFirebase && !this.firebaseDisabled) {
      try {
        const doc = await this.db.collection(this.collectionNames.gallery_cfg).doc('main').get();
        if (doc.exists) return doc.data();
        return defaultCfg;
      } catch(e) {
         this._handleFirebaseError(e);
         return defaultCfg;
      }
    } else {
      try {
        const d = localStorage.getItem(this.collectionNames.gallery_cfg);
        if (d) return JSON.parse(d);
        return defaultCfg;
      } catch(e) { return defaultCfg; }
    }
  }

  async saveGalleryCfg(data) {
    if (this.useFirebase && !this.firebaseDisabled) {
      try {
        await this.db.collection(this.collectionNames.gallery_cfg).doc('main').set(data);
        localStorage.setItem(this.collectionNames.gallery_cfg, JSON.stringify(data));
        return;
      } catch(e) {
        console.error('Save Gallery Cfg Error (Firebase), fallback to Local:', e);
        this._handleFirebaseError(e);
      }
    }
    
    // LocalStorage Fallback
    localStorage.setItem(this.collectionNames.gallery_cfg, JSON.stringify(data));
  }

  async getPositions() {
    const defaultPos = ['Camat','Wakil Camat','Sekretaris Kecamatan','Kasi Pemerintahan','Kasi Pelayanan'];
    if (this.useFirebase && !this.firebaseDisabled) {
      try {
        const doc = await this.db.collection(this.collectionNames.positions_cfg).doc('main').get();
        if (doc.exists && doc.data().items) {
             const items = doc.data().items;
             localStorage.setItem(this.collectionNames.positions_cfg, JSON.stringify(items));
             return items;
        }
        return defaultPos;
      } catch(e) {
         // Fallback
         this._handleFirebaseError(e);
         try {
            const d = localStorage.getItem(this.collectionNames.positions_cfg);
            if (d) return JSON.parse(d);
            return defaultPos;
         } catch(err) { return defaultPos; }
      }
    } 
    
    // LocalStorage Logic
    try {
        const d = localStorage.getItem(this.collectionNames.positions_cfg);
        if (d) return JSON.parse(d);
        return defaultPos;
    } catch(e) { return defaultPos; }
  }

  async savePositions(list) {
    if (this.useFirebase && !this.firebaseDisabled) {
      try {
        await this.db.collection(this.collectionNames.positions_cfg).doc('main').set({ items: list });
        localStorage.setItem(this.collectionNames.positions_cfg, JSON.stringify(list));
        return;
      } catch(e) {
        console.error('Save Positions Error (Firebase), fallback to Local:', e);
        this._handleFirebaseError(e);
      }
    } 
    
    // LocalStorage Fallback
    localStorage.setItem(this.collectionNames.positions_cfg, JSON.stringify(list));
  }

  async getLogs() { return this.getAll('logs'); }
  async addLog(data) {
      if (this.useFirebase && !this.firebaseDisabled) {
          try {
            // Add to Firestore (auto-ID)
            await this.db.collection(this.collectionNames.logs).add(data);
            // Also log to Firebase Analytics if available
            if (typeof firebase !== 'undefined' && firebase.analytics) {
                firebase.analytics().logEvent(data.action || 'log', data);
            }
            // Sync LocalStorage for backup
            this._updateLocal('logs', data, 'add');
            return;
          } catch(e) {
            console.error('Add Log Error (Firebase), fallback to Local:', e);
            this._handleFirebaseError(e);
          }
      } 
      
      // LocalStorage fallback
      const logs = await this.getLogs();
      logs.unshift(data);
      if(logs.length > 200) logs.pop(); // Limit local logs
      localStorage.setItem(this.collectionNames.logs, JSON.stringify(logs));
  }

  async getPlaces() { return this.getAll('places'); }
  async savePlaces(data) { return this.setAll('places', data); }

}

// Global Instance
window.BedasDB = new BedasDBService();
