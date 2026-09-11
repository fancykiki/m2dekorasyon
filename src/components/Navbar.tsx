import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, X, Phone, ArrowUpRight, ChevronDown, BookOpen,
  Instagram, Facebook, MapPin, Mail, Clock, MessageCircle,
} from 'lucide-react';
import { SERVICES, servicePath, SITE, CATALOG, waLink } from '../data/services';

interface NavbarProps {
  currentLang?: 'TR' | 'EN';
  onToggleLang?: () => void;
}

const WA_TEXT = 'Merhaba, M2 Dekorasyon hizmetleriniz hakkında bilgi almak istiyorum.';

/** Shop is open 09:00–19:00 every day — shown as a live dot in the utility bar. */
const isOpenNow = () => {
  const h = new Date().getHours();
  return h >= 9 && h < 19;
};

export const Navbar: React.FC<NavbarProps> = ({ currentLang = 'TR', onToggleLang }) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(() => isOpenNow());

  // The progress bar is written straight to the DOM: putting it in React state
  // re-rendered the whole header on every scroll frame.
  const barRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<number>(-1);
  const scrolledRef = useRef<boolean>(false);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const y = window.scrollY;

      const scrolled = y > 60;
      if (scrolled !== scrolledRef.current) {
        scrolledRef.current = scrolled;
        setIsScrolled(scrolled);
      }

      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? Math.round((y / total) * 1000) / 10 : 0;
      if (pct !== pctRef.current && barRef.current) {
        pctRef.current = pct;
        barRef.current.style.transform = `scaleX(${pct / 100})`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // keeps the open/closed dot honest if the tab stays open across 19:00
  useEffect(() => {
    const id = window.setInterval(() => setOpen(isOpenNow()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  // lock the page behind the mobile drawer and allow Escape key to close
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileMenuOpen]);

  // Absolute hrefs so every link works from any page, not just the homepage.
  const navLinks = [
    { label: 'HİZMETLER', href: '/hizmetler/', services: true },
    { label: 'KATALOG', href: CATALOG.path },
    { label: 'PROJELER', href: '/projeler/' },
    { label: 'HAKKIMIZDA', href: '/hakkimizda/' },
    { label: 'SÜREÇ', href: '/#process' },
    { label: 'İLETİŞİM', href: '/iletisim/' },
  ];

  return (
    <>
      {/* Global scroll progress. transform-only, so it never triggers layout. */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-[60] pointer-events-none">
        <div
          ref={barRef}
          className="h-full w-full origin-left scale-x-0 bg-[#E29415] shadow-[0_0_12px_rgba(226,148,21,0.6)]"
        />
      </div>

      <header
        className={`fixed top-0 left-0 w-full z-40 transition-[background-color,backdrop-filter,border-color,color] duration-500 ${
          isScrolled
            ? 'bg-[#F8F6F0]/92 backdrop-blur-xl border-b border-black/8 shadow-[0_15px_40px_-20px_rgba(20,21,23,0.08)] text-[#141517]'
            : 'bg-gradient-to-b from-[#050505]/92 via-[#050505]/45 to-transparent border-b border-transparent text-white'
        }`}
      >
        {/* ── utility strip: real contact data, collapses away once you scroll ── */}
        <div
          className={`hidden lg:block overflow-hidden border-b border-white/[0.07] transition-[max-height,opacity] duration-500 ease-out ${
            isScrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'
          }`}
        >
          <div className="max-w-[1500px] mx-auto px-6 xl:px-12 h-10 flex items-center justify-between text-[10px] font-mono tracking-[0.14em] uppercase">
            <div className="flex items-center gap-6 text-white/45">
              <a
                href={SITE.maps}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <MapPin className="w-3 h-3 text-[#E29415]" />
                <span>{SITE.district} / {SITE.city}</span>
              </a>
              <span className="w-px h-3 bg-white/10" />
              <span className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-[#E29415]" />
                <span>{SITE.hours}</span>
                <span className="flex items-center gap-1.5 ml-1.5">
                  <span className="relative flex w-1.5 h-1.5">
                    {open && (
                      <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-70 animate-ping" />
                    )}
                    <span
                      className={`relative inline-flex w-1.5 h-1.5 rounded-full ${
                        open ? 'bg-emerald-400' : 'bg-white/25'
                      }`}
                    />
                  </span>
                  <span className={open ? 'text-emerald-400' : 'text-white/35'}>
                    {open ? 'ŞU AN AÇIK' : 'ŞU AN KAPALI'}
                  </span>
                </span>
              </span>
            </div>

            <div className="flex items-center gap-5 text-white/45">
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-1.5 hover:text-white transition-colors normal-case tracking-normal"
              >
                <Mail className="w-3 h-3 text-[#E29415]" />
                <span>{SITE.email}</span>
              </a>
              <span className="w-px h-3 bg-white/10" />
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="hover:text-white transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="hover:text-white transition-colors"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <span className="w-px h-3 bg-white/10" />
              <button
                onClick={onToggleLang}
                id="lang-toggle-btn"
                className="tracking-[0.2em] text-white/45 hover:text-white transition-colors"
              >
                TR <span className="text-white/20">/</span> EN
              </button>
            </div>
          </div>
        </div>

        {/* ── main bar ── */}
        <div
          className={`max-w-[1500px] mx-auto px-6 xl:px-12 flex items-center justify-between transition-[padding] duration-500 ${
            isScrolled ? 'py-1.5 sm:py-2' : 'py-2.5 sm:py-3.5'
          }`}
        >
          {/* brand logo */}
          <a
            href="/"
            id="brand-logo"
            aria-label="M2 Dekorasyon"
            className="group select-none shrink-0 relative flex items-center py-0.5"
          >
            <div className="relative flex items-center">
              <img
                src="/logo.png"
                alt="M2 Dekorasyon"
                width={445}
                height={373}
                draggable={false}
                className={`w-auto object-contain transition-all duration-500 group-hover:scale-105 drop-shadow-sm ${
                  isScrolled ? 'h-13 sm:h-14 md:h-16' : 'h-20 sm:h-24 md:h-26 lg:h-28'
                }`}
              />
              <span className="absolute -inset-3 rounded-2xl bg-[#E29415]/0 group-hover:bg-[#E29415]/10 blur-xl transition-all duration-500 pointer-events-none" />
            </div>
          </a>

          {/* desktop nav */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-8">
            {navLinks.map((link) => (
              <div key={link.label} className="relative group/nav py-2">
                <a
                  href={link.href}
                  className={`flex items-center gap-1 text-[10px] font-medium tracking-[0.2em] uppercase transition-colors relative group ${
                    isScrolled ? 'text-[#141517]/75 hover:text-[#141517]' : 'text-[#F5F5F5]/70 hover:text-white'
                  }`}
                >
                  {link.label}
                  {link.services && (
                    <ChevronDown className="w-3 h-3 opacity-60 transition-transform duration-300 group-hover/nav:rotate-180" />
                  )}
                  <span className="absolute -bottom-1.5 left-0 w-0 h-[1.5px] bg-[#E29415] transition-all duration-300 group-hover:w-full" />
                </a>

                {/* services mega panel */}
                {link.services && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-5 opacity-0 invisible translate-y-1 group-hover/nav:opacity-100 group-hover/nav:visible group-hover/nav:translate-y-0 transition-all duration-200">
                    <div className="w-[640px] bg-[#FFFFFF]/98 backdrop-blur-xl border border-black/8 shadow-[0_30px_70px_-20px_rgba(20,21,23,0.12)] rounded-xs overflow-hidden">
                      <div className="grid grid-cols-2">
                        <ul className="py-2 border-r border-black/6">
                          {SERVICES.map((s) => (
                            <li key={s.slug}>
                              <a
                                href={servicePath(s.slug)}
                                className="group/item flex items-center justify-between gap-3 px-5 py-3 hover:bg-[#F8F6F0] transition-colors"
                              >
                                <span className="flex flex-col">
                                  <span className="text-[11px] tracking-[0.12em] uppercase text-[#141517] group-hover/item:text-[#E29415] transition-colors font-medium">
                                    {s.nav}
                                  </span>
                                  <span className="text-[9px] text-[#66686F] mt-0.5 normal-case tracking-normal">
                                    {s.tagline}
                                  </span>
                                </span>
                                <span className="font-mono text-[9px] text-[#E29415] font-semibold opacity-80 group-hover/item:opacity-100 transition-opacity">
                                  {s.number}
                                </span>
                              </a>
                            </li>
                          ))}
                        </ul>

                        {/* catalogue promo */}
                        <a href={CATALOG.path} className="group/cat relative flex flex-col justify-between p-5 overflow-hidden bg-[#F4F1EA]">
                          <img
                            src="/katalog/thumb/page-001.webp"
                            alt=""
                            aria-hidden="true"
                            loading="lazy"
                            draggable={false}
                            className="absolute inset-0 w-full h-full object-cover opacity-[0.18] group-hover/cat:opacity-30 group-hover/cat:scale-105 transition-all duration-700"
                          />
                          <span className="absolute inset-0 bg-gradient-to-t from-[#F4F1EA] via-[#F4F1EA]/80 to-[#F4F1EA]/40" />
                          <span className="relative">
                            <span className="flex items-center gap-2 text-[9px] font-mono tracking-[0.25em] uppercase text-[#E29415] font-semibold">
                              <BookOpen className="w-3.5 h-3.5" />
                              {CATALOG.pages} SAYFA
                            </span>
                            <span className="block mt-3 text-xl font-bold tracking-tight text-[#141517] leading-tight">
                              Desen<br />Kataloğu
                            </span>
                            <span className="block mt-2 text-[10px] text-[#66686F] leading-relaxed normal-case tracking-normal">
                              Gergi tavan ve duvar kağıdı desenlerimizi sayfa sayfa inceleyin.
                            </span>
                          </span>
                          <span className="relative mt-5 inline-flex items-center gap-1.5 text-[10px] font-mono tracking-[0.2em] uppercase text-[#141517] group-hover/cat:text-[#E29415] transition-colors font-semibold">
                            KATALOĞU AÇ
                            <ArrowUpRight className="w-3.5 h-3.5 group-hover/cat:translate-x-0.5 group-hover/cat:-translate-y-0.5 transition-transform" />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* actions */}
          <div className="hidden sm:flex items-center gap-3 lg:gap-4 shrink-0">
            <a
              href={`tel:${SITE.phone}`}
              className={`hidden xl:flex items-center gap-2 text-[11px] font-mono transition-colors ${
                isScrolled ? 'text-[#141517]/80 hover:text-black' : 'text-white/65 hover:text-white'
              }`}
            >
              <Phone className="w-3.5 h-3.5 text-[#E29415]" />
              <span className="tracking-wider">{SITE.phoneDisplay}</span>
            </a>

            {/* PDF Catalog Button */}
            <a
              href={CATALOG.path}
              id="nav-catalog-pdf-btn"
              aria-label="M2 Dekorasyon PDF Kataloğu"
              className={`group relative flex items-center gap-2 sm:gap-2.5 px-3 sm:px-3.5 py-1.5 sm:py-2 text-[10px] sm:text-[11px] font-mono tracking-[0.12em] uppercase transition-all duration-300 rounded-xs border ${
                isScrolled
                  ? 'border-black/15 bg-white text-[#141517] hover:border-red-500/50 hover:text-red-600 shadow-[0_2px_12px_rgba(20,21,23,0.05)]'
                  : 'border-white/25 bg-black/45 backdrop-blur-md text-white hover:border-red-400 hover:text-red-300'
              }`}
            >
              {/* Vibrant Red PDF Document Icon */}
              <span className="relative flex items-center justify-center w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-[3px] bg-gradient-to-br from-red-500 via-red-600 to-rose-700 shadow-[0_2px_10px_rgba(239,68,68,0.45)] group-hover:shadow-[0_4px_16px_rgba(239,68,68,0.7)] group-hover:scale-110 transition-all shrink-0">
                <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
                  <path
                    d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="rgba(255,255,255,0.18)"
                  />
                  <path
                    d="M14 2v6h6"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <text
                    x="12"
                    y="17.2"
                    textAnchor="middle"
                    fontSize="6.2"
                    fontWeight="900"
                    fill="white"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    letterSpacing="0.4"
                  >
                    PDF
                  </text>
                </svg>
              </span>
              <span className="font-semibold tracking-wider">
                <span className="hidden sm:inline">M² KATALOĞUMUZ</span>
                <span className="sm:hidden">M² KATALOG</span>
              </span>
              <ArrowUpRight className="w-3 h-3 text-red-500 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
            </a>

            <a
              href="/iletisim/"
              id="nav-consultation-btn"
              className={`hidden sm:flex group relative px-4 sm:px-5 py-2 sm:py-2.5 text-[10px] font-mono tracking-[0.15em] uppercase overflow-hidden items-center gap-1.5 transition-colors duration-300 rounded-xs ${
                isScrolled
                  ? 'text-[#141517] border border-black/20 hover:text-white hover:border-[#E29415]'
                  : 'text-[#F5F5F5] border border-white/20 hover:text-black hover:border-[#E29415]'
              }`}
            >
              <span className="absolute inset-0 bg-[#E29415] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out" />
              <span className="relative font-semibold">TEKLİF AL</span>
              <ArrowUpRight className="relative w-3 h-3" />
            </a>
          </div>

          {/* mobile toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 -mr-2 transition-colors ${
              isScrolled ? 'text-[#141517]' : 'text-white/80 hover:text-white'
            }`}
            aria-label={mobileMenuOpen ? 'Menüyü Kapat' : 'Menüyü Aç'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* ── mobile drawer ── */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobil Menü"
          className="fixed inset-0 z-[60] bg-[#F8F6F0] flex flex-col lg:hidden animate-fade-in overflow-y-auto overscroll-contain text-[#141517]"
        >
          {/* Sticky Drawer Top Bar: Always visible, easy thumb reach */}
          <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-3.5 bg-[#F8F6F0]/95 backdrop-blur-md border-b border-black/8 shrink-0 shadow-xs">
            <a href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center group py-0.5">
              <img src="/logo.png" alt="M2 Dekorasyon" className="h-14 sm:h-16 w-auto object-contain drop-shadow-xs" />
            </a>

            {/* High-contrast, easy-to-tap close button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/6 hover:bg-black/10 active:scale-95 text-[#141517] transition-all cursor-pointer"
              aria-label="Menüyü Kapat"
            >
              <span className="font-mono text-xs font-bold tracking-widest text-[#141517]">KAPAT</span>
              <div className="w-6 h-6 rounded-full bg-[#E29415] text-black flex items-center justify-center shadow-xs">
                <X className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
            </button>
          </div>

          <div className="flex-1 px-7 pt-6 pb-12 flex flex-col">
            <span className="text-[10px] font-mono text-[#E29415] tracking-[0.25em] uppercase border-b border-black/10 pb-3 font-semibold">
              MENÜ // {SITE.district.toUpperCase()} · {SITE.city.toUpperCase()}
            </span>

            <div className="flex flex-col space-y-5 mt-7">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between text-2xl font-light text-[#141517] hover:text-[#E29415] tracking-wide transition-colors"
                  >
                    <span>{link.label}</span>
                    {link.label === 'KATALOG' && (
                      <span className="text-[9px] font-mono tracking-widest text-[#E29415] border border-[#E29415]/40 px-2 py-1 rounded-xs">
                        {CATALOG.pages} SAYFA
                      </span>
                    )}
                  </a>
                  {link.services && (
                    <ul className="mt-3 ml-1 space-y-2.5 border-l border-black/10 pl-4">
                      {SERVICES.map((s) => (
                        <li key={s.slug}>
                          <a
                            href={servicePath(s.slug)}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center justify-between text-sm tracking-wide text-[#66686F] hover:text-[#141517] transition-colors"
                          >
                            <span>{s.nav}</span>
                            <span className="font-mono text-[9px] text-[#E29415] font-semibold">{s.number}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-auto pt-10 space-y-5">
              <div className="flex items-center justify-between text-[10px] font-mono tracking-widest uppercase text-[#66686F]">
                <span className="flex items-center gap-2">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${open ? 'bg-emerald-500' : 'bg-black/25'}`}
                  />
                  {SITE.hours}
                </span>
                <button onClick={onToggleLang} className="text-[#E29415] font-semibold">
                  DİL: {currentLang}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${SITE.phone}`}
                  className="flex items-center justify-center gap-2 py-3.5 border border-black/15 text-[#141517] font-mono text-[11px] tracking-wider uppercase rounded-xs"
                >
                  <Phone className="w-3.5 h-3.5 text-[#E29415]" />
                  ARA
                </a>
                <a
                  href={waLink(WA_TEXT)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-3.5 bg-[#E29415] text-white font-mono text-[11px] tracking-wider uppercase font-bold rounded-xs shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  WHATSAPP
                </a>
              </div>

              <div className="flex items-center justify-between border-t border-black/10 pt-5 text-[#66686F]">
                <a href={`mailto:${SITE.email}`} className="text-[11px] font-mono hover:text-[#141517] transition-colors">
                  {SITE.email}
                </a>
                <div className="flex items-center gap-4">
                  <a href={SITE.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-[#141517] transition-colors">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href={SITE.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-[#141517] transition-colors">
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a href={SITE.maps} target="_blank" rel="noreferrer" aria-label="Yol tarifi" className="hover:text-[#141517] transition-colors">
                    <MapPin className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Secondary Close Button at bottom */}
              <div className="pt-3 flex justify-center border-t border-black/6">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center gap-2 text-[11px] font-mono tracking-widest text-[#66686F] hover:text-[#141517] uppercase py-2 px-4 rounded-full border border-black/10 bg-white/60 active:scale-95 transition-all"
                >
                  <X className="w-3.5 h-3.5 text-[#E29415]" />
                  <span>Menüyü Kapat</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
