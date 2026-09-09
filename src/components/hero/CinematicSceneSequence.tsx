import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Play, Pause, Compass, ArrowDown, ChevronRight } from 'lucide-react';
import { CINEMATIC_SCENES } from '../../data/content';
import { CinematicScene } from '../../types';

interface CinematicSceneSequenceProps {
  onScrollToExplore?: () => void;
}

const FRAME_COUNT = CINEMATIC_SCENES.length;
const LAST = FRAME_COUNT - 1;

/** Smoothstep easing for the cross-dissolve between two frames. */
const ease = (t: number) => t * t * (3 - 2 * t);

export const CinematicSceneSequence: React.FC<CinematicSceneSequenceProps> = ({ onScrollToExplore }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // State
  const [activeProgress, setActiveProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTechHUD, setShowTechHUD] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);

  // Animation refs
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const reportedProgressRef = useRef(-1);
  const rafIdRef = useRef<number | null>(null);

  // Image cache: src -> HTMLImageElement
  const imageCacheRef = useRef<Map<string, HTMLImageElement>>(new Map());
  const fallbackImageRef = useRef<HTMLImageElement | null>(null);

  const frames = useMemo(() => CINEMATIC_SCENES.map((s) => s.src), []);

  // Preload every frame once
  useEffect(() => {
    let cancelled = false;
    let loaded = 0;

    frames.forEach((src) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = src;
      img.onload = () => {
        if (cancelled) return;
        imageCacheRef.current.set(src, img);
        if (!fallbackImageRef.current) fallbackImageRef.current = img;
        loaded++;
        setLoadedCount(loaded);
      };
      img.onerror = () => console.warn(`Could not load hero frame: ${src}`);
    });

    return () => {
      cancelled = true;
    };
  }, [frames]);

  // Nearest frame index for the typography / chapter UI
  const activeSceneIndex = useMemo(
    () => Math.max(0, Math.min(LAST, Math.round(activeProgress * LAST))),
    [activeProgress]
  );
  const currentScene: CinematicScene = CINEMATIC_SCENES[activeSceneIndex];

  // Draw an image with cover-fit + uniform scale + offset + alpha
  const drawCoverImage = useCallback((
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    cw: number,
    ch: number,
    scale = 1,
    offsetX = 0,
    offsetY = 0,
    alpha = 1
  ) => {
    if (!img || !img.width) return;
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

    ctx.translate(cw / 2 + offsetX, ch / 2 + offsetY);
    ctx.scale(scale, scale);
    ctx.drawImage(img, -renderW / 2, -renderH / 2, renderW, renderH);
    ctx.restore();
  }, []);

  // Render loop: one continuous dolly through the frame sequence
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const render = () => {
      // Smooth follow of the scroll target
      const target = targetProgressRef.current;
      const diff = target - currentProgressRef.current;
      currentProgressRef.current += Math.abs(diff) > 0.0001 ? diff * 0.09 : diff;

      const p = Math.max(0, Math.min(1, currentProgressRef.current));
      if (Math.abs(p - reportedProgressRef.current) > 0.003) {
        reportedProgressRef.current = p;
        setActiveProgress(p);
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
      }
      const cw = canvas.width;
      const ch = canvas.height;

      // Position within the sequence
      const fpos = p * LAST;
      const i = Math.max(0, Math.min(LAST - 1, Math.floor(fpos)));
      const blend = ease(Math.max(0, Math.min(1, fpos - i)));

      const imgA = imageCacheRef.current.get(frames[i]) || fallbackImageRef.current;
      const imgB = imageCacheRef.current.get(frames[i + 1]) || imgA;

      // One slow push-in across the whole scroll + a gentle vertical drift
      const camScale = 1.06 + p * 0.12;
      const camY = (p - 0.5) * ch * 0.035;

      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, cw, ch);

      if (imgA) drawCoverImage(ctx, imgA, cw, ch, camScale, 0, camY, 1);
      if (imgB && blend > 0) drawCoverImage(ctx, imgB, cw, ch, camScale, 0, camY, blend);

      // Constant cinematic vignette for depth
      const grad = ctx.createRadialGradient(cw / 2, ch * 0.46, cw * 0.28, cw / 2, ch / 2, cw * 0.72);
      grad.addColorStop(0, 'rgba(0,0,0,0)');
      grad.addColorStop(1, 'rgba(0,0,0,0.55)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, cw, ch);

      // Architectural viewfinder HUD
      if (showTechHUD) {
        ctx.save();
        const vf = 16 * dpr;
        const pad = 24 * dpr;
        ctx.strokeStyle = 'rgba(255,255,255,0.25)';
        ctx.lineWidth = 1 * dpr;
        ctx.beginPath();
        ctx.moveTo(pad, pad + vf); ctx.lineTo(pad, pad); ctx.lineTo(pad + vf, pad);
        ctx.moveTo(cw - pad - vf, pad); ctx.lineTo(cw - pad, pad); ctx.lineTo(cw - pad, pad + vf);
        ctx.moveTo(pad, ch - pad - vf); ctx.lineTo(pad, ch - pad); ctx.lineTo(pad + vf, ch - pad);
        ctx.moveTo(cw - pad - vf, ch - pad); ctx.lineTo(cw - pad, ch - pad); ctx.lineTo(cw - pad, ch - pad - vf);
        ctx.stroke();

        const midY = ch * 0.5;
        ctx.strokeStyle = 'rgba(242,125,38,0.4)';
        ctx.beginPath();
        ctx.moveTo(pad, midY); ctx.lineTo(pad + 12 * dpr, midY);
        ctx.stroke();
        ctx.font = `${9 * dpr}px monospace`;
        ctx.fillStyle = 'rgba(242,125,38,0.75)';
        ctx.fillText('±0.000 DATUM', pad + 16 * dpr, midY + 3 * dpr);
        ctx.restore();
      }

      rafIdRef.current = requestAnimationFrame(render);
    };

    rafIdRef.current = requestAnimationFrame(render);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [drawCoverImage, showTechHUD, frames]);

  // Map scroll position over the tall container to 0..1 progress
  useEffect(() => {
    const handleScroll = () => {
      if (isPlaying || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const elemTop = window.scrollY + rect.top;
      const totalScrollDistance = rect.height - window.innerHeight;
      if (totalScrollDistance > 0) {
        const scrolled = Math.max(0, window.scrollY - elemTop);
        targetProgressRef.current = Math.min(1, Math.max(0, scrolled / totalScrollDistance));
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isPlaying]);

  // Film mode: auto-advance
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      const next = targetProgressRef.current + 0.0032;
      targetProgressRef.current = next >= 1 ? 0 : next;
    }, 50);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Jump to a chapter
  const handleChapterClick = (idx: number) => {
    setIsPlaying(false);
    const targetP = idx / LAST;
    targetProgressRef.current = Math.min(0.999, Math.max(0, targetP));

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const elemTop = window.scrollY + rect.top;
      const totalScrollDistance = rect.height - window.innerHeight;
      window.scrollTo({ top: elemTop + targetP * totalScrollDistance, behavior: 'smooth' });
    }
  };

  const loadPct = Math.round((loadedCount / FRAME_COUNT) * 100);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[650vh] bg-[#050505] text-[#F5F5F5] select-none"
      id="making-of-space"
    >
      {/* Sticky fullscreen cinematic viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />

        {/* Letterbox / atmosphere */}
        <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-t from-black/80 via-transparent to-black/50" />

        {/* Loading veil */}
        {loadedCount < FRAME_COUNT && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#050505] text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#F27D26] animate-pulse shadow-[0_0_12px_#F27D26]" />
              <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-white/70">
                MASTER SEKANS YÜKLENİYOR · {loadPct}%
              </span>
            </div>
          </div>
        )}

        {/* Top header bar */}
        <header className="relative z-20 w-full px-6 sm:px-12 pt-6 sm:pt-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-2.5 h-2.5 rounded-full bg-[#F27D26] animate-pulse shadow-[0_0_12px_#F27D26]" />
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-white">
                THE MAKING OF A SPACE
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#F27D26] uppercase opacity-90">
                FRAME {currentScene.number} / {String(FRAME_COUNT).padStart(2, '0')} // {currentScene.title}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 border backdrop-blur-md ${
                isPlaying
                  ? 'bg-[#F27D26] text-black border-[#F27D26] font-bold shadow-[0_0_20px_rgba(242,125,38,0.5)]'
                  : 'bg-black/50 text-white/80 border-white/20 hover:border-[#F27D26] hover:text-white'
              }`}
              title={isPlaying ? 'Durdur' : 'Film modu'}
            >
              {isPlaying ? <Pause size={13} /> : <Play size={13} className="ml-0.5" />}
              <span className="hidden sm:inline">{isPlaying ? 'DURDUR' : 'FİLM MODU'}</span>
            </button>

            <button
              onClick={() => setShowTechHUD(!showTechHUD)}
              className={`p-2 rounded-full border text-xs transition-all backdrop-blur-md ${
                showTechHUD
                  ? 'bg-white/15 border-white/40 text-[#F27D26]'
                  : 'bg-black/40 border-white/10 text-white/40 hover:text-white'
              }`}
              title="Mimari vizör"
            >
              <Compass size={14} />
            </button>
          </div>
        </header>

        {/* Center editorial typography */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 flex-1 flex flex-col justify-center pointer-events-none">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-md mb-4 text-[10px] sm:text-xs font-mono tracking-widest uppercase text-[#F27D26]">
              <span>CHAPTER {currentScene.number}</span>
              <span className="text-white/30">/</span>
              <span className="text-white/80 font-sans">{currentScene.primaryMaterial}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.92] text-white drop-shadow-[0_4px_32px_rgba(0,0,0,0.9)] whitespace-pre-line mb-4">
              {currentScene.headline}
            </h1>

            <h2 className="text-xs sm:text-sm md:text-base font-mono tracking-[0.25em] uppercase text-[#F27D26] mb-4">
              {currentScene.subheadline}
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-white/85 font-light leading-relaxed max-w-2xl drop-shadow-md mb-4">
              {currentScene.caption}
            </p>

            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-[#F27D26]/90 bg-black/40 px-3 py-1.5 rounded border border-[#F27D26]/20 backdrop-blur-sm w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F27D26]" />
              <span>{currentScene.techDetails}</span>
            </div>

            {activeSceneIndex === LAST && (
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

        {/* Bottom chapter scrubber */}
        <footer className="relative z-20 w-full px-4 sm:px-12 pb-6 sm:pb-8">
          <div className="bg-black/75 border border-white/15 backdrop-blur-xl rounded-2xl p-3 sm:p-4 max-w-6xl mx-auto shadow-2xl">
            <div className="relative w-full h-1 bg-white/10 rounded-full overflow-hidden mb-3">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#F27D26] to-[#FFE2B8]"
                style={{ width: `${activeProgress * 100}%` }}
              />
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 sm:gap-2">
              {CINEMATIC_SCENES.map((sc, idx) => {
                const isActive = idx === activeSceneIndex;
                const isPassed = activeProgress * LAST >= idx + 0.5;
                return (
                  <button
                    key={sc.id}
                    onClick={() => handleChapterClick(idx)}
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
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#F27D26] animate-ping" />}
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-medium tracking-tight truncate w-full mt-0.5 hidden sm:block">
                      {sc.title}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-white/50 pt-2.5 border-t border-white/10 mt-2">
              <div className="flex items-center gap-3">
                <span className="text-[#F27D26]">M2 DEKORASYON // EV DÖNÜŞÜMÜ · 10 KARE</span>
                <span className="hidden md:inline text-white/30">|</span>
                <span className="hidden md:inline text-white/60">ÖNCE → SONRA</span>
              </div>
              <div className="flex items-center gap-2">
                <span>İLERLEMEK İÇİN KAYDIR VEYA OYNAT</span>
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
