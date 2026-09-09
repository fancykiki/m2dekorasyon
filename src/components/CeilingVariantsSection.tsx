import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CINEMATIC_SCENES } from '../data/content';

/**
 * "Gergi tavan çeşitleri" strip shown right below the scroll-film hero. Reuses the
 * consistent render set in /public/hero (frames 02–09 of CINEMATIC_SCENES): the
 * matte / cove-lit / backlit / gloss / starry ceiling variants plus the wallpaper,
 * kitchen and bathroom applications.
 */
const VARIANTS = CINEMATIC_SCENES.slice(1, 9);

export const CeilingVariantsSection: React.FC = () => {
  return (
    <section
      id="gergi-tavan-cesitleri"
      className="relative bg-[#050505] text-[#F5F5F5] py-24 md:py-32 px-6 md:px-12 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 md:mb-20 pb-8 border-b border-white/5">
          <div>
            <span className="font-mono text-[10px] text-[#F27D26] tracking-[0.3em] uppercase block mb-3">
              GERGİ TAVAN SİSTEMLERİ // 01–08
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white uppercase">
              TAVANIN HER HÂLİ.
            </h2>
          </div>
          <p className="mt-4 md:mt-0 max-w-md text-xs md:text-sm text-white/50 font-light leading-relaxed">
            Mat, gizli ışıklı, arkadan aydınlatmalı, parlak lake ve yıldızlı gökyüzü membranları;
            ıslak hacimlerde bile eksiz, dökülmeyen, tek günde montajlı yüzeyler.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {VARIANTS.map((v) => (
            <article
              key={v.id}
              className="group relative overflow-hidden bg-[#111111] border border-white/5 rounded-sm aspect-[4/5] shadow-xl"
            >
              <img
                src={v.src}
                alt={v.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover brightness-90 contrast-105 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />

              <div className="absolute top-3 left-3 bg-[#050505]/75 backdrop-blur-md px-2 py-1 border border-white/10 text-[9px] font-mono text-white/80 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F27D26]" />
                <span>{v.number}</span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-3.5">
                <h3 className="text-sm md:text-base text-white font-semibold uppercase tracking-tight leading-snug">
                  {v.title}
                </h3>
                <p className="mt-1 text-[11px] text-white/60 font-light leading-snug line-clamp-2">
                  {v.caption}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 md:mt-8 p-4 bg-[#111111] border border-white/5 flex items-center justify-between">
          <span className="text-xs text-white/50 font-mono">
            Mekânınıza hangi gergi tavanın uygun olduğunu birlikte belirleyelim.
          </span>
          <a
            href="#contact"
            className="text-xs font-mono text-white hover:text-[#F27D26] tracking-wider uppercase font-semibold flex items-center gap-1 transition-colors"
          >
            <span>KEŞİF İSTE</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CeilingVariantsSection;
