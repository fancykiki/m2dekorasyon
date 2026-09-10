import React from 'react';
import { ArrowUp, Instagram, Facebook, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number) => void } }).__lenis;
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] text-white/50 py-16 px-6 md:px-12 border-t border-white/5 text-xs font-mono">
      <div className="max-w-7xl mx-auto flex flex-col justify-between space-y-12">
        
        {/* Top Tier */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-12 border-b border-white/5 gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 border border-white/20 flex items-center justify-center bg-[#111111] rounded-xs">
              <span className="font-bold text-xs text-white">M²</span>
            </div>
            <div>
              <span className="text-sm sm:text-base text-white font-semibold tracking-tight block">
                M2 DEKORASYON
              </span>
              <span className="text-[10px] text-white/40 tracking-wider">
                İç Mimarlık · Gergi Tavan · Antalya
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-white/40 text-[10px] tracking-wider uppercase">
            <a href="#services" className="hover:text-white transition-colors">Hizmetler</a>
            <a href="#projects" className="hover:text-white transition-colors">Projeler</a>
            <a href="#transformation" className="hover:text-white transition-colors">Dönüşüm</a>
            <a href="#stretch-ceiling" className="hover:text-white transition-colors">Gergi Tavan</a>
            <a href="#about" className="hover:text-white transition-colors">Hakkımızda</a>
            <a href="#contact" className="hover:text-white transition-colors">İletişim</a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            id="footer-back-to-top"
            className="flex items-center space-x-2 text-white/40 hover:text-white transition-colors tracking-widest uppercase cursor-pointer text-[10px]"
          >
            <span>BAŞA DÖN</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Tier: Credits & Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-white/30 text-[10px] gap-4">
          <div>
            © {new Date().getFullYear()} M2 Dekorasyon İnşaat Mimarlık San. Tic. Ltd. Şti. Tüm hakları saklıdır.
          </div>
          <div className="flex items-center space-x-6">
            <span>Antalya / Türkiye</span>
            <span>·</span>
            <span>KVKK Aydınlatma Metni</span>
            <span>·</span>
            <span>Gizlilik Politikası</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
