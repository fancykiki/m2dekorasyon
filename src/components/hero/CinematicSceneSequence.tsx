import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Play, Pause, Compass, ArrowDown, ChevronRight, Layers, Maximize2 } from 'lucide-react';
import { CINEMATIC_SCENES } from '../../data/content';
import { CinematicScene } from '../../types';

interface CinematicSceneSequenceProps {
  onScrollToExplore?: () => void;
}

export const CinematicSceneSequence: React.FC<CinematicSceneSequenceProps> = ({ onScrollToExplore }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // State
  const [activeProgress, setActiveProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTechHUD, setShowTechHUD] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);

  // Animation refs
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  // Image Cache Map: url -> HTMLImageElement
  const imageCacheRef = useRef<Map<string, HTMLImageElement>>(new Map());
  const fallbackImageRef = useRef<HTMLImageElement | null>(null);

  // Collect all unique shot URLs
  const allShots = useMemo(() => {
    const urls: string[] = [];
    CINEMATIC_SCENES.forEach((scene) => {
      scene.shots.forEach((s) => {
        if (!urls.includes(s)) urls.push(s);
      });
    });
    return urls;
  }, []);

  // Preload all assets
  useEffect(() => {
    let cancelled = false;
    let loaded = 0;

    allShots.forEach((url) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = url;
      img.onload = () => {
        if (cancelled) return;
        imageCacheRef.current.set(url, img);
        if (!fallbackImageRef.current) fallbackImageRef.current = img;
        loaded++;
        setLoadedCount(loaded);
      };
      img.onerror = () => {
        console.warn(`Could not load cinematic asset: ${url}`);
      };
    });

    return () => {
      cancelled = true;
    };
  }, [allShots]);

  // Current active scene computation
  const activeSceneIndex = useMemo(() => {
    const p = activeProgress;
    for (let i = 0; i < CINEMATIC_SCENES.length; i++) {
      const scene = CINEMATIC_SCENES[i];
      if (p >= scene.startProgress && p < scene.endProgress) {
        return i;
      }
    }
    return CINEMATIC_SCENES.length - 1;
  }, [activeProgress]);

  const currentScene: CinematicScene = CINEMATIC_SCENES[activeSceneIndex];

  // Helper: Draw image fitted with cover and transformation
  const drawCoverImage = useCallback((
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    cw: number,
    ch: number,
    scale: number = 1.0,
    offsetX: number = 0,
    offsetY: number = 0,
    alpha: number = 1.0
  ) => {
    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(1, alpha));

    const imgAspect = img.width / img.height;
    const canvasAspect = cw / ch;
    let renderW = cw;
    let renderH = ch;

    if (canvasAspect > imgAspect) {
      renderW = cw;
      renderH = cw / imgAspect;
    } else {
      renderH = ch;
      renderW = ch * imgAspect;
    }

    // Apply scale & translation relative to center
    const cx = cw / 2;
    const cy = ch / 2;

    ctx.translate(cx + offsetX, cy + offsetY);
    ctx.scale(scale, scale);
    ctx.drawImage(img, -renderW / 2, -renderH / 2, renderW, renderH);

    ctx.restore();
  }, []);

  // Main Render Loop for the Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Create offscreen canvas if needed
    if (!offscreenCanvasRef.current) {
      offscreenCanvasRef.current = document.createElement('canvas');
    }
    const offscreen = offscreenCanvasRef.current;
    const offCtx = offscreen.getContext('2d');

    const render = () => {
      // Smooth lerp of progress
      const target = targetProgressRef.current;
      const current = currentProgressRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.0001) {
        currentProgressRef.current += diff * 0.08;
      } else {
        currentProgressRef.current = target;
      }

      const p = Math.max(0, Math.min(0.9999, currentProgressRef.current));
      setActiveProgress(p);

      const dpr = window.devicePixelRatio || 1;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        offscreen.width = width * dpr;
        offscreen.height = height * dpr;
      }

      const cw = canvas.width;
      const ch = canvas.height;

      // Find scene and local progress
      let sIdx = 0;
      for (let i = 0; i < CINEMATIC_SCENES.length; i++) {
        if (p >= CINEMATIC_SCENES[i].startProgress && p < CINEMATIC_SCENES[i].endProgress) {
          sIdx = i;
          break;
        }
      }
      if (p >= CINEMATIC_SCENES[CINEMATIC_SCENES.length - 1].startProgress) {
        sIdx = CINEMATIC_SCENES.length - 1;
      }

      const scene = CINEMATIC_SCENES[sIdx];
      const nextScene = CINEMATIC_SCENES[Math.min(CINEMATIC_SCENES.length - 1, sIdx + 1)];
      const sceneLen = scene.endProgress - scene.startProgress;
      const localT = Math.max(0, Math.min(1, (p - scene.startProgress) / (sceneLen || 0.01)));

      // Transition zone: last 25% of scene
      const transitionThreshold = 0.75;
      const inTransition = localT > transitionThreshold && sIdx < CINEMATIC_SCENES.length - 1;
      const transT = inTransition ? (localT - transitionThreshold) / (1 - transitionThreshold) : 0;

      // Images for current scene
      const img1 = imageCacheRef.current.get(scene.shots[0]) || fallbackImageRef.current;
      const img2 = scene.shots[1] ? imageCacheRef.current.get(scene.shots[1]) || img1 : img1;

      // Next scene image
      const nextImg = imageCacheRef.current.get(nextScene.shots[0]) || img2;

      // 1. BASE BACKGROUND FILL
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, cw, ch);

      if (img1) {
        // SCENE-SPECIFIC CAMERA & TRANSITION LOGIC
        switch (scene.id) {
          case 'scene-01': {
            // THE EMPTY SPACE: Camera pushes forward toward the floor plane
            // scale 1.0 -> 1.18, subtle tilt down
            const camScale = 1.0 + localT * 0.18;
            const camY = localT * (ch * 0.08);

            // Sub-blend between shot-01 and shot-02 inside scene-01
            const shotBlend = Math.min(1, Math.max(0, (localT - 0.35) / 0.5));
            drawCoverImage(ctx, img1, cw, ch, camScale, 0, camY, 1.0);
            if (img2 && shotBlend > 0) {
              drawCoverImage(ctx, img2, cw, ch, camScale, 0, camY, shotBlend);
            }

            // TRANSITION to Scene 02: camera-push-floor
            // Architectural blueprint laser line cuts in from bottom
            if (inTransition && nextImg) {
              const wipeY = ch * (1 - transT);

              ctx.save();
              ctx.beginPath();
              ctx.rect(0, wipeY, cw, ch - wipeY);
              ctx.clip();
              drawCoverImage(ctx, nextImg, cw, ch, 1.05 - transT * 0.05, 0, 0, 1.0);

              // Glowing laser beam at transition front
              ctx.strokeStyle = '#F27D26';
              ctx.lineWidth = 3 * dpr;
              ctx.shadowColor = '#F27D26';
              ctx.shadowBlur = 15;
              ctx.beginPath();
              ctx.moveTo(0, wipeY);
              ctx.lineTo(cw, wipeY);
              ctx.stroke();
              ctx.restore();
            }
            break;
          }

          case 'scene-02': {
            // THE VISION: Architectural blueprint to real edges
            const camScale = 1.05 - localT * 0.05;
            drawCoverImage(ctx, img1, cw, ch, camScale, 0, 0, 1.0);

            // Shot-02 is blueprint overlaying physical room geometry
            if (img2) {
              const overlayAlpha = Math.min(1, Math.max(0, (localT - 0.2) / 0.6));
              drawCoverImage(ctx, img2, cw, ch, camScale, 0, 0, overlayAlpha);
            }

            // Procedural CAD Grid & Dimension Annotations
            ctx.save();
            ctx.strokeStyle = 'rgba(242, 125, 38, 0.45)';
            ctx.lineWidth = 1 * dpr;

            // Perspective vanishing line
            const horizonY = ch * 0.45;
            ctx.beginPath();
            ctx.moveTo(0, horizonY);
            ctx.lineTo(cw, horizonY);
            ctx.stroke();

            // Elevation crosshairs
            const crossX = cw * (0.3 + localT * 0.1);
            const crossY = ch * 0.55;
            ctx.beginPath();
            ctx.arc(crossX, crossY, 20 * dpr, 0, Math.PI * 2);
            ctx.moveTo(crossX - 30 * dpr, crossY);
            ctx.lineTo(crossX + 30 * dpr, crossY);
            ctx.moveTo(crossX, crossY - 30 * dpr);
            ctx.lineTo(crossX, crossY + 30 * dpr);
            ctx.stroke();

            ctx.font = `${11 * dpr}px monospace`;
            ctx.fillStyle = 'rgba(242, 125, 38, 0.85)';
            ctx.fillText(`ZONE 01: SALON + GERGİ TAVAN (KOT ±0.000)`, crossX + 25 * dpr, crossY - 10);
            ctx.fillText(`MATERIAL NOTE: HONED TRAVERTINE // WALNUT`, crossX + 25 * dpr, crossY + 15);
            ctx.restore();

            // TRANSITION to Scene 03: Macro Zoom-in on material note
            if (inTransition && nextImg) {
              const zoomScale = 1.0 + transT * 1.5;
              ctx.save();
              ctx.globalAlpha = transT;
              drawCoverImage(ctx, nextImg, cw, ch, zoomScale, 0, 0, transT);
              ctx.restore();
            }
            break;
          }

          case 'scene-03': {
            // MATERIAL: Macro shallow depth of field drift
            // Pan smoothly across texture surface
            const panX = (localT - 0.5) * (cw * 0.08);
            const camScale = 1.08 + Math.sin(localT * Math.PI) * 0.06;

            const shotBlend = Math.min(1, Math.max(0, (localT - 0.4) / 0.5));
            drawCoverImage(ctx, img1, cw, ch, camScale, panX, 0, 1.0);
            if (img2 && shotBlend > 0) {
              drawCoverImage(ctx, img2, cw, ch, camScale, -panX, 0, shotBlend);
            }

            // Cinematic vignette for macro depth
            const grad = ctx.createRadialGradient(cw / 2, ch / 2, cw * 0.25, cw / 2, ch / 2, cw * 0.7);
            grad.addColorStop(0, 'rgba(0,0,0,0)');
            grad.addColorStop(1, 'rgba(0,0,0,0.6)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, cw, ch);

            // TRANSITION to Scene 04: Macro expand & pull back to ceiling
            if (inTransition && nextImg) {
              const pullScale = 1.3 - transT * 0.3;
              const angle = transT * (Math.PI / 18);

              ctx.save();
              ctx.translate(cw / 2, ch / 2);
              ctx.rotate(-angle);
              ctx.translate(-cw / 2, -ch / 2);
              drawCoverImage(ctx, nextImg, cw, ch, pullScale, 0, (1 - transT) * ch * 0.3, transT);
              ctx.restore();
            }
            break;
          }

          case 'scene-04': {
            // THE CEILING: Looking upward at perimeter profile & tensioned membrane
            const tiltY = (0.5 - localT) * (ch * 0.12);
            const camScale = 1.02 + localT * 0.06;

            const shotBlend = Math.min(1, Math.max(0, (localT - 0.3) / 0.5));
            drawCoverImage(ctx, img1, cw, ch, camScale, 0, tiltY, 1.0);
            if (img2 && shotBlend > 0) {
              drawCoverImage(ctx, img2, cw, ch, camScale, 0, tiltY, shotBlend);
            }

            // TRANSITION to Scene 05: Following ceiling line into darkness
            if (inTransition && nextImg) {
              // Dim the current scene down to pitch dark
              const darkness = transT * 0.9;
              ctx.fillStyle = `rgba(5, 5, 5, ${darkness})`;
              ctx.fillRect(0, 0, cw, ch);

              // Next scene begins to awaken in the dark
              drawCoverImage(ctx, nextImg, cw, ch, 1.0, 0, 0, transT * 0.75);
            }
            break;
          }

          case 'scene-05': {
            // LIGHT: Dark interior, concealed LED ignites, full system wakes up
            const camScale = 1.0 + localT * 0.04;
            drawCoverImage(ctx, img1, cw, ch, camScale, 0, 0, 1.0);

            // Secondary shot: entire ceiling & lighting fully active
            if (img2) {
              const lightIgnite = Math.min(1, Math.max(0, (localT - 0.25) / 0.6));
              drawCoverImage(ctx, img2, cw, ch, camScale, 0, 0, lightIgnite);
            }

            // Glowing light-wipe beam along the ceiling cove
            const beamProgress = Math.min(1, localT * 1.6);
            if (beamProgress < 1.0) {
              ctx.save();
              const beamX = cw * beamProgress;
              const beamGrad = ctx.createLinearGradient(beamX - 150 * dpr, 0, beamX + 150 * dpr, 0);
              beamGrad.addColorStop(0, 'rgba(242, 125, 38, 0)');
              beamGrad.addColorStop(0.5, 'rgba(255, 235, 190, 0.85)');
              beamGrad.addColorStop(1, 'rgba(242, 125, 38, 0)');

              ctx.fillStyle = beamGrad;
              ctx.fillRect(0, 0, cw, ch * 0.15);
              ctx.restore();
            }

            // TRANSITION to Scene 06: Diagonal light wipe into craft details
            if (inTransition && nextImg) {
              ctx.save();
              const wipeAngle = Math.PI / 4;
              const dist = (cw + ch) * transT;

              ctx.beginPath();
              ctx.moveTo(-ch, 0);
              ctx.lineTo(dist, 0);
              ctx.lineTo(dist - ch, ch);
              ctx.lineTo(-ch, ch);
              ctx.closePath();
              ctx.clip();

              drawCoverImage(ctx, nextImg, cw, ch, 1.05 - transT * 0.05, 0, 0, 1.0);

              // Light sweep highlight line
              ctx.strokeStyle = 'rgba(255, 240, 210, 0.9)';
              ctx.lineWidth = 4 * dpr;
              ctx.shadowColor = '#F27D26';
              ctx.shadowBlur = 20;
              ctx.beginPath();
              ctx.moveTo(dist, 0);
              ctx.lineTo(dist - ch, ch);
              ctx.stroke();

              ctx.restore();
            }
            break;
          }

          case 'scene-06': {
            // THE DETAIL: Craftsmanship, wood grain, stone miter junction
            const driftX = (0.5 - localT) * (cw * 0.05);
            const driftY = (localT - 0.5) * (ch * 0.04);
            const camScale = 1.06 + Math.sin(localT * Math.PI) * 0.04;

            const shotBlend = Math.min(1, Math.max(0, (localT - 0.4) / 0.5));
            drawCoverImage(ctx, img1, cw, ch, camScale, driftX, driftY, 1.0);
            if (img2 && shotBlend > 0) {
              drawCoverImage(ctx, img2, cw, ch, camScale, -driftX, -driftY, shotBlend);
            }

            // TRANSITION to Scene 07: Camera pulls back, revealing whole room
            if (inTransition && nextImg) {
              const pullScale = 1.2 - transT * 0.2;
              drawCoverImage(ctx, nextImg, cw, ch, pullScale, 0, 0, transT);
            }
            break;
          }

          case 'scene-07': {
            // THE INTERIOR: Complete finished living room reveal & slow dolly
            const dollyScale = 1.0 + localT * 0.09;
            const dollyY = -localT * (ch * 0.04);

            const shotBlend = Math.min(1, Math.max(0, (localT - 0.4) / 0.5));
            drawCoverImage(ctx, img1, cw, ch, dollyScale, 0, dollyY, 1.0);
            if (img2 && shotBlend > 0) {
              drawCoverImage(ctx, img2, cw, ch, dollyScale, 0, dollyY, shotBlend);
            }

            // TRANSITION to Scene 08: Directional lateral room pan to kitchen
            if (inTransition && nextImg) {
              const panOffset = -transT * cw;

              // Slide current scene left
              ctx.save();
              ctx.translate(panOffset, 0);
              drawCoverImage(ctx, img1, cw, ch, dollyScale, 0, dollyY, 1.0 - transT * 0.5);

              // Slide next scene from right
              ctx.translate(cw, 0);
              drawCoverImage(ctx, nextImg, cw, ch, 1.05 - transT * 0.05, 0, 0, 1.0);
              ctx.restore();
            }
            break;
          }

          case 'scene-08': {
            // THE LIFESTYLE: Connected dining pavilion & kitchen of same villa
            const camScale = 1.03 + Math.sin(localT * Math.PI) * 0.05;
            const panX = (localT - 0.5) * (cw * 0.04);

            const shotBlend = Math.min(1, Math.max(0, (localT - 0.35) / 0.5));
            drawCoverImage(ctx, img1, cw, ch, camScale, panX, 0, 1.0);
            if (img2 && shotBlend > 0) {
              drawCoverImage(ctx, img2, cw, ch, camScale, -panX, 0, shotBlend);
            }

            // TRANSITION to Scene 09: Warm golden hour wash
            if (inTransition && nextImg) {
              // Warm golden sweep
              drawCoverImage(ctx, nextImg, cw, ch, 1.0 + (1 - transT) * 0.05, 0, 0, transT);

              const goldenWash = ctx.createLinearGradient(cw, 0, 0, ch);
              goldenWash.addColorStop(0, `rgba(255, 175, 75, ${transT * 0.45})`);
              goldenWash.addColorStop(1, 'rgba(0,0,0,0)');
              ctx.fillStyle = goldenWash;
              ctx.fillRect(0, 0, cw, ch);
            }
            break;
          }

          case 'scene-09': {
            // GOLDEN HOUR: Mediterranean sunset pouring into windows
            const camScale = 1.05 - localT * 0.04;
            const shotBlend = Math.min(1, Math.max(0, (localT - 0.35) / 0.5));

            drawCoverImage(ctx, img1, cw, ch, camScale, 0, 0, 1.0);
            if (img2 && shotBlend > 0) {
              drawCoverImage(ctx, img2, cw, ch, camScale, 0, 0, shotBlend);
            }

            // Warm amber atmosphere overlay
            const sunsetGrad = ctx.createRadialGradient(cw * 0.8, ch * 0.3, 50, cw * 0.8, ch * 0.3, cw * 0.9);
            sunsetGrad.addColorStop(0, 'rgba(255, 160, 60, 0.25)');
            sunsetGrad.addColorStop(0.6, 'rgba(242, 125, 38, 0.10)');
            sunsetGrad.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = sunsetGrad;
            ctx.fillRect(0, 0, cw, ch);

            // TRANSITION to Scene 10: Twilight night reveal
            if (inTransition && nextImg) {
              // Sky darkens from amber to twilight indigo
              drawCoverImage(ctx, nextImg, cw, ch, 1.0, 0, 0, transT);
            }
            break;
          }

          case 'scene-10':
          default: {
            // FINAL HERO: Glowing villa exterior & master living interior at dusk
            const camScale = 1.02 + Math.sin(localT * Math.PI) * 0.03;
            const shotBlend = Math.min(1, Math.max(0, (localT - 0.4) / 0.5));

            drawCoverImage(ctx, img1, cw, ch, camScale, 0, 0, 1.0);
            if (img2 && shotBlend > 0) {
              drawCoverImage(ctx, img2, cw, ch, camScale, 0, 0, shotBlend);
            }

            // Cinematic warm glow from inside
            const heroGlow = ctx.createRadialGradient(cw * 0.5, ch * 0.55, 100, cw * 0.5, ch * 0.55, cw * 0.7);
            heroGlow.addColorStop(0, 'rgba(242, 125, 38, 0.12)');
            heroGlow.addColorStop(1, 'rgba(0,0,0,0.4)');
            ctx.fillStyle = heroGlow;
            ctx.fillRect(0, 0, cw, ch);
            break;
          }
        }
      }

      // 2. ARCHITECTURAL HUD OVERLAYS (When enabled)
      if (showTechHUD) {
        ctx.save();
        // Subtle corner viewfinders
        const vfSize = 16 * dpr;
        const pad = 24 * dpr;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.lineWidth = 1 * dpr;

        // Top Left
        ctx.beginPath();
        ctx.moveTo(pad, pad + vfSize);
        ctx.lineTo(pad, pad);
        ctx.lineTo(pad + vfSize, pad);
        ctx.stroke();

        // Top Right
        ctx.beginPath();
        ctx.moveTo(cw - pad - vfSize, pad);
        ctx.lineTo(cw - pad, pad);
        ctx.lineTo(cw - pad, pad + vfSize);
        ctx.stroke();

        // Bottom Left
        ctx.beginPath();
        ctx.moveTo(pad, ch - pad - vfSize);
        ctx.lineTo(pad, ch - pad);
        ctx.lineTo(pad + vfSize, ch - pad);
        ctx.stroke();

        // Bottom Right
        ctx.beginPath();
        ctx.moveTo(cw - pad - vfSize, ch - pad);
        ctx.lineTo(cw - pad, ch - pad);
        ctx.lineTo(cw - pad, ch - pad - vfSize);
        ctx.stroke();

        // Horizon level guide on left
        const midY = ch * 0.5;
        ctx.strokeStyle = 'rgba(242, 125, 38, 0.4)';
        ctx.beginPath();
        ctx.moveTo(pad, midY);
        ctx.lineTo(pad + 12 * dpr, midY);
        ctx.stroke();

        ctx.font = `${9 * dpr}px monospace`;
        ctx.fillStyle = 'rgba(242, 125, 38, 0.75)';
        ctx.fillText(`±0.000 DATUM`, pad + 16 * dpr, midY + 3 * dpr);

        ctx.restore();
      }

      rafIdRef.current = requestAnimationFrame(render);
    };

    rafIdRef.current = requestAnimationFrame(render);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [drawCoverImage, showTechHUD]);

  // Handle Wheel / Scroll mapped to 0..1 progress
  useEffect(() => {
    const handleScroll = () => {
      if (isPlaying) return;
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const elemTop = scrollY + rect.top;
      const totalScrollDistance = rect.height - window.innerHeight;

      if (totalScrollDistance > 0) {
        const scrolled = Math.max(0, scrollY - elemTop);
        const progress = Math.min(0.9999, Math.max(0, scrolled / totalScrollDistance));
        targetProgressRef.current = progress;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isPlaying]);

  // Autoplay Film Mode
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      const nextProgress = targetProgressRef.current + 0.0035;
      if (nextProgress >= 0.999) {
        targetProgressRef.current = 0;
      } else {
        targetProgressRef.current = nextProgress;
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Jump to specific scene chapter
  const handleChapterClick = (scene: CinematicScene) => {
    setIsPlaying(false);
    targetProgressRef.current = scene.startProgress + 0.01;

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const elemTop = scrollY + rect.top;
      const totalScrollDistance = rect.height - window.innerHeight;
      const targetScrollY = elemTop + (scene.startProgress + 0.01) * totalScrollDistance;

      window.scrollTo({
        top: targetScrollY,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[850vh] bg-[#050505] text-[#F5F5F5] select-none"
      id="making-of-space"
    >
      {/* Sticky Fullscreen Cinematic Canvas Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Background WebGL / 2D Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />

        {/* Cinematic Letterbox & Atmosphere Gradient */}
        <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-t from-black/80 via-transparent to-black/60" />

        {/* TOP CINEMATIC HEADER BAR */}
        <header className="relative z-20 w-full px-6 sm:px-12 pt-6 sm:pt-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-2.5 h-2.5 rounded-full bg-[#F27D26] animate-pulse shadow-[0_0_12px_#F27D26]" />
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-white">
                THE MAKING OF A SPACE
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#F27D26] uppercase opacity-90">
                SCENE {currentScene.number} // {currentScene.title}
              </span>
            </div>
          </div>

          {/* Controls Cluster */}
          <div className="flex items-center gap-3">
            {/* Film Mode Toggle */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 border backdrop-blur-md ${
                isPlaying
                  ? 'bg-[#F27D26] text-black border-[#F27D26] font-bold shadow-[0_0_20px_rgba(242,125,38,0.5)]'
                  : 'bg-black/50 text-white/80 border-white/20 hover:border-[#F27D26] hover:text-white'
              }`}
              title={isPlaying ? 'Pause film' : 'Play film autoplay'}
            >
              {isPlaying ? <Pause size={13} /> : <Play size={13} className="ml-0.5" />}
              <span className="hidden sm:inline">{isPlaying ? 'DURDUR' : 'FİLM MODU'}</span>
            </button>

            {/* CAD HUD Toggle */}
            <button
              onClick={() => setShowTechHUD(!showTechHUD)}
              className={`p-2 rounded-full border text-xs transition-all backdrop-blur-md ${
                showTechHUD
                  ? 'bg-white/15 border-white/40 text-[#F27D26]'
                  : 'bg-black/40 border-white/10 text-white/40 hover:text-white'
              }`}
              title="Toggle Architectural Viewfinder"
            >
              <Compass size={14} />
            </button>
          </div>
        </header>

        {/* CENTER / FLOATING EDITORIAL TYPOGRAPHY */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 flex-1 flex flex-col justify-center pointer-events-none">
          <div className="max-w-3xl">
            {/* Scene Index & Category Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-md mb-4 text-[10px] sm:text-xs font-mono tracking-widest uppercase text-[#F27D26]">
              <span>CHAPTER {currentScene.number}</span>
              <span className="text-white/30">/</span>
              <span className="text-white/80 font-sans">{currentScene.primaryMaterial}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.92] text-white drop-shadow-[0_4px_32px_rgba(0,0,0,0.9)] whitespace-pre-line mb-4">
              {currentScene.headline}
            </h1>

            {/* Subheadline / Category Tag */}
            <h2 className="text-xs sm:text-sm md:text-base font-mono tracking-[0.25em] uppercase text-[#F27D26] mb-4">
              {currentScene.subheadline}
            </h2>

            {/* Caption & Tech Notes */}
            <p className="text-sm sm:text-base md:text-lg text-white/85 font-light leading-relaxed max-w-2xl drop-shadow-md mb-4">
              {currentScene.caption}
            </p>

            {/* Architectural Camera Spec */}
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-[#F27D26]/90 bg-black/40 px-3 py-1.5 rounded border border-[#F27D26]/20 backdrop-blur-sm w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F27D26]" />
              <span>{currentScene.techDetails}</span>
            </div>

            {/* Special CTA on Scene 10 */}
            {activeSceneIndex === CINEMATIC_SCENES.length - 1 && (
              <div className="mt-8 pointer-events-auto">
                <button
                  onClick={onScrollToExplore}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#F27D26] text-black font-bold uppercase tracking-widest text-xs sm:text-sm hover:bg-white transition-all shadow-[0_0_30px_rgba(242,125,38,0.6)] hover:scale-105 active:scale-95"
                >
                  <span>PROJELERİ KEŞFET</span>
                  <ArrowDown size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM NARRATIVE CHAPTER SCRUBBER */}
        <footer className="relative z-20 w-full px-4 sm:px-12 pb-6 sm:pb-8">
          <div className="bg-black/75 border border-white/15 backdrop-blur-xl rounded-2xl p-3 sm:p-4 max-w-6xl mx-auto shadow-2xl">
            {/* Active Progress Bar */}
            <div className="relative w-full h-1 bg-white/10 rounded-full overflow-hidden mb-3">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#F27D26] to-[#FFE2B8] transition-all duration-75"
                style={{ width: `${activeProgress * 100}%` }}
              />
            </div>

            {/* Chapter Buttons Grid (10 Distinct Scenes) */}
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 sm:gap-2">
              {CINEMATIC_SCENES.map((sc, idx) => {
                const isActive = idx === activeSceneIndex;
                const isPassed = activeProgress >= sc.endProgress;

                return (
                  <button
                    key={sc.id}
                    onClick={() => handleChapterClick(sc)}
                    className={`flex flex-col text-left p-1.5 sm:p-2 rounded-lg transition-all duration-200 border ${
                      isActive
                        ? 'bg-white/15 border-[#F27D26] text-white shadow-[0_0_15px_rgba(242,125,38,0.3)]'
                        : isPassed
                        ? 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                        : 'bg-transparent border-transparent text-white/40 hover:text-white/80 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`text-[9px] font-mono ${isActive ? 'text-[#F27D26] font-bold' : ''}`}>
                        {sc.number}
                      </span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F27D26] animate-ping" />
                      )}
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-medium tracking-tight truncate w-full mt-0.5 hidden sm:block">
                      {sc.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Status Ticker */}
            <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-white/50 pt-2.5 border-t border-white/10 mt-2">
              <div className="flex items-center gap-3">
                <span className="text-[#F27D26]">M2 ANTALYA VİLLA // 4K CINEMATIC MASTER</span>
                <span className="hidden md:inline text-white/30">|</span>
                <span className="hidden md:inline text-white/60">
                  TRANSITION: {currentScene.transitionType.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>SCROLL OR PLAY TO ADVANCE</span>
                <ChevronRight size={11} className="text-[#F27D26]" />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CinematicSceneSequence;
