import React from 'react';
import { ArrowUp, Instagram, Facebook, MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { SITE, CATALOG, SERVICES, servicePath, waLink } from '../data/services';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number) => void } }).__lenis;
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#EFECE4] text-[#66686F] pt-16 pb-10 px-6 md:px-12 border-t border-black/8 text-xs font-mono">
      <div className="max-w-7xl mx-auto flex flex-col space-y-12">

        {/* Brand + contact + index */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-black/8">
          {/* brand */}
          <div className="md:col-span-4 space-y-5">
            <a href="/" aria-label="M2 Dekorasyon" className="inline-block group">
              <img
                src="/logo.png"
                alt="M2 Dekorasyon"
                width={445}
                height={373}
                loading="lazy"
                draggable={false}
                className="h-18 sm:h-22 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
              />
            </a>
            <p className="text-[11px] leading-relaxed text-[#66686F] font-sans font-light max-w-xs">
              Antalya ve çevresinde gergi tavan, duvar kağıdı, mutfak ve banyo yenileme ile
              mimari projelendirme. Ölçüden montaja tek elden.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 border border-black/10 bg-white/60 rounded-xs flex items-center justify-center text-[#66686F] hover:text-white hover:bg-[#E29415] hover:border-[#E29415] transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 border border-black/10 bg-white/60 rounded-xs flex items-center justify-center text-[#66686F] hover:text-white hover:bg-[#E29415] hover:border-[#E29415] transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={waLink('Merhaba M2 Dekorasyon, bilgi almak istiyorum.')}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 border border-black/10 bg-white/60 rounded-xs flex items-center justify-center text-[#66686F] hover:text-white hover:bg-[#25D366] hover:border-[#25D366] transition-all"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* services */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#E29415] block font-semibold">Hizmetler</span>
            <ul className="space-y-2.5 text-[11px] tracking-wider">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <a href={servicePath(s.slug)} className="text-[#66686F] hover:text-[#141517] transition-colors">
                    {s.nav}
                  </a>
                </li>
              ))}
              <li>
                <a href={CATALOG.path} className="text-[#66686F] hover:text-[#141517] transition-colors">
                  {CATALOG.title} ({CATALOG.pages} sayfa)
                </a>
              </li>
            </ul>
          </div>

          {/* index */}
          <div className="md:col-span-2 space-y-4">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#E29415] block font-semibold">Keşfet</span>
            <ul className="space-y-2.5 text-[11px] tracking-wider">
              <li><a href="/hakkimizda/" className="text-[#66686F] hover:text-[#141517] transition-colors">Hakkımızda</a></li>
              <li><a href="/projeler/" className="text-[#66686F] hover:text-[#141517] transition-colors">Projeler</a></li>
              <li><a href="/#process" className="text-[#66686F] hover:text-[#141517] transition-colors">Nasıl Çalışırız?</a></li>
              <li><a href="/iletisim/" className="text-[#66686F] hover:text-[#141517] transition-colors">İletişim</a></li>
            </ul>
          </div>

          {/* contact */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#E29415] block font-semibold">İletişim</span>
            <ul className="space-y-3 text-[11px] leading-relaxed">
              <li>
                <a href={SITE.maps} target="_blank" rel="noreferrer" className="flex items-start gap-2.5 text-[#66686F] hover:text-[#141517] transition-colors">
                  <MapPin className="w-3.5 h-3.5 text-[#E29415] shrink-0 mt-0.5" />
                  <span>{SITE.street}<br />{SITE.postalCode} {SITE.district} / {SITE.city}</span>
                </a>
              </li>
              <li>
                <a href={`tel:${SITE.phone}`} className="flex items-center gap-2.5 text-[#66686F] hover:text-[#141517] transition-colors">
                  <Phone className="w-3.5 h-3.5 text-[#E29415] shrink-0" />
                  <span>{SITE.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a href={waLink('Merhaba M2 Dekorasyon, bilgi almak istiyorum.')} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 text-[#66686F] hover:text-[#141517] transition-colors">
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                  <span>{SITE.whatsappDisplay}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-2.5 text-[#66686F] hover:text-[#141517] transition-colors">
                  <Mail className="w-3.5 h-3.5 text-[#E29415] shrink-0" />
                  <span>{SITE.email}</span>
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-[#66686F]">
                <Clock className="w-3.5 h-3.5 text-[#E29415] shrink-0" />
                <span>{SITE.openingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Tier: Credits & Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-[#91949D] text-[10px] gap-4">
          <div>
            <span>© {new Date().getFullYear()} {SITE.legalName}. Tüm hakları saklıdır.</span>
          </div>

          <div className="flex items-center space-x-6">
            <span>ANTALYA / TÜRKİYE</span>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1 hover:text-[#141517] transition-colors cursor-pointer"
            >
              <span>YUKARI DÖN</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
