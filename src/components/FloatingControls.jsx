import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Music } from 'lucide-react';

export default function FloatingControls({ isMusicPlaying, toggleMusic }) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      {/* Floating Music Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleMusic}
        title={isMusicPlaying ? 'Pause Birthday Music' : 'Play Birthday Music'}
        className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-[0_10px_25px_rgba(183,110,121,0.35)] transition-all ${
          isMusicPlaying
            ? 'bg-gradient-to-tr from-[#b76e79] to-[#d4af37] text-white ring-4 ring-[#ffe4e6]'
            : 'bg-white/90 backdrop-blur-md text-[#733841] border border-[#e0a9af]/50 hover:bg-[#ffe4e6]'
        }`}
        aria-label="Toggle background birthday music"
      >
        <Music className={`w-5 h-5 ${isMusicPlaying ? 'animate-bounce' : ''}`} />
      </motion.button>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            title="Back to Top"
            className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-md border border-[#d4af37]/50 text-[#733841] hover:text-[#b76e79] hover:bg-[#fff0f3] flex items-center justify-center cursor-pointer shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
