import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '@/lib/api';

export function useAnalytics() {
    const location = useLocation();

    // Track initial site visit (once per session)
    useEffect(() => {
        const hasTrackedVisit = sessionStorage.getItem('analytics_visit_tracked');
        if (!hasTrackedVisit) {
            api.analytics.trackVisit(navigator.userAgent).catch(() => { });
            sessionStorage.setItem('analytics_visit_tracked', 'true');
        }
    }, []);

    // Track page views on route change
    useEffect(() => {
        api.analytics.trackPageView(location.pathname, document.title, document.referrer).catch(() => { });
    }, [location.pathname]);
}
