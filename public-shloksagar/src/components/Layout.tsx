import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import SEOHead from './SEOHead';

interface LayoutProps {
    children: ReactNode;
    title?: string;
    description?: string;
    keywords?: string;
    noindex?: boolean;
}

export default function Layout({ children, title, description, keywords, noindex }: LayoutProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <SEOHead
                title={title}
                description={description}
                keywords={keywords}
                noindex={noindex}
            />
            <Header />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}
