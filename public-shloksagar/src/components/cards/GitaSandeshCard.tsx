import { Calendar, BookOpen } from "lucide-react";

interface GitaSandeshCardProps {
  id: string;
  shlok: string;
  meaning: string;
  date: string;
  chapter?: number;
  verse?: number;
  adhyayName?: string;
  shlokName?: string;
}

export const GitaSandeshCard = ({
  shlok,
  meaning,
  date,
  chapter,
  verse,
  adhyayName,
  shlokName,
}: GitaSandeshCardProps) => {
  return (
    <article className="card-sacred overflow-hidden">
      <div className="flex flex-col gap-6">
        {/* Header with reference */}
        {(adhyayName || (chapter && chapter > 0) || shlokName) && (
          <div className="space-y-2">
            {adhyayName && (
              <div className="flex items-center gap-2 text-primary">
                <BookOpen className="w-5 h-5" />
                <span className="text-lg font-medium">{adhyayName}</span>
              </div>
            )}
            {(chapter && chapter > 0) && (
              <div className="text-sm text-muted-foreground ml-7">
                Chapter {chapter}{verse && verse > 0 ? `, Verse ${verse}` : ''}
              </div>
            )}
            {shlokName && (
              <div className="text-sm font-medium text-foreground ml-7">
                {shlokName}
              </div>
            )}
          </div>
        )}

        {/* Shlok Section */}
        <div className="bg-secondary/50 rounded-lg p-6 border-l-4 border-primary">
          <p className="shlok-text text-foreground font-devanagari whitespace-pre-line">{shlok}</p>
        </div>

        {/* Meaning */}
        <div>
          <h4 className="text-lg font-semibold text-foreground mb-2">Meaning:</h4>
          <p className="text-readable text-muted-foreground whitespace-pre-line">{meaning}</p>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 text-muted-foreground pt-4 border-t border-border">
          <Calendar className="w-5 h-5" />
          <time dateTime={date} className="text-base">
            {new Date(date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
        </div>
      </div>
    </article>
  );
};
