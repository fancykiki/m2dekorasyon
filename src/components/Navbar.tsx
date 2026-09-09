import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  currentLang?: 'TR' | 'EN';
  onToggleLang?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentLang = 'TR', onToggleLang }) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 60);

      const totalDocHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalDocHeight > 0) {
        setScrollProgress((scrollY / totalDocHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HİZMETLER', href: '#services' },
    { label: 'PROJELER', href: '#projects' },
    { label: 'DÖNÜŞÜM', href: '#transformation' },
    { label: 'GERGİ TAVAN', href: '#stretch-ceiling' },
    { label: 'HAKKIMIZDA', href: '#about' },
    { label: 'İLETİŞİM', href: '#contact' },
  ];

  return (
    <>
      {/* Top Global Scroll Progress Bar with Subtle Amber Glow */}
      <div 
        className="fixed top-0 left-0 h-[1.5px] bg-[#F27D26] z-50 transition-all duration-100 ease-out shadow-[0_0_12px_rgba(242,125,38,0.5)]"
        style={{ width: `${scrollProgress}%` }}
      />

      <header 
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          isScrolled 
            ? 'bg-[#050505]/90 backdrop-blur-md border-b border-white/5 py-4 shadow-2xl' 
            : 'bg-gradient-to-b from-[#050505]/90 via-[#050505]/40 to-transparent py-7'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Brand Logo & Monogram matching Sophisticated Dark Spec */}
          <a 
            href="#" 
            id="brand-logo"
            className="flex items-baseline space-x-2.5 group cursor-pointer select-none"
          >
            <span className="text-2xl font-black tracking-tighter text-[#F5F5F5] group-hover:text-white transition-colors">
              M2
            </span>
            <span className="text-[10px] tracking-[0.3em] font-light uppercase opacity-70 text-[#F5F5F5] group-hover:opacity-100 transition-opacity">
              Dekorasyon
            </span>
            <span className="hidden sm:inline text-[9px] tracking-widest font-mono text-white/30 pl-2">
              · ANTALYA
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-9">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#F5F5F5] opacity-60 hover:opacity-100 hover:text-white transition-all relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Action Hub: Phone / WhatsApp / Language */}
          <div className="hidden sm:flex items-center space-x-5">
            {/* Direct Phone / WhatsApp */}
            <a 
              href="https://wa.me/905320000000?text=Merhaba,%20M2%20Dekorasyon%20mimari%20projemiz%20hakkında%20bilgi%20almak%20istiyorum."
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-2 text-[11px] font-mono text-white/70 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#F27D26]" />
              <span className="tracking-wider">+90 242 316 20 20</span>
            </a>

            {/* Language Toggle */}
            <button
              onClick={onToggleLang}
              id="lang-toggle-btn"
              className="text-[10px] font-mono tracking-widest text-white/50 hover:text-white border border-white/10 hover:border-white/30 px-2 py-1 transition-all"
            >
              {currentLang === 'TR' ? 'EN' : 'TR'}
            </button>

            {/* Minimalist CTA */}
            <a
              href="#contact"
              id="nav-consultation-btn"
              className="px-4 py-2 text-[10px] font-mono tracking-[0.15em] uppercase text-[#F5F5F5] border border-white/20 hover:bg-white hover:text-black transition-all duration-300 flex items-center space-x-1.5"
            >
              <span>TEKLİF AL</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white/80 hover:text-white"
            aria-label="Menüyü Aç"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#050505]/98 backdrop-blur-xl flex flex-col justify-between p-8 pt-28 lg:hidden animate-fade-in border-b border-white/10">
          <div className="flex flex-col space-y-6">
            <span className="text-[10px] font-mono text-[#F27D26] tracking-widest uppercase border-b border-white/10 pb-2">
              MENÜ // ARCHITECTURAL INDEX
            </span>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-light text-[#F5F5F5] hover:text-white tracking-wider transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col space-y-4">
            <div className="flex justify-between items-center text-xs font-mono text-white/60">
              <span>ANTALYA / TR</span>
              <button 
                onClick={onToggleLang}
                className="text-[#F27D26] font-semibold"
              >
                DİL: {currentLang}
              </button>
            </div>
            <a
              href="tel:+902423162020"
              className="w-full py-3 bg-white text-black hover:bg-[#e5e5e5] text-center font-mono text-xs tracking-wider uppercase font-semibold transition-colors"
            >
              ARA: +90 242 316 20 20
            </a>
          </div>
        </div>
      )}
    </>
  );
};
