/**
 * Extract the scroll-driven hero sequence frames from a source video.
 *
 * The hero (src/components/hero/CinematicSceneSequence.tsx) is a scroll-scrubbed
 * frame player: scrolling maps to a frame index and that single frame is drawn to
 * a canvas. Because consecutive frames differ only slightly it reads like video.
 *
 * Usage:  node scripts/extract_hero_frames.cjs <source.mp4> [frameCount] [width]
 * Output: public/hero-seq/frame-0001.webp ...  (overwrites the folder)
 */
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');
const ffmpeg = require('ffmpeg-static');
const sharp = require('sharp');

const SRC = process.argv[2];
const FRAME_COUNT = Number(process.argv[3]) || 96;
const WIDTH = Number(process.argv[4]) || 1152;
const OUT = path.join(__dirname, '..', 'public', 'hero-seq');

if (!SRC || !fs.existsSync(SRC)) {
  console.error('Source video not found:', SRC);
  process.exit(1);
}

(async () => {
  // Probe duration via ffmpeg stderr (ffprobe not bundled).
  let duration = 5;
  try {
    execFileSync(ffmpeg, ['-i', SRC], { stdio: ['ignore', 'ignore', 'pipe'] });
  } catch (e) {
    const m = String(e.stderr).match(/Duration:\s*(\d+):(\d+):(\d+\.\d+)/);
    if (m) duration = (+m[1]) * 3600 + (+m[2]) * 60 + parseFloat(m[3]);
  }
  const fps = (FRAME_COUNT / duration).toFixed(4);
  console.log(`source ${SRC}  ~${duration.toFixed(2)}s  ->  ${FRAME_COUNT} frames @ ${fps} fps, ${WIDTH}px`);

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'hero-frames-'));
  execFileSync(ffmpeg, [
    '-i', SRC,
    '-vf', `fps=${fps},scale=${WIDTH}:-2:flags=lanczos`,
    '-frames:v', String(FRAME_COUNT),
    '-y', path.join(tmp, 'raw-%04d.png'),
  ], { stdio: 'inherit' });

  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });

  const raws = fs.readdirSync(tmp).filter((f) => f.endsWith('.png')).sort();
  let total = 0;
  for (let i = 0; i < raws.length; i++) {
    const n = String(i + 1).padStart(4, '0');
    const out = path.join(OUT, `frame-${n}.webp`);
    await sharp(path.join(tmp, raws[i])).webp({ quality: 66, effort: 6 }).toFile(out);
    total += fs.statSync(out).size;
  }
  fs.rmSync(tmp, { recursive: true, force: true });
  console.log(`wrote ${raws.length} frames, ${(total / 1024 / 1024).toFixed(2)} MB total -> public/hero-seq/`);
})();
