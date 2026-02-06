import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { QuoteCard } from "@/components/cards/QuoteCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import AdDisplay from "@/components/AdDisplay";
import SEOHead from "@/components/SEOHead";
import type { Quote } from "@/types";

const Quotes = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setLoading(true);
        const data = await api.quotes.getAll();
        // Map backend shape to frontend Quote type
        const mapped = (data || []).map((q: any) => ({
          id: q.id,
          text: q.content_en || q.text || '',
          mediaUrl: q.image_url || q.video_url || '',
          mediaType: q.image_url ? 'image' : (q.video_url ? 'video' : 'image'),
          date: q.date || q.created_at,
        }));
        setQuotes(mapped);
      } catch (error) {
        console.error('Error fetching quotes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuotes();
  }, []);

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
        title="दैनिक प्रेरक विचार | Daily Quotes"
        description="पवित्र ग्रंथों से प्रेरक विचार। Inspirational quotes from sacred Hindu scriptures."
        keywords="प्रेरक विचार, quotes, daily quotes, inspirational quotes, hindu wisdom"
      />
      {/* Page Header */}
      <section className="py-12 bg-secondary/30">
        <div className="container-devotional">
          <h1 className="sr-only">Daily Quotes</h1>
          <SectionHeader
            title="Daily Quotes"
            subtitle="Inspirational wisdom from our sacred scriptures"
          />
        </div>
      </section>

      {/* Quotes List */}
      <section className="py-12">
        <div className="container-devotional">
          {quotes.length > 0 ? (
            <div className="max-w-4xl mx-auto space-y-8">
              {quotes.map((quote, index) => (
                <div key={quote.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  {index === 0 && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
                      <span className="text-sm font-medium">Latest Quote</span>
                    </div>
                  )}
                  <QuoteCard
                    id={quote.id}
                    text={quote.text}
                    mediaUrl={quote.mediaUrl}
                    mediaType={quote.mediaType}
                    date={quote.date}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">No quotes available</p>
            </div>
          )}
        </div>
      </section>

      {/* Ad Placement */}
      <AdDisplay placement="between-sections" />

      {/* Info Section */}
      <section className="py-12 bg-secondary/30">
        <div className="container-devotional">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-readable text-muted-foreground">
              New quotes are added daily. Each quote is accompanied by a relevant image
              to enhance your spiritual experience. Check back regularly for fresh inspiration.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Quotes;
