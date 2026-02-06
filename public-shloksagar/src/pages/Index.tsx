import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { QuoteCard } from "@/components/cards/QuoteCard";
import { GitaSandeshCard } from "@/components/cards/GitaSandeshCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Sparkles, Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import AdDisplay from "@/components/AdDisplay";
import SEOHead from "@/components/SEOHead";
import type { Category, Quote, GitaSandesh } from "@/types";

const Index = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [latestQuote, setLatestQuote] = useState<Quote | null>(null);
  const [latestGitaSandesh, setLatestGitaSandesh] = useState<GitaSandesh | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoriesData, quotesData, gitaSandeshDataArray] = await Promise.all([
          api.categories.getAll(),
          api.quotes.getAll(1),
          api.gitaSandesh.getAll(1)
        ]);

        // Map categories to frontend shape and include slug
        const mappedCats = (categoriesData || []).map((c: any) => ({
          id: c.id,
          name: c.name_en || c.name,
          hindiName: c.name_hi || c.name_hi || '',
          image: c.image || c.image_url || '',
          itemCount: c.item_count || 0,
          slug: c.slug,
        }));
        setCategories(mappedCats);

        // Map latest quote (first item from array)
        const quoteData = quotesData && quotesData.length > 0 ? quotesData[0] : null;
        if (quoteData) {
          setLatestQuote({
            id: quoteData.id,
            text: quoteData.content_en || quoteData.text || '',
            mediaUrl: quoteData.image_url || quoteData.video_url || '',
            mediaType: quoteData.image_url ? 'image' : (quoteData.video_url ? 'video' : 'image'),
            date: quoteData.date || quoteData.created_at,
          });
        } else {
          setLatestQuote(null);
        }

        // Map latest gita sandesh (first item from array)
        const gitaSandeshData = gitaSandeshDataArray && gitaSandeshDataArray.length > 0 ? gitaSandeshDataArray[0] : null;
        if (gitaSandeshData) {
          // attempt to split content_en into shlok and meaning
          const content = gitaSandeshData.content_en || '';
          const parts = content.split('\n\n');
          setLatestGitaSandesh({
            id: gitaSandeshData.id,
            shlok: parts[0] || '',
            meaning: parts.slice(1).join('\n\n') || '',
            mediaUrl: gitaSandeshData.image_url || gitaSandeshData.video_url || '',
            mediaType: gitaSandeshData.image_url ? 'image' : (gitaSandeshData.video_url ? 'video' : undefined),
            date: gitaSandeshData.date || gitaSandeshData.created_at,
            chapter: (gitaSandeshData as any).adhyay_number || undefined,
            verse: undefined,
            adhyayName: (gitaSandeshData as any).adhyay_name,
            shlokName: (gitaSandeshData as any).shlok_name,
          });
        } else {
          setLatestGitaSandesh(null);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Set empty data on error to avoid white screen
        setCategories([]);
        setLatestQuote(null);
        setLatestGitaSandesh(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
        title="श्लोकसागर - भक्ति साहित्य | भजन, आरती, चालीसा, गीता श्लोक"
        description="भजन, आरती, चालीसा, गीता श्लोक, प्रेरक विचार और भक्ति वॉलपेपर का संपूर्ण संग्रह। Discover Bhajans, Aartis, Chalisas, and sacred Shlokas."
        keywords="भजन, आरती, चालीसा, गीता श्लोक, भक्ति, हिंदू धर्म, bhajan, aarti, chalisa, gita shlok, hindu devotional"
      />
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-gold/5" />
        <div className="container-devotional relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Sacred Devotional Content</span>
            </div>
            <h1 className="text-foreground mb-6">
              Welcome to <span className="text-primary">ShlokSagar</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8 font-devanagari">
              श्लोक सागर में आपका स्वागत है
            </p>
            <p className="text-readable text-muted-foreground max-w-2xl mx-auto mb-10">
              Discover the timeless wisdom of Bhajans, Aartis, Chalisas, and sacred Shlokas.
              A clean, distraction-free platform designed for devotees of all ages.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/categories">
                <Button className="btn-saffron text-lg px-8 py-6 gap-2">
                  <BookOpen className="w-5 h-5" />
                  Explore Categories
                </Button>
              </Link>
              <Link to="/gita-sandesh">
                <Button variant="outline" className="text-lg px-8 py-6 gap-2 border-2">
                  Daily Gita Sandesh
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Placement */}
      <AdDisplay placement="between-sections" />

      {/* Bhagwan Categories Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container-devotional">
          <SectionHeader
            title="Bhagwan Categories"
            subtitle="Select a deity to explore their Bhajans, Aartis, Chalisas, and Shlokas"
          />
          {categories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  id={category.id}
                  slug={category.slug}
                  name={category.name}
                  hindiName={category.hindiName}
                  image={category.image}
                  itemCount={category.itemCount}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No categories available</p>
            </div>
          )}
          <div className="text-center mt-10">
            <Link to="/categories">
              <Button variant="outline" className="text-lg gap-2">
                View All Categories
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Quote Section */}
      <section className="py-16">
        <div className="container-devotional">
          <SectionHeader
            title="Latest Quote"
            subtitle="Daily inspiration from our sacred scriptures"
          />
          {latestQuote ? (
            <div className="max-w-4xl mx-auto">
              <QuoteCard
                id={latestQuote.id}
                text={latestQuote.text}
                mediaUrl={latestQuote.mediaUrl}
                mediaType={latestQuote.mediaType}
                date={latestQuote.date}
              />
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No quote available today</p>
            </div>
          )}
          <div className="text-center mt-8">
            <Link to="/quotes">
              <Button variant="outline" className="text-lg gap-2">
                View All Quotes
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Gita Sandesh Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container-devotional">
          <SectionHeader
            title="Latest Gita Sandesh"
            subtitle="Daily wisdom from Shrimad Bhagavad Gita"
          />
          {latestGitaSandesh ? (
            <div className="max-w-4xl mx-auto">
              <GitaSandeshCard
                id={latestGitaSandesh.id}
                shlok={latestGitaSandesh.shlok}
                meaning={latestGitaSandesh.meaning}
                date={latestGitaSandesh.date}
                chapter={latestGitaSandesh.chapter}
                verse={latestGitaSandesh.verse}
                adhyayName={latestGitaSandesh.adhyayName}
                shlokName={latestGitaSandesh.shlokName}
              />
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No Gita Sandesh available today</p>
            </div>
          )}
          <div className="text-center mt-8">
            <Link to="/gita-sandesh">
              <Button variant="outline" className="text-lg gap-2">
                View All Gita Sandesh
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container-devotional">
          <div className="bg-gradient-to-r from-primary/10 via-gold/10 to-primary/10 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Begin Your Spiritual Journey
            </h2>
            <p className="text-readable text-muted-foreground max-w-2xl mx-auto mb-8">
              Explore our collection of sacred texts, devotional wallpapers, and festival celebrations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/wallpapers">
                <Button className="btn-saffron text-lg px-6 py-5">
                  Download Wallpapers
                </Button>
              </Link>
              <Link to="/festivals">
                <Button variant="outline" className="text-lg px-6 py-5">
                  Upcoming Festivals
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
