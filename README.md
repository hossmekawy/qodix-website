# Qodix Agency Website & Nexus Portal

Welcome to the Qodix Agency Monorepo. This repository contains the complete source code for the high-end, "Quiet Luxury" Qodix Agency website, powered by a Django backend and a Next.js frontend, featuring a fully custom headless CMS named **Nexus**.

## 🏗 Architecture

The project is structured as a monorepo containing two main applications:

### 1. Backend (`/backend`)
A robust Django API built with Django REST Framework (DRF) that serves as the headless CMS and database for the platform.
- **Framework:** Django 5.2 + DRF
- **Database:** SQLite (Development)
- **Features:** 
  - Dynamic content management (Projects, Blogs, Services, Hero, Settings).
  - Newsletter and Job Application ingestion.
  - SMTP Email integration for project inquiries.
  - Role-based Authentication using SimpleJWT for the Nexus portal.

### 2. Frontend (`/frontend`)
A modern, performant frontend built with Next.js App Router, styled with Tailwind CSS, focusing on a minimalist, high-contrast, "Quiet Luxury" aesthetic.
- **Framework:** Next.js 14+
- **Styling:** Tailwind CSS + Framer Motion
- **Features:** 
  - Bilingual Support (English/Arabic) with RTL capability.
  - Infinite Marquees, Glassmorphism, and custom Typography.
  - **Nexus Portal:** A hidden, secure dashboard (`/nexus`) to manage all website content seamlessly.

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run migrations and start the server:
   ```bash
   python manage.py migrate
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🔐 Qodix Nexus (Admin Portal)

To manage the website data, we bypass the default Django Admin in favor of a cohesive, custom-built Next.js portal.

1. Ensure the Django backend is running.
2. Navigate to `http://localhost:3000/nexus`.
3. Log in using your Django Superuser credentials.
4. Manage all entities (Blog Posts, Services, Projects, Email Config, etc.) directly from the intuitive Nexus Dashboard.

## 📜 License
Proprietary software. All rights reserved.
