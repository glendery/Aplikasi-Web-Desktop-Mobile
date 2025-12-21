# BEDAS SERVE Admin Dashboard

BEDAS SERVE is a comprehensive admin dashboard for managing the "Kecamatan Dayeuhkolot" services. It allows administrators to manage submissions, services, galleries, maps, and social media commitments.

## Core Features

- **Dashboard Statistics**: Real-time overview of submissions, services, and audit logs.
- **Submission Management**: View, filter, and manage citizen submissions.
- **Service Management**:
  - **Bot Services**: Manage services available via the chatbot.
  - **Featured Services**: Highlight key services on the main page.
  - **Popular Services**: Manage frequently accessed services.
- **Gallery Management**: Upload and manage photos for the "Galeri Camat" section.
- **Map Management**: Integrated digital map management.
- **Commitment & Social**: Manage service commitments and social media links.
- **Audit Logging**: Tracks all admin activities for security and accountability.
- **Security**:
  - Secure login with hashing.
  - Role-based access control (RBAC).
  - Session management with auto-logout on inactivity.
- **Data Persistence**:
  - Uses **LocalStorage** for all data storage (Offline-first architecture).

## Technical Architecture

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla).
- **Backend/Database**: 
  - **LocalStorage**: Browser-based persistent storage.
- **Authentication**: Custom implementation using Web Crypto API and SessionStorage.

## Usage Guide

1. **Login**: Access `admin.html` and log in with admin credentials.
2. **Navigation**: Use the tabs to switch between different management sections.
3. **CRUD Operations**: Use the "Tambah" buttons to add new items, and the "Edit/Hapus" buttons in the tables to modify existing data.
4. **Reset Default**: Use the "Reset Default" buttons to restore initial data configurations if needed.

## Setup & Installation

1. Open `index.html` for the public view or `admin.html` for the admin panel.
2. No build step required; runs directly in the browser.

## Recent Updates

- **Fix**: Resolved "Konfirmasi" and "Simpan" button responsiveness in Gallery.
- **Fix**: Resolved deletion errors ("GA BISA DIHAPUS") for gallery and services.
- **Fix**: Implemented data seeding to fix empty dashboard issues.
- **Refactor**: Re-integrated Firebase Realtime Database for Cloud Sync.
- **Config**: Removed Netlify-specific configurations for clean localhost testing.
