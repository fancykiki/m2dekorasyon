import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Grid2x2, X, MessageCircle, BookOpen, Download } from 'lucide-react';
import { waLink } from '../data/services';

const PAGES = 130;
const ASPECT = 1200 / 823;
const FLIP_MS = 500;

const pageSrc = (n: number) => `/duvar-kagidi-katalog/page-${String(n).padStart(3, '0')}.webp`;
const thumbSrc = (n: number) => `/duvar-kagidi-katalog/thumb/page-${String(n).padStart(3, '0')}.webp`;

export const EmbeddedCatalog: React.FC = () => {
  const [view, setView] = useState<number>(2); // Start on page 2 (first actual designs page)
  const [flip, setFlip] = useState<'next' | 'prev' | null>(null);
  const [grid, setGrid] = useState(false);
  const busy = useRef(false);
  const touch = useRef<{ x: number; y: number } | null>(null);

  const go = useCallback(
    (dir: 'next' | 'prev') => {
      if (busy.current) return;
      const target = Math.max(1, Math.min(PAGES, view + (dir === 'next' ? 1 : -1)));
      if (target === view) return;

      busy.current = true;
      setFlip(dir);
      window.setTimeout(() => {
        setView(target);
        setFlip(null);
        busy.current = false;
      }, FLIP_MS);
    },
    [view]
  );

  const jump = useCallback((page: number) => {
    setFlip(null);
    busy.current = false;
    setView(page);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (grid) {
        if (e.key === 'Escape') setGrid(false);
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'PageDown') go('next');
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') go('prev');
      else if (e.key === 'Home') jump(1);
      else if (e.key === 'End') jump(PAGES);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, jump, grid]);

  // Preload neighboring pages
  const live = useMemo(() => {
    const out: number[] = [];
    for (let d = -3; d <= 4; d++) {
      const n = view + d;
      if (n >= 1 && n <= PAGES) out.push(n);
    }
    return out;
  }, [view]);
  const liveSet = useMemo(() => new Set(live), [live]);

  useEffect(() => {
    const imgs = live.map((n) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = pageSrc(n);
      return img;
    });
    return () => {
      for (const img of imgs) img.src = '';
    };
  }, [live]);

  const underPage = flip === 'next' ? view + 1 : flip === 'prev' ? view - 1 : view;

  return (
    <section className="px-6 md:px-12 py-16 md:py-24 border-t border-[#141517]/8 bg-[#F8F6F0]">
      <div className="max-w-7xl mx-auto">
        {/* Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#141517]/10 mb-10">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] text-[#E29415] tracking-[0.3em] uppercase mb-3 font-semibold">
              <BookOpen className="w-3.5 h-3.5" />
              İNTERAKTİF DUVAR KAĞIDI KATALOĞU // {PAGES} SAYFA
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#141517] uppercase">
              Duvar Kağıdı Desen Kataloğumuz
            </h2>
            <p className="mt-3 text-sm md:text-base text-[#141517]/70 font-light max-w-2xl leading-relaxed">
              3 boyutlu manzaralar, taş dokuları ve modern desenler içeren {PAGES} sayfalık güncel kataloğumuz.
              Sayfaları çevirerek modelleri inceleyebilir, beğendiğiniz sayfa veya desen kodunu bize ileterek fiyat alabilirsiniz.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/Duvar-Kagidi-1.pdf"
              download="m2dekorasyon-duvar-kagidi-katalogu.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 border border-[#141517]/20 bg-white text-[11px] font-mono tracking-widest uppercase text-[#141517] hover:text-[#E29415] hover:border-[#E29415] transition-colors rounded-sm shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-[#E29415]" />
              <span>PDF İNDİR (47 MB)</span>
            </a>
            <button
              onClick={() => setGrid(true)}
              className="inline-flex items-center gap-2 px-5 py-3 border border-[#141517]/20 bg-white text-[11px] font-mono tracking-widest uppercase text-[#141517] hover:text-[#E29415] hover:border-[#E29415] transition-colors rounded-sm shadow-sm cursor-pointer"
            >
              <Grid2x2 className="w-3.5 h-3.5" />
              <span>TÜM SAYFALARI GÖR</span>
            </button>
          </div>
        </div>

        {/* 3D Flipbook Stage */}
        <div className="flex items-center justify-center py-4 select-none">
          <div
            className="relative max-w-4xl w-full"
            style={{ perspective: '2200px' }}
            onContextMenu={(e) => e.preventDefault()}
            onTouchStart={(e) => {
              touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            }}
            onTouchEnd={(e) => {
              if (!touch.current) return;
              const dx = e.changedTouches[0].clientX - touch.current.x;
              const dy = e.changedTouches[0].clientY - touch.current.y;
              if (Math.abs(dx) > 35 && Math.abs(dx) > Math.abs(dy) * 1.3) go(dx < 0 ? 'next' : 'prev');
              touch.current = null;
            }}
          >
            {/* Book Frame */}
            <div
              className="relative w-full bg-white rounded-sm overflow-hidden shadow-[0_24px_60px_-15px_rgba(0,0,0,0.25)] border border-[#141517]/10"
              style={{ aspectRatio: `${ASPECT}`, transformStyle: 'preserve-3d' }}
            >
              {/* Underlying Target Sheet */}
              <div className="absolute inset-0 bg-white">
                {liveSet.has(underPage) && underPage >= 1 && underPage <= PAGES && (
                  <img
                    src={pageSrc(underPage)}
                    alt={`Duvar Kağıdı Kataloğu Sayfa ${underPage}`}
                    draggable={false}
                    decoding="async"
                    loading="lazy"
                    className="w-full h-full object-contain select-none pointer-events-none"
                  />
                )}
              </div>

              {/* Turning Leaf */}
              {flip && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    transformStyle: 'preserve-3d',
                    transformOrigin: flip === 'next' ? 'left center' : 'right center',
                    animation: `${flip === 'next' ? 'leafTurnNext' : 'leafTurnPrev'} ${FLIP_MS}ms cubic-bezier(0.4, 0.0, 0.2, 1) forwards`,
                    zIndex: 20,
                  }}
                >
                  <div className="absolute inset-0 bg-white" style={{ backfaceVisibility: 'hidden' }}>
                    <img
                      src={pageSrc(view)}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                    <div
                      className="absolute inset-0 bg-black/15 pointer-events-none"
                      style={{ animation: `leafShade ${FLIP_MS}ms ease-in-out forwards` }}
                    />
                  </div>
                  <div
                    className="absolute inset-0 bg-[#f4f1ec]"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <img
                      src={pageSrc(underPage)}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={() => go('prev')}
              disabled={view <= 1}
              aria-label="Önceki sayfa"
              className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-7 md:-left-12 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-[#141517]/10 shadow-lg flex items-center justify-center text-[#141517] disabled:opacity-20 disabled:cursor-default hover:text-[#E29415] hover:border-[#E29415] transition-colors z-30 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => go('next')}
              disabled={view >= PAGES}
              aria-label="Sonraki sayfa"
              className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-7 md:-right-12 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-[#141517]/10 shadow-lg flex items-center justify-center text-[#141517] disabled:opacity-20 disabled:cursor-default hover:text-[#E29415] hover:border-[#E29415] transition-colors z-30 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress bar and counter */}
        <div className="max-w-xl mx-auto mt-6">
          <div className="relative h-1.5 bg-[#141517]/10 rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-[#E29415] transition-all duration-300 ease-out"
              style={{ width: `${(view / PAGES) * 100}%` }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] font-mono tracking-wider uppercase text-[#141517]/70">
            <span className="text-[#E29415] font-bold">
              {view === 1 ? 'KAPAK' : `SAYFA ${view} / ${PAGES}`}
            </span>
            <span>OKLARLA VEYA PARMAĞINIZLA KAYDIRIN</span>
          </div>
        </div>

        {/* Direct WhatsApp Quote for active page */}
        <div className="mt-8 p-5 sm:p-6 bg-white border border-[#141517]/8 rounded-sm shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          <div>
            <div className="text-sm font-semibold text-[#141517]">
              Bu Sayfadaki Duvar Kağıdı Modellerini Beğendiniz mi?
            </div>
            <p className="text-xs text-[#141517]/60 mt-0.5">
              Sayfa #{view} modelleri için WhatsApp hattımızdan doğrudan fiyat ve yerinde keşif randevusu alabilirsiniz.
            </p>
          </div>
          <a
            href={waLink(`Merhaba M2 Dekorasyon, Duvar Kağıdı kataloğunuzdaki Sayfa #${view} modelleri hakkında bilgi ve fiyat teklifi almak istiyorum.`)}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E29415] hover:bg-[#F5A623] text-black font-bold uppercase tracking-wider text-xs shadow-sm transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>BU SAYFAYI SOR (WHATSAPP)</span>
          </a>
        </div>
      </div>

      {/* Grid Modal for all 130 pages */}
      {grid && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#F8F6F0]/98 backdrop-blur-2xl overflow-y-auto overscroll-contain text-[#141517]"
          onContextMenu={(e) => e.preventDefault()}
        >
          <div className="sticky top-0 bg-[#F8F6F0]/95 backdrop-blur px-6 md:px-12 py-5 flex items-center justify-between border-b border-[#141517]/10 z-10">
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#141517] font-bold">
              TÜM KATALOG SAYFALARI · {PAGES} SAYFA
            </span>
            <button
              onClick={() => setGrid(false)}
              aria-label="Kapat"
              className="p-2 text-[#141517]/60 hover:text-[#141517] transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="px-6 md:px-12 py-8 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 max-w-7xl mx-auto">
            {Array.from({ length: PAGES }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => {
                  jump(n);
                  setGrid(false);
                }}
                className={`group relative bg-white overflow-hidden rounded-xs border transition-all cursor-pointer ${
                  n === view ? 'border-[#E29415] ring-2 ring-[#E29415] shadow-md' : 'border-[#141517]/10 hover:border-[#E29415]'
                }`}
                style={{ aspectRatio: `${ASPECT}` }}
              >
                <img
                  src={thumbSrc(n)}
                  alt={`Sayfa ${n}`}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="w-full h-full object-contain select-none pointer-events-none"
                />
                <span className="absolute bottom-0 inset-x-0 bg-white/90 text-[10px] font-mono text-[#141517] py-0.5 border-t border-[#141517]/5 font-semibold text-center">
                  Sayfa {n}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes leafTurnNext {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(-180deg); }
        }
        @keyframes leafTurnPrev {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(180deg); }
        }
        @keyframes leafShade {
          0% { opacity: 0; }
          50% { opacity: 0.25; }
          100% { opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default EmbeddedCatalog;
