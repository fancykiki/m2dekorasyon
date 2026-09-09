const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const https = require('https');

const W = 1920;
const H = 1080;
const publicDir = path.resolve(__dirname, '../public/cinematic');

const SCENES_CONFIG = [
  {
    id: 'scene-01',
    shots: [
      { name: 'shot-01.webp', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2560&q=85', zoom: 1.0 },
      { name: 'shot-02.webp', url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=2560&q=85', zoom: 1.08 }
    ]
  },
  {
    id: 'scene-02',
    shots: [
      { name: 'shot-01.webp', url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2560&q=85', blueprint: true },
      { name: 'shot-02.webp', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2560&q=85', blueprintOverlay: true }
    ]
  },
  {
    id: 'scene-03',
    shots: [
      { name: 'shot-01.webp', url: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=2560&q=85', macro: 'travertine' },
      { name: 'shot-02.webp', url: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=2560&q=85', macro: 'walnut' }
    ]
  },
  {
    id: 'scene-04',
    shots: [
      { name: 'shot-01.webp', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2560&q=85', ceiling: 'profile' },
      { name: 'shot-02.webp', url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2560&q=85', ceiling: 'tensioned' }
    ]
  },
  {
    id: 'scene-05',
    shots: [
      { name: 'shot-01.webp', url: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=2560&q=85', light: 'cove' },
      { name: 'shot-02.webp', url: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=2560&q=85', light: 'full' }
    ]
  },
  {
    id: 'scene-06',
    shots: [
      { name: 'shot-01.webp', url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2560&q=85', detail: 'craft' },
      { name: 'shot-02.webp', url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2560&q=85', detail: 'joinery' }
    ]
  },
  {
    id: 'scene-07',
    shots: [
      { name: 'shot-01.webp', url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2560&q=85', interior: 'wide' },
      { name: 'shot-02.webp', url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2560&q=85', interior: 'dolly' }
    ]
  },
  {
    id: 'scene-08',
    shots: [
      { name: 'shot-01.webp', url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2560&q=85', lifestyle: 'dining' },
      { name: 'shot-02.webp', url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2560&q=85', lifestyle: 'kitchen' }
    ]
  },
  {
    id: 'scene-09',
    shots: [
      { name: 'shot-01.webp', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2560&q=85', golden: 'early' },
      { name: 'shot-02.webp', url: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2560&q=85', golden: 'sunset' }
    ]
  },
  {
    id: 'scene-10',
    shots: [
      { name: 'shot-01.webp', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2560&q=85', hero: 'dusk' },
      { name: 'shot-02.webp', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2560&q=85', hero: 'night' }
    ]
  }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadFile(res.headers.location, dest).then(resolve, reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed with status ${res.statusCode} for ${url}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', reject);
  });
}

async function processScene(scene) {
  const sceneDir = path.join(publicDir, scene.id);
  if (!fs.existsSync(sceneDir)) {
    fs.mkdirSync(sceneDir, { recursive: true });
  }

  for (const shot of scene.shots) {
    const tmpPath = path.join('/tmp', `raw_${scene.id}_${shot.name}.jpg`);
    const outPath = path.join(sceneDir, shot.name);

    console.log(`Downloading ${scene.id}/${shot.name}...`);
    await downloadFile(shot.url, tmpPath);

    let pipeline = sharp(tmpPath).resize(W, H, { fit: 'cover', position: 'center' });

    // Scene-specific artistic & architectural grading
    if (shot.blueprint) {
      // High-contrast blueprint technical drawing look
      const blueprintSvg = Buffer.from(`
        <svg width="${W}" height="${H}">
          <defs>
            <pattern id="archGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#F27D26" stroke-width="0.75" stroke-opacity="0.35"/>
              <path d="M 200 0 L 0 0 0 200" fill="none" stroke="#F27D26" stroke-width="1.5" stroke-opacity="0.5"/>
            </pattern>
          </defs>
          <rect width="${W}" height="${H}" fill="#0A0F18" fill-opacity="0.5"/>
          <rect width="${W}" height="${H}" fill="url(#archGrid)"/>
          <!-- Technical Drawing Dimension Lines -->
          <line x1="160" y1="200" x2="1760" y2="200" stroke="#F27D26" stroke-width="1.5" stroke-dasharray="8,4" stroke-opacity="0.8"/>
          <text x="180" y="190" fill="#F27D26" font-family="monospace" font-size="12" letter-spacing="2">M2 DEKORASYON // ANTALYA VILLA CONCEPT PLAN - SCALE 1:50</text>
          <text x="180" y="225" fill="#FFFFFF" font-family="monospace" font-size="10" opacity="0.6">ZONE 01: SALON &amp; GERGİ TAVAN HACMİ (84.5 m²) · TRAVERTEN ZEMİN</text>
          <line x1="300" y1="400" x2="1620" y2="400" stroke="#FFFFFF" stroke-width="1" stroke-opacity="0.3"/>
          <line x1="300" y1="800" x2="1620" y2="800" stroke="#FFFFFF" stroke-width="1" stroke-opacity="0.3"/>
        </svg>
      `);
      pipeline = pipeline.modulate({ saturation: 0.4, brightness: 0.85 }).composite([{ input: blueprintSvg, blend: 'screen' }]);
    } else if (shot.blueprintOverlay) {
      const edgeOverlay = Buffer.from(`
        <svg width="${W}" height="${H}">
          <defs>
            <linearGradient id="edgeGrad" x1="0" y1="0" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#F27D26" stop-opacity="0.4"/>
              <stop offset="50%" stop-color="#FFFFFF" stop-opacity="0.1"/>
              <stop offset="100%" stop-color="#000000" stop-opacity="0.0"/>
            </linearGradient>
          </defs>
          <rect width="${W}" height="${H}" fill="url(#edgeGrad)"/>
          <line x1="0" y1="250" x2="${W}" y2="250" stroke="#F27D26" stroke-width="2" stroke-dasharray="12,6" stroke-opacity="0.75"/>
          <text x="50" y="240" fill="#F27D26" font-family="monospace" font-size="12">AXIS A-A // ELEVATION +3.200 (CEILING DATUM)</text>
        </svg>
      `);
      pipeline = pipeline.modulate({ saturation: 0.9, brightness: 0.95 }).composite([{ input: edgeOverlay, blend: 'screen' }]);
    } else if (shot.light === 'cove') {
      const coveSvg = Buffer.from(`
        <svg width="${W}" height="${H}">
          <defs>
            <linearGradient id="coveIgnite" x1="0" y1="0" x2="0" y2="100%">
              <stop offset="0%" stop-color="#FFE8C2" stop-opacity="0.5"/>
              <stop offset="15%" stop-color="#F27D26" stop-opacity="0.35"/>
              <stop offset="35%" stop-color="#050505" stop-opacity="0.0"/>
            </linearGradient>
          </defs>
          <rect width="${W}" height="${H}" fill="url(#coveIgnite)"/>
        </svg>
      `);
      pipeline = pipeline.modulate({ brightness: 0.75, saturation: 1.1 }).composite([{ input: coveSvg, blend: 'screen' }]);
    } else if (shot.light === 'full') {
      const fullLightSvg = Buffer.from(`
        <svg width="${W}" height="${H}">
          <defs>
            <radialGradient id="fullStretch" cx="50%" cy="10%" r="70%">
              <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.45"/>
              <stop offset="40%" stop-color="#FFF2DC" stop-opacity="0.30"/>
              <stop offset="100%" stop-color="#F27D26" stop-opacity="0.0"/>
            </radialGradient>
          </defs>
          <rect width="${W}" height="${H}" fill="url(#fullStretch)"/>
        </svg>
      `);
      pipeline = pipeline.modulate({ brightness: 1.05, saturation: 1.1 }).composite([{ input: fullLightSvg, blend: 'screen' }]);
    } else if (shot.golden) {
      const goldenSvg = Buffer.from(`
        <svg width="${W}" height="${H}">
          <defs>
            <linearGradient id="sunbeams" x1="100%" y1="10%" x2="0%" y2="90%">
              <stop offset="0%" stop-color="#FFE0B2" stop-opacity="0.45"/>
              <stop offset="45%" stop-color="#FFB74D" stop-opacity="0.25"/>
              <stop offset="85%" stop-color="#F27D26" stop-opacity="0.10"/>
              <stop offset="100%" stop-color="#F27D26" stop-opacity="0.0"/>
            </linearGradient>
          </defs>
          <rect width="${W}" height="${H}" fill="url(#sunbeams)"/>
        </svg>
      `);
      pipeline = pipeline.modulate({ brightness: 1.05, saturation: 1.2 }).composite([{ input: goldenSvg, blend: 'screen' }]);
    } else if (shot.hero === 'night') {
      pipeline = pipeline.modulate({ brightness: 0.95, saturation: 1.05 });
    }

    await pipeline.webp({ quality: 90 }).toFile(outPath);
    console.log(`Rendered ${scene.id}/${shot.name}`);
  }
}

async function main() {
  console.log('Starting cinematic asset generation for all 10 scenes...');
  for (const sc of SCENES_CONFIG) {
    await processScene(sc);
  }
  console.log('All 10 cinematic scenes rendered successfully in /public/cinematic!');
}

main().catch(console.error);
