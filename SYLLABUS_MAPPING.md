# 📚 Syllabus Mapping & Project Architecture
## Heritage Site Crowd Management System
**Tech Stack:** Next.js 14 (App Router) + React 18 + JavaScript/TypeScript + MongoDB (Mongoose ODM) + Tailwind CSS

This document provides a line-by-line mapping of your university syllabus to the actual files and implementations in this project. You can submit this directly in your academic viva or project report.

---

### 🟢 Unit I: Fundamentals of Next.js & Routing/Navigation
| Syllabus Topic | How & Where It Is Implemented |
| :--- | :--- |
| **Introduction & Features of Next.js** | Built on Next.js 14 App Router with built-in bundling, optimization, and zero-config TypeScript. |
| **Project Structure** | Clean modular architecture: `src/app/`, `src/components/`, `src/lib/`, `src/models/`, `src/actions/`, `public/images/`. |
| **App Router & File-based Routing** | Uses the `app/` directory convention: `app/page.tsx`, `app/login/page.tsx`, `app/monuments/[slug]/page.tsx`. |
| **Dynamic Routes** | Implemented in `src/app/monuments/[slug]/page.tsx` generating distinct pages for `/monuments/taj-mahal`, `/monuments/varanasi-ghats`, `/monuments/red-fort`, etc. |
| **Nested Routes & Layouts** | Root layout defined in `src/app/layout.tsx` providing HTML structure, fonts, and global meta tags. |
| **Navigation** | Programmatic and declarative navigation using `next/link` and `useRouter` from `next/navigation`. |
| **Error and Loading UI** | Official Next.js boundaries: `src/app/loading.tsx` (Skeleton Loading UI) and `src/app/error.tsx` (Error boundary with `reset()` function), plus `src/app/not-found.tsx` (custom 404 UI). |

---

### 🟢 Unit II: Rendering Strategies & Data Fetching
| Syllabus Topic | How & Where It Is Implemented |
| :--- | :--- |
| **Server Components (RSC)** | Default async Server Component in `src/app/monuments/[slug]/page.tsx` running strictly on the Node.js server. |
| **Client Components** | Interactive components marked with `'use client'` (`src/components/Navbar.tsx`, `DestinationsExplorer.tsx`, `BookingModal.tsx`). |
| **Static Site Generation (SSG)** | Implemented using `generateStaticParams()` in `src/app/monuments/[slug]/page.tsx` pre-rendering all 5 heritage sites at build time. |
| **Incremental Static Regeneration (ISR)** | Configured via `export const revalidate = 60;` in `src/app/monuments/[slug]/page.tsx` to automatically revalidate page caches in the background. |
| **Server-Side Data Fetching** | Direct database queries in Server Components via `getMonumentBySlug(slug)` with zero client waterfall requests. |
| **Client-Side Fetching** | Implemented using `fetch()` in `useEffect` to fetch real-time gate telemetry and sensor updates. |
| **Caching and Revalidation** | Cache invalidation using `revalidatePath('/')` inside Server Actions upon new pass booking. |

---

### 🟢 Unit III: API Development & Forms / Server Actions
| Syllabus Topic | How & Where It Is Implemented |
| :--- | :--- |
| **Route Handlers & REST APIs** | Full REST suite in `src/app/api/`: `api/monuments`, `api/sensors`, `api/bookings`, `api/alerts`, `api/seed`. |
| **HTTP Methods (GET, POST)** | `GET` for data retrieval and `POST` for creating bookings and alerts. |
| **Dynamic Route Handlers** | `src/app/api/monuments/[slug]/route.ts` handling individual monument queries by slug parameter. |
| **Request & Response Handling** | Typed using `NextRequest` and `NextResponse.json()` with appropriate HTTP status codes (200, 400, 404, 500). |
| **Next.js Server Actions** | Implemented in `src/app/actions/bookingActions.ts` with `"use server"` directive. |
| **Form Handling & Validation** | Server-side validation verifying full name length, email format, date, and available slot quotas before database mutation. |
| **Data Mutations** | Direct slot reduction and reservation insertion into MongoDB with optimistic UI updates. |

---

### 🟢 Unit IV: Authentication, Authorization & Database Integration
| Syllabus Topic | How & Where It Is Implemented |
| :--- | :--- |
| **Authentication Concepts** | Dedicated login & sign-up portal in `src/app/login/page.tsx` with dual mode (Tourist vs Officer). |
| **Role-Based Access Control (RBAC)** | Schema-level roles (`tourist`, `officer`, `admin`) in `src/models/User.ts` regulating access to the Control Room. |
| **Protected Routes & Middleware** | Implemented in `src/middleware.ts` intercepting restricted paths and enforcing authentication. |
| **Database Connectivity** | Robust MongoDB connection pooling in `src/lib/mongodb.ts` connecting to `mongodb://localhost:27017/heritage_crowd_db`. |
| **ORM / ODM Basics** | Mongoose schemas: `Monument.ts`, `Sensor.ts`, `Booking.ts`, `Alert.ts`, `User.ts`. |
| **CRUD Operations** | Complete Create (Booking/User), Read (Monuments/Sensors), Update (Slot Quotas/Gate Diversion), and Delete/Cancel operations. |
| **Environment Variables** | Secure configuration in `.env.local` (`MONGODB_URI`, `MONGODB_DB`). |

---

### 🟢 Unit V: Performance, SEO & Deployment
| Syllabus Topic | How & Where It Is Implemented |
| :--- | :--- |
| **Image Optimization** | Local images in `public/images/monuments/` with responsive sizing and lazy loading. |
| **Metadata API** | Dynamic metadata in `generateMetadata()` in `[slug]/page.tsx` and static OpenGraph tags in `src/app/layout.tsx`. |
| **Code Splitting & Lazy Loading** | Implemented in `src/app/page.tsx` using `next/dynamic` to load heavy modals (`LiveCommandDashboardModal`, `PassModal`, `MyPassesModal`) on demand. |
| **SEO Fundamentals** | Dynamic `src/app/sitemap.ts` (Sitemap XML) and `src/app/robots.ts` (Robots.txt generator). |
| **Production Build** | Tested and compiled using `npm run build` with full static optimization. |

---

### 🟢 Unit VI: Advanced Next.js Features & Industry Practices
| Syllabus Topic | How & Where It Is Implemented |
| :--- | :--- |
| **Edge Runtime & Middleware** | `src/middleware.ts` running on Edge Runtime injecting HTTP security headers (`X-Frame-Options`, `X-Content-Type-Options`). |
| **Internationalization (i18n)** | Multilingual dictionary in `src/lib/i18n.ts` supporting both English and Hindi (हिन्दी). |
| **Security Best Practices** | Form sanitization, parameterized queries, PII protection (zero biometric/facial storage on optical turnstiles). |
| **Component Organization** | Separation of concerns: UI components, database services, server actions, and type definitions. |
