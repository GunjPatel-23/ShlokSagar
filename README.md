# 🕉️ ShlokSagar - Devotional Content Platform

> A comprehensive digital platform for Hindu devotional content including Bhajans, Aartis, Chalisas, Gita Shlokas, Wallpapers, and Festival information.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)

---

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Setup](#-environment-setup)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

---

## ✨ Features

### Public Features
- 🙏 **Devotional Content Library** - Browse Bhajans, Aartis, Chalisas organized by deities
- 📖 **Bhagavad Gita** - Daily Gita Sandesh and complete Gita Shlok repository
- 💭 **Daily Quotes** - Inspirational quotes from sacred scriptures
- 🖼️ **Wallpapers** - High-quality devotional wallpapers with filter by color/deity
- 🎉 **Festival Calendar** - Upcoming Hindu festivals with images and videos
- 🔍 **Smart Search** - Fast fuzzy search across all content
- 📱 **Responsive Design** - Mobile-first, elder-friendly UI with high contrast
- 📥 **Easy Downloads** - One-click download for wallpapers and quotes
- 🌐 **SEO Optimized** - Meta tags, structured data, and sitemap generation
- 📊 **Analytics** - Privacy-focused user engagement tracking

### Admin Features
- 🔐 **Secure Admin Panel** - Protected admin dashboard with authentication
- 📝 **Content Management** - CRUD operations for all content types
- 🖼️ **Cloudinary Integration** - Image and video upload management
- 📊 **Analytics Dashboard** - Real-time insights with charts and metrics
- 💰 **Ad Management** - Monetization through strategic ad placements
- 📮 **Contact Messages** - View and manage user inquiries
- 👥 **User Management** - Admin user roles and permissions

---

## 🏗️ Architecture

```
┌─────────────────┐
│  Public Website │  (React + Vite)
│   Port: 8081    │
└────────┬────────┘
         │
         │ API Calls
         ↓
┌─────────────────┐
│  Backend API    │  (Node.js + Express)
│   Port: 3000    │
└────────┬────────┘
         │
         ├──→ Supabase (PostgreSQL)
         ├──→ Cloudinary (Media Storage)
         └──→ Firebase (Authentication)

┌─────────────────┐
│ Admin Dashboard │  (Next.js)
│   Port: 3001    │
└────────┬────────┘
         │
         └──→ Backend API
```

---

## 🛠️ Tech Stack

### Frontend (Public)
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **UI Library:** TailwindCSS + shadcn/ui
- **Routing:** React Router v6
- **State Management:** React Context API
- **Testing:** Vitest + React Testing Library

### Frontend (Admin)
- **Framework:** Next.js 15 (App Router)
- **UI:** TailwindCSS + shadcn/ui
- **Charts:** Recharts
- **Authentication:** Custom Admin Auth

### Backend
- **Runtime:** Node.js 20+
- **Framework:** Express.js with TypeScript
- **Database:** PostgreSQL (Supabase)
- **ORM:** Supabase Client
- **Authentication:** Firebase Admin SDK + Google OAuth
- **File Upload:** Cloudinary
- **Email:** Brevo (formerly SendGrid)
- **Security:** Helmet, CORS, Rate Limiting

### DevOps
- **Package Manager:** npm
- **Code Quality:** ESLint, Prettier
- **Version Control:** Git

---

## 📁 Project Structure

```
ShlokSagar/
├── backend-shloksagar/          # Express.js API Server
│   ├── src/
│   │   ├── controllers/         # Request handlers
│   │   ├── services/            # Business logic
│   │   ├── routes/              # API routes
│   │   ├── middleware/          # Auth & validation
│   │   ├── config/              # Configuration
│   │   └── types/               # TypeScript types
│   ├── migrations/              # Database migrations
│   └── package.json
│
├── public-shloksagar/           # React Public Website
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   ├── pages/               # Route pages
│   │   ├── contexts/            # Global state
│   │   ├── hooks/               # Custom hooks
│   │   ├── lib/                 # Utilities & API client
│   │   └── assets/              # Static assets
│   └── package.json
│
├── admin-shloksagar/            # Next.js Admin Dashboard
│   ├── app/                     # App router pages
│   ├── components/
│   │   ├── admin/               # Admin-specific components
│   │   └── ui/                  # Shared UI components
│   ├── hooks/                   # Custom hooks
│   ├── lib/                     # Utilities
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20.x or higher
- **npm** 10.x or higher
- **Supabase Account** (for database)
- **Cloudinary Account** (for media storage)
- **Firebase Project** (for authentication)
- **Google Cloud Console** (for OAuth)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/GunjPatel-23/ShlokSagar.git
   cd ShlokSagar
   ```

2. **Install dependencies for all projects**
   ```bash
   # Backend
   cd backend-shloksagar
   npm install

   # Public Frontend
   cd ../public-shloksagar
   npm install

   # Admin Dashboard
   cd ../admin-shloksagar
   npm install
   ```

---

## ⚙️ Environment Setup

### Backend Environment Variables

Create `backend-shloksagar/.env`:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database (Supabase)
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
DATABASE_URL=your_database_connection_string

# Media Storage (Cloudinary)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Authentication (Firebase)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY="your_private_key"
FIREBASE_CLIENT_EMAIL=your_client_email

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

# Security
ADMIN_API_KEY=your_admin_secret_key
JWT_SECRET=your_jwt_secret

# CORS
FRONTEND_URL=http://localhost:8081
ADMIN_URL=http://localhost:3001

# Email (Brevo)
BREVO_API_KEY=your_brevo_api_key
BREVO_SENDER_EMAIL=your_email@example.com
BREVO_SENDER_NAME=ShlokSagar
```

### Public Frontend Environment Variables

Create `public-shloksagar/.env`:

```env
VITE_API_URL=http://localhost:3000/api/v1/public
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
```

### Admin Dashboard Environment Variables

Create `admin-shloksagar/.env`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1/admin
NEXT_PUBLIC_ADMIN_KEY=your_admin_secret_key
```

---

## ▶️ Running the Application

### Development Mode

**Option 1: Run all services separately**

```bash
# Terminal 1 - Backend
cd backend-shloksagar
npm run dev

# Terminal 2 - Public Frontend
cd public-shloksagar
npm run dev

# Terminal 3 - Admin Dashboard
cd admin-shloksagar
npm run dev
```

**Option 2: Use concurrently (recommended)**

Install concurrently globally:
```bash
npm install -g concurrently
```

From project root, add to `package.json`:
```json
{
  "scripts": {
    "dev:all": "concurrently \"cd backend-shloksagar && npm run dev\" \"cd public-shloksagar && npm run dev\" \"cd admin-shloksagar && npm run dev\""
  }
}
```

Then run:
```bash
npm run dev:all
```

### Access the Applications

- **Public Website:** http://localhost:8081
- **Admin Dashboard:** http://localhost:3001
- **Backend API:** http://localhost:3000

---

## 📡 API Documentation

### Public API Endpoints

Base URL: `http://localhost:3000/api/v1/public`

#### Categories
```http
GET /categories                    # Get all categories
GET /categories/:slug              # Get category by slug
```

#### Devotional Content
```http
GET /content/:type?categoryId=:id  # Get content by type (bhajan/aarti/chalisa/shlok)
GET /content/:type/:slug           # Get content by slug
```

#### Gita Content
```http
GET /gita-shlok                    # Get all Gita shlokas
GET /gita-shlok/:slug              # Get shloka by slug
GET /gita-shlok/chapter/:ch/verse/:v # Get specific chapter-verse
```

#### Daily Content
```http
GET /quotes/today                  # Get today's quote
GET /quotes?limit=30               # Get all quotes
GET /gita-sandesh/today            # Get today's Gita Sandesh
GET /gita-sandesh?limit=30         # Get all Gita Sandesh
```

#### Media
```http
GET /wallpapers?tags=tag1,tag2     # Get wallpapers
GET /festivals                     # Get festival posts
```

#### Analytics
```http
POST /analytics/pageview           # Track page view
POST /analytics/download           # Track download
```

### Admin API Endpoints

Base URL: `http://localhost:3000/api/v1/admin`

**Authentication:** Include `x-admin-key` header with admin API key

#### Content Management
```http
POST   /categories                 # Create category
PUT    /categories/:id             # Update category
DELETE /categories/:id             # Delete category

POST   /content                    # Create content
PUT    /content/:id                # Update content
DELETE /content/:id                # Delete content

POST   /quotes                     # Create quote
PUT    /quotes/:id                 # Update quote
DELETE /quotes/:id                 # Delete quote
```

#### Analytics
```http
GET /analytics/overview            # Get analytics overview
GET /analytics/top-content         # Get top content
```

---

## 🗄️ Database Setup

### Run Migrations

1. Access Supabase Dashboard
2. Go to SQL Editor
3. Run the migration file: `backend-shloksagar/migrations/RUN_THIS_IN_SUPABASE.sql`

This will create all necessary tables:
- `categories` - Deity categories
- `devotional_content` - Bhajans, Aartis, Chalisas, Shlokas
- `gita_shlok` - Bhagavad Gita verses
- `quotes` - Daily quotes
- `gita_sandesh` - Daily Gita wisdom
- `wallpapers` - Devotional wallpapers
- `videos` - Festival videos and posts
- `ads` - Advertisement placements
- `analytics_events` - User analytics
- `contact_messages` - User inquiries
- `admin_users` - Admin authentication

---

## 🚢 Deployment

### Backend Deployment (Railway/Render/DigitalOcean)

1. Set environment variables in hosting platform
2. Configure build command: `npm run build`
3. Configure start command: `npm start`
4. Set Node version to 20.x
5. Enable CORS for production domains

### Frontend Deployment (Vercel/Netlify)

**Public Website:**
```bash
cd public-shloksagar
npm run build
# Deploy the 'dist' folder
```

**Admin Dashboard:**
```bash
cd admin-shloksagar
npm run build
# Deploy with Next.js hosting
```

### Environment Variables for Production

Update all `.env` files with production URLs and credentials:
- Update `FRONTEND_URL` and `ADMIN_URL` to production domains
- Update `GOOGLE_CALLBACK_URL` to production backend URL
- Enable production mode: `NODE_ENV=production`
- Use strong secrets for `JWT_SECRET` and `ADMIN_API_KEY`

---

## 🔒 Security Considerations

- ✅ All sensitive data stored in environment variables
- ✅ Admin API protected with API key
- ✅ Rate limiting on all endpoints (15 min window)
- ✅ CORS configured for specific origins
- ✅ Helmet.js for security headers
- ✅ Input validation and sanitization
- ✅ Firebase authentication for user auth
- ✅ SQL injection prevention via Supabase client
- ❗ Never commit `.env` files to git

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes before submitting

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Authors

- **Gunj Patel** - Initial work - [@GunjPatel-23](https://github.com/GunjPatel-23)

---

## 🙏 Acknowledgments

- Hindu scriptures and devotional literature
- Open source community
- shadcn/ui for beautiful components
- Supabase for database hosting
- Cloudinary for media management

---

## 📞 Support

For support, email shloksagarofficial@gmail.com or open an issue in the GitHub repository.

---

**Made with ❤️ for devotees worldwide**
