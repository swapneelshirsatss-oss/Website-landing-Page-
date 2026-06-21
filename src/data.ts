import { ResortFeature, Accommodation, Testimonial, FAQItem } from './types';

export const RESORT_INFO = {
  name: "Vista Del Mar Resort",
  tagline: "Where dramatic cliffs meet the calm, whispering ocean",
  location: "Amalfi Coast, Italy",
  address: "Via Cristoforo Colombo, 12, 84017 Positano SA, Italy",
  email: "reservations@vistadelmar.com",
  phone: "+39 089 123 4567",
  description: "Nestled between dramatic, sun-drenched Italian cliffs and the azure Mediterranean waters, Vista Del Mar is a sanctuary of refined elegance. Experience ultimate luxury with private crystal-clear beach access, Michelin-starred culinary artistry, and world-class holistic wellness.",
};

export const RESORT_FEATURES: ResortFeature[] = [
  {
    id: "beach-club",
    icon: "Umbrella",
    title: "Private Beach & Cove",
    description: "Exclusive access to the pristine, white sands of Vista Cove with fully-attended cabanas, custom craft cocktails, and high-speed tender boat services.",
    badge: "Exclusive",
    detailedText: "Our private cove is reserved strictly for resort guests. Fully attended by our ocean concierge staff, each booking includes a dedicated shaded beach-front daybed, fresh towel services, complimentary cold-pressed juices, and an exclusive beachside dining menu.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "wellness-spa",
    icon: "Sparkles",
    title: "Holistic Wellness Spa",
    description: "Rejuvenate your body and spirit at Elysium Spa. Offering therapeutic volcanic mud wraps, deep ocean mineral salt infusions, and open-air yoga pavillions.",
    badge: "Award Winning",
    detailedText: "Elysium Spa integrates local Mediterranean ingredients like Positano lemons, volcanic salts, and freshly harvested olive extract with advanced therapeutic techniques. Our facilities feature a salt-cascade thermal steam bath, indoor heated mineral pools, and five clifftop private therapy suites.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "dining",
    icon: "UtensilsCrossed",
    title: "Michelin-Starred Gastronomy",
    description: "Savor gourmet cuisine, curated daily by world-renowned chefs, using fresh organic ingredients sourced from our clifftop gardens and daily local sea harvest.",
    badge: "Terrazza 2-Star",
    detailedText: "Terrazza Vista, our signature 2-Michelin-star open-air restaurant, offers a multisensory dining experience with 180-degree panoramic views of Positano. Savor handmade pasta infused with freshly caught seafood, paired with rare vintage wines curated by our master sommelier.",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "infinity-pool",
    icon: "Waves",
    title: "Heated Clifftop Infinity Pool",
    description: "A breathtaking infinity pool seeming to flow directly into the Mediterranean, framed by lemon groves, premium sunbeds, and custom-tuned underwater audio.",
    badge: "Iconic View",
    detailedText: "Seeming to dissolve directly into the sea below, our clifftop infinity pool is kept at an optimal 28°C (82°F) year-round. It features submerged relaxation loungers, soft custom underwater soundscapes, and an surrounding terrace lined with aromatic lemon and jasmine walls.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
  }
];

export const ACCOMMODATIONS: Accommodation[] = [
  {
    id: "superior-suite",
    name: "Classic Mediterranean Suite",
    type: "Suite",
    pricePerNight: 450,
    capacity: 2,
    description: "Decorated with hand-painted tiles and exquisite Italian fabrics, boasting custom antique furniture and private sea-view balconies.",
    details: [
      "Plush King-size bedding with Frette linen",
      "Spacious marble bathroom with walk-in rainforest shower",
      "Private balcony with Positano town views and bistro table",
      "State-of-the-art Bang & Olufsen sound system"
    ],
    amenities: ["Ocean View", "Balcony", "Free Wi-Fi", "Minibar", "Espresso Maker", "Air Conditioning"],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    views: "Panoramic sea and town landscape",
    sizeSqFt: 620
  },
  {
    id: "cliff-villa",
    name: "Obsidian Clifftop Villa",
    type: "Villa",
    pricePerNight: 950,
    capacity: 4,
    description: "Perched high on the volcanic cliffs, this expansive multiroom villa offers a private plunge-pool, lush gardens, and 24/7 dedicated butler service.",
    details: [
      "Two master bedrooms with private en-suite limestone bathrooms",
      "Private heated plunge pool and clifftop sunbathing deck",
      "Expansive outdoor dining pavilion and private kitchen",
      "Dedicated 24/7 private resort butler service"
    ],
    amenities: ["Private Pool", "2 Bedrooms", "Butler Service", "Living Area", "VIP Lounge Access", "Garden"],
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    views: "180° uninterrupted sunset ocean view",
    sizeSqFt: 1450
  },
  {
    id: "belvedere-penthouse",
    name: "The Belvedere Presidential Penthouse",
    type: "Penthouse",
    pricePerNight: 1600,
    capacity: 6,
    description: "The crown jewel of our resort. Encompasses the entire top-floor mansion with vault ceilings, private spa facilities, and unmatched luxury decor.",
    details: [
      "Three state-rooms with individual luxury terraces",
      "Wraparound clifftop terrace with private hot-tub spa",
      "Private walk-in wine cellar premium selection",
      "Direct secure elevator entrance and complimentary private airport transport"
    ],
    amenities: ["Wraparound Terrace", "Private Hot Tub", "Chef Kitchen", "Private Elevator", "3 Bedrooms", "Wine Cellar"],
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    views: "Absolute highest point panoramic vistas of sea, town, and cliffs",
    sizeSqFt: 2100
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Isabella & Thomas Vance",
    role: "Honeymooners, United Kingdom",
    quote: "Positively celestial. Having morning espresso on the terrace overlooking the Positano cliffs was a cinematic dream. The butler service anticipated things before we even thought of them.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=82"
  },
  {
    id: "2",
    name: "Dr. Alistair Chen",
    role: "Connoisseur & Executive Traveller",
    quote: "The gastronomy alone is worth the flight. Michelin-starred Terrazza Vista serves some of the most intricate organic seafood I have ever tasted in Europe. This is now my annual escape.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=82"
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "q1",
    category: "Arrival",
    question: "Do you offer airport transfer services?",
    answer: "Yes, we specialize in high-comfort arrivals. We offer private chauffeur transport from Naples International Airport (NAP) and executive boat shuttles from Salerno. Guests booking the luxury penthouse receive complimentary round-trip transfers."
  },
  {
    id: "q2",
    category: "Policies",
    question: "What is your validation check-in / check-out times?",
    answer: "Standard check-in begins at 3:00 PM (15:00), and check-out is requested by 12:00 PM. We accommodate early check-ins and late departures on request, subject to suite availability."
  },
  {
    id: "q3",
    category: "Activities",
    question: "Can you assist in chartering private yachts?",
    answer: "Absolutely. Our guest experience hosts can charter the resort's private Rivarama boat or organize luxury yachts of any size for day tours to Capri, Amalfi, or private sunset excursions complete with custom onboard culinary service."
  }
];
