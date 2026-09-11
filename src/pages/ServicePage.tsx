import React from 'react';
import { ArrowUpRight, Check, ChevronRight, Phone, MessageCircle } from 'lucide-react';
import { SERVICES, SITE, SERVICE_AREAS, ServicePage as Service, servicePath } from '../data/services';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

const waHref = (text: string) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

export const ServicePage: React.FC<{ service: Service }> = ({ service }) => {
  const related = service.relatedSlugs
    .map((s) => SERVICES.find((x) => x.slug === s))
    .filter(Boolean) as Service[];

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5]">
      <Navbar currentLang="TR" onToggleLang={() => {}} />

      <main>
        {/* ---------------------------------------------------------- hero */}
        <header className="relative pt-32 pb-16 md:pt-44 md:pb-24 px-6 md:px-12 overflow-hidden">
          <img
            src={service.heroImage}
            alt={`${service.h1} — M2 Dekorasyon`}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* keeps the headline legible while the photograph still reads */}
          <div className="absolute inset-0 bg-[#050505]/45" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-[#050505]/35 to-[#050505]" />

          <div className="relative max-w-7xl mx-auto">
            {/* breadcrumb */}
            <nav aria-label="breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 text-[10px] md:text-[11px] font-mono tracking-[0.2em] uppercase text-white/45">
                <li><a href="/" className="hover:text-white transition-colors">Anasayfa</a></li>
                <li aria-hidden="true"><ChevronRight className="w-3 h-3" /></li>
                <li><a href="/hizmetler/" className="hover:text-white transition-colors">Hizmetler</a></li>
                <li aria-hidden="true"><ChevronRight className="w-3 h-3" /></li>
                <li className="text-[#F27D26]" aria-current="page">{service.nav}</li>
              </ol>
            </nav>

            <span className="font-mono text-[10px] text-[#F27D26] tracking-[0.3em] uppercase block mb-4">
              HİZMET {service.number} // {SITE.city.toUpperCase()}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white uppercase leading-[0.95] max-w-4xl">
              {service.h1}
            </h1>
            <p className="mt-5 text-base md:text-lg text-white/70 font-light max-w-2xl leading-relaxed">
              {service.tagline}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={waHref(`Merhaba M2 Dekorasyon, ${service.nav} hakkında bilgi almak istiyorum.`)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#F27D26] text-black font-bold uppercase tracking-widest text-[11px] md:text-xs active:scale-95 md:hover:bg-white transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>ÜCRETSİZ KEŞİF İSTE</span>
              </a>
              <a
                href={`tel:${SITE.phone}`}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-white/20 text-white font-mono text-[11px] md:text-xs tracking-widest uppercase md:hover:border-[#F27D26] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#F27D26]" />
                <span>{SITE.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </header>

        {/* -------------------------------------------------------- intro */}
        <section className="px-6 md:px-12 border-t border-white/5">
          <div className="max-w-7xl mx-auto py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed">
                {service.intro}
              </p>
            </div>
            <aside className="lg:col-span-5">
              <div className="border border-white/10 bg-[#111111] p-6 md:p-7">
                <span className="font-mono text-[10px] text-[#F27D26] tracking-[0.3em] uppercase block mb-5">
                  ÖNE ÇIKANLAR
                </span>
                <ul className="space-y-3">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-white/75">
                      <Check className="w-4 h-4 text-[#F27D26] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>

        {/* ------------------------------------------------------- content */}
        {service.blocks.map((block, i) => (
          <section key={block.heading} className="px-6 md:px-12 border-t border-white/5">
            <div className="max-w-7xl mx-auto py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <div className="lg:col-span-7">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-5 leading-tight">
                  {block.heading}
                </h2>
                <p className="text-sm md:text-base text-white/65 font-light leading-relaxed">
                  {block.body}
                </p>
                {block.bullets && (
                  <ul className="mt-7 space-y-3.5">
                    {block.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm md:text-base text-white/75 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F27D26] shrink-0 mt-2" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {service.gallery[i] && (
                <div className="lg:col-span-5">
                  <div className="relative aspect-[4/3] overflow-hidden border border-white/10 bg-[#111111]">
                    <img
                      src={service.gallery[i]}
                      alt={`${service.nav} uygulaması — ${SITE.city} M2 Dekorasyon`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover brightness-90"
                    />
                  </div>
                </div>
              )}
            </div>
          </section>
        ))}

        {/* --------------------------------------------------------- specs */}
        <section className="px-6 md:px-12 border-t border-white/5">
          <div className="max-w-7xl mx-auto py-16 md:py-24">
            <span className="font-mono text-[10px] text-[#F27D26] tracking-[0.3em] uppercase block mb-3">
              TEKNİK ÖZET
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-10">
              Ne kullanıyoruz?
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10 border border-white/10">
              {service.specs.map((s) => (
                <div key={s.label} className="bg-[#050505] p-5 md:p-6">
                  <dt className="font-mono text-[10px] text-white/40 tracking-[0.2em] uppercase mb-2">
                    {s.label}
                  </dt>
                  <dd className="text-sm md:text-base text-white/85">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ----------------------------------------------------------- faq */}
        <section className="px-6 md:px-12 border-t border-white/5">
          <div className="max-w-7xl mx-auto py-16 md:py-24">
            <span className="font-mono text-[10px] text-[#F27D26] tracking-[0.3em] uppercase block mb-3">
              SIKÇA SORULANLAR
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-10">
              {service.nav} hakkında merak edilenler
            </h2>
            <div className="max-w-3xl divide-y divide-white/10 border-y border-white/10">
              {service.faq.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex items-start justify-between gap-4 cursor-pointer list-none text-base md:text-lg text-white/90 font-medium">
                    <span>{f.q}</span>
                    <span className="shrink-0 mt-1 text-[#F27D26] transition-transform duration-300 group-open:rotate-45 text-xl leading-none">+</span>
                  </summary>
                  <p className="mt-3.5 text-sm md:text-base text-white/60 font-light leading-relaxed pr-8">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------------- service area */}
        <section className="px-6 md:px-12 border-t border-white/5">
          <div className="max-w-7xl mx-auto py-16 md:py-20">
            <span className="font-mono text-[10px] text-[#F27D26] tracking-[0.3em] uppercase block mb-3">
              HİZMET BÖLGESİ
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-6">
              {SITE.city} ve çevresinde {service.nav.toLowerCase()}
            </h2>
            <p className="text-sm md:text-base text-white/60 font-light max-w-3xl leading-relaxed mb-8">
              Merkez ofisimiz {SITE.district}’da; keşif ve uygulama için {SITE.city}’nın tüm
              ilçelerine gidiyoruz. Sahil hattı ve turizm bölgelerinde sezon dışı takvimle
              çalışarak işin kapalı kalma süresini en aza indiriyoruz.
            </p>
            <ul className="flex flex-wrap gap-2">
              {SERVICE_AREAS.map((a) => (
                <li
                  key={a}
                  className="px-3 py-1.5 border border-white/10 bg-[#111111] text-[11px] font-mono tracking-wider text-white/60"
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------- related */}
        {related.length > 0 && (
          <section className="px-6 md:px-12 border-t border-white/5">
            <div className="max-w-7xl mx-auto py-16 md:py-24">
              <span className="font-mono text-[10px] text-[#F27D26] tracking-[0.3em] uppercase block mb-3">
                DİĞER HİZMETLER
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-10">
                Bunlarla birlikte planlanır
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {related.map((r) => (
                  <a
                    key={r.slug}
                    href={servicePath(r.slug)}
                    className="group relative overflow-hidden border border-white/10 bg-[#111111] aspect-[4/3]"
                  >
                    <img
                      src={r.heroImage}
                      alt={r.h1}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover brightness-[0.55] transition-transform duration-700 md:group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between gap-3">
                      <div>
                        <span className="font-mono text-[10px] text-[#F27D26] tracking-widest block mb-1">
                          {r.number}
                        </span>
                        <h3 className="text-lg font-semibold text-white uppercase tracking-tight leading-tight">
                          {r.nav}
                        </h3>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-white/50 md:group-hover:text-[#F27D26] transition-colors shrink-0" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ---------------------------------------------------------- cta */}
        <section className="px-6 md:px-12 border-t border-white/5 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto py-16 md:py-24 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
                {service.nav} için ücretsiz keşif
              </h2>
              <p className="mt-3 text-sm md:text-base text-white/55 font-light max-w-xl">
                Yerinde ölçü alalım, seçenekleri birlikte değerlendirelim ve net fiyat verelim.
                {' '}{SITE.openingHours}.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href={waHref(`Merhaba M2 Dekorasyon, ${service.nav} için ücretsiz keşif talep ediyorum.`)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#F27D26] text-black font-bold uppercase tracking-widest text-[11px] md:text-xs active:scale-95 md:hover:bg-white transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WHATSAPP</span>
              </a>
              <a
                href={`tel:${SITE.phone}`}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-white/20 text-white font-mono text-[11px] md:text-xs tracking-widest uppercase md:hover:border-[#F27D26] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#F27D26]" />
                <span>ARA</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicePage;
