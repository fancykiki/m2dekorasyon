/**
 * Generates the static HTML shell of every page from src/data/services.ts,
 * plus sitemap.xml and robots.txt.
 *
 * The site is a Vite multi-page app: each URL is a real HTML file, so the
 * title, description, Open Graph tags and JSON-LD are present in the source
 * HTML. Search engines and WhatsApp/Facebook previews never have to run JS.
 *
 *   bun run generate:pages      (also runs automatically before build/dev)
 *
 * Output (git-ignored, rebuilt on demand):
 *   hizmetler/index.html
 *   hizmetler/<slug>/index.html
 *   public/sitemap.xml
 *   public/robots.txt
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SERVICES, SITE, SERVICE_AREAS } from '../src/data/services';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const FONTS = `    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet">`;

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: SITE.street,
  addressLocality: SITE.district,
  addressRegion: SITE.city,
  postalCode: SITE.postalCode,
  addressCountry: 'TR',
};

const localBusiness = {
  '@type': 'HomeAndConstructionBusiness',
  '@id': `${SITE.origin}/#business`,
  name: SITE.name,
  url: `${SITE.origin}/`,
  telephone: SITE.phone,
  email: SITE.email,
  address: postalAddress,
  geo: { '@type': 'GeoCoordinates', latitude: SITE.lat, longitude: SITE.lng },
  areaServed: SERVICE_AREAS.map((a) => ({ '@type': 'Place', name: `${a}, ${SITE.city}` })),
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00',
    },
  ],
  priceRange: '$$$',
};

interface PageOpts {
  path: string; // '/hizmetler/gergi-tavan/'
  title: string;
  description: string;
  keywords?: string[];
  image: string;
  entry: string; // '/src/entries/service.tsx'
  rootAttrs?: string;
  schema: object[];
}

/** Social crawlers need absolute image URLs — relative paths are dropped. */
const absolute = (src: string) => (src.startsWith('http') ? src : `${SITE.origin}${src}`);

const html = (o: PageOpts) => {
  const url = `${SITE.origin}${o.path}`;
  const image = absolute(o.image);
  const graph = { '@context': 'https://schema.org', '@graph': [localBusiness, ...o.schema] };
  return `<!doctype html>
<html lang="tr" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover" />
    <title>${esc(o.title)}</title>
    <meta name="description" content="${esc(o.description)}" />
${o.keywords?.length ? `    <meta name="keywords" content="${esc(o.keywords.join(', '))}" />\n` : ''}    <link rel="canonical" href="${url}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
    <meta name="author" content="${esc(SITE.name)}" />
    <meta name="geo.region" content="TR-07" />
    <meta name="geo.placename" content="${esc(SITE.city)}" />
    <meta name="geo.position" content="${SITE.lat};${SITE.lng}" />
    <meta name="ICBM" content="${SITE.lat}, ${SITE.lng}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${esc(SITE.name)}" />
    <meta property="og:locale" content="tr_TR" />
    <meta property="og:title" content="${esc(o.title)}" />
    <meta property="og:description" content="${esc(o.description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${esc(image)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(o.title)}" />
    <meta name="twitter:description" content="${esc(o.description)}" />
    <meta name="twitter:image" content="${esc(image)}" />
${FONTS}
    <script type="application/ld+json">
${JSON.stringify(graph, null, 2)}
    </script>
  </head>
  <body class="bg-[#0c0d0e] text-[#e5e5e7] selection:bg-[#c8a97e] selection:text-[#0c0d0e] antialiased">
    <div id="root"${o.rootAttrs ?? ''}></div>
    <script type="module" src="${o.entry}"></script>
  </body>
</html>
`;
};

const write = (rel: string, content: string) => {
  const full = resolve(ROOT, rel);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content);
  return rel;
};

const written: string[] = [];

/* ------------------------------------------------------ services hub */
const hubTitle = 'Hizmetlerimiz | Antalya İç Mekân Yenileme – M2 Dekorasyon';
const hubDesc =
  'Antalya’da gergi tavan, duvar kağıdı, mutfak ve banyo dekorasyonu, mimari projelendirme ve uygulama. Ölçüden montaja tek elden, ücretsiz keşif.';

written.push(
  write(
    'hizmetler/index.html',
    html({
      path: '/hizmetler/',
      title: hubTitle,
      description: hubDesc,
      keywords: ['antalya dekorasyon', 'antalya iç mimarlık', 'antalya tadilat', 'antalya gergi tavan'],
      image: SERVICES[0].heroImage,
      entry: '/src/entries/hizmetler.tsx',
      schema: [
        {
          '@type': 'CollectionPage',
          '@id': `${SITE.origin}/hizmetler/#page`,
          url: `${SITE.origin}/hizmetler/`,
          name: hubTitle,
          description: hubDesc,
          isPartOf: { '@id': `${SITE.origin}/#website` },
          about: { '@id': `${SITE.origin}/#business` },
          hasPart: SERVICES.map((s) => ({
            '@type': 'Service',
            name: s.h1,
            url: `${SITE.origin}/hizmetler/${s.slug}/`,
          })),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Anasayfa', item: `${SITE.origin}/` },
            { '@type': 'ListItem', position: 2, name: 'Hizmetler', item: `${SITE.origin}/hizmetler/` },
          ],
        },
      ],
    })
  )
);

/* --------------------------------------------------- service details */
for (const s of SERVICES) {
  const path = `/hizmetler/${s.slug}/`;
  written.push(
    write(
      `hizmetler/${s.slug}/index.html`,
      html({
        path,
        title: s.seoTitle,
        description: s.seoDescription,
        keywords: s.keywords,
        image: s.heroImage,
        entry: '/src/entries/service.tsx',
        rootAttrs: ` data-service="${s.slug}"`,
        schema: [
          {
            '@type': 'Service',
            '@id': `${SITE.origin}${path}#service`,
            name: s.h1,
            serviceType: s.nav,
            description: s.seoDescription,
            url: `${SITE.origin}${path}`,
            image: absolute(s.heroImage),
            provider: { '@id': `${SITE.origin}/#business` },
            areaServed: SERVICE_AREAS.map((a) => ({ '@type': 'Place', name: `${a}, ${SITE.city}` })),
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: `${s.nav} kapsamı`,
              itemListElement: s.features.map((f) => ({
                '@type': 'Offer',
                itemOffered: { '@type': 'Service', name: f },
              })),
            },
          },
          {
            '@type': 'FAQPage',
            '@id': `${SITE.origin}${path}#faq`,
            mainEntity: s.faq.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Anasayfa', item: `${SITE.origin}/` },
              { '@type': 'ListItem', position: 2, name: 'Hizmetler', item: `${SITE.origin}/hizmetler/` },
              { '@type': 'ListItem', position: 3, name: s.nav, item: `${SITE.origin}${path}` },
            ],
          },
        ],
      })
    )
  );
}

/* ------------------------------------------------ sitemap + robots */
const today = new Date().toISOString().slice(0, 10);
const urls = [
  { loc: `${SITE.origin}/`, priority: '1.0', freq: 'weekly' },
  { loc: `${SITE.origin}/hizmetler/`, priority: '0.9', freq: 'monthly' },
  ...SERVICES.map((s) => ({
    loc: `${SITE.origin}/hizmetler/${s.slug}/`,
    priority: '0.8',
    freq: 'monthly',
  })),
];

written.push(
  write(
    'public/sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.freq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
  )
  .join('\n')}
</urlset>
`
  )
);

written.push(
  write(
    'public/robots.txt',
    `User-agent: *
Allow: /

Sitemap: ${SITE.origin}/sitemap.xml
`
  )
);

console.log(`generated ${written.length} file(s):`);
for (const w of written) console.log('  ' + w);
