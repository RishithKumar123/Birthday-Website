import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Flower2 } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

const wishesData = [
  {
    id: 1,
    wish: "May your days be filled with happiness.",
    blessing: "Every sunrise carrying moments of pure, unfiltered laughter.",
    flowerColor: "#f43f5e",
  },
  {
    id: 2,
    wish: "May your smile never fade.",
    blessing: "Your warmth lighting up every room you enter, forever.",
    flowerColor: "#e11d48",
  },
  {
    id: 3,
    wish: "May your life be filled with beautiful surprises.",
    blessing: "Unexpected blessings and gentle wonders embracing you daily.",
    flowerColor: "#db2777",
  },
  {
    id: 4,
    wish: "May every dream in your heart come true.",
    blessing: "The universe conspiring to fulfill every unspoken prayer of yours.",
    flowerColor: "#d4af37",
  },
  {
    id: 5,
    wish: "May you always be surrounded by love.",
    blessing: "Held close by adoration, tenderness, and unwavering care.",
    flowerColor: "#b76e79",
  },
  {
    id: 6,
    wish: "May you enjoy endless peace and good health.",
    blessing: "A serene heart, vibrant energy, and lifelong wellness.",
    flowerColor: "#9c535e",
  },
];

// Blooming Flower SVG component
const BloomingFlowerIcon = ({ isBloomed, color }) => (
  <motion.div
    animate={isBloomed ? { rotate: [0, 15, -10, 0], scale: [1, 1.25, 1.15] } : { scale: 1 }}
    transition={{ duration: 0.8 }}
    className="relative flex items-center justify-center"
  >
    <svg width="48" height="48" viewBox="0 0 100 100" fill="none">
      {/* Petals */}
      <circle cx="50" cy="25" r="18" fill={color} opacity={isBloomed ? '0.85' : '0.4'} />
      <circle cx="75" cy="50" r="18" fill={color} opacity={isBloomed ? '0.85' : '0.4'} />
      <circle cx="50" cy="75" r="18" fill={color} opacity={isBloomed ? '0.85' : '0.4'} />
      <circle cx="25" cy="50" r="18" fill={color} opacity={isBloomed ? '0.85' : '0.4'} />
      {/* Diagonal Petals */}
      <circle cx="68" cy="32" r="16" fill="#ffe4e6" opacity={isBloomed ? '0.9' : '0.5'} />
      <circle cx="68" cy="68" r="16" fill="#ffe4e6" opacity={isBloomed ? '0.9' : '0.5'} />
      <circle cx="32" cy="68" r="16" fill="#ffe4e6" opacity={isBloomed ? '0.9' : '0.5'} />
      <circle cx="32" cy="32" r="16" fill="#ffe4e6" opacity={isBloomed ? '0.9' : '0.5'} />
      {/* Center Pistil */}
      <circle cx="50" cy="50" r="14" fill="#d4af37" />
      <circle cx="50" cy="50" r="7" fill="#fff" opacity="0.8" />
    </svg>
  </motion.div>
);

export default function WishesSection() {
  const [bloomedIds, setBloomedIds] = useState([1]); // First bloomed by default

  const toggleBloom = (id) => {
    soundEffects.playSparkle();
    setBloomedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const bloomAll = () => {
    soundEffects.playCelebrationChime();
    setBloomedIds(wishesData.map((w) => w.id));
  };

  return (
    <section id="wishes" className="py-24 px-4 relative z-20 overflow-hidden">
      {/* Soft background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#ffe4e6]/30 via-[#fef3c7]/20 to-pink-100/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#e0a9af]/40 shadow-sm text-xs font-semibold text-[#9c535e] uppercase tracking-widest mb-3"
          >
            <Flower2 className="w-3.5 h-3.5 text-[#d4af37]" />
            Blossoming Blessings
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#4a3b32]"
          >
            May Your Dreams{' '}
            <span className="font-script text-4xl sm:text-5xl md:text-6xl text-[#b76e79] block sm:inline font-normal">
              Bloom Like Flowers
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-[#733841]/80 font-cormorant italic text-lg sm:text-xl mt-2"
          >
            Tap any flower card to bloom a sacred birthday wish for Amma.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={bloomAll}
            className="mt-6 px-5 py-2 rounded-full text-xs font-serif font-bold tracking-widest uppercase bg-gradient-to-r from-[#b76e79] to-[#d4af37] text-white shadow-sm hover:shadow-md cursor-pointer transition-all active:scale-95 inline-flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bloom All Wishes</span>
          </motion.button>
        </div>

        {/* Wishes Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wishesData.map((item, index) => {
            const isBloomed = bloomedIds.includes(item.id);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => toggleBloom(item.id)}
                className={`relative rounded-3xl p-6 sm:p-8 cursor-pointer transition-all duration-500 border select-none ${
                  isBloomed
                    ? 'bg-gradient-to-br from-white/95 via-[#fff8f9]/90 to-[#fdfbf7]/90 border-[#d4af37]/60 shadow-[0_20px_40px_-10px_rgba(212,175,55,0.25)] ring-1 ring-[#d4af37]/30'
                    : 'bg-white/60 hover:bg-white/80 border-[#e0a9af]/30 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-5">
                  {/* Flower Graphic */}
                  <div className="shrink-0 pt-1">
                    <BloomingFlowerIcon isBloomed={isBloomed} color={item.flowerColor} />
                  </div>

                  {/* Wish Text */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-sans font-semibold tracking-wider text-[#9c535e] uppercase">
                        Wish 0{item.id}
                      </span>
                      <span
                        className={`text-[10px] uppercase font-sans tracking-widest px-2.5 py-0.5 rounded-full ${
                          isBloomed
                            ? 'bg-[#ffe4e6] text-[#b76e79] font-bold'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {isBloomed ? '🌸 Bloomed' : 'Tap to Bloom'}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#4a3b32] mb-2 leading-snug">
                      {item.wish}
                    </h3>

                    <AnimatePresence>
                      {isBloomed && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35 }}
                          className="font-cormorant text-lg italic text-[#733841] pt-1 border-t border-[#e0a9af]/25"
                        >
                          &ldquo;{item.blessing}&rdquo;
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Subtle blooming glow effect */}
                {isBloomed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#d4af37] flex items-center justify-center text-white shadow-sm"
                  >
                    <Heart className="w-3.5 h-3.5 fill-white" />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
