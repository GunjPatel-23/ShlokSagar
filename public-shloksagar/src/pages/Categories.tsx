import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import AdDisplay from "@/components/AdDisplay";
import SEOHead from "@/components/SEOHead";
import type { Category } from "@/types";

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await api.categories.getAll();
        // Map backend fields to frontend shape
        const mappedCats = (data || []).map((c: any) => ({
          id: c.id,
          name: c.name_en || c.name,
          hindiName: c.name_hi || '',
          image: c.image || c.image_url || '',
          itemCount: c.item_count || 0,
          slug: c.slug,
        }));
        setCategories(mappedCats);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
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
        title="भगवान श्रेणियाँ | Bhagwan Categories"
        description="हिंदू देवी-देवताओं के भजन, आरती, चालीसा और स्तोत्र का संग्रह। Explore devotional content for various Hindu deities."
        keywords="श्रेणियाँ, भगवान, देवी-देवता, categories, hindu gods, deities"
      />
      {/* Page Header */}
      <section className="py-12 bg-secondary/30">
        <div className="container-devotional">
          <h1 className="sr-only">Bhagwan Categories</h1>
          <SectionHeader
            title="Bhagwan Categories"
            subtitle="Select a deity to explore their sacred content"
          />
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12">
        <div className="container-devotional">
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
        </div>
      </section>

      {/* Ad Placement */}
      <AdDisplay placement="above-footer" />

      {/* Info Section */}
      <section className="py-12 bg-secondary/30">
        <div className="container-devotional">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Pure Text-Based Content
            </h2>
            <p className="text-readable text-muted-foreground">
              Each category contains Bhajans, Aartis, Chalisas, and Stotras in readable text format.
              Our content is designed for distraction-free reading and recitation,
              suitable for devotees of all ages.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Categories;
