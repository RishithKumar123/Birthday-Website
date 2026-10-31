import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Menu, X, Music, Sparkles } from 'lucide-react';

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'letter', label: 'Letter' },
  { id: 'reasons', label: 'Special Reasons' },
  { id: 'wishes', label: 'Wishes' },
  { id: 'cake', label: 'Cake' },
  { id: 'music', label: 'Music' },
];

export default function Navigation({ activeSection, isMusicPlaying, toggleMusic }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-white/75 backdrop-blur-md border-b border-[#e0a9af]/30 shadow-[0_10px_30px_rgba(183,110,121,0.08)]'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Title */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#b76e79] to-[#d4af37] p-[1.5px] shadow-sm group-hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all">
              <div className="w-full h-full rounded-full bg-[#fffdf9] flex items-center justify-center">
                <Heart className="w-4 h-4 text-[#b76e79] fill-[#b76e79] group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <span className="font-serif text-lg md:text-xl font-bold tracking-wide gold-gradient-text">
                Amma
              </span>
              <span className="block text-[10px] tracking-widest uppercase text-[#9c535e] font-sans font-medium">
                With Endless Love
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 bg-white/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#e0a9af]/40 shadow-sm">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`px-3 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all cursor-pointer relative ${
                    isActive
                      ? 'text-[#733841] font-semibold'
                      : 'text-[#6b584d] hover:text-[#9c535e]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navPill"
                      className="absolute inset-0 bg-gradient-to-r from-[#ffe4e6] to-[#fef3c7] rounded-full border border-[#d4af37]/30 -z-10 shadow-sm"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons: Floating Music indicator & Hamburger */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMusic}
              title={isMusicPlaying ? 'Pause Birthday Melody' : 'Play Birthday Melody'}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all border ${
                isMusicPlaying
                  ? 'bg-gradient-to-r from-[#b76e79] to-[#d4af37] text-white border-transparent shadow-[0_0_15px_rgba(183,110,121,0.5)]'
                  : 'bg-white/80 text-[#733841] border-[#e0a9af]/40 hover:bg-[#fff0f3]'
              }`}
            >
              <Music className={`w-3.5 h-3.5 ${isMusicPlaying ? 'animate-bounce' : ''}`} />
              <span className="hidden sm:inline">
                {isMusicPlaying ? 'Melody Playing' : 'Play Song'}
              </span>
              {isMusicPlaying && (
                <span className="flex h-1.5 w-1.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-white/80 border border-[#e0a9af]/40 text-[#733841] hover:bg-[#fff0f3] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-4 right-4 z-40 bg-white/95 backdrop-blur-xl rounded-2xl p-5 border border-[#e0a9af]/50 shadow-[0_20px_40px_rgba(183,110,121,0.2)] md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer flex items-center justify-between ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-[#ffe4e6] to-[#fef3c7] text-[#733841] font-semibold border border-[#d4af37]/30'
                      : 'text-[#6b584d] hover:bg-[#fff0f3]'
                  }`}
                >
                  <span>{item.label}</span>
                  {activeSection === item.id && <Sparkles className="w-4 h-4 text-[#d4af37]" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
