const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const TOTAL_FRAMES = 30;
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'sequence');
const MASTER_IMG = '/tmp/m2_pipeline/master_highres.jpg';
const CONCRETE_IMG = '/tmp/m2_pipeline/raw_concrete.jpg';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Ease function for smoothstep
function smoothstep(min, max, value) {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

function clamp(val, min = 0, max = 1) {
  return Math.max(min, Math.min(max, val));
}

async function run() {
  console.log('Starting sequence generation with Sharp...');
  const masterMeta = await sharp(MASTER_IMG).metadata();
  const W = masterMeta.width;
  const H = masterMeta.height;

  // Target frame resolution: 1920x1080 (16:9)
  const OUT_W = 1920;
  const OUT_H = 1080;

  // Prepare normalized raw concrete layer
  const concreteBuffer = await sharp(CONCRETE_IMG)
    .resize(W, H, { fit: 'cover' })
    .grayscale()
    .linear(0.85, 10)
    .toBuffer();

  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const t = i / (TOTAL_FRAMES - 1); // 0.0 -> 1.0

    // CAMERA TRAJECTORY (Continuous Cinematic Camera)
    // Starts ~5 meters back (widest crop), slowly pushes forward (scale from 1.0 to 1.25),
    // slightly elevates (vertical shift up ~35px), subtle cinematic orbit (horizontal pan ~40px).
    const camT = smoothstep(0, 1, t);
    
    // Crop window parameters inside the 2560x1440 master:
    // At t=0, crop width is 2400 (wider view)
    // At t=1, crop width is 1920 (pushed-in view)
    const cropW = Math.round(2400 - camT * 480);
    const cropH = Math.round(cropW * (9 / 16));
    
    // Continuous subtle pan and tilt
    const cropX = Math.round((W - cropW) * 0.45 + camT * 60);
    const cropY = Math.round((H - cropH) * 0.55 - camT * 50);

    // Architectural Transformation Phases:
    // Phase 1: Raw Unfinished Construction (t: 0.0 -> 0.20)
    // Phase 2: Floor & Wall Plastering (t: 0.20 -> 0.40)
    // Phase 3: Ceiling Infrastructure Profiles (t: 0.40 -> 0.60)
    // Phase 4: Stretch Ceiling Membrane Installation (t: 0.60 -> 0.75)
    // Phase 5: Integrated LED Lighting Powers On (t: 0.75 -> 0.88)
    // Phase 6: Luxury Finishing & Warm Golden Hour (t: 0.88 -> 1.00)

    const rawConstructionFactor = 1 - smoothstep(0.0, 0.35, t); // 1.0 at start, fading to 0
    const finishedFloorFactor = smoothstep(0.15, 0.45, t); // 0 -> 1
    const ceilingProfileFactor = smoothstep(0.35, 0.60, t); // 0 -> 1
    const membraneInstalledFactor = smoothstep(0.50, 0.75, t); // 0 -> 1
    const ledPowerFactor = smoothstep(0.70, 0.90, t); // 0 -> 1
    const goldenHourFactor = smoothstep(0.85, 1.0, t); // 0 -> 1

    // 1. Process Master Base with Camera Crop
    let framePipeline = sharp(MASTER_IMG)
      .extract({ left: cropX, top: cropY, width: cropW, height: cropH })
      .resize(OUT_W, OUT_H);

    // Compositing overlays for realistic architectural construction & lighting
    const composites = [];

    // RAW CONSTRUCTION OVERLAY (Concrete texture, de-saturation, dust, laser line)
    if (rawConstructionFactor > 0.02) {
      const concreteCrop = await sharp(concreteBuffer)
        .extract({ left: cropX, top: cropY, width: cropW, height: cropH })
        .resize(OUT_W, OUT_H)
        .linear(1.0, 0)
        .ensureAlpha(rawConstructionFactor * 0.78)
        .toBuffer();

      composites.push({
        input: concreteCrop,
        blend: 'overlay'
      });

      // Construction laser leveling line & CAD guidelines (early frames)
      if (t < 0.3) {
        const laserAlpha = clamp((0.3 - t) / 0.3) * 0.65;
        const laserY = Math.round(OUT_H * 0.58);
        const svgLaser = `
          <svg width="${OUT_W}" height="${OUT_H}">
            <line x1="0" y1="${laserY}" x2="${OUT_W}" y2="${laserY}" stroke="rgba(255, 60, 60, ${laserAlpha})" stroke-width="1.5" />
            <line x1="${OUT_W * 0.2}" y1="${laserY - 60}" x2="${OUT_W * 0.2}" y2="${laserY + 60}" stroke="rgba(0, 220, 255, ${laserAlpha * 0.6})" stroke-width="1" stroke-dasharray="4,4" />
            <text x="30" y="${laserY - 8}" fill="rgba(255, 60, 60, ${laserAlpha})" font-family="monospace" font-size="10" letter-spacing="2">±0.000 DATUM LEVEL // SURVEY</text>
          </svg>
        `;
        composites.push({
          input: Buffer.from(svgLaser),
          blend: 'over'
        });
      }
    }

    // CEILING INFRASTRUCTURE PROFILES (Aluminum mounting rails, wiring channels)
    if (ceilingProfileFactor > 0.05 && membraneInstalledFactor < 0.95) {
      const profileAlpha = Math.min(ceilingProfileFactor, 1 - membraneInstalledFactor * 0.9);
      const svgCeilingInfra = `
        <svg width="${OUT_W}" height="${OUT_H}">
          <!-- Perimeter aluminum harpoon extrusion profile -->
          <rect x="${OUT_W * 0.12}" y="0" width="${OUT_W * 0.76}" height="${OUT_H * 0.24}" fill="none" stroke="rgba(220, 230, 245, ${profileAlpha * 0.85})" stroke-width="2.5" stroke-dasharray="12,6" />
          <rect x="${OUT_W * 0.14}" y="0" width="${OUT_W * 0.72}" height="${OUT_H * 0.22}" fill="none" stroke="rgba(255, 170, 50, ${profileAlpha * 0.7})" stroke-width="1" />
          <!-- Wiring tracks and LED mount channels -->
          <line x1="${OUT_W * 0.2}" y1="0" x2="${OUT_W * 0.2}" y2="${OUT_H * 0.22}" stroke="rgba(200, 200, 200, ${profileAlpha * 0.5})" stroke-width="1.5" />
          <line x1="${OUT_W * 0.35}" y1="0" x2="${OUT_W * 0.35}" y2="${OUT_H * 0.22}" stroke="rgba(200, 200, 200, ${profileAlpha * 0.5})" stroke-width="1.5" />
          <line x1="${OUT_W * 0.65}" y1="0" x2="${OUT_W * 0.65}" y2="${OUT_H * 0.22}" stroke="rgba(200, 200, 200, ${profileAlpha * 0.5})" stroke-width="1.5" />
          <line x1="${OUT_W * 0.8}" y1="0" x2="${OUT_W * 0.8}" y2="${OUT_H * 0.22}" stroke="rgba(200, 200, 200, ${profileAlpha * 0.5})" stroke-width="1.5" />
        </svg>
      `;
      composites.push({
        input: Buffer.from(svgCeilingInfra),
        blend: 'screen'
      });
    }

    // STRETCH CEILING MEMBRANE LAYER (Smooth translucent Barrisol satin finish)
    if (membraneInstalledFactor > 0.05) {
      const membraneAlpha = membraneInstalledFactor * (1 - ledPowerFactor * 0.65);
      const svgMembrane = `
        <svg width="${OUT_W}" height="${OUT_H}">
          <defs>
            <linearGradient id="memGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="white" stop-opacity="${membraneAlpha * 0.45}" />
              <stop offset="70%" stop-color="#f8f9fa" stop-opacity="${membraneAlpha * 0.35}" />
              <stop offset="100%" stop-color="#eaebee" stop-opacity="${membraneAlpha * 0.25}" />
            </linearGradient>
          </defs>
          <rect x="${OUT_W * 0.12}" y="0" width="${OUT_W * 0.76}" height="${OUT_H * 0.24}" fill="url(#memGrad)" />
        </svg>
      `;
      composites.push({
        input: Buffer.from(svgMembrane),
        blend: 'screen'
      });
    }

    // INTEGRATED LED LIGHTING & HOMOGENEOUS CEILING ILLUMINATION
    if (ledPowerFactor > 0.02) {
      const ledGlow = ledPowerFactor * 0.75;
      const svgLed = `
        <svg width="${OUT_W}" height="${OUT_H}">
          <defs>
            <radialGradient id="ledCenter" cx="50%" cy="10%" r="60%">
              <stop offset="0%" stop-color="#FFF8EE" stop-opacity="${ledGlow * 0.9}" />
              <stop offset="40%" stop-color="#FFEED6" stop-opacity="${ledGlow * 0.6}" />
              <stop offset="85%" stop-color="#F27D26" stop-opacity="${ledGlow * 0.2}" />
              <stop offset="100%" stop-color="#F27D26" stop-opacity="0" />
            </radialGradient>
            <!-- Perimeter cove lighting wash -->
            <linearGradient id="coveWash" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#FFEED6" stop-opacity="${ledGlow * 0.5}" />
              <stop offset="35%" stop-color="#FFEED6" stop-opacity="${ledGlow * 0.2}" />
              <stop offset="100%" stop-color="#FFEED6" stop-opacity="0" />
            </linearGradient>
          </defs>
          <!-- Ceiling ambient light flood -->
          <rect x="${OUT_W * 0.1}" y="0" width="${OUT_W * 0.8}" height="${OUT_H * 0.3}" fill="url(#ledCenter)" />
          <!-- Cove wash down the walls -->
          <rect x="${OUT_W * 0.1}" y="${OUT_H * 0.22}" width="${OUT_W * 0.8}" height="${OUT_H * 0.25}" fill="url(#coveWash)" />
        </svg>
      `;
      composites.push({
        input: Buffer.from(svgLed),
        blend: 'screen'
      });
    }

    // GOLDEN HOUR & MEDITERRANEAN SUNSET LIGHTING (Final frames)
    if (goldenHourFactor > 0.05) {
      const sunAlpha = goldenHourFactor * 0.35;
      const svgSun = `
        <svg width="${OUT_W}" height="${OUT_H}">
          <defs>
            <linearGradient id="sunStream" x1="0%" y1="0%" x2="100%" y2="80%">
              <stop offset="0%" stop-color="#FFF0D0" stop-opacity="${sunAlpha * 0.8}" />
              <stop offset="50%" stop-color="#FFD6A5" stop-opacity="${sunAlpha * 0.4}" />
              <stop offset="100%" stop-color="#F27D26" stop-opacity="0" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="${OUT_W}" height="${OUT_H}" fill="url(#sunStream)" />
        </svg>
      `;
      composites.push({
        input: Buffer.from(svgSun),
        blend: 'screen'
      });
    }

    // Apply color grading based on progress:
    // Early frames: darker, desaturated, higher contrast (construction site)
    // Later frames: rich warm tones, lush Mediterranean natural light
    const sat = 0.3 + t * 0.8; // 0.3 -> 1.1 saturation
    const brightness = 0.65 + t * 0.4; // 0.65 -> 1.05 brightness

    framePipeline = framePipeline
      .modulate({
        saturation: sat,
        brightness: brightness
      });

    if (composites.length > 0) {
      framePipeline = framePipeline.composite(composites);
    }

    const frameNum = String(i + 1).padStart(3, '0');
    const outPath = path.join(OUTPUT_DIR, `frame-${frameNum}.webp`);

    await framePipeline
      .webp({ quality: 90, effort: 4 })
      .toFile(outPath);

    process.stdout.write(`\rRendered frame ${frameNum} / ${TOTAL_FRAMES}`);
  }

  // Also create before.webp and after.webp for the Before/After slider
  fs.copyFileSync(
    path.join(OUTPUT_DIR, 'frame-001.webp'),
    path.join(OUTPUT_DIR, 'before.webp')
  );
  fs.copyFileSync(
    path.join(OUTPUT_DIR, `frame-${String(TOTAL_FRAMES).padStart(3, '0')}.webp`),
    path.join(OUTPUT_DIR, 'after.webp')
  );

  console.log('\nAll 30 architectural frames generated successfully!');
}

run().catch(console.error);
