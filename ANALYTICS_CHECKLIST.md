# Analytics Dashboard - Quick Start Checklist

## ✅ Completed
- [x] Removed "Active Users" and "Total Shares" metrics
- [x] Added filter dropdown (today, yesterday, 7d, 30d, year, all time)
- [x] Created comprehensive analytics dashboard UI
- [x] Added video play tracking (database schema)
- [x] Added hourly traffic analysis
- [x] Added device distribution stats
- [x] Added top pages with unique visitors
- [x] Updated backend API to return all data
- [x] Fixed data formatting (snake_case consistency)

## 🔲 To Do Now

### 1. Run Migration in Supabase (REQUIRED)
- [ ] Open Supabase Dashboard → SQL Editor
- [ ] Copy all content from `backend-shloksagar/migrations/006_enhanced_analytics.sql`
- [ ] Paste into SQL Editor and click "Run"
- [ ] Verify success messages appear

**Why**: This creates the `video_play_events` table and required functions

### 2. Restart Services (if running)
```powershell
# Stop all services (Ctrl+C in each terminal)

# Backend
cd backend-shloksagar
npm run dev

# Admin Dashboard
cd admin-shloksagar
npm run dev

# Public Frontend (optional)
cd public-shloksagar
npm run dev
```

### 3. Test Analytics Dashboard
- [ ] Open http://localhost:3001
- [ ] Login to admin panel
- [ ] Navigate to Analytics Dashboard
- [ ] Try different filters (7d, 30d, etc.)
- [ ] Verify all charts render
- [ ] Check if data displays correctly

### 4. (Optional) Add Video Tracking to Public App
If you want video play analytics:
- [ ] Add video tracking API calls in public app
- [ ] See `ANALYTICS_DASHBOARD_COMPLETE.md` for code examples

## 🎯 Expected Results

After running migration, you should see:

### Metric Cards
- **Total Page Views**: Shows page views + unique visitors
- **Video Plays**: Shows 0 initially (until videos are tracked)
- **Avg Engagement**: Shows pages per visitor

### Charts
- **Traffic Over Time**: Line chart with visitors and views
- **Most Visited Pages**: List of top 10 pages with rankings
- **Video Engagement**: Bar chart (will be empty until tracking starts)
- **Traffic by Hour**: Bar chart showing 24-hour distribution
- **Device Distribution**: Pie chart (Mobile/Desktop/Tablet)
- **Content Type Interest**: Progress bars
- **Language Preferences**: Grid of language cards

## 🐛 If Something Doesn't Work

### Backend Error: "function get_video_play_stats does not exist"
→ **Solution**: Run migration 006 in Supabase

### Frontend: All charts show "No data available"
→ **Solution**: Check if backend is running (http://localhost:3000)
→ **Verify**: Open browser DevTools → Network tab → Check API response

### TypeScript Errors in Admin
→ **Solution**: Run `npm install` in admin-shloksagar folder
→ **Then**: Restart admin dev server

## 📁 Files Changed

### Backend
- ✅ `migrations/006_enhanced_analytics.sql` (NEW)
- ✅ `migrations/RUN_006_IN_SUPABASE.md` (NEW - instructions)
- ✅ `src/services/analytics.service.ts` (enhanced with 5 new functions)
- ✅ `src/routes/admin.routes.ts` (updated response format)

### Admin Dashboard
- ✅ `components/admin/analytics-dashboard.tsx` (completely rewritten)

### Documentation
- ✅ `ANALYTICS_DASHBOARD_COMPLETE.md` (NEW - full documentation)
- ✅ `ANALYTICS_CHECKLIST.md` (this file)

## 🚀 Quick Test Commands

```powershell
# Check if backend is running
curl http://localhost:3000/health

# Check analytics API (requires auth token)
curl http://localhost:3000/api/admin/analytics/dashboard?filter=7d

# Check if admin is running
curl http://localhost:3001
```

## 📞 Support

If you encounter issues:
1. Check `ANALYTICS_DASHBOARD_COMPLETE.md` troubleshooting section
2. Verify migration 006 was executed successfully in Supabase
3. Check browser console for errors
4. Check backend terminal for error logs
