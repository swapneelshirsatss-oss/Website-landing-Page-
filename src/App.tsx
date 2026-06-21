/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Features from "./components/Features";
import Accommodations from "./components/Accommodations";
import BookingForm from "./components/BookingForm";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import { RESORT_INFO } from "./data";
import heroImage from "./assets/images/hero-mountain.jpg";
import aboutImage from "./assets/images/pine-forest.jpg";
import { 
  Compass, MapPin, Sparkles, Clock, GlassWater, 
  Map, CalendarClock, PhoneCall, Star, Waves
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [selectedSuiteId, setSelectedSuiteId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Quick availability check dates
  const [quickIn, setQuickIn] = useState<string>("2026-06-21");
  const [quickOut, setQuickOut] = useState<string>("2026-06-25");

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleBookNowTrigger = () => {
    setSelectedSuiteId(null);
    scrollToSection("booking-section");
  };

  const handleSelectSuite = (suiteId: string) => {
    setSelectedSuiteId(suiteId);
    showToast("Suite selected. Pricing has been updated!");
    scrollToSection("booking-section");
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleQuickAvailabilityCheck = (e: React.FormEvent) => {
    e.preventDefault();
    scrollToSection("booking-section");
    // We can focus on the form
    showToast("Adjust your guests and special requests below!");
  };

  return (
    <div id="resort-app-root" className="min-h-screen bg-stone-50 font-sans text-stone-850 antialiased scroll-smooth">
      {/* Toast Notification Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            id="toast-notification"
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-amber-400 px-6 py-3.5 rounded-full shadow-2xl border border-amber-500/20 text-xs tracking-wider uppercase font-semibold flex items-center gap-2"
          >
            <Sparkles className="w-4.5 h-4.5 text-amber-400 animate-pulse" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Header Navigation */}
      <Navbar onBookNowClick={handleBookNowTrigger} />

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-stone-950">
        
        {/* Full Screen Cinematic BG Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Whispering Pines Mukteshwar Hill Station Sanctuary"
            className="w-full h-full object-cover opacity-80"
          />
          {/* Subtle slow ambient zoom filter overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/60 via-stone-900/15 to-stone-950/90"></div>
        </div>

        {/* Hero Copy Content */}
        <div className="relative max-w-5xl mx-auto px-4 md:px-8 text-center text-white mt-12">
          
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="font-serif text-4xl sm:text-6xl md:text-8xl tracking-tight leading-none mb-6 font-medium text-stone-100"
          >
            Whispering Pines <br />
            <span className="italic font-normal text-amber-200">by Casa De Bello</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-stone-300 font-sans text-xs sm:text-sm md:text-lg tracking-wide max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          >
            {RESORT_INFO.tagline}
          </motion.p>

          {/* Call to actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              id="hero-book-direct-btn"
              onClick={handleBookNowTrigger}
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-stone-950 px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Select Your Sanctuary
            </button>
            <button
              id="hero-explore-suites-btn"
              onClick={() => scrollToSection("suites")}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/25 text-white px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-widest transition-colors duration-300"
            >
              Explore Accommodation
            </button>
          </motion.div>
        </div>

        {/* Hero Bottom - Quick dates availability widget */}
        <div id="quick-checker-widget" className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 hidden md:block z-20">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            onSubmit={handleQuickAvailabilityCheck}
            className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-stone-200 flex items-center justify-between gap-4"
          >
            <div className="flex-1 grid grid-cols-2 gap-4 text-left px-2">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-stone-400 font-bold block mb-1">
                  Arrival
                </span>
                <input
                  id="quick-checkin-date"
                  type="date"
                  value={quickIn}
                  min="2026-06-20"
                  onChange={(e) => setQuickIn(e.target.value)}
                  className="w-full text-stone-800 text-sm font-semibold bg-transparent focus:outline-hidden cursor-pointer"
                />
              </div>
              <div className="border-l border-stone-200 pl-4">
                <span className="text-[9px] uppercase tracking-widest text-stone-400 font-bold block mb-1">
                  Departure
                </span>
                <input
                  id="quick-checkout-date"
                  type="date"
                  value={quickOut}
                  min={quickIn}
                  onChange={(e) => setQuickOut(e.target.value)}
                  className="w-full text-stone-800 text-sm font-semibold bg-transparent focus:outline-hidden cursor-pointer"
                />
              </div>
            </div>

            <button
              id="quick-check-btn"
              type="submit"
              className="bg-stone-900 hover:bg-amber-800 text-white text-xs uppercase tracking-widest font-bold py-3.5 px-6 rounded-xl transition-all duration-300 font-sans cursor-pointer flex items-center gap-2"
            >
              <CalendarClock className="w-4 h-4 text-amber-500" />
              <span>Verify Rates</span>
            </button>
          </motion.form>
        </div>
      </section>

      {/* Quick intro details about Positano */}
      <section id="about" className="py-24 bg-stone-50 select-none">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden aspect-4/3 shadow-2xl border border-stone-200">
                <img
                  src={aboutImage}
                  alt="Pine Woodlands and Cozy Himalayan Cabin"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-stone-900/10"></div>
              </div>

              {/* Float Card */}
              <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-xl shadow-xl border border-stone-150 max-w-[240px] hidden sm:block">
                <div className="flex gap-1 text-amber-500 mb-2">
                  {[1, 2, 3, 4, 5].map(n => <Star key={n} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />)}
                </div>
                <p className="text-[11px] text-stone-700 italic font-serif leading-relaxed">
                  "A sublime escape under the cedar whispers. Fresh Pahadi food, pristine views and stargazing were unforgettable."
                </p>
                <div className="text-[9px] uppercase tracking-widest font-bold text-stone-400 mt-2">
                  Condé Nast Traveller India
                </div>
              </div>
            </div>

            {/* Information Column */}
            <div className="lg:col-span-7 space-y-6 lg:pl-8">
              <span className="text-xs uppercase tracking-widest font-semibold text-amber-700 block">
                The Sanctuary
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-stone-950 tracking-tight leading-tight">
                Whispering Pines
              </h2>
              <p className="text-stone-700 text-sm md:text-base leading-relaxed font-sans">
                {RESORT_INFO.description}
              </p>

              {/* Core quick values row */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-stone-200">
                <div>
                  <div className="text-xl md:text-3xl font-serif font-bold text-stone-900">7,500 ft</div>
                  <div className="text-[10px] uppercase tracking-widest text-stone-450 mt-1">Altitude Peaks</div>
                </div>
                <div>
                  <div className="text-xl md:text-3xl font-serif font-bold text-stone-900">100%</div>
                  <div className="text-[10px] uppercase tracking-widest text-stone-450 mt-1">Organic Himalayan Eats</div>
                </div>
                <div>
                  <div className="text-xl md:text-3xl font-serif font-bold text-stone-900">Nanda Devi</div>
                  <div className="text-[10px] uppercase tracking-widest text-stone-450 mt-1">Range Views</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities/Amenities Section */}
      <Features />

      {/* Suites / Villas Lists */}
      <Accommodations onSelectSuite={handleSelectSuite} />

      {/* Booking Form Layout */}
      <BookingForm 
        preSelectedSuiteId={selectedSuiteId} 
        onBookingSuccess={() => showToast("Congratulations! Your VIP vacation starts here.")} 
      />

      {/* Review & FAQ Column */}
      <FAQ />

      {/* Footer Details */}
      <Footer />
    </div>
  );
}
