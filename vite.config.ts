import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { existsSync, globSync } from 'node:fs';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

/**
 * Multi-page app: every URL is a real HTML file so titles, meta descriptions,
 * Open Graph tags and JSON-LD ship in the source HTML instead of being applied
 * by JavaScript. The service pages under hizmetler/ are generated from
 * src/data/services.ts by scripts/generate-pages.ts (see the `generate:pages`
 * script, which runs automatically before dev and build).
 */
const pages = Object.fromEntries(
  [
    'index.html',
    ...globSync('hizmetler/**/index.html'),
    ...globSync('katalog/index.html'),
    ...globSync('projeler/**/index.html'),
    ...globSync('hakkimizda/**/index.html'),
    ...globSync('iletisim/**/index.html'),
  ].map((file) => [
    file === 'index.html' ? 'main' : path.dirname(file).replace(/[/\\]/g, '-'),
    path.resolve(__dirname, file),
  ])
);

/** Ensures local dev requests like `/projeler` redirect or rewrite to `/projeler/` */
function multiPageCleanUrls(): Plugin {
  return {
    name: 'multi-page-clean-urls',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const rawUrl = req.url?.split('?')[0] || '';
        if (rawUrl && !rawUrl.includes('.') && !rawUrl.endsWith('/')) {
          const targetHtml = path.resolve(__dirname, rawUrl.replace(/^\//, ''), 'index.html');
          if (existsSync(targetHtml)) {
            const query = req.url?.includes('?') ? '?' + req.url.split('?')[1] : '';
            res.writeHead(301, { Location: rawUrl + '/' + query });
            res.end();
            return;
          }
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), multiPageCleanUrls()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: pages,
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
