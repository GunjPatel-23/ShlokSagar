import { Calendar, Play } from "lucide-react";
import { useState } from "react";

interface FestivalCardProps {
  id: string;
  name: string;
  hindiName?: string;
  dateRange: string;
  description?: string;
  mediaUrl: string;
  mediaType: "image" | "video";
}

export const FestivalCard = ({
  id,
  name,
  hindiName,
  dateRange,
  description,
  mediaUrl,
  mediaType,
}: FestivalCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <article className="card-sacred overflow-hidden">
      {/* Media Section */}
      <div className="aspect-video relative overflow-hidden rounded-lg mb-4 bg-muted">
        {mediaType === "image" ? (
          <img
            src={mediaUrl}
            alt={name}
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
                  <span className="text-muted-foreground">Festival Video</span>
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

      {/* Content */}
      <div>
        <h3 className="text-2xl font-bold font-devanagari text-foreground">
          {name}
        </h3>
        {hindiName && (
          <p className="text-lg text-primary font-devanagari">{hindiName}</p>
        )}
        <div className="flex items-center gap-2 mt-3 text-muted-foreground">
          <Calendar className="w-5 h-5" />
          <span className="text-base">{dateRange}</span>
        </div>
        {description && (
          <p className="text-readable text-muted-foreground mt-3 line-clamp-3">
            {description}
          </p>
        )}
      </div>
    </article>
  );
};
