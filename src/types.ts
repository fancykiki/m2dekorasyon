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

export interface ContactFormState {
  fullName: string;
  phone: string;
  email: string;
  serviceType: string;
  projectArea: string;
  location: string;
  message: string;
}
