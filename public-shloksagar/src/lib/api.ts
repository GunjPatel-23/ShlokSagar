const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1/public';

console.log('🔗 API_URL:', API_URL);

let sessionId: string | null = null;
let authToken: string | null = null;

// Generate session ID for analytics
function getSessionId(): string {
    if (!sessionId) {
        sessionId = localStorage.getItem('sessionId');
        if (!sessionId) {
            sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            localStorage.setItem('sessionId', sessionId);
        }
    }
    return sessionId;
}

// Get auth token
export function getAuthToken(): string | null {
    if (!authToken) {
        authToken = localStorage.getItem('authToken');
    }
    return authToken;
}

// Set auth token
export function setAuthToken(token: string) {
    authToken = token;
    localStorage.setItem('authToken', token);
}

// Clear auth token
export function clearAuthToken() {
    authToken = null;
    localStorage.removeItem('authToken');
}

async function publicFetch(endpoint: string, options: RequestInit = {}) {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'x-session-id': getSessionId(),
        ...options.headers,
    };

    if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(error.error || `Request failed: ${response.status}`);
    }

    const result = await response.json();
    // Backend returns {success: true, data: [...]}
    return result.data || result;
}

export const api = {
    // ═══ AUTHENTICATION ═══
    auth: {
        // Email OTP (Brevo)
        sendOTP: (email: string) => publicFetch('/auth/send-otp', {
            method: 'POST',
            body: JSON.stringify({ email }),
        }),
        verifyOTP: (email: string, code: string, name?: string) => publicFetch('/auth/verify-otp', {
            method: 'POST',
            body: JSON.stringify({ email, code, name }),
        }),
        // Firebase Google Sign-In
        firebaseGoogle: (idToken: string) => publicFetch('/auth/firebase/google', {
            method: 'POST',
            body: JSON.stringify({ idToken }),
        }),
        // Firebase Phone Sign-In
        firebasePhone: (idToken: string, name?: string) => publicFetch('/auth/firebase/phone', {
            method: 'POST',
            body: JSON.stringify({ idToken, name }),
        }),
        // Legacy Google OAuth (backward compatibility)
        google: (email: string, name: string, googleId: string) => publicFetch('/auth/google', {
            method: 'POST',
            body: JSON.stringify({ email, name, googleId }),
        }),
    },

    // ═══ CATEGORIES ═══
    categories: {
        getAll: () => publicFetch('/categories'),
        getBySlug: (slug: string) => publicFetch(`/categories/${slug}`),
    },

    // ═══ DEVOTIONAL CONTENT ═══
    content: {
        getByType: (type: string, categoryId?: string) => {
            const params = new URLSearchParams();
            if (categoryId) params.append('categoryId', categoryId);
            return publicFetch(`/content/${type}?${params}`);
        },
        getByCategorySlug: (categorySlug: string, contentType: string) => {
            // First get category by slug, then get content by category ID
            return api.categories.getBySlug(categorySlug).then((category) => {
                const params = new URLSearchParams();
                params.append('categoryId', category.id);
                return publicFetch(`/content/${contentType}?${params}`);
            });
        },
        // Fetch a devotional content by its type and slug (SEO URL)
        getBySlug: (type: string, slug: string) => publicFetch(`/content/${type}/${slug}`),
    },

    // ═══ GITA SHLOK ═══
    gita: {
        getAll: (chapter?: number) => {
            const params = chapter ? `?chapter=${chapter}` : '';
            return publicFetch(`/gita-shlok${params}`);
        },
        getBySlug: (slug: string) => publicFetch(`/gita-shlok/${slug}`),
        getByChapterVerse: (chapter: number, verse: number) =>
            publicFetch(`/gita-shlok/chapter/${chapter}/verse/${verse}`),
    },

    // ═══ DAILY CONTENT ═══
    quotes: {
        getToday: () => publicFetch('/quotes/today'),
        getAll: (limit = 30) => publicFetch(`/quotes?limit=${limit}`),
    },

    gitaSandesh: {
        getToday: () => publicFetch('/gita-sandesh/today'),
        getAll: (limit = 30) => publicFetch(`/gita-sandesh?limit=${limit}`),
    },

    // ═══ MEDIA ═══
    wallpapers: {
        getAll: (tags?: string[]) => {
            const params = tags && tags.length > 0 ? `?tags=${tags.join(',')}` : '';
            return publicFetch(`/wallpapers${params}`);
        },
        download: (id: string) => publicFetch(`/wallpapers/${id}/download`),
    },

    videos: {
        getAll: () => publicFetch('/videos'),
        download: (id: string) => publicFetch(`/videos/${id}/download`),
    },

    // ═══ FESTIVALS ═══
    festivals: {
        getAll: () => publicFetch('/festivals'),
        getById: (id: string) => publicFetch(`/festivals/${id}`),
    },

    // ═══ ADS ═══
    ads: {
        get: () => publicFetch('/ads/get'),
        trackImpression: (adId: string, pagePath: string) => publicFetch('/ads/impression', {
            method: 'POST',
            body: JSON.stringify({ adId, sessionId: getSessionId(), pagePath }),
        }),
        trackClick: (adId: string, pagePath: string) => publicFetch('/ads/click', {
            method: 'POST',
            body: JSON.stringify({ adId, sessionId: getSessionId(), pagePath }),
        }),
    },

    // ═══ ANALYTICS ═══
    analytics: {
        trackVisit: (userAgent: string, ip?: string) => publicFetch('/analytics/visit', {
            method: 'POST',
            body: JSON.stringify({ sessionId: getSessionId(), userAgent, ip }),
        }),
        trackPageView: (path: string, pageTitle?: string, referrer?: string) => publicFetch('/analytics/pageview', {
            method: 'POST',
            body: JSON.stringify({ sessionId: getSessionId(), path, pageTitle, referrer }),
        }),
        trackLanguage: (language: string) => publicFetch('/analytics/language', {
            method: 'POST',
            body: JSON.stringify({ sessionId: getSessionId(), language }),
        }),
        trackCategoryInterest: (categoryId: string) => publicFetch('/analytics/category', {
            method: 'POST',
            body: JSON.stringify({ sessionId: getSessionId(), categoryId }),
        }),
        trackContentTypeInterest: (contentType: string) => publicFetch('/analytics/content-type', {
            method: 'POST',
            body: JSON.stringify({ sessionId: getSessionId(), contentType }),
        }),
        trackDownload: (contentId: string, contentType: string) => publicFetch('/analytics/download', {
            method: 'POST',
            body: JSON.stringify({ sessionId: getSessionId(), contentId, contentType }),
        }),
    },

    // ═══ CONTACT ═══
    contact: {
        submit: (data: { name: string; email: string; phone?: string; message: string }) =>
            publicFetch('/contact', {
                method: 'POST',
                body: JSON.stringify(data),
            }),
    },
};
