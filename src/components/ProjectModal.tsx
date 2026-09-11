import React, { useState, useEffect, useCallback } from 'react';
import { ProjectItem } from '../data/projectsData';
import { X, ChevronLeft, ChevronRight, MapPin, MessageCircle, Camera } from 'lucide-react';
import { waLink } from '../data/services';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  initialImageIndex?: number;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  initialImageIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(initialImageIndex);

  // Sync index if initial changes or project changes
  useEffect(() => {
    setCurrentIndex(initialImageIndex);
  }, [project, initialImageIndex]);

  // Keyboard navigation: Escape closes, ArrowLeft/Right changes active photo
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!project) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % project.images.length);
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
      }
    },
    [project, onClose]
  );

  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, handleKeyDown]);

  if (!project) return null;

  const currentImg = project.images[currentIndex] || project.coverImage;
  const totalCount = project.images.length;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + totalCount) % totalCount);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % totalCount);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/95 backdrop-blur-2xl animate-fade-in select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl max-h-[96vh] flex flex-col bg-[#0b0c0d] border border-white/10 rounded-sm shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-[#141517]">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <span className="font-mono text-xs sm:text-sm font-semibold text-white tracking-widest uppercase">
              {project.code || project.title}
            </span>
            <span className="text-white/20">/</span>
            <span className="flex items-center space-x-1 text-[11px] font-mono text-[#E29415] font-semibold">
              <MapPin className="w-3 h-3" />
              <span>{project.location}</span>
            </span>
            <span className="text-white/20 hidden sm:inline">/</span>
            <span className="hidden sm:flex items-center space-x-1.5 text-[11px] font-mono text-white/50">
              <Camera className="w-3 h-3" />
              <span>{totalCount} Fotoğraf</span>
            </span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <span className="font-mono text-xs text-white/70 bg-white/10 px-2.5 py-1 border border-white/15 rounded-xs">
              {currentIndex + 1} / {totalCount}
            </span>
            <button
              onClick={onClose}
              className="p-2 bg-white/10 hover:bg-[#E29415] text-white hover:text-white border border-white/15 transition-colors cursor-pointer rounded-xs"
              aria-label="Kapat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Image Stage */}
        <div className="relative flex-1 min-h-[300px] sm:min-h-[420px] md:min-h-[520px] flex items-center justify-center bg-black overflow-hidden group">
          <img
            key={currentImg}
            src={currentImg}
            alt={`${project.title} - ${currentIndex + 1}`}
            className="max-h-[65vh] w-auto max-w-full object-contain mx-auto transition-opacity duration-300"
            loading="eager"
            decoding="async"
          />

          {/* Previous / Next Arrow Controls */}
          {totalCount > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-black/60 hover:bg-[#E29415] text-white hover:text-white border border-white/15 backdrop-blur-md rounded-full transition-all cursor-pointer shadow-xl z-10"
                aria-label="Önceki Fotoğraf"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-black/60 hover:bg-[#E29415] text-white hover:text-white border border-white/15 backdrop-blur-md rounded-full transition-all cursor-pointer shadow-xl z-10"
                aria-label="Sonraki Fotoğraf"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Bottom Overlay Info & WhatsApp Action */}
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 flex items-center space-x-2 z-10">
            <a
              href={waLink(`Merhaba M2 Dekorasyon, web sitenizdeki ${project.title} projesi hakkında bilgi almak istiyorum.`)}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-mono font-semibold rounded-xs backdrop-blur-md flex items-center space-x-1.5 transition-all shadow-lg cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Bu Proje Hakkında Bilgi Al</span>
            </a>
          </div>
        </div>

        {/* Thumbnail Filmstrip */}
        {totalCount > 1 && (
          <div className="p-2 sm:p-3 bg-[#0c0d0e] border-t border-white/10 overflow-x-auto scrollbar-thin">
            <div className="flex space-x-2 w-max mx-auto py-1">
              {project.images.map((img, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={img}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative w-14 h-10 sm:w-16 sm:h-12 flex-shrink-0 overflow-hidden rounded-xs border transition-all cursor-pointer ${
                      isActive
                        ? 'border-[#E29415] ring-2 ring-[#E29415] opacity-100 scale-105'
                        : 'border-white/10 opacity-50 hover:opacity-90'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumb ${idx + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
