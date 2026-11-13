export interface ServiceItem {
  id: string;
  title: string;
  category: "facial" | "hair" | "nail" | "skin" | "spa" | "bridal";
  price: string;
  duration: string;
  description: string;
  tag?: string;
  features: string[];
}

export interface ResultMilestone {
  days: string;
  effect: string;
}

export interface CosmeticProduct {
  id: string;
  name: string;
  subtitle: string;
  partition: "cosmetics" | "others";
  category:
    | "Skincare"
    | "Haircare"
    | "Nails"
    | "Luxury Oil"
    | "Salon Device"
    | "Body Care";
  price: string;
  originalPrice: string;
  rating: number;
  reviewsCount: number;
  volume: string;
  highlight: string;
  resultDays: string;
  resultTimeline: {
    summary: string;
    milestones: ResultMilestone[];
  };
  usageFrequency: string;
  suitableFor: string;
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
  name: "Iswari Beautician",
  tagline: "Luxury Parlor, Aesthetics & Cosmetics Studio",
  experience: "12+ Years of Beauty Artistry",
  rating: "4.9",
  clientsServed: "15,000+",
  address: "Suite 204, Royal Bloom Avenue, Main High Street",
  phone: "++919763644772",
  whatsapp: "+919763644772",
  timing: "Tue - Sun: 10:00 AM - 8:30 PM",
};

export const AD_OFFERS: AdOffer[] = [
  {
    id: "offer-1",
    badge: "FESTIVE SPECIAL",
    title: "Bridal Glow & Skin Radiance Package",
    discount: "40% OFF",
    subtitle:
      "Includes 24K Gold Facial, Keratin Treatment, VIP Shellac & Full Body Polish",
    code: "ISWARI40",
    expiresIn: "Ends this Sunday",
    bgGradient: ["#2A1320", "#120A14"],
  },
  {
    id: "offer-2",
    badge: "WEEKEND GLAM",
    title: "VIP Nail Art & French Gel Extensions",
    discount: "FLAT ₹999",
    subtitle:
      "Free cuticle therapy + hand collagen massage included with every set",
    code: "GLAMNAILS",
    expiresIn: "Limited slots daily",
    bgGradient: ["#1C1E2E", "#0B0D18"],
  },
  {
    id: "offer-3",
    badge: "NEW CLIENT VIP",
    title: "Maison Spa & Hydra-Facial Ritual",
    discount: "30% OFF",
    subtitle:
      "Deep dermal detox, enzyme peeling, and tension-relief aromatherapy massage",
    code: "FIRSTGLOW",
    expiresIn: "For first-time visitors",
    bgGradient: ["#231F14", "#100E08"],
  },
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: "s-1",
    title: "Signature Glow Facial",
    category: "facial",
    price: "₹1,499",
    duration: "60 mins",
    description:
      "Deep-pore cleansing, brightening fruit enzymes, collagen massage & botanical sheet mask for instant radiance.",
    tag: "Bestseller",
    features: [
      "Deep cleanse & blackhead suction",
      "Herbal steam & enzyme peel",
      "Anti-fatigue ice globe massage",
    ],
  },
  {
    id: "s-2",
    title: "VIP Acrylic & Shellac Nails",
    category: "nail",
    price: "₹1,199",
    duration: "75 mins",
    description:
      "Long-lasting custom nail extensions, artistic gel designs, French tips, and soothing cuticle oil treatment.",
    tag: "Trending",
    features: [
      "Sculpted acrylic or gel extensions",
      "Chip-resistant gel top coat",
      "Nourishing botanical hand soak",
    ],
  },
  {
    id: "s-3",
    title: "Keratin Hair Spa & Smoothening",
    category: "hair",
    price: "₹2,299",
    duration: "90 mins",
    description:
      "Restores dry, frizzy strands with pure keratin infusion, intensive steam mask, and precision split-end trim.",
    tag: "Popular",
    features: [
      "Formaldehyde-free keratin protein",
      "Deep scalp circulation massage",
      "Silky high-shine blow-dry finish",
    ],
  },
  {
    id: "s-4",
    title: "Advanced Derma Skin Peel & LED",
    category: "skin",
    price: "₹1,899",
    duration: "50 mins",
    description:
      "Target hyperpigmentation, uneven texture, and blemishes with gentle clinical glycolic peels and rejuvenating LED light.",
    features: [
      "Clinical grade AHA/BHA peel",
      "7-Color phototherapy LED mask",
      "Hydrating peptide serum infusion",
    ],
  },
  {
    id: "s-5",
    title: "Calming Aromatherapy Spa Ritual",
    category: "spa",
    price: "₹2,499",
    duration: "75 mins",
    description:
      "Full body tension-release massage using warm lavender and sandalwood essential oils to dissolve stress.",
    features: [
      "Custom essential oil blends",
      "Pressure point release technique",
      "Warm herbal compress therapy",
    ],
  },
  {
    id: "s-6",
    title: "Royal HD Bridal Makeover",
    category: "bridal",
    price: "₹8,999",
    duration: "180 mins",
    description:
      "Celebrity-grade HD makeup, professional waterproof contouring, customized hairstyle, saree/lehenga draping & lashes.",
    tag: "VIP Luxury",
    features: [
      "High-definition waterproof finish",
      "Premium mink lashes & hair accessories",
      "Includes touch-up vanity kit",
    ],
  },
];

export const COSMETIC_PRODUCTS: CosmeticProduct[] = [
  // --- COSMETICS & SKINCARE PARTITION ---
  {
    id: "p-1",
    name: "Radiant Glow 15% Vitamin C Elixir",
    subtitle: "Triple-Active Brightening & Anti-Dark Spot Serum",
    partition: "cosmetics",
    category: "Skincare",
    price: "₹899",
    originalPrice: "₹1,299",
    rating: 4.9,
    reviewsCount: 320,
    volume: "30 ml",
    highlight: "Fades spots & boosts skin collagen in 7-14 days",
    resultDays: "7 - 14 Days",
    resultTimeline: {
      summary:
        "Visible radiance within 7 days, optimal collagen synthesis and dark spot fading in 14-21 days.",
      milestones: [
        {
          days: "Days 1 - 3",
          effect:
            "Immediate boost in skin hydration, velvety surface feel, and radiant glow.",
        },
        {
          days: "Days 7 - 10",
          effect:
            "Noticeable reduction in dullness, sun tan, and post-acne redness.",
        },
        {
          days: "Days 14 - 21",
          effect:
            "Even skin tone, visibly lightened dark spots, and firmer dermal texture.",
        },
      ],
    },
    usageFrequency: "Twice Daily (Morning & Evening)",
    suitableFor: "All Skin Types • Dull, Hyperpigmented & Sun-Damaged Skin",
    keyIngredients: [
      "Pure L-Ascorbic Acid (15%)",
      "Ferulic Acid",
      "Hyaluronic Acid",
      "Orange Peel Extract",
    ],
    howToUseSteps: [
      {
        step: 1,
        title: "Cleanse & Tone",
        description:
          "Wash your face thoroughly with a mild foaming cleanser and pat gently with a clean micro-fiber towel.",
      },
      {
        step: 2,
        title: "Dispense 3-4 Drops",
        description:
          "Squeeze 3 to 4 drops directly onto your cheeks, forehead, and chin using the glass dropper without touching the skin.",
      },
      {
        step: 3,
        title: "Upward Tap Massage",
        description:
          "Gently press and tap into skin using upward circular strokes. Allow 60 seconds to absorb deeply into dermal layers.",
      },
      {
        step: 4,
        title: "Lock with SPF / Cream",
        description:
          "Follow up with your moisturizer. Always apply SPF 50+ sunscreen during daytime use for optimal glow and protection.",
      },
    ],
    beauticianTip:
      "For ultra-glowy results, store in a beauty fridge and apply on slightly damp skin right after toner!",
  },
  {
    id: "p-2",
    name: "24K Gold Youth Rejuvenating Oil",
    subtitle: "Nourishing Dermal Elixir with Real Gold Flakes",
    partition: "cosmetics",
    category: "Luxury Oil",
    price: "₹1,299",
    originalPrice: "₹1,850",
    rating: 4.8,
    reviewsCount: 215,
    volume: "25 ml",
    highlight: "Illuminates dull skin & locks 24-hr moisture",
    resultDays: "5 - 10 Days",
    resultTimeline: {
      summary:
        "Immediate luminous glass-skin finish; deep cellular moisture seal within 5-10 days.",
      milestones: [
        {
          days: "Day 1",
          effect:
            "Instant dewy sheen and soft-focus radiance upon first application.",
        },
        {
          days: "Days 5 - 7",
          effect:
            "Deep moisture retention, eliminated dry patches, and supple barrier.",
        },
        {
          days: "Days 10 - 14",
          effect:
            "Enhanced skin elasticity, plumper cheek contour, and glowing complexion.",
        },
      ],
    },
    usageFrequency: "Nightly Ritual (or Pre-Makeup Primer)",
    suitableFor: "Dry, Normal & Combination Skin • Fine Lines & Flaky Skin",
    keyIngredients: [
      "24-Karat Gold Micro-Flakes",
      "Cold-Pressed Rosehip Seed Oil",
      "Olive Squalane",
      "Golden Jojoba",
    ],
    howToUseSteps: [
      {
        step: 1,
        title: "Warm Drops in Palm",
        description:
          "Warm 2-3 drops between your clean fingertips to activate the 24k gold micron-particles and botanical oils.",
      },
      {
        step: 2,
        title: "Press into High Points",
        description:
          "Press firmly into cheekbones, jawline, forehead, and neck area where natural light catches.",
      },
      {
        step: 3,
        title: "Gua Sha Sculpting",
        description:
          "Glide a rose quartz gua-sha or finger knuckles upwards from chin towards ears for lymphatic drainage.",
      },
    ],
    beauticianTip:
      "Mix a single drop with your liquid foundation or BB cream to create a celebrity dewy glass-skin finish!",
  },
  {
    id: "p-4",
    name: "Peptide Rose Water Hydration Mist",
    subtitle: "Soothing Pore-Tightening Facial Spritz",
    partition: "cosmetics",
    category: "Skincare",
    price: "₹549",
    originalPrice: "₹799",
    rating: 4.7,
    reviewsCount: 180,
    volume: "120 ml",
    highlight: "Instant 92% hydration boost & makeup refresher",
    resultDays: "Immediate & 3 - 5 Days",
    resultTimeline: {
      summary:
        "Instant 92% hydration revival on spray; tightened pores and balanced oil in 3-5 days.",
      milestones: [
        {
          days: "Immediate",
          effect:
            "Instant cooling relief, redness calming, and dewy hydration reset.",
        },
        {
          days: "Days 3 - 5",
          effect:
            "Regulated sebum production and noticeably refined pore appearance.",
        },
        {
          days: "Days 10+",
          effect:
            "Strengthened acid mantle, reduced irritation, and luminous makeup wear.",
        },
      ],
    },
    usageFrequency: "3-4 Times Daily as Needed",
    suitableFor:
      "All Skin Types • Especially Dehydrated, Sensitive or Stressed Skin",
    keyIngredients: [
      "Steam-Distilled Damask Rose Water",
      "Niacinamide (Vitamin B3)",
      "Copper Peptides",
      "Centella Asiatica",
    ],
    howToUseSteps: [
      {
        step: 1,
        title: "Hold 8 Inches Away",
        description:
          "Hold the spray bottle roughly 8 inches (20 cm) from your face and close your eyes.",
      },
      {
        step: 2,
        title: "Spritz in Cross Pattern",
        description:
          "Spritz 2 to 3 micro-mists in an X and T pattern across your face, neck, and décolletage.",
      },
      {
        step: 3,
        title: "Gentle Patting",
        description:
          "Allow droplets to air dry naturally or tap lightly with fingertips to promote deep micro-circulation.",
      },
    ],
    beauticianTip:
      "Keep a bottle in your purse or car. Spritz whenever AC dries out your skin or before touch-ups!",
  },
  {
    id: "p-6",
    name: "Niacinamide 10% + Zinc Pore Refiner",
    subtitle: "Blemish Clearing & Sebum Harmonizing Serum",
    partition: "cosmetics",
    category: "Skincare",
    price: "₹699",
    originalPrice: "₹999",
    rating: 4.8,
    reviewsCount: 240,
    volume: "30 ml",
    highlight: "Shrinks pores & controls excess shine in 10-14 days",
    resultDays: "10 - 14 Days",
    resultTimeline: {
      summary:
        "Controls excess t-zone shine in 4 days; visibly tightens enlarged pores and clears blemishes in 10-14 days.",
      milestones: [
        {
          days: "Days 2 - 4",
          effect:
            "T-zone shine reduced by 60%, skin feels matte and refreshed.",
        },
        {
          days: "Days 7 - 10",
          effect:
            "Congested pores cleared, blackheads and micro-bumps significantly reduced.",
        },
        {
          days: "Days 14 - 20",
          effect:
            "Ultra-smooth skin texture, refined pore appearance, and balanced tone.",
        },
      ],
    },
    usageFrequency: "Every Morning & Night after Cleansing",
    suitableFor: "Oily, Combination & Blemish-Prone Skin",
    keyIngredients: [
      "High-Purity Niacinamide (10%)",
      "Zinc PCA (1%)",
      "Licorice Root Extract",
      "Hyaluronic Acid",
    ],
    howToUseSteps: [
      {
        step: 1,
        title: "Cleanse Face",
        description:
          "Start with freshly washed, clean skin using a salicylic or gentle foaming cleanser.",
      },
      {
        step: 2,
        title: "Apply 2-3 Drops",
        description:
          "Apply drops to forehead, nose, and cheeks where pores are most visible.",
      },
      {
        step: 3,
        title: "Smooth & Absorb",
        description:
          "Smooth gently until completely absorbed into the skin without harsh rubbing.",
      },
    ],
    beauticianTip:
      "Pair with our Rose Mist for rapid absorption without any sticky residue!",
  },
  {
    id: "p-7",
    name: "Hydro-Plump 2% Hyaluronic Acid B5 Serum",
    subtitle: "Multi-Molecular Deep Hydration Infusion",
    partition: "cosmetics",
    category: "Skincare",
    price: "₹799",
    originalPrice: "₹1,150",
    rating: 4.9,
    reviewsCount: 310,
    volume: "30 ml",
    highlight: "Bounces skin & fills micro dehydration lines in 3-7 days",
    resultDays: "3 - 7 Days",
    resultTimeline: {
      summary:
        "Instant plumping cushion effect; complete restoration of the moisture barrier within 7 days.",
      milestones: [
        {
          days: "Day 1",
          effect:
            "Skin feels instantly drenched with hydration and loses morning tightness.",
        },
        {
          days: "Days 3 - 5",
          effect:
            "Micro-lines from dehydration soften; skin gains a dewy, plump bounce.",
        },
        {
          days: "Days 7 - 14",
          effect:
            "Moisture barrier fully restored, resistant to weather dryness.",
        },
      ],
    },
    usageFrequency: "Twice Daily on Damp Skin",
    suitableFor:
      "All Skin Types • Especially Dehydrated, Flaky or Sensitive Skin",
    keyIngredients: [
      "Multi-Weight Hyaluronic Acid",
      "Pro-Vitamin B5 (Panthenol)",
      "Marine Algae",
      "Tasmanian Berry",
    ],
    howToUseSteps: [
      {
        step: 1,
        title: "Keep Skin Damp",
        description:
          "Best applied immediately on damp skin right after washing or misting with rose water.",
      },
      {
        step: 2,
        title: "Press & Pat",
        description:
          "Apply 3-4 drops across face and neck. Press firmly into skin with both open palms.",
      },
      {
        step: 3,
        title: "Seal with Cream",
        description:
          "Always seal with a nourishing moisturizer to lock the moisture molecules inside the epidermis.",
      },
    ],
    beauticianTip:
      "Never apply pure hyaluronic acid on bone-dry skin — damp skin is the secret key to unlocking maximum volume!",
  },
  {
    id: "p-8",
    name: "Retinol 0.5% Night Restorative Fluid",
    subtitle: "Gentle Encapsulated Cellular Renewal Complex",
    partition: "cosmetics",
    category: "Skincare",
    price: "₹1,099",
    originalPrice: "₹1,599",
    rating: 4.8,
    reviewsCount: 195,
    volume: "30 ml",
    highlight:
      "Smoothes fine lines & accelerates cellular turnover in 21-28 days",
    resultDays: "21 - 28 Days",
    resultTimeline: {
      summary:
        "Cellular rejuvenation begins in week 1; noticeable reduction in fine wrinkles & hyperpigmentation in 21-28 days.",
      milestones: [
        {
          days: "Week 1",
          effect:
            "Gentle micro-exfoliation and cellular turnover initiated without irritation.",
        },
        {
          days: "Weeks 2 - 3",
          effect:
            "Skin texture feels significantly smoother, radiant and refined.",
        },
        {
          days: "Week 4 (Day 28)",
          effect:
            "Faded fine expression lines, firmer skin contour, and youth glow.",
        },
      ],
    },
    usageFrequency: "Night-Time Only (Start 2-3 Times a Week)",
    suitableFor: "Mature, Aging, Sun-Damaged or Rough Skin",
    keyIngredients: [
      "Micro-Encapsulated Retinol (0.5%)",
      "Bakuchiol",
      "Ceramide NP",
      "Squalane",
    ],
    howToUseSteps: [
      {
        step: 1,
        title: "Cleanse at Night",
        description:
          "Wash face and wait 5 minutes until completely dry before application.",
      },
      {
        step: 2,
        title: "Pea-Sized Amount",
        description:
          "Dispense a pea-sized amount and dot onto cheeks, forehead, and chin.",
      },
      {
        step: 3,
        title: "Moisturize & SPF",
        description:
          "Follow with a peptide barrier moisturizer. Always wear SPF 50 the next morning.",
      },
    ],
    beauticianTip:
      'Use the "sandwich method" if your skin is delicate: moisturizer first, then retinol, then moisturizer again!',
  },

  // --- OTHERS & SALON ESSENTIALS PARTITION ---
  {
    id: "p-3",
    name: "Moroccan Argan & Keratin Hair Shield",
    subtitle: "Frizz-Control Heat Protection & Shine Serum",
    partition: "others",
    category: "Haircare",
    price: "₹749",
    originalPrice: "₹1,099",
    rating: 4.9,
    reviewsCount: 450,
    volume: "100 ml",
    highlight: "Protects against 230°C heat & seals split ends",
    resultDays: "1 - 7 Days",
    resultTimeline: {
      summary:
        "Instant glass hair gloss on application; seals split ends and repairs damaged keratin in 7 days.",
      milestones: [
        {
          days: "Day 1",
          effect:
            "Instant 80% frizz reduction, silky softness, and thermal heat defense.",
        },
        {
          days: "Days 4 - 7",
          effect:
            "Sealed split ends and restored moisture retention in dry strands.",
        },
        {
          days: "Days 14+",
          effect:
            "Resilient strand strength, brilliant natural shine, and tangle-free hair.",
        },
      ],
    },
    usageFrequency: "After Every Hair Wash (on Towel-Damp Hair)",
    suitableFor: "Frizzy, Chemically-Treated, Colored or Heat-Damaged Hair",
    keyIngredients: [
      "Cold-Pressed Moroccan Argan Oil",
      "Hydrolyzed Keratin",
      "Silk Amino Acids",
      "Vitamin E",
    ],
    howToUseSteps: [
      {
        step: 1,
        title: "Damp Towel-Dried Hair",
        description:
          "After washing, gently squeeze excess water from your hair using a cotton towel.",
      },
      {
        step: 2,
        title: "Even Distribution",
        description:
          "Pump 1-2 drops onto palms, rub together, and distribute evenly starting from mid-shaft down to tips.",
      },
      {
        step: 3,
        title: "Style as Desired",
        description:
          "Comb through with a wide-tooth comb. Blow-dry, straighten, or let dry naturally for smooth salon softness.",
      },
    ],
    beauticianTip:
      "Avoid applying directly on roots to preserve your hair’s natural crown bounce and lift all day long.",
  },
  {
    id: "p-5",
    name: "Botanical Cuticle & Nail Matrix Therapy Oil",
    subtitle: "Intensive Strengthening Treatment for Salon Nails",
    partition: "others",
    category: "Nails",
    price: "₹399",
    originalPrice: "₹599",
    rating: 4.9,
    reviewsCount: 290,
    volume: "15 ml",
    highlight: "Stops brittle splitting & keeps manicures fresh",
    resultDays: "7 - 10 Days",
    resultTimeline: {
      summary:
        "Immediate nourishment to dry cuticles; strong, crack-resistant nail growth in 7-10 days.",
      milestones: [
        {
          days: "Day 1",
          effect:
            "Instantly softens rough cuticles, cures hangnail stinging, and revives manicure gloss.",
        },
        {
          days: "Days 5 - 7",
          effect:
            "Deeply conditions nail bed matrix, stops annoying peeling and chipping.",
        },
        {
          days: "Days 10 - 14",
          effect:
            "Visible accelerated strong nail growth, flexible nail plate, and pristine finish.",
        },
      ],
    },
    usageFrequency: "Every Night Before Sleeping",
    suitableFor: "Brittle Nails, Gel & Acrylic Wearers, Dry Cracked Cuticles",
    keyIngredients: [
      "Sweet Almond Oil",
      "Tea Tree Antiseptic Oil",
      "Biotin (Vitamin B7)",
      "Lavender Blossom Extract",
    ],
    howToUseSteps: [
      {
        step: 1,
        title: "Apply Brush Tip",
        description:
          "Sweep the applicator brush along the base of each nail bed, side walls, and under nail tips.",
      },
      {
        step: 2,
        title: "Circular Massage",
        description:
          "Massage gently into the cuticle matrix for 30 seconds per finger until deeply nourished.",
      },
    ],
    beauticianTip:
      "Apply right before sleeping every night. It prevents painful hangnails and makes gel nails last 2 weeks longer!",
  },
  {
    id: "p-9",
    name: "Professional 7-Color LED Phototherapy Mask",
    subtitle: "Salon-Grade Wireless Collagen & Acne LED Device",
    partition: "others",
    category: "Salon Device",
    price: "₹3,499",
    originalPrice: "₹4,999",
    rating: 5.0,
    reviewsCount: 168,
    volume: "1 Device Kit",
    highlight:
      "Stimulates deep fibroblasts & clears stubborn acne in 14-21 days",
    resultDays: "14 - 21 Days",
    resultTimeline: {
      summary:
        "Skin oxygenation and acne bacteria neutralization in 7 days; visible firming and scar fading in 14-21 days.",
      milestones: [
        {
          days: "Days 3 - 7",
          effect:
            "Blue light neutralizes acne-causing bacteria and calms active inflammation.",
        },
        {
          days: "Days 10 - 14",
          effect:
            "Red light accelerates ATP cellular energy and boosts micro-circulation.",
        },
        {
          days: "Days 21 - 28",
          effect:
            "Firm skin contour, stimulated collagen, and faded post-blemish scars.",
        },
      ],
    },
    usageFrequency: "3-4 Times Weekly (15 Minutes Per Session)",
    suitableFor:
      "All Skin Types • Anti-Aging, Cystic Breakouts & Hyperpigmentation",
    keyIngredients: [
      "Medical-Grade Phototherapy Diodes (Red 630nm, Blue 460nm, Amber 590nm, Near-IR)",
    ],
    howToUseSteps: [
      {
        step: 1,
        title: "Cleanse Face & Pat Dry",
        description:
          "Thoroughly wash face. For best light penetration, do not apply opaque or heavy sunscreens before session.",
      },
      {
        step: 2,
        title: "Fit Comfortably",
        description:
          "Place the ergonomic mask over your face and secure the flexible strap. Select your preferred color mode.",
      },
      {
        step: 3,
        title: "Relax for 15 Mins",
        description:
          "Close your eyes and unwind. The device will automatically turn off after 15 minutes of smart treatment.",
      },
      {
        step: 4,
        title: "Post-Light Serums",
        description:
          "Immediately apply your Vitamin C or Hyaluronic Serum to maximize the heightened dermal absorption!",
      },
    ],
    beauticianTip:
      "Use the Blue light setting on Mondays and Wednesdays for acne, and Red light on Fridays for party glow!",
  },
  {
    id: "p-10",
    name: "Scalp Follicle Activating Derma-Roller Kit",
    subtitle: "Microneedle Roller + Rosemary Peppermint Infusion",
    partition: "others",
    category: "Haircare",
    price: "₹1,199",
    originalPrice: "₹1,699",
    rating: 4.8,
    reviewsCount: 185,
    volume: "0.5mm Roller + 50ml Oil",
    highlight: "Awakens dormant follicles & boosts hair density in 14-30 days",
    resultDays: "14 - 30 Days",
    resultTimeline: {
      summary:
        "Invigorates scalp circulation in 7 days; reduces hair fall in 14 days; new baby hair growth in 30 days.",
      milestones: [
        {
          days: "Days 1 - 7",
          effect:
            "Scalp micro-circulation activated; itchiness and scalp tension relieved.",
        },
        {
          days: "Days 14 - 21",
          effect:
            "Noticeable 70% decrease in daily hair shedding while brushing or washing.",
        },
        {
          days: "Days 30 - 45",
          effect:
            "Visible sprouting of healthy baby hairs along hairline and crown.",
        },
      ],
    },
    usageFrequency: "Derma-Roll 1-2 Times Weekly; Oil Applied 3 Times Weekly",
    suitableFor: "Thinning Hair, Receding Temples, Scalp Dryness & Hair Fall",
    keyIngredients: [
      "0.5mm Titanium Micro-Needles",
      "Rosemary Essential Oil",
      "Peppermint Extract",
      "Redensyl Complex",
      "Biotin",
    ],
    howToUseSteps: [
      {
        step: 1,
        title: "Sanitize Roller",
        description:
          "Soak roller head in 70% isopropyl alcohol for 5 minutes before every use. Wash scalp cleanly.",
      },
      {
        step: 2,
        title: "Gentle Rolling",
        description:
          "Roll gently 4-5 times horizontally, vertically, and diagonally across thinning crown or hairline zones.",
      },
      {
        step: 3,
        title: "Apply Follicle Oil",
        description:
          "Dispense 1-2 droppers of Rosemary peptide oil directly onto rolled zones and massage for 2 minutes.",
      },
    ],
    beauticianTip:
      "Never press hard with the roller — light pressure is plenty to activate cellular growth factors without damaging the scalp.",
  },
  {
    id: "p-11",
    name: "Royal Sandalwood & Saffron Body Polish",
    subtitle: "Ayurvedic Dermal Exfoliating & Brightening Ubtan",
    partition: "others",
    category: "Body Care",
    price: "₹849",
    originalPrice: "₹1,200",
    rating: 4.9,
    reviewsCount: 220,
    volume: "200 g",
    highlight: "Polishes rough elbows, knees & reveals bridal velvet body glow",
    resultDays: "Immediate & 7 Days",
    resultTimeline: {
      summary:
        "Immediate velvety softness on 1st scrub; even body skin tone and tan removal in 7 days.",
      milestones: [
        {
          days: "Immediate",
          effect:
            "Rough skin flakes banished; elbows, knees and neck feel baby soft.",
        },
        {
          days: "Days 4 - 7",
          effect:
            "Visible fading of stubborn neck and body tanning; radiant even glow.",
        },
        {
          days: "Days 14+",
          effect:
            "Prevents strawberry legs and ingrown hair bumps with regular exfoliation.",
        },
      ],
    },
    usageFrequency: "2 Times a Week in the Shower",
    suitableFor:
      "All Body Skin Types • Tan Removal, Rough Elbows, Strawberry Legs",
    keyIngredients: [
      "Mysore Sandalwood Powder",
      "Kashmiri Saffron (Kesar)",
      "Walnut Shell Micro-Granules",
      "Almond Milk Extract",
    ],
    howToUseSteps: [
      {
        step: 1,
        title: "Warm Shower Soak",
        description:
          "Dampen body in warm water for 3 minutes to soften keratinized skin cells.",
      },
      {
        step: 2,
        title: "Circular Scrubbing",
        description:
          "Take a generous scoop and buff in circular motions over neck, arms, elbows, back, and legs.",
      },
      {
        step: 3,
        title: "Rinse & Admire",
        description:
          "Rinse with warm water without soap. Pat dry to leave the lingering exotic aroma of pure sandalwood.",
      },
    ],
    beauticianTip:
      "Always use before self-tanning or pre-waxing appointments for a super silky, strawberry-skin-free finish!",
  },
  {
    id: "p-12",
    name: "Aromatherapy Stress & Tension Temple Balm",
    subtitle: "Handcrafted Lavender & Sandalwood Soothing Salve",
    partition: "others",
    category: "Body Care",
    price: "₹449",
    originalPrice: "₹650",
    rating: 4.9,
    reviewsCount: 160,
    volume: "30 g",
    highlight: "Melts temple pressure & induces deep sleep in minutes",
    resultDays: "Immediate & 2 Days",
    resultTimeline: {
      summary:
        "Immediate nervous system relaxation within 3 minutes; improved sleep cycle and rested glow in 2-3 days.",
      milestones: [
        {
          days: "Immediate (3 min)",
          effect:
            "Calms headache throbbing, dissolves neck tension, and slows racing thoughts.",
        },
        {
          days: "Days 1 - 2",
          effect:
            "Facilitates deeper REM sleep, preventing stress breakouts and dark eye circles.",
        },
        {
          days: "Days 7+",
          effect:
            "Overall reduction in stress-induced facial muscle clenching and jaw tightness.",
        },
      ],
    },
    usageFrequency: "Nightly Before Sleep or Whenever Stressed",
    suitableFor:
      "Anyone experiencing work fatigue, stress headaches or insomnia",
    keyIngredients: [
      "French Lavender Essential Oil",
      "Indian Sandalwood Oil",
      "Camphor Extract",
      "Shea Butter & Beeswax",
    ],
    howToUseSteps: [
      {
        step: 1,
        title: "Warm Balm on Fingertip",
        description:
          "Rub your index fingertip in small circles to melt a small dab of fragrant balm.",
      },
      {
        step: 2,
        title: "Massage Temples & Neck",
        description:
          "Massage into temples, behind the ears, and back of the neck with gentle circular pressure.",
      },
      {
        step: 3,
        title: "Inhale Deeply",
        description:
          "Cup your hands over your nose and take 3 deep belly breaths before closing your eyes for restful sleep.",
      },
    ],
    beauticianTip:
      "Keep on your bedside table. A small dab on pulse points works wonders before meditation or bedtime!",
  },
];

export const TESTIMONIALS = [
  {
    id: "t-1",
    name: "Priyanka Sharma",
    service: "Bridal Makeover & Facial",
    rating: 5,
    comment:
      "Iswari Beautician transformed my look for my wedding day! The glowing facial stayed radiant all week and the makeup was so lightweight and waterproof.",
    date: "2 days ago",
  },
  {
    id: "t-2",
    name: "Sneha Patel",
    service: "VIP Acrylic Nails & Hair Spa",
    rating: 5,
    comment:
      "The nail artistry here is top-notch! The products they suggested for my haircare at home made my hair frizz-free within days.",
    date: "1 week ago",
  },
  {
    id: "t-3",
    name: "Meera Deshmukh",
    service: "Hydra-Infusion Facial Ritual",
    rating: 5,
    comment:
      "Very hygienic, soothing black-lounge aesthetic and the beauticians are true experts. Loved the complimentary consultation!",
    date: "2 weeks ago",
  },
];
