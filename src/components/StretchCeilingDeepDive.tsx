import React, { useState } from 'react';
import { STRETCH_CEILING_TYPES } from '../data/content';
import { Sun, Shield, Award, Sparkles, Volume2, CheckCircle } from 'lucide-react';

export const StretchCeilingDeepDive: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>(STRETCH_CEILING_TYPES[0].id);
  const [kelvin, setKelvin] = useState<number>(3000); // 2700K to 6500K
  const [brightness, setBrightness] = useState<number>(85); // 20% to 100%

  const currentType = STRETCH_CEILING_TYPES.find((t) => t.id === selectedType) || STRETCH_CEILING_TYPES[0];

  // Dynamic color calculation based on Kelvin
  const getKelvinColor = (k: number, b: number) => {
    // 2700: warm amber/champagne -> 6500: crisp cool white
    const t = (k - 2700) / (6500 - 2700);
    const r = Math.round(255 - t * 35);
    const g = Math.round(220 + t * 25);
    const bColor = Math.round(180 + t * 75);
    const alpha = b / 100;
    return `rgba(${r}, ${g}, ${bColor}, ${alpha})`;
  };

  return (
    <section id="stretch-ceiling" className="relative bg-[#050505] text-[#F5F5F5] py-28 md:py-36 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/5">
          <div>
            <span className="font-mono text-[10px] text-[#F27D26] tracking-[0.3em] uppercase block mb-3">
              M2 İMZA DİSİPLİNİ // LIGHT ARCHITECTURE
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white uppercase">
              GERGİ TAVAN TEKNOLOJİSİ
            </h2>
          </div>
          <p className="mt-4 md:mt-0 max-w-md text-xs md:text-sm text-white/50 font-light leading-relaxed">
            Işığı, akustiği ve estetiği tavanda birleştiren mühendislik. Sarkmayan, solmayan ve A1 yanmazlık sertifikalı Avrupa membran sistemleri.
          </p>
        </div>

        {/* Membrane Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-12">
          {STRETCH_CEILING_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`p-4 text-left border transition-all cursor-pointer rounded-xs ${
                selectedType === type.id
                  ? 'bg-[#161616] border-white/30 text-white shadow-xl'
                  : 'bg-[#111111]/60 border-white/5 hover:border-white/20 text-white/50'
              }`}
            >
              <span className={`text-[9px] font-mono tracking-widest uppercase block mb-1 ${
                selectedType === type.id ? 'text-[#F27D26]' : 'text-white/40'
              }`}>
                {type.tag}
              </span>
              <span className="text-sm sm:text-base text-white font-medium block tracking-tight">
                {type.name.split(' ')[0]} {type.name.split(' ')[1] || ''}
              </span>
            </button>
          ))}
        </div>

        {/* Interactive Lighting & Atmosphere Simulation Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Interactive Simulated Room Ceiling */}
          <div className="lg:col-span-7 bg-[#111111] border border-white/5 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl rounded-xs">
            
            {/* The Ceiling Glow Simulation Frame */}
            <div className="relative w-full aspect-[16/10] bg-[#050505] border border-white/10 overflow-hidden flex flex-col items-center justify-center">
              
              {/* Virtual Glowing Membrane */}
              <div
                className="w-full h-full transition-all duration-300 relative flex items-center justify-center"
                style={{
                  backgroundColor: getKelvinColor(kelvin, brightness),
                  boxShadow: `0 0 90px ${getKelvinColor(kelvin, brightness * 0.7)}`
                }}
              >
                {/* Simulated Ceiling Architectural Texture */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />
                
                {/* Perspective Aluminum Profile Border */}
                <div className="absolute inset-4 border border-black/20 pointer-events-none" />

                {/* Real-time telemetry in center */}
                <div className="bg-[#050505]/85 backdrop-blur-md px-5 py-3 border border-white/15 text-center text-white">
                  <div className="font-mono text-xs text-[#F27D26] tracking-widest">
                    {kelvin} KELVIN · %{brightness} PARLAKLIK
                  </div>
                  <div className="text-base sm:text-lg text-white font-medium mt-1 tracking-tight">
                    {kelvin < 3200 ? 'Sıcak Akdeniz Akşamı (Warm Glow)' : kelvin < 4500 ? 'Doğal Günışığı (Neutral White)' : 'Net Mimari Aydınlatma (Cool Daylight)'}
                  </div>
                </div>
              </div>

              {/* Bottom Room Silhouette */}
              <div className="absolute bottom-0 w-full h-12 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
            </div>

            {/* Interactive Lighting Controls: Kelvin & Dimmer */}
            <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="flex justify-between text-xs font-mono text-white/70 mb-2">
                  <span className="flex items-center space-x-1.5">
                    <Sun className="w-3.5 h-3.5 text-[#F27D26]" />
                    <span>IŞIK SICAKLIĞI (KELVIN)</span>
                  </span>
                  <span className="text-white font-semibold">{kelvin}K</span>
                </div>
                <input
                  type="range"
                  min={2700}
                  max={6500}
                  step={100}
                  value={kelvin}
                  onChange={(e) => setKelvin(parseInt(e.target.value, 10))}
                  className="w-full h-1 bg-white/10 rounded-none appearance-none cursor-pointer accent-white"
                />
                <div className="flex justify-between text-[9px] font-mono text-white/40 mt-1">
                  <span>2700K (Sıcak Amber)</span>
                  <span>4000K</span>
                  <span>6500K (Soğuk Beyaz)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-white/70 mb-2">
                  <span>DİMMER / PARLAKLIK ORANI</span>
                  <span className="text-white font-semibold">%{brightness}</span>
                </div>
                <input
                  type="range"
                  min={15}
                  max={100}
                  value={brightness}
                  onChange={(e) => setBrightness(parseInt(e.target.value, 10))}
                  className="w-full h-1 bg-white/10 rounded-none appearance-none cursor-pointer accent-white"
                />
                <div className="flex justify-between text-[9px] font-mono text-white/40 mt-1">
                  <span>%15 Loş Ambiyans</span>
                  <span>%100 Tam Lümen</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Technical Spec Sheet of Selected Membrane */}
          <div className="lg:col-span-5 bg-[#111111] border border-white/5 p-6 md:p-8 flex flex-col justify-between rounded-xs">
            <div>
              <div className="inline-flex items-center space-x-2 text-[#F27D26] font-mono text-[10px] tracking-widest uppercase mb-2">
                <Sparkles className="w-3 h-3" />
                <span>MEMBRAN KÜNYESİ</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl text-white font-medium uppercase tracking-tight">
                {currentType.name}
              </h3>

              <p className="mt-4 text-xs md:text-sm text-white/60 leading-relaxed font-light">
                {currentType.desc}
              </p>

              <div className="mt-6 space-y-3 border-t border-white/5 pt-6 text-xs">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40 font-mono">Işık Geçirgenliği</span>
                  <span className="text-white font-mono">{currentType.lightPass}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40 font-mono">Yüzey Bitişi</span>
                  <span className="text-white font-mono">{currentType.finish}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40 font-mono">Kelvin Aralığı</span>
                  <span className="text-white font-mono">{currentType.kelvinRange}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40 font-mono">Garanti Süresi</span>
                  <span className="text-white font-mono">{currentType.warranty}</span>
                </div>
              </div>

              <div className="mt-6 p-3 bg-white/5 border border-white/5 text-xs text-white/80 font-mono">
                <span className="text-[#F27D26] block mb-1 text-[10px]">İDEAL KULLANIM ALANLARI:</span>
                <span className="text-white/70">{currentType.idealFor}</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <a
                href="#contact"
                className="w-full py-3.5 bg-white hover:bg-[#e0e0e0] text-black text-center font-mono text-xs tracking-wider uppercase font-semibold block transition-colors"
              >
                BU MEMBRAN İÇİN FİYAT ALIN
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
