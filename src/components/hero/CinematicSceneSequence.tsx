import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Play, Pause, ArrowDown } from 'lucide-react';

interface CinematicSceneSequenceProps {
  onScrollToExplore?: () => void;
}

/**
 * The hero is one continuous architectural camera move through a single M2
 * interior, rendered as a scroll-scrubbed image sequence (frames in
 * /public/hero-seq). Scrolling IS the camera. Five editorial "beats" fade in
 * over the film as the camera establishes the room, tilts up to the stretch
 * ceiling, lets the indirect light travel, moves in on the wall material, then
 * pulls back to one final composition.
 */
const FRAME_COUNT = 132;
const PRIORITY = 24; // frames loaded before the film is revealed

const FRAMES: string[] = Array.from(
  { length: FRAME_COUNT },
  (_, i) => `/hero-seq/frame-${String(i + 1).padStart(4, '0')}.webp`
);

const BEATS = [
  {
    at: 0.0,
    eyebrow: 'MEKÂN · 00',
    headline: 'YÜZEY.\nIŞIK.\nMEKÂN.',
    meta: 'INTERIOR 01 · ANTALYA',
  },
  {
    at: 0.2,
    eyebrow: 'TAVAN · 01',
    headline: 'TAVAN,\nMİMARİYE\nDÖNÜŞÜR.',
    meta: 'GERGİ TAVAN · EKSİZ SATEN MEMBRAN',
  },
  {
    at: 0.42,
    eyebrow: 'IŞIK · 02',
    headline: 'IŞIK,\nMEKÂNIN\nİÇİNDEN GEÇER.',
    meta: 'GİZLİ KANAL · 2700–4000K · CRI 90+',
  },
  {
    at: 0.62,
    eyebrow: 'MALZEME · 03',
    headline: 'MALZEME,\nIŞIĞI\nTUTAR.',
    meta: 'MEŞE LATA · DOKULU DUVAR KAĞIDI',
  },
  {
    at: 0.85,
    eyebrow: 'İMZA · 04',
    headline: 'TEK MEKÂN.\nTEK DİL.',
    meta: 'GERGİ TAVAN · AYDINLATMA · DEKORASYON',
  },
];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const CinematicSceneSequence: React.FC<CinematicSceneSequenceProps> = ({ onScrollToExplore }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [readyCount, setReadyCount] = useState(0);

  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const reportedRef = useRef(-1);
  const rafRef = useRef<number | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(FRAME_COUNT).fill(null));
  const reduced = useMemo(prefersReducedMotion, []);

  // Preload: priority batch first, then the rest, so the film shows fast
  useEffect(() => {
    let cancelled = false;
    let done = 0;
    const bump = () => {
      if (cancelled) return;
      done += 1;
      setReadyCount(done);
    };
    const load = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => {
          imagesRef.current[i] = img;
          bump();
          resolve();
        };
        img.onerror = () => {
          bump();
          resolve();
        };
        img.src = FRAMES[i];
      });

    (async () => {
      const priority = [];
      for (let i = 0; i < Math.min(PRIORITY, FRAME_COUNT); i++) priority.push(load(i));
      await Promise.all(priority);
      for (let i = PRIORITY; i < FRAME_COUNT && !cancelled; i++) {
        // throttle the tail so it never competes with interaction
        // eslint-disable-next-line no-await-in-loop
        await load(i);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const activeBeat = useMemo(() => {
    let idx = 0;
    for (let i = 0; i < BEATS.length; i++) if (progress >= BEATS[i].at) idx = i;
    return idx;
  }, [progress]);

  const nearestImage = useCallback((frame: number): HTMLImageElement | null => {
    const imgs = imagesRef.current;
    if (imgs[frame]) return imgs[frame];
    for (let d = 1; d < FRAME_COUNT; d++) {
      if (imgs[frame - d]) return imgs[frame - d];
      if (imgs[frame + d]) return imgs[frame + d];
    }
    return null;
  }, []);

  const draw = useCallback((img: HTMLImageElement | null) => {
    const canvas = canvasRef.current;
    if (!canvas || !img || !img.width) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    }
    const cw = canvas.width;
    const ch = canvas.height;

    const ia = img.width / img.height;
    const ca = cw / ch;
    let rw = cw;
    let rh = ch;
    if (ca > ia) rh = cw / ia;
    else rw = ch * ia;

    // portrait viewports: give the ceiling a touch more room
    const yBias = ch > cw ? (ch - rh) * 0.12 : (ch - rh) / 2;

    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, (cw - rw) / 2, yBias, rw, rh);
  }, []);

  // Render loop
  useEffect(() => {
    const loop = () => {
      const target = targetRef.current;
      if (reduced) {
        currentRef.current = target;
      } else {
        const diff = target - currentRef.current;
        currentRef.current += Math.abs(diff) > 0.0002 ? diff * 0.11 : diff;
      }
      const p = Math.max(0, Math.min(1, currentRef.current));

      if (Math.abs(p - reportedRef.current) > 0.004) {
        reportedRef.current = p;
        setProgress(p);
      }

      const frame = Math.round(p * (FRAME_COUNT - 1));
      draw(nearestImage(frame));

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [draw, nearestImage, reduced]);

  // Scroll → progress over the tall container
  useEffect(() => {
    const onScroll = () => {
      if (isPlaying || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const top = window.scrollY + rect.top;
      const dist = rect.height - window.innerHeight;
      if (dist > 0) targetRef.current = Math.min(1, Math.max(0, (window.scrollY - top) / dist));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isPlaying]);

  // Film mode
  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => {
      const next = targetRef.current + 0.003;
      targetRef.current = next >= 1 ? 0 : next;
    }, 40);
    return () => clearInterval(id);
  }, [isPlaying]);

  const seekToBeat = (i: number) => {
    setIsPlaying(false);
    const p = Math.min(0.999, BEATS[i].at + 0.001);
    targetRef.current = p;
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const top = window.scrollY + rect.top;
      const dist = rect.height - window.innerHeight;
      const y = top + p * dist;
      const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: object) => void } }).__lenis;
      if (lenis && !reduced) lenis.scrollTo(y);
      else window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' });
    }
  };

  const ready = readyCount >= Math.min(PRIORITY, FRAME_COUNT);
  const loadPct = Math.round((readyCount / FRAME_COUNT) * 100);
  const beat = BEATS[activeBeat];
  const isFinal = activeBeat === BEATS.length - 1;
  const frameNo = Math.round(progress * (FRAME_COUNT - 1)) + 1;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[560vh] bg-[#050505] text-[#F5F5F5] select-none"
      id="making-of-space"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none" />

        {/* Atmosphere — vignette + top/bottom falloff, constant, part of the one visual language */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(120%_90%_at_50%_38%,transparent_35%,rgba(0,0,0,0.62)_100%)]" />
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/70 via-transparent to-black/72" />

        {/* Loading veil — lifts once the priority frames are in */}
        {!ready && (
          <div className="absolute inset-0 z-40 flex items-center justify-center bg-[#050505]">
            <div className="flex flex-col items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#F27D26] animate-pulse shadow-[0_0_12px_#F27D26]" />
              <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/60">
                M2 · {loadPct}%
              </span>
            </div>
          </div>
        )}

        {/* Persistent architectural frame */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <span className="absolute top-6 left-6 sm:top-8 sm:left-10 w-4 h-4 border-l border-t border-white/25" />
          <span className="absolute top-6 right-6 sm:top-8 sm:right-10 w-4 h-4 border-r border-t border-white/25" />
          <span className="absolute bottom-6 left-6 sm:bottom-8 sm:left-10 w-4 h-4 border-l border-b border-white/25" />
          <span className="absolute bottom-6 right-6 sm:bottom-8 sm:right-10 w-4 h-4 border-r border-b border-white/25" />
        </div>

        {/* Editorial beat — fades/tracks with the camera */}
        <div className="absolute inset-0 z-30 flex items-center pointer-events-none">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-12">
            <div key={activeBeat} className="hero-beat max-w-2xl">
              <div className="text-[10px] sm:text-xs font-mono tracking-[0.35em] uppercase text-[#F27D26] mb-4 sm:mb-6">
                {beat.eyebrow}
              </div>
              <h1 className="text-[2.5rem] leading-[0.95] sm:text-6xl lg:text-7xl sm:leading-[0.92] font-black uppercase tracking-tighter text-white whitespace-pre-line drop-shadow-[0_6px_40px_rgba(0,0,0,0.9)]">
                {beat.headline}
              </h1>
              <div className="mt-5 sm:mt-7 flex items-center gap-3 text-[10px] sm:text-[11px] font-mono tracking-[0.15em] uppercase text-white/55">
                <span className="w-6 h-px bg-[#F27D26]" />
                {beat.meta}
              </div>

              {isFinal && (
                <button
                  onClick={onScrollToExplore}
                  className="hero-beat mt-9 sm:mt-11 pointer-events-auto inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#F27D26] text-black font-bold uppercase tracking-widest text-[11px] sm:text-xs hover:bg-white transition-colors"
                >
                  <span>PROJELERİ KEŞFET</span>
                  <ArrowDown size={15} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Minimal scrubber */}
        <footer className="absolute bottom-0 inset-x-0 z-30 px-6 sm:px-12 pb-14 sm:pb-9">
          <div className="max-w-7xl mx-auto">
            <div className="relative h-px w-full bg-white/15">
              <div
                className="absolute left-0 top-0 h-px bg-[#F27D26]"
                style={{ width: `${progress * 100}%` }}
              />
              {BEATS.map((b, i) => (
                <button
                  key={i}
                  onClick={() => seekToBeat(i)}
                  className="absolute -top-1.5 -translate-x-1/2 p-2 -m-2 group"
                  style={{ left: `${b.at * 100}%` }}
                  aria-label={b.eyebrow}
                >
                  <span
                    className={`block w-1.5 h-1.5 rounded-full transition-colors ${
                      i === activeBeat ? 'bg-[#F27D26]' : progress >= b.at ? 'bg-white/70' : 'bg-white/30'
                    } group-hover:bg-[#F27D26]`}
                  />
                </button>
              ))}
            </div>
            <div className="mt-3.5 flex items-center gap-4 text-[9px] sm:text-[10px] font-mono tracking-[0.15em] uppercase text-white/45">
              <button
                onClick={() => setIsPlaying((v) => !v)}
                className={`flex items-center gap-2 transition-colors ${
                  isPlaying ? 'text-[#F27D26]' : 'text-white/60 hover:text-white'
                }`}
                aria-label={isPlaying ? 'Durdur' : 'Oynat'}
              >
                {isPlaying ? <Pause size={11} /> : <Play size={11} className="ml-0.5" />}
                <span>{isPlaying ? 'DURDUR' : 'FİLMİ OYNAT'}</span>
              </button>
              <span className="w-px h-3 bg-white/15" />
              <span className="text-white/40">
                <span className="text-[#F27D26]">{beat.eyebrow}</span>
                <span className="hidden sm:inline"> · KARE {String(frameNo).padStart(3, '0')}/{FRAME_COUNT}</span>
              </span>
            </div>
          </div>
        </footer>
      </div>

      <style>{`
        .hero-beat { animation: heroBeatIn 620ms cubic-bezier(0.16, 1, 0.3, 1) both; }
        @keyframes heroBeatIn {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-beat { animation: none; }
        }
      `}</style>
    </div>
  );
};

export default CinematicSceneSequence;
