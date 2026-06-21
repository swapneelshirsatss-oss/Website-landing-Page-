import React, { useState } from "react";
import { FAQS, TESTIMONIALS } from "../data";
import { Star, ChevronDown, MessageSquareCode, ShieldCheck, Pocket } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function FAQ() {
  const [activeFaqId, setActiveFaqId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const toggleFaq = (id: string) => {
    setActiveFaqId(activeFaqId === id ? null : id);
  };

  const categories = ["All", "Arrival", "Policies", "Activities"];
  const filteredFaqs = activeCategory === "All"
    ? FAQS
    : FAQS.filter(faq => faq.category === activeCategory);

  return (
    <section id="faq" className="py-24 bg-stone-50 select-none">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Guest Reviews Section */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-semibold text-amber-700 block mb-3">
              Elite Impressions
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-stone-900 tracking-tight leading-tight mb-4">
              Voices of Vista Marina
            </h2>
            <div className="w-16 h-0.5 bg-amber-600/60 mx-auto mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {TESTIMONIALS.map((testimonial) => (
              <div
                id={`review-card-${testimonial.id}`}
                key={testimonial.id}
                className="bg-white border border-stone-200/60 p-8 rounded-2xl shadow-xs relative flex flex-col justify-between"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-6 text-amber-500">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>

                  <p className="text-stone-700 italic text-sm md:text-base leading-relaxed font-serif mb-6">
                    "{testimonial.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-stone-100">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover border-2 border-amber-100"
                  />
                  <div>
                    <h4 className="font-sans font-bold text-sm text-stone-950">{testimonial.name}</h4>
                    <span className="text-xs text-stone-500">{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-16">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest font-semibold text-amber-700 block mb-3">
              Have Questions?
            </span>
            <h3 className="font-serif text-2xl md:text-4xl text-stone-900 tracking-tight">
              Frequently Asked Information
            </h3>
            <div className="w-12 h-0.5 bg-amber-600/40 mx-auto mt-4 mb-8"></div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  id={`faq-cat-pill-${cat}`}
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setActiveFaqId(null);
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors border ${
                    activeCategory === cat
                      ? "bg-stone-900 border-stone-900 text-white"
                      : "bg-white border-stone-200 text-stone-600 hover:text-stone-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {filteredFaqs.map((faq) => {
              const isOpen = activeFaqId === faq.id;

              return (
                <div
                  id={`faq-item-${faq.id}`}
                  key={faq.id}
                  className="bg-white border border-stone-200/80 rounded-xl overflow-hidden shadow-xs hover:border-stone-300 transition-all duration-300"
                >
                  <button
                    id={`faq-toggle-btn-${faq.id}`}
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left p-5 flex justify-between items-center gap-4 cursor-pointer focus:outline-hidden"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-amber-700 bg-amber-50 px-2 py-0.5 rounded-sm">
                        {faq.category}
                      </span>
                      <span className="font-sans font-semibold text-sm md:text-base text-stone-900">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-stone-500 transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? "rotate-180 text-amber-700" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-stone-600 border-t border-stone-50/50 leading-relaxed font-sans">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Additional Guidance Footer */}
          <div className="mt-12 bg-amber-50 border border-amber-100 p-5 rounded-2xl flex flex-col sm:flex-row items-center gap-4 justify-between">
            <div className="flex items-center gap-3 text-left">
              <div className="p-2.5 rounded-full bg-white text-amber-700 border border-amber-100">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wide">
                  Elite Guest Security
                </h4>
                <p className="text-[11px] text-stone-500 font-sans mt-0.5 leading-relaxed">
                  Have an executive dietary custom request? Speak directly with our guest concierge upon reserving.
                </p>
              </div>
            </div>
            <a
              id="faq-help-btn"
              href="mailto:concierge@vistadelmar.com"
              className="px-5 py-2 hover:bg-stone-900 border border-stone-300 hover:border-stone-900 text-stone-800 hover:text-white rounded-full text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap"
            >
              Contact Concierge
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
