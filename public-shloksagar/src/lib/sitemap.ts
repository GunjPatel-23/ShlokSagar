export function generateSitemap(
    categories: Array<{ slug: string; updated_at: string }>,
    content: Array<{ slug: string; content_type: string; updated_at: string }>,
    gitaShloks: Array<{ slug: string; updated_at: string }>,
    quotes: Array<{ date: string }>,
    gitaSandesh: Array<{ date: string }>
): string {
    const baseUrl = import.meta.env.VITE_APP_URL || 'https://shloksagar.com';
    const now = new Date().toISOString();

    const urls = [
        // Static pages
        `  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`,
        `  <url>
    <loc>${baseUrl}/categories</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`,
        `  <url>
    <loc>${baseUrl}/gita-shlok</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`,
        `  <url>
    <loc>${baseUrl}/quotes</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`,
        `  <url>
    <loc>${baseUrl}/gita-sandesh</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`,
        `  <url>
    <loc>${baseUrl}/wallpapers</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`,
        `  <url>
    <loc>${baseUrl}/videos</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`,

        // Category pages
        ...categories.map(cat => `  <url>
    <loc>${baseUrl}/categories/${cat.slug}</loc>
    <lastmod>${cat.updated_at}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`),

        // Content pages
        ...content.map(item => `  <url>
    <loc>${baseUrl}/${item.content_type}/${item.slug}</loc>
    <lastmod>${item.updated_at}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`),

        // Gita Shlok pages
        ...gitaShloks.map(shlok => `  <url>
    <loc>${baseUrl}/gita-shlok/${shlok.slug}</loc>
    <lastmod>${shlok.updated_at}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`)
    ];

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`;
}

export function generateRobotsTxt(): string {
    const baseUrl = import.meta.env.VITE_APP_URL || 'https://shloksagar.com';

    return `User-agent: *
Allow: /
Disallow: /admin/

Sitemap: ${baseUrl}/sitemap.xml`;
}
