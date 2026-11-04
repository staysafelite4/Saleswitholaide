export interface SpaTreatment {
  id: string;
  title: string;
  tagline: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  duration: string; // e.g. "90 Minutes"
  category: 'massage' | 'facial' | 'scrub' | 'couples' | 'holistic';
  image: string;
  tag: string;
  therapists: string[];
  availability: 'available' | 'low_slots' | 'fully_booked';
  featured: boolean;
  intakeFocus?: string[];
}

export interface SpaAppointment {
  id: string;
  clientName: string;
  clientPhone: string;
  treatmentName: string;
  treatmentPrice: number;
  duration: string;
  date: string;
  timeSlot: string;
  therapistPreference?: string;
  pressurePreference?: string; // 'Gentle Relaxation' | 'Medium Therapeutic' | 'Deep Tissue'
  addOns?: string[];
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  timestamp: string;
}

export interface SpaTherapist {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialty: string;
  bio: string;
}

export interface SpaReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  treatment: string;
}

export interface SpaConfig {
  spaName: string;
  tagline: string;
  whatsappNumber: string;
  contactEmail: string;
  contactPhone: string;
  sanctuaryAddress: string;
  operatingHours: string;
  currencySymbol: string;
  currencyCode: string;
  promoBanner: {
    enabled: boolean;
    text: string;
    badgeText?: string;
    linkText?: string;
    linkUrl?: string;
    bgColor: 'eucalyptus' | 'sand' | 'lavender' | 'charcoal';
  };
  therapists: SpaTherapist[];
  reviews: SpaReview[];
}
