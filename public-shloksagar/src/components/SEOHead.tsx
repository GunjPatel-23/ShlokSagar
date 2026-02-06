import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { generateWebsiteSchema, generateArticleSchema, injectStructuredData, type StructuredDataProps } from '@/lib/structured-data';

interface SEOHeadProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    noindex?: boolean;
    canonical?: string;
    structuredData?: Partial<StructuredDataProps>;
}

export default function SEOHead({
    title = 'श्लोकसागर - भक्ति साहित्य',
    description = 'भजन, आरती, चालीसा, गीता श्लोक, प्रेरक विचार और भक्ति वॉलपेपर का संपूर्ण संग्रह',
    keywords = 'भजन, आरती, चालीसा, गीता श्लोक, भक्ति, हिंदू धर्म, bhajan, aarti, chalisa, gita',
    image = '/og-image.jpg',
    noindex = false,
    canonical,
    structuredData,
}: SEOHeadProps) {
    const { language } = useLanguage();
    const siteUrl = import.meta.env.VITE_APP_URL || 'https://shloksagar.com';
    const fullTitle = title.includes('श्लोकसागर') ? title : `${title} | श्लोकसागर`;
    const currentUrl = canonical || window.location.href;

    useEffect(() => {
        // Inject website schema on every page
        const removeWebsiteSchema = injectStructuredData(generateWebsiteSchema(siteUrl));

        // Inject article schema if structured data provided
        let removeArticleSchema: (() => void) | undefined;
        if (structuredData && structuredData.type === 'article') {
            const articleSchema = generateArticleSchema({
                type: 'article',
                title: structuredData.title || fullTitle,
                description: structuredData.description || description,
                url: structuredData.url || currentUrl,
                image: structuredData.image || `${siteUrl}${image}`,
                datePublished: structuredData.datePublished,
                dateModified: structuredData.dateModified,
                author: structuredData.author,
                keywords: structuredData.keywords || keywords.split(', ')
            });
            removeArticleSchema = injectStructuredData(articleSchema);
        }

        return () => {
            removeWebsiteSchema();
            if (removeArticleSchema) removeArticleSchema();
        };
    }, [siteUrl, fullTitle, description, currentUrl, image, structuredData, keywords]);

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Language */}
            <html lang={language === 'hindi' ? 'hi' : language === 'gujarati' ? 'gu' : 'en'} />

            {/* Canonical */}
            <link rel="canonical" href={currentUrl} />

            {/* Hreflang for multilingual SEO */}
            <link rel="alternate" hrefLang="hi" href={currentUrl} />
            <link rel="alternate" hrefLang="gu" href={currentUrl} />
            <link rel="alternate" hrefLang="en" href={currentUrl} />
            <link rel="alternate" hrefLang="x-default" href={currentUrl} />

            {/* Open Graph */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={`${siteUrl}${image}`} />
            <meta property="og:locale" content="hi_IN" />
            <meta property="og:locale:alternate" content="gu_IN" />
            <meta property="og:locale:alternate" content="en_IN" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={currentUrl} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={`${siteUrl}${image}`} />

            {/* Robots */}
            {noindex && <meta name="robots" content="noindex, nofollow" />}

            {/* Mobile */}
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="theme-color" content="#f97316" />
        </Helmet>
    );
}
