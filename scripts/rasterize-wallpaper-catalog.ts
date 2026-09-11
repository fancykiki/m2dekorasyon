import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createCanvas } from '@napi-rs/canvas';
import sharp from 'sharp';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PDF_SRC = path.join(ROOT, 'public', 'hizmetler, fotoğraflar', 'Duvar Kağıdı', 'Duvar Kağıdı 1.pdf');
const OUT = path.join(ROOT, 'public', 'duvar-kagidi-katalog');

const WIDTH = 1200;
const QUALITY = 76;
const THUMB_WIDTH = 260;

const run = async () => {
  if (!fs.existsSync(PDF_SRC)) {
    console.error(`PDF not found: ${PDF_SRC}`);
    process.exit(1);
  }

  const data = new Uint8Array(fs.readFileSync(PDF_SRC));
  const doc = await pdfjs.getDocument({ data, useSystemFonts: true }).promise;
  const total = doc.numPages;

  console.log(`Starting rasterization of ${total} pages from ${path.basename(PDF_SRC)}...`);
  fs.mkdirSync(path.join(OUT, 'thumb'), { recursive: true });

  let firstSize = { w: 0, h: 0 };
  let totalBytes = 0;

  for (let i = 1; i <= total; i++) {
    const page = await doc.getPage(i);
    const base = page.getViewport({ scale: 1 });
    const scale = WIDTH / base.width;
    const vp = page.getViewport({ scale });
    const canvas = createCanvas(Math.round(vp.width), Math.round(vp.height));
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvas: canvas as never, canvasContext: ctx as never, viewport: vp }).promise;

    if (i === 1) firstSize = { w: canvas.width, h: canvas.height };

    const png = canvas.toBuffer('image/png');
    const n = String(i).padStart(3, '0');

    const outPath = path.join(OUT, `page-${n}.webp`);
    await sharp(png).webp({ quality: QUALITY, effort: 4 }).toFile(outPath);
    totalBytes += fs.statSync(outPath).size;

    await sharp(png)
      .resize(THUMB_WIDTH)
      .webp({ quality: 62, effort: 4 })
      .toFile(path.join(OUT, 'thumb', `page-${n}.webp`));

    page.cleanup();
    if (i % 10 === 0 || i === total) {
      console.log(`  Processed ${i} / ${total} pages`);
    }
  }

  const meta = {
    pages: total,
    width: firstSize.w,
    height: firstSize.h,
    aspect: +(firstSize.w / firstSize.h).toFixed(4),
    generated: new Date().toISOString(),
  };
  fs.writeFileSync(path.join(OUT, 'meta.json'), JSON.stringify(meta, null, 2));

  console.log(`\nSuccessfully rasterized ${total} pages to ${OUT} (${(totalBytes / 1048576).toFixed(2)} MB total)`);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
