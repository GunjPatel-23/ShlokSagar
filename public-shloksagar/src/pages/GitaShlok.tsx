import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { api } from '@/lib/api';
import Layout from '@/components/Layout';
import AdDisplay from '@/components/AdDisplay';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface GitaShlok {
    id: string;
    slug: string;
    chapter_number: number;
    verse_number: number;
    title_en: string;
    title_hi: string;
    title_gu: string;
    sanskrit_text: string;
    meaning_en: string;
    meaning_hi: string;
    meaning_gu: string;
    explanation_en?: string;
    explanation_hi?: string;
    explanation_gu?: string;
}

export default function GitaShlok() {
    const { slug } = useParams<{ slug?: string }>();
    const { t, getContent } = useLanguage();
    const [shloks, setShloks] = useState<GitaShlok[]>([]);
    const [shlok, setShlok] = useState<GitaShlok | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const trackPageView = async () => {
            await api.analytics.trackPageView(slug ? `/gita-shlok/${slug}` : '/gita-shlok');
        };
        trackPageView();

        const fetchData = async () => {
            try {
                if (slug) {
                    const data = await api.gita.getBySlug(slug);
                    setShlok(data);
                    await api.analytics.trackContentTypeInterest('gita-shlok');
                } else {
                    const data = await api.gita.getAll();
                    setShloks(data);
                }
            } catch (error) {
                console.error('Failed to fetch gita shlok:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [slug]);

    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center py-20">
                    <Loader2 className="h-12 w-12 animate-spin text-orange-600" />
                </div>
            </Layout>
        );
    }

    // Detail view
    if (slug && shlok) {
        return (
            <Layout
                title={getContent(shlok, 'title')}
                description={`Chapter ${shlok.chapter_number}, Verse ${shlok.verse_number}`}
            >
                <article className="container mx-auto px-4 py-12 max-w-4xl">
                    <header className="mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-orange-900">
                            {getContent(shlok, 'title')}
                        </h1>
                        <p className="text-xl text-gray-700">
                            Chapter {shlok.chapter_number}, Verse {shlok.verse_number}
                        </p>
                    </header>

                    <section className="mb-8 p-6 bg-orange-50 rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4">संस्कृत श्लोक</h2>
                        <p className="text-2xl leading-relaxed text-orange-900 font-serif">
                            {shlok.sanskrit_text}
                        </p>
                    </section>

                    <section className="mb-8">
                        <h3 className="text-xl font-semibold mb-4">अर्थ (Meaning)</h3>
                        <p className="text-lg leading-relaxed">
                            {getContent(shlok, 'meaning')}
                        </p>
                    </section>

                    {getContent(shlok, 'explanation') && (
                        <section className="mb-8">
                            <h3 className="text-xl font-semibold mb-4">व्याख्या (Explanation)</h3>
                            <div className="text-lg leading-relaxed whitespace-pre-wrap">
                                {getContent(shlok, 'explanation')}
                            </div>
                        </section>
                    )}

                    <AdDisplay placement="after-content" />
                </article>
            </Layout>
        );
    }

    // List view
    return (
        <Layout
            title={t('gitaShlok')}
            description="भगवद गीता के श्लोक - कृष्ण का ज्ञान"
        >
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4 text-orange-900">
                        भगवद गीता के श्लोक
                    </h1>
                    <p className="text-lg text-gray-700">
                        श्रीमद्भगवद्गीता के पवित्र श्लोक
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {shloks.length === 0 ? (
                    <p className="text-center text-gray-600 py-12">No shloks available yet</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {shloks.map((shlok) => (
                            <Link key={shlok.id} to={`/gita-shlok/${shlok.slug}`}>
                                <Card className="hover:shadow-lg transition-shadow h-full">
                                    <CardContent className="p-6">
                                        <p className="text-sm text-orange-600 mb-2">
                                            Chapter {shlok.chapter_number}, Verse {shlok.verse_number}
                                        </p>
                                        <h2 className="text-xl font-semibold mb-3 text-orange-900">
                                            {getContent(shlok, 'title')}
                                        </h2>
                                        <p className="text-sm text-gray-600 font-serif line-clamp-2">
                                            {shlok.sanskrit_text}
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <AdDisplay placement="above-footer" />
        </Layout>
    );
}
