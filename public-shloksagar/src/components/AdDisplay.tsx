import { useEffect, useState } from 'react';
import { api } from '../lib/api';

interface Ad {
    id: string;
    advertiser_name: string;
    image_url: string;
    redirect_url: string;
}

interface AdDisplayProps {
    placement?: 'after-content' | 'between-sections' | 'above-footer';
    className?: string;
}

export default function AdDisplay({ placement = 'after-content', className = '' }: AdDisplayProps) {
    const [ad, setAd] = useState<Ad | null>(null);
    const [impressed, setImpressed] = useState(false);

    useEffect(() => {
        loadAd();
    }, []);

    async function loadAd() {
        try {
            const response = await api.ads.get();
            if (response.success && response.data) {
                setAd(response.data);
            }
        } catch (error) {
            console.error('Failed to load ad:', error);
        }
    }

    useEffect(() => {
        if (ad && !impressed) {
            // Track impression after ad is visible for 1 second
            const timer = setTimeout(() => {
                api.ads.trackImpression(ad.id, window.location.pathname)
                    .catch(console.error);
                setImpressed(true);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [ad, impressed]);

    const handleClick = () => {
        if (ad) {
            api.ads.trackClick(ad.id, window.location.pathname)
                .catch(console.error);
            window.open(ad.redirect_url, '_blank', 'noopener,noreferrer');
        }
    };

    if (!ad) return null;

    return (
        <div className={`my-8 ${className}`}>
            <div className="text-xs text-muted-foreground text-center mb-2">
                प्रायोजित
            </div>
            <div
                onClick={handleClick}
                className="cursor-pointer overflow-hidden rounded-lg border bg-card hover:shadow-lg transition-shadow"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleClick()}
            >
                <img
                    src={ad.image_url}
                    alt={ad.advertiser_name}
                    className="w-full h-auto"
                    loading="lazy"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                />
            </div>
        </div>
    );
}
