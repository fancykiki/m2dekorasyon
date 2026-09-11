import React from 'react';
import { ArrowUpRight, ChevronRight, Phone, MessageCircle } from 'lucide-react';
import { SERVICES, SITE, SERVICE_AREAS, servicePath } from '../data/services';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { FloatingWhatsApp } from '../components/FloatingWhatsApp';

export const ServicesIndexPage: React.FC = () => (
  <div className="min-h-screen bg-[#F8F6F0] text-[#141517] selection:bg-[#E29415] selection:text-white">
    <Navbar currentLang="TR" onToggleLang={() => {}} />

    <main>
      <header className="px-6 md:px-12 pt-32 pb-14 md:pt-44 md:pb-20 bg-[#F4F1EA] border-b border-black/8">
        <div className="max-w-7xl mx-auto">
          <nav aria-label="breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-[10px] md:text-[11px] font-mono tracking-[0.2em] uppercase text-[#66686F]">
              <li><a href="/" className="hover:text-[#141517] transition-colors">Anasayfa</a></li>
              <li aria-hidden="true"><ChevronRight className="w-3 h-3" /></li>
              <li className="text-[#E29415] font-semibold" aria-current="page">Hizmetler</li>
            </ol>
          </nav>

          <span className="font-mono text-[10px] text-[#E29415] tracking-[0.3em] uppercase block mb-4 font-semibold">
            HİZMETLERİMİZ // 01–05
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-[#141517] uppercase leading-[0.95] max-w-4xl">
            Antalya’da İç Mekân Yenileme Hizmetleri
          </h1>
          <p className="mt-6 text-base md:text-lg text-[#66686F] font-light max-w-2xl leading-relaxed">
            Gergi tavandan duvar kağıdına, mutfak ve banyo yenilemeden mimari projelendirmeye
            kadar iç mekânın tamamını tek elden yürütüyoruz. Ölçü, proje, imalat ve montaj
            aynı ekipte olduğu için takvim ve bütçe kontrolden çıkmaz.
          </p>
        </div>
      </header>

      {/* services list */}
      <section className="px-6 md:px-12">
        <div className="max-w-7xl mx-auto py-14 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {SERVICES.map((s, i) => (
            <a
              key={s.slug}
              href={servicePath(s.slug)}
              className={`group relative overflow-hidden border border-black/8 bg-white rounded-xs shadow-[0_15px_35px_-15px_rgba(20,21,23,0.08)] ${
                i === 0 ? 'md:col-span-2 aspect-[16/9] md:aspect-[21/9]' : 'aspect-[4/3]'
              }`}
            >
              <img
                src={s.heroImage}
                alt={`${s.h1} — M2 Dekorasyon Antalya`}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover brightness-[0.6] transition-transform duration-700 md:group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                <span className="font-mono text-[10px] text-[#E29415] tracking-[0.3em] mb-2 font-semibold">
                  {s.number}
                </span>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white uppercase tracking-tight leading-tight">
                      {s.nav}
                    </h2>
                    <p className="mt-2 text-xs md:text-sm text-white/75 font-light max-w-lg leading-relaxed">
                      {s.tagline}
                    </p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-white/70 md:group-hover:text-[#E29415] transition-colors shrink-0 mb-1" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* service area */}
      <section className="px-6 md:px-12 border-t border-black/8 bg-white">
        <div className="max-w-7xl mx-auto py-16 md:py-20">
          <span className="font-mono text-[10px] text-[#E29415] tracking-[0.3em] uppercase block mb-3 font-semibold">
            HİZMET BÖLGESİ
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#141517] mb-6">
            {SITE.city} geneli keşif ve uygulama
          </h2>
          <p className="text-sm md:text-base text-[#66686F] font-light max-w-3xl leading-relaxed mb-8">
            Ofisimiz {SITE.district}, {SITE.city}. Keşif ücretsizdir; ölçü sonrası kalem kalem
            fiyat tablosu paylaşıyoruz.
          </p>
          <ul className="flex flex-wrap gap-2">
            {SERVICE_AREAS.map((a) => (
              <li
                key={a}
                className="px-3 py-1.5 border border-black/10 bg-[#F8F6F0] text-[11px] font-mono tracking-wider text-[#141517] rounded-xs font-medium"
              >
                {a}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* cta */}
      <section className="px-6 md:px-12 border-t border-black/8 bg-[#F4F1EA]">
        <div className="max-w-7xl mx-auto py-16 md:py-24 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#141517] leading-tight">
              Projenizi konuşalım
            </h2>
            <p className="mt-3 text-sm md:text-base text-[#66686F] font-light max-w-xl">
              Hangi hizmete ihtiyacınız olduğundan emin değilseniz de arayın; yerinde bakıp
              en doğru çözümü birlikte belirleyelim. {SITE.openingHours}.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Merhaba M2 Dekorasyon, hizmetleriniz hakkında bilgi almak istiyorum.')}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xs bg-[#E29415] hover:bg-[#141517] text-white font-bold uppercase tracking-widest text-[11px] md:text-xs active:scale-95 transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WHATSAPP</span>
            </a>
            <a
              href={`tel:${SITE.phone}`}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xs border border-black/15 bg-white text-[#141517] font-mono text-[11px] md:text-xs tracking-widest uppercase hover:border-[#E29415] hover:text-[#E29415] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#E29415]" />
              <span>{SITE.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>
    </main>

    <FloatingWhatsApp message="Merhaba M2 Dekorasyon, hizmetleriniz hakkında bilgi almak istiyorum." />
    <Footer />
  </div>
);

export default ServicesIndexPage;
