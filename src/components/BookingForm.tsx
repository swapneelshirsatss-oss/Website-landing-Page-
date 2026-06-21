import React, { useState, useEffect } from "react";
import { ACCOMMODATIONS } from "../data";
import { 
  Calendar, Users, MessageSquare, Sparkles, 
  Clock, ShieldCheck, MapPin, ExternalLink
} from "lucide-react";
import { motion } from "motion/react";

interface BookingFormProps {
  preSelectedSuiteId: string | null;
  onBookingSuccess?: () => void;
}

export default function BookingForm({ preSelectedSuiteId }: BookingFormProps) {
  const [accommodationId, setAccommodationId] = useState<string>(ACCOMMODATIONS[0].id);
  const [checkIn, setCheckIn] = useState<string>("2026-06-21");
  const [checkOut, setCheckOut] = useState<string>("2026-06-25");
  const [guests, setGuests] = useState<number>(2);

  // Sync pre-selected suite when clicked from another component
  useEffect(() => {
    if (preSelectedSuiteId) {
      setAccommodationId(preSelectedSuiteId);
    }
  }, [preSelectedSuiteId]);

  const selectedRoom = ACCOMMODATIONS.find((a) => a.id === accommodationId) || ACCOMMODATIONS[0];

  // Calculate nights
  const getNightsCount = () => {
    try {
      const d1 = new Date(checkIn);
      const d2 = new Date(checkOut);
      const diffTime = d2.getTime() - d1.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return isNaN(diffDays) || diffDays <= 0 ? 1 : diffDays;
    } catch {
      return 4;
    }
  };

  const nights = getNightsCount();
  const estimatedTotal = selectedRoom.pricePerNight * nights;

  // Generate dynamic WhatsApp link
  const getWhatsAppLink = () => {
    const formattedMessage = `Hello Whispering Pines Resort (by Casa De Bello), I would like to enquire about a stay:
• Room Selected: ${selectedRoom.name}
• Check-in Date: ${checkIn}
• Check-out Date: ${checkOut}
• Duration of Stay: ${nights} Night${nights > 1 ? "s" : ""}
• Occupancy: ${guests} Guest${guests > 1 ? "s" : ""}

Kindly share current availability and booking details. Thank you!`;

    return `https://wa.me/917505029696?text=${encodeURIComponent(formattedMessage)}`;
  };

  return (
    <section id="booking-section" className="py-24 bg-stone-50 border-t border-stone-200 scroll-mt-10">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-[10px] md:text-xs tracking-widest uppercase font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full inline-block mb-4">
            Bespoke Stays
          </span>
          <h2 className="font-serif text-3xl md:text-5xl tracking-tight text-stone-950 font-medium mb-4">
            Secure Your Himalayan Retreat
          </h2>
          <p className="text-stone-600 font-sans max-w-xl mx-auto leading-relaxed text-sm md:text-base">
            Skip the automated checkouts. Coordinate directly with our property host via WhatsApp for custom bookings, tailored discounts, special activities, and seamless arrivals.
          </p>
        </div>

        {/* Dynamic Card Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Selectors Panel */}
          <div className="lg:col-span-7 bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-stone-150">
            <h3 className="font-serif text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              Customize Your Booking Package
            </h3>

            <div className="space-y-6">
              {/* Accommodation Dropdown */}
              <div>
                <label htmlFor="accommodation-select" className="block text-xs uppercase tracking-wider text-stone-500 font-bold mb-2">
                  Select Room or Cottage
                </label>
                <div className="relative">
                  <select
                    id="accommodation-select"
                    value={accommodationId}
                    onChange={(e) => setAccommodationId(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg py-3 px-4 text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-amber-500 appearance-none font-medium cursor-pointer"
                  >
                    {ACCOMMODATIONS.map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-stone-500">
                    ▼
                  </div>
                </div>
              </div>

              {/* Dates Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="check-in-date" className="block text-xs uppercase tracking-wider text-stone-500 font-bold mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    Check-In Date
                  </label>
                  <input
                    id="check-in-date"
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg py-2.5 px-3.5 text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-amber-500 cursor-pointer font-sans"
                  />
                </div>

                <div>
                  <label htmlFor="check-out-date" className="block text-xs uppercase tracking-wider text-stone-500 font-bold mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    Check-Out Date
                  </label>
                  <input
                    id="check-out-date"
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg py-2.5 px-3.5 text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-amber-500 cursor-pointer font-sans"
                  />
                </div>
              </div>

              {/* Guests Selector */}
              <div>
                <label htmlFor="guests-select" className="block text-xs uppercase tracking-wider text-stone-500 font-bold mb-2 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-stone-400" />
                  Total Guests
                </label>
                <div className="relative">
                  <select
                    id="guests-select"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg py-3 px-4 text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-amber-500 appearance-none font-medium cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} Adult{num > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-stone-500">
                    ▼
                  </div>
                </div>
              </div>

              {/* Stay Itinerary Summary Preview */}
              <div className="bg-stone-50 rounded-xl p-5 border border-stone-200/60 mt-6">
                <div className="flex justify-between items-center pb-3 border-b border-stone-200">
                  <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold">Your Selected Unit</span>
                  <span className="text-stone-900 font-bold">{selectedRoom.name}</span>
                </div>
                <div className="flex justify-between items-center pt-3">
                  <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold">Duration of Stay</span>
                  <span className="text-stone-950 font-semibold">{nights} Night{nights > 1 ? "s" : ""} &bull; {guests} Guest{guests > 1 ? "s" : ""}</span>
                </div>
              </div>

              {/* Direct Booking Link Button */}
              <div className="pt-4">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3 text-center text-sm md:text-base border border-emerald-500 hover:scale-[1.01]"
                >
                  <MessageSquare className="w-5 h-5 fill-white text-emerald-600" />
                  Request Booking via WhatsApp Inquiry
                  <ExternalLink className="w-4 h-4 ml-1 opacity-70" />
                </a>
                <p className="text-center text-[11px] text-stone-500 mt-3 font-sans">
                  Enquiry redirects safely to WhatsApp Business chat for real-time validation. Response guaranteed within 10 minutes.
                </p>
              </div>

            </div>
          </div>

          {/* Quick Guide & Highlight Details Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Host info card */}
            <div className="bg-stone-900 text-stone-100 p-6 md:p-8 rounded-2xl border border-stone-800 shadow-md">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg">Why WhatsApp Booking?</h4>
                  <p className="text-xs text-amber-200">Fast · Personalized · Guaranteed Rates</p>
                </div>
              </div>

              <ul className="space-y-4 text-xs md:text-sm text-stone-300 font-sans">
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Zero hidden platform fees:</strong> Book directly with property managers for exclusive local tax-saving rates.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Custom request confirmations:</strong> Instantly check room heater setups, bonfire slots, or request high-mountain valley pickups.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Flexible alterations:</strong> Easy rescheduling & cancellation directly through our personal service manager.</span>
                </li>
              </ul>
            </div>

            {/* Quick Location info card */}
            <div className="bg-white p-6 rounded-2xl border border-stone-150 shadow-sm">
              <h4 className="font-serif font-bold text-stone-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-700" />
                Resort Quick Contact
              </h4>
              <div className="space-y-3 font-sans text-xs text-stone-600">
                <p><strong>Property Location:</strong> Malla Ramgarh, Bhowali-Ramgarh-Mukteshwar Road, Uttarakhand, India</p>
                <p><strong>Hotlines:</strong> +91 8218885881, +91 8553102670</p>
                <p><strong>WhatsApp Support:</strong> +91 7505029696</p>
                <p><strong>Checkout / Check-in:</strong> Check-In 14:00 onwards | Check-Out before 11:00 AM</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
