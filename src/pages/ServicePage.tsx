import React from 'react';
import { ArrowUpRight, Check, ChevronRight, Phone, MessageCircle } from 'lucide-react';
import { SERVICES, SITE, SERVICE_AREAS, ServicePage as Service, servicePath } from '../data/services';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { FloatingWhatsApp } from '../components/FloatingWhatsApp';
import { ServiceGallery } from '../components/ServiceGallery';
import { EmbeddedCatalog } from '../components/EmbeddedCatalog';
import { ServiceArticleSection } from '../components/ServiceArticleSection';

const waHref = (text: string) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

export const ServicePage: React.FC<{ service: Service }> = ({ service }) => {
  const related = service.relatedSlugs
    .map((s) => SERVICES.find((x) => x.slug === s))
    .filter(Boolean) as Service[];

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#141517]">
      <Navbar currentLang="TR" onToggleLang={() => {}} />

      <main>
        {/* ---------------------------------------------------------- hero */}
        <header className="relative pt-32 pb-16 md:pt-44 md:pb-24 px-6 md:px-12 overflow-hidden bg-[#141517]">
          <img
            src={service.heroImage}
            alt={`${service.h1} — M2 Dekorasyon`}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* keeps the headline legible while the photograph still reads */}
          <div className="absolute inset-0 bg-[#141517]/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#141517]/80 via-[#141517]/40 to-[#141517]/90" />

          <div className="relative max-w-7xl mx-auto">
            {/* breadcrumb */}
            <nav aria-label="breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 text-[10px] md:text-[11px] font-mono tracking-[0.2em] uppercase text-white/60">
                <li><a href="/" className="hover:text-white transition-colors">Anasayfa</a></li>
                <li aria-hidden="true"><ChevronRight className="w-3 h-3" /></li>
                <li><a href="/hizmetler/" className="hover:text-white transition-colors">Hizmetler</a></li>
                <li aria-hidden="true"><ChevronRight className="w-3 h-3" /></li>
                <li className="text-[#E29415]" aria-current="page">{service.nav}</li>
              </ol>
            </nav>

            <span className="font-mono text-[10px] text-[#E29415] tracking-[0.3em] uppercase block mb-4">
              HİZMET {service.number} // {SITE.city.toUpperCase()}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white uppercase leading-[0.95] max-w-4xl">
              {service.h1}
            </h1>
            <p className="mt-5 text-base md:text-lg text-white/80 font-light max-w-2xl leading-relaxed">
              {service.tagline}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={waHref(`Merhaba M2 Dekorasyon, ${service.nav} hakkında bilgi almak istiyorum.`)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#E29415] text-black font-bold uppercase tracking-widest text-[11px] md:text-xs active:scale-95 hover:bg-[#F5A623] transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>ÜCRETSİZ KEŞİF İSTE</span>
              </a>
              <a
                href={`tel:${SITE.phone}`}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-white/30 text-white font-mono text-[11px] md:text-xs tracking-widest uppercase hover:border-[#E29415] hover:text-[#E29415] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#E29415]" />
                <span>{SITE.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </header>

        {/* ------------------------------------------- top gallery or catalog */}
        {service.slug === 'duvar-kagidi' ? (
          <EmbeddedCatalog />
        ) : (
          <ServiceGallery serviceSlug={service.slug} serviceName={service.nav} />
        )}

        {/* -------------------------------------------------------- intro */}
        <section className="px-6 md:px-12 border-t border-[#141517]/8 bg-[#F8F6F0]">
          <div className="max-w-7xl mx-auto py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="text-lg md:text-xl text-[#141517]/80 font-light leading-relaxed">
                {service.intro}
              </p>
            </div>
            <aside className="lg:col-span-5">
              <div className="border border-[#141517]/8 bg-white p-6 md:p-7 shadow-[0_4px_24px_rgba(20,21,23,0.03)] rounded-sm">
                <span className="font-mono text-[10px] text-[#E29415] tracking-[0.3em] uppercase block mb-5 font-semibold">
                  ÖNE ÇIKANLAR
                </span>
                <ul className="space-y-3">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-[#141517]/80">
                      <Check className="w-4 h-4 text-[#E29415] shrink-0 mt-0.5" />
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
          <section key={block.heading} className="px-6 md:px-12 border-t border-[#141517]/8 bg-[#F8F6F0]">
            <div className="max-w-7xl mx-auto py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <div className="lg:col-span-7">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#141517] mb-5 leading-tight">
                  {block.heading}
                </h2>
                <p className="text-sm md:text-base text-[#141517]/70 font-light leading-relaxed">
                  {block.body}
                </p>
                {block.bullets && (
                  <ul className="mt-7 space-y-3.5">
                    {block.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm md:text-base text-[#141517]/80 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E29415] shrink-0 mt-2" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {service.gallery[i] && (
                <div className="lg:col-span-5">
                  <div className="relative aspect-[4/3] overflow-hidden border border-[#141517]/10 bg-[#EFECE4] shadow-md rounded-sm">
                    <img
                      src={service.gallery[i]}
                      alt={`${service.nav} uygulaması — ${SITE.city} M2 Dekorasyon`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </section>
        ))}

        {/* --------------------------------------------------------- specs */}
        <section className="px-6 md:px-12 border-t border-[#141517]/8 bg-[#F8F6F0]">
          <div className="max-w-7xl mx-auto py-16 md:py-24">
            <span className="font-mono text-[10px] text-[#E29415] tracking-[0.3em] uppercase block mb-3 font-semibold">
              TEKNİK ÖZET
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#141517] mb-10">
              Ne kullanıyoruz?
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#141517]/10 border border-[#141517]/10 rounded-sm overflow-hidden shadow-sm">
              {service.specs.map((s) => (
                <div key={s.label} className="bg-white p-5 md:p-6">
                  <dt className="font-mono text-[10px] text-[#141517]/50 tracking-[0.2em] uppercase mb-2">
                    {s.label}
                  </dt>
                  <dd className="text-sm md:text-base text-[#141517] font-medium">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* --------------------------------------------------- seo article */}
        <ServiceArticleSection serviceSlug={service.slug} />

        {/* ----------------------------------------------------------- faq */}
        <section className="px-6 md:px-12 border-t border-[#141517]/8 bg-[#F8F6F0]">
          <div className="max-w-7xl mx-auto py-16 md:py-24">
            <span className="font-mono text-[10px] text-[#E29415] tracking-[0.3em] uppercase block mb-3 font-semibold">
              SIKÇA SORULANLAR
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#141517] mb-10">
              {service.nav} hakkında merak edilenler
            </h2>
            <div className="max-w-3xl divide-y divide-[#141517]/10 border-y border-[#141517]/10">
              {service.faq.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex items-start justify-between gap-4 cursor-pointer list-none text-base md:text-lg text-[#141517] font-medium">
                    <span>{f.q}</span>
                    <span className="shrink-0 mt-1 text-[#E29415] transition-transform duration-300 group-open:rotate-45 text-xl leading-none">+</span>
                  </summary>
                  <p className="mt-3.5 text-sm md:text-base text-[#141517]/70 font-light leading-relaxed pr-8">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------------- service area */}
        <section className="px-6 md:px-12 border-t border-[#141517]/8 bg-[#F8F6F0]">
          <div className="max-w-7xl mx-auto py-16 md:py-20">
            <span className="font-mono text-[10px] text-[#E29415] tracking-[0.3em] uppercase block mb-3 font-semibold">
              HİZMET BÖLGESİ
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#141517] mb-6">
              {SITE.city} ve çevresinde {service.nav.toLowerCase()}
            </h2>
            <p className="text-sm md:text-base text-[#141517]/70 font-light max-w-3xl leading-relaxed mb-8">
              Merkez ofisimiz {SITE.district}’da; keşif ve uygulama için {SITE.city}’nın tüm
              ilçelerine gidiyoruz. Sahil hattı ve turizm bölgelerinde sezon dışı takvimle
              çalışarak işin kapalı kalma süresini en aza indiriyoruz.
            </p>
            <ul className="flex flex-wrap gap-2">
              {SERVICE_AREAS.map((a) => (
                <li
                  key={a}
                  className="px-3 py-1.5 border border-[#141517]/10 bg-white text-[11px] font-mono tracking-wider text-[#141517]/75 rounded-sm shadow-sm"
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------- related */}
        {related.length > 0 && (
          <section className="px-6 md:px-12 border-t border-[#141517]/8 bg-[#F8F6F0]">
            <div className="max-w-7xl mx-auto py-16 md:py-24">
              <span className="font-mono text-[10px] text-[#E29415] tracking-[0.3em] uppercase block mb-3 font-semibold">
                DİĞER HİZMETLER
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#141517] mb-10">
                Bunlarla birlikte planlanır
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {related.map((r) => (
                  <a
                    key={r.slug}
                    href={servicePath(r.slug)}
                    className="group relative overflow-hidden border border-[#141517]/10 bg-white aspect-[4/3] rounded-sm shadow-sm"
                  >
                    <img
                      src={r.heroImage}
                      alt={r.h1}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover brightness-[0.8] transition-transform duration-700 md:group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141517]/90 via-[#141517]/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between gap-3">
                      <div>
                        <span className="font-mono text-[10px] text-[#E29415] tracking-widest block mb-1 font-semibold">
                          {r.number}
                        </span>
                        <h3 className="text-lg font-semibold text-white uppercase tracking-tight leading-tight">
                          {r.nav}
                        </h3>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-white/70 md:group-hover:text-[#E29415] transition-colors shrink-0" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ---------------------------------------------------------- cta */}
        <section className="px-6 md:px-12 border-t border-[#141517]/8 bg-[#EFECE4]">
          <div className="max-w-7xl mx-auto py-16 md:py-24 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#141517] leading-tight">
                {service.nav} için ücretsiz keşif
              </h2>
              <p className="mt-3 text-sm md:text-base text-[#141517]/70 font-light max-w-xl">
                Yerinde ölçü alalım, seçenekleri birlikte değerlendirelim ve net fiyat verelim.
                {' '}{SITE.openingHours}.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href={waHref(`Merhaba M2 Dekorasyon, ${service.nav} için ücretsiz keşif talep ediyorum.`)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#E29415] text-black font-bold uppercase tracking-widest text-[11px] md:text-xs active:scale-95 hover:bg-[#F5A623] transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WHATSAPP</span>
              </a>
              <a
                href={`tel:${SITE.phone}`}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-[#141517]/20 text-[#141517] font-mono text-[11px] md:text-xs tracking-widest uppercase hover:border-[#E29415] hover:text-[#E29415] transition-colors bg-white/50"
              >
                <Phone className="w-3.5 h-3.5 text-[#E29415]" />
                <span>ARA</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <FloatingWhatsApp message={`Merhaba M2 Dekorasyon, ${service.nav} hakkında bilgi almak istiyorum.`} />
      <Footer />
    </div>
  );
};

export default ServicePage;
