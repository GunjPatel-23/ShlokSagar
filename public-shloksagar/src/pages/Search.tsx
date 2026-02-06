import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Fuse from "fuse.js";
import { Layout } from "@/components/layout/Layout";
import { api } from "@/lib/api";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ExternalLink, FolderOpen, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Search = () => {
    const [searchParams] = useSearchParams();
    const q = searchParams.get("q") || "";
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<any[]>([]);

    useEffect(() => {
        if (!q || q.trim().length === 0) {
            setResults([]);
            return;
        }

        const doSearch = async () => {
            setLoading(true);
            try {
                const [categories, bhajan, aarti, chalisa, stotra] = await Promise.all([
                    api.categories.getAll(),
                    api.content.getByType("bhajan"),
                    api.content.getByType("aarti"),
                    api.content.getByType("chalisa"),
                    api.content.getByType("stotra"),
                ]);

                const list: any[] = [];

                // categories
                (categories || []).forEach((c: any) => {
                    list.push({
                        id: c.id,
                        type: "category",
                        title: c.name_en || c.name || "",
                        subtitle: c.name_hi || c.hindiName || "",
                        slug: c.slug,
                    });
                });

                // content
                const pushContent = (items: any[], t: string) => {
                    (items || []).forEach((it) => {
                        list.push({
                            id: it.id,
                            type: t,
                            title: it.title_en || it.title || "",
                            subtitle: it.title_hi || it.hindiTitle || "",
                            content: it.content_en || it.content || "",
                            slug: it.slug,
                        });
                    });
                };

                pushContent(bhajan, "bhajan");
                pushContent(aarti, "aarti");
                pushContent(chalisa, "chalisa");
                pushContent(stotra, "stotra");

                const fuse = new Fuse(list, {
                    keys: [
                        { name: "title", weight: 2 },
                        { name: "subtitle", weight: 1.5 },
                        { name: "content", weight: 1 }
                    ],
                    threshold: 0.4,
                    ignoreLocation: true,
                    minMatchCharLength: 2,
                });

                const res = fuse.search(q, { limit: 50 }).map((r) => r.item);
                setResults(res);
            } catch (err) {
                console.error("Search failed", err);
            } finally {
                setLoading(false);
            }
        };

        doSearch();
    }, [q]);

    return (
        <Layout>
            <section className="container-devotional py-8">
                <SectionHeader title={`Search results for "${q}"`} />

                {loading && <p className="text-muted-foreground">Searching…</p>}

                {!loading && results.length === 0 && q && (
                    <div className="py-12 text-center text-muted-foreground">
                        <p className="text-xl">No results found for "{q}"</p>
                        <p className="mt-2">Try different keywords or browse categories</p>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-4">
                    {results.map((r) => {
                        const isCategory = r.type === "category";
                        const Icon = isCategory ? FolderOpen : BookOpen;
                        const linkPath = isCategory ? `/categories/${r.slug}` : `/${r.type}/${r.slug}`;

                        return (
                            <Link
                                key={`${r.type}-${r.id}`}
                                to={linkPath}
                                className="group block p-6 border border-border rounded-xl hover:border-primary hover:bg-accent transition-all duration-200"
                            >
                                <div className="flex items-start gap-4">
                                    <Icon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                                                    {r.title}
                                                </h3>
                                                {r.subtitle && (
                                                    <p className="text-sm text-muted-foreground font-devanagari mt-1">
                                                        {r.subtitle}
                                                    </p>
                                                )}
                                            </div>
                                            <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="secondary" className="capitalize">
                                                {r.type}
                                            </Badge>
                                        </div>
                                        {r.content && (
                                            <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                                                {r.content.substring(0, 150)}...
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>
        </Layout>
    );
};

export default Search;
