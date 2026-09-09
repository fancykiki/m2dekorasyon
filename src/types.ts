export type ProjectCategory = 
  | 'ALL' 
  | 'KONUT' 
  | 'VİLLA' 
  | 'OFİS' 
  | 'TİCARİ MEKAN' 
  | 'GERGİ TAVAN' 
  | 'İÇ MİMARLIK';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  location: string;
  year: string;
  area: string;
  coverImage: string;
  gallery: string[];
  description: string;
  highlights: string[];
  specs: {
    label: string;
    value: string;
  }[];
}

export interface Service {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  fullDetails: string;
  image: string;
  features: string[];
  specifications: string[];
}

export interface FrameStoryMilestone {
  frameRange: [number, number];
  headline: string;
  subheadline: string;
  caption: string;
  techDetails: string;
}

/**
 * One keyframe in the scroll-driven hero sequence. Every frame is the SAME
 * Antalya villa living room, shot from one locked architectural camera, at a
 * different stage of its transformation (raw shell -> lit, furnished interior).
 */
export interface CinematicScene {
  id: string;
  number: string;
  title: string;
  subheadline: string;
  headline: string;
  caption: string;
  techDetails: string;
  primaryMaterial: string;
  /** Public path to the 1920x1080 webp frame. */
  src: string;
}

export interface ContactFormState {
  fullName: string;
  phone: string;
  email: string;
  serviceType: string;
  projectArea: string;
  location: string;
  message: string;
}
