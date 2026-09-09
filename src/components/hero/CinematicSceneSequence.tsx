import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Play, Pause, ArrowDown, ChevronRight } from 'lucide-react';

interface CinematicSceneSequenceProps {
  onScrollToExplore?: () => void;
}

/** Number of frames in /public/hero-seq (frame-0001.webp ... frame-0096.webp). */
const FRAME_COUNT = 96;

const FRAMES: string[] = Array.from(
  { length: FRAME_COUNT },
  (_, i) => `/hero-seq/frame-${String(i + 1).padStart(4, '0')}.webp`
);

/**
 * Timed captions over the scroll-scrubbed film. `at` is the progress (0..1) where
 * the chapter becomes active; it stays active until the next one begins.
 */
const CHAPTERS = [
  {
    at: 0.0,
    tag: 'MAT MEMBRAN',
    headline: 'TEK PARÇA\nGERGİ MEMBRAN.',
    caption: 'Yüksek yangın sınıfı PVC membran, ısıyla gerdirilip çevre alüminyum harpun profile kilitlenir. Eksiz, antibakteriyel, silinebilir; minimum yükseklik kaybıyla, molozsuz, tek günde.',
  },
  {
    at: 0.3,
    tag: 'GİZLİ KANAL AYDINLATMA',
    headline: 'DUVARDAN\nAYRILAN TAVAN.',
    caption: 'Çevre profiline entegre lineer LED kanalı; 2700K–4000K ayarlanabilir renk sıcaklığı, kısılabilir (DALI) sürücü. Dolaylı ışık tavanı duvardan koparır, mekânı yüksek ve ferah gösterir.',
  },
  {
    at: 0.6,
    tag: 'ARKADAN AYDINLATMALI MEMBRAN',
    headline: 'HOMOJEN,\nGÖLGESİZ IŞIK.',
    caption: 'Translusent membran arkasına LED matris; CRI 90+ ile gölgesiz, homojen difüzyon. Az ışık alan salon, ofis ve banyolarda tavanın tamamı tek bir aydınlatma yüzeyine döner.',
  },
  {
    at: 0.86,
    tag: 'ANAHTAR TESLİM',
    headline: 'M2 DEKORASYON',
    caption: 'Yerinde keşif ve ölçü, projelendirme, membran üretimi ve montaj tek elden. Gergi tavan, gizli aydınlatma, duvar kağıdı ve dekorasyon — Antalya ve bölge geneli.',
  },
];

export const CinematicSceneSequence: React.FC<CinematicSceneSequenceProps> = ({ onScrollToExplore }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeProgress, setActiveProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const reportedProgressRef = useRef(-1);
  const rafIdRef = useRef<number | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const firstImageRef = useRef<HTMLImageElement | null>(null);

  // Preload the whole sequence
  useEffect(() => {
    let cancelled = false;
    let loaded = 0;
    imagesRef.current = FRAMES.map((src, i) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = src;
      img.onload = () => {
        if (cancelled) return;
        if (i === 0) firstImageRef.current = img;
        loaded++;
        setLoadedCount(loaded);
      };
      img.onerror = () => console.warn(`Hero frame missing: ${src}`);
      return img;
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const activeChapterIndex = useMemo(() => {
    let idx = 0;
    for (let i = 0; i < CHAPTERS.length; i++) {
      if (activeProgress >= CHAPTERS[i].at) idx = i;
    }
    return idx;
  }, [activeProgress]);

  const drawFrame = useCallback((img: HTMLImageElement | null) => {
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

    // cover-fit
    const ia = img.width / img.height;
    const ca = cw / ch;
    let rw = cw;
    let rh = ch;
    if (ca > ia) rh = cw / ia;
    else rw = ch * ia;

    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, (cw - rw) / 2, (ch - rh) / 2, rw, rh);
  }, []);

  // Render loop — eases toward the scroll target and paints the nearest frame
  useEffect(() => {
    const loop = () => {
      const target = targetProgressRef.current;
      const diff = target - currentProgressRef.current;
      currentProgressRef.current += Math.abs(diff) > 0.0002 ? diff * 0.12 : diff;
      const p = Math.max(0, Math.min(1, currentProgressRef.current));

      if (Math.abs(p - reportedProgressRef.current) > 0.004) {
        reportedProgressRef.current = p;
        setActiveProgress(p);
      }

      const frame = Math.round(p * (FRAME_COUNT - 1));
      drawFrame(imagesRef.current[frame] || firstImageRef.current);

      rafIdRef.current = requestAnimationFrame(loop);
    };
    rafIdRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [drawFrame]);

  // Scroll → progress over the tall container
  useEffect(() => {
    const onScroll = () => {
      if (isPlaying || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const top = window.scrollY + rect.top;
      const dist = rect.height - window.innerHeight;
      if (dist > 0) {
        targetProgressRef.current = Math.min(1, Math.max(0, (window.scrollY - top) / dist));
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isPlaying]);

  // Film mode — auto-plays the sequence
  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => {
      const next = targetProgressRef.current + 0.004;
      targetProgressRef.current = next >= 1 ? 0 : next;
    }, 40);
    return () => clearInterval(id);
  }, [isPlaying]);

  const seekToChapter = (i: number) => {
    setIsPlaying(false);
    const p = CHAPTERS[i].at + 0.001;
    targetProgressRef.current = Math.min(0.999, p);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const top = window.scrollY + rect.top;
      const dist = rect.height - window.innerHeight;
      window.scrollTo({ top: top + p * dist, behavior: 'smooth' });
    }
  };

  const loadPct = Math.round((loadedCount / FRAME_COUNT) * 100);
  const ready = loadedCount >= FRAME_COUNT;
  const chapter = CHAPTERS[activeChapterIndex];
  const isFinal = activeChapterIndex === CHAPTERS.length - 1;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[520vh] bg-[#050505] text-[#F5F5F5] select-none"
      id="making-of-space"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none" />

        {/* Letterbox / atmosphere */}
        <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-t from-black/85 via-black/10 to-black/55" />

        {/* Loading veil */}
        {!ready && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#050505]">
            <div className="flex flex-col items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#F27D26] animate-pulse shadow-[0_0_12px_#F27D26]" />
              <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-white/70">
                FİLM YÜKLENİYOR · {loadPct}%
              </span>
            </div>
          </div>
        )}

        {/* Top bar — pushed clear of the fixed site navbar on mobile */}
        <header className="relative z-20 w-full px-6 sm:px-12 pt-20 sm:pt-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-2.5 h-2.5 rounded-full bg-[#F27D26] animate-pulse shadow-[0_0_12px_#F27D26]" />
            <div className="flex flex-col">
              <span className="text-[11px] sm:text-sm font-semibold tracking-[0.25em] sm:tracking-[0.3em] uppercase text-white">
                GERGİ TAVAN & DEKORASYON
              </span>
              <span className="hidden sm:block text-[10px] sm:text-[11px] font-mono tracking-widest text-[#F27D26] uppercase opacity-90">
                FRAME {String(Math.round(activeProgress * (FRAME_COUNT - 1)) + 1).padStart(3, '0')} / {FRAME_COUNT} // {chapter.tag}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsPlaying((v) => !v)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 border backdrop-blur-md ${
              isPlaying
                ? 'bg-[#F27D26] text-black border-[#F27D26] font-bold shadow-[0_0_20px_rgba(242,125,38,0.5)]'
                : 'bg-black/50 text-white/80 border-white/20 hover:border-[#F27D26] hover:text-white'
            }`}
            title={isPlaying ? 'Durdur' : 'Filmi oynat'}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} className="ml-0.5" />}
            <span className="hidden sm:inline">{isPlaying ? 'DURDUR' : 'OYNAT'}</span>
          </button>
        </header>

        {/* Caption block — cross-fades between chapters */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 flex-1 flex flex-col justify-center pointer-events-none">
          <div key={activeChapterIndex} className="max-w-3xl hero-chapter">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-md mb-4 text-[10px] sm:text-xs font-mono tracking-widest uppercase text-[#F27D26]">
              <span>BÖLÜM {String(activeChapterIndex + 1).padStart(2, '0')}</span>
              <span className="text-white/30">/</span>
              <span className="text-white/80 font-sans">{chapter.tag}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.92] text-white drop-shadow-[0_4px_32px_rgba(0,0,0,0.9)] whitespace-pre-line mb-4">
              {chapter.headline}
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-white/85 font-light leading-relaxed max-w-2xl drop-shadow-md">
              {chapter.caption}
            </p>

            {isFinal && (
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

        {/* Bottom scrubber — extra bottom gap on mobile so the floating WhatsApp button clears it */}
        <footer className="relative z-20 w-full px-4 sm:px-12 pb-20 sm:pb-8">
          <div className="bg-black/75 border border-white/15 backdrop-blur-xl rounded-2xl p-3 sm:p-4 max-w-5xl mx-auto shadow-2xl">
            <div className="relative w-full h-1 bg-white/10 rounded-full mb-3">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#F27D26] to-[#FFE2B8] rounded-full"
                style={{ width: `${activeProgress * 100}%` }}
              />
              {CHAPTERS.map((c, i) => (
                <span
                  key={i}
                  className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${
                    activeProgress >= c.at ? 'bg-[#FFE2B8]' : 'bg-white/25'
                  }`}
                  style={{ left: `${c.at * 100}%` }}
                />
              ))}
            </div>

            <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
              {CHAPTERS.map((c, i) => (
                <button
                  key={i}
                  onClick={() => seekToChapter(i)}
                  className={`flex flex-col text-left p-1.5 sm:p-2 rounded-lg transition-all duration-200 border ${
                    i === activeChapterIndex
                      ? 'bg-white/15 border-[#F27D26] text-white shadow-[0_0_15px_rgba(242,125,38,0.3)]'
                      : 'bg-transparent border-transparent text-white/45 hover:text-white/80 hover:bg-white/5'
                  }`}
                >
                  <span className={`text-[9px] font-mono ${i === activeChapterIndex ? 'text-[#F27D26] font-bold' : ''}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-medium tracking-tight truncate w-full mt-0.5 hidden sm:block">
                    {c.tag}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-white/50 pt-2.5 border-t border-white/10 mt-2">
              <span className="text-[#F27D26] truncate">
                <span className="hidden sm:inline">M2 DEKORASYON // </span>TEK ÇEKİM · {FRAME_COUNT} KARE
              </span>
              <div className="flex items-center gap-2 shrink-0 pl-3">
                <span className="sm:hidden">KAYDIR</span>
                <span className="hidden sm:inline">İLERLEMEK İÇİN KAYDIR VEYA OYNAT</span>
                <ChevronRight size={11} className="text-[#F27D26]" />
              </div>
            </div>
          </div>
        </footer>
      </div>

      <style>{`
        .hero-chapter { animation: heroChapterIn 520ms ease both; }
        @keyframes heroChapterIn {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-chapter { animation: none; }
        }
      `}</style>
    </div>
  );
};

export default CinematicSceneSequence;
