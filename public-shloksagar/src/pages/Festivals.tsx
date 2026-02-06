import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { useLanguage } from '@/contexts/LanguageContext';
import { Loader2, Download } from "lucide-react";
import { api } from "@/lib/api";
import AdDisplay from "@/components/AdDisplay";
// Auth dialog removed from public flow; downloads are open
import SEOHead from "@/components/SEOHead";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface FestivalPost {
  id: string;
  title_en: string;
  title_hi: string;
  title_gu: string;
  description_en?: string;
  description_hi?: string;
  description_gu?: string;
  video_url: string;
  thumbnail_url: string;
  created_at: string;
}

const Festivals = () => {
  const { getContent } = useLanguage();
  const [posts, setPosts] = useState<FestivalPost[]>([]);
  const [loading, setLoading] = useState(true);
  // auth dialog removed; downloads are open
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        await api.analytics.trackPageView('/festivals');
        const data = await api.videos.getAll();
        setPosts(data || []);
      } catch (error) {
        console.error('Error fetching festival posts:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleMediaClick = (postId: string, isVideo: boolean) => {
    if (isVideo) {
      const videoElement = document.getElementById(`video-${postId}`) as HTMLVideoElement;
      if (videoElement) {
        if (videoElement.paused) {
          videoElement.play();
          setPlayingId(postId);
        } else {
          videoElement.pause();
          setPlayingId(null);
        }
      }
    }
  };

  const handleDownload = async (post: FestivalPost) => {
    try {
      setDownloadingId(post.id);

      // Use direct media URL so downloads are available without auth
      const downloadUrl = post.video_url || post.thumbnail_url;

      // Best-effort analytics tracking
      api.analytics.trackDownload(post.id, 'festival-post').catch(() => { });

      // Create download link
      const filename = `festival-${post.id}${downloadUrl.match(/\.(mp4|webm|ogg|jpg|jpeg|png)$/i)?.[0] || ''}`;
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
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <SEOHead
        title="Festival Posts & Wishes | त्यौहार की शुभकामनाएं"
        description="Download beautiful festival greeting images and videos for sharing wishes on WhatsApp, Instagram, and Facebook."
        keywords="festival wishes, festival greetings, hindu festival images, festival videos, त्यौहार की शुभकामनाएं"
      />

      {/* Page Header */}
      <section className="py-12 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Festival Posts & Wishes
            </h1>
            <p className="text-lg text-gray-600">
              Download beautiful images and videos to share festival greetings with your loved ones
            </p>
          </div>
        </div>
      </section>

      {/* Festival Posts Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => {
                const isVideo = post.video_url?.match(/\.(mp4|webm|ogg|mov)$/i);
                const mediaUrl = post.video_url || post.thumbnail_url;
                const title = getContent(post, 'title');
                const description = getContent(post, 'description');

                return (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square relative">
                      {isVideo ? (
                        <video
                          id={`video-${post.id}`}
                          src={mediaUrl}
                          className="w-full h-full object-cover cursor-pointer"
                          onContextMenu={(e) => e.preventDefault()}
                          onClick={() => handleMediaClick(post.id, true)}
                          controls
                          loop
                          playsInline
                        />
                      ) : (
                        <img
                          src={mediaUrl}
                          alt={title}
                          className="w-full h-full object-cover"
                          onContextMenu={(e) => e.preventDefault()}
                        />
                      )}
                    </div>

                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg text-gray-900 mb-1">
                            {title}
                          </h3>
                          {description && (
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {description}
                            </p>
                          )}
                        </div>
                        <Button
                          onClick={() => handleDownload(post)}
                          disabled={downloadingId === post.id}
                          size="sm"
                          className="bg-orange-600 hover:bg-orange-700 shrink-0"
                        >
                          {downloadingId === post.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Download className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No festival posts available yet</p>
              <p className="text-sm text-gray-500 mt-2">Check back soon for new festival greetings!</p>
            </div>
          )}
        </div>
      </section>

      {/* Ad Placement */}
      <AdDisplay placement="above-footer" />

      {/* Auth dialog removed from public flow */}

      {/* Info Section */}
      <section className="py-12 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Share Festival Joy
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Download high-quality festival greeting images and videos to share with family and friends.
              Perfect for WhatsApp status, Instagram stories, and Facebook posts. Celebrate every festival
              with beautiful, devotional content.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Festivals;
