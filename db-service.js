/**
 * BedasDB - Unified Data Service
 * Mengelola penyimpanan data baik via Firebase (Online) atau LocalStorage (Offline/Fallback).
 */

class BedasDBService {
  constructor() {
    this.useFirebase = false;
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
      gallery_cfg: 'bedas_gallery_cfg',
      positions_cfg: 'bedas_positions_cfg'
    };
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
          this.useFirebase = true;
          console.log('BedasDB: Menggunakan Firebase (Cloud Mode)');
          return;
        }
      } catch (e) {
        console.error('BedasDB: Gagal inisialisasi Firebase', e);
      }
    }
    console.log('BedasDB: Menggunakan LocalStorage (Local Mode)');
  }

  // --- GENERIC HELPERS ---

  async getAll(collectionKey) {
    if (this.useFirebase) {
      try {
        const snapshot = await this.db.collection(this.collectionNames[collectionKey]).get();
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Update LocalStorage cache for offline fallback
        try {
             localStorage.setItem(this.collectionNames[collectionKey], JSON.stringify(data));
        } catch(err) { console.warn('Cache update failed', err); }
        return data;
      } catch (e) {
        console.error('DB Read Error (Firebase), falling back to LocalStorage:', e);
        // Fallback to LocalStorage
        try {
            const key = this.collectionNames[collectionKey];
            return JSON.parse(localStorage.getItem(key) || '[]');
        } catch (err) { return []; }
      }
    } else {
      // LocalStorage
      try {
        const key = this.collectionNames[collectionKey];
        return JSON.parse(localStorage.getItem(key) || '[]');
      } catch (e) {
        return [];
      }
    }
  }

  async add(collectionKey, data) {
    if (!data.id) {
        // Generate ID jika belum ada
        data.id = Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    if (this.useFirebase) {
      try {
        // Gunakan ID dari data sebagai Doc ID agar konsisten
        await this.db.collection(this.collectionNames[collectionKey]).doc(data.id).set(data);
        return data;
      } catch (e) {
        console.error('DB Write Error:', e);
        throw e;
      }
    } else {
      const list = await this.getAll(collectionKey);
      list.push(data);
      localStorage.setItem(this.collectionNames[collectionKey], JSON.stringify(list));
      return data;
    }
  }

  async update(collectionKey, id, newData) {
    if (this.useFirebase) {
      await this.db.collection(this.collectionNames[collectionKey]).doc(id).update(newData);
    } else {
      const list = await this.getAll(collectionKey);
      const idx = list.findIndex(item => item.id === id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...newData };
        localStorage.setItem(this.collectionNames[collectionKey], JSON.stringify(list));
      }
    }
  }

  async delete(collectionKey, id) {
    if (this.useFirebase) {
      await this.db.collection(this.collectionNames[collectionKey]).doc(id).delete();
    } else {
      let list = await this.getAll(collectionKey);
      list = list.filter(item => item.id !== id);
      localStorage.setItem(this.collectionNames[collectionKey], JSON.stringify(list));
    }
  }

  async setAll(collectionKey, dataArray) {
    if (this.useFirebase) {
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
        } catch(e) {
            console.error('BedasDB: Sync Error', e);
            throw e;
        }
    } else {
        localStorage.setItem(this.collectionNames[collectionKey], JSON.stringify(dataArray));
    }
  }

  async deleteAll(collectionKey) {
    if (this.useFirebase) {
        const collectionRef = this.db.collection(this.collectionNames[collectionKey]);
        const snapshot = await collectionRef.get();
        const batch = this.db.batch();
        snapshot.docs.forEach(doc => batch.delete(doc.ref));
        await batch.commit();
    } else {
        localStorage.removeItem(this.collectionNames[collectionKey]);
    }
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
    if (this.useFirebase) {
      try {
        const doc = await this.db.collection(this.collectionNames.gallery_cfg).doc('main').get();
        if (doc.exists) return doc.data();
        return defaultCfg;
      } catch(e) { return defaultCfg; }
    } else {
      try {
        const d = localStorage.getItem(this.collectionNames.gallery_cfg);
        if (d) return JSON.parse(d);
        return defaultCfg;
      } catch(e) { return defaultCfg; }
    }
  }

  async saveGalleryCfg(data) {
    if (this.useFirebase) {
      await this.db.collection(this.collectionNames.gallery_cfg).doc('main').set(data);
    } else {
      localStorage.setItem(this.collectionNames.gallery_cfg, JSON.stringify(data));
    }
  }

  async getPositions() {
    const defaultPos = ['Camat','Wakil Camat','Sekretaris Kecamatan','Kasi Pemerintahan','Kasi Pelayanan'];
    if (this.useFirebase) {
      try {
        const doc = await this.db.collection(this.collectionNames.positions_cfg).doc('main').get();
        if (doc.exists && doc.data().items) return doc.data().items;
        return defaultPos;
      } catch(e) { return defaultPos; }
    } else {
      try {
        const d = localStorage.getItem(this.collectionNames.positions_cfg);
        if (d) return JSON.parse(d);
        return defaultPos;
      } catch(e) { return defaultPos; }
    }
  }

  async savePositions(list) {
    if (this.useFirebase) {
      await this.db.collection(this.collectionNames.positions_cfg).doc('main').set({ items: list });
    } else {
      localStorage.setItem(this.collectionNames.positions_cfg, JSON.stringify(list));
    }
  }

}

// Global Instance
window.BedasDB = new BedasDBService();
