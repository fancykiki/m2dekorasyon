/**
 * Turns the catalogue PDF into web page images.
 *
 *   bun run catalog:build
 *
 * Why images instead of shipping the PDF:
 *  - the PDF itself never reaches public/, so there is no file to download and
 *    no direct link to share; the flipbook shows rendered pages only
 *  - no pdf.js in the browser bundle (~400 kB saved) and no 7 MB download
 *  - pages are webp and lazy-loaded, so opening the catalogue costs a couple
 *    of hundred kB instead of the whole document
 *
 * Source PDF lives outside public/ (see CATALOG_SRC). Re-run this after
 * replacing it.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createCanvas } from '@napi-rs/canvas';
import sharp from 'sharp';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CATALOG_SRC = path.join(ROOT, 'assets-src', 'm2dekorasyon.pdf');
const OUT = path.join(ROOT, 'public', 'katalog');

const WIDTH = 1200; // long edge of a rendered page (~2x the on-screen size)
const QUALITY = 74;
const THUMB_WIDTH = 220;

if (!fs.existsSync(CATALOG_SRC)) {
  console.error(`Catalogue PDF not found at ${path.relative(ROOT, CATALOG_SRC)}`);
  console.error('Put the source PDF there (it is deliberately kept out of public/).');
  process.exit(1);
}

const run = async () => {
  const data = new Uint8Array(fs.readFileSync(CATALOG_SRC));
  const doc = await pdfjs.getDocument({ data, useSystemFonts: true }).promise;
  const total = doc.numPages;

  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(path.join(OUT, 'thumb'), { recursive: true });

  let bytes = 0;
  let firstSize = { w: 0, h: 0 };

  for (let i = 1; i <= total; i++) {
    const page = await doc.getPage(i);
    const base = page.getViewport({ scale: 1 });
    const scale = WIDTH / base.width;
    const vp = page.getViewport({ scale });
    const canvas = createCanvas(Math.round(vp.width), Math.round(vp.height));
    const ctx = canvas.getContext('2d');
    // white behind the page: catalogue art assumes paper, not the dark site
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvas: canvas as never, canvasContext: ctx as never, viewport: vp }).promise;

    if (i === 1) firstSize = { w: canvas.width, h: canvas.height };

    const png = canvas.toBuffer('image/png');
    const n = String(i).padStart(3, '0');

    const out = path.join(OUT, `page-${n}.webp`);
    await sharp(png).webp({ quality: QUALITY, effort: 5 }).toFile(out);
    bytes += fs.statSync(out).size;

    await sharp(png)
      .resize(THUMB_WIDTH)
      .webp({ quality: 62, effort: 5 })
      .toFile(path.join(OUT, 'thumb', `page-${n}.webp`));

    page.cleanup();
    if (i % 10 === 0 || i === total) console.log(`  ${i}/${total}`);
  }

  const meta = {
    pages: total,
    width: firstSize.w,
    height: firstSize.h,
    aspect: +(firstSize.w / firstSize.h).toFixed(4),
    generated: new Date().toISOString().slice(0, 10),
  };
  fs.writeFileSync(path.join(OUT, 'meta.json'), JSON.stringify(meta, null, 2));

  console.log(
    `\n${total} pages -> public/katalog/  (${(bytes / 1048576).toFixed(2)} MB, ${meta.width}x${meta.height})`
  );
};

run();
