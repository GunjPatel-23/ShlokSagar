import { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { api } from '@/lib/api';
import { Layout } from '@/components/layout/Layout';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import AdDisplay from '@/components/AdDisplay';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContentData {
    id: string;
    slug: string;
    title_en: string;
    title_hi: string;
    title_gu: string;
    subtitle_en?: string;
    subtitle_hi?: string;
    subtitle_gu?: string;
    content_en: string;
    content_hi: string;
    content_gu: string;
    content_type: string;
    deity?: string;
    author?: string;
}

export default function ContentDetail() {
    const { slug } = useParams<{ slug: string }>();
    const location = useLocation();
    const { language, setLanguage, getContent } = useLanguage();
    const [content, setContent] = useState<ContentData | null>(null);
    const [loading, setLoading] = useState(true);

    // Extract content type from pathname (e.g., '/bhajan/hanuman-chalisa' -> 'bhajan')
    const type = location.pathname.split('/')[1];

    useEffect(() => {
        const trackPageView = async () => {
            await api.analytics.trackPageView(`/${type}/${slug}`);
        };
        trackPageView();

        const fetchContent = async () => {
            if (!type || !slug) return;

            try {
                const data = await api.content.getBySlug(type, slug);
                setContent(data);

                // Track content type interest
                await api.analytics.trackContentTypeInterest(type);
            } catch (error) {
                console.error('Failed to fetch content:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, [type, slug]);

    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center py-20">
                    <Loader2 className="h-12 w-12 animate-spin text-orange-600" />
                </div>
            </Layout>
        );
    }

    if (!content) {
        return (
            <Layout title="Content Not Found">
                <div className="container mx-auto px-4 py-20 text-center">
                    <h1 className="text-3xl font-bold mb-4">Content not found</h1>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <article className="container-devotional py-8 max-w-5xl">
                {/* Back Button */}
                <Link
                    to="/categories"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Categories
                </Link>

                {/* Header with Language Switcher */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
                    <div className="flex-1">
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 font-devanagari">
                            {getContent(content, 'title')}
                        </h1>
                        {content.content_type && (
                            <p className="text-sm text-muted-foreground capitalize">
                                {content.content_type}
                            </p>
                        )}
                    </div>
                    <LanguageSwitcher
                        currentLanguage={language}
                        onLanguageChange={setLanguage}
                    />
                </div>

                {/* Content */}
                <div className="bg-card rounded-xl border border-border p-6 md:p-10 mb-8">
                    <div className="prose prose-lg max-w-none">
                        <div className="text-lg leading-relaxed whitespace-pre-wrap shlok-text">
                            {getContent(content, 'content')}
                        </div>
                    </div>
                </div>

                <AdDisplay placement="after-content" />
            </article>
        </Layout>
    );
}
