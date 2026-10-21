# 🌟 Shahinur Akter — Premium 3D Animated Portfolio Website

Production-ready, full-stack personal portfolio and content management system for **Shahinur Akter**, Frontend Developer, Graphic Designer, and NSDA Certified Level 4 Digital Marketer.

---

## 🎨 Visual Identity & Architecture

- **Brand Colors**: Clean White (`#FFFFFF`) with Vibrant Orange (`#F97316`), Soft Peach (`#FFF7ED`), and Deep Navy (`#0F172A`).
- **Original Portrait**: Uses authentic portrait photo in both Hero and About sections with 3D orbital rings, glowing backlights, and floating badges.
- **Two Company Logos**: Dedicated "Selected Collaborations" section immediately after Hero showcasing exactly two editable partner logos.
- **3D Canvas Experience**: Three.js hardware-accelerated floating geometric shapes (torus, octahedron, spheres, particles) with mouse parallax.
- **Frontend**: React 19, TypeScript, Vite 8, Tailwind CSS v4, Framer Motion, Lucide Icons, Canvas Confetti.
- **Backend**: Node.js, Express.js, TypeScript, REST API (`/api/v1`), Zod validation, JWT authentication with HttpOnly cookies.
- **Database**: MongoDB with Mongoose ODM (12 structured collections with indexes).
- **Admin Control Center**: Protected route (`/admin`) with complete CRUD management for all sections, inquiries, and media library.

---

## 📂 Project Structure

```text
Shahinur Akter/
├── client/                      # React + TypeScript + Vite frontend
│   ├── public/
│   │   └── assets/images/       # Static portraits, certificates, logos, projects
│   ├── src/
│   │   ├── components/          # Header, Hero, Hero3DCanvas, CompanyLogos, About,
│   │   │                        # Skills, Services, Projects, Certification, Contact, Footer
│   │   ├── pages/               # HomePage, AdminLoginPage, AdminDashboardPage
│   │   ├── lib/api.ts           # Typed API service layer with fetch client
│   │   ├── types/index.ts       # TypeScript models and interfaces
│   │   ├── App.tsx              # React Router DOM routes
│   │   └── index.css            # Tailwind CSS v4 design system
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── server/                      # Node.js + Express + TypeScript backend
│   ├── src/
│   │   ├── config/              # MongoDB connection (db.ts), environment (env.ts)
│   │   ├── models/              # 12 Mongoose models with validation & indexes
│   │   ├── middleware/          # auth.ts, errorHandler.ts, upload.ts
│   │   ├── validators/          # Zod schemas (schemas.ts)
│   │   ├── controllers/         # authController, publicController, adminController
│   │   ├── routes/              # authRoutes, publicRoutes, adminRoutes, index.ts
│   │   ├── scripts/seed.ts      # Idempotent database seeder
│   │   ├── app.ts               # Express application configuration
│   │   └── server.ts            # Entry point listening on port 5000
│   ├── uploads/                 # Uploaded media assets storage
│   ├── package.json
│   └── tsconfig.json
├── package.json                 # Root orchestration scripts (concurrently)
├── README.md
└── .gitignore
```

---

## 🗄️ Database Collections & Schemas (`shahinur_portfolio`)

| Collection | Schema Name | Description & Key Indexes |
| :--- | :--- | :--- |
| `adminusers` | `AdminUser` | Admin accounts with bcrypt password hashing. Unique index on `email`. |
| `sitesettings` | `SiteSetting` | Singleton global site metadata, owner identity, colors, SEO, and contact details. |
| `herocontents` | `HeroContent` | Greeting, headlines, roles, stats (`110+ Projects`, `3 Disciplines`), portrait path. |
| `companylogos` | `CompanyLogo` | Exactly 2 active partner logos shown directly after Hero. Ordered by `displayOrder`. |
| `aboutcontents` | `AboutContent` | Story biography, introduction, highlights, NSDA certificate card badge. |
| `skills` | `Skill` | Skills with proficiency (0–100%) and category. Indexed on `displayOrder` & `isActive`. |
| `services` | `Service` | 3 core disciplines (Frontend Development, Graphic Design, Digital Marketing). Unique `slug`. |
| `projects` | `Project` | Showcase items with thumbnails, gallery, categories, and live links. Unique `slug`. |
| `certifications` | `Certification` | NSDA Certified Level 4 Digital Marketer credentials, issuer, certificate card. |
| `contactinquiries` | `ContactInquiry` | Client leads with status (`new`, `in-progress`, `responded`, `archived`) and admin notes. |
| `testimonials` | `Testimonial` | Client feedback, rating, avatar, and company. |
| `mediaassets` | `MediaAsset` | Uploaded images with MIME validation, file size, safe filenames, and creator ref. |

---

## 🚀 Available REST API Endpoints (`/api/v1`)

### 1. Public Endpoints
- `GET /api/v1/health` — Service health check & uptime status
- `GET /api/v1/settings` — Public site configuration and branding
- `GET /api/v1/hero` — Hero section headlines, statistics, and portrait
- `GET /api/v1/company-logos` — Active collaboration company logos (shows the 2 logos after Hero)
- `GET /api/v1/about` — Professional biography and NSDA credentials
- `GET /api/v1/skills` — Active skills with percentage scores
- `GET /api/v1/services` — Published services with slugs and icons
- `GET /api/v1/projects` — Filterable project portfolio (`?category=...&featured=true`)
- `GET /api/v1/projects/:slug` — Single project detail by slug
- `GET /api/v1/certifications` — Certified qualifications and badges
- `GET /api/v1/testimonials` — Client testimonials
- `POST /api/v1/contact` — Secure inquiry submission with rate limiting and validation

### 2. Authentication Endpoints
- `POST /api/v1/auth/login` — Administrator authentication returning HttpOnly session cookie & JWT
- `POST /api/v1/auth/logout` — Secure session revocation
- `GET /api/v1/auth/me` — Authenticated profile verification
- `POST /api/v1/auth/change-password` — Change password with current password verification

### 3. Protected Admin Endpoints (Require Bearer Token or Session Cookie)
- `GET /api/v1/admin/dashboard/stats` — Metrics overview and recent inquiries
- `PUT /api/v1/admin/settings` — Update global site settings
- `PUT /api/v1/admin/hero` — Update Hero section copy and portrait
- `PUT /api/v1/admin/about` — Update About Me copy and highlights
- `GET, POST, PUT, DELETE /api/v1/admin/company-logos` — Replace/update the 2 logos
- `GET, POST, PUT, DELETE /api/v1/admin/skills` — Add, update percentage (0–100), or delete skills
- `GET, POST, PUT, DELETE /api/v1/admin/services` — Manage offered services
- `GET, POST, PUT, DELETE /api/v1/admin/projects` — Manage project showcase items
- `GET, POST, PUT, DELETE /api/v1/admin/certifications` — Manage certificate records
- `GET, PUT, DELETE /api/v1/admin/inquiries` — Manage leads, update status, and add notes
- `GET, POST, DELETE /api/v1/admin/media` — Upload images and manage media library

---

## ⚙️ Environment Configuration

### Backend (`server/.env`)
```ini
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/shahinur_portfolio
JWT_SECRET=shahinur-akter-super-secure-production-jwt-secret-key-2026
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
CORS_ORIGIN=http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173
ADMIN_SEED_EMAIL=admin@shahinurakter.com
ADMIN_SEED_PASSWORD=Admin@Shahinur2026!
ADMIN_SEED_NAME=Shahinur Akter
MEDIA_STORAGE_PROVIDER=local
MEDIA_STORAGE_CREDENTIALS=
```

### Frontend (`client/.env`)
```ini
VITE_API_URL=/api/v1
VITE_SITE_NAME="Shahinur Akter — Creative Portfolio"
```

---

## 💻 How to Run Locally

### 1. Ensure Local MongoDB is Running
MongoDB is active locally on Windows at `mongodb://127.0.0.1:27017`.

### 2. Seed Initial Database Content & Administrator
```bash
npm run seed
```
This initializes all 12 MongoDB collections, sets up the demo content matching the reference image, and creates the administrator account:
- **Email**: `admin@shahinurakter.com`
- **Password**: `Admin@Shahinur2026!`

### 3. Run Development Servers
From the root directory:
```bash
npm run dev
```
This runs both servers simultaneously:
- **Backend API**: `http://localhost:5000`
- **Frontend App**: `http://localhost:5173`
- **Admin Dashboard**: `http://localhost:5173/admin`

Or run them individually:
```bash
npm run dev:server    # Runs Express API with tsx watch
npm run dev:client    # Runs Vite dev server
```

---

## 🔒 Security Best Practices Implemented
- Passwords hashed with `bcryptjs` with salt rounds = 12.
- `passwordHash` excluded by default (`select: false`) in Mongoose.
- HTTP security headers powered by `helmet`.
- Centralized rate limiting prevents contact form spam and brute force attacks.
- Strict input validation on every route powered by `Zod`.
- Inquiries can never be viewed by public users; only authenticated administrators have access.
