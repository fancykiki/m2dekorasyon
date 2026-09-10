import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { CanvasFrameSequence } from './components/hero/CanvasFrameSequence';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { TransformationSlider } from './components/TransformationSlider';
import { StretchCeilingDeepDive } from './components/StretchCeilingDeepDive';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MessageCircle, Phone } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<'TR' | 'EN'>('TR');

  // Smooth, weighted scrolling so the hero camera film and every section
  // transition read as one continuous move. Skipped for reduced-motion.
  // Exposed on window.__lenis so programmatic scrolls (nav, CTAs) go through it.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.9, touchMultiplier: 1.4, anchors: true });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  const handleScrollToExplore = () => {
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (lenis) lenis.scrollTo('#services');
    else document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'TR' ? 'EN' : 'TR'));
  };

  return (
    <div className="min-h-screen bg-[#0a0b0c] text-[#e5e5e7] selection:bg-[#c8a97e] selection:text-[#0a0b0c] relative">
      
      {/* Fixed Minimal Navigation */}
      <Navbar currentLang={lang} onToggleLang={toggleLanguage} />

      {/* Main Content Sections */}
      <main>
        {/* 1. Scroll-scrubbed cinematic hero — the continuous architectural camera film */}
        <CanvasFrameSequence onScrollToExplore={handleScrollToExplore} />

        {/* 2. NE YAPIYORUZ? (Services Editorial Showcase) */}
        <ServicesSection />

        {/* 3. PROJELER (Editorial Architecture Portfolio) */}
        <ProjectsSection />

        {/* 4. MEKÂNSAL DÖNÜŞÜM (Interactive Before / After Transformation Slider) */}
        <TransformationSlider />

        {/* 5. GERGİ TAVAN TEKNOLOJİSİ (Signature M2 Stretch Ceiling Deep Dive & Lighting Simulator) */}
        <StretchCeilingDeepDive />

        {/* 6. HAKKIMIZDA ("WE TRANSFORM INTERIORS." Architectural Ethos) */}
        <AboutSection />

        {/* 7. İLETİŞİM ("PROJENİZİ KONUŞALIM." Minimal Contact & Inquiries) */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Quick WhatsApp Floating Badge */}
      <aside aria-label="Hızlı İletişim" className="fixed bottom-6 right-6 z-30 flex items-center space-x-2">
        <a
          href="https://wa.me/905320000000?text=Merhaba%20M2%20Dekorasyon,%20iç%20mimarlık%20ve%20gergi%20tavan%20projemiz%20için%20bilgi%20almak%20istiyoruz."
          target="_blank"
          rel="noreferrer"
          id="floating-whatsapp-trigger"
          aria-label="WhatsApp ile İletişime Geçin"
          className="p-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-[#0a0b0c] rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center justify-center cursor-pointer group"
          title="WhatsApp Hızlı Danışma"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-tech font-semibold pl-0 group-hover:pl-2">
            WhatsApp Danışma
          </span>
        </a>
      </aside>

    </div>
  );
}
