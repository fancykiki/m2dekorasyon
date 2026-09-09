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

export type TransitionType = 
  | 'camera-push-floor'
  | 'blueprint-morph'
  | 'macro-expand'
  | 'ceiling-darkness'
  | 'light-sweep'
  | 'detail-pullback'
  | 'lateral-room-pan'
  | 'golden-light-wipe'
  | 'twilight-reveal'
  | 'hero-hold';

export interface CinematicScene {
  id: string;
  number: string;
  title: string;
  subheadline: string;
  headline: string;
  caption: string;
  techDetails: string;
  startProgress: number;
  endProgress: number;
  shots: string[];
  transitionType: TransitionType;
  primaryMaterial: string;
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
