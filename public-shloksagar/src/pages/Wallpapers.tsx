import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { WallpaperCard } from "@/components/cards/WallpaperCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import AdDisplay from "@/components/AdDisplay";
import SEOHead from "@/components/SEOHead";
import type { Wallpaper, Category } from "@/types";

const Wallpapers = () => {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [wallpapersData, categoriesData] = await Promise.all([
          api.wallpapers.getAll(),
          api.categories.getAll()
        ]);
        // Map database fields to component props
        const mappedWallpapers = (wallpapersData || []).map((w: any) => ({
          id: w.id,
          title: w.name || 'Wallpaper',
          imageUrl: w.image_url,
          category: Array.isArray(w.tags) && w.tags.length > 0 ? w.tags[0] : '',
          downloadUrl: w.image_url
        }));
        setWallpapers(mappedWallpapers);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredWallpapers = selectedCategory === "all"
    ? wallpapers
    : wallpapers.filter((w) => w.category.toLowerCase().includes(selectedCategory.toLowerCase()));

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
        title="भक्ति वॉलपेपर | Divine Wallpapers"
        description="हिंदू देवी-देवताओं के सुंदर वॉलपेपर डाउनलोड करें। Download beautiful devotional wallpapers for your devices."
        keywords="वॉलपेपर, wallpapers, hindu wallpapers, devotional wallpapers, god wallpapers"
      />
      {/* Page Header */}
      <section className="py-12 bg-secondary/30">
        <div className="container-devotional">
          <h1 className="sr-only">Divine Wallpapers</h1>
          <SectionHeader
            title="Divine Wallpapers"
            subtitle="Download beautiful devotional wallpapers for your devices"
          />
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b border-border">
        <div className="container-devotional">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-lg text-muted-foreground mr-2">Filter by:</span>
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
              className={selectedCategory === "all" ? "bg-primary text-primary-foreground" : ""}
            >
              All
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat.id)}
                className={selectedCategory === cat.id ? "bg-primary text-primary-foreground" : ""}
              >
                {cat.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Wallpapers Grid */}
      <section className="py-12">
        <div className="container-devotional">
          {filteredWallpapers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredWallpapers.map((wallpaper) => (
                <WallpaperCard
                  key={wallpaper.id}
                  id={wallpaper.id}
                  title={wallpaper.title}
                  imageUrl={wallpaper.imageUrl}
                  category={wallpaper.category}
                  downloadUrl={wallpaper.downloadUrl}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">
                No wallpapers found for this category.
              </p>
              <Button
                variant="outline"
                onClick={() => setSelectedCategory("all")}
                className="mt-4"
              >
                View All Wallpapers
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Ad Placement */}
      <AdDisplay placement="above-footer" />

      {/* Info Section */}
      <section className="py-12 bg-secondary/30">
        <div className="container-devotional">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-readable text-muted-foreground">
              All wallpapers are available for free download. Click on any wallpaper
              to reveal the download button. Perfect for your phone, tablet, or desktop.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Wallpapers;
