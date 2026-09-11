import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { CanvasFrameSequence } from './components/hero/CanvasFrameSequence';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { TransformationSlider } from './components/TransformationSlider';
import { ProcessSection } from './components/ProcessSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Phone } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<'TR' | 'EN'>('TR');

  // Smooth, weighted scrolling so the hero camera film and every section
  // transition read as one continuous move. Skipped for reduced-motion.
  // Exposed on window.__lenis so programmatic scrolls (nav, CTAs) go through it.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // touchMultiplier ~2 keeps the finger feeling like it drives the camera directly
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.9, touchMultiplier: 2, anchors: true });
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
    <div className="min-h-screen bg-[#F8F6F0] text-[#141517] selection:bg-[#F5A623] selection:text-white relative">
      
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

        {/* 5. BİZ NASIL ÇALIŞIRIZ? (4-Step Architectural Workflow & Trust) */}
        <ProcessSection />

        {/* 7. İLETİŞİM ("PROJENİZİ KONUŞALIM." Minimal Contact & Inquiries) */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Quick WhatsApp Floating Badge */}
      <FloatingWhatsApp />

    </div>
  );
}
