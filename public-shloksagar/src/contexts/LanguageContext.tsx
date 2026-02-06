import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'hindi' | 'gujarati' | 'english';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    getContent: (content: any, field?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
    hindi: {
        home: 'होम',
        categories: 'श्रेणियाँ',
        bhajans: 'भजन',
        aarti: 'आरती',
        chalisa: 'चालीसा',
        stotra: 'स्तोत्र',
        gitaShlok: 'गीता श्लोक',
        quotes: 'विचार',
        gitaSandesh: 'गीता संदेश',
        wallpapers: 'वॉलपेपर',
        videos: 'वीडियो',
        login: 'लॉगिन',
        download: 'डाउनलोड',
        readMore: 'और पढ़ें',
        signInRequired: 'डाउनलोड के लिए साइन इन करें',
    },
    gujarati: {
        home: 'હોમ',
        categories: 'શ્રેણીઓ',
        bhajans: 'ભજન',
        aarti: 'આરતી',
        chalisa: 'ચાલીસા',
        stotra: 'સ્તોત્ર',
        gitaShlok: 'ગીતા શ્લોક',
        quotes: 'વિચારો',
        gitaSandesh: 'ગીતા સંદેશ',
        wallpapers: 'વૉલપેપર',
        videos: 'વિડિયો',
        login: 'લોગિન',
        download: 'ડાઉનલોડ',
        readMore: 'વધુ વાંચો',
        signInRequired: 'ડાઉનલોડ માટે સાઇન ઇન કરો',
    },
    english: {
        home: 'Home',
        categories: 'Categories',
        bhajans: 'Bhajans',
        aarti: 'Aarti',
        chalisa: 'Chalisa',
        stotra: 'Stotra',
        gitaShlok: 'Gita Shlok',
        quotes: 'Quotes',
        gitaSandesh: 'Gita Sandesh',
        wallpapers: 'Wallpapers',
        videos: 'Videos',
        login: 'Login',
        download: 'Download',
        readMore: 'Read More',
        signInRequired: 'Sign in to download',
    },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>(() => {
        const saved = localStorage.getItem('language');
        return (saved as Language) || 'hindi';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
        // Track language preference
        import('../lib/api').then(({ api }) => {
            api.analytics.trackLanguage(language).catch(console.error);
        });
    }, [language]);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
    };

    const t = (key: string): string => {
        return translations[language][key] || key;
    };

    const getContent = (content: any, field: string = 'name'): string => {
        if (!content) return '';
        const langSuffix = language === 'hindi' ? 'hi' : language === 'gujarati' ? 'gu' : 'en';
        const key = `${field}_${langSuffix}`;
        return content[key] || content[`${field}_hi`] || content[`${field}_en`] || '';
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, getContent }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
}


