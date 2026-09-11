import React, { useState, useRef, useCallback } from 'react';
import { SlidersHorizontal, MoveHorizontal, Sparkles, Layers } from 'lucide-react';

interface TransformationPreset {
  id: 'gergi-tavan' | 'duvar-kagidi' | 'mutfak-banyo';
  tabLabel: string;
  category: string;
  beforeImg: string;
  afterImg: string;
  beforeTitle: string;
  beforeDesc: string;
  afterTitle: string;
  afterDesc: string;
  locationInfo: string;
}

const PRESETS: TransformationPreset[] = [
  {
    id: 'gergi-tavan',
    tabLabel: '01 / GERGİ TAVAN',
    category: 'GERGİ TAVAN DÖNÜŞÜMÜ',
    beforeImg: '/sequence/before.webp',
    afterImg: '/sequence/after.webp',
    beforeTitle: 'AYDINLATMA ÖNCESİ SESSİZ HACİM',
    beforeDesc: 'Doğal Işık · Ham Tavan Yüzeyi · Işığı Bekleyen Mekan',
    afterTitle: 'AKUSTİK GERGİ TAVAN & 2700K IŞIK',
    afterDesc: 'Homojen Gölgesiz Difüzyon · Sıcak Amber Cove · Akdeniz Zarafeti',
    locationInfo: 'KONYAALTI REZİDANS · 280 m²',
  },
  {
    id: 'duvar-kagidi',
    tabLabel: '02 / DUVAR KAĞIDI',
    category: 'DUVAR KAĞIDI UYGULAMASI',
    beforeImg: '/transformation/wallpaper-before.webp',
    afterImg: '/transformation/wallpaper-after.webp',
    beforeTitle: 'DÜZ & SOĞUK BOYALI HAM DUVAR',
    beforeDesc: 'Monoton Sıva · Doku Yoksunu Yüzey · Karakter Arayan Alan',
    afterTitle: 'ALTIN DETAYLI İTALYAN BOTANİK DUVAR KAĞIDI',
    afterDesc: 'Tekstil Dokulu Derinlik · Kusursuz Birleşim · Lüks Mimari Karakter',
    locationInfo: 'LARA VİLLA SALON · 340 m²',
  },
  {
    id: 'mutfak-banyo',
    tabLabel: '03 / MUTFAK & BANYO',
    category: 'LÜKS MUTFAK YENİLEME',
    beforeImg: '/transformation/kitchen-before.webp',
    afterImg: '/transformation/kitchen-after.webp',
    beforeTitle: 'ESKİ & FONKSİYONSUZ MUTFAK ALANI',
    beforeDesc: 'Eski Ahşap Dolaplar · Eskimiş Tezgâh · Yetersiz Aydınlatma',
    afterTitle: 'MAT LAKE & MERMER TEZGÂH DÖNÜŞÜMÜ',
    afterDesc: 'Gizli LED Entegre Kulpsuz Dolaplar · Doğal Mermer · Modern Ergonomi',
    locationInfo: 'MURATPAŞA PENTHOUSE · 190 m²',
  },
];

export const TransformationSlider: React.FC = () => {
  const [activePreset, setActivePreset] = useState<TransformationPreset['id']>('gergi-tavan');
  const [sliderPos, setSliderPos] = useState<number>(50); // 0 to 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const current = PRESETS.find((p) => p.id === activePreset) || PRESETS[0];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    handleMove(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignored if capture already lost
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      setSliderPos((prev) => Math.max(0, prev - 2));
    } else if (e.key === 'ArrowRight') {
      setSliderPos((prev) => Math.min(100, prev + 2));
    } else if (e.key === 'Home') {
      setSliderPos(0);
    } else if (e.key === 'End') {
      setSliderPos(100);
    }
  };

  return (
    <section id="transformation" className="relative bg-[#F8F6F0] text-[#141517] py-28 md:py-36 px-6 md:px-12 border-t border-black/8 select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-8 border-b border-black/8">
          <div>
            <span className="font-mono text-[10px] text-[#E29415] tracking-[0.3em] uppercase block mb-3 font-semibold">
              MEKÂNSAL DÖNÜŞÜM // BEFORE & AFTER
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-[#141517] uppercase">
              HAM ALANDAN YAŞAM DENEYİMİNE
            </h2>
          </div>
          <p className="mt-4 md:mt-0 max-w-md text-xs md:text-sm text-[#66686F] font-light leading-relaxed">
            Kaydırıcıyı hareket ettirerek M2 Dekorasyon'un gergi tavan, duvar kağıdı ve mutfak yenileme alanlarındaki dramatik dönüşümlerini karşılaştırın.
          </p>
        </div>

        {/* Minimalist Architectural Category Selector Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {PRESETS.map((p) => {
            const isActive = p.id === activePreset;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setActivePreset(p.id);
                  setSliderPos(50);
                }}
                className={`px-4 py-2.5 text-xs font-mono tracking-wider uppercase transition-all rounded-xs cursor-pointer border flex items-center space-x-2 ${
                  isActive
                    ? 'bg-[#141517] text-white border-[#141517] font-semibold shadow-md'
                    : 'bg-white text-[#141517]/70 border-black/10 hover:border-[#E29415] hover:text-[#141517] shadow-xs'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#E29415]' : 'bg-black/30'}`} />
                <span>{p.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Comparison Stage */}
        <div
          ref={containerRef}
          role="slider"
          aria-label={`${current.category} Öncesi ve Sonrası Dönüşüm Karşılaştırması`}
          aria-valuenow={Math.round(sliderPos)}
          aria-valuemin={0}
          aria-valuemax={100}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative w-full aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9] overflow-hidden cursor-ew-resize border border-black/8 shadow-[0_20px_60px_-20px_rgba(20,21,23,0.12)] bg-[#EFECE4] touch-none focus:outline-none focus:ring-2 focus:ring-[#E29415] rounded-xs"
        >
          {/* AFTER Image (Full container base layer) */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <img
              key={`after-${current.id}`}
              src={current.afterImg}
              alt={current.afterTitle}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />

            {/* After Tag */}
            <div className="absolute top-4 right-4 sm:top-5 sm:right-5 bg-white/95 backdrop-blur-md px-2.5 py-1 sm:px-3.5 sm:py-1.5 border border-black/10 text-[9px] sm:text-[10px] font-mono text-[#141517] flex items-center space-x-1.5 sm:space-x-2 rounded-xs shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E29415]" />
              <span className="sm:hidden font-semibold">SONRASI</span>
              <span className="hidden sm:inline font-semibold">SONRASI // M2 DOKUNUŞU</span>
            </div>

            {/* After Description Card */}
            <div className="hidden sm:block absolute bottom-5 right-5 text-right max-w-md bg-black/75 backdrop-blur-md p-4 border border-white/10 rounded-xs shadow-xl">
              <span className="text-sm sm:text-base md:text-lg text-white font-medium block tracking-tight leading-snug">
                {current.afterTitle}
              </span>
              <span className="text-[11px] font-mono text-white/70 block mt-1">
                {current.afterDesc}
              </span>
            </div>
          </div>

          {/* BEFORE Image (Clipped via CSS polygon - 100% exact alignment, no layout thrash) */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
            style={{
              clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
              WebkitClipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
            }}
          >
            <img
              key={`before-${current.id}`}
              src={current.beforeImg}
              alt={current.beforeTitle}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />

            {/* Before Tag */}
            <div className="absolute top-4 left-4 sm:top-5 sm:left-5 bg-white/95 backdrop-blur-md px-2.5 py-1 sm:px-3.5 sm:py-1.5 border border-black/10 text-[9px] sm:text-[10px] font-mono text-[#141517] rounded-xs shadow-md font-semibold">
              <span className="sm:hidden">ÖNCESİ</span>
              <span className="hidden sm:inline">ÖNCESİ // HAM HALİ</span>
            </div>

            {/* Before Description Card */}
            <div className="hidden sm:block absolute bottom-5 left-5 max-w-md bg-black/75 backdrop-blur-md p-4 border border-white/10 rounded-xs shadow-xl">
              <span className="text-sm sm:text-base md:text-lg text-white/95 font-medium block tracking-tight leading-snug">
                {current.beforeTitle}
              </span>
              <span className="text-[11px] font-mono text-white/60 block mt-1">
                {current.beforeDesc}
              </span>
            </div>
          </div>

          {/* Dividing Vertical Line & Central Drag Handle */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-white z-20 pointer-events-none shadow-[0_0_15px_rgba(226,148,21,0.8)]"
            style={{ left: `${sliderPos}%` }}
          >
            {/* Elegant luxury circular handle */}
            <div
              className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border transition-transform duration-150 flex items-center justify-center text-[#141517] shadow-2xl ${
                isDragging
                  ? 'border-[#E29415] scale-110 ring-2 ring-[#E29415]/50 text-[#E29415]'
                  : 'border-black/20 hover:border-[#E29415]'
              }`}
            >
              <MoveHorizontal className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Micro slider footer info */}
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-[11px] font-mono text-[#66686F]">
          <div className="flex items-center space-x-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#E29415] shrink-0" />
            <span>Farkı görmek için tutup sürükleyin veya istediğiniz noktaya tıklayın</span>
          </div>
          <span className="text-[#141517] font-semibold">{current.locationInfo}</span>
        </div>

      </div>
    </section>
  );
};
