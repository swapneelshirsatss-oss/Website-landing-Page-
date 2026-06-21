/**
 * Types for the Resort Landing Page
 */

export interface ResortFeature {
  id: string;
  icon: string; // lucide icon name
  title: string;
  description: string;
  badge?: string;
  detailedText: string;
  image: string;
}

export interface Accommodation {
  id: string;
  name: string;
  type: 'Villa' | 'Suite' | 'Penthouse';
  pricePerNight: number;
  capacity: number; // max guest count
  description: string;
  details: string[];
  amenities: string[];
  image: string;
  rating: number;
  views: string;
  sizeSqFt: number;
}

export interface BookingDetails {
  checkIn: string;
  checkOut: string;
  guests: number;
  accommodationId: string;
  fullName: string;
  email: string;
  phone: string;
  specialRequests: string;
  promoCode?: string;
  totalCost?: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatar: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

