# Analytics Dashboard - Complete Overhaul

## ✅ What Was Done

### 1. Backend Enhancements
- **Created Migration 006** (`006_enhanced_analytics.sql`)
  - New `video_play_events` table for tracking video playback
  - 5 new database functions for comprehensive analytics
  - Enhanced `get_top_pages()` with unique visitor counts

- **Updated Analytics Service** (`src/services/analytics.service.ts`)
  - Added `trackVideoPlay()` function
  - Added `getVideoPlayStats()` for video engagement
  - Added `getTopVideos()` for most played content
  - Added `getHourlyTraffic()` for time-based analysis
  - Added `getUserAgentStats()` for device breakdown
  - Enhanced `getDashboardAnalytics()` to aggregate all metrics

- **Updated Admin Routes** (`src/routes/admin.routes.ts`)
  - Enhanced `/analytics/dashboard` endpoint
  - Returns comprehensive data structure with 11 data types

### 2. Frontend Dashboard Rewrite
- **Completely rewrote** `analytics-dashboard.tsx`
- **Removed**: Active Users, Total Shares (as requested)
- **Added**: Comprehensive real-time analytics

#### New Features:
1. **Filter Dropdown**
   - Today, Yesterday, Last 7 Days, Last 30 Days, This Year, All Time

2. **3 Key Metric Cards**
   - Total Page Views (with unique visitors count)
   - Video Plays (with tracked videos count)
   - Avg Engagement (pages per visitor)

3. **Traffic Over Time Chart**
   - Line chart showing visitors vs page views
   - Date-based trend analysis

4. **Most Visited Pages List**
   - Ranked list with position badges (1-10)
   - Shows page title, path, views, and unique visitors

5. **Video Engagement Chart**
   - Bar chart of video plays over time
   - Daily breakdown

6. **Traffic by Hour Chart**
   - Bar chart showing hourly distribution (0-23)
   - Identify peak traffic times

7. **Device Distribution Pie Chart**
   - Mobile, Desktop, Tablet breakdown
   - Percentage labels

8. **Content Type Interest**
   - Progress bars showing relative interest
   - View counts per content type

9. **Language Preferences**
   - Grid of language cards with counts

## 🚀 How to Use

### Step 1: Run the Migration
1. Open Supabase Dashboard → SQL Editor
2. Copy content from `migrations/006_enhanced_analytics.sql`
3. Paste and execute in SQL Editor
4. See `migrations/RUN_006_IN_SUPABASE.md` for detailed instructions

### Step 2: Restart Services (if running)
```powershell
# Backend (in backend-shloksagar/)
npm run dev

# Admin Dashboard (in admin-shloksagar/)
npm run dev

# Public Frontend (in public-shloksagar/)
npm run dev
```

### Step 3: View Analytics
1. Open admin dashboard: http://localhost:3001
2. Navigate to Analytics Dashboard
3. Use filter dropdown to change time ranges
4. All charts will update automatically

## 📊 Data Flow

### Page Views
- Tracked in `page_views` table
- Aggregated by `get_visitor_stats()` and `get_top_pages()`
- Displayed in: Traffic chart, Top Pages list, Metric cards

### Video Plays
- Tracked in `video_play_events` table (NEW)
- Aggregated by `get_video_play_stats()` and `get_top_videos()`
- Displayed in: Video Engagement chart, Metric cards

### Hourly Traffic
- Extracted from `site_visits` timestamps
- Aggregated by `get_hourly_traffic()`
- Displayed in: Traffic by Hour chart

### Device Stats
- Detected from User-Agent headers
- Aggregated by `get_user_agent_stats()`
- Displayed in: Device Distribution pie chart

### Content Types
- Tracked in `content_type_interest` table
- Displayed in: Content Type Interest section

### Languages
- Tracked in `language_preference` table
- Displayed in: Language Preferences section

## 🎯 API Response Structure

```typescript
GET /api/admin/analytics/dashboard?filter=7d

{
  "success": true,
  "data": {
    // Overview
    "totalViews": 896,
    "totalVisitors": 200,
    "totalVideoPlays": 45,
    
    // Time series
    "daily": [
      { "date": "2024-01-15", "visitors": 50, "views": 120 }
    ],
    "videoPlays": [
      { "date": "2024-01-15", "plays": 12, "uniqueViewers": 8, "avgDuration": 145 }
    ],
    
    // Top content
    "topPages": [
      { "path": "/gita", "title": "Bhagavad Gita", "views": 150, "unique_visitors": 80 }
    ],
    "topVideos": [
      { "videoId": "uuid", "playCount": 20, "uniqueViewers": 15, "avgDuration": 180, "completionRate": 75 }
    ],
    
    // Distribution
    "hourlyTraffic": [
      { "hour": 14, "views": 45 }
    ],
    "deviceStats": [
      { "name": "Mobile", "views": 500 },
      { "name": "Desktop", "views": 300 }
    ],
    "contentTypes": [
      { "content_type": "video", "views": 250 }
    ],
    "languages": [
      { "language": "hindi", "count": 120 }
    ]
  }
}
```

## 🔧 Configuration

### Backend Filter Support
- `today` - Today's data (00:00 to now)
- `yesterday` - Yesterday's data
- `7d` - Last 7 days
- `30d` - Last 30 days
- `year` - Current year
- `all` - All time data

### Charts Library
- Using **Recharts** (already installed)
- LineChart, BarChart, PieChart components
- Responsive containers for all chart types

## 📝 Notes

- **Real Data Only**: No test/seed data is used
- All metrics are calculated from actual user interactions
- Video tracking requires integration with video player (see below)

## 🎬 Next: Video Tracking Integration

To track video plays in your public app:

```typescript
// When video starts playing
await fetch('/api/analytics/track-video-play', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    videoId: 'video-uuid',
    sessionId: 'user-session-id',
    playDuration: 0 // updated on pause/end
  })
});

// When video ends or pauses
await fetch('/api/analytics/track-video-play', {
  method: 'POST',
  body: JSON.stringify({
    videoId: 'video-uuid',
    sessionId: 'user-session-id',
    playDuration: 120, // seconds watched
    completed: true // if watched till end
  })
});
```

## ✨ Features Summary

✅ Filter by: today, yesterday, 7d, 30d, year, all time  
✅ Page views with unique visitor tracking  
✅ Video plays with engagement metrics  
✅ Hourly traffic distribution (24-hour breakdown)  
✅ Device breakdown (Mobile/Desktop/Tablet)  
✅ Top 10 most visited pages  
✅ Top videos by play count  
✅ Content type interest bars  
✅ Language preference cards  
✅ Real-time data (no seeding)  
✅ Responsive charts and tables  
✅ Clean, modern UI with shadcn/ui components  

## 🐛 Troubleshooting

### Issue: Charts show no data
- **Solution**: Run migration 006 in Supabase
- **Verify**: Check that tables have data using Supabase Table Editor

### Issue: API returns 000 or null values
- **Solution**: Ensure backend filter parameter matches frontend
- **Verify**: Check browser Network tab for API response

### Issue: TypeScript errors
- **Solution**: Restart VS Code TypeScript server
- **Command**: Ctrl+Shift+P → "TypeScript: Restart TS Server"

### Issue: Video plays always 0
- **Solution**: Migration 006 must be run first
- **Note**: Video tracking requires public app integration
