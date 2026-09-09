/**
 * M2 Dekorasyon - High-Precision Procedural Architectural Cinematic Renderer
 * 
 * Strict visual continuity across 160 frames for a luxury Antalya interior:
 * - Constant room dimensions: width=14m, depth=18m, height=4.2m
 * - Strict world-space coordinate anchors for walls, ceiling, TV unit, furniture, windows
 * - 6-phase continuous camera path & lighting progression:
 *   1-20: Bare concrete shell, subtle ambient light, thin CAD wireframe overlays, camera push
 *   21-40: Material definition, floor travertine & herringbone wood, ceiling perimeter channels
 *   41-65: Ceiling focus (M2 signature), perimeter profile snap, LED strip ignition, translucent stretch membrane tensioning
 *   66-100: Assembly of bespoke furniture (suspended marble TV wall, Italian sofa, travertine table, sheer curtains)
 *   101-125: Macro cinematic depth of field (marble veining, wood grain, brushed bronze, satin membrane)
 *   126-150: Wide reveal, Antalya golden-hour sunlight pouring through terrace glass, warm LED mix
 *   151-160: Final hero lock-off, complete architectural composition
 */

export interface RenderContext {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  frameIndex: number; // 0 to 159 (160 frames)
  showCadOverlay?: boolean;
}

export function renderArchitecturalFrame({ ctx, width, height, frameIndex, showCadOverlay = false }: RenderContext) {
  const f = Math.max(0, Math.min(159, frameIndex));
  const progress = f / 159; // 0.0 to 1.0

  // Clear canvas with Sophisticated Dark pitch black
  ctx.fillStyle = '#050505';
  ctx.fillRect(0, 0, width, height);

  // Define phases based on prompt specifications
  // Phase 1: 0 - 19 (Frames 1-20)
  // Phase 2: 20 - 39 (Frames 21-40)
  // Phase 3: 40 - 64 (Frames 41-65)
  // Phase 4: 65 - 99 (Frames 66-100)
  // Phase 5: 100 - 124 (Frames 101-125)
  // Phase 6: 125 - 159 (Frames 126-160)

  // Camera parameters smoothly animated
  let camZ = 0; // -1 to +1
  let camY = 0; // vertical camera offset (pan/tilt)
  let camZoom = 1;
  let isMacro = false;
  let macroProgress = 0;

  if (f <= 19) {
    const t = f / 19;
    camZ = t * 0.15; // slow forward movement
    camY = 0;
    camZoom = 1 + t * 0.05;
  } else if (f <= 39) {
    const t = (f - 20) / 19;
    camZ = 0.15 + t * 0.15;
    camY = t * 0.04;
    camZoom = 1.05 + t * 0.05;
  } else if (f <= 64) {
    // Focus entirely on the ceiling (Camera moves upward, looking up)
    const t = (f - 40) / 24;
    camZ = 0.3 + t * 0.1;
    camY = 0.04 + t * 0.38; // camera tilts and moves upward toward ceiling
    camZoom = 1.1 + t * 0.15;
  } else if (f <= 99) {
    // Returns to interior, room assembling
    const t = (f - 65) / 34;
    camZ = 0.4 - t * 0.15;
    camY = 0.42 * (1 - t) + 0.02; // camera returns down smoothly
    camZoom = 1.25 - t * 0.15;
  } else if (f <= 124) {
    // Macro material shot (extreme cinematic close-up)
    isMacro = true;
    macroProgress = (f - 100) / 24;
    camZoom = 1.8 + Math.sin(macroProgress * Math.PI) * 0.4;
  } else {
    // Wide reveal pulling back, golden hour Antalya light
    const t = (f - 125) / 34;
    camZ = 0.25 - t * 0.35; // pulls backwards
    camY = 0.02 - t * 0.03; // slight upward tilt
    camZoom = 1.1 - t * 0.15; // wide expansive angle
  }

  // Vanishing point and perspective projection setup
  const vpX = width * 0.5;
  const vpY = height * (0.48 - camY * 0.6);

  ctx.save();
  // Apply camera zoom centered at vanishing point
  ctx.translate(vpX, vpY);
  ctx.scale(camZoom, camZoom);
  ctx.translate(-vpX, -vpY);

  if (isMacro) {
    renderMacroMaterials(ctx, width, height, macroProgress, f);
  } else {
    renderArchitecturalScene(ctx, width, height, f, progress, vpX, vpY, showCadOverlay);
  }

  ctx.restore();

  // Subtle cinematic film grain & chromatic vignette
  renderCinematicVignette(ctx, width, height, f);
}

function renderArchitecturalScene(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  frame: number,
  progress: number,
  vpX: number,
  vpY: number,
  showCad: boolean
) {
  // Room corner coordinates in 2D perspective
  // Back wall rectangle
  const backLeft = w * 0.22;
  const backRight = w * 0.78;
  const backTop = h * 0.22;
  const backBottom = h * 0.76;

  // Front boundaries
  const frontLeft = -w * 0.15;
  const frontRight = w * 1.15;
  const frontTop = -h * 0.15;
  const frontBottom = h * 1.15;

  // Lighting parameters
  // Frames 1-20: very dark, subtle ambient
  // Frames 21-40: soft diffuse planning light
  // Frames 41-65: LED ceiling activation (2700K warm white glow)
  // Frames 66-100: layered interior illumination
  // Frames 126-160: glorious golden-hour sun through right window + interior glow
  let ambientLight = 0.12;
  let ledIntensity = 0.0;
  let goldenHour = 0.0;

  if (frame <= 20) {
    ambientLight = 0.12 + (frame / 20) * 0.1;
  } else if (frame <= 40) {
    ambientLight = 0.22 + ((frame - 20) / 20) * 0.18;
  } else if (frame <= 65) {
    ambientLight = 0.4 + ((frame - 40) / 25) * 0.2;
    ledIntensity = Math.min(1, Math.max(0, (frame - 48) / 16)); // LED activates
  } else if (frame <= 100) {
    ambientLight = 0.6 + ((frame - 65) / 35) * 0.15;
    ledIntensity = 1.0;
  } else {
    ambientLight = 0.75 + ((frame - 100) / 60) * 0.25;
    ledIntensity = 1.0;
    if (frame >= 125) {
      goldenHour = Math.min(1, (frame - 125) / 25);
    }
  }

  // 1. BACK WALL (Main Feature TV & Art Wall)
  const backWallGrad = ctx.createLinearGradient(0, backTop, 0, backBottom);
  if (frame < 25) {
    // Bare concrete / raw plaster
    backWallGrad.addColorStop(0, `rgba(32, 34, 38, ${ambientLight * 1.2})`);
    backWallGrad.addColorStop(1, `rgba(18, 20, 23, ${ambientLight})`);
  } else {
    // Refined Venetian plaster + dark smoked oak & bronze
    backWallGrad.addColorStop(0, `rgba(45, 42, 38, ${ambientLight * 1.3})`);
    backWallGrad.addColorStop(1, `rgba(24, 23, 22, ${ambientLight * 1.1})`);
  }
  ctx.fillStyle = backWallGrad;
  ctx.fillRect(backLeft, backTop, backRight - backLeft, backBottom - backTop);

  // 2. CEILING (Stretch Ceiling Canvas)
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(frontLeft, frontTop);
  ctx.lineTo(frontRight, frontTop);
  ctx.lineTo(backRight, backTop);
  ctx.lineTo(backLeft, backTop);
  ctx.closePath();

  // Ceiling surface fill
  const ceilingGrad = ctx.createLinearGradient(vpX, frontTop, vpX, backTop);
  if (frame < 40) {
    // Raw bare concrete slab
    ceilingGrad.addColorStop(0, `rgba(28, 29, 32, ${ambientLight})`);
    ceilingGrad.addColorStop(1, `rgba(14, 15, 17, ${ambientLight * 0.9})`);
    ctx.fillStyle = ceilingGrad;
    ctx.fill();
  } else {
    // Stretch ceiling membrane (Barrisol acoustic satin with concealed LED backlighting)
    const stretchProgress = Math.min(1, (frame - 40) / 25);
    // Satin white/champagne glow
    const r = Math.round(245 * (0.2 + 0.8 * stretchProgress));
    const g = Math.round(238 * (0.2 + 0.8 * stretchProgress));
    const b = Math.round(225 * (0.2 + 0.8 * stretchProgress));
    const alpha = 0.2 + stretchProgress * 0.75;
    
    ceilingGrad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha})`);
    ceilingGrad.addColorStop(0.5, `rgba(${r - 20}, ${g - 20}, ${b - 20}, ${alpha * 0.95})`);
    ceilingGrad.addColorStop(1, `rgba(${r - 40}, ${g - 40}, ${b - 40}, ${alpha * 0.85})`);
    ctx.fillStyle = ceilingGrad;
    ctx.fill();

    // Concealed LED perimeter trough glow
    if (ledIntensity > 0) {
      ctx.shadowColor = 'rgba(235, 205, 150, 0.85)';
      ctx.shadowBlur = 40 * ledIntensity;
      ctx.strokeStyle = `rgba(255, 235, 195, ${0.9 * ledIntensity})`;
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.shadowBlur = 0; // reset
    }
  }
  ctx.restore();

  // 3. FLOOR (Herringbone Parquet / Polished Travertine)
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(frontLeft, frontBottom);
  ctx.lineTo(frontRight, frontBottom);
  ctx.lineTo(backRight, backBottom);
  ctx.lineTo(backLeft, backBottom);
  ctx.closePath();

  const floorGrad = ctx.createLinearGradient(vpX, backBottom, vpX, frontBottom);
  if (frame < 22) {
    // Raw subfloor screed
    floorGrad.addColorStop(0, `rgba(20, 22, 25, ${ambientLight})`);
    floorGrad.addColorStop(1, `rgba(12, 13, 15, ${ambientLight * 0.8})`);
    ctx.fillStyle = floorGrad;
    ctx.fill();
  } else {
    // Finished smoked oak herringbone parquet with subtle glossy reflections
    floorGrad.addColorStop(0, `rgba(38, 30, 24, ${ambientLight * 1.1})`);
    floorGrad.addColorStop(1, `rgba(62, 48, 36, ${ambientLight * 1.3})`);
    ctx.fillStyle = floorGrad;
    ctx.fill();

    // Subtle herringbone reflection lines
    ctx.strokeStyle = `rgba(200, 170, 130, ${0.08 * ambientLight})`;
    ctx.lineWidth = 1;
    const floorH = frontBottom - backBottom;
    for (let i = 0; i < 18; i++) {
      const y = backBottom + (i / 18) * floorH;
      const t = i / 18;
      const xL = backLeft + (frontLeft - backLeft) * t;
      const xR = backRight + (frontRight - backRight) * t;
      ctx.beginPath();
      ctx.moveTo(xL, y);
      ctx.lineTo(xR, y);
      ctx.stroke();
    }
  }
  ctx.restore();

  // 4. LEFT WALL (Architectural Fluted Wood Cladding & Concealed Light Trough)
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(frontLeft, frontTop);
  ctx.lineTo(backLeft, backTop);
  ctx.lineTo(backLeft, backBottom);
  ctx.lineTo(frontLeft, frontBottom);
  ctx.closePath();

  const leftWallGrad = ctx.createLinearGradient(frontLeft, 0, backLeft, 0);
  if (frame < 25) {
    leftWallGrad.addColorStop(0, `rgba(25, 27, 30, ${ambientLight})`);
    leftWallGrad.addColorStop(1, `rgba(16, 17, 20, ${ambientLight * 0.85})`);
    ctx.fillStyle = leftWallGrad;
    ctx.fill();
  } else {
    leftWallGrad.addColorStop(0, `rgba(40, 32, 26, ${ambientLight * 1.2})`);
    leftWallGrad.addColorStop(1, `rgba(28, 22, 18, ${ambientLight})`);
    ctx.fillStyle = leftWallGrad;
    ctx.fill();

    // Fluted architectural slatted panels appearing (Frames 28+)
    if (frame >= 28) {
      const panelAlpha = Math.min(1, (frame - 28) / 20) * 0.25;
      ctx.strokeStyle = `rgba(180, 140, 95, ${panelAlpha})`;
      ctx.lineWidth = 1.5;
      const slats = 22;
      for (let s = 0; s < slats; s++) {
        const factor = s / slats;
        const xT = frontLeft + (backLeft - frontLeft) * factor;
        const yT = frontTop + (backTop - frontTop) * factor;
        const xB = frontLeft + (backLeft - frontLeft) * factor;
        const yB = frontBottom + (backBottom - frontBottom) * factor;
        ctx.beginPath();
        ctx.moveTo(xT, yT);
        ctx.lineTo(xB, yB);
        ctx.stroke();
      }
    }
  }
  ctx.restore();

  // 5. RIGHT WALL: EXPANSIVE FLOOR-TO-CEILING GLASS SLIDERS (Antalya Coastal Horizon View)
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(frontRight, frontTop);
  ctx.lineTo(backRight, backTop);
  ctx.lineTo(backRight, backBottom);
  ctx.lineTo(frontRight, frontBottom);
  ctx.closePath();

  // Beyond the glass: Mediterranean horizon & sky
  const glassGrad = ctx.createLinearGradient(backRight, backTop, frontRight, frontBottom);
  if (frame < 30) {
    // Boarded / unfinished window opening
    glassGrad.addColorStop(0, `rgba(22, 24, 28, ${ambientLight * 0.8})`);
    glassGrad.addColorStop(1, `rgba(12, 14, 16, ${ambientLight * 0.6})`);
  } else {
    // Floor-to-ceiling glass terrace looking over Mediterranean / Mediterranean flora
    if (goldenHour > 0) {
      // Golden hour sunset glow
      glassGrad.addColorStop(0, `rgba(255, 175, 100, ${0.45 * goldenHour + 0.2})`);
      glassGrad.addColorStop(0.4, `rgba(215, 140, 75, ${0.4 * goldenHour + 0.15})`);
      glassGrad.addColorStop(1, `rgba(80, 100, 130, ${0.3 * goldenHour + 0.1})`);
    } else {
      // Crisp architectural daylight
      glassGrad.addColorStop(0, `rgba(140, 165, 195, ${0.35 * ambientLight})`);
      glassGrad.addColorStop(1, `rgba(80, 105, 130, ${0.25 * ambientLight})`);
    }
  }
  ctx.fillStyle = glassGrad;
  ctx.fill();

  // Architectural slimline aluminum glass mullions
  if (frame >= 32) {
    ctx.strokeStyle = `rgba(20, 22, 24, 0.8)`;
    ctx.lineWidth = 3;
    const mullions = 4;
    for (let m = 1; m < mullions; m++) {
      const mf = m / mullions;
      const mxT = backRight + (frontRight - backRight) * mf;
      const myT = backTop + (frontTop - backTop) * mf;
      const mxB = backRight + (frontRight - backRight) * mf;
      const myB = backBottom + (frontBottom - backBottom) * mf;
      ctx.beginPath();
      ctx.moveTo(mxT, myT);
      ctx.lineTo(mxB, myB);
      ctx.stroke();
    }
  }
  ctx.restore();

  // 6. GOLDEN HOUR SUNSHINE SHAFT (Frames 125-160)
  if (goldenHour > 0) {
    ctx.save();
    const sunGrad = ctx.createLinearGradient(frontRight, frontTop, backLeft, frontBottom);
    sunGrad.addColorStop(0, `rgba(255, 205, 120, ${0.38 * goldenHour})`);
    sunGrad.addColorStop(0.5, `rgba(240, 180, 90, ${0.18 * goldenHour})`);
    sunGrad.addColorStop(1, `rgba(220, 150, 60, 0.0)`);
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.moveTo(frontRight * 0.9, frontTop);
    ctx.lineTo(frontRight, frontBottom * 0.85);
    ctx.lineTo(backLeft * 0.9, frontBottom);
    ctx.lineTo(backLeft + (backRight - backLeft) * 0.4, backBottom);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // 7. BESPOKE SUSPENDED TV CONSOLE & MARBLE WALL (Frames 60 - 160)
  if (frame >= 58) {
    const furnProgress = Math.min(1, (frame - 58) / 32);
    renderBespokeTvWall(ctx, backLeft, backRight, backTop, backBottom, furnProgress, ledIntensity);
  }

  // 8. LUXURY ITALIAN MODULAR SOFA & TRAVERTINE COFFEE TABLE (Frames 68 - 160)
  if (frame >= 68) {
    const sofaProgress = Math.min(1, (frame - 68) / 28);
    renderLuxuryFurniture(ctx, w, h, vpX, vpY, sofaProgress, ledIntensity, goldenHour);
  }

  // 9. CEILING CONSTRUCTION HIGHLIGHT (Frames 41-65: Perimeter tracks, laser leveling, LED profile snap)
  if (frame >= 40 && frame <= 68) {
    renderCeilingConstructionStep(ctx, backLeft, backRight, backTop, frontLeft, frontRight, frontTop, frame);
  }

  // 10. TECHNICAL ARCHITECTURAL CAD / BLUEPRINT OVERLAYS (Frames 1-40 or toggle)
  if (showCad || frame <= 38) {
    renderCadWireframeOverlay(ctx, w, h, backLeft, backRight, backTop, backBottom, frontLeft, frontRight, frontTop, frontBottom, frame);
  }
}

function renderCeilingConstructionStep(
  ctx: CanvasRenderingContext2D,
  bL: number, bR: number, bT: number,
  fL: number, fR: number, fT: number,
  frame: number
) {
  const step = (frame - 40) / 28; // 0 to 1

  ctx.save();
  // Laser level line (high-precision green or cyan architectural laser)
  if (step < 0.6) {
    const laserY = bT + (1 - step * 1.5) * 40;
    ctx.strokeStyle = 'rgba(70, 240, 180, 0.7)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([8, 4]);
    ctx.beginPath();
    ctx.moveTo(fL, fT + 120);
    ctx.lineTo(fR, fT + 120);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // Aluminum perimeter profile installation brackets
  const profileAlpha = Math.min(1, step * 2);
  ctx.strokeStyle = `rgba(220, 200, 160, ${profileAlpha})`;
  ctx.lineWidth = 3;
  ctx.strokeRect(bL + 15, bT + 5, (bR - bL) - 30, 18);

  // Tensioning harpoon arrows / membrane stretching vectors
  if (step >= 0.3 && step <= 0.8) {
    ctx.strokeStyle = 'rgba(200, 170, 120, 0.6)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 8; i++) {
      const px = bL + 30 + (i / 7) * (bR - bL - 60);
      ctx.beginPath();
      ctx.moveTo(px, bT + 2);
      ctx.lineTo(px, bT - 15);
      ctx.stroke();
    }
  }
  ctx.restore();
}

function renderBespokeTvWall(
  ctx: CanvasRenderingContext2D,
  bL: number, bR: number, bT: number, bB: number,
  progress: number,
  ledOn: number
) {
  ctx.save();
  const wallW = bR - bL;
  const wallH = bB - bT;

  // TV Wall Panel (Centered on back wall)
  const tvWallW = wallW * 0.68;
  const tvWallH = wallH * 0.72;
  const tvX = bL + (wallW - tvWallW) * 0.5;
  const tvY = bT + wallH * 0.12;

  // Assembly scale/fade
  const scale = 0.85 + 0.15 * progress;
  const alpha = Math.min(1, progress * 1.3);

  ctx.globalAlpha = alpha;
  ctx.translate(tvX + tvWallW / 2, tvY + tvWallH / 2);
  ctx.scale(scale, scale);
  ctx.translate(-(tvX + tvWallW / 2), -(tvY + tvWallH / 2));

  // 1. Backing panel (Bookmatched Calacatta Gold marble slab)
  const marbleGrad = ctx.createLinearGradient(tvX, tvY, tvX + tvWallW, tvY + tvWallH);
  marbleGrad.addColorStop(0, '#1c1c1f');
  marbleGrad.addColorStop(0.5, '#252528');
  marbleGrad.addColorStop(1, '#1a1a1d');
  ctx.fillStyle = marbleGrad;
  ctx.fillRect(tvX, tvY, tvWallW, tvWallH);

  // Marble veining lines (gold & soft grey veins)
  ctx.strokeStyle = 'rgba(215, 185, 145, 0.22)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(tvX + tvWallW * 0.1, tvY);
  ctx.bezierCurveTo(tvX + tvWallW * 0.3, tvY + tvWallH * 0.3, tvX + tvWallW * 0.2, tvY + tvWallH * 0.7, tvX + tvWallW * 0.45, tvY + tvWallH);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(tvX + tvWallW * 0.9, tvY);
  ctx.bezierCurveTo(tvX + tvWallW * 0.7, tvY + tvWallH * 0.3, tvX + tvWallW * 0.8, tvY + tvWallH * 0.7, tvX + tvWallW * 0.55, tvY + tvWallH);
  ctx.stroke();

  // 2. Halo Backlighting around the TV panel (Signature M2 concealed LED)
  if (ledOn > 0) {
    ctx.shadowColor = 'rgba(220, 185, 130, 0.7)';
    ctx.shadowBlur = 25 * ledOn;
    ctx.strokeStyle = `rgba(245, 215, 170, ${0.85 * ledOn})`;
    ctx.lineWidth = 2;
    ctx.strokeRect(tvX, tvY, tvWallW, tvWallH);
    ctx.shadowBlur = 0;
  }

  // 3. Ultra-slim OLED Display mounted flush
  const screenW = tvWallW * 0.58;
  const screenH = tvWallH * 0.54;
  const screenX = tvX + (tvWallW - screenW) * 0.5;
  const screenY = tvY + tvWallH * 0.15;

  ctx.fillStyle = '#060708';
  ctx.fillRect(screenX, screenY, screenW, screenH);
  ctx.strokeStyle = '#222327';
  ctx.lineWidth = 1;
  ctx.strokeRect(screenX, screenY, screenW, screenH);

  // 4. Low-profile floating credenza console (Smoked Oak & bronze trim)
  const credW = tvWallW * 1.12;
  const credH = tvWallH * 0.16;
  const credX = tvX - tvWallW * 0.06;
  const credY = tvY + tvWallH + 6;

  ctx.fillStyle = '#141110';
  ctx.fillRect(credX, credY, credW, credH);

  // Linear bronze reveal on console
  ctx.strokeStyle = '#9c7c4e';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(credX, credY + 2);
  ctx.lineTo(credX + credW, credY + 2);
  ctx.stroke();

  // Linear fireplace / bioethanol warm amber glow under TV
  if (progress > 0.6) {
    const flameAlpha = Math.sin(Date.now() * 0.005) * 0.15 + 0.75;
    const fireGrad = ctx.createLinearGradient(credX + credW * 0.25, credY + 3, credX + credW * 0.75, credY + 3);
    fireGrad.addColorStop(0, 'rgba(255, 120, 40, 0)');
    fireGrad.addColorStop(0.5, `rgba(255, 180, 80, ${flameAlpha})`);
    fireGrad.addColorStop(1, 'rgba(255, 120, 40, 0)');
    ctx.fillStyle = fireGrad;
    ctx.fillRect(credX + credW * 0.25, credY + 2, credW * 0.5, 4);
  }

  ctx.restore();
}

function renderLuxuryFurniture(
  ctx: CanvasRenderingContext2D,
  w: number, h: number,
  vpX: number, vpY: number,
  progress: number,
  ledOn: number,
  goldenHour: number
) {
  ctx.save();
  const alpha = Math.min(1, progress * 1.25);
  ctx.globalAlpha = alpha;

  // 1. Italian Minimalist Low-Profile Modular Sofa (Bouclé fabric / warm oyster tone)
  const sofaW = w * 0.44;
  const sofaH = h * 0.22;
  const sofaX = w * 0.16;
  const sofaY = h * 0.68;

  // Sofa shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
  ctx.beginPath();
  ctx.ellipse(sofaX + sofaW * 0.5, sofaY + sofaH * 0.96, sofaW * 0.52, sofaH * 0.15, 0, 0, Math.PI * 2);
  ctx.fill();

  // Main seating base
  const sofaGrad = ctx.createLinearGradient(sofaX, sofaY, sofaX + sofaW, sofaY + sofaH);
  if (goldenHour > 0) {
    sofaGrad.addColorStop(0, `rgb(${140 + goldenHour * 40}, ${130 + goldenHour * 30}, ${120 + goldenHour * 10})`);
    sofaGrad.addColorStop(1, `rgb(${95 + goldenHour * 30}, ${88 + goldenHour * 20}, ${80 + goldenHour * 10})`);
  } else {
    sofaGrad.addColorStop(0, '#545258');
    sofaGrad.addColorStop(1, '#333136');
  }
  ctx.fillStyle = sofaGrad;
  ctx.beginPath();
  ctx.roundRect(sofaX, sofaY, sofaW, sofaH * 0.85, 8);
  ctx.fill();

  // Sofa cushions definition
  ctx.strokeStyle = 'rgba(20, 20, 22, 0.35)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(sofaX + sofaW * 0.5, sofaY + 4);
  ctx.lineTo(sofaX + sofaW * 0.5, sofaY + sofaH * 0.82);
  ctx.stroke();

  // 2. Sculptural Solid Travertine Coffee Table
  const tableW = w * 0.18;
  const tableH = h * 0.09;
  const tableX = w * 0.44;
  const tableY = h * 0.74;

  // Table shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.beginPath();
  ctx.ellipse(tableX + tableW * 0.5, tableY + tableH * 0.95, tableW * 0.55, tableH * 0.3, 0, 0, Math.PI * 2);
  ctx.fill();

  // Table stone top
  const tableGrad = ctx.createLinearGradient(tableX, tableY, tableX + tableW, tableY + tableH);
  tableGrad.addColorStop(0, '#8c8072');
  tableGrad.addColorStop(0.5, '#aba092');
  tableGrad.addColorStop(1, '#6b6156');
  ctx.fillStyle = tableGrad;
  ctx.beginPath();
  ctx.roundRect(tableX, tableY, tableW, tableH * 0.7, 4);
  ctx.fill();

  // Architectural design book & ceramic bowl on table
  ctx.fillStyle = '#1c1b1a';
  ctx.fillRect(tableX + tableW * 0.2, tableY + tableH * 0.15, tableW * 0.28, tableH * 0.3);
  ctx.strokeStyle = '#c8a97e';
  ctx.lineWidth = 1;
  ctx.strokeRect(tableX + tableW * 0.2, tableY + tableH * 0.15, tableW * 0.28, tableH * 0.3);

  // 3. Sheer Linen Architectural Curtains (Right window frame)
  const curtainX = w * 0.84;
  const curtainW = w * 0.16;
  const curtainGrad = ctx.createLinearGradient(curtainX, 0, curtainX + curtainW, 0);
  curtainGrad.addColorStop(0, 'rgba(220, 210, 195, 0.28)');
  curtainGrad.addColorStop(0.5, 'rgba(245, 238, 225, 0.42)');
  curtainGrad.addColorStop(1, 'rgba(180, 170, 160, 0.18)');
  ctx.fillStyle = curtainGrad;
  ctx.fillRect(curtainX, h * 0.12, curtainW, h * 0.88);

  ctx.restore();
}

function renderMacroMaterials(
  ctx: CanvasRenderingContext2D,
  w: number, h: number,
  macroProgress: number,
  frame: number
) {
  // Cinematic macro photography of stone, brushed bronze, smoked oak and satin stretch membrane
  ctx.save();
  // Macro background (Deep rich textured surface)
  const bgGrad = ctx.createRadialGradient(w * 0.45, h * 0.45, 50, w * 0.5, h * 0.5, w * 0.7);
  bgGrad.addColorStop(0, '#282420');
  bgGrad.addColorStop(0.5, '#161413');
  bgGrad.addColorStop(1, '#0b0a0a');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  // 1. Natural Stone Slab Macro Texture (Calacatta Gold / Grigio Carnico)
  ctx.strokeStyle = 'rgba(212, 175, 118, 0.45)';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(w * 0.1, h * 0.2);
  ctx.bezierCurveTo(w * 0.35, h * 0.4, w * 0.25, h * 0.75, w * 0.6, h * 0.95);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(240, 220, 190, 0.25)';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(w * 0.28, h * 0.45);
  ctx.bezierCurveTo(w * 0.45, h * 0.52, w * 0.52, h * 0.35, w * 0.85, h * 0.3);
  ctx.stroke();

  // 2. Brushed Bronze Inlay / Trim (Reflecting 2700K warm spotlight)
  const bronzeY = h * 0.48;
  const bronzeH = 22;
  const bronzeGrad = ctx.createLinearGradient(0, bronzeY, w, bronzeY + bronzeH);
  bronzeGrad.addColorStop(0, '#5a4225');
  bronzeGrad.addColorStop(0.3, '#c29a63');
  bronzeGrad.addColorStop(0.5, '#ffd899'); // Anisotropic specular highlight
  bronzeGrad.addColorStop(0.7, '#a07842');
  bronzeGrad.addColorStop(1, '#4e381f');
  ctx.fillStyle = bronzeGrad;
  ctx.fillRect(0, bronzeY, w, bronzeH);

  // 3. Stretch Ceiling Micro-Diffuser Texture on top edge
  const ceilGrad = ctx.createLinearGradient(0, 0, 0, h * 0.25);
  ceilGrad.addColorStop(0, 'rgba(255, 248, 235, 0.85)');
  ceilGrad.addColorStop(1, 'rgba(240, 225, 200, 0.0)');
  ctx.fillStyle = ceilGrad;
  ctx.fillRect(0, 0, w, h * 0.25);

  // 4. Subtle macro dust motes / bokeh spheres catching light
  for (let i = 0; i < 9; i++) {
    const bx = w * (0.2 + (i * 0.08) + Math.sin(frame * 0.04 + i) * 0.03);
    const by = h * (0.3 + (i * 0.06) + Math.cos(frame * 0.03 + i) * 0.04);
    const rad = 6 + (i % 4) * 8;
    ctx.fillStyle = 'rgba(235, 205, 150, 0.14)';
    ctx.beginPath();
    ctx.arc(bx, by, rad, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function renderCadWireframeOverlay(
  ctx: CanvasRenderingContext2D,
  w: number, h: number,
  bL: number, bR: number, bT: number, bB: number,
  fL: number, fR: number, fT: number, fB: number,
  frame: number
) {
  // Fade out CAD lines as room finishes (Frames 1-40)
  const cadAlpha = frame <= 20 ? 0.38 : Math.max(0, (40 - frame) / 20 * 0.38);
  if (cadAlpha <= 0.01) return;

  ctx.save();
  ctx.strokeStyle = `rgba(200, 169, 126, ${cadAlpha})`;
  ctx.lineWidth = 1;

  // Major vanishing perspective rays
  ctx.beginPath();
  // Room corner rays
  ctx.moveTo(fL, fT); ctx.lineTo(bL, bT);
  ctx.moveTo(fR, fT); ctx.lineTo(bR, bT);
  ctx.moveTo(bL, bB); ctx.lineTo(fL, fB);
  ctx.moveTo(bR, bB); ctx.lineTo(fR, fB);

  // Back wall perimeter
  ctx.rect(bL, bT, bR - bL, bB - bT);

  // Ceiling grid subdivisions
  for (let i = 1; i <= 3; i++) {
    const t = i / 4;
    ctx.moveTo(bL + (bR - bL) * t, bT);
    ctx.lineTo(fL + (fR - fL) * t, fT);
  }
  ctx.stroke();

  // Dimension annotations and crosshair markers
  ctx.fillStyle = `rgba(200, 169, 126, ${cadAlpha * 0.9})`;
  ctx.font = '10px "Space Grotesk", monospace';
  ctx.fillText('H: 4.20m [AKUSTİK GERGİ TAVAN SİSTEMİ]', bL + 12, bT - 12);
  ctx.fillText('W: 14.80m', bL + (bR - bL) * 0.45, bB + 18);
  ctx.fillText('+0.00 ZEMİN KOTU', bL + 12, bB - 8);

  // Crosshairs
  drawCrosshair(ctx, bL, bT, cadAlpha);
  drawCrosshair(ctx, bR, bT, cadAlpha);
  drawCrosshair(ctx, bL, bB, cadAlpha);
  drawCrosshair(ctx, bR, bB, cadAlpha);

  ctx.restore();
}

function drawCrosshair(ctx: CanvasRenderingContext2D, x: number, y: number, alpha: number) {
  ctx.strokeStyle = `rgba(200, 169, 126, ${alpha})`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x - 8, y); ctx.lineTo(x + 8, y);
  ctx.moveTo(x, y - 8); ctx.lineTo(x, y + 8);
  ctx.stroke();
}

function renderCinematicVignette(ctx: CanvasRenderingContext2D, w: number, h: number, frame: number) {
  // Vignette to keep focus centered and cinematic
  const vignette = ctx.createRadialGradient(w * 0.5, h * 0.5, w * 0.28, w * 0.5, h * 0.5, w * 0.75);
  vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
  vignette.addColorStop(1, 'rgba(5, 6, 8, 0.65)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, w, h);
}
