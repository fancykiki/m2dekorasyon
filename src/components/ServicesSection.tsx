import React, { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { SERVICES, SITE, servicePath, ServicePage } from '../data/services';

export const ServicesSection: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(SERVICES[0].slug);
  const active: ServicePage = SERVICES.find((s) => s.slug === activeId) || SERVICES[0];

  return (
    <section
      id="services"
      className="relative bg-[#050505] text-[#F5F5F5] py-28 md:py-36 px-6 md:px-12 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 pb-8 border-b border-white/5">
          <div>
            <span className="font-mono text-[10px] text-[#F27D26] tracking-[0.3em] uppercase block mb-3">
              HİZMETLERİMİZ // 01–05
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white uppercase">
              NE YAPIYORUZ?
            </h2>
          </div>
          <p className="mt-4 md:mt-0 max-w-md text-xs md:text-sm text-white/50 font-light leading-relaxed">
            {SITE.city} ve çevre ilçelerde gergi tavan, duvar kağıdı, mutfak ve banyo yenileme
            ile mimari projelendirmeyi tek elden yürütüyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Editorial service index */}
          <div className="lg:col-span-6 flex flex-col divide-y divide-white/5">
            {SERVICES.map((service) => {
              const isActive = activeId === service.slug;
              return (
                <a
                  key={service.slug}
                  href={servicePath(service.slug)}
                  onMouseEnter={() => setActiveId(service.slug)}
                  onFocus={() => setActiveId(service.slug)}
                  className="py-6 transition-all duration-300 group block"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="flex items-baseline space-x-5 sm:space-x-6 min-w-0">
                      <span
                        className={`font-mono text-xs tracking-widest shrink-0 ${
                          isActive ? 'text-[#F27D26]' : 'text-white/30'
                        }`}
                      >
                        {service.number}
                      </span>
                      <h3
                        className={`text-xl sm:text-2xl md:text-3xl tracking-tight transition-colors ${
                          isActive
                            ? 'text-white font-medium'
                            : 'text-white/70 group-hover:text-white font-light'
                        }`}
                      >
                        {service.nav}
                      </h3>
                    </div>
                    <ArrowUpRight
                      className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
                        isActive ? 'text-[#F27D26] rotate-45' : 'text-white/30 group-hover:text-white/70'
                      }`}
                    />
                  </div>

                  <p
                    className={`mt-3 pl-9 sm:pl-11 text-xs md:text-sm leading-relaxed transition-opacity duration-300 max-w-xl ${
                      isActive ? 'text-white/80' : 'text-white/40'
                    }`}
                  >
                    {service.tagline}
                  </p>
                </a>
              );
            })}
          </div>

          {/* Showcase */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <a
              href={servicePath(active.slug)}
              className="relative block overflow-hidden bg-[#111111] border border-white/5 aspect-[4/3] sm:aspect-[16/11] shadow-2xl group"
            >
              <img
                key={active.heroImage}
                src={active.heroImage}
                alt={`${active.h1} — ${SITE.name}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-all duration-700 filter brightness-90 contrast-105 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent" />

              <div className="absolute top-5 left-5 bg-[#050505]/80 backdrop-blur-md px-3 py-1.5 border border-white/10 text-[10px] font-mono text-white/80 flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F27D26]" />
                <span>{SITE.city.toUpperCase()} · {active.number}</span>
              </div>

              <div className="absolute bottom-5 left-5 right-5">
                <h4 className="text-2xl text-white font-medium uppercase tracking-tight">
                  {active.nav}
                </h4>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {active.specs.slice(0, 3).map((spec) => (
                    <span
                      key={spec.label}
                      className="px-2.5 py-1 bg-white/5 backdrop-blur-sm text-[10px] font-mono text-white/70 border border-white/10"
                    >
                      {spec.label}
                    </span>
                  ))}
                </div>
              </div>
            </a>

            {/* Feature strip for the active service */}
            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5 border border-white/5">
              {active.features.slice(0, 4).map((f) => (
                <li key={f} className="bg-[#111111] p-3.5 flex items-start gap-2.5 text-[11px] text-white/65">
                  <Check className="w-3.5 h-3.5 text-[#F27D26] shrink-0 mt-px" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-3 p-4 bg-[#111111] border border-white/5 flex items-center justify-between gap-4">
              <span className="text-xs text-white/50 font-mono">
                Tüm hizmetleri ve detayları inceleyin.
              </span>
              <a
                href="/hizmetler/"
                className="text-xs font-mono text-white hover:text-[#F27D26] tracking-wider uppercase font-semibold flex items-center gap-1 transition-colors shrink-0"
              >
                <span>HİZMETLER</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
