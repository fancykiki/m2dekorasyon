import React, { useState, useRef, useCallback } from 'react';
import { SlidersHorizontal, Sparkles, MoveHorizontal } from 'lucide-react';

export const TransformationSlider: React.FC = () => {
  const [sliderPos, setSliderPos] = useState<number>(50); // 0 to 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <section id="transformation" className="relative bg-[#050505] text-[#F5F5F5] py-28 md:py-36 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/5">
          <div>
            <span className="font-mono text-[10px] text-[#F27D26] tracking-[0.3em] uppercase block mb-3">
              MEKÂNSAL DÖNÜŞÜM // BEFORE & AFTER
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white uppercase">
              HAM ALANDAN YAŞAM DENEYİMİNE
            </h2>
          </div>
          <p className="mt-4 md:mt-0 max-w-md text-xs md:text-sm text-white/50 font-light leading-relaxed">
            Kaydırıcıyı hareket ettirerek Antalya Konyaaltı'ndaki bir rezidansın kaba inşaat halinden M2 dokunuşuyla nasıl dönüştüğünü karşılaştırın.
          </p>
        </div>

        {/* Interactive Comparison Stage */}
        <div
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden select-none cursor-ew-resize border border-white/10 shadow-2xl bg-[#111111]"
        >
          {/* AFTER Image (Finished Luxury Interior with Stretch Ceiling) */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src="/sequence/after.webp"
              alt="M2 Dekorasyon Tamamlanmış Lüks İç Mimarlık"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-5 right-5 bg-[#050505]/80 backdrop-blur-md px-3.5 py-1.5 border border-white/10 text-[10px] font-mono text-white flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F27D26]" />
              <span>SONRASI // M2 İLE TAMAMLANMIŞ</span>
            </div>
            <div className="absolute bottom-5 right-5 text-right max-w-sm">
              <span className="text-lg sm:text-2xl text-white font-medium block tracking-tight">
                AKUSTİK GERGİ TAVAN & 2700K IŞIK
              </span>
              <span className="text-[11px] font-mono text-white/70">
                Homojen Gölgesiz Difüzyon · Sıcak Amber Cove · Akdeniz Zarafeti
              </span>
            </div>
          </div>

          {/* BEFORE Image (Raw Space - Quiet Architectural Volume of the EXACT SAME room) */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{ width: `${sliderPos}%` }}
          >
            <div className="relative w-full h-full" style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100vw' }}>
              <img
                src="/sequence/before.webp"
                alt="Aydınlatma Öncesi Ham Mimari Mekan"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />

              <div className="absolute top-5 left-5 bg-[#050505]/80 backdrop-blur-md px-3.5 py-1.5 border border-white/10 text-[10px] font-mono text-white/80">
                ÖNCESİ // HAM MİMARİ MEKAN
              </div>
              <div className="absolute bottom-5 left-5 max-w-sm">
                <span className="text-lg sm:text-2xl text-white/95 font-medium block tracking-tight">
                  AYDINLATMA ÖNCESİ SESSİZ HACİM
                </span>
                <span className="text-[11px] font-mono text-white/60">
                  Doğal Sabah Işığı · Ham Tavan Yüzeyi · Işığı Bekleyen Mekan
                </span>
              </div>
            </div>
          </div>

          {/* Dividing Vertical Line & Central Drag Handle */}
          <div
            className="absolute top-0 bottom-0 w-[1.5px] bg-white z-20 pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#050505] border border-white/40 flex items-center justify-center text-white shadow-2xl">
              <MoveHorizontal className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Micro slider hint */}
        <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-white/40">
          <div className="flex items-center space-x-2">
            <SlidersHorizontal className="w-3 h-3 text-[#F27D26]" />
            <span>Farkı görmek için sola veya sağa sürükleyin</span>
          </div>
          <span>KONYAALTI BLUE SUITE · 280 m²</span>
        </div>

      </div>
    </section>
  );
};
