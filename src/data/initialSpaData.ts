import { SpaTreatment, SpaConfig, SpaAppointment, SpaTherapist, SpaReview } from '../types/spa';

export const SPA_HERO_IMAGE = '/src/assets/images/template_spa_wellness_1793191760546.jpg';
export const SPA_OIL_IMAGE = '/src/assets/images/spa_massage_oil_1793192813098.jpg';
export const SPA_FACIAL_IMAGE = '/src/assets/images/spa_facial_treatment_1793193190992.jpg';
export const SPA_COUPLES_IMAGE = '/src/assets/images/spa_couples_suite_1793193190635.jpg';

export const INITIAL_TREATMENTS: SpaTreatment[] = [
  {
    id: 'spa_river_stones',
    title: 'Volcanic River Stone Massage',
    tagline: 'Deep thermal basalt stone gliding with wild lavender and cedarwood aromatherapy',
    description: 'Smooth river stones harvested from volcanic riverbeds heated to 55°C to penetrate deep muscle fibers. Relieves persistent back stiffness, increases microcirculation, and dissolves nervous exhaustion.',
    price: 75,
    compareAtPrice: 90,
    duration: '90 Minutes',
    category: 'massage',
    image: SPA_OIL_IMAGE,
    tag: 'Signature Ritual',
    therapists: ['Amara Okafor (Senior Lead)', 'Dayo Adeleke (Holistic Bodyworker)'],
    availability: 'available',
    featured: true,
    intakeFocus: ['Back & Shoulders', 'Lower Lumbar Tension', 'Neck & Scapula', 'Full Body Serenity']
  },
  {
    id: 'spa_radiance_facial',
    title: 'Botanical Radiance Herbal Glow Facial',
    tagline: 'Enzymatic fruit acids, jade stone lymphatic drainage & hibiscus collagen serum',
    description: 'Custom botanical exfoliation designed for tired, sun-exposed skin. Includes double cleansing, pressure-point neck massage, and cold jade roller infusion of pure organic botanical extracts to sculpt cheekbones.',
    price: 60,
    compareAtPrice: 75,
    duration: '60 Minutes',
    category: 'facial',
    image: SPA_FACIAL_IMAGE,
    tag: 'Glow Facial',
    therapists: ['Chioma Davies (Master Aesthetician)'],
    availability: 'available',
    featured: true,
    intakeFocus: ['Deep Hydration', 'Pore Clarification', 'Anti-Aging Sculpt', 'Sensitive Skin Calming']
  },
  {
    id: 'spa_couples_retreat',
    title: 'The Solace Couples Sanctuary Retreat',
    tagline: 'Side-by-side aromatherapy massage, private jacuzzi bath & floral tea ceremony',
    description: 'A private suite reservation for two. Includes 90-minute customized pressure massage, sunken stone hydrotherapy bath with floating white orchids, and chilled artisanal hibiscus zobo infusion with seasonal fruit platter.',
    price: 140,
    compareAtPrice: 170,
    duration: '120 Minutes',
    category: 'couples',
    image: SPA_COUPLES_IMAGE,
    tag: 'Couples & VIP',
    therapists: ['Dual Senior Practitioner Team'],
    availability: 'low_slots',
    featured: true,
    intakeFocus: ['Synchronized Rhythm', 'Romantic Hydrotherapy', 'Deep Stress Dissolve']
  },
  {
    id: 'spa_eucalyptus_polish',
    title: 'Eucalyptus & Atlantic Mineral Salt Polish',
    tagline: 'Full-body dead cell exfoliation with mineral salts followed by warm shea butter massage',
    description: 'Crushed organic eucalyptus leaves and Dead Sea mineral crystals buffed into the skin to stimulate lymphatic flow. Concludes with a melted organic raw shea butter cocoon that leaves skin silky smooth.',
    price: 65,
    compareAtPrice: 80,
    duration: '75 Minutes',
    category: 'scrub',
    image: SPA_OIL_IMAGE,
    tag: 'Body Detox',
    therapists: ['Boma Briggs (Skin Therapist)'],
    availability: 'available',
    featured: false,
    intakeFocus: ['Full Body Exfoliation', 'Dry Skin Hydration', 'Lymphatic Stimulation']
  },
  {
    id: 'spa_holistic_sound_acupressure',
    title: 'Tibetan Sound & Cranial Acupressure',
    tagline: 'Vibrational brass singing bowls combined with scalp and temple acupressure points',
    description: 'A deeply meditative sensory journey designed for chronic insomnia and cognitive overload. Harmonic acoustic resonance resets the nervous system into restorative alpha wave frequencies.',
    price: 55,
    duration: '60 Minutes',
    category: 'holistic',
    image: SPA_HERO_IMAGE,
    tag: 'Mind & Sleep',
    therapists: ['Dayo Adeleke (Sound & Breath Guide)'],
    availability: 'available',
    featured: false,
    intakeFocus: ['Mental Decompression', 'Insomnia Relief', 'Cranial Tension']
  }
];

export const INITIAL_SPA_THERAPISTS: SpaTherapist[] = [
  {
    id: 'th_1',
    name: 'Amara Okafor',
    role: 'Lead Holistic Bodyworker',
    experience: '9 Years Experience',
    specialty: 'Volcanic River Stone & Deep Fascial Release',
    bio: 'Certified in Bali and Kerala Ayurvedic bodywork. Specializes in chronic shoulder tension and nervous system soothing.'
  },
  {
    id: 'th_2',
    name: 'Chioma Davies',
    role: 'Master Clinical Aesthetician',
    experience: '7 Years Experience',
    specialty: 'Botanical Herbal Dermal Facials & Jade Sculpting',
    bio: 'Formulates custom botanical blends with wild African botanicals for radiant skin barrier health.'
  },
  {
    id: 'th_3',
    name: 'Dayo Adeleke',
    role: 'Acupressure & Sound Practitioner',
    experience: '6 Years Experience',
    specialty: 'Tibetan Singing Bowls & Pressure Therapy',
    bio: 'Guides clients out of high-cortisol burnout through acoustic resonance and cranial decompression.'
  }
];

export const INITIAL_SPA_REVIEWS: SpaReview[] = [
  {
    id: 's_rev_1',
    author: 'Dr. Tariere Alagoa',
    location: 'Banana Island, Ikoyi',
    rating: 5,
    comment: 'The Volcanic River Stone ritual with Amara was the most restorative 90 minutes of my year. The private suites are completely quiet and the eucalyptus scent fills the space immediately upon entering.',
    date: '3 days ago',
    treatment: 'Volcanic River Stone Massage'
  },
  {
    id: 's_rev_2',
    author: 'Gbenga & Toyin Ashafa',
    location: 'Victoria Island',
    rating: 5,
    comment: 'We booked the Couples Sanctuary Retreat for our 10th anniversary. The private stone hydrotherapy bath with floating white orchids felt like a 5-star resort in Ubud. Booking through WhatsApp was instant.',
    date: '1 week ago',
    treatment: 'Couples Sanctuary Retreat'
  },
  {
    id: 's_rev_3',
    author: 'Ronke Onasanya',
    location: 'Lekki Phase 1',
    rating: 5,
    comment: 'Chioma’s Botanical Radiance facial transformed my dry, dehydrated skin. The cold jade roller technique was so soothing. I’m now a monthly regular.',
    date: '2 weeks ago',
    treatment: 'Botanical Radiance Facial'
  }
];

export const INITIAL_SPA_CONFIG: SpaConfig = {
  spaName: 'Solace Sanctuary',
  tagline: 'Holistic Bodywork, Botanical Facials & Wellness Rituals',
  whatsappNumber: '2348030795206',
  contactEmail: 'sanctuary@solacespa.com',
  contactPhone: '+234 803 079 5206',
  sanctuaryAddress: '8 Bishop Kale Close, Victoria Island, Lagos',
  operatingHours: 'Mon - Sun: 9:00 AM – 8:00 PM (By appointment)',
  currencySymbol: '$',
  currencyCode: 'CAD',
  promoBanner: {
    enabled: true,
    text: '🌿 Midweek Serenity: Complimentary 15-min Scalp Acupressure with every 90-minute massage booking.',
    badgeText: 'Midweek Offer',
    linkText: 'Reserve Session',
    linkUrl: '#treatments',
    bgColor: 'eucalyptus'
  },
  therapists: INITIAL_SPA_THERAPISTS,
  reviews: INITIAL_SPA_REVIEWS
};

export const INITIAL_SPA_APPOINTMENTS: SpaAppointment[] = [
  {
    id: 'SPA-801',
    clientName: 'Funke Akindele',
    clientPhone: '+234 802 111 4455',
    treatmentName: 'Volcanic River Stone Massage',
    treatmentPrice: 75,
    duration: '90 Minutes',
    date: 'Saturday Morning',
    timeSlot: '11:00 AM',
    therapistPreference: 'Amara Okafor (Senior Lead)',
    pressurePreference: 'Deep Tissue',
    addOns: ['Herbal Foot Bath Ritual'],
    notes: 'Focus on lower back and shoulder tension please',
    status: 'confirmed',
    timestamp: '2026-10-28 09:30 AM'
  },
  {
    id: 'SPA-802',
    clientName: 'Emeka Anyaoku',
    clientPhone: '+234 803 555 8899',
    treatmentName: 'The Solace Couples Sanctuary Retreat',
    treatmentPrice: 140,
    duration: '120 Minutes',
    date: 'Sunday Evening',
    timeSlot: '5:30 PM',
    therapistPreference: 'Dual Senior Practitioner Team',
    pressurePreference: 'Medium Therapeutic',
    notes: 'Anniversary celebration for 2',
    status: 'pending',
    timestamp: '2026-10-28 11:15 AM'
  }
];
