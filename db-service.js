/**
 * BedasDB - Unified Data Service (LocalStorage Only)
 * Mengelola penyimpanan data via LocalStorage (Offline).
 * Firebase integration has been removed as per user request.
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
  }

  async init() {
    console.log('BedasDB: Menggunakan LocalStorage (Local Mode Only)');
    this.initialized = true;
  }

  // --- GENERIC HELPERS ---

  async getAll(collectionKey) {
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
    return this._updateLocal(collectionKey, data, 'add');
  }

  async update(collectionKey, id, newData) {
    const list = await this._getLocal(collectionKey);
    const idx = list.findIndex(item => item.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...newData };
      localStorage.setItem(this.collectionNames[collectionKey], JSON.stringify(list));
    }
  }

  async delete(collectionKey, id) {
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
    localStorage.setItem(this.collectionNames[collectionKey], JSON.stringify(dataArray));
  }

  async deleteAll(collectionKey) {
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
    try {
      const d = localStorage.getItem(this.collectionNames.gallery_cfg);
      if (d) return JSON.parse(d);
      return defaultCfg;
    } catch(e) { return defaultCfg; }
  }

  async saveGalleryCfg(data) {
    localStorage.setItem(this.collectionNames.gallery_cfg, JSON.stringify(data));
  }

  async getPositions() {
    const defaultPos = ['Camat','Wakil Camat','Sekretaris Kecamatan','Kasi Pemerintahan','Kasi Pelayanan'];
    try {
        const d = localStorage.getItem(this.collectionNames.positions_cfg);
        if (d) return JSON.parse(d);
        return defaultPos;
    } catch(e) { return defaultPos; }
  }

  async savePositions(list) {
    localStorage.setItem(this.collectionNames.positions_cfg, JSON.stringify(list));
  }

  async getLogs() { return this.getAll('logs'); }
  async addLog(data) {
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
