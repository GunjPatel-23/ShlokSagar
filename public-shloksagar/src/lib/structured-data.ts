export interface StructuredDataProps {
    type: 'website' | 'article' | 'video' | 'image';
    title: string;
    description: string;
    url: string;
    image?: string;
    datePublished?: string;
    dateModified?: string;
    author?: string;
    keywords?: string[];
}

export function generateWebsiteSchema(baseUrl: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'ShlokSagar',
        alternateName: 'श्लोकसागर',
        url: baseUrl,
        description: 'भक्ति की दुनिया - भजन, आरती, चालीसा, भगवद गीता श्लोक और बहुत कुछ',
        inLanguage: ['hi', 'gu', 'en'],
        potentialAction: {
            '@type': 'SearchAction',
            target: `${baseUrl}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string'
        }
    };
}

export function generateArticleSchema(props: StructuredDataProps & { type: 'article' }) {
    const baseUrl = import.meta.env.VITE_APP_URL || 'https://shloksagar.com';

    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: props.title,
        description: props.description,
        url: props.url,
        image: props.image || `${baseUrl}/logo.png`,
        datePublished: props.datePublished,
        dateModified: props.dateModified || props.datePublished,
        author: {
            '@type': 'Person',
            name: props.author || 'ShlokSagar Team'
        },
        publisher: {
            '@type': 'Organization',
            name: 'ShlokSagar',
            logo: {
                '@type': 'ImageObject',
                url: `${baseUrl}/logo.png`
            }
        },
        keywords: props.keywords?.join(', '),
        inLanguage: ['hi', 'gu', 'en']
    };
}

export function generateVideoSchema(props: StructuredDataProps & { type: 'video' }) {
    const baseUrl = import.meta.env.VITE_APP_URL || 'https://shloksagar.com';

    return {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: props.title,
        description: props.description,
        thumbnailUrl: props.image,
        uploadDate: props.datePublished,
        contentUrl: props.url,
        embedUrl: props.url,
        publisher: {
            '@type': 'Organization',
            name: 'ShlokSagar',
            logo: {
                '@type': 'ImageObject',
                url: `${baseUrl}/logo.png`
            }
        },
        inLanguage: ['hi', 'gu', 'en']
    };
}

export function generateImageSchema(props: StructuredDataProps & { type: 'image' }) {
    return {
        '@context': 'https://schema.org',
        '@type': 'ImageObject',
        name: props.title,
        description: props.description,
        contentUrl: props.image,
        url: props.url,
        datePublished: props.datePublished,
        author: {
            '@type': 'Person',
            name: props.author || 'ShlokSagar Team'
        },
        inLanguage: ['hi', 'gu', 'en']
    };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url
        }))
    };
}

export function injectStructuredData(schema: any) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
        document.head.removeChild(script);
    };
}
