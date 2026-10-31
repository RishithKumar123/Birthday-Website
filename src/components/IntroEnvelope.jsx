import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEffects } from '../utils/soundEffects';
import { musicBoxPlayer } from '../utils/musicBoxPlayer';

export default function IntroEnvelope({ onOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenSurprise = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);

    // Synchronously unlock and prime audio engine immediately on user touch for mobile phones
    try {
      musicBoxPlayer.unlock();
      soundEffects.init();
      soundEffects.playSparkle();
      // Start pristine melody on initial touch gesture
      musicBoxPlayer.play(0);
    } catch {
      // fallback
    }

    // Golden confetti burst from center
    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#b76e79', '#d4af37', '#fce8eb', '#e5c158', '#ffffff'],
        ticks: 200,
        gravity: 0.8,
        scalar: 1.2,
      });
    } catch {
      // fallback
    }

    // Trigger flap opening
    setIsOpen(true);

    // Wait for the envelope opening animation to complete before transitioning into the main celebration
    setTimeout(() => {
      onOpen();
    }, 2200);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.9, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#FFF8F8] via-[#FAF3EC] to-[#FCEEEA] px-4 overflow-hidden"
    >
      {/* Decorative background aura */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#ffe4e6]/40 via-[#fef3c7]/30 to-pink-200/30 blur-3xl -z-10 animate-pulse-glow" />

      {/* Subtle floating gold sparkle particles in intro */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#d4af37]/40"
            style={{
              width: 4 + (i % 3) * 3,
              height: 4 + (i % 3) * 3,
              top: `${(i * 12 + 10) % 85}%`,
              left: `${(i * 15 + 8) % 90}%`,
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.2, 0.9, 0.2],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      <div className="max-w-md w-full text-center flex flex-col items-center">
        {/* Intro Headings */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/70 border border-[#e0a9af]/40 shadow-sm text-xs font-medium text-[#9c535e] tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            A Special Digital Gift
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#4a3b32] leading-tight">
            Something Beautiful <br />
            <span className="gold-gradient-text font-script font-normal text-4xl sm:text-5xl md:text-6xl">
              Is Waiting For You...
            </span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-[#733841]/80 font-cormorant italic text-lg sm:text-xl">
            A little surprise, created with endless love.
          </p>
        </motion.div>

        {/* 3D Envelope Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative w-72 sm:w-80 h-48 sm:h-52 perspective-[1000px] mb-8 group"
        >
          {/* Envelope Body */}
          <div className="relative w-full h-full bg-[#fcedee] rounded-xl shadow-[0_20px_45px_rgba(183,110,121,0.25)] border border-[#e0a9af]/50 overflow-visible flex items-center justify-center">
            
            {/* Inner Letter sliding up when opened */}
            <motion.div
              initial={false}
              animate={isOpen ? { y: -85, opacity: 1, scale: 1.02 } : { y: 0, opacity: 0.8 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute w-[88%] h-[80%] bg-gradient-to-b from-[#fffdfa] to-[#fff6f7] rounded-lg shadow-md border border-[#d4af37]/40 p-4 flex flex-col items-center justify-center z-10"
            >
              <div className="w-full h-full border border-dashed border-[#e0a9af]/60 rounded p-2 flex flex-col items-center justify-center">
                <Heart className="w-7 h-7 text-[#b76e79] fill-[#b76e79] mb-1 animate-pulse" />
                <span className="font-serif text-xs font-semibold tracking-wider text-[#9c535e] uppercase">
                  For Dearest Amma
                </span>
                <span className="font-script text-xl text-[#d4af37]">
                  With Infinite Love
                </span>
              </div>
            </motion.div>

            {/* Front Envelope Pocket (Left, Right, Bottom Triangles) */}
            <div className="absolute inset-0 z-20 pointer-events-none">
              {/* Bottom fold */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0"
                style={{
                  borderBottom: '110px solid #f9e2e5',
                  borderLeft: '144px solid transparent',
                  borderRight: '144px solid transparent',
                  filter: 'drop-shadow(0 -3px 5px rgba(183, 110, 121, 0.08))',
                }}
              />
              {/* Left fold */}
              <div
                className="absolute top-0 bottom-0 left-0 w-0"
                style={{
                  borderLeft: '144px solid #fdecef',
                  borderTop: '96px solid transparent',
                  borderBottom: '96px solid transparent',
                }}
              />
              {/* Right fold */}
              <div
                className="absolute top-0 bottom-0 right-0 w-0"
                style={{
                  borderRight: '144px solid #fdecef',
                  borderTop: '96px solid transparent',
                  borderBottom: '96px solid transparent',
                }}
              />
            </div>

            {/* Envelope Top Flap with 3D open hinge */}
            <motion.div
              initial={false}
              animate={isOpen ? { rotateX: -180, zIndex: 5 } : { rotateX: 0, zIndex: 30 }}
              transition={{ duration: 1.1, ease: 'easeInOut' }}
              style={{
                transformOrigin: 'top center',
                transformStyle: 'preserve-3d',
              }}
              className="absolute top-0 left-0 right-0 h-0 pointer-events-none"
            >
              <div
                style={{
                  borderTop: '108px solid #f3d4d9',
                  borderLeft: '144px solid transparent',
                  borderRight: '144px solid transparent',
                  filter: 'drop-shadow(0 4px 6px rgba(183, 110, 121, 0.15))',
                }}
              />

              {/* Glowing Heart Wax Seal on the flap tip */}
              <motion.div
                animate={isOpen ? { scale: 0, opacity: 0 } : { scale: [1, 1.05, 1], opacity: 1 }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-[32px] left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-gradient-to-tr from-[#9c535e] via-[#b76e79] to-[#d4af37] p-0.5 shadow-[0_0_15px_rgba(183,110,121,0.6)] flex items-center justify-center pointer-events-auto cursor-pointer"
                onClick={handleOpenSurprise}
              >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#b76e79] to-[#733841] flex items-center justify-center border border-[#f7e7ce]/40">
                  <Heart className="w-5 h-5 text-[#fce8eb] fill-[#fce8eb]" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative"
        >
          <button
            onClick={handleOpenSurprise}
            disabled={isOpening || isOpen}
            className="shimmer-btn relative px-8 py-3.5 rounded-full font-serif font-bold text-sm sm:text-base text-white tracking-widest uppercase transition-all duration-300 shadow-[0_12px_28px_rgba(183,110,121,0.35)] hover:shadow-[0_15px_35px_rgba(183,110,121,0.5)] active:scale-95 cursor-pointer disabled:opacity-80 flex items-center gap-3 overflow-hidden bg-gradient-to-r from-[#b76e79] via-[#c47c87] to-[#d4af37]"
          >
            <span>{isOpening ? 'OPENING WITH LOVE...' : 'OPEN YOUR SURPRISE ❤️'}</span>
            <Heart className="w-4 h-4 fill-white animate-pulse" />
          </button>
          
          <p className="text-[11px] text-[#9c535e]/80 mt-2 tracking-wide font-sans">
            Tap the button or envelope to begin the magic
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
