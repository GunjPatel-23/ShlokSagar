import { supabase } from './supabase.service';
import crypto from 'crypto';

// Generate session ID from IP and user agent
export function generateSessionId(ip: string, userAgent: string): string {
    const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const hash = crypto
        .createHash('sha256')
        .update(`${ip}-${userAgent}-${date}`)
        .digest('hex');
    return hash;
}

// Hash IP for privacy
export function hashIP(ip: string): string {
    return crypto.createHash('sha256').update(ip).digest('hex');
}

// Track site visit (once per session per day)
export async function trackSiteVisit(sessionId: string, userAgent?: string, ip?: string) {
    // Check if session already visited today
    const today = new Date().toISOString().split('T')[0];
    const { data: existing } = await supabase
        .from('site_visits')
        .select('id')
        .eq('session_id', sessionId)
        .gte('created_at', `${today}T00:00:00Z`)
        .single();

    if (existing) return; // Already tracked today

    const ipHash = ip ? hashIP(ip) : null;

    await supabase.from('site_visits').insert({
        session_id: sessionId,
        user_agent: userAgent,
        ip_hash: ipHash
    });
}

// Track page view
export async function trackPageView(
    sessionId: string,
    path: string,
    pageTitle?: string,
    referrer?: string
) {
    await supabase.from('page_views').insert({
        session_id: sessionId,
        path,
        page_title: pageTitle,
        referrer
    });
}

// Track category interest
export async function trackCategoryInterest(sessionId: string, categoryId: string) {
    await supabase.from('category_interest').insert({
        session_id: sessionId,
        category_id: categoryId
    });
}

// Track content type interest
export async function trackContentTypeInterest(sessionId: string, contentType: string) {
    await supabase.from('content_type_interest').insert({
        session_id: sessionId,
        content_type: contentType
    });
}

// Track language preference
export async function trackLanguagePreference(sessionId: string, language: string) {
    await supabase.from('language_preference').insert({
        session_id: sessionId,
        language
    });
}

// Track download event (requires user authentication)
export async function trackDownload(
    userId: string | null,
    sessionId: string,
    resourceType: 'wallpaper' | 'video',
    resourceId: string
) {
    await supabase.from('download_events').insert({
        user_id: userId,
        session_id: sessionId,
        resource_type: resourceType,
        resource_id: resourceId
    });
}

// Get date range for filters
export function getDateRange(filter: string): { startDate: Date; endDate: Date } {
    const now = new Date();
    const endDate = new Date(now);
    let startDate = new Date(now);

    switch (filter) {
        case 'today':
            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(23, 59, 59, 999);
            break;
        case 'yesterday':
            startDate.setDate(startDate.getDate() - 1);
            startDate.setHours(0, 0, 0, 0);
            endDate.setDate(endDate.getDate() - 1);
            endDate.setHours(23, 59, 59, 999);
            break;
        case 'week':
            startDate.setDate(startDate.getDate() - 7);
            break;
        case 'month':
            startDate.setMonth(startDate.getMonth() - 1);
            break;
        case 'year':
            startDate.setFullYear(startDate.getFullYear() - 1);
            break;
        case 'all':
            startDate = new Date('2024-01-01'); // Platform start date
            break;
        default:
            // For custom range, handled separately
            break;
    }

    return { startDate, endDate };
}

// Get site visits stats
export async function getSiteVisitsStats(startDate: Date, endDate: Date) {
    const { data, error } = await supabase.rpc('get_site_visits_stats', {
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString()
    });

    if (error) throw error;
    return data;
}

// Get top pages
export async function getTopPages(startDate: Date, endDate: Date, limit = 10) {
    const { data, error } = await supabase.rpc('get_top_pages', {
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        limit_count: limit
    });

    if (error) throw error;
    return data;
}

// Get category interest stats
export async function getCategoryInterestStats(startDate: Date, endDate: Date) {
    const { data, error } = await supabase.rpc('get_category_interest_stats', {
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString()
    });

    if (error) throw error;
    return data;
}

// Get content type stats
export async function getContentTypeStats(startDate: Date, endDate: Date) {
    const { data, error } = await supabase.rpc('get_content_type_stats', {
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString()
    });

    if (error) throw error;
    return data;
}

// Get language stats
export async function getLanguageStats(startDate: Date, endDate: Date) {
    const { data, error } = await supabase.rpc('get_language_stats', {
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString()
    });

    if (error) throw error;
    return data;
}

// Get comprehensive analytics dashboard data
export async function getDashboardAnalytics(filter: string, customStart?: Date, customEnd?: Date) {
    let { startDate, endDate } = customStart && customEnd
        ? { startDate: customStart, endDate: customEnd }
        : getDateRange(filter);

    const [visits, topPages, categoryInterest, contentTypes, languages] = await Promise.all([
        getSiteVisitsStats(startDate, endDate),
        getTopPages(startDate, endDate, 10),
        getCategoryInterestStats(startDate, endDate),
        getContentTypeStats(startDate, endDate),
        getLanguageStats(startDate, endDate)
    ]);

    // Calculate total visits
    const totalVisits = visits.reduce((sum: number, day: any) => sum + Number(day.unique_visits), 0);
    const totalPageViews = visits.reduce((sum: number, day: any) => sum + Number(day.total_page_views), 0);

    return {
        totalVisits,
        totalPageViews,
        visitsOverTime: visits,
        topPages,
        categoryInterest,
        contentTypes,
        languages
    };
}

// Get download stats
export async function getDownloadStats(startDate: Date, endDate: Date) {
    const { data, error } = await supabase
        .from('download_events')
        .select('resource_type, resource_id, created_at')
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString());

    if (error) throw error;

    const stats = {
        totalDownloads: data?.length || 0,
        wallpaperDownloads: data?.filter(d => d.resource_type === 'wallpaper').length || 0,
        videoDownloads: data?.filter(d => d.resource_type === 'video').length || 0
    };

    return stats;
}
