import React, { useState, useEffect } from "react";
import { Compass, Menu, X, PhoneCall, CalendarDays } from "lucide-react";
import { RESORT_INFO } from "../data";

interface NavbarProps {
  onBookNowClick: () => void;
}

export default function Navbar({ onBookNowClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      id="navbar-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-stone-50/95 backdrop-blur-md shadow-sm border-b border-stone-200/50 py-3"
          : "bg-gradient-to-b from-stone-900/50 via-stone-900/10 to-transparent py-5 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="nav-logo-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 group text-left focus:outline-hidden"
        >
          <div className={`p-2 rounded-full transition-colors duration-300 ${isScrolled ? "bg-amber-50 text-amber-800" : "bg-white/10 text-white"}`}>
            <Compass className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500" />
          </div>
          <div>
            <span className={`font-serif text-lg tracking-wider font-bold transition-colors ${isScrolled ? "text-stone-900" : "text-white"}`}>
              VISTA DEL MAR
            </span>
            <span className={`block text-[9px] tracking-widest uppercase font-medium transition-colors ${isScrolled ? "text-amber-700" : "text-amber-200"}`}>
              Amalfi Coast · Italy
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden md:flex items-center gap-8 font-sans text-xs uppercase tracking-widest font-semibold">
          <button
            id="nav-link-about"
            onClick={() => scrollToSection("about")}
            className={`transition-colors cursor-pointer hover:text-amber-600 ${isScrolled ? "text-stone-700" : "text-white/90"}`}
          >
            The Resort
          </button>
          <button
            id="nav-link-amenities"
            onClick={() => scrollToSection("amenities")}
            className={`transition-colors cursor-pointer hover:text-amber-600 ${isScrolled ? "text-stone-700" : "text-white/90"}`}
          >
            Amenities
          </button>
          <button
            id="nav-link-suites"
            onClick={() => scrollToSection("suites")}
            className={`transition-colors cursor-pointer hover:text-amber-600 ${isScrolled ? "text-stone-700" : "text-white/90"}`}
          >
            Suites & Villas
          </button>
          <button
            id="nav-link-faq"
            onClick={() => scrollToSection("faq")}
            className={`transition-colors cursor-pointer hover:text-amber-600 ${isScrolled ? "text-stone-700" : "text-white/90"}`}
          >
            FAQ
          </button>
        </nav>

        {/* Action Button & Contact */}
        <div id="nav-actions" className="hidden lg:flex items-center gap-6">
          <a
            id="nav-phone-link"
            href={`tel:${RESORT_INFO.phone}`}
            className={`flex items-center gap-2 text-xs font-semibold transition-colors ${
              isScrolled ? "text-stone-600 hover:text-amber-700" : "text-white/80 hover:text-white"
            }`}
          >
            <PhoneCall className="w-4.5 h-4.5 text-amber-600" />
            <span>{RESORT_INFO.phone}</span>
          </a>

          <button
            id="nav-book-btn"
            onClick={onBookNowClick}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all duration-300 ${
              isScrolled
                ? "bg-stone-900 border border-stone-900 text-stone-50 hover:bg-amber-800 hover:border-amber-800 shadow-md shadow-stone-900/10 hover:shadow-lg hover:shadow-stone-900/20"
                : "bg-white/10 hover:bg-white text-white hover:text-stone-900 border border-white/30 backdrop-blur-xs"
            }`}
          >
            <CalendarDays className="w-4 h-4" />
            Reserve Your Stay
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            id="nav-book-btn-mobile"
            onClick={onBookNowClick}
            className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold border transition-colors ${
              isScrolled
                ? "bg-amber-700 text-white border-amber-700 hover:bg-stone-900 hover:border-stone-900"
                : "bg-white text-stone-900 border-white hover:bg-white/80"
            }`}
          >
            Book
          </button>
          <button
            id="nav-mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 transition-colors focus:outline-hidden ${isScrolled ? "text-stone-800" : "text-white"}`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="md:hidden fixed top-0 left-0 w-full h-screen bg-stone-900/98 text-stone-50 z-40 flex flex-col justify-center px-10 py-20 pointer-events-auto transition-all duration-300"
        >
          <div className="flex justify-between items-center absolute top-5 left-0 right-0 px-4">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-500" />
              <span className="font-serif text-lg tracking-wider font-bold">VISTA DEL MAR</span>
            </div>
            <button
              id="close-mobile-drawer-btn"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-stone-300 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav id="mobile-nav" className="flex flex-col gap-6 text-xl tracking-widest font-serif font-medium mt-8">
            <button
              id="mobile-nav-about"
              onClick={() => scrollToSection("about")}
              className="text-left py-2 border-b border-stone-800 text-stone-200 hover:text-amber-400 transition-colors"
            >
              The Resort
            </button>
            <button
              id="mobile-nav-amenities"
              onClick={() => scrollToSection("amenities")}
              className="text-left py-2 border-b border-stone-800 text-stone-200 hover:text-amber-400 transition-colors"
            >
              Amenities
            </button>
            <button
              id="mobile-nav-suites"
              onClick={() => scrollToSection("suites")}
              className="text-left py-2 border-b border-stone-800 text-stone-200 hover:text-amber-400 transition-colors"
            >
              Suites & Villas
            </button>
            <button
              id="mobile-nav-faq"
              onClick={() => scrollToSection("faq")}
              className="text-left py-2 border-b border-stone-800 text-stone-200 hover:text-amber-400 transition-colors"
            >
              FAQ
            </button>
          </nav>

          <div className="mt-12 flex flex-col gap-6">
            <a
              id="mobile-phone-link"
              href={`tel:${RESORT_INFO.phone}`}
              className="flex items-center gap-3 text-sm text-stone-300 hover:text-white"
            >
              <PhoneCall className="w-5 h-5 text-amber-500" />
              <span>{RESORT_INFO.phone}</span>
            </a>
            <button
              id="mobile-book-now-btn"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onBookNowClick();
              }}
              className="w-full bg-amber-700 hover:bg-amber-600 text-white py-3.5 rounded-full text-xs font-semibold tracking-widest uppercase transition-colors"
            >
              Reserve Your Stay
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
