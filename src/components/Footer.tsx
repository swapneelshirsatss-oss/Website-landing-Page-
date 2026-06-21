import React from "react";
import { RESORT_INFO } from "../data";
import { Mail, Phone, MapPin, Sparkles } from "lucide-react";
import logoBanner from "../assets/images/brand_logo_banner_1782018064467.jpg";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="resort-footer" className="bg-stone-950 text-stone-400 py-16 border-t border-stone-850">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Brand details */}
          <div className="space-y-4">
            <button
              id="footer-logo-btn"
              onClick={scrollToTop}
              className="flex items-center group text-left focus:outline-hidden mb-4"
            >
              <img
                src={logoBanner}
                alt="Whispering Pines by Casa De Bello Logo"
                referrerPolicy="no-referrer"
                className="h-14 object-contain rounded-sm transition-all duration-350 shadow-md border border-stone-800"
              />
            </button>
            <p className="text-xs text-stone-500 leading-relaxed font-sans">
              Experience a quintessential high-altitude Himalayan pine forest retreat. Designed for absolute tranquility, organic local culinary triumphs, and crisp mountain wellness.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-bold text-white font-sans">
              Discover Pines
            </h4>
            <ul className="space-y-2 text-xs font-sans">
              <li>
                <a href="#about" className="hover:text-amber-500 transition-colors">
                  The Resort Sanctuary
                </a>
              </li>
              <li>
                <a href="#amenities" className="hover:text-amber-500 transition-colors">
                  Forest Trails & Alpine Spa
                </a>
              </li>
              <li>
                <a href="#suites" className="hover:text-amber-500 transition-colors">
                  Suites & Luxury Cottages
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-amber-500 transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-bold text-white font-sans">
              Bespoke Inquiries
            </h4>
            <ul className="space-y-3 text-xs font-sans">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <span className="text-stone-400">{RESORT_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <a href={`tel:${RESORT_INFO.phone}`} className="hover:text-white transition-colors text-stone-400">
                  {RESORT_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <a href={`mailto:${RESORT_INFO.email}`} className="hover:text-white transition-colors text-stone-400">
                  {RESORT_INFO.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter / Promise */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-bold text-white font-sans">
              A Noble Refuge
            </h4>
            <div className="bg-stone-900 p-4 border border-stone-850 rounded-xl space-y-3 text-xs">
              <div className="flex items-center gap-2 text-amber-500">
                <Sparkles className="w-4 h-4" />
                <span className="font-bold uppercase tracking-wider font-sans text-[10px]">VIP Invitation</span>
              </div>
              <p className="text-[11px] text-stone-500 leading-relaxed">
                Sign up for exclusive mountain culinary and travel seasonal offers. We respect your complete privacy.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thank you! You have been subscribed with VIP access privileges.");
                  (e.target as HTMLFormElement).reset();
                }}
                className="flex gap-2"
              >
                <input
                  type="email"
                  required
                  placeholder="Your elite email"
                  className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-xs text-white focus:outline-hidden focus:border-amber-500 placeholder-stone-700"
                />
                <button
                  type="submit"
                  className="px-3 bg-amber-600 font-bold hover:bg-amber-500 text-stone-950 text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-stone-850 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-sans">
          <div>
            © {currentYear} {RESORT_INFO.name}. All premium mountain resort rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-amber-500 transition-colors">
              Terms of Solace
            </a>
            <a href="#" className="hover:text-amber-500 transition-colors">
              Privacy Declaration
            </a>
            <a href="#" className="hover:text-amber-500 transition-colors">
              Cookie Management
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
