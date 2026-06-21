import React, { useState } from "react";
import { Star, Users, Sparkles, Check, CheckCircle, Eye, Maximize2 } from "lucide-react";
import { ACCOMMODATIONS } from "../data";
import { Accommodation } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface AccommodationsProps {
  onSelectSuite: (id: string) => void;
}

export default function Accommodations({ onSelectSuite }: AccommodationsProps) {
  const [selectedSuiteId, setSelectedSuiteId] = useState<string | null>(null);
  const [hoveredSuiteId, setHoveredSuiteId] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const suitesToRender = selectedFilter === "All"
    ? ACCOMMODATIONS 
    : ACCOMMODATIONS.filter(suite => suite.type === selectedFilter);

  const selectedSuiteInfo = ACCOMMODATIONS.find(suite => suite.id === selectedSuiteId);

  return (
    <section id="suites" className="py-24 bg-stone-100 select-none">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-widest font-semibold text-amber-700 block mb-3">
              Suites & Villas
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-stone-900 tracking-tight leading-tight">
              Curated Sanctum
            </h2>
            <div className="w-16 h-0.5 bg-amber-600/60 mt-4 mb-6"></div>
            <p className="text-stone-600 font-sans text-sm md:text-base leading-relaxed">
              Rustic stone hearths, beautiful cedar timbers, and snow-capped Himalayan Peak views crafted to immerse you in high-mountain sanctuary living.
            </p>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-stone-200/50 p-1.5 rounded-full border border-stone-200">
            {["All", "Suite", "Villa", "Penthouse"].map((tab) => (
              <button
                id={`filter-tab-${tab}`}
                key={tab}
                onClick={() => setSelectedFilter(tab)}
                className={`px-5 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  selectedFilter === tab
                    ? "bg-white text-amber-800 shadow-sm"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                {tab}s
              </button>
            ))}
          </div>
        </div>

        {/* Accommodations Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {suitesToRender.map((suite, idx) => {
            const isHovered = hoveredSuiteId === suite.id;

            return (
              <motion.div
                id={`suite-card-${suite.id}`}
                key={suite.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                onMouseEnter={() => setHoveredSuiteId(suite.id)}
                onMouseLeave={() => setHoveredSuiteId(null)}
                className="bg-white border border-stone-200/70 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-600/30 transition-all duration-500 flex flex-col justify-between"
              >
                {/* Media Container */}
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={suite.image}
                    alt={suite.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out"
                    style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-stone-950/10 to-transparent"></div>

                  {/* Rating Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs text-stone-900 py-1.5 px-3 rounded-full flex items-center gap-1 shadow-sm text-xs font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{suite.rating.toFixed(1)}</span>
                  </div>

                  {/* Pricing Placeholder Badge */}
                  <div className="absolute bottom-4 left-4">
                    <div className="text-[10px] uppercase tracking-widest text-amber-300 font-bold font-sans flex items-center gap-1.5 bg-stone-950/70 backdrop-blur-xs py-1 px-3 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      On Inquiry
                    </div>
                  </div>

                  {/* Expand Info Modal Button */}
                  <button
                    id={`suite-info-expand-${suite.id}`}
                    onClick={() => setSelectedSuiteId(suite.id)}
                    className="absolute bottom-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-stone-900 backdrop-blur-xs transition-colors shadow-xs"
                    aria-label="View Room Details"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Information Area */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Size & Guests Mini Row */}
                    <div className="flex items-center gap-4 text-xs font-sans font-semibold text-stone-500 mb-2">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-amber-700" />
                        <span>Max {suite.capacity} Guests</span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-stone-300"></div>
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                        <span>{suite.sizeSqFt} sq ft</span>
                      </div>
                    </div>

                    <h3 className="font-serif text-xl md:text-2xl text-stone-900 group-hover:text-amber-800 transition-colors mb-3">
                      {suite.name}
                    </h3>
                    <p className="text-stone-600 text-sm leading-relaxed mb-6 font-sans">
                      {suite.description}
                    </p>

                    {/* View Info */}
                    <div className="flex items-center gap-2 text-stone-700 bg-stone-50 p-2.5 rounded-lg mb-6 border border-stone-200/50">
                      <Eye className="w-4 h-4 text-amber-800" />
                      <span className="text-xs font-medium italic text-stone-600">
                        {suite.views}
                      </span>
                    </div>

                    {/* Miniature Amenities list */}
                    <div className="flex flex-wrap gap-1.5 mb-8">
                      {suite.amenities.slice(0, 3).map((amenity) => (
                        <span
                          key={amenity}
                          className="bg-amber-100/50 text-amber-900 border border-amber-100 text-[10px] uppercase tracking-wide font-semibold py-1 px-2 rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                      {suite.amenities.length > 3 && (
                        <span className="text-[10px] text-stone-500 font-semibold self-center ml-1">
                          +{suite.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <button
                      id={`book-suite-action-${suite.id}`}
                      onClick={() => onSelectSuite(suite.id)}
                      className="w-full sm:flex-1 bg-stone-900 hover:bg-amber-800 text-white font-sans text-xs uppercase tracking-widest font-semibold py-3 px-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg text-center cursor-pointer"
                    >
                      Book This Suite
                    </button>
                    <button
                      id={`view-specs-action-${suite.id}`}
                      onClick={() => setSelectedSuiteId(suite.id)}
                      className="w-full sm:w-auto bg-stone-200/50 hover:bg-stone-200 text-stone-800 font-sans text-xs uppercase tracking-widest font-semibold py-3 px-5 rounded-full transition-all duration-300 border border-stone-300 text-center cursor-pointer"
                    >
                      Full Details
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Custom Detail Drawer / Overlay Modal */}
      <AnimatePresence>
        {selectedSuiteId && selectedSuiteInfo && (
          <div
            id="suite-modal-lightbox"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-xs select-none"
            onClick={() => setSelectedSuiteId(null)}
          >
            <motion.div
              id="suite-modal-box"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-stone-200 flex flex-col md:flex-row"
            >
              {/* Left Column - Big Room Image with Specs */}
              <div className="w-full md:w-1/2 relative h-64 md:h-auto min-h-[300px] bg-stone-900">
                <img
                  src={selectedSuiteInfo.image}
                  alt={selectedSuiteInfo.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-[10px] uppercase tracking-widest text-amber-400 font-bold mb-1">
                    Whispering Pines Luxury Room
                  </span>
                  <h4 className="font-serif text-2xl tracking-tight mb-2">
                    {selectedSuiteInfo.name}
                  </h4>
                  <p className="text-xs text-stone-200 italic">
                    {selectedSuiteInfo.views}
                  </p>
                </div>
              </div>

              {/* Right Column - Luxury Suite Detail List */}
              <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-amber-50 text-amber-800 border border-amber-200 text-xs uppercase tracking-widest font-semibold py-1 px-3 rounded-full">
                      {selectedSuiteInfo.type}
                    </span>
                    <button
                      id="close-suite-spec-btn"
                      onClick={() => setSelectedSuiteId(null)}
                      className="p-1 px-2.5 rounded-full border border-stone-250 text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-all font-bold text-xs"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="text-xs font-sans text-stone-500 uppercase tracking-widest font-bold mb-4 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Enquire for Best Available Rates
                  </div>

                  <h5 className="font-sans text-xs uppercase tracking-widest font-bold text-stone-500 mb-3">
                    Premium Features & Perks
                  </h5>
                  <ul className="space-y-2 mb-6">
                    {selectedSuiteInfo.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2.5 text-xs text-stone-700">
                        <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  <h5 className="font-sans text-xs uppercase tracking-widest font-bold text-stone-500 mb-3">
                    All-Inclusive Amenities
                  </h5>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {selectedSuiteInfo.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="bg-stone-50 text-stone-700 border border-stone-200 text-[10px] font-sans font-semibold py-1 px-2.5 rounded-lg"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-4 mt-4">
                  <div className="text-left">
                    <div className="text-[10px] uppercase tracking-widest text-stone-400 font-medium">
                      Dimensions
                    </div>
                    <div className="text-xs font-bold text-stone-700">
                      {selectedSuiteInfo.sizeSqFt} sq ft
                    </div>
                  </div>
                  <button
                    id={`modal-book-direct-${selectedSuiteInfo.id}`}
                    onClick={() => {
                      setSelectedSuiteId(null);
                      onSelectSuite(selectedSuiteInfo.id);
                    }}
                    className="flex-1 bg-amber-700 hover:bg-amber-600 text-white font-sans text-xs uppercase tracking-widest font-bold py-3 px-4 rounded-full transition-colors text-center"
                  >
                    Select & Reserve Now
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
