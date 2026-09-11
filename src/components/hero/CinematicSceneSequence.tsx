import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Play, Pause, ArrowDown } from 'lucide-react';

interface CinematicSceneSequenceProps {
  onScrollToExplore?: () => void;
}

/**
 * The hero is one continuous architectural camera move through a single M2
 * interior, rendered as a scroll-scrubbed image sequence. Scrolling IS the
 * camera. Five editorial beats fade in as the camera establishes the room,
 * tilts up to the stretch ceiling, lets the indirect light travel, moves in on
 * the wall material, then pulls back to one final composition.
 *
 * Desktop and mobile share the story but not the composition: mobile loads a
 * lighter, portrait-cropped frame set (public/hero-seq-m), a shorter scroll
 * distance, and its own typography.
 *
 * Performance contract (visual output is identical to the un-optimised version):
 *  - the canvas is repainted only when the frame index, the drawn image or the
 *    canvas size actually changes; a still hero costs nothing
 *  - the rAF loop is parked while the hero is off-screen or the tab is hidden
 *  - continuous values (progress bar, frame counter) are written straight to
 *    the DOM; React state only changes when the beat changes (5x per journey)
 *  - frames stream in coverage passes (stride 8 -> 4 -> 2 -> 1) with bounded
 *    concurrency, always preferring frames near the current scroll position
 *  - decoded frames are held in a bounded cache and the furthest ones are
 *    released, so long scrolls do not grow memory without limit
 */
/**
 * `window` = how many frames each side of the current one are kept decoded.
 * `cache`  = hard ceiling on decoded frames held at once.
 * Every ANCHOR_STRIDE-th frame is permanently resident, so the whole timeline
 * always has something within 4 frames to show while detail streams in.
 */
const DESKTOP = { dir: '/hero-seq/', count: 132, window: 20, cache: 58 };
const MOBILE = { dir: '/hero-seq-m/', count: 96, window: 12, cache: 34 };
const ANCHOR_STRIDE = 8;
const CONCURRENCY = 6;

const BEATS = [
  {
    at: 0.0,
    eyebrow: 'MEKÂN · 00',
    headline: 'YÜZEY.\nIŞIK.\nMEKÂN.',
    headlineM: 'YÜZEY\nIŞIK\nMEKÂN',
    meta: 'INTERIOR 01 · ANTALYA',
    metaM: 'INTERIOR 01',
  },
  {
    at: 0.2,
    eyebrow: 'TAVAN · 01',
    headline: 'TAVAN,\nMİMARİYE\nDÖNÜŞÜR.',
    headlineM: 'TAVAN\nMİMARİ\nOLUR',
    meta: 'GERGİ TAVAN · EKSİZ SATEN MEMBRAN',
    metaM: 'GERGİ TAVAN · EKSİZ MEMBRAN',
  },
  {
    at: 0.42,
    eyebrow: 'IŞIK · 02',
    headline: 'IŞIK,\nMEKÂNIN\nİÇİNDEN GEÇER.',
    headlineM: 'IŞIK\nİÇERİDEN\nGEÇER',
    meta: 'GİZLİ KANAL · 2700–4000K · CRI 90+',
    metaM: '2700–4000K · CRI 90+',
  },
  {
    at: 0.62,
    eyebrow: 'MALZEME · 03',
    headline: 'MALZEME,\nIŞIĞI\nTUTAR.',
    headlineM: 'MALZEME\nIŞIĞI\nTUTAR',
    meta: 'MEŞE LATA · DOKULU DUVAR KAĞIDI',
    metaM: 'MEŞE LATA · DUVAR KAĞIDI',
  },
  {
    at: 0.85,
    eyebrow: 'İMZA · 04',
    headline: 'TEK MEKÂN.\nTEK DİL.',
    headlineM: 'TEK MEKÂN\nTEK DİL',
    meta: 'GERGİ TAVAN · AYDINLATMA · DEKORASYON',
    metaM: 'GERGİ TAVAN · AYDINLATMA',
  },
];

const useMediaQuery = (query: string) => {
  const [match, setMatch] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return match;
};

export const CinematicSceneSequence: React.FC<CinematicSceneSequenceProps> = ({ onScrollToExplore }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  const mobile = useMediaQuery('(max-width: 767px)');
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const cfg = mobile ? MOBILE : DESKTOP;

  // React state is only for values that change a handful of times.
  const [activeBeat, setActiveBeat] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [loadPct, setLoadPct] = useState(0);

  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const runningRef = useRef(false);
  const onScreenRef = useRef(false);
  const playingRef = useRef(false);
  const beatRef = useRef(0);
  const barPctRef = useRef('');
  const counterFrameRef = useRef(-1);
  const wakeRef = useRef<() => void>(() => {});

  // frame cache + bookkeeping
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const loadedCountRef = useRef(0);
  const frameIndexRef = useRef(0);
  const drawnFrameRef = useRef(-1);
  const drawnImgRef = useRef<HTMLImageElement | null>(null);
  const sizeDirtyRef = useRef(true);
  const cssSizeRef = useRef({ w: 0, h: 0, dpr: 1 });

  const frames = useMemo(
    () => Array.from({ length: cfg.count }, (_, i) => `${cfg.dir}frame-${String(i + 1).padStart(4, '0')}.webp`),
    [cfg.dir, cfg.count]
  );

  /* ------------------------------------------------------------------ *
   * Streaming loader: reveal on frame 1, then coverage passes, always
   * preferring whatever is closest to where the user currently is.
   * ------------------------------------------------------------------ */
  useEffect(() => {
    let cancelled = false;
    const total = frames.length;
    const imgs: (HTMLImageElement | null)[] = new Array(total).fill(null);
    imagesRef.current = imgs;
    loadedCountRef.current = 0;
    drawnFrameRef.current = -1;
    drawnImgRef.current = null;
    setReady(false);
    setLoadPct(0);

    const pending = new Set<number>();
    const isAnchor = (i: number) => i % ANCHOR_STRIDE === 0 || i === total - 1;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    // Drop the least useful decoded frames once the ceiling is reached: only
    // non-anchor frames outside the live window, furthest from the camera first.
    const evictIfNeeded = () => {
      while (loadedCountRef.current > cfg.cache) {
        const here = frameIndexRef.current;
        let victim = -1;
        let worst = cfg.window;
        for (let i = 0; i < total; i++) {
          if (!imgs[i] || pending.has(i) || isAnchor(i)) continue;
          const d = Math.abs(i - here);
          if (d > worst) {
            worst = d;
            victim = i;
          }
        }
        if (victim < 0) return; // everything resident is worth keeping
        const img = imgs[victim];
        imgs[victim] = null;
        loadedCountRef.current--;
        if (img) img.src = '';
      }
    };

    const load = (i: number) =>
      new Promise<void>((resolve) => {
        if (cancelled || imgs[i] || pending.has(i)) return resolve();
        pending.add(i);
        const img = new Image();
        img.decoding = 'async';
        const done = (ok: boolean) => {
          pending.delete(i);
          if (!cancelled && ok) {
            imgs[i] = img;
            loadedCountRef.current++;
            evictIfNeeded();
          }
          resolve();
        };
        img.onload = () => done(true);
        img.onerror = () => done(false);
        img.src = frames[i];
      });

    // What is worth fetching right now: anchors anywhere (cheap timeline
    // skeleton), plus detail inside the live window, nearest first.
    const pickWanted = (n: number) => {
      const here = frameIndexRef.current;
      const scored: { i: number; s: number }[] = [];
      for (let i = 0; i < total; i++) {
        if (imgs[i] || pending.has(i)) continue;
        const d = Math.abs(i - here);
        const s = isAnchor(i) ? d * 0.2 : d <= cfg.window ? d : Infinity;
        if (s !== Infinity) scored.push({ i, s });
      }
      scored.sort((a, b) => a.s - b.s);
      return scored.slice(0, n).map((x) => x.i);
    };

    (async () => {
      // 1. first frame only — the film can appear immediately
      const first = new Image();
      first.decoding = 'async';
      first.src = frames[0];
      try {
        await first.decode();
      } catch {
        await new Promise((r) => {
          first.onload = r;
          first.onerror = r;
        });
      }
      if (cancelled) return;
      imgs[0] = first;
      loadedCountRef.current = 1;
      sizeDirtyRef.current = true;
      setReady(true);
      setLoadPct(Math.round((1 / total) * 100));

      // 2. keep the skeleton and the live window filled as the camera moves
      while (!cancelled) {
        if (!onScreenRef.current) {
          // eslint-disable-next-line no-await-in-loop
          await sleep(500);
          continue;
        }
        const wanted = pickWanted(CONCURRENCY);
        if (!wanted.length) {
          // eslint-disable-next-line no-await-in-loop
          await sleep(300);
          continue;
        }
        // eslint-disable-next-line no-await-in-loop
        await Promise.all(wanted.map(load));
        if (cancelled) return;
        setLoadPct(Math.round((loadedCountRef.current / total) * 100));
        wakeRef.current(); // a sharper frame may now exist for what is on screen
      }
    })();

    return () => {
      cancelled = true;
      for (const img of imgs) if (img) img.src = '';
      imagesRef.current = [];
    };
  }, [frames, cfg.cache]);

  const nearestImage = useCallback((frame: number): HTMLImageElement | null => {
    const imgs = imagesRef.current;
    if (imgs[frame]) return imgs[frame];
    for (let d = 1; d < imgs.length; d++) {
      const a = imgs[frame - d];
      if (a) return a;
      const b = imgs[frame + d];
      if (b) return b;
    }
    return null;
  }, []);

  /* ------------------------------------------------------------------ *
   * Canvas sizing is driven by ResizeObserver, never read inside the loop
   * (that would force a layout read on every animation frame).
   * ------------------------------------------------------------------ */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const measure = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      // never render more pixels than the source frame can fill
      const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 2 : 2);
      const cur = cssSizeRef.current;
      if (cur.w !== w || cur.h !== h || cur.dpr !== dpr) {
        cssSizeRef.current = { w, h, dpr };
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        sizeDirtyRef.current = true;
        wakeRef.current();
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(canvas);
    window.addEventListener('orientationchange', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('orientationchange', measure);
    };
  }, [mobile]);

  const composed = mobile; // mobile frames are pre-cropped for portrait
  const paint = useCallback(
    (img: HTMLImageElement) => {
      const canvas = canvasRef.current;
      if (!canvas || !img.width) return;
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      const cw = canvas.width;
      const ch = canvas.height;
      const ia = img.width / img.height;
      const ca = cw / ch;
      let rw = cw;
      let rh = ch;
      if (ca > ia) rh = cw / ia;
      else rw = ch * ia;

      // desktop landscape frames in a portrait viewport keep a little more ceiling;
      // mobile frames are already composed, so just centre them.
      const yBias = !composed && ch > cw ? (ch - rh) * 0.12 : (ch - rh) / 2;

      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - rw) / 2, yBias, rw, rh);
    },
    [composed]
  );

  /* ------------------------------------------------------------------ *
   * The loop. Runs only while the hero is on screen and the tab is visible,
   * and only touches the canvas when something actually changed.
   * ------------------------------------------------------------------ */
  const stop = useCallback(() => {
    runningRef.current = false;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  }, []);

  const step = useCallback(() => {
    const total = frames.length;
    const target = targetRef.current;
    const diff = target - currentRef.current;
    const settled = Math.abs(diff) < 0.00005;
    if (reduced || settled) currentRef.current = target;
    else currentRef.current += diff * (mobile ? 0.14 : 0.11);
    const p = Math.max(0, Math.min(1, currentRef.current));

    // continuous UI written straight to the DOM — and only when it changed
    const pct = `${(p * 100).toFixed(2)}%`;
    if (pct !== barPctRef.current) {
      barPctRef.current = pct;
      if (barRef.current) barRef.current.style.width = pct;
    }

    const frame = Math.round(p * (total - 1));
    frameIndexRef.current = frame;
    if (frame !== counterFrameRef.current) {
      counterFrameRef.current = frame;
      if (counterRef.current) {
        counterRef.current.textContent = ` · KARE ${String(frame + 1).padStart(3, '0')}/${total}`;
      }
    }

    // beat changes are rare — that is the only thing React needs to know
    let b = 0;
    for (let i = 0; i < BEATS.length; i++) if (p >= BEATS[i].at) b = i;
    if (b !== beatRef.current) {
      beatRef.current = b;
      setActiveBeat(b);
    }

    // Repaint only when the pixels would actually differ: what is on screen is
    // decided by the resolved image, not by the frame index (neighbouring
    // indices often resolve to the same fallback while frames stream in).
    const img = nearestImage(frame);
    if (img && (sizeDirtyRef.current || img !== drawnImgRef.current)) {
      paint(img);
      drawnFrameRef.current = frame;
      drawnImgRef.current = img;
      sizeDirtyRef.current = false;
    }

    // Nothing left to animate: park the loop until something wakes it.
    if (settled && !playingRef.current) {
      stop();
      return;
    }
    if (runningRef.current) rafRef.current = requestAnimationFrame(step);
  }, [frames.length, reduced, mobile, nearestImage, paint, stop]);

  const start = useCallback(() => {
    if (runningRef.current || !onScreenRef.current || document.hidden) return;
    runningRef.current = true;
    rafRef.current = requestAnimationFrame(step);
  }, [step]);

  useEffect(() => {
    wakeRef.current = start;
  }, [start]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const sync = () => {
      if (onScreenRef.current && !document.hidden) start();
      else stop();
    };
    const io = new IntersectionObserver(
      ([e]) => {
        onScreenRef.current = e.isIntersecting;
        sync();
      },
      { rootMargin: '200px' }
    );
    io.observe(el);
    document.addEventListener('visibilitychange', sync);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', sync);
      stop();
    };
  }, [start, stop]);

  // Scroll → target progress. Cheap: one rect read, no React.
  useEffect(() => {
    const onScroll = () => {
      if (playingRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dist = rect.height - window.innerHeight;
      if (dist > 0) {
        targetRef.current = Math.min(1, Math.max(0, -rect.top / dist));
        start();
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [start]);

  // Film mode
  useEffect(() => {
    playingRef.current = isPlaying;
    if (!isPlaying) return;
    start();
    const id = setInterval(() => {
      const next = targetRef.current + 0.003;
      targetRef.current = next >= 1 ? 0 : next;
      start();
    }, 40);
    return () => clearInterval(id);
  }, [isPlaying, start]);

  const seekToBeat = (i: number) => {
    setIsPlaying(false);
    const p = Math.min(0.999, BEATS[i].at + 0.001);
    targetRef.current = p;
    start();
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

  const beat = BEATS[activeBeat];
  const isFinal = activeBeat === BEATS.length - 1;
  const heightClass = reduced ? 'h-[150svh]' : mobile ? 'h-[440svh]' : 'h-[560vh]';

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${heightClass} bg-[#050505] text-[#F5F5F5] select-none`}
      id="making-of-space"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none" />

        {/* Atmosphere — vignette + top/bottom falloff */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(120%_90%_at_50%_38%,transparent_35%,rgba(0,0,0,0.62)_100%)]" />
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/70 via-transparent to-black/75" />

        {/* Loading veil — lifts as soon as the first frame is decoded */}
        {!ready && (
          <div className="absolute inset-0 z-40 flex items-center justify-center bg-[#050505]">
            <div className="flex flex-col items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#F27D26] animate-pulse shadow-[0_0_12px_#F27D26]" />
              <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/60">M2 · {loadPct}%</span>
            </div>
          </div>
        )}

        {/* Persistent architectural frame */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <span className="absolute top-[max(1.25rem,env(safe-area-inset-top))] left-6 sm:top-8 sm:left-10 w-4 h-4 border-l border-t border-white/25" />
          <span className="absolute top-[max(1.25rem,env(safe-area-inset-top))] right-6 sm:top-8 sm:right-10 w-4 h-4 border-r border-t border-white/25" />
          <span className="absolute bottom-6 left-6 sm:bottom-8 sm:left-10 w-4 h-4 border-l border-b border-white/25" />
          <span className="absolute bottom-6 right-6 sm:bottom-8 sm:right-10 w-4 h-4 border-r border-b border-white/25" />
        </div>

        {/* Editorial beat — bottom-anchored on mobile so it never covers the architecture */}
        <div className="absolute inset-0 z-30 flex items-end pb-32 sm:items-center sm:pb-0 pointer-events-none">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-12">
            <div key={activeBeat} className="hero-beat max-w-2xl">
              <div className="text-[9px] sm:text-xs font-mono tracking-[0.35em] uppercase text-[#F27D26] mb-3 sm:mb-6">
                {beat.eyebrow}
              </div>
              <h1 className="text-[2.35rem] leading-[0.94] sm:text-6xl lg:text-7xl sm:leading-[0.92] font-black uppercase tracking-tighter text-white whitespace-pre-line drop-shadow-[0_6px_40px_rgba(0,0,0,0.92)]">
                {mobile ? beat.headlineM : beat.headline}
              </h1>
              <div className="mt-4 sm:mt-7 flex items-center gap-2.5 sm:gap-3 text-[9px] sm:text-[11px] font-mono tracking-[0.14em] uppercase text-white/55">
                <span className="w-5 sm:w-6 h-px bg-[#F27D26]" />
                {mobile ? beat.metaM : beat.meta}
              </div>

              {isFinal && (
                <button
                  onClick={onScrollToExplore}
                  className="hero-beat mt-7 sm:mt-11 pointer-events-auto inline-flex items-center gap-3 px-6 py-3.5 sm:px-7 rounded-full bg-[#F27D26] text-black font-bold uppercase tracking-widest text-[11px] sm:text-xs active:scale-95 sm:hover:bg-white transition-all"
                >
                  <span>PROJELERİ KEŞFET</span>
                  <ArrowDown size={15} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Minimal scrubber */}
        <footer className="absolute bottom-0 inset-x-0 z-30 px-6 sm:px-12 pb-[calc(env(safe-area-inset-bottom)+2.5rem)] sm:pb-9">
          <div className="max-w-7xl mx-auto">
            <div className="relative h-px w-full bg-white/15">
              <div ref={barRef} className="absolute left-0 top-0 h-px bg-[#F27D26]" style={{ width: '0%' }} />
              {BEATS.map((b, i) => (
                <button
                  key={i}
                  onClick={() => seekToBeat(i)}
                  className="absolute -top-2 -translate-x-1/2 p-2.5 -m-2.5 group"
                  style={{ left: `${b.at * 100}%` }}
                  aria-label={b.eyebrow}
                >
                  <span
                    className={`block w-1.5 h-1.5 rounded-full transition-colors ${
                      i === activeBeat ? 'bg-[#F27D26]' : i < activeBeat ? 'bg-white/70' : 'bg-white/30'
                    } sm:group-hover:bg-[#F27D26]`}
                  />
                </button>
              ))}
            </div>
            <div className="mt-3.5 flex items-center gap-4 text-[9px] sm:text-[10px] font-mono tracking-[0.14em] uppercase text-white/45">
              <button
                onClick={() => setIsPlaying((v) => !v)}
                className={`flex items-center gap-2 py-1 transition-colors ${
                  isPlaying ? 'text-[#F27D26]' : 'text-white/60 sm:hover:text-white'
                }`}
                aria-label={isPlaying ? 'Durdur' : 'Oynat'}
              >
                {isPlaying ? <Pause size={11} /> : <Play size={11} className="ml-0.5" />}
                <span>{isPlaying ? 'DURDUR' : 'FİLMİ OYNAT'}</span>
              </button>
              <span className="w-px h-3 bg-white/15" />
              <span className="text-white/40">
                <span className="text-[#F27D26]">{beat.eyebrow}</span>
                <span ref={counterRef} className="hidden sm:inline" />
              </span>
            </div>
          </div>
        </footer>
      </div>

      <style>{`
        .hero-beat { animation: heroBeatIn 620ms cubic-bezier(0.16, 1, 0.3, 1) both; }
        @keyframes heroBeatIn {
          from { opacity: 0; transform: translateY(16px); }
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
