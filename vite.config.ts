import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { globSync } from 'node:fs';
import path from 'path';
import {defineConfig} from 'vite';

/**
 * Multi-page app: every URL is a real HTML file so titles, meta descriptions,
 * Open Graph tags and JSON-LD ship in the source HTML instead of being applied
 * by JavaScript. The service pages under hizmetler/ are generated from
 * src/data/services.ts by scripts/generate-pages.ts (see the `generate:pages`
 * script, which runs automatically before dev and build).
 */
const pages = Object.fromEntries(
  ['index.html', ...globSync('hizmetler/**/index.html')].map((file) => [
    file === 'index.html' ? 'main' : path.dirname(file).replace(/[/\\]/g, '-'),
    path.resolve(__dirname, file),
  ])
);

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
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
