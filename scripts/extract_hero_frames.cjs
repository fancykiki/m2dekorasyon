/**
 * Build the scroll-driven hero sequence from one or more source videos.
 *
 * The hero (src/components/hero/CinematicSceneSequence.tsx) is a scroll-scrubbed
 * frame player: scrolling maps to a frame index and that single frame is drawn to
 * a canvas. Because consecutive frames differ only slightly it reads like a film.
 *
 * Usage:
 *   node scripts/extract_hero_frames.cjs <video...> --count 132 --width 1520 --q 72
 *   (bare positionals: node scripts/extract_hero_frames.cjs a.mp4 b.mp4 132 1520 72)
 * Output: public/hero-seq/frame-0001.webp ...  (folder is overwritten)
 */
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');
const ffmpeg = require('ffmpeg-static');
const sharp = require('sharp');

const argv = process.argv.slice(2);
const opt = { count: 132, width: 1520, q: 72 };
const vids = [];
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === '--count') opt.count = +argv[++i];
  else if (a === '--width') opt.width = +argv[++i];
  else if (a === '--q') opt.q = +argv[++i];
  else if (/\.(mp4|mov|webm|mkv)$/i.test(a)) vids.push(a);
  else if (/^\d+$/.test(a)) {
    // bare numbers, in order: count, width, q
    if (!opt._n) opt._n = 0;
    opt._n++;
    if (opt._n === 1) opt.count = +a;
    else if (opt._n === 2) opt.width = +a;
    else if (opt._n === 3) opt.q = +a;
  }
}
if (!vids.length || !vids.every((v) => fs.existsSync(v))) {
  console.error('Give at least one existing video file.');
  process.exit(1);
}

const OUT = path.join(__dirname, '..', 'public', 'hero-seq');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'hero-frames-'));

const probeDuration = (file) => {
  try {
    execFileSync(ffmpeg, ['-i', file], { stdio: ['ignore', 'ignore', 'pipe'] });
  } catch (e) {
    const m = String(e.stderr).match(/Duration:\s*(\d+):(\d+):(\d+\.\d+)/);
    if (m) return +m[1] * 3600 + +m[2] * 60 + parseFloat(m[3]);
  }
  return 5;
};

(async () => {
  let src = vids[0];
  if (vids.length > 1) {
    const list = path.join(tmp, 'list.txt');
    fs.writeFileSync(list, vids.map((v) => `file '${path.resolve(v)}'`).join('\n'));
    src = path.join(tmp, 'combined.mp4');
    execFileSync(ffmpeg, ['-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', '-y', src], { stdio: 'inherit' });
  }

  const duration = probeDuration(src);
  const fps = (opt.count / duration).toFixed(4);
  console.log(`${vids.length} clip(s) -> ~${duration.toFixed(2)}s -> ${opt.count} frames @ ${fps} fps, ${opt.width}px, webp q${opt.q}`);

  execFileSync(ffmpeg, [
    '-i', src,
    '-vf', `fps=${fps},scale=${opt.width}:-2:flags=lanczos`,
    '-frames:v', String(opt.count),
    '-y', path.join(tmp, 'raw-%04d.png'),
  ], { stdio: 'inherit' });

  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });

  const raws = fs.readdirSync(tmp).filter((f) => f.startsWith('raw-')).sort();
  let total = 0;
  for (let i = 0; i < raws.length; i++) {
    const outPath = path.join(OUT, `frame-${String(i + 1).padStart(4, '0')}.webp`);
    await sharp(path.join(tmp, raws[i])).webp({ quality: opt.q, effort: 6 }).toFile(outPath);
    total += fs.statSync(outPath).size;
  }
  fs.rmSync(tmp, { recursive: true, force: true });
  console.log(`wrote ${raws.length} frames, ${(total / 1024 / 1024).toFixed(2)} MB -> public/hero-seq/`);
})();
