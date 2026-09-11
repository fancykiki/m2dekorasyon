import React, { useState } from 'react';
import { REAL_PROJECTS, ProjectItem } from '../data/projectsData';
import { ProjectModal } from '../components/ProjectModal';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { FloatingWhatsApp } from '../components/FloatingWhatsApp';
import { ChevronRight, Camera, MapPin, ArrowUpRight, Phone, MessageCircle } from 'lucide-react';
import { waLink, SITE } from '../data/services';

export const ProjectsPage: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('ALL');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState<number>(0);

  const displayedProjects =
    selectedProjectId === 'ALL'
      ? REAL_PROJECTS
      : REAL_PROJECTS.filter((p) => p.id === selectedProjectId);

  const openModalAt = (project: ProjectItem, index: number) => {
    setActiveModalProject(project);
    setModalImageIndex(index);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#141517] selection:bg-[#E29415] selection:text-white">
      {/* Top Navigation */}
      <Navbar currentLang="TR" onToggleLang={() => {}} />

      <main>
        {/* Page Header */}
        <header className="px-6 md:px-12 pt-32 pb-14 md:pt-44 md:pb-20 border-b border-black/8 bg-[#F4F1EA]">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <nav aria-label="breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 text-[10px] md:text-[11px] font-mono tracking-[0.2em] uppercase text-[#66686F]">
                <li><a href="/" className="hover:text-[#141517] transition-colors">Anasayfa</a></li>
                <li aria-hidden="true"><ChevronRight className="w-3 h-3" /></li>
                <li className="text-[#E29415] font-semibold" aria-current="page">Projeler</li>
              </ol>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div>
                <span className="font-mono text-[10px] text-[#E29415] tracking-[0.3em] uppercase block mb-4 font-semibold">
                  M2 DEKORASYON // PORTFOLYO
                </span>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-[#141517] uppercase leading-[0.95] max-w-4xl">
                  UYGULAMA PROJELERİMİZ
                </h1>
                <p className="mt-6 text-base md:text-lg text-[#66686F] font-light max-w-2xl leading-relaxed">
                  Antalya genelinde tamamladığımız iç mimarlık, gergi tavan ve mekânsal dönüşüm uygulamalarımız.
                </p>
              </div>

              {/* Portfolio Stats Badge */}
              <div className="flex items-center gap-4 bg-white border border-black/8 p-5 rounded-xs shrink-0 shadow-sm">
                <div className="pr-5 border-r border-black/8">
                  <div className="text-3xl sm:text-4xl font-mono font-bold text-[#141517]">15</div>
                  <div className="text-[10px] font-mono text-[#66686F] uppercase tracking-widest mt-0.5">
                    Proje
                  </div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-mono font-bold text-[#E29415]">250+</div>
                  <div className="text-[10px] font-mono text-[#66686F] uppercase tracking-widest mt-0.5">
                    Uygulama Fotoğrafı
                  </div>
                </div>
              </div>
            </div>

            {/* Fast Filter Bar by Project Number */}
            <div className="mt-12 pt-8 border-t border-black/8">
              <div className="text-[10px] font-mono text-[#66686F] tracking-widest uppercase mb-3 font-semibold">
                PROJELER ARASINDA GEÇİŞ:
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedProjectId('ALL')}
                  className={`px-3.5 py-1.5 text-xs font-mono tracking-wider uppercase transition-all rounded-xs cursor-pointer border ${
                    selectedProjectId === 'ALL'
                      ? 'bg-[#141517] text-white border-[#141517] font-semibold shadow-md'
                      : 'bg-white text-[#141517]/70 border-black/10 hover:border-[#E29415] hover:text-[#141517]'
                  }`}
                >
                  TÜMÜ ({REAL_PROJECTS.length})
                </button>
                {REAL_PROJECTS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProjectId(p.id)}
                    className={`px-3 py-1.5 text-xs font-mono tracking-wider uppercase transition-all rounded-xs cursor-pointer border ${
                      selectedProjectId === p.id
                        ? 'bg-[#E29415] text-white border-[#E29415] font-semibold shadow-md'
                        : 'bg-white text-[#141517]/70 border-black/10 hover:border-[#E29415] hover:text-[#141517]'
                    }`}
                  >
                    {p.code}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Projects Showcase Stream */}
        <section className="px-6 md:px-12 py-16 md:py-24">
          <div className="max-w-7xl mx-auto space-y-20 md:space-y-28">
            {displayedProjects.map((project) => {
              // Main preview images (up to 8 in layout)
              const primaryPhoto = project.coverImage;
              const secondaryPhotos = project.images.slice(1, 7);

              return (
                <div
                  key={project.id}
                  id={project.id}
                  className="bg-white border border-black/8 rounded-xs overflow-hidden shadow-[0_20px_50px_-20px_rgba(20,21,23,0.08)] p-6 sm:p-8 md:p-10"
                >
                  {/* Project Info Header */}
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 mb-8 border-b border-black/8 gap-4">
                    <div>
                      <div className="flex items-center space-x-3 text-xs font-mono text-[#E29415] tracking-widest uppercase mb-1 font-semibold">
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{project.location}</span>
                        </span>
                        <span className="text-black/20">/</span>
                        <span className="flex items-center space-x-1 text-[#66686F]">
                          <Camera className="w-3.5 h-3.5" />
                          <span>{project.imageCount} Fotoğraf</span>
                        </span>
                      </div>
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#141517] uppercase">
                        {project.code || project.title}
                      </h2>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => openModalAt(project, 0)}
                        className="px-5 py-2.5 bg-[#141517] hover:bg-[#E29415] text-white text-xs font-mono tracking-wider font-semibold uppercase flex items-center space-x-2 transition-all cursor-pointer rounded-xs shadow-sm"
                      >
                        <span>GALERİYİ BAŞLAT ({project.imageCount})</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* High-impact Visual Mosaic */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* Big Hero Image */}
                    <div
                      onClick={() => openModalAt(project, 0)}
                      className="md:col-span-8 relative aspect-[16/10] overflow-hidden bg-[#EFECE4] border border-black/8 cursor-pointer group rounded-xs"
                    >
                      <img
                        src={primaryPhoto}
                        alt={`${project.title} Ana Görsel`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 text-xs font-mono text-[#141517] border border-black/10 flex items-center space-x-2 rounded-xs shadow-sm">
                        <span className="font-semibold">Görsel 1 / {project.imageCount}</span>
                        <span className="text-black/30">·</span>
                        <span className="text-[#E29415] font-semibold">Büyütmek İçin Tıklayın</span>
                      </div>
                    </div>

                    {/* Secondary Stack (2 images) */}
                    <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-4">
                      {secondaryPhotos.slice(0, 2).map((photo, pIdx) => (
                        <div
                          key={photo}
                          onClick={() => openModalAt(project, pIdx + 1)}
                          className="relative aspect-[16/10] overflow-hidden bg-[#EFECE4] border border-black/8 cursor-pointer group rounded-xs"
                        >
                          <img
                            src={photo}
                            alt={`${project.title} Görsel ${pIdx + 2}`}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors" />
                          <div className="absolute bottom-2 right-2 bg-white/90 px-2 py-0.5 text-[10px] font-mono text-[#141517] rounded-xs shadow-sm font-semibold">
                            #{pIdx + 2}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Remaining Thumbnails Strip (if available) */}
                  {project.images.length > 3 && (
                    <div className="mt-4 pt-4 border-t border-black/8">
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                        {project.images.slice(3, 11).map((photo, extraIdx) => {
                          const actualIndex = extraIdx + 3;
                          const isLast = extraIdx === 7 && project.images.length > 11;
                          const remaining = project.images.length - 11;

                          return (
                            <div
                              key={photo}
                              onClick={() => openModalAt(project, actualIndex)}
                              className="relative aspect-square overflow-hidden bg-[#EFECE4] border border-black/8 cursor-pointer group rounded-xs"
                            >
                              <img
                                src={photo}
                                alt={`${project.title} Görsel ${actualIndex + 1}`}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              {isLast && (
                                <div className="absolute inset-0 bg-black/75 flex items-center justify-center text-xs font-mono font-bold text-white group-hover:bg-[#E29415] group-hover:text-white transition-colors">
                                  +{remaining} Daha
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Project Bottom Action */}
                  <div className="mt-6 pt-4 border-t border-black/8 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                    <button
                      onClick={() => openModalAt(project, 0)}
                      className="text-[#66686F] hover:text-[#E29415] transition-colors flex items-center space-x-1.5 cursor-pointer font-semibold"
                    >
                      <span>Tüm {project.imageCount} Fotoğrafı Tam Ekran İncele</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={waLink(`Merhaba M2 Dekorasyon, ${project.title} projeniz hakkında bilgi almak istiyorum.`)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#25D366] hover:underline flex items-center space-x-1.5 font-semibold"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Bu proje için teklif al</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Lightbox / Gallery Modal */}
      <ProjectModal
        project={activeModalProject}
        initialImageIndex={modalImageIndex}
        onClose={() => setActiveModalProject(null)}
      />

      {/* Floating Quick WhatsApp Floating Badge */}
      <FloatingWhatsApp message="Merhaba M2 Dekorasyon, projeleriniz hakkında bilgi almak istiyorum." />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProjectsPage;
