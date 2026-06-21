import { ResortFeature, Accommodation, Testimonial, FAQItem } from './types';

// Import local images
import heroImage from './assets/images/hero-mountain.jpg';
import aboutImage from './assets/images/pine-forest.jpg';
import panoramicLawnImage from './assets/images/panoramic-lawn.jpg';
import diningImage from './assets/images/bespoke-dining.jpg';
import forestTrailsImage from './assets/images/forest-trails.jpg';
import wellnessImage from './assets/images/wellness-spa.jpg';
import superDeluxeImage from './assets/images/super-deluxe-room.jpg';
import familyTwinImage from './assets/images/family-twin-room.jpg';
import premiumVillaImage from './assets/images/premium-villa.jpg';
import avatar1 from './assets/images/avatar-1.jpg';
import avatar2 from './assets/images/avatar-2.jpg';

export const RESORT_INFO = {
  name: "Whispering Pines Resort Mukteshwar",
  tagline: "Quiet wilderness, aromatic mountain breezes, and beautiful Himalayan ridges",
  location: "Malla Ramgarh, Nainital, Uttarakhand, India",
  address: "Mukteshwar Road, Malla Ramgarh, Nainital, Uttarakhand 263137",
  email: "reservations@casadebello.com",
  phone: "+91 8218885881, +91 8553102670",
  description: "Tucked away in the pristine oak and cedar-swathed hills of Malla Ramgarh on the scenic Mukteshwar Road, Whispering Pines Resort is a tranquil alpine sanctuary operating under Casa De Bello management. Formerly known as Clarks Exotica, this reimagined luxury retreat offers premium hospitality at 7,500 feet altitude with breathtaking Nanda Devi Himalayan peak views."
};

export const RESORT_FEATURES: ResortFeature[] = [
  {
    id: "panoramic-lawn",
    icon: "Compass",
    title: "The Panoramic Lawn",
    description: "A gorgeous 2200 sqft green lawn facing the majestic Nanda Devi Himalayan Range. Ideal for dream weddings, sunset cocktails, or scenic dinners.",
    badge: "2200 Sqft Event Space",
    detailedText: "Our expansive premier outdoor scenic lawn looks directly out to the eternal snowy peaks. Whether you are hosting an intimate high-altitude mountain wedding, sunset social cocktails, or romantic dinner experiences, the Panoramic Lawn delivers unmatched views with world-class hospitality.",
    image: panoramicLawnImage
  },
  {
    id: "premium-dining",
    icon: "UtensilsCrossed",
    title: "Bespoke Dining Area",
    description: "Savor premium multi-cuisine options, customizable event catering, and elegant indoor dining spaces managed on-ground.",
    badge: "Exceptional Culinary",
    detailedText: "Let our professional kitchen and hospitality teams manage everything while you focus on relaxation. From customizable event menu options and grand outdoor dinner spreads to cozy indoor café experiences.",
    image: diningImage
  },
  {
    id: "forest-trails",
    icon: "Trees",
    title: "Mountain Pine Forest Trails",
    description: "Venture deep into the tall cedar, oak, and whispering pine groves to truly disconnect from the busy world and reconnect with nature.",
    badge: "Eco-Adventure",
    detailedText: "Located in the pure ecosystem of Malla Ramgarh, our retreat sits in the midst of pristine, whispering mountain forests. Enjoy guided morning hikes, peaceful forest immersion, bird watching, and nature photography experiences.",
    image: forestTrailsImage
  },
  {
    id: "mountain-wellness",
    icon: "Sparkles",
    title: "Himalayan Peak Wellness",
    description: "A refined wellness retreat designed for complete tranquility, high-mountain spa treatments, and peaceful relaxation.",
    badge: "Holistic Health",
    detailedText: "Restore your physical and mental balance through customized wellness treatments. Featuring fresh mountain herbs, soothing natural oils, and peaceful outdoor meditation sessions amidst nature.",
    image: wellnessImage
  }
];

export const ACCOMMODATIONS: Accommodation[] = [
  {
    id: "super-deluxe-room",
    name: "Super Deluxe Room",
    type: "Suite",
    pricePerNight: 6500,
    capacity: 2,
    description: "Elegant, cozy rooms featuring natural wood elements, premium bedding, and warm mountain styling. Absolutely perfect for couples, families, and high-profile corporate delegates.",
    details: [
      "13 Premium fully furnished units available for booking",
      "Plush double bedding with soft premium wool linens and cozy quilts",
      "Full modern bathrooms equipped with premium herbal toiletries",
      "Warm, hospitable designs accommodating up to 26 guests in total"
    ],
    amenities: ["Forest View", "Premium Bedding", "Free Wi-Fi", "Tea/Coffee Maker", "Heavy-Duty Heater", "Modern Geyser"],
    image: superDeluxeImage,
    rating: 4.8,
    views: "Whispering pine tree woods and forest valleys",
    sizeSqFt: 450
  },
  {
    id: "family-twin-room",
    name: "Family Twin Room",
    type: "Suite",
    pricePerNight: 9500,
    capacity: 4,
    description: "Spacious multi-bed suites designed specifically to accommodate families and small groups seeking premium relaxation and unified memories.",
    details: [
      "4 spacious units perfect for couples with children or corporate teammates",
      "Two interconnected high-comfort beds with separate seating alcoves",
      "Expansive windows letting in stunning morning mountain mist",
      "Accommodates up to 16 guests across our 4 tailored family units"
    ],
    amenities: ["Twin Beds", "Living Alcove", "Valley Mist Views", "Televox Entertainment", "Private Balcony", "Premium Host Service"],
    image: familyTwinImage,
    rating: 4.9,
    views: "Panoramic misty valley views from premium high vistas",
    sizeSqFt: 720
  },
  {
    id: "premium-villa-room",
    name: "Premium Villa Rooms",
    type: "Villa",
    pricePerNight: 14500,
    capacity: 6,
    description: "Our ultimate, ultra-luxurious private spaces. Features timber cathedral ceilings, expansive viewing decks, and panoramic Himalayan vistas.",
    details: [
      "5 highly independent multi-room villa units for maximum isolation",
      "Beautiful multi-level independent glass structure with premium rooms",
      "Large glass windows with pristine sights of the Nanda Devi snowy peaks",
      "Accommodates up to 30 guests comfortably across 5 elite premium villas"
    ],
    amenities: ["360° Mountain Views", "Deck Terrace", "Coffee Machine", "Stone Fireplace Vibe", "Dedicated Concierge", "Elite Furnishings"],
    image: premiumVillaImage,
    rating: 5.0,
    views: "Unprecedented snow-capped Himalayan Nanda Devi peak visibility",
    sizeSqFt: 1350
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Aarav & Meera Sen",
    role: "Delhi Travelers",
    quote: "A stunning escape from the city heat. Sitting by the stone fireplace in our Pine Vista cottage, sipping hot local masala chai as the temperature hit single digits, felt magical.",
    rating: 5,
    avatar: avatar1
  },
  {
    id: "2",
    name: "Rajesh K. Mehta",
    role: "Aviation Analyst & Photographer",
    quote: "The snow-peak visibility from the Nanda Devi attic in early morning is unbelievable. Capturing the golden sun hitting the Himalayas, combined with their incredible Kumaoni pahadi food was the perfect trip.",
    rating: 5,
    avatar: avatar2
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "q1",
    category: "Arrival",
    question: "How do I reach Whispering Pines from Delhi?",
    answer: "Whispering Pines is roughly an 8-hour drive from Delhi. Alternatively, you can take the Kathgodam Shatabdi Express train to Kathgodam Railway Station, which is only a 2.5-hour mountain drive to our resort."
  },
  {
    id: "q2",
    category: "Policies",
    question: "Do you offer heating in all cottages?",
    answer: "Yes. Given the crisp high-mountain winters in Mukteshwar, all our rooms and suites are equipped with state-of-the-art heavy-duty heaters. Our premium cottages also feature rustic wood-burning fireplaces."
  },
  {
    id: "q3",
    category: "Activities",
    question: "Are your foods and ingredients fully organic?",
    answer: "Almost entirely! We cooperate with local Kumaoni cooperative farms in Ramgarh and harvest directly from our own resort plum, peach, and apple orchards. All spices are stone-ground on-site."
  }
];
