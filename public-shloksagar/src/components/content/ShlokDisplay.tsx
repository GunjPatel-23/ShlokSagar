interface ShlokDisplayProps {
  title: string;
  hindiTitle?: string;
  content: string[];
  source?: string;
}

export const ShlokDisplay = ({
  title,
  hindiTitle,
  content,
  source,
}: ShlokDisplayProps) => {
  return (
    <article className="bg-card rounded-xl border border-border overflow-hidden">
      {/* Header */}
      <div className="bg-secondary/50 px-6 py-4 border-b border-border">
        <h3 className="text-2xl font-bold font-devanagari text-foreground">
          {title}
        </h3>
        {hindiTitle && (
          <p className="text-lg text-primary font-devanagari">{hindiTitle}</p>
        )}
      </div>

      {/* Content - Pure text, distraction-free */}
      <div className="p-6 md:p-8">
        <div className="space-y-6">
          {content.map((paragraph, index) => (
            <p
              key={index}
              className="shlok-text text-foreground whitespace-pre-line"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Source (if any) */}
      {source && (
        <div className="px-6 py-4 border-t border-border bg-muted/30">
          <p className="text-sm text-muted-foreground">Source: {source}</p>
        </div>
      )}
    </article>
  );
};
