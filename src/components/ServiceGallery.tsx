import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2, MessageCircle, Sparkles } from 'lucide-react';
import serviceGalleries from '../data/serviceGalleries.json';
import { SITE } from '../data/services';

interface ServiceGalleryProps {
  serviceSlug: string;
  serviceName: string;
}

const GALLERIES = serviceGalleries as Record<string, string[]>;

export const ServiceGallery: React.FC<ServiceGalleryProps> = ({ serviceSlug, serviceName }) => {
  const images = GALLERIES[serviceSlug] || [];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [displayCount, setDisplayCount] = useState<number>(12);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const total = images.length;
  if (total === 0) return null;

  const isOpen = lightboxIndex !== null;
  const currentImage = isOpen ? images[lightboxIndex] : null;

  const next = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! + 1) % total);
  }, [lightboxIndex, total]);

  const prev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! - 1 + total) % total);
  }, [lightboxIndex, total]);

  const close = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  // Keyboard controls
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, next, prev, close]);

  const visibleImages = images.slice(0, displayCount);
  const hasMore = displayCount < total;

  const waHref = (idx: number) => {
    const text = `Merhaba M2 Dekorasyon, ${serviceName} galerisindeki #${idx + 1} numaralı uygulama fotoğrafınız hakkında bilgi ve keşif talep etmek istiyorum.`;
    return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="px-6 md:px-12 py-16 md:py-24 border-t border-[#141517]/8 bg-[#F8F6F0]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#141517]/10">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] text-[#E29415] tracking-[0.3em] uppercase mb-3 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#E29415]" />
              GERÇEK UYGULAMA FOTOĞRAFLARI // {total} PROJE
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#141517] uppercase">
              {serviceName} Proje Galerimiz
            </h2>
            <p className="mt-3 text-sm md:text-base text-[#141517]/70 font-light max-w-2xl leading-relaxed">
              Antalya ve çevre ilçelerde tamamladığımız gerçek müşteri uygulamalarımız.
              Detayları yakından incelemek için herhangi bir fotoğrafa dokunun.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#141517]/50 tracking-wider">
              GÖSTERİLEN: <strong className="text-[#141517]">{Math.min(displayCount, total)}</strong> / {total}
            </span>
          </div>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {visibleImages.map((src, index) => (
            <button
              key={src}
              onClick={() => setLightboxIndex(index)}
              className="group relative aspect-[4/3] bg-[#EAE7DF] overflow-hidden rounded-sm border border-[#141517]/8 shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E29415]"
              aria-label={`${serviceName} uygulama fotoğrafı ${index + 1}`}
            >
              <img
                src={src}
                alt={`${serviceName} uygulama örneği ${index + 1} — Antalya M2 Dekorasyon`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3">
                <span className="font-mono text-[10px] text-white/90 tracking-widest uppercase font-semibold">
                  #{String(index + 1).padStart(3, '0')}
                </span>
                <span className="w-7 h-7 rounded-full bg-white/90 text-[#141517] flex items-center justify-center shadow-md">
                  <Maximize2 className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setDisplayCount((prev) => Math.min(prev + 16, total))}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border border-[#141517]/20 bg-white hover:bg-[#141517] text-[#141517] hover:text-white font-mono text-xs tracking-widest uppercase transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              <span>DAHA FAZLA GÖSTER ({total - displayCount} FOTOĞRAF KALDI)</span>
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {isOpen && currentImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#141517]/95 backdrop-blur-xl flex flex-col justify-between p-4 md:p-6"
          onTouchStart={(e) => {
            touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
          }}
          onTouchEnd={(e) => {
            if (!touchStart.current) return;
            const dx = e.changedTouches[0].clientX - touchStart.current.x;
            const dy = e.changedTouches[0].clientY - touchStart.current.y;
            if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
              if (dx < 0) next();
              else prev();
            }
            touchStart.current = null;
          }}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white border-b border-white/10 pb-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs tracking-widest text-[#E29415] uppercase font-semibold">
                {serviceName}
              </span>
              <span className="text-white/40">/</span>
              <span className="font-mono text-xs text-white/70 tracking-wider">
                FOTOĞRAF {lightboxIndex! + 1} / {total}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={waHref(lightboxIndex!)}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E29415] hover:bg-[#F5A623] text-black font-bold uppercase tracking-wider text-[11px] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>BU UYGULAMAYI SOR</span>
              </a>
              <button
                onClick={close}
                aria-label="Kapat"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Image Area */}
          <div className="relative flex-1 flex items-center justify-center my-3 overflow-hidden">
            <img
              src={currentImage}
              alt={`${serviceName} uygulama detayı #${lightboxIndex! + 1}`}
              className="max-w-full max-h-[72vh] md:max-h-[76vh] object-contain rounded-sm shadow-2xl select-none"
            />

            {/* Prev / Next Buttons */}
            <button
              onClick={prev}
              aria-label="Önceki fotoğraf"
              className="absolute left-2 md:left-6 w-11 h-11 md:w-13 md:h-13 rounded-full bg-black/50 hover:bg-[#E29415] text-white hover:text-black transition-colors flex items-center justify-center cursor-pointer backdrop-blur-sm z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={next}
              aria-label="Sonraki fotoğraf"
              className="absolute right-2 md:right-6 w-11 h-11 md:w-13 md:h-13 rounded-full bg-black/50 hover:bg-[#E29415] text-white hover:text-black transition-colors flex items-center justify-center cursor-pointer backdrop-blur-sm z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Bar / Thumbnail Strip */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 pt-3">
            {/* Filmstrip */}
            <div className="flex items-center gap-2 overflow-x-auto max-w-2xl py-1 px-1 scrollbar-none">
              {images.map((src, idx) => {
                const isSelected = idx === lightboxIndex;
                return (
                  <button
                    key={src}
                    onClick={() => setLightboxIndex(idx)}
                    className={`relative shrink-0 w-12 h-9 md:w-14 md:h-10 rounded-xs overflow-hidden border transition-all cursor-pointer ${
                      isSelected ? 'border-[#E29415] scale-110 shadow-md ring-1 ring-[#E29415]' : 'border-white/20 opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                );
              })}
            </div>

            {/* Mobile CTA */}
            <div className="sm:hidden w-full">
              <a
                href={waHref(lightboxIndex!)}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[#E29415] text-black font-bold uppercase tracking-wider text-xs shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>BU UYGULAMA İÇİN FİYAT AL</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ServiceGallery;
