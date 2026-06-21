import React, { useState } from "react";
import { Umbrella, Sparkles, UtensilsCrossed, Waves, ArrowRight, X, Heart } from "lucide-react";
import { RESORT_FEATURES } from "../data";
import { ResortFeature } from "../types";
import { motion, AnimatePresence } from "motion/react";

const IconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Umbrella: Umbrella,
  Sparkles: Sparkles,
  UtensilsCrossed: UtensilsCrossed,
  Waves: Waves,
};

export default function Features() {
  const [selectedFeature, setSelectedFeature] = useState<ResortFeature | null>(null);
  const [lovedFeatures, setLovedFeatures] = useState<string[]>([]);

  const toggleLove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLovedFeatures((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="amenities" className="py-24 bg-stone-50 select-none">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-amber-700 block mb-3">
            Pure Indulgence
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-stone-900 tracking-tight leading-tight mb-6">
            The Vista Lifestyle
          </h2>
          <div className="w-16 h-0.5 bg-amber-600/60 mx-auto mb-6"></div>
          <p className="text-stone-600 font-sans text-sm md:text-base leading-relaxed">
            Every feature at Vista Del Mar has been curated to indulge your senses and quiet your mind. Explore our hand-crafted luxury amenities.
          </p>
        </div>

        {/* Features Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {RESORT_FEATURES.map((feature, idx) => {
            const IconComponent = IconMap[feature.icon] || Sparkles;
            const isLoved = lovedFeatures.includes(feature.id);

            return (
              <motion.div
                id={`feature-card-${feature.id}`}
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => setSelectedFeature(feature)}
                className="group relative bg-white border border-stone-200/60 rounded-xl overflow-hidden shadow-xs hover:shadow-xl hover:border-amber-600/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full flex flex-col"
              >
                {/* Feature Image Header */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>

                  {feature.badge && (
                    <span className="absolute top-4 left-4 bg-amber-500/95 backdrop-blur-xs text-stone-950 text-[10px] uppercase tracking-widest font-bold py-1 px-2.5 rounded-full">
                      {feature.badge}
                    </span>
                  )}

                  {/* Love Heart Button */}
                  <button
                    id={`love-btn-${feature.id}`}
                    onClick={(e) => toggleLove(feature.id, e)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-xs transition-colors duration-200"
                    aria-label="Add to favorites"
                  >
                    <Heart
                      className={`w-4.5 h-4.5 transition-colors ${
                        isLoved ? "fill-rose-500 text-rose-500" : "text-white"
                      }`}
                    />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-4 border border-amber-100">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-lg text-stone-900 group-hover:text-amber-800 transition-colors mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-stone-600 text-xs leading-relaxed mb-4">
                      {feature.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800 tracking-wider uppercase group-hover:gap-3 transition-all">
                    <span>Explore Space</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Feature Details Modal Overlay */}
      <AnimatePresence>
        {selectedFeature && (
          <div
            id="feature-modal-overlay"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs"
            onClick={() => setSelectedFeature(null)}
          >
            <motion.div
              id="feature-modal-content"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-stone-200"
            >
              {/* Image Banner */}
              <div className="relative h-64 md:h-80 w-full">
                <img
                  src={selectedFeature.image}
                  alt={selectedFeature.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/30 to-transparent"></div>

                <button
                  id="close-feature-modal-btn"
                  onClick={() => setSelectedFeature(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white hover:scale-105 transition-all"
                  aria-label="Close details"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-6 left-6 right-6 text-white">
                  {selectedFeature.badge && (
                    <span className="bg-amber-500 text-stone-950 text-[10px] uppercase tracking-widest font-bold py-1 px-2.5 rounded-full mb-3 inline-block">
                      {selectedFeature.badge}
                    </span>
                  )}
                  <h3 className="font-serif text-2xl md:text-4xl tracking-tight">
                    {selectedFeature.title}
                  </h3>
                </div>
              </div>

              {/* Rich Content Details */}
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-2 text-stone-500 text-xs uppercase tracking-widest font-semibold mb-4">
                  {React.createElement(IconMap[selectedFeature.icon] || Sparkles, {
                    className: "w-4 h-4 text-amber-700",
                  })}
                  <span>Premium Experience Amenities</span>
                </div>

                <div className="text-stone-700 text-sm md:text-base leading-relaxed space-y-4">
                  <p className="font-medium text-stone-900 text-lg">
                    {selectedFeature.description}
                  </p>
                  <p className="text-stone-600">{selectedFeature.detailedText}</p>
                </div>

                <div className="mt-8 pt-6 border-t border-stone-150 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-stone-500">
                    Complimentary for all Vista Del Mar suite and villa bookings
                  </div>
                  <button
                    id="feature-modal-close-action"
                    onClick={() => setSelectedFeature(null)}
                    className="px-6 py-2.5 bg-stone-900 hover:bg-amber-800 text-white text-xs uppercase tracking-widest font-semibold rounded-full transition-colors"
                  >
                    Return to Amenities
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
