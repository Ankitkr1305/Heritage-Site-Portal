# 🏛️ HeritageWatch AI — Smart Heritage Site Crowd Management & Security Telemetry System

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-React_JSX-yellow?style=flat-square&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-Auth_JWT_&_Bcrypt-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB_%2B_Mongoose-brightgreen?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Edge Middleware](https://img.shields.io/badge/Security-Edge_Middleware_RBAC-purple?style=flat-square)](https://nextjs.org/docs/app/building-your-application/routing/middleware)

> **Official Smart-Tourism & Real-Time Crowd Telemetry Portal for the Archaeological Survey of India (ASI) and Ministry of Tourism.**
> Provides live queue wait-times, optical AI turnstile sensing, automated incident dispatching, digital QR E-Pass reservations, and a multi-site officer command center protected by JWT & bcrypt Node.js authentication.

---

## 📌 GitHub Repository Overview

- **Short Description (Repo About):**
  > An enterprise-grade Next.js 14 & Node.js smart-tourism platform for UNESCO World Heritage sites featuring live optical crowd sensing, queue wait-time telemetry, QR E-Pass booking, and an ASI Officer Command Center with JWT/Bcrypt RBAC Edge Middleware.
- **Topics / Tags:**
  `nextjs`, `react`, `typescript`, `mongodb`, `mongoose`, `jwt-authentication`, `bcrypt`, `edge-middleware`, `rbac`, `smart-tourism`, `crowd-management`, `computer-vision-telemetry`, `asi-portal`

---

## 🌟 Key Highlights & Modules

### 1. 🧳 Public Tourist Experience Portal
- **7 UNESCO & National Heritage Sites**: Taj Mahal, Varanasi Ghats & Kashi Vishwanath, Red Fort, Qutub Minar, Konark Sun Temple, Amber Fort, and Hampi Virupaksha.
- **Live Crowd Density Indicators**: Real-time crowd classification (`LOW`, `MODERATE`, `HIGH`, `SURGE`) with percentage capacity tracking.
- **Multi-Gate Queue Wait-Times**: Real-time telemetry comparing entry gates (e.g., East Gate vs West Gate) with automated **"Shortest Queue"** recommendation badges.
- **Time-Slot Reservation Engine**: Sunrise, morning, afternoon, and sunset slot booking with live capacity countdowns.
- **Digital QR E-Pass Viewer (`/passes`)**: Instant downloadable and print-ready passes with verified entry QR codes, gate assignments, and security tokens.
- **Live Environmental Telemetry**: Real-time temperature, AQI, and sunrise/sunset advisory widgets.

### 2. 🛡️ ASI Officer Command Center (Multi-Site Sub-Dashboards)
Officers and Superintendent Admins have a dedicated suite of specialized sub-portals:
- **Command Center Overview (`/admin`)**: High-level telemetry, active incident count, today's footfall, and live alert banners.
- **Monument & Gate Controller (`/admin/monuments`)**: Live toggle for gate access (Open/Closed/Evacuation Only) and capacity thresholds.
- **E-Pass Check-in Terminal (`/admin/bookings`)**: Real-time gate validation, turnstile QR scanner simulation, and check-in status updates.
- **Emergency Dispatcher (`/admin/alerts`)**: Multi-channel broadcast console (Loudspeaker PA, SMS blasts, gate diversions) with 1-click dispatch.
- **Optical Sensors & Telemetry (`/admin/sensors`)**: Computer-vision edge telemetry, camera health, pedestrian counts per minute, and privacy-masked density heatmaps.

### 3. 🔐 Enterprise Node.js Authentication & RBAC Security
- **Bcrypt Password Hashing**: Irreversible salt-rounds (10) hashing on all credentials.
- **Cryptographic JWT Tokens**: Signed using HMAC-SHA256 (`jsonwebtoken`) with 7-day expiration and automated revocation.
- **Next.js Edge Middleware (`src/middleware.ts`)**: Fast, zero-dependency token decoding at the edge. Automatically blocks unauthenticated visitors and redirects unauthorized tourists away from `/admin`.
- **Security Headers**: Injected at the edge (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `X-XSS-Protection`).

---

## 🔑 Demo Credentials (Ready-to-Test)

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Superintendent Officer** | `officer@heritage.gov.in` | `officer123` | Full Access (`/admin`, Gate Control, Alerts, Turnstiles) |
| **ASI Master Admin** | `admin@asi.gov.in` | `admin123` | Full Access (`/admin` Multi-Site Control Room) |
| **Public Tourist** | `ankit@example.com` | `password123` | Public Booking, Pass Viewer, Live Queue Telemetry |

*(You can also register a brand-new account on `/login` — new accounts default to the `tourist` role with bcrypt password hashing).*

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router, Server & Client Components)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS, Lucide React Icons
- **Backend & Auth**: Node.js, `jsonwebtoken`, `bcryptjs`
- **Database & ODM**: MongoDB & Mongoose (with automated in-memory fallback cache)
- **Security**: Next.js Edge Middleware, HTTP-Only Cookies, Strict Security Headers
- **Testing & Deployment**: Vercel / Node Production Server

---

## ⚡ Quick Start Guide

### 1. Clone & Install
```bash
git clone https://github.com/your-username/heritage-crowd-management.git
cd heritage-crowd-management
npm install
```

### 2. Environment Setup
Create a `.env.local` file in the root directory:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/heritage_crowd_db
MONGODB_DB=heritage_crowd_db
JWT_SECRET=your_super_secret_jwt_key_2026_secured
```
*(Note: If local MongoDB is not running, the application automatically uses its built-in in-memory fallback cache so the site works seamlessly out of the box).*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build & Run for Production
```bash
npm run build
npm run start -- -p 3000
```

---

## 📡 API Endpoints Reference

### 🔐 Authentication (`/api/auth/*`)
- `POST /api/auth/register` — Create user with bcrypt password hash & set JWT cookie
- `POST /api/auth/login` — Authenticate credentials, verify hash & issue JWT
- `GET /api/auth/me` — Verify Bearer token / cookie and return user profile
- `POST /api/auth/logout` — Clear session cookie and invalidate tokens

### 🏛️ Monuments & Telemetry (`/api/monuments/*`)
- `GET /api/monuments` — Retrieve all monuments with live crowd percentages & wait-times
- `GET /api/monuments/[slug]` — Individual monument details, hourly curves & gate telemetry

### 🎫 Bookings & Passes (`/api/bookings/*`)
- `GET /api/bookings` — Fetch active booking records
- `POST /api/bookings` — Create a new E-Pass reservation and decrement slot capacity
- `GET /api/admin/bookings` — Officer access for gate check-in & verification

### 🚨 Sensors & Incident Alerts (`/api/sensors`, `/api/alerts`)
- `GET /api/sensors` — Optical camera telemetry, turnstile flow rates & heatmaps
- `GET, POST /api/alerts` — Fetch or broadcast urgent gate diversion & crowd alerts

---

## 📚 Academic & Curriculum Alignment (Units I–VI)

This project strictly adheres to modern Next.js Full-Stack Web Development curricula:
- **Unit I (Fundamentals & Routing)**: Next.js App Router, Dynamic Routes (`/monuments/[slug]`), Nested Layouts (`/admin/layout.tsx`), Loading and Error boundaries.
- **Unit II (Rendering Strategies & Data Fetching)**: Hybrid SSR/SSG/ISR with `generateStaticParams`, Server vs Client Components, dynamic caching.
- **Unit III (API Development & Forms)**: Next.js Route Handlers (REST), dynamic HTTP methods (GET, POST, PATCH), form validation and optimistic UI updates.
- **Unit IV (Authentication & Database)**: Node.js `bcryptjs` password hashing, `jsonwebtoken` (JWT), Session Management, Role-Based Access Control (RBAC), and MongoDB Mongoose ORM models.
- **Unit V (State Management & Telemetry)**: Real-time sensor state synchronization, live search and filter parameters, dynamic modal dialogs.
- **Unit VI (Security & Production Readiness)**: Edge Middleware routing guards, HTTP security headers, sanitized inputs, and responsive cross-device layouts.

---

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.

---

## 👥 Contributors & Acknowledgements
- **Lead Developer**: Ankit Verma
- **Sponsor & Vision**: Archaeological Survey of India (ASI) & Ministry of Tourism (Smart-Tourism Initiative)
