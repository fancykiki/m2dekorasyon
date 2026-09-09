const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const W = 1920;
const H = 1080;
const masterPath = '/tmp/clean_master_1080p.jpg';
const outDir = path.resolve(__dirname, '../public/sequence');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 10 Logical Architectural Transformation Stages
const STAGES = [
  {
    idx: 1,
    name: "01. HAM MEKAN & DOĞAL IŞIK",
    desc: "Sakin sabah gün ışığı altında ham mimari hacim. Tavan aydınlatmaları kapalı, doğal taş ve cam yüzeyler dinlenme halinde.",
    // Modulate parameters: unlit, natural cool morning tones
    modulate: { saturation: 0.68, brightness: 0.82 },
    // Ceiling darkened/dormant (unlit)
    ceilingOverlay: `
      <svg width="${W}" height="${H}">
        <defs>
          <linearGradient id="ceilDark" x1="0" y1="0" x2="0" y2="100%">
            <stop offset="0%" stop-color="#080c12" stop-opacity="0.70" />
            <stop offset="18%" stop-color="#080c12" stop-opacity="0.45" />
            <stop offset="28%" stop-color="#080c12" stop-opacity="0.0" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${W}" height="${H}" fill="url(#ceilDark)" />
      </svg>
    `,
    ceilingBlend: 'multiply',
    lightOverlay: null
  },
  {
    idx: 2,
    name: "02. SABAH IŞIĞI & MEKAN GEOMETRİSİ",
    desc: "Panoramik cam cepheden süzülen Akdeniz sabah ışığı mekanın geometrisini ve zemin akslarını belirginleştirir.",
    modulate: { saturation: 0.76, brightness: 0.87 },
    ceilingOverlay: `
      <svg width="${W}" height="${H}">
        <defs>
          <linearGradient id="ceilDark2" x1="0" y1="0" x2="0" y2="100%">
            <stop offset="0%" stop-color="#080c12" stop-opacity="0.55" />
            <stop offset="18%" stop-color="#080c12" stop-opacity="0.30" />
            <stop offset="26%" stop-color="#080c12" stop-opacity="0.0" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${W}" height="${H}" fill="url(#ceilDark2)" />
      </svg>
    `,
    ceilingBlend: 'multiply',
    lightOverlay: null
  },
  {
    idx: 3,
    name: "03. MONOLİTİK SATEN GERGİ TAVAN",
    desc: "Tavanda tek parça, eksiz saten beyaz akustik gergi membran yüzeyi form kazanır; üst hacim pürüzsüzleşir.",
    modulate: { saturation: 0.84, brightness: 0.92 },
    ceilingOverlay: `
      <svg width="${W}" height="${H}">
        <defs>
          <linearGradient id="satinPlane" x1="0" y1="0" x2="0" y2="100%">
            <stop offset="0%" stop-color="#F2F5F8" stop-opacity="0.22" />
            <stop offset="20%" stop-color="#FFFFFF" stop-opacity="0.10" />
            <stop offset="26%" stop-color="#FFFFFF" stop-opacity="0.0" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${W}" height="${H}" fill="url(#satinPlane)" />
      </svg>
    `,
    ceilingBlend: 'screen',
    lightOverlay: null
  },
  {
    idx: 4,
    name: "04. İLK IŞIK UYANIŞI (GİZLİ LED %20)",
    desc: "Tavan çevresindeki gizli ışık profilinde 2400K sıcak amber LED'ler ilk uyanışını yaşar; duvara yumuşak bir ışık düşer.",
    modulate: { saturation: 0.90, brightness: 0.95 },
    ceilingOverlay: null,
    lightOverlay: `
      <svg width="${W}" height="${H}">
        <defs>
          <!-- Perimeter cove soft glow -->
          <linearGradient id="cove1" x1="0" y1="0" x2="0" y2="100%">
            <stop offset="0%" stop-color="#FFEACC" stop-opacity="0.25" />
            <stop offset="14%" stop-color="#FFD199" stop-opacity="0.18" />
            <stop offset="24%" stop-color="#F27D26" stop-opacity="0.0" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${W}" height="${H}" fill="url(#cove1)" />
      </svg>
    `,
    lightBlend: 'screen'
  },
  {
    idx: 5,
    name: "05. GİZLİ IŞIK HAVUZU (GİZLİ LED %50)",
    desc: "Çevresel gizli aydınlatma %50 seviyesine ulaşarak tavanı duvardan ayırır ve mimari derinlik hissi yaratır.",
    modulate: { saturation: 0.96, brightness: 0.98 },
    ceilingOverlay: null,
    lightOverlay: `
      <svg width="${W}" height="${H}">
        <defs>
          <linearGradient id="cove2" x1="0" y1="0" x2="0" y2="100%">
            <stop offset="0%" stop-color="#FFF0D9" stop-opacity="0.38" />
            <stop offset="16%" stop-color="#FFD6A3" stop-opacity="0.28" />
            <stop offset="26%" stop-color="#F27D26" stop-opacity="0.0" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${W}" height="${H}" fill="url(#cove2)" />
      </svg>
    `,
    lightBlend: 'screen'
  },
  {
    idx: 6,
    name: "06. HOMOJEN GERGİ TAVAN IŞIMASI (%65)",
    desc: "M2 transparan gergi tavan membranı devreye girer; tavan devasa, homojen ve gölgesiz bir ışık kaynağına dönüşür.",
    modulate: { saturation: 1.02, brightness: 1.01 },
    ceilingOverlay: null,
    lightOverlay: `
      <svg width="${W}" height="${H}">
        <defs>
          <radialGradient id="stretchGlow1" cx="50%" cy="8%" r="65%">
            <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.45" />
            <stop offset="30%" stop-color="#FFF2E0" stop-opacity="0.32" />
            <stop offset="70%" stop-color="#FFDEB3" stop-opacity="0.15" />
            <stop offset="100%" stop-color="#F27D26" stop-opacity="0.0" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="${W}" height="${H}" fill="url(#stretchGlow1)" />
      </svg>
    `,
    lightBlend: 'screen'
  },
  {
    idx: 7,
    name: "07. BÜTÜNLEŞİK MİMARİ AYDINLATMA (%85)",
    desc: "Gergi tavan difüzyonu ve gizli havuz ışığı kusursuz dengede birleşir. Mekan yüksek CRI (>95) müze standardında aydınlanır.",
    modulate: { saturation: 1.06, brightness: 1.03 },
    ceilingOverlay: null,
    lightOverlay: `
      <svg width="${W}" height="${H}">
        <defs>
          <radialGradient id="stretchGlow2" cx="50%" cy="8%" r="65%">
            <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.52" />
            <stop offset="35%" stop-color="#FFF3E3" stop-opacity="0.38" />
            <stop offset="75%" stop-color="#FFDCB0" stop-opacity="0.20" />
            <stop offset="100%" stop-color="#F27D26" stop-opacity="0.0" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="${W}" height="${H}" fill="url(#stretchGlow2)" />
      </svg>
    `,
    lightBlend: 'screen'
  },
  {
    idx: 8,
    name: "08. AHŞAP DOKU & DETAY DERİNLİĞİ",
    desc: "Işığın zarafetiyle flütlü Amerikan ceviz paneller ve traverten zemin damarları sıcak ve zengin bir derinlik kazanır.",
    modulate: { saturation: 1.10, brightness: 1.04 },
    ceilingOverlay: null,
    lightOverlay: `
      <svg width="${W}" height="${H}">
        <defs>
          <radialGradient id="stretchGlow3" cx="50%" cy="8%" r="65%">
            <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.55" />
            <stop offset="35%" stop-color="#FFF5E8" stop-opacity="0.40" />
            <stop offset="80%" stop-color="#FFDCA8" stop-opacity="0.22" />
            <stop offset="100%" stop-color="#F27D26" stop-opacity="0.0" />
          </radialGradient>
          <linearGradient id="warmBase" x1="0" y1="50%" x2="0" y2="100%">
            <stop offset="0%" stop-color="#FFEACC" stop-opacity="0.0" />
            <stop offset="100%" stop-color="#F27D26" stop-opacity="0.10" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${W}" height="${H}" fill="url(#stretchGlow3)" />
        <rect x="0" y="0" width="${W}" height="${H}" fill="url(#warmBase)" />
      </svg>
    `,
    lightBlend: 'screen'
  },
  {
    idx: 9,
    name: "09. AKDENİZ ALTIN SAATİ (GOLDEN HOUR)",
    desc: "Akdeniz'in batmakta olan güneşi dev camlardan içeri sıcak amber huzmeler göndererek iç aydınlatmayla kaynaşır.",
    modulate: { saturation: 1.14, brightness: 1.05 },
    ceilingOverlay: null,
    lightOverlay: `
      <svg width="${W}" height="${H}">
        <defs>
          <radialGradient id="stretchGlow4" cx="50%" cy="8%" r="65%">
            <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.55" />
            <stop offset="35%" stop-color="#FFF5E8" stop-opacity="0.40" />
            <stop offset="80%" stop-color="#FFDCA8" stop-opacity="0.24" />
            <stop offset="100%" stop-color="#F27D26" stop-opacity="0.0" />
          </radialGradient>
          <!-- Sunset diagonal sunbeam coming through panoramic glass -->
          <linearGradient id="goldenRays" x1="100%" y1="20%" x2="0%" y2="85%">
            <stop offset="0%" stop-color="#FFE8C2" stop-opacity="0.36" />
            <stop offset="40%" stop-color="#FFD199" stop-opacity="0.24" />
            <stop offset="80%" stop-color="#F27D26" stop-opacity="0.08" />
            <stop offset="100%" stop-color="#F27D26" stop-opacity="0.0" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${W}" height="${H}" fill="url(#stretchGlow4)" />
        <rect x="0" y="0" width="${W}" height="${H}" fill="url(#goldenRays)" />
      </svg>
    `,
    lightBlend: 'screen'
  },
  {
    idx: 10,
    name: "10. M2 İMZASI: AKŞAM LÜKS YAŞAM DENEYİMİ",
    desc: "Dönüşüm tamamlandı. Akşam alacasında 2700K ipeksi gergi tavan ışıltısı ve altın saat sıcaklığıyla Antalya'da benzersiz bir yaşam alanı.",
    modulate: { saturation: 1.18, brightness: 1.07 },
    ceilingOverlay: null,
    lightOverlay: `
      <svg width="${W}" height="${H}">
        <defs>
          <radialGradient id="finalStretch" cx="50%" cy="8%" r="65%">
            <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.60" />
            <stop offset="35%" stop-color="#FFF5E8" stop-opacity="0.45" />
            <stop offset="80%" stop-color="#FFD899" stop-opacity="0.28" />
            <stop offset="100%" stop-color="#F27D26" stop-opacity="0.0" />
          </radialGradient>
          <linearGradient id="finalGolden" x1="100%" y1="15%" x2="0%" y2="85%">
            <stop offset="0%" stop-color="#FFE5BA" stop-opacity="0.42" />
            <stop offset="45%" stop-color="#FFC98A" stop-opacity="0.28" />
            <stop offset="85%" stop-color="#F27D26" stop-opacity="0.10" />
            <stop offset="100%" stop-color="#F27D26" stop-opacity="0.0" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${W}" height="${H}" fill="url(#finalStretch)" />
        <rect x="0" y="0" width="${W}" height="${H}" fill="url(#finalGolden)" />
      </svg>
    `,
    lightBlend: 'screen'
  }
];

async function run() {
  console.log('Generating 10 LOGICAL MASTER KEYFRAMES from the exact same luxury interior photo...');

  const manifest = {
    version: "2.0.0",
    description: "M2 Dekorasyon Antalya - 10 Logical Architectural Master Keyframes of the Exact Same Interior",
    totalFrames: 10,
    dimensions: { width: W, height: H },
    camera: "LOCKED_CENTRAL_ARCHITECTURAL_1080P",
    frames: []
  };

  for (const stage of STAGES) {
    const frameNum = String(stage.idx).padStart(3, '0');
    const outPath = path.join(outDir, `frame-${frameNum}.webp`);

    let pipeline = sharp(masterPath).modulate(stage.modulate);
    const composites = [];

    if (stage.ceilingOverlay) {
      composites.push({
        input: Buffer.from(stage.ceilingOverlay),
        blend: stage.ceilingBlend || 'multiply'
      });
    }

    if (stage.lightOverlay) {
      composites.push({
        input: Buffer.from(stage.lightOverlay),
        blend: stage.lightBlend || 'screen'
      });
    }

    if (composites.length > 0) {
      pipeline = pipeline.composite(composites);
    }

    await pipeline.webp({ quality: 92 }).toFile(outPath);
    console.log(`Rendered logical keyframe ${frameNum} / 10: ${stage.name}`);

    manifest.frames.push({
      frame: stage.idx,
      filename: `frame-${frameNum}.webp`,
      milestone: stage.name,
      description: stage.desc
    });
  }

  // Copy frame-001 as before.webp, frame-010 as after.webp for 100% matched Before/After slider
  fs.copyFileSync(path.join(outDir, 'frame-001.webp'), path.join(outDir, 'before.webp'));
  fs.copyFileSync(path.join(outDir, 'frame-010.webp'), path.join(outDir, 'after.webp'));
  console.log('Copied frame-001 -> before.webp and frame-010 -> after.webp (Pixel-perfect 1:1 match)');

  // Write manifest
  fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log('Manifest updated at /sequence/manifest.json');
}

run().catch(console.error);
