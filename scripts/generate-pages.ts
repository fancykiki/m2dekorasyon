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
import { SERVICES, SITE, SERVICE_AREAS, CATALOG } from '../src/data/services';

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
  logo: `${SITE.origin}${SITE.logo}`,
  image: `${SITE.origin}${SITE.logo}`,
  telephone: SITE.phone,
  email: SITE.email,
  hasMap: SITE.maps,
  sameAs: [SITE.instagram, SITE.facebook],
  address: postalAddress,
  geo: { '@type': 'GeoCoordinates', latitude: SITE.lat, longitude: SITE.lng },
  areaServed: SERVICE_AREAS.map((a) => ({ '@type': 'Place', name: `${a}, ${SITE.city}` })),
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
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
  head?: string; // extra <head> lines (preloads, etc.)
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
    <meta name="google-site-verification" content="evjgVIfX3bECMBJ912XSnp0sybtoieafaXjtJF44N9s" />
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
    <link rel="icon" type="image/png" href="${SITE.logo}" />
    <link rel="apple-touch-icon" href="${SITE.logo}" />
${o.head ? o.head + '\n' : ''}${FONTS}
    <script type="application/ld+json">
${JSON.stringify(graph, null, 2)}
    </script>
    <!-- Google tag (gtag.js) & Google Ads -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=GT-PBKKBVV7"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GT-PBKKBVV7');
      gtag('config', 'AW-671846497');
    </script>
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-569Q63R9');</script>
    <!-- End Google Tag Manager -->
  </head>
  <body class="bg-[#F8F6F0] text-[#141517] selection:bg-[#E29415]/30 selection:text-[#141517] antialiased">
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-569Q63R9"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
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

/* ------------------------------------------------------- catalogue */
const catTitle = `${CATALOG.title} | Gergi Tavan & Duvar Kağıdı Desenleri – M2 Dekorasyon Antalya`;
const catDesc = `M2 Dekorasyon ${CATALOG.pages} sayfalık desen kataloğu: gergi tavan baskı desenleri ve duvar kağıdı koleksiyonu. Antalya'da yerinde ölçü, uygulama ve montaj.`;

written.push(
  write(
    'katalog/index.html',
    html({
      path: CATALOG.path,
      title: catTitle,
      description: catDesc,
      keywords: [
        'gergi tavan desenleri',
        'duvar kağıdı katalog',
        'antalya gergi tavan katalog',
        'desen kataloğu',
        'm2 dekorasyon katalog',
      ],
      image: '/katalog/page-001.webp',
      entry: '/src/entries/katalog.tsx',
      // Pages are lazy-loaded, but the first one should start downloading with
      // the HTML so the book is never blank.
      head: `    <link rel="preload" as="image" href="/katalog/page-001.webp" type="image/webp">`,
      schema: [
        {
          '@type': 'CollectionPage',
          '@id': `${SITE.origin}${CATALOG.path}#page`,
          url: `${SITE.origin}${CATALOG.path}`,
          name: catTitle,
          description: catDesc,
          inLanguage: 'tr-TR',
          isPartOf: { '@id': `${SITE.origin}/#website` },
          about: { '@id': `${SITE.origin}/#business` },
          numberOfItems: CATALOG.pages,
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Anasayfa', item: `${SITE.origin}/` },
            { '@type': 'ListItem', position: 2, name: CATALOG.title, item: `${SITE.origin}${CATALOG.path}` },
          ],
        },
      ],
    })
  )
);

/* ------------------------------------------------------- portfolio / projects */
const projTitle = 'Projelerimiz | M2 Dekorasyon Antalya İç Mimarlık & Gergi Tavan';
const projDesc =
  'Antalya genelinde tamamladığımız iç mimarlık, gergi tavan ve mekânsal dönüşüm uygulama projeleri. 15 seçkin proje ve 250+ fotoğraf.';

written.push(
  write(
    'projeler/index.html',
    html({
      path: '/projeler/',
      title: projTitle,
      description: projDesc,
      keywords: [
        'antalya dekorasyon projeleri',
        'antalya gergi tavan uygulama',
        'antalya iç mimarlık projeleri',
        'm2 dekorasyon projeler',
        'villa tadilat antalya',
      ],
      image: '/projeler/proje-1/01.jpg',
      entry: '/src/entries/projeler.tsx',
      head: `    <link rel="preload" as="image" href="/projeler/proje-1/01.jpg" type="image/jpeg">`,
      schema: [
        {
          '@type': 'CollectionPage',
          '@id': `${SITE.origin}/projeler/#page`,
          url: `${SITE.origin}/projeler/`,
          name: projTitle,
          description: projDesc,
          inLanguage: 'tr-TR',
          isPartOf: { '@id': `${SITE.origin}/#website` },
          about: { '@id': `${SITE.origin}/#business` },
          numberOfItems: 15,
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Anasayfa', item: `${SITE.origin}/` },
            { '@type': 'ListItem', position: 2, name: 'Projeler', item: `${SITE.origin}/projeler/` },
          ],
        },
      ],
    })
  )
);

/* ------------------------------------------------------- about us */
const aboutTitle = 'Hakkımızda | M2 Dekorasyon Antalya – Gergi Tavan & İç Mimarlık';
const aboutDesc =
  'M2 Dekorasyon Antalya: 15 yılı aşkın saha deneyimi, 1.200+ tamamlanan proje, B1 sertifikalı gergi tavan ve ithal duvar kağıdı uzmanlığı. Hikayemiz, tasarım dilimiz ve ilkelerimiz.';

written.push(
  write(
    'hakkimizda/index.html',
    html({
      path: '/hakkimizda/',
      title: aboutTitle,
      description: aboutDesc,
      keywords: [
        'm2 dekorasyon hakkında',
        'antalya dekorasyon firması',
        'antalya iç mimarlık',
        'metrekare dekorasyon antalya',
        'gergi tavan antalya',
      ],
      image: '/projeler/proje-1/01.jpg',
      entry: '/src/entries/hakkimizda.tsx',
      schema: [
        {
          '@type': 'AboutPage',
          '@id': `${SITE.origin}/hakkimizda/#page`,
          url: `${SITE.origin}/hakkimizda/`,
          name: aboutTitle,
          description: aboutDesc,
          inLanguage: 'tr-TR',
          isPartOf: { '@id': `${SITE.origin}/#website` },
          about: { '@id': `${SITE.origin}/#business` },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Anasayfa', item: `${SITE.origin}/` },
            { '@type': 'ListItem', position: 2, name: 'Hakkımızda', item: `${SITE.origin}/hakkimizda/` },
          ],
        },
      ],
    })
  )
);

/* ------------------------------------------------------- contact */
const contactTitle = 'İletişim & Adresimiz | M2 Dekorasyon Antalya – Telefon & Harita';
const contactDesc =
  'M2 Dekorasyon iletişim: Dutlubahçe, Muratpaşa/Antalya adresimiz, 0242 321 00 08, WhatsApp hattı ve harita konumu. Ücretsiz yerinde keşif randevusu alın.';

written.push(
  write(
    'iletisim/index.html',
    html({
      path: '/iletisim/',
      title: contactTitle,
      description: contactDesc,
      keywords: [
        'm2 dekorasyon iletişim',
        'm2 dekorasyon telefon',
        'm2 dekorasyon antalya adres',
        'dutlubahçe m2 dekorasyon',
        'antalya gergi tavan iletişim',
      ],
      image: '/logo.png',
      entry: '/src/entries/iletisim.tsx',
      schema: [
        {
          '@type': 'ContactPage',
          '@id': `${SITE.origin}/iletisim/#page`,
          url: `${SITE.origin}/iletisim/`,
          name: contactTitle,
          description: contactDesc,
          inLanguage: 'tr-TR',
          isPartOf: { '@id': `${SITE.origin}/#website` },
          about: { '@id': `${SITE.origin}/#business` },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Anasayfa', item: `${SITE.origin}/` },
            { '@type': 'ListItem', position: 2, name: 'İletişim', item: `${SITE.origin}/iletisim/` },
          ],
        },
      ],
    })
  )
);

/* ------------------------------------------------ sitemap + robots */
const today = new Date().toISOString().slice(0, 10);
const urls = [
  { loc: `${SITE.origin}/`, priority: '1.0', freq: 'weekly' },
  { loc: `${SITE.origin}/hizmetler/`, priority: '0.9', freq: 'monthly' },
  { loc: `${SITE.origin}/projeler/`, priority: '0.9', freq: 'monthly' },
  { loc: `${SITE.origin}${CATALOG.path}`, priority: '0.7', freq: 'yearly' },
  { loc: `${SITE.origin}/hakkimizda/`, priority: '0.8', freq: 'monthly' },
  { loc: `${SITE.origin}/iletisim/`, priority: '0.8', freq: 'monthly' },
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
