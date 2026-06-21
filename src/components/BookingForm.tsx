import React, { useState, useEffect, useRef } from "react";
import { ACCOMMODATIONS } from "../data";
import { BookingDetails } from "../types";
import { 
  Calendar, Check, User, Mail, Phone, MessageSquare, 
  Tag, CreditCard, ChevronRight, CheckCircle2, Award, 
  MapPin, Clock, CalendarCheck, ShieldAlert 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface BookingFormProps {
  preSelectedSuiteId: string | null;
  onBookingSuccess: () => void;
}

interface CustomOption {
  id: string;
  name: string;
  price: number;
  description: string;
}

const PREMIUM_OPTIONS: CustomOption[] = [
  { id: "airport-shuttle", name: "Private Airport Heli-Shuttle", price: 250, description: "VIP direct transfers from Naples Airport" },
  { id: "spa-massage", name: "Therapeutic Clifftop Massage", price: 120, description: "60-minute relaxing session at Elysium Spa" },
  { id: "sunset-dinner", name: "Sunset Romantic Candlelit Dinner", price: 180, description: "Michelin private table on clifftop deck" }
];

export default function BookingForm({ preSelectedSuiteId, onBookingSuccess }: BookingFormProps) {
  const [formData, setFormData] = useState<BookingDetails>({
    checkIn: "2026-06-21",
    checkOut: "2026-06-25",
    guests: 2,
    accommodationId: ACCOMMODATIONS[0].id,
    fullName: "",
    email: "",
    phone: "",
    specialRequests: "",
    promoCode: ""
  });

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [promoApplied, setPromoApplied] = useState<{ code: string; discount: number } | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmationCode, setConfirmationCode] = useState<string>("");

  const formSectionRef = useRef<HTMLDivElement>(null);

  // Sync pre-selected suite
  useEffect(() => {
    if (preSelectedSuiteId) {
      setFormData((prev) => ({
        ...prev,
        accommodationId: preSelectedSuiteId
      }));
      // Automatically adjust guest count if the newly selected room has capacity restrictions
      const room = ACCOMMODATIONS.find(a => a.id === preSelectedSuiteId);
      if (room && formData.guests > room.capacity) {
        setFormData(prev => ({ ...prev, guests: room.capacity }));
      }
    }
  }, [preSelectedSuiteId]);

  const selectedRoom = ACCOMMODATIONS.find(r => r.id === formData.accommodationId) || ACCOMMODATIONS[0];

  // Calculations
  const dateDiffInNights = (inDateStr: string, outDateStr: string): number => {
    const start = new Date(inDateStr);
    const end = new Date(outDateStr);
    const diffTime = end.getTime() - start.getTime();
    if (diffTime <= 0) return 0;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = dateDiffInNights(formData.checkIn, formData.checkOut);
  const baseCost = selectedRoom.pricePerNight * nights;

  // Premium extras sum
  const extrasCost = PREMIUM_OPTIONS
    .filter(opt => selectedOptions.includes(opt.id))
    .reduce((acc, opt) => acc + opt.price, 0);

  // Discount
  const discountAmount = promoApplied ? Math.round(baseCost * (promoApplied.discount / 100)) : 0;
  const totalCost = Math.max(0, baseCost + extrasCost - discountAmount);

  // Handle option select
  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions(prev => 
      prev.includes(optionId) ? prev.filter(id => id !== optionId) : [...prev, optionId]
    );
  };

  // Promo Engine
  const applyPromoCode = () => {
    const code = formData.promoCode?.trim().toUpperCase();
    if (!code) return;

    if (code === "VISTA10") {
      setPromoApplied({ code: "VISTA10", discount: 10 });
      setPromoError(null);
    } else if (code === "AMALFI20") {
      setPromoApplied({ code: "AMALFI20", discount: 20 });
      setPromoError(null);
    } else {
      setPromoError("Invalid promo code. Try VISTA10 or AMALFI20");
      setPromoApplied(null);
    }
  };

  const removePromoCode = () => {
    setPromoApplied(null);
    setPromoError(null);
    setFormData(prev => ({ ...prev, promoCode: "" }));
  };

  // Submit Handler
  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Validation
    if (nights <= 0) {
      setValidationError("Check-Out date must be at least one day after Check-In date.");
      return;
    }

    if (formData.guests > selectedRoom.capacity) {
      setValidationError(`The ${selectedRoom.name} can accommodate up to ${selectedRoom.capacity} guests. Please adjust guests count.`);
      return;
    }

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setValidationError("Please fill in your primary contact info (Name, Email, Phone).");
      return;
    }

    // Process Submit
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      // Generate a simulated VIP Confirmation Code
      const randNum = Math.floor(1000 + Math.random() * 9000);
      setConfirmationCode(`VDM-2026-${randNum}`);
      setBookingConfirmed(true);
      onBookingSuccess();
    }, 1500);
  };

  const handleRestart = () => {
    setBookingConfirmed(false);
    setFormData({
      checkIn: "2026-06-21",
      checkOut: "2026-06-25",
      guests: 2,
      accommodationId: ACCOMMODATIONS[0].id,
      fullName: "",
      email: "",
      phone: "",
      specialRequests: "",
      promoCode: ""
    });
    setSelectedOptions([]);
    setPromoApplied(null);
    setValidationError(null);
  };

  return (
    <section id="booking-section" ref={formSectionRef} className="py-24 bg-stone-900 text-stone-100 relative">
      {/* Dynamic Background decor items */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-stone-100 to-transparent opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
        <AnimatePresence mode="wait">
          {!bookingConfirmed ? (
            <motion.div
              id="booking-unconfirmed-layout"
              key="booking-form-box"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12"
            >
              {/* Left Column: Form Details (8 Columns on Large) */}
              <div className="lg:col-span-7">
                <span className="text-xs uppercase tracking-widest font-semibold text-amber-500 block mb-3">
                  Tailored Booking
                </span>
                <h2 className="font-serif text-3xl md:text-5xl text-white tracking-tight leading-none mb-6">
                  Design Your Escape
                </h2>
                <p className="text-stone-400 text-sm leading-relaxed mb-10 max-w-xl">
                  Take the first step toward sun-soaked cliffs and Michelin-starred leisure. Let us organize a bespoke stay suited exactly to your preference.
                </p>

                {/* Validation Error Banner */}
                {validationError && (
                  <div className="bg-rose-950/50 border border-rose-800 text-rose-300 p-4 rounded-xl mb-8 flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" />
                    <div className="text-xs font-semibold">{validationError}</div>
                  </div>
                )}

                <form id="resort-booking-form" onSubmit={handleReservationSubmit} className="space-y-6">
                  {/* Step 1: Accommodation & Dates */}
                  <div className="bg-stone-800/40 border border-stone-800 p-6 rounded-2xl space-y-6">
                    <h3 className="font-serif text-lg text-amber-500 flex items-center gap-2 mb-2">
                      <span className="text-xs bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-full font-sans">1</span>
                      Suite & Schedule
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Accommodation Choice */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-stone-400 uppercase tracking-wider font-semibold">
                          Choose Suite or Villa
                        </label>
                        <select
                          id="form-accommodation-select"
                          value={formData.accommodationId}
                          onChange={(e) => setFormData({ ...formData, accommodationId: e.target.value })}
                          className="bg-stone-900 border border-stone-700 rounded-xl p-3 text-sm focus:outline-hidden focus:border-amber-500 hover:border-stone-600 transition-colors cursor-pointer text-stone-200"
                        >
                          {ACCOMMODATIONS.map((room) => (
                            <option key={room.id} value={room.id}>
                              {room.name} (€{room.pricePerNight}/Night)
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Guest Count Selector */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-stone-400 uppercase tracking-wider font-semibold flex justify-between">
                          <span>Number of Guests</span>
                          <span className="text-stone-500">Max {selectedRoom.capacity}</span>
                        </label>
                        <div className="flex items-center bg-stone-900 border border-stone-700 rounded-xl p-1.5">
                          <button
                            id="guest-count-decrement"
                            type="button"
                            onClick={() => setFormData({ ...formData, guests: Math.max(1, formData.guests - 1) })}
                            className="w-10 h-10 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 font-bold"
                          >
                            -
                          </button>
                          <span className="flex-1 text-center text-sm font-semibold text-stone-200">
                            {formData.guests} Guest{formData.guests > 1 ? "s" : ""}
                          </span>
                          <button
                            id="guest-count-increment"
                            type="button"
                            onClick={() => setFormData({ ...formData, guests: Math.min(selectedRoom.capacity, formData.guests + 1) })}
                            className="w-10 h-10 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Check In / Out Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-stone-400 uppercase tracking-wider font-semibold">
                          Arrival Check-In
                        </label>
                        <div className="relative">
                          <input
                            id="form-checkin-date"
                            type="date"
                            value={formData.checkIn}
                            min="2026-06-20"
                            onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                            className="w-full bg-stone-900 border border-stone-700 rounded-xl p-3 pl-10 text-sm focus:outline-hidden focus:border-amber-500 hover:border-stone-600 transition-colors text-white"
                          />
                          <Calendar className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-stone-400 uppercase tracking-wider font-semibold">
                          Departure Check-Out
                        </label>
                        <div className="relative">
                          <input
                            id="form-checkout-date"
                            type="date"
                            value={formData.checkOut}
                            min={formData.checkIn}
                            onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                            className="w-full bg-stone-900 border border-stone-700 rounded-xl p-3 pl-10 text-sm focus:outline-hidden focus:border-amber-500 hover:border-stone-600 transition-colors text-white"
                          />
                          <Calendar className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Custom Experiences / Add-ons */}
                  <div className="bg-stone-800/40 border border-stone-800 p-6 rounded-2xl space-y-4">
                    <h3 className="font-serif text-lg text-amber-500 flex items-center gap-2 mb-2">
                      <span className="text-xs bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-full font-sans">2</span>
                      Enhance Your Experience
                    </h3>

                    <div className="grid grid-cols-1 gap-3">
                      {PREMIUM_OPTIONS.map((opt) => {
                        const isChecked = selectedOptions.includes(opt.id);
                        return (
                          <div
                            id={`addon-card-${opt.id}`}
                            key={opt.id}
                            onClick={() => handleOptionToggle(opt.id)}
                            className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${
                              isChecked
                                ? "bg-amber-950/10 border-amber-500/40 text-white"
                                : "bg-stone-900/60 border-stone-800 text-stone-300 hover:border-stone-700"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`mt-1 p-0.5 rounded-sm border ${isChecked ? "bg-amber-500 border-amber-500 text-stone-950" : "border-stone-600 text-transparent"}`}>
                                <Check className="w-3.5 h-3.5 stroke-[3px]" />
                              </div>
                              <div>
                                <span className="text-xs uppercase font-bold tracking-wider font-sans text-stone-200">
                                  {opt.name}
                                </span>
                                <p className="text-[11px] text-stone-400 font-sans mt-0.5">
                                  {opt.description}
                                </p>
                              </div>
                            </div>
                            <span className="text-xs font-semibold text-amber-400 font-serif whitespace-nowrap ml-4">
                              +€{opt.price}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 3: Contact Info */}
                  <div className="bg-stone-800/40 border border-stone-800 p-6 rounded-2xl space-y-4">
                    <h3 className="font-serif text-lg text-amber-500 flex items-center gap-2 mb-2">
                      <span className="text-xs bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-full font-sans">3</span>
                      VIP Guest Information
                    </h3>

                    <div className="grid grid-cols-1 gap-4">
                      {/* Name / Email row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-stone-400 uppercase tracking-wider font-semibold">
                            Full Name
                          </label>
                          <div className="relative">
                            <input
                              id="form-fullname"
                              type="text"
                              required
                              placeholder="e.g. Dr. Alistair Chen"
                              value={formData.fullName}
                              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                              className="w-full bg-stone-900 border border-stone-700 rounded-xl p-3 pl-10 text-sm focus:outline-hidden focus:border-amber-500 hover:border-stone-600 transition-colors text-white placeholder-stone-600"
                            />
                            <User className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-stone-400 uppercase tracking-wider font-semibold">
                            Email Address
                          </label>
                          <div className="relative">
                            <input
                              id="form-email"
                              type="email"
                              required
                              placeholder="e.g. alistair@chencorp.com"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full bg-stone-900 border border-stone-700 rounded-xl p-3 pl-10 text-sm focus:outline-hidden focus:border-amber-500 hover:border-stone-600 transition-colors text-white placeholder-stone-600"
                            />
                            <Mail className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
                          </div>
                        </div>
                      </div>

                      {/* Phone / Promos row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-stone-400 uppercase tracking-wider font-semibold">
                            Phone Number
                          </label>
                          <div className="relative">
                            <input
                              id="form-phone"
                              type="tel"
                              required
                              placeholder="+1 (555) 0192-384"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full bg-stone-900 border border-stone-700 rounded-xl p-3 pl-10 text-sm focus:outline-hidden focus:border-amber-500 hover:border-stone-600 transition-colors text-white placeholder-stone-600"
                            />
                            <Phone className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-stone-400 uppercase tracking-wider font-semibold flex justify-between">
                            <span>Promo Code</span>
                            <span className="text-[10px] text-amber-500 normal-case font-bold">Try: AMALFI20</span>
                          </label>
                          <div className="flex gap-2">
                            <div className="relative flex-1">
                              <input
                                id="form-promocode"
                                type="text"
                                placeholder="Enter code"
                                value={formData.promoCode}
                                onChange={(e) => setFormData({ ...formData, promoCode: e.target.value })}
                                className="w-full bg-stone-900 border border-stone-700 rounded-xl p-3 pl-10 text-sm focus:outline-hidden focus:border-amber-500 hover:border-stone-600 transition-colors text-white uppercase placeholder-stone-600"
                                disabled={!!promoApplied}
                              />
                              <Tag className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
                            </div>
                            {promoApplied ? (
                              <button
                                id="btn-remove-promo"
                                type="button"
                                onClick={removePromoCode}
                                className="px-4 py-3 bg-rose-950/40 hover:bg-rose-900 text-rose-300 text-xs uppercase tracking-wider font-bold rounded-xl border border-rose-800 transition-colors"
                              >
                                Clear
                              </button>
                            ) : (
                              <button
                                id="btn-apply-promo"
                                type="button"
                                onClick={applyPromoCode}
                                className="px-4 py-3 bg-stone-800 hover:bg-amber-600 hover:text-stone-950 text-stone-300 text-xs uppercase tracking-wider font-bold rounded-xl border border-stone-700 transition-all cursor-pointer"
                              >
                                Apply
                              </button>
                            )}
                          </div>
                          {promoError && (
                            <span className="text-[10px] text-rose-400 font-semibold">{promoError}</span>
                          )}
                          {promoApplied && (
                            <span className="text-[10px] text-emerald-400 font-semibold">
                              Succesfully Applied: {promoApplied.code} ({promoApplied.discount}% Off Base Room rate)
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Special Requests */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-stone-400 uppercase tracking-wider font-semibold">
                          Special Dietary / Room Requests
                        </label>
                        <div className="relative">
                          <textarea
                            id="form-special-requests"
                            rows={3}
                            placeholder="Please let us know of any food allergies, private deck dining requests, or bed modifications."
                            value={formData.specialRequests}
                            onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                            className="w-full bg-stone-900 border border-stone-700 rounded-xl p-3 pl-10 text-sm focus:outline-hidden focus:border-amber-500 hover:border-stone-600 transition-colors text-white placeholder-stone-600 resize-none"
                          />
                          <MessageSquare className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submission Button */}
                  <button
                    id="submit-booking-form-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-amber-600 hover:bg-amber-500 text-stone-950 rounded-full font-sans text-xs uppercase tracking-widest font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing VIP Order...</span>
                      </>
                    ) : (
                      <>
                        <span>Authorize Safe Reservation</span>
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Right Column: Live Bill / Invoice Summary Panel (5 Columns on Large) */}
              <div className="lg:col-span-5">
                <div className="bg-stone-800/60 border border-stone-800 rounded-2xl p-6 lg:p-8 space-y-6 sticky top-28 backdrop-blur-xs">
                  <div className="border-b border-stone-700 pb-4">
                    <h3 className="font-serif text-xl text-white">Reservation Summary</h3>
                    <p className="text-stone-400 text-xs">Live luxury cost calculator</p>
                  </div>

                  {/* Image & Selected suite mini block */}
                  <div className="flex gap-4 items-center">
                    <img
                      src={selectedRoom.image}
                      alt={selectedRoom.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-lg object-cover border border-stone-750"
                    />
                    <div>
                      <span className="text-[10px] uppercase bg-amber-500/10 text-amber-500 font-bold tracking-widest px-2 py-0.5 rounded-sm">
                        {selectedRoom.type} Selection
                      </span>
                      <h4 className="font-serif text-sm text-stone-200 mt-1">{selectedRoom.name}</h4>
                      <p className="text-stone-400 text-xs font-serif font-semibold mt-0.5">
                        €{selectedRoom.pricePerNight} / Night
                      </p>
                    </div>
                  </div>

                  {/* Calculations breakdown */}
                  <div className="space-y-3.5 text-xs border-b border-stone-700 pb-6">
                    <div className="flex justify-between items-center text-stone-400">
                      <span>Rate Type</span>
                      <span className="text-stone-200">Exclusive Coastal Fully-Refined</span>
                    </div>

                    <div className="flex justify-between items-center text-stone-400">
                      <span>Stay Duration</span>
                      <span className="font-semibold text-stone-200">
                        {nights > 0 ? `${nights} Luxury Night${nights > 1 ? "s" : ""}` : "0 Nights (Pick dates)"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-stone-400">
                      <span>Guests Allocated</span>
                      <span className="text-stone-200">{formData.guests} Guest{formData.guests > 1 ? "s" : ""}</span>
                    </div>

                    {/* Cost row */}
                    <div className="flex justify-between items-center text-stone-300 pt-3 border-t border-stone-750/50">
                      <span>Base Room Rate</span>
                      <span className="font-mono font-bold">€{baseCost}</span>
                    </div>

                    {/* Options sum row */}
                    {extrasCost > 0 && (
                      <div className="flex justify-between items-center text-amber-400">
                        <span>Bespoke Extras Addons</span>
                        <span className="font-mono">+€{extrasCost}</span>
                      </div>
                    )}

                    {/* discount row */}
                    {discountAmount > 0 && (
                      <div className="flex justify-between items-center text-emerald-400">
                        <span>Resort Discount ({promoApplied?.code})</span>
                        <span className="font-mono">-€{discountAmount}</span>
                      </div>
                    )}
                  </div>

                  {/* Total calculation row */}
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block">
                        Estimated Total
                      </span>
                      <span className="text-xs text-stone-500 leading-none">Includes local taxes & service charges</span>
                    </div>
                    <span className="font-serif text-3xl font-extrabold text-amber-500">
                      €{totalCost}
                    </span>
                  </div>

                  {/* Trust indicator */}
                  <div className="bg-stone-900/60 p-4 border border-stone-750 rounded-xl text-[11px] text-stone-400 flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Secure Confirmation Guarantee:</strong> No credit card deposit is charged online. Pay comfortably upon your personal arrival.
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Confirm Display - Receipt booklets */
            <motion.div
              id="booking-confirmed-display"
              key="confirmation-voucher"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="max-w-xl mx-auto bg-stone-50 text-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-stone-200/80"
            >
              {/* Header Box (Success details) */}
              <div className="bg-amber-900 text-white p-8 text-center relative">
                {/* Backdrop design items */}
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-950 to-transparent opacity-60"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
                    <CheckCircle2 className="w-8 h-8 text-amber-400" />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-amber-200 font-bold mb-2 block">
                    Luxury Voucher Secured
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-tight">
                    Welcome to Vista Del Mar
                  </h3>
                  <p className="text-xs text-amber-200/80 mt-1">
                    Your luxury reservation is confirmed. See you in Positano!
                  </p>
                </div>
              </div>

              {/* Booking Voucher Receipt Panel */}
              <div className="p-6 md:p-8 font-sans space-y-6">
                
                {/* Confirmation Code Indicator */}
                <div className="border border-amber-300 bg-amber-50 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-amber-900 font-bold">Confirmation Reference</span>
                    <div className="text-base font-mono font-bold text-amber-950 mt-0.5">{confirmationCode}</div>
                  </div>
                  <div className="px-3 py-1.5 rounded-md bg-stone-900 text-white text-[11px] font-semibold tracking-wider uppercase">
                    Active VIP
                  </div>
                </div>

                {/* Grid details */}
                <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-xs border-b border-stone-200 pb-6">
                  <div>
                    <span className="text-stone-400 uppercase font-bold text-[9px] tracking-wider block">Lead Guest</span>
                    <span className="font-medium text-stone-900 text-sm mt-0.5 block">{formData.fullName}</span>
                  </div>

                  <div>
                    <span className="text-stone-400 uppercase font-bold text-[9px] tracking-wider block">Accommodation Selected</span>
                    <span className="font-medium text-stone-900 text-sm mt-0.5 block">{selectedRoom.name}</span>
                  </div>

                  <div>
                    <span className="text-stone-400 uppercase font-bold text-[9px] tracking-wider block">Arrival Date</span>
                    <span className="font-medium text-stone-800 flex items-center gap-1.5 mt-0.5">
                      <CalendarCheck className="w-3.5 h-3.5 text-amber-700" />
                      {formData.checkIn} (From 3:00 PM)
                    </span>
                  </div>

                  <div>
                    <span className="text-stone-400 uppercase font-bold text-[9px] tracking-wider block">Departure Date</span>
                    <span className="font-medium text-stone-800 flex items-center gap-1.5 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-700" />
                      {formData.checkOut} (By 12:00 PM)
                    </span>
                  </div>

                  <div>
                    <span className="text-stone-400 uppercase font-bold text-[9px] tracking-wider block">Size Allocated</span>
                    <span className="font-medium text-stone-800 mt-0.5 block">{selectedRoom.sizeSqFt} SQ FT</span>
                  </div>

                  <div>
                    <span className="text-stone-400 uppercase font-bold text-[9px] tracking-wider block">Stay Length</span>
                    <span className="font-medium text-stone-800 mt-0.5 block">{nights} Luxurious Nights</span>
                  </div>
                </div>

                {/* Package Extras included */}
                {selectedOptions.length > 0 && (
                  <div>
                    <span className="text-stone-400 uppercase font-bold text-[9px] tracking-wider block mb-2">Charter Extras Included</span>
                    <div className="flex flex-wrap gap-1.5">
                      {PREMIUM_OPTIONS
                        .filter(opt => selectedOptions.includes(opt.id))
                        .map(opt => (
                          <span key={opt.id} className="inline-flex items-center gap-1.5 bg-stone-100 text-stone-700 font-sans font-semibold text-[10px] py-1 px-2.5 rounded-lg border border-stone-200">
                            <Check className="w-3 h-3 text-amber-700" />
                            {opt.name}
                          </span>
                        ))}
                    </div>
                  </div>
                )}

                {/* Final Cost Breakdown */}
                <div className="bg-stone-100 p-5 rounded-2xl flex justify-between items-center">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block">
                      Total Reservation Bill
                    </span>
                    <span className="text-[10px] text-stone-500 font-sans italic">Payable upon arrival at check-in counter</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-serif font-extrabold text-stone-900">
                      €{totalCost}
                    </span>
                  </div>
                </div>

                {/* Buttons confirmation */}
                <div className="grid grid-cols-2 gap-3 mt-8">
                  <button
                    id="btn-confirm-print"
                    onClick={() => alert(`Simulated document printing: ${confirmationCode}`)}
                    className="py-3 px-4 bg-stone-950 hover:bg-stone-800 text-white font-sans text-xs uppercase tracking-widest font-bold rounded-lg text-center transition-colors cursor-pointer"
                  >
                    Print Luxury Voucher
                  </button>
                  <button
                    id="btn-confirm-restart"
                    onClick={handleRestart}
                    className="py-3 px-4 bg-amber-700 hover:bg-amber-600 text-white font-sans text-xs uppercase tracking-widest font-bold rounded-lg text-center transition-colors cursor-pointer"
                  >
                    Book Another Room
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
