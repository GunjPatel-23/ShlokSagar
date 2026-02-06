import { Calendar, Play, Download } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { downloadResource } from '@/lib/download';

interface QuoteCardProps {
  id: string;
  text: string;
  mediaUrl: string;
  mediaType: "image" | "video";
  date: string;
}

export const QuoteCard = ({
  id,
  text,
  mediaUrl,
  mediaType,
  date,
}: QuoteCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setDownloading(true);
      // Best-effort analytics
      api.analytics.trackDownload(id, 'quote').catch(() => { });

      const ext = mediaType === 'video' ? '.mp4' : '.jpg';
      const filename = `quote-${id}${ext}`;
      await downloadResource(mediaUrl, filename);
      toast.success('Download started!');
    } catch (err) {
      console.error('Download failed:', err);
      toast.error('Failed to download.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <article className="card-sacred overflow-hidden">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Media Section */}
        <div className="w-full md:w-1/3 flex-shrink-0">
          <div className="aspect-square relative overflow-hidden rounded-lg bg-muted">
            {mediaType === "image" ? (
              <img
                src={mediaUrl}
                alt={text.substring(0, 50)}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="relative w-full h-full">
                {isPlaying ? (
                  <video
                    src={mediaUrl}
                    className="w-full h-full object-cover"
                    controls
                    muted
                    autoPlay={false}
                  />
                ) : (
                  <>
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground">Video</span>
                    </div>
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="absolute inset-0 flex items-center justify-center bg-foreground/30 hover:bg-foreground/40 transition-colors"
                      aria-label="Play video"
                    >
                      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg">
                        <Play className="w-6 h-6 text-primary-foreground ml-1" />
                      </div>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col justify-between">
          <blockquote className="text-xl md:text-2xl font-devanagari text-foreground leading-relaxed">
            "{text}"
          </blockquote>
          <div className="flex items-center gap-2 mt-4 text-muted-foreground justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <time dateTime={date} className="text-base">
                {new Date(date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </div>
            <div>
              <Button size="sm" variant="outline" onClick={handleDownload} disabled={downloading}>
                {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                <span className="ml-2">Download</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
