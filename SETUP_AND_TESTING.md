# ShlokSagar - Complete Setup & Testing Guide

## 🎯 Quick Start Summary

All major code fixes and features have been implemented! Here's what's ready:

### ✅ Completed
- Central data mapping and validation in backend services
- Slug-based SEO URLs for categories and content
- Non-Latin title handling with fallback slugs
- Multi-language field support (EN/HI/GU)
- Admin UI for Gita Sandesh with new metadata fields
- Public frontend with real data mapping
- Client-side fuzzy search with Fuse.js
- Category pages with slug-based navigation
- Delete operations for quotes and gita_sandesh

### ⏳ Requires Manual Action
- Database migration execution in Supabase
- Browser-based testing and QA

---

## 📋 Setup Steps

### 1. Apply Database Migration

**Supabase Dashboard Method (Easiest):**

1. Open [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **SQL Editor** (left sidebar)
4. Copy the contents of `backend-shloksagar/migrations/005_add_gita_sandesh_fields.sql`
5. Paste and click **Run**

**Verification Query:**
```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'gita_sandesh' 
  AND column_name IN ('adhyay_name', 'adhyay_number', 'shlok_name');
```

Expected: 3 rows showing the new columns.

---

### 2. Start Backend Server

```powershell
cd d:\ShlokSagar\backend-shloksagar
npm run dev
```

**Expected Output:**
```
🚀 ShlokSagar Backend is running! 🔥
Env: development
🔗 Port: 3000
```

**Environment Variables Required:**
- `SUPABASE_URL`
- `SUPABASE_SERVICE_KEY`
- `ADMIN_API_KEY`
- Cloudinary credentials (optional for media upload)

---

### 3. Start Admin UI

```powershell
cd d:\ShlokSagar\admin-shloksagar
npm run dev
```

**Expected:** Admin UI runs on `http://localhost:3001` (or next available port)

---

### 4. Start Public Frontend

```powershell
cd d:\ShlokSagar\public-shloksagar
npm run dev
```

**Expected:** Public site runs on `http://localhost:5173`

---

## 🧪 Testing Checklist

### Backend API Tests (Already Verified ✅)

These were tested via terminal HTTP calls:

- [x] Create devotional content (bhajan, aarti, chalisa, stotra)
- [x] Slug uniqueness (duplicate titles get `-1`, `-2` suffix)
- [x] Non-Latin title fallback (`auto-<timestamp>`)
- [x] Create quote with date
- [x] Create gita_sandesh with new fields
- [x] Delete quote
- [x] Delete gita_sandesh
- [x] Create wallpaper
- [x] Create video

### Admin UI Testing (Manual Browser Testing Required)

**Devotional Content:**
1. Open admin UI → Devotional Content Manager
2. Create a new bhajan:
   - Title (EN): "Test Bhajan"
   - Title (HI): "परीक्षण भजन"
   - Title (GU): "પરીક્ષણ ભજન"
   - Select category
   - Add content
   - Save
3. Verify slug is generated automatically
4. Try duplicate title → verify slug gets suffix
5. Edit and update
6. Delete

**Gita Sandesh:**
1. Open admin UI → Gita Sandesh Manager
2. Create new entry with:
   - Adhyay Name: "Karma Yoga"
   - Adhyay Number: 3
   - Shlok Name: "Verse 21"
   - Shlok (multiline text)
   - Meaning/translation
   - Date
3. Toggle "Detailed explanation" and add extended meaning
4. Save and verify
5. Edit existing entry
6. Delete

**Quotes:**
1. Open Quotes Manager
2. Create quote with image/video URL
3. Delete quote

### Public Frontend Testing (Manual Browser Testing Required)

**Homepage:**
1. Open `http://localhost:5173`
2. Verify categories load with images
3. Click a category → should navigate to `/categories/<slug>`
4. Verify daily quote displays
5. Verify daily gita sandesh displays

**Search:**
1. Use search box in header (desktop view)
2. Search for "Krishna" → verify results
3. Search in Hindi/Gujarati → verify fuzzy matching
4. Click result → should navigate to content detail page

**Category Detail:**
1. Navigate to a category (e.g., `/categories/lord-krishna`)
2. Verify bhajan/aarti/chalisa/stotra tabs
3. Content should display in selected language
4. Verify content is real data (not mock "coming soon")

**Content Detail:**
1. Navigate to a content page (e.g., `/bhajans/<slug>`)
2. Verify multi-language content displays
3. Verify meta tags and SEO structure

**Quotes & Gita Sandesh Pages:**
1. Open `/quotes` → verify list of quotes
2. Open `/gita-sandesh` → verify list of sandesh
3. Verify media (images/videos) display
4. Check new metadata fields (chapter, verse) display

---

## 🔧 Development Commands

### Backend
```powershell
# Development with auto-reload
npm run dev

# Build TypeScript
npm run build

# Run tests
npm test
```

### Admin UI
```powershell
# Development
npm run dev

# Build for production
npm run build
```

### Public Frontend
```powershell
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test
```

---

## 🐛 Troubleshooting

### "Could not find column" errors
**Cause:** Migration not applied or schema cache stale  
**Fix:** 
1. Apply migration in Supabase
2. Restart backend server
3. Clear browser cache

### Slug uniqueness constraint errors
**Cause:** Duplicate slug in database  
**Fix:** Implemented! Slugs now auto-suffix with `-1`, `-2`, etc.

### Empty slug for non-Latin titles
**Cause:** Original slug generator only worked with Latin characters  
**Fix:** Implemented fallback to `auto-<timestamp>` for non-Latin text

### Public site shows "No results"
**Cause:** No content created yet, or API not running  
**Fix:** 
1. Ensure backend is running
2. Create content via admin UI
3. Check browser console for API errors

### Search not working
**Cause:** Dependencies not installed  
**Fix:** 
```powershell
cd d:\ShlokSagar\public-shloksagar
npm install
```

---

## 📁 Key Files Modified

### Backend
- `src/services/content.service.ts` - Central mapping, slug generation, CRUD
- `src/controllers/admin.controller.ts` - Validation and normalization
- `src/routes/admin.routes.ts` - Delete routes added
- `migrations/005_add_gita_sandesh_fields.sql` - New migration

### Admin UI
- `components/admin/gita-sandesh-manager.tsx` - New metadata fields
- `components/admin/text-content-manager.tsx` - Multi-language fields

### Public Frontend
- `src/pages/Search.tsx` - **NEW** Fuzzy search page
- `src/pages/CategoryDetail.tsx` - Slug-based routing
- `src/pages/Index.tsx` - Real data mapping
- `src/pages/Quotes.tsx` - Backend field mapping
- `src/components/layout/Header.tsx` - Search input
- `src/components/cards/CategoryCard.tsx` - Slug links
- `src/lib/api.ts` - Updated API client
- `src/App.tsx` - Search route added

---

## 🚀 Next Steps

1. **Apply Migration** → See "Setup Steps" above
2. **Start All Services** → Backend + Admin + Public
3. **Create Test Content** → Via admin UI
4. **Browser Testing** → Use checklist above
5. **Production Deploy** → After QA passes

---

## 📞 Support

If you encounter issues:
1. Check backend logs for detailed error messages
2. Verify environment variables are set
3. Check browser console for frontend errors
4. Ensure migration was applied successfully

**API Test Command:**
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/v1/public/categories" -Method GET
```

Should return categories with `slug` field.
