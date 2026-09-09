import React, { useState } from 'react';
import { SERVICES } from '../data/content';
import { Service } from '../types';
import { ArrowUpRight, Check, ChevronDown, Sparkles } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const [activeServiceId, setActiveServiceId] = useState<string>(SERVICES[0].id);
  const [expandedDetailsId, setExpandedDetailsId] = useState<string | null>(null);

  const activeService = SERVICES.find((s) => s.id === activeServiceId) || SERVICES[0];

  return (
    <section id="services" className="relative bg-[#050505] text-[#F5F5F5] py-28 md:py-36 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header with Architectural Tone */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 pb-8 border-b border-white/5">
          <div>
            <span className="font-mono text-[10px] text-[#F27D26] tracking-[0.3em] uppercase block mb-3">
              UZMANLIK ALANLARIMIZ // 01-04
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white uppercase">
              NE YAPIYORUZ?
            </h2>
          </div>
          <p className="mt-4 md:mt-0 max-w-md text-xs md:text-sm text-white/50 font-light leading-relaxed">
            Antalya ve Akdeniz bölgesinde ham mekanları, yüksek mühendislik disiplini ve zamansız estetikle kusursuz yaşam alanlarına dönüştürüyoruz.
          </p>
        </div>

        {/* Editorial Layout: Large Master Viewport + Interactive Index List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Interactive Editorial Service Index (Large Typography, No generic cards) */}
          <div className="lg:col-span-6 flex flex-col divide-y divide-white/5">
            {SERVICES.map((service) => {
              const isActive = activeServiceId === service.id;
              const isExpanded = expandedDetailsId === service.id;

              return (
                <div 
                  key={service.id}
                  className="py-6 transition-all duration-300 group cursor-pointer"
                  onMouseEnter={() => setActiveServiceId(service.id)}
                  onClick={() => {
                    setActiveServiceId(service.id);
                    setExpandedDetailsId(isExpanded ? null : service.id);
                  }}
                >
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline space-x-6">
                      <span className={`font-mono text-xs tracking-widest ${isActive ? 'text-[#F27D26]' : 'text-white/30'}`}>
                        {service.number}
                      </span>
                      <h3 className={`text-2xl sm:text-3xl md:text-4xl tracking-tight transition-colors ${
                        isActive ? 'text-white font-medium translate-x-1.5' : 'text-white/70 group-hover:text-white font-light'
                      }`}>
                        {service.title}
                      </h3>
                    </div>
                    <ArrowUpRight className={`w-4 h-4 transition-transform duration-300 ${
                      isActive ? 'text-[#F27D26] rotate-45' : 'text-white/30 group-hover:text-white/70'
                    }`} />
                  </div>

                  <p className={`mt-3 pl-10 text-xs md:text-sm leading-relaxed transition-opacity duration-300 ${
                    isActive ? 'text-white/80 opacity-100 max-w-xl' : 'text-white/40 opacity-70 max-w-lg'
                  }`}>
                    {service.description}
                  </p>

                  {/* Inline Expanded Specifications (if clicked) */}
                  {isExpanded && (
                    <div className="mt-4 pl-10 pt-4 border-t border-white/5 animate-fade-in">
                      <p className="text-xs text-white/70 leading-relaxed mb-4">
                        {service.fullDetails}
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-[#F27D26]">
                        {service.features.map((feat) => (
                          <div key={feat} className="flex items-center space-x-1.5">
                            <Check className="w-3 h-3" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Enormous High-End Imagery Showcase */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <div className="relative overflow-hidden bg-[#111111] border border-white/5 aspect-[4/3] sm:aspect-[16/11] rounded-xs shadow-2xl group">
              
              {/* Dynamic Image with Cinematic Scale */}
              <img
                key={activeService.image}
                src={activeService.image}
                alt={activeService.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-700 filter brightness-90 contrast-105 group-hover:scale-105"
              />

              {/* Gradient Scrim for Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent" />

              {/* Floating Architectural Badge with Amber Accent */}
              <div className="absolute top-5 left-5 bg-[#050505]/80 backdrop-blur-md px-3 py-1.5 border border-white/10 text-[10px] font-mono text-white/80 flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F27D26]" />
                <span>M2 UYGULAMA ALTYAPISI</span>
              </div>

              {/* Bottom Editorial Caption */}
              <div className="absolute bottom-5 left-5 right-5">
                <div className="font-mono text-[10px] text-[#F27D26] tracking-widest uppercase mb-1">
                  {activeService.number} // {activeService.tagline}
                </div>
                <h4 className="text-2xl text-white font-medium uppercase tracking-tight">
                  {activeService.title}
                </h4>

                {/* Quick specs pill row */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {activeService.specifications.slice(0, 3).map((spec) => (
                    <span 
                      key={spec} 
                      className="px-2.5 py-1 bg-white/5 backdrop-blur-sm text-[10px] font-mono text-white/70 border border-white/10"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Consultation Callout */}
            <div className="mt-3 p-4 bg-[#111111] border border-white/5 flex items-center justify-between">
              <span className="text-xs text-white/50 font-mono">
                Ücretsiz yerinde rölöve ve keşif talebi oluşturun.
              </span>
              <a
                href="#contact"
                className="text-xs font-mono text-white hover:text-[#F27D26] tracking-wider uppercase font-semibold flex items-center space-x-1 transition-colors"
              >
                <span>KEŞİF İSTE</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
