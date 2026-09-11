import React from 'react';
import { ArrowUpRight, ChevronRight, Phone, MessageCircle } from 'lucide-react';
import { SERVICES, SITE, SERVICE_AREAS, servicePath } from '../data/services';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const ServicesIndexPage: React.FC = () => (
  <div className="min-h-screen bg-[#050505] text-[#F5F5F5]">
    <Navbar currentLang="TR" onToggleLang={() => {}} />

    <main>
      <header className="px-6 md:px-12 pt-32 pb-14 md:pt-44 md:pb-20">
        <div className="max-w-7xl mx-auto">
          <nav aria-label="breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-[10px] md:text-[11px] font-mono tracking-[0.2em] uppercase text-white/45">
              <li><a href="/" className="hover:text-white transition-colors">Anasayfa</a></li>
              <li aria-hidden="true"><ChevronRight className="w-3 h-3" /></li>
              <li className="text-[#F27D26]" aria-current="page">Hizmetler</li>
            </ol>
          </nav>

          <span className="font-mono text-[10px] text-[#F27D26] tracking-[0.3em] uppercase block mb-4">
            HİZMETLERİMİZ // 01–05
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white uppercase leading-[0.95] max-w-4xl">
            Antalya’da İç Mekân Yenileme Hizmetleri
          </h1>
          <p className="mt-6 text-base md:text-lg text-white/65 font-light max-w-2xl leading-relaxed">
            Gergi tavandan duvar kağıdına, mutfak ve banyo yenilemeden mimari projelendirmeye
            kadar iç mekânın tamamını tek elden yürütüyoruz. Ölçü, proje, imalat ve montaj
            aynı ekipte olduğu için takvim ve bütçe kontrolden çıkmaz.
          </p>
        </div>
      </header>

      {/* services list */}
      <section className="px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto py-14 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {SERVICES.map((s, i) => (
            <a
              key={s.slug}
              href={servicePath(s.slug)}
              className={`group relative overflow-hidden border border-white/10 bg-[#111111] ${
                i === 0 ? 'md:col-span-2 aspect-[16/9] md:aspect-[21/9]' : 'aspect-[4/3]'
              }`}
            >
              <img
                src={s.heroImage}
                alt={`${s.h1} — M2 Dekorasyon Antalya`}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover brightness-[0.5] transition-transform duration-700 md:group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent" />

              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                <span className="font-mono text-[10px] text-[#F27D26] tracking-[0.3em] mb-2">
                  {s.number}
                </span>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white uppercase tracking-tight leading-tight">
                      {s.nav}
                    </h2>
                    <p className="mt-2 text-xs md:text-sm text-white/60 font-light max-w-lg leading-relaxed">
                      {s.tagline}
                    </p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-white/50 md:group-hover:text-[#F27D26] transition-colors shrink-0 mb-1" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* service area */}
      <section className="px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto py-16 md:py-20">
          <span className="font-mono text-[10px] text-[#F27D26] tracking-[0.3em] uppercase block mb-3">
            HİZMET BÖLGESİ
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-6">
            {SITE.city} geneli keşif ve uygulama
          </h2>
          <p className="text-sm md:text-base text-white/60 font-light max-w-3xl leading-relaxed mb-8">
            Ofisimiz {SITE.district}, {SITE.city}. Keşif ücretsizdir; ölçü sonrası kalem kalem
            fiyat tablosu paylaşıyoruz.
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

      {/* cta */}
      <section className="px-6 md:px-12 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto py-16 md:py-24 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
              Projenizi konuşalım
            </h2>
            <p className="mt-3 text-sm md:text-base text-white/55 font-light max-w-xl">
              Hangi hizmete ihtiyacınız olduğundan emin değilseniz de arayın; yerinde bakıp
              en doğru çözümü birlikte belirleyelim. {SITE.openingHours}.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Merhaba M2 Dekorasyon, hizmetleriniz hakkında bilgi almak istiyorum.')}`}
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
              <span>{SITE.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
);

export default ServicesIndexPage;
