import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { waLink } from '../data/services';

interface FloatingWhatsAppProps {
  message?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  message = 'Merhaba M2 Dekorasyon, iç mimarlık ve gergi tavan projemiz için bilgi almak istiyoruz.',
}) => {
  const [hidden, setHidden] = useState(false);

  // Automatically hide when a modal or mobile drawer sets overflow: hidden on body
  useEffect(() => {
    const checkOverflow = () => {
      setHidden(document.body.style.overflow === 'hidden');
    };
    checkOverflow();
    const observer = new MutationObserver(checkOverflow);
    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });
    return () => observer.disconnect();
  }, []);

  if (hidden) return null;

  return (
    <aside
      aria-label="Hızlı WhatsApp İletişimi"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 sm:right-6 z-30 flex items-center select-none print:hidden animate-fade-in"
    >
      <a
        href={waLink(message)}
        target="_blank"
        rel="noreferrer"
        id="floating-whatsapp-trigger"
        aria-label="WhatsApp ile İletişime Geçin"
        title="WhatsApp Hızlı Danışma"
        className="flex items-center gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full shadow-[0_6px_25px_rgba(37,211,102,0.45)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.6)] active:scale-95 transition-all duration-300 group cursor-pointer"
      >
        {/* Pulsing online indicator */}
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
        </span>

        {/* WhatsApp Icon */}
        <MessageCircle className="w-5 h-5 fill-white text-[#25D366] shrink-0" />

        {/* Dynamic Label: clean on mobile, full on desktop */}
        <span className="font-sans font-semibold text-xs sm:text-sm tracking-wide text-white whitespace-nowrap">
          <span className="sm:hidden">WhatsApp</span>
          <span className="hidden sm:inline">WhatsApp Danışma</span>
        </span>
      </a>
    </aside>
  );
};

export default FloatingWhatsApp;
