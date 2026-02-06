import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { api } from '@/lib/api';
import { Layout } from '@/components/layout/Layout';
import AdDisplay from '@/components/AdDisplay';
// Auth dialog hidden from public flow; downloads are open
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Download, Play } from 'lucide-react';
import { toast } from 'sonner';

interface Video {
    id: string;
    title_en: string;
    title_hi: string;
    title_gu: string;
    description_en?: string;
    description_hi?: string;
    description_gu?: string;
    video_url: string;
    thumbnail_url: string;
    duration?: string;
    category?: string;
}

export default function Videos() {
    const { t, getContent } = useLanguage();
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);
    // auth dialog removed; downloads are open
    const [downloadingId, setDownloadingId] = useState<string | null>(null);

    useEffect(() => {
        const trackPageView = async () => {
            await api.analytics.trackPageView('/festival-posts');
        };
        trackPageView();

        const fetchVideos = async () => {
            try {
                console.log('🔍 Fetching videos from API...');
                console.log('🔗 API URL:', import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1/public');

                const data = await api.videos.getAll();

                console.log('📦 Raw response:', data);
                console.log('📊 Is array?', Array.isArray(data));
                console.log('📊 Number of videos:', data?.length || 0);

                if (data && Array.isArray(data) && data.length > 0) {
                    console.log('✅ First video:', data[0]);
                    setVideos(data);
                } else {
                    console.warn('⚠️ No videos or data is not an array');
                    setVideos([]);
                }
            } catch (error) {
                console.error('❌ Failed to fetch festival posts:', error);
                setVideos([]);
            } finally {
                setLoading(false);
            }
        };
        fetchVideos();
    }, []);

    const handleDownload = async (video: Video) => {
        try {
            setDownloadingId(video.id);

            // Use direct media URL to allow anonymous downloads
            const downloadUrl = video.video_url || video.thumbnail_url;

            // Track download event (best-effort)
            api.analytics.trackDownload(video.id, 'video').catch(() => { });

            // Attempt to download the resource (fetch as blob)
            const filename = `${getContent(video, 'title') || 'video'}-${video.id}.mp4`;
            await import('@/lib/download').then(m => m.downloadResource(downloadUrl, filename));
            toast.success('Download started!');
        } catch (error) {
            console.error('Download failed:', error);
            toast.error('Failed to download. Please try again.');
        } finally {
            setDownloadingId(null);
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center py-20">
                    <Loader2 className="h-12 w-12 animate-spin text-orange-600" />
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4 text-orange-900">
                        Festival Posts & Wishes
                    </h1>
                    <p className="text-lg text-gray-700">
                        Festival greetings, reels, and devotional wishing posts
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Debug Info */}
                <div className="mb-4 p-4 bg-gray-100 rounded text-sm">
                    <p><strong>Debug Info:</strong></p>
                    <p>Loading: {loading ? 'Yes' : 'No'}</p>
                    <p>Videos Count: {videos.length}</p>
                    <p>Videos Array: {JSON.stringify(videos.slice(0, 1))}</p>
                </div>

                {loading ? (
                    <p className="text-center text-gray-600 py-12">Loading festival posts...</p>
                ) : videos.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-lg mb-2">No festival posts available yet</p>
                        <p className="text-sm text-gray-500">Check the browser console (F12) for API debug info</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {videos.map((video) => {
                            const isVideo = video.video_url?.match(/\.(mp4|webm|ogg|mov)$/i);
                            const mediaUrl = video.video_url || video.thumbnail_url;

                            return (
                                <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="aspect-square relative group">
                                        {isVideo ? (
                                            <video
                                                src={mediaUrl}
                                                className="w-full h-full object-cover"
                                                onContextMenu={(e) => e.preventDefault()}
                                                poster={video.thumbnail_url}
                                                controls={false}
                                                muted
                                                loop
                                                playsInline
                                            />
                                        ) : (
                                            <img
                                                src={mediaUrl}
                                                alt={getContent(video, 'title')}
                                                className="w-full h-full object-cover"
                                                onContextMenu={(e) => e.preventDefault()}
                                                onDragStart={(e) => e.preventDefault()}
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            {isVideo && <Play className="w-16 h-16 text-white" />}
                                        </div>
                                        {isVideo && video.duration && (
                                            <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                                                {video.duration}
                                            </div>
                                        )}
                                    </div>
                                    <CardContent className="p-4">
                                        <h2 className="text-xl font-semibold mb-2 text-orange-900">
                                            {getContent(video, 'title')}
                                        </h2>
                                        {getContent(video, 'description') && (
                                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                                {getContent(video, 'description')}
                                            </p>
                                        )}
                                        <Button
                                            onClick={() => handleDownload(video)}
                                            disabled={downloadingId === video.id}
                                            className="w-full"
                                        >
                                            {downloadingId === video.id ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Downloading...
                                                </>
                                            ) : (
                                                <>
                                                    <Download className="mr-2 h-4 w-4" />
                                                    Download
                                                </>
                                            )}
                                        </Button>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>

            <AdDisplay placement="above-footer" />

            {/* Auth dialog removed from public flow */}
        </Layout>
    );
}
