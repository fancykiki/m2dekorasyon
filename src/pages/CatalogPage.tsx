import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Grid2x2, X, Phone, MessageCircle, BookOpen, Download } from 'lucide-react';
import { SITE, CATALOG, waLink } from '../data/services';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { FloatingWhatsApp } from '../components/FloatingWhatsApp';

const PAGES = CATALOG.pages;
const ASPECT = 1200 / 1697; // rendered page ratio (w/h)
const FLIP_MS = 6000;

const pageSrc = (n: number) => `/katalog/page-${String(n).padStart(3, '0')}.webp`;
const thumbSrc = (n: number) => `/katalog/thumb/page-${String(n).padStart(3, '0')}.webp`;

/**
 * Catalogue flipbook.
 *
 * Desktop shows a two-page spread and turns a real leaf in 3D (a double-sided
 * element rotating about the spine). Mobile shows one page turning about its
 * left edge — same gesture, composition that fits the screen.
 *
 * Performance: only the pages around the current spread are ever requested, so
 * opening the catalogue costs a few hundred kB rather than the whole 45-page
 * document, and the turn animates `transform` only (GPU, no layout).
 *
 * The source PDF is never published — these are rendered page images, there is
 * no download link and no file URL to pass around. That stops casual saving;
 * it is not DRM, nothing on the web can be.
 */
export const CatalogPage: React.FC = () => {
  const [mobile, setMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 899px)').matches
  );
  const [reduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 899px)');
    const on = () => setMobile(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  // Desktop: view k shows pages [2k, 2k+1] — view 0 is the cover alone.
  // Mobile:  view is simply the page number.
  const minView = mobile ? 1 : 0;
  const maxView = mobile ? PAGES : Math.floor(PAGES / 2);

  const [view, setView] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 899px)').matches ? 1 : 0
  );
  const [flip, setFlip] = useState<'next' | 'prev' | null>(null);
  const [grid, setGrid] = useState(false);
  const busy = useRef(false);
  const touch = useRef<{ x: number; y: number } | null>(null);

  // Rotating the phone changes what a view index means — remap instead of jumping.
  const wasMobile = useRef(mobile);
  useEffect(() => {
    if (wasMobile.current === mobile) return;
    setView((v) => {
      const next = mobile ? v * 2 || 1 : Math.floor(v / 2);
      return Math.max(mobile ? 1 : 0, Math.min(mobile ? PAGES : Math.floor(PAGES / 2), next));
    });
    wasMobile.current = mobile;
  }, [mobile]);

  const left = mobile ? 0 : view * 2;
  const right = mobile ? Math.max(1, view) : view * 2 + 1;

  const go = useCallback(
    (dir: 'next' | 'prev') => {
      if (busy.current) return;
      const target = Math.max(minView, Math.min(maxView, view + (dir === 'next' ? 1 : -1)));
      if (target === view) return;
      if (reduced) {
        setView(target);
        return;
      }
      busy.current = true;
      setFlip(dir);
      window.setTimeout(() => {
        setView(target);
        setFlip(null);
        busy.current = false;
      }, FLIP_MS);
    },
    [view, minView, maxView, reduced]
  );

  const jump = useCallback(
    (page: number) => {
      setFlip(null);
      busy.current = false;
      setView(mobile ? page : Math.floor(page / 2));
    },
    [mobile]
  );

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

  // Only the pages around where we are get requested — never all 45.
  const live = useMemo(() => {
    const out: number[] = [];
    const base = mobile ? view : view * 2;
    for (let d = -3; d <= 4; d++) {
      const n = base + d;
      if (n >= 1 && n <= PAGES) out.push(n);
    }
    return out;
  }, [view, mobile]);
  const liveSet = useMemo(() => new Set(live), [live]);

  // Warm the neighbours into the browser's image cache so a turn never lands on
  // a blank sheet. Only these are decoded; the cache bounds itself.
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

  // While a leaf is turning, the layer underneath must already show where we
  // are going — otherwise the vacated half flashes the page we just left.
  const underLeft = !mobile && flip === 'prev' ? left - 2 : left;
  const underRight = mobile
    ? flip === 'next'
      ? right + 1
      : flip === 'prev'
      ? right - 1
      : right
    : flip === 'next'
    ? right + 2
    : right;

  const Sheet: React.FC<{ n: number; side: 'l' | 'r' }> = ({ n, side }) => {
    if (n < 1 || n > PAGES) return <div className="h-full" aria-hidden="true" />;
    return (
      <div className="relative h-full bg-white overflow-hidden shadow-[0_40px_90px_-25px_rgba(0,0,0,0.95)]">
        {liveSet.has(n) && (
          <img
            src={pageSrc(n)}
            alt={`${CATALOG.title} — sayfa ${n}`}
            draggable={false}
            decoding="async"
            fetchPriority="high"
            className="w-full h-full object-contain select-none pointer-events-none"
          />
        )}
        {/* gutter shading gives the spread depth */}
        <div
          className={`absolute inset-y-0 w-12 pointer-events-none ${
            side === 'l'
              ? 'right-0 bg-gradient-to-l from-black/22 via-black/5 to-transparent'
              : 'left-0 bg-gradient-to-r from-black/22 via-black/5 to-transparent'
          }`}
        />
        <span className="absolute bottom-2 inset-x-0 text-center text-[9px] font-mono text-black/30 select-none">
          {n}
        </span>
      </div>
    );
  };

  const bookStyle: React.CSSProperties = mobile
    ? { height: 'min(56svh, 500px)', aspectRatio: `${ASPECT}` }
    : { height: 'min(54vh, 600px)', aspectRatio: `${ASPECT * 2}` };

  return (
    <div
      className="min-h-screen bg-[#F8F6F0] text-[#141517] flex flex-col"
      style={{ WebkitTouchCallout: 'none' } as React.CSSProperties}
    >
      <Navbar currentLang="TR" onToggleLang={() => {}} />

      <main className="flex-1 flex flex-col pt-24 md:pt-28 pb-10">
        {/* header strip */}
        <div className="px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <nav aria-label="breadcrumb" className="mb-5">
              <ol className="flex flex-wrap items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase text-[#66686F]">
                <li><a href="/" className="hover:text-[#141517] transition-colors">Anasayfa</a></li>
                <li aria-hidden="true" className="text-black/20">/</li>
                <li className="text-[#E29415] font-semibold" aria-current="page">Katalog</li>
              </ol>
            </nav>

            <div className="flex flex-wrap items-end justify-between gap-5 pb-5 border-b border-black/8">
              <div>
                <span className="flex items-center gap-2 font-mono text-[10px] text-[#E29415] tracking-[0.3em] uppercase mb-2 font-semibold">
                  <BookOpen className="w-3.5 h-3.5" />
                  M2 DEKORASYON // {PAGES} SAYFA
                </span>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter text-[#141517] uppercase">
                  Desen Kataloğu
                </h1>
                <p className="mt-2.5 text-[13px] text-[#66686F] font-light max-w-xl leading-relaxed">
                  Gergi tavan baskı ve duvar kağıdı desen arşivimiz. Beğendiğiniz sayfanın
                  numarasını not alıp bize iletin, uygulamasını birlikte planlayalım.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={CATALOG.pdfPath}
                  download="m2dekorasyon-katalog.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 border border-black/15 bg-white text-[11px] font-mono tracking-widest uppercase text-[#141517] hover:text-[#E29415] hover:border-[#E29415] transition-colors rounded-xs shadow-xs"
                >
                  <Download className="w-3.5 h-3.5 text-[#E29415]" />
                  <span>PDF İNDİR</span>
                </a>
                <button
                  onClick={() => setGrid(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 border border-black/15 bg-white text-[11px] font-mono tracking-widest uppercase text-[#141517] hover:text-[#E29415] hover:border-[#E29415] transition-colors rounded-xs shadow-xs"
                >
                  <Grid2x2 className="w-3.5 h-3.5" />
                  <span>TÜM SAYFALAR</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* book */}
        <div className="flex-1 flex items-center justify-center px-10 md:px-20 py-7 select-none">
          <div
            className="relative"
            style={{ perspective: '2600px' }}
            onContextMenu={(e) => e.preventDefault()}
            onTouchStart={(e) => {
              touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            }}
            onTouchEnd={(e) => {
              if (!touch.current) return;
              const dx = e.changedTouches[0].clientX - touch.current.x;
              const dy = e.changedTouches[0].clientY - touch.current.y;
              // horizontal intent only, so vertical page scroll still works
              if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) go(dx < 0 ? 'next' : 'prev');
              touch.current = null;
            }}
          >
            <div
              className={`relative grid ${mobile ? 'grid-cols-1' : 'grid-cols-2'}`}
              style={{ ...bookStyle, transformStyle: 'preserve-3d' }}
            >
              {!mobile && <Sheet n={underLeft} side="l" />}
              <Sheet n={underRight} side="r" />

              {/* the turning leaf */}
              {flip && (
                <div
                  className={`absolute top-0 h-full pointer-events-none ${
                    mobile ? 'inset-x-0' : flip === 'next' ? 'right-0 w-1/2' : 'left-0 w-1/2'
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                    transformOrigin: flip === 'next' ? 'left center' : 'right center',
                    animation: `${flip === 'next' ? 'leafNext' : 'leafPrev'} ${FLIP_MS}ms cubic-bezier(0.45, 0.05, 0.25, 1) forwards`,
                    zIndex: 20,
                  }}
                >
                  {/* front: the page being turned */}
                  <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden' }}>
                    <Sheet n={flip === 'next' ? right : left} side={flip === 'next' ? 'r' : 'l'} />
                    <div
                      className="absolute inset-0 bg-black pointer-events-none"
                      style={{ animation: `leafShadeFront ${FLIP_MS}ms ease-in-out forwards` }}
                    />
                  </div>
                  {/* back: on a spread this is the next leaf's recto; on mobile it is paper */}
                  <div
                    className="absolute inset-0"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    {mobile ? (
                      <div className="h-full bg-[#f4f1ec]" />
                    ) : (
                      <Sheet n={flip === 'next' ? right + 1 : left - 1} side={flip === 'next' ? 'l' : 'r'} />
                    )}
                    <div
                      className="absolute inset-0 bg-black pointer-events-none"
                      style={{ animation: `leafShadeBack ${FLIP_MS}ms ease-in-out forwards` }}
                    />
                  </div>
                </div>
              )}

              {/* spine */}
              {!mobile && (
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-black/20 pointer-events-none z-10" />
              )}
            </div>

            {/* controls */}
            <button
              onClick={() => go('prev')}
              disabled={view <= minView}
              aria-label="Önceki sayfa"
              className="absolute top-1/2 -translate-y-1/2 -left-9 md:-left-16 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/95 border border-black/10 shadow-lg flex items-center justify-center text-[#141517] disabled:opacity-20 disabled:cursor-default hover:text-[#E29415] hover:border-[#E29415] transition-colors z-30"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => go('next')}
              disabled={view >= maxView}
              aria-label="Sonraki sayfa"
              className="absolute top-1/2 -translate-y-1/2 -right-9 md:-right-16 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/95 border border-black/10 shadow-lg flex items-center justify-center text-[#141517] disabled:opacity-20 disabled:cursor-default hover:text-[#E29415] hover:border-[#E29415] transition-colors z-30"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* progress + counter */}
        <div className="px-6 md:px-12">
          <div className="max-w-2xl mx-auto">
            <div className="relative h-px bg-black/10">
              <div
                className="absolute left-0 top-0 h-px bg-[#E29415] transition-[width] duration-500 ease-out"
                style={{ width: `${((view - minView) / (maxView - minView)) * 100}%` }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-[10px] font-mono tracking-[0.15em] uppercase text-[#66686F]">
              <span className="text-[#E29415] font-semibold">
                {mobile ? `SAYFA ${right}` : left > 0 ? `SAYFA ${left}–${right}` : 'KAPAK'}
              </span>
              <span className="hidden sm:inline font-medium">OKLARLA GEZİN · {PAGES} SAYFA</span>
              <span className="sm:hidden font-medium">KAYDIRIN · {PAGES} SAYFA</span>
            </div>
          </div>
        </div>

        {/* cta */}
        <div className="px-6 md:px-12 mt-8">
          <div className="max-w-7xl mx-auto border-t border-black/8 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <p className="text-sm text-[#66686F] font-light">
              Beğendiğiniz deseni birlikte uygulayalım — {SITE.openingHours}.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={waLink('Merhaba M2 Dekorasyon, desen kataloğundaki bir desen hakkında bilgi almak istiyorum.')}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#E29415] hover:bg-[#141517] text-white font-bold uppercase tracking-widest text-[11px] active:scale-95 transition-all rounded-xs shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WHATSAPP</span>
              </a>
              <a
                href={`tel:${SITE.phone}`}
                className="inline-flex items-center gap-2.5 px-6 py-3 border border-black/15 bg-white text-[#141517] font-mono text-[11px] tracking-widest uppercase hover:border-[#E29415] hover:text-[#E29415] transition-colors rounded-xs"
              >
                <Phone className="w-3.5 h-3.5 text-[#E29415]" />
                <span>{SITE.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* all-pages grid */}
      {grid && (
        <div
          className="fixed inset-0 z-50 bg-[#F8F6F0]/98 backdrop-blur-2xl overflow-y-auto overscroll-contain text-[#141517]"
          onContextMenu={(e) => e.preventDefault()}
        >
          <div className="sticky top-0 bg-[#F8F6F0]/95 backdrop-blur px-6 md:px-12 py-5 flex items-center justify-between border-b border-black/8 z-10">
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#141517] font-semibold">
              TÜM SAYFALAR · {PAGES}
            </span>
            <button
              onClick={() => setGrid(false)}
              aria-label="Kapat"
              className="p-2 text-[#66686F] hover:text-[#141517] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="px-6 md:px-12 py-8 grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-8 gap-3 max-w-7xl mx-auto">
            {Array.from({ length: PAGES }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => {
                  jump(n);
                  setGrid(false);
                }}
                className="group relative bg-white overflow-hidden border border-black/10 hover:border-[#E29415] transition-colors rounded-xs shadow-sm cursor-pointer"
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
                <span className="absolute bottom-0 inset-x-0 bg-white/90 text-[9px] font-mono text-[#141517] py-0.5 border-t border-black/5 font-semibold">
                  {n}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      <FloatingWhatsApp message="Merhaba M2 Dekorasyon, desen kataloğunuz hakkında bilgi almak istiyorum." />
      <Footer />

      <style>{`
        @keyframes leafNext { from { transform: rotateY(0deg); }  to { transform: rotateY(-180deg); } }
        @keyframes leafPrev { from { transform: rotateY(0deg); }  to { transform: rotateY(180deg); } }
        /* light falling across the leaf as it lifts and lands */
        @keyframes leafShadeFront { 0% { opacity: 0; } 55% { opacity: 0.3; } 100% { opacity: 0.36; } }
        @keyframes leafShadeBack  { 0% { opacity: 0.36; } 55% { opacity: 0.22; } 100% { opacity: 0; } }
      `}</style>
    </div>
  );
};

export default CatalogPage;
