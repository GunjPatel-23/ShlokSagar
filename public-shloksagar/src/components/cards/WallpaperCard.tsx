import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { downloadResource } from '@/lib/download';

interface WallpaperCardProps {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  downloadUrl: string;
}

export const WallpaperCard = ({
  id,
  title,
  imageUrl,
  category,
  downloadUrl,
}: WallpaperCardProps) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setDownloading(true);


      // Best-effort analytics tracking
      api.analytics.trackDownload(id, 'wallpaper').catch(() => { });

      const filename = `${title.replace(/\s+/g, "-").toLowerCase()}.jpg`;
      await downloadResource(downloadUrl, filename);

      toast.success('Download started!');
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Failed to download. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <article className="card-sacred overflow-hidden p-0 group">
        <div className="aspect-[3/4] relative overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <Button
              onClick={handleDownload}
              disabled={downloading}
              className="w-full btn-saffron gap-2"
            >
              <Download className="w-5 h-5" />
              {downloading ? 'Downloading...' : 'Download'}
            </Button>
          </div>
        </div>
        <div className="p-4">
          <span className="text-sm text-primary font-medium">{category}</span>
          <h3 className="text-lg font-semibold text-foreground mt-1 line-clamp-2">
            {title}
          </h3>
        </div>
      </article>

      {/* Auth dialog removed — downloads available anonymously */}
    </>
  );
};
