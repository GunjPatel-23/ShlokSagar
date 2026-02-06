import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import AuthDialog from '@/components/AuthDialog';

export default function Header() {
    const { language, setLanguage, t } = useLanguage();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { path: '/', label: t('home') },
        { path: '/categories', label: t('categories') },
        { path: '/bhajans', label: t('bhajans') },
        { path: '/aarti', label: t('aarti') },
        { path: '/chalisa', label: t('chalisa') },
        { path: '/gita-shlok', label: t('gitaShlok') },
        { path: '/quotes', label: t('quotes') },
        { path: '/gita-sandesh', label: t('gitaSandesh') },
        { path: '/wallpapers', label: t('wallpapers') },
        { path: '/videos', label: t('videos') },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link to="/" className="flex items-center space-x-2">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                                श्लोकसागर
                            </h1>
                        </Link>

                        <nav className="hidden lg:flex items-center space-x-1">
                            {navItems.slice(0, 6).map((item) => (
                                <Link key={item.path} to={item.path}>
                                    <Button
                                        variant={isActive(item.path) ? 'default' : 'ghost'}
                                        size="sm"
                                        className="text-sm"
                                    >
                                        {item.label}
                                    </Button>
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Language Switcher */}
                        <div className="hidden md:flex items-center gap-1 border rounded-md p-1">
                            <Button
                                size="sm"
                                variant={language === 'hindi' ? 'default' : 'ghost'}
                                onClick={() => setLanguage('hindi')}
                                className="text-xs h-7"
                            >
                                हिं
                            </Button>
                            <Button
                                size="sm"
                                variant={language === 'gujarati' ? 'default' : 'ghost'}
                                onClick={() => setLanguage('gujarati')}
                                className="text-xs h-7"
                            >
                                ગુ
                            </Button>
                            <Button
                                size="sm"
                                variant={language === 'english' ? 'default' : 'ghost'}
                                onClick={() => setLanguage('english')}
                                className="text-xs h-7"
                            >
                                EN
                            </Button>
                        </div>

                        {/* Auth options intentionally hidden on public site */}

                        {/* Mobile Menu */}
                        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="lg:hidden">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <div className="flex flex-col gap-4 mt-8">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <Button
                                                variant={isActive(item.path) ? 'default' : 'ghost'}
                                                className="w-full justify-start"
                                            >
                                                {item.label}
                                            </Button>
                                        </Link>
                                    ))}

                                    <div className="border-t pt-4 mt-4">
                                        <div className="flex gap-2 mb-4">
                                            <Button
                                                size="sm"
                                                variant={language === 'hindi' ? 'default' : 'outline'}
                                                onClick={() => setLanguage('hindi')}
                                                className="flex-1"
                                            >
                                                हिंदी
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant={language === 'gujarati' ? 'default' : 'outline'}
                                                onClick={() => setLanguage('gujarati')}
                                                className="flex-1"
                                            >
                                                ગુજરાતી
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant={language === 'english' ? 'default' : 'outline'}
                                                onClick={() => setLanguage('english')}
                                                className="flex-1"
                                            >
                                                English
                                            </Button>
                                        </div>

                                        {/* Auth options intentionally hidden on public site */}
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>

        </>
    );
}
