import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { GitaSandeshCard } from "@/components/cards/GitaSandeshCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import AdDisplay from "@/components/AdDisplay";
import SEOHead from "@/components/SEOHead";
import type { GitaSandesh } from "@/types";

const GitaSandesh = () => {
  const [gitaSandesh, setGitaSandesh] = useState<GitaSandesh[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitaSandesh = async () => {
      try {
        setLoading(true);
        const rawData = await api.gitaSandesh.getAll();
        // Map backend fields to frontend shape
        const mappedData = (rawData || []).map((item: any) => {
          const content = item.content_en || '';
          const parts = content.split('\n\n');
          return {
            id: item.id,
            shlok: parts[0] || '',
            meaning: parts.slice(1).join('\n\n') || '',
            mediaUrl: item.image_url || item.video_url || '',
            mediaType: item.image_url ? 'image' : (item.video_url ? 'video' : undefined),
            date: item.date || item.created_at,
            chapter: item.adhyay_number || undefined,
            verse: undefined,
            adhyayName: item.adhyay_name,
            shlokName: item.shlok_name,
          };
        });
        setGitaSandesh(mappedData);
      } catch (error) {
        console.error('Error fetching Gita Sandesh:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGitaSandesh();
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
        title="गीता संदेश | Gita Sandesh - Daily Bhagavad Gita Wisdom"
        description="श्रीमद् भगवद गीता से दैनिक ज्ञान। Daily wisdom from the Bhagavad Gita with meanings and explanations."
        keywords="गीता संदेश, भगवद गीता, gita sandesh, bhagavad gita, daily gita, krishna"
      />
      {/* Page Header */}
      <section className="py-12 bg-secondary/30">
        <div className="container-devotional">
          <h1 className="sr-only">Gita Sandesh</h1>
          <SectionHeader
            title="Gita Sandesh"
            subtitle="Daily wisdom from the Shrimad Bhagavad Gita"
          />
          <p className="text-center text-readable text-muted-foreground max-w-2xl mx-auto">
            The Bhagavad Gita, often referred to as the Gita, is a 700-verse Hindu scripture
            that is part of the epic Mahabharata. It contains the dialogue between
            Lord Krishna and Prince Arjuna.
          </p>
        </div>
      </section>

      {/* Gita Sandesh List */}
      <section className="py-12">
        <div className="container-devotional">
          {gitaSandesh.length > 0 ? (
            <div className="max-w-4xl mx-auto space-y-8">
              {gitaSandesh.map((sandesh, index) => (
                <div key={sandesh.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  {index === 0 && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
                      <span className="text-sm font-medium">Today's Sandesh</span>
                    </div>
                  )}
                  <GitaSandeshCard
                    id={sandesh.id}
                    shlok={sandesh.shlok}
                    meaning={sandesh.meaning}
                    date={sandesh.date}
                    chapter={sandesh.chapter}
                    verse={sandesh.verse}
                    adhyayName={sandesh.adhyayName}
                    shlokName={sandesh.shlokName}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">No Gita Sandesh available</p>
            </div>
          )}
        </div>
      </section>

      {/* Ad Placement */}
      <AdDisplay placement="between-sections" />
    </Layout>
  );
};

export default GitaSandesh;
