export interface ServiceItem {
  id: string;
  title: string;
  category: 'facial' | 'hair' | 'nail' | 'skin' | 'spa' | 'bridal';
  price: string;
  duration: string;
  description: string;
  tag?: string;
  features: string[];
}

export interface CosmeticProduct {
  id: string;
  name: string;
  subtitle: string;
  category: 'Skincare' | 'Haircare' | 'Nails' | 'Luxury Oil';
  price: string;
  originalPrice: string;
  rating: number;
  reviewsCount: number;
  volume: string;
  highlight: string;
  howToUseSteps: {
    step: number;
    title: string;
    description: string;
  }[];
  beauticianTip: string;
  keyIngredients: string[];
}

export interface AdOffer {
  id: string;
  badge: string;
  title: string;
  discount: string;
  subtitle: string;
  code: string;
  expiresIn: string;
  bgGradient: [string, string];
}

export const SALON_INFO = {
  name: 'Iswari Beautician',
  tagline: 'Luxury Parlor, Aesthetics & Cosmetics Studio',
  experience: '12+ Years of Beauty Artistry',
  rating: '4.9',
  clientsServed: '15,000+',
  address: 'Suite 204, Royal Bloom Avenue, Main High Street',
  phone: '+91 98765 43210',
  whatsapp: '+919876543210',
  timing: 'Tue - Sun: 10:00 AM - 8:30 PM',
};

export const AD_OFFERS: AdOffer[] = [
  {
    id: 'offer-1',
    badge: 'FESTIVE SPECIAL',
    title: 'Bridal Glow & Skin Radiance Package',
    discount: '40% OFF',
    subtitle: 'Includes 24K Gold Facial, Keratin Treatment, VIP Shellac & Full Body Polish',
    code: 'ISWARI40',
    expiresIn: 'Ends this Sunday',
    bgGradient: ['#2A1320', '#120A14'],
  },
  {
    id: 'offer-2',
    badge: 'WEEKEND GLAM',
    title: 'VIP Nail Art & French Gel Extensions',
    discount: 'FLAT ₹999',
    subtitle: 'Free cuticle therapy + hand collagen massage included with every set',
    code: 'GLAMNAILS',
    expiresIn: 'Limited slots daily',
    bgGradient: ['#1C1E2E', '#0B0D18'],
  },
  {
    id: 'offer-3',
    badge: 'NEW CLIENT VIP',
    title: 'Maison Spa & Hydra-Facial Ritual',
    discount: '30% OFF',
    subtitle: 'Deep dermal detox, enzyme peeling, and tension-relief aromatherapy massage',
    code: 'FIRSTGLOW',
    expiresIn: 'For first-time visitors',
    bgGradient: ['#231F14', '#100E08'],
  },
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 's-1',
    title: 'Signature Glow Facial',
    category: 'facial',
    price: '₹1,499',
    duration: '60 mins',
    description: 'Deep-pore cleansing, brightening fruit enzymes, collagen massage & botanical sheet mask for instant radiance.',
    tag: 'Bestseller',
    features: ['Deep cleanse & blackhead suction', 'Herbal steam & enzyme peel', 'Anti-fatigue ice globe massage'],
  },
  {
    id: 's-2',
    title: 'VIP Acrylic & Shellac Nails',
    category: 'nail',
    price: '₹1,199',
    duration: '75 mins',
    description: 'Long-lasting custom nail extensions, artistic gel designs, French tips, and soothing cuticle oil treatment.',
    tag: 'Trending',
    features: ['Sculpted acrylic or gel extensions', 'Chip-resistant gel top coat', 'Nourishing botanical hand soak'],
  },
  {
    id: 's-3',
    title: 'Keratin Hair Spa & Smoothening',
    category: 'hair',
    price: '₹2,299',
    duration: '90 mins',
    description: 'Restores dry, frizzy strands with pure keratin infusion, intensive steam mask, and precision split-end trim.',
    tag: 'Popular',
    features: ['Formaldehyde-free keratin protein', 'Deep scalp circulation massage', 'Silky high-shine blow-dry finish'],
  },
  {
    id: 's-4',
    title: 'Advanced Derma Skin Peel & LED',
    category: 'skin',
    price: '₹1,899',
    duration: '50 mins',
    description: 'Target hyperpigmentation, uneven texture, and blemishes with gentle clinical glycolic peels and rejuvenating LED light.',
    features: ['Clinical grade AHA/BHA peel', '7-Color phototherapy LED mask', 'Hydrating peptide serum infusion'],
  },
  {
    id: 's-5',
    title: 'Calming Aromatherapy Spa Ritual',
    category: 'spa',
    price: '₹2,499',
    duration: '75 mins',
    description: 'Full body tension-release massage using warm lavender and sandalwood essential oils to dissolve stress.',
    features: ['Custom essential oil blends', 'Pressure point release technique', 'Warm herbal compress therapy'],
  },
  {
    id: 's-6',
    title: 'Royal HD Bridal Makeover',
    category: 'bridal',
    price: '₹8,999',
    duration: '180 mins',
    description: 'Celebrity-grade HD makeup, professional waterproof contouring, customized hairstyle, saree/lehenga draping & lashes.',
    tag: 'VIP Luxury',
    features: ['High-definition waterproof finish', 'Premium mink lashes & hair accessories', 'Includes touch-up vanity kit'],
  },
];

export const COSMETIC_PRODUCTS: CosmeticProduct[] = [
  {
    id: 'p-1',
    name: 'Radiant Glow 15% Vitamin C Elixir',
    subtitle: 'Triple-Active Brightening & Anti-Dark Spot Serum',
    category: 'Skincare',
    price: '₹899',
    originalPrice: '₹1,299',
    rating: 4.9,
    reviewsCount: 320,
    volume: '30 ml',
    highlight: 'Fades spots & boosts skin collagen in 14 days',
    keyIngredients: ['Pure L-Ascorbic Acid', 'Ferulic Acid', 'Hyaluronic Acid', 'Orange Peel Extract'],
    howToUseSteps: [
      {
        step: 1,
        title: 'Cleanse & Prep',
        description: 'Wash your face thoroughly with a mild foaming cleanser and pat gently with a clean micro-fiber towel.',
      },
      {
        step: 2,
        title: 'Dispense Elixir',
        description: 'Squeeze 3 to 4 drops directly onto your cheeks, forehead, and chin using the dropper without touching the skin.',
      },
      {
        step: 3,
        title: 'Upward Massage',
        description: 'Gently press and tap into skin using upward circular strokes. Allow 60 seconds to absorb deeply into dermal layers.',
      },
      {
        step: 4,
        title: 'Lock & Protect',
        description: 'Follow up with your moisturizer. Always apply SPF 50+ sunscreen during daytime use for optimal glow.',
      },
    ],
    beauticianTip: 'For ultra-glowy results, store in a beauty fridge and apply on slightly damp skin right after toner!',
  },
  {
    id: 'p-2',
    name: '24K Gold Youth Rejuvenating Oil',
    subtitle: 'Nourishing Dermal Elixir with Real Gold Flakes',
    category: 'Luxury Oil',
    price: '₹1,299',
    originalPrice: '₹1,850',
    rating: 4.8,
    reviewsCount: 215,
    volume: '25 ml',
    highlight: 'Illuminates dull skin & locks 24-hr moisture',
    keyIngredients: ['24-Karat Gold Flakes', 'Rosehip Seed Oil', 'Squalane', 'Jojoba Oil'],
    howToUseSteps: [
      {
        step: 1,
        title: 'Warm Drops in Palm',
        description: 'Warm 2 drops between your clean fingertips to activate the gold micron-particles and botanical oils.',
      },
      {
        step: 2,
        title: 'Press into High Points',
        description: 'Press firmly into cheekbones, jawline, forehead, and neck area where natural light catches.',
      },
      {
        step: 3,
        title: 'Gua Sha Sculpting',
        description: 'Glide a rose quartz gua-sha or finger knuckles upwards from chin towards ears for lymphatic drainage.',
      },
    ],
    beauticianTip: 'Mix a single drop with your liquid foundation or BB cream to create a dewy, glass-skin celebrity finish!',
  },
  {
    id: 'p-3',
    name: 'Moroccan Argan & Keratin Hair Shield',
    subtitle: 'Frizz-Control Heat Protection & Shine Serum',
    category: 'Haircare',
    price: '₹749',
    originalPrice: '₹1,099',
    rating: 4.9,
    reviewsCount: 450,
    volume: '100 ml',
    highlight: 'Protects against 230°C heat & seals split ends',
    keyIngredients: ['Cold-Pressed Moroccan Argan Oil', 'Hydrolyzed Keratin', 'Silk Proteins', 'Vitamin E'],
    howToUseSteps: [
      {
        step: 1,
        title: 'Damp Towel-Dried Hair',
        description: 'After washing, gently squeeze excess water from your hair using a cotton towel.',
      },
      {
        step: 2,
        title: 'Even Distribution',
        description: 'Pump 1-2 drops onto palms, rub together, and distribute evenly starting from mid-shaft down to the tips.',
      },
      {
        step: 3,
        title: 'Style as Desired',
        description: 'Comb through with a wide-tooth comb. Blow-dry, straighten, or let dry naturally for smooth salon softness.',
      },
    ],
    beauticianTip: 'Avoid applying directly on roots to preserve your hair’s natural crown bounce and lift all day long.',
  },
  {
    id: 'p-4',
    name: 'Peptide Rose Water Hydration Mist',
    subtitle: 'Soothing Pore-Tightening Facial Spritz',
    category: 'Skincare',
    price: '₹549',
    originalPrice: '₹799',
    rating: 4.7,
    reviewsCount: 180,
    volume: '120 ml',
    highlight: 'Instant 92% hydration boost & makeup refresher',
    keyIngredients: ['Steam-Distilled Damask Rose Water', 'Niacinamide (Vitamin B3)', 'Aloe Vera', 'Centella Asiatica'],
    howToUseSteps: [
      {
        step: 1,
        title: 'Hold 8 Inches Away',
        description: 'Hold the spray bottle roughly 8 inches (20 cm) from your face and close your eyes.',
      },
      {
        step: 2,
        title: 'Spritz in Cross Pattern',
        description: 'Spritz 2 to 3 micro-mists in an X and T pattern across your face, neck, and décolletage.',
      },
      {
        step: 3,
        title: 'Gentle Patting',
        description: 'Allow droplets to air dry naturally or tap lightly with fingertips to promote deep micro-circulation.',
      },
    ],
    beauticianTip: 'Keep a bottle in your purse or car. Spritz whenever AC dries out your skin or before touch-ups!',
  },
  {
    id: 'p-5',
    name: 'Botanical Cuticle & Nail Therapy Oil',
    subtitle: 'Intensive Strengthening Treatment for Salon Nails',
    category: 'Nails',
    price: '₹399',
    originalPrice: '₹599',
    rating: 4.9,
    reviewsCount: 290,
    volume: '15 ml',
    highlight: 'Stops brittle splitting & keeps manicures fresh',
    keyIngredients: ['Sweet Almond Oil', 'Tea Tree Antiseptic Oil', 'Biotin', 'Lavender Extract'],
    howToUseSteps: [
      {
        step: 1,
        title: 'Apply Brush Tip',
        description: 'Sweep the applicator brush along the base of each nail bed, side walls, and under nail tips.',
      },
      {
        step: 2,
        title: 'Circular Massage',
        description: 'Massage gently into the cuticle matrix for 30 seconds per finger until deeply nourished.',
      },
    ],
    beauticianTip: 'Apply right before sleeping every night. It prevents painful hangnails and makes gel nails last 2 weeks longer!',
  },
];

export const TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Priyanka Sharma',
    service: 'Bridal Makeover & Facial',
    rating: 5,
    comment: 'Iswari Beautician transformed my look for my wedding day! The glowing facial stayed radiant all week and the makeup was so lightweight and waterproof.',
    date: '2 days ago',
  },
  {
    id: 't-2',
    name: 'Sneha Patel',
    service: 'VIP Acrylic Nails & Hair Spa',
    rating: 5,
    comment: 'The nail artistry here is top-notch! The products they suggested for my haircare at home made my hair frizz-free within days.',
    date: '1 week ago',
  },
  {
    id: 't-3',
    name: 'Meera Deshmukh',
    service: 'Hydra-Infusion Facial Ritual',
    rating: 5,
    comment: 'Very hygienic, soothing black-lounge aesthetic and the beauticians are true experts. Loved the complimentary consultation!',
    date: '2 weeks ago',
  },
];
