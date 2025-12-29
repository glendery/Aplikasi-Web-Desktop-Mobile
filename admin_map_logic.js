// Global Variables
let map;
let placesData = { places: [] };
let markers = {};
let activeMarker = null; // The marker currently being edited
let tempMarker = null; // For new place creation before save
let isEditing = false;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    loadData();

    // Add listener for manual coordinate inputs
    document.getElementById('editLat').addEventListener('change', updateMarkerFromInput);
    document.getElementById('editLng').addEventListener('change', updateMarkerFromInput);
});

function initMap() {
    // Default center to Dayeuhkolot
    map = L.map('map').setView([-6.975, 107.600], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Map click handler (optional)
    map.on('click', function(e) {
        // If we are editing, maybe move marker?
        // But drag is better.
    });
}

async function loadData() {
    try {
        // 1. Try Firebase
        if (window.BedasDB) {
             const places = await window.BedasDB.getPlaces();
             if (places && places.length > 0) {
                 placesData = { 
                     version: "1.0.0", 
                     last_updated: new Date().toISOString(), 
                     area: "Kecamatan Dayeuhkolot", 
                     places: places 
                 };
                 renderList();
                 renderMarkers();
                 showToast('Data dimuat dari Cloud Database');
                 return;
             }
        }
    } catch(e) { console.warn('Firebase load error', e); }

    loadDataFallback();
}

function loadDataFallback() {
    fetch('dayeuhkolot_places.json')
        .then(response => response.json())
        .then(async data => {
            placesData = data;
            renderList();
            renderMarkers();
            showToast('Data dimuat dari File Lokal (JSON)');
            
            // Auto-migrate if Firebase was empty
            if (window.BedasDB && placesData.places.length > 0) {
                if(confirm('Database Cloud kosong. Upload data lokal sekarang?')) {
                     await window.BedasDB.savePlaces(placesData.places);
                     showToast('Data lokal berhasil di-upload ke Cloud!');
                }
            }
        })
        .catch(error => {
            console.error('Error loading data:', error);
            showToast('Gagal memuat data');
            placesData = { version: "1.0.0", last_updated: new Date().toISOString(), area: "Kecamatan Dayeuhkolot", places: [] };
        });
}

// --- Render Logic ---

function renderList(filterText = '') {
    const listEl = document.getElementById('placeList');
    listEl.innerHTML = '';

    placesData.places.forEach(place => {
        if (filterText && !place.name.toLowerCase().includes(filterText.toLowerCase())) return;

        const li = document.createElement('li');
        li.className = 'place-item';
        li.onclick = () => editPlace(place.id);
        
        li.innerHTML = `
            <div class="place-name" style="border-left: 4px solid ${place.color || '#3388ff'}; padding-left: 8px;">${Utils.escapeHtml(place.name)}</div>
            <div class="place-category">${Utils.escapeHtml(place.category).replace('_', ' ')}</div>
        `;
        listEl.appendChild(li);
    });
}

function renderMarkers() {
    // Clear existing markers
    for (let id in markers) {
        map.removeLayer(markers[id]);
    }
    markers = {};

    placesData.places.forEach(place => {
        addMarkerToMap(place);
    });
}

function createCustomIcon(color) {
    const svg = `
        <svg viewBox="0 0 24 24" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2c3.3 0 6 2.7 6 6 0 5-6 12-6 12S6 13 6 8c0-3.3 2.7-6 6-6z" fill="${color}" stroke="rgba(0,0,0,0.35)" stroke-width="1"/>
            <circle cx="12" cy="8.5" r="3" fill="#ffffff" opacity="0.85"/>
        </svg>`;
    
    return L.divIcon({
        className: 'custom-map-marker',
        html: svg,
        iconSize: [28, 28],
        iconAnchor: [14, 28]
    });
}

function addMarkerToMap(place) {
    const color = place.color || '#3388ff';
    const marker = L.marker([place.lat, place.lng], {
        draggable: false, // Only draggable when editing
        icon: createCustomIcon(color)
    }).addTo(map);

    marker.bindTooltip(place.name);
    
    marker.on('click', () => {
        editPlace(place.id);
    });

    markers[place.id] = marker;
}

function filterPlaces() {
    const text = document.getElementById('searchInput').value;
    renderList(text);
}

// --- CRUD Operations ---

function createNewPlace() {
    // Reset form
    resetForm();
    
    // Set ID to 'new' or generate temp ID
    document.getElementById('editId').value = ''; 
    document.getElementById('editorTitle').innerText = 'Tambah Lokasi Baru';
    document.getElementById('btnDelete').style.display = 'none';
    document.getElementById('editColor').value = '#3388ff'; // Default color

    // Drop a pin at map center
    const center = map.getCenter();
    
    if (activeMarker) {
        stopEditingMarker();
    }

    // Create a temporary draggable marker
    if (tempMarker) map.removeLayer(tempMarker);
    
    tempMarker = L.marker(center, { draggable: true }).addTo(map);
    tempMarker._isTemp = true;
    
    // Update inputs on drag
    tempMarker.on('dragend', function(e) {
        const pos = e.target.getLatLng();
        updateCoordInputs(pos.lat, pos.lng);
    });

    // Initial coord update
    updateCoordInputs(center.lat, center.lng);
    
    openEditor();
    showToast('Marker baru dibuat di tengah peta. Geser ke lokasi yang sesuai.');
}

function editPlace(id) {
    const place = placesData.places.find(p => p.id === id);
    if (!place) return;

    // Populate form
    document.getElementById('editId').value = place.id;
    document.getElementById('editName').value = place.name;
    document.getElementById('editDescription').value = place.description || '';
    document.getElementById('editCategory').value = place.category || 'lainnya';
    document.getElementById('editAddress').value = place.address || '';
    document.getElementById('editHours').value = place.hours || '';
    document.getElementById('editImage').value = place.image_url || '';
    document.getElementById('editMapsUrl').value = place.maps_url || '';
    document.getElementById('editColor').value = place.color || '#3388ff';
    
    // Show preview if image exists
    const preview = document.getElementById('imagePreview');
    if (place.image_url) {
        preview.src = place.image_url;
        preview.style.display = 'block';
    } else {
        preview.style.display = 'none';
        preview.src = '';
    }
    
    // Services array to string
    document.getElementById('editServices').value = place.services ? place.services.join(', ') : '';

    // Facilities checkbox mapping
    const fac = place.facilities || {};
    document.getElementById('facParkir').checked = !!fac.parkir || !!fac.parkir_luas;
    document.getElementById('facToilet').checked = !!fac.toilet;
    document.getElementById('facMushola').checked = !!fac.masjid || !!fac.mushola;
    document.getElementById('facWifi').checked = !!fac.wifi;
    document.getElementById('facRuangTunggu').checked = !!fac.ruang_tunggu;

    // Set UI state
    document.getElementById('editorTitle').innerText = 'Edit Lokasi';
    document.getElementById('btnDelete').style.display = 'inline-flex';

    // Handle Marker Logic
    if (tempMarker) {
        map.removeLayer(tempMarker);
        tempMarker = null;
    }
    
    // Stop editing previous active marker
    stopEditingMarker();

    // Make this marker draggable
    activeMarker = markers[id];
    if (activeMarker) {
        activeMarker.dragging.enable();
        activeMarker.setOpacity(1);
        activeMarker.on('dragend', function(e) {
            const pos = e.target.getLatLng();
            updateCoordInputs(pos.lat, pos.lng);
        });
        
        // Pan map to it
        map.setView(activeMarker.getLatLng(), 16);
        updateCoordInputs(activeMarker.getLatLng().lat, activeMarker.getLatLng().lng);
        
        showToast('Mode Edit: Geser marker untuk mengubah posisi');
    }

    openEditor();
}

async function savePlace() {
    const id = document.getElementById('editId').value;
    const isNew = !id;
    
    const lat = parseFloat(document.getElementById('editLat').value);
    const lng = parseFloat(document.getElementById('editLng').value);
    const name = document.getElementById('editName').value;

    if (!name || isNaN(lat) || isNaN(lng)) {
        alert('Nama dan Lokasi (Lat/Lng) wajib diisi!');
        return;
    }

    const newPlace = {
        id: isNew ? generateId(name) : id,
        name: name,
        description: document.getElementById('editDescription').value,
        category: document.getElementById('editCategory').value,
        color: document.getElementById('editColor').value,
        address: document.getElementById('editAddress').value,
        lat: lat,
        lng: lng,
        hours: document.getElementById('editHours').value,
        image_url: document.getElementById('editImage').value,
        maps_url: document.getElementById('editMapsUrl').value,
        services: document.getElementById('editServices').value.split(',').map(s => s.trim()).filter(s => s),
        facilities: {
            parkir: document.getElementById('facParkir').checked,
            toilet: document.getElementById('facToilet').checked,
            mushola: document.getElementById('facMushola').checked,
            wifi: document.getElementById('facWifi').checked,
            ruang_tunggu: document.getElementById('facRuangTunggu').checked
        },
        last_updated: new Date().toISOString().split('T')[0],
        verified: true
    };

    if (isNew) {
        placesData.places.push(newPlace);
        // Remove temp marker
        if (tempMarker) {
            map.removeLayer(tempMarker);
            tempMarker = null;
        }
    } else {
        const index = placesData.places.findIndex(p => p.id === id);
        if (index !== -1) {
            placesData.places[index] = newPlace;
        }
    }

    // Refresh UI
    stopEditingMarker();
    renderMarkers();
    renderList();
    closeEditor();
    
    // SAVE TO FIREBASE
    if (window.BedasDB) {
        try {
            await window.BedasDB.savePlaces(placesData.places);
            showToast('Data disimpan ke Cloud & Browser Memory');
        } catch(e) {
            console.error(e);
            showToast('Disimpan di browser, GAGAL ke Cloud.');
        }
    } else {
        showToast('Data berhasil disimpan (di memori browser)');
    }
}

async function deletePlace() {
    const id = document.getElementById('editId').value;
    if (!id) return;

    if (confirm('Yakin ingin menghapus lokasi ini?')) {
        placesData.places = placesData.places.filter(p => p.id !== id);
        
        stopEditingMarker();
        renderMarkers();
        renderList();
        closeEditor();
        
        // SAVE TO FIREBASE
        if (window.BedasDB) {
            try {
                await window.BedasDB.savePlaces(placesData.places);
                showToast('Lokasi dihapus dari Cloud');
            } catch(e) {
                console.error(e);
                showToast('Dihapus dari browser, GAGAL ke Cloud.');
            }
        } else {
            showToast('Lokasi dihapus (Lokal)');
        }
    }
}

function exportData() {
    // Update metadata
    placesData.last_updated = new Date().toISOString();
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(placesData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "dayeuhkolot_places.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    
    showToast('File JSON diunduh. Silakan replace file lama.');
}

// --- Interaction Handlers ---

function updateCoordInputs(lat, lng) {
    document.getElementById('editLat').value = lat;
    document.getElementById('editLng').value = lng;
    // document.getElementById('coordDisplay').innerText = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
}

function updateMarkerFromInput() {
    const lat = parseFloat(document.getElementById('editLat').value);
    const lng = parseFloat(document.getElementById('editLng').value);

    if (isNaN(lat) || isNaN(lng)) return;

    const newLatLng = new L.LatLng(lat, lng);

    if (activeMarker) {
        activeMarker.setLatLng(newLatLng);
        map.setView(newLatLng);
    } else if (tempMarker) {
        tempMarker.setLatLng(newLatLng);
        map.setView(newLatLng);
    }
}

function handleImageSelect(input) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            // Show preview
            const preview = document.getElementById('imagePreview');
            preview.src = e.target.result;
            preview.style.display = 'block';

            // Set text input to relative path
            document.getElementById('editImage').value = 'images/' + file.name;
            
            showToast('Gambar dipilih. Jangan lupa salin file ke folder images/');
        }
        
        reader.readAsDataURL(file);
    }
}


// --- Helpers ---

function openEditor() {
    document.getElementById('editorPanel').classList.add('open');
}

function closeEditor() {
    document.getElementById('editorPanel').classList.remove('open');
    stopEditingMarker();
    if (tempMarker) {
        map.removeLayer(tempMarker);
        tempMarker = null;
    }
}

function stopEditingMarker() {
    if (activeMarker) {
        activeMarker.dragging.disable();
        // Reset position to original data if not saved? 
        // Actually, we re-render markers on save/cancel which fixes position if cancelled
        // But if we just close without saving, we should revert.
        // For simplicity, re-render markers will fix it.
        renderMarkers(); 
        activeMarker = null;
    }
}

function resetForm() {
    document.getElementById('placeForm').reset();
    document.getElementById('imagePreview').style.display = 'none';
    // document.getElementById('coordDisplay').innerText = '-';
}

function generateId(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') + '-' + Date.now().toString().slice(-4);
}

function showToast(msg) {
    const t = document.getElementById('toast');
    t.innerText = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
}
