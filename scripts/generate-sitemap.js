import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://strengthfitness.london';

const routes = [
  '',
  '/about',
  '/memberships',
  '/trainers',
  '/programs',
  '/classes',
  '/blog',
  '/gallery',
  '/transformations',
  '/contact',
  '/faq',
  '/privacy',
  '/terms',
  '/auth'
];

const generateSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes.map(route => `
  <url>
    <loc>${BASE_URL}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
</urlset>`;

  const publicDir = path.resolve(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log('Sitemap generated in public/sitemap.xml');

  const robots = `User-agent: *
Allow: /
Sitemap: ${BASE_URL}/sitemap.xml

# Block sensitive routes
Disallow: /admin
Disallow: /dashboard
`;
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots);
  console.log('robots.txt generated in public/robots.txt');
};

generateSitemap();
