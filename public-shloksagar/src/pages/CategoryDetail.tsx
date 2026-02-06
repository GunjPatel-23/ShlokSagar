import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { ContentTabs } from "@/components/content/ContentTabs";
import { ArrowLeft, Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import type { Category, Content } from "@/types";

const CategoryDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        const categoryData = await api.categories.getBySlug(slug);
        setCategory(categoryData);

        // Fetch content for all types
        const [bhajan, aarti, chalisa, stotra] = await Promise.all([
          api.content.getByCategorySlug(slug, 'bhajan'),
          api.content.getByCategorySlug(slug, 'aarti'),
          api.content.getByCategorySlug(slug, 'chalisa'),
          api.content.getByCategorySlug(slug, 'stotra')
        ]);

        setContent({ bhajan, aarti, chalisa, stotra });
      } catch (error) {
        console.error('Error fetching category data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!category) {
    return (
      <Layout>
        <div className="container-devotional py-16 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Category Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The category you're looking for doesn't exist.
          </p>
          <Link to="/categories">
            <Button className="btn-saffron">Back to Categories</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const renderContentList = (items: any[], contentType: string) => {
    if (!items || items.length === 0) {
      return (
        <div className="text-center py-12 bg-secondary/30 rounded-xl">
          <p className="text-xl text-muted-foreground">Content coming soon...</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <Link
            key={item.id}
            to={`/${contentType}/${item.slug}`}
            className="group block bg-card hover:bg-primary/5 rounded-xl border border-border hover:border-primary hover:shadow-md transition-all duration-200 p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                  {item.title_en || item.title_hi || item.title_gu || 'Untitled'}
                </h3>
                {(item.title_hi || item.title_gu) && (
                  <p className="text-sm text-muted-foreground group-hover:text-foreground font-devanagari transition-colors">
                    {item.title_hi || item.title_gu}
                  </p>
                )}
              </div>
              <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
            </div>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <Layout>
      {/* Hero Section with Category Image */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="container-devotional">
            <Link
              to="/categories"
              className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Categories
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground font-devanagari">
              {category.name}
            </h1>
            <p className="text-2xl text-primary-foreground/80 font-devanagari mt-2">
              {category.hindiName}
            </p>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-6 bg-secondary/50 border-b border-border">
        <div className="container-devotional">
          <p className="text-lg text-center text-muted-foreground">
            Click on any title below to read the full content
          </p>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="py-8 md:py-12">
        <div className="container-devotional">
          {content && (
            <ContentTabs
              bhajan={renderContentList(content.bhajan, 'bhajan')}
              aarti={renderContentList(content.aarti, 'aarti')}
              chalisa={renderContentList(content.chalisa, 'chalisa')}
              stotra={renderContentList(content.stotra, 'stotra')}
            />
          )}
        </div>
      </section>
    </Layout>
  );
};

export default CategoryDetail;
