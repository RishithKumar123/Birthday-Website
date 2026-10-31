import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Flame, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEffects } from '../utils/soundEffects';

export default function InteractiveCake() {
  const [candlesLit, setCandlesLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);
  const [showSmoke, setShowSmoke] = useState(false);

  // Trigger celebration fireworks & multi-angle confetti
  const triggerCelebration = () => {
    try {
      // Center burst
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#b76e79', '#d4af37', '#fce8eb', '#e5c158', '#f43f5e', '#ffffff'],
        ticks: 250,
        gravity: 0.7,
        scalar: 1.2,
      });

      // Left cannon
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: ['#d4af37', '#b76e79', '#ffffff'],
        });
      }, 200);

      // Right cannon
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors: ['#d4af37', '#b76e79', '#ffffff'],
        });
      }, 400);
    } catch {
      // fallback
    }
  };

  const handleMakeWish = () => {
    if (!candlesLit) return;

    // Sound effect of blowing out candle
    soundEffects.playCandleBlow();

    // Trigger smoke puff
    setShowSmoke(true);
    setCandlesLit(false);

    // After slight delay, fire celebratory confetti & celebratory chime
    setTimeout(() => {
      soundEffects.playCelebrationChime();
      triggerCelebration();
      setWishMade(true);
      setShowSmoke(false);
    }, 400);
  };

  const handleRelight = () => {
    soundEffects.playSparkle();
    setCandlesLit(true);
    setWishMade(false);
    setShowSmoke(false);
  };

  return (
    <section id="cake" className="py-24 px-4 relative z-20 overflow-hidden">
      {/* Background warm candlelight glow */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full transition-opacity duration-1000 blur-3xl -z-10 ${
          candlesLit ? 'bg-amber-300/20 opacity-100' : 'bg-rose-200/10 opacity-40'
        }`}
      />

      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#e0a9af]/40 shadow-sm text-xs font-semibold text-[#9c535e] uppercase tracking-widest mb-3"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          A Sweet Royal Tradition
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#4a3b32]"
        >
          Make A Birthday <span className="rose-gold-text">Wish, Amma</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base text-[#733841]/80 font-cormorant italic text-lg sm:text-xl mt-2 mb-10 max-w-xl"
        >
          Close your eyes, whisper a wish into your heart, and blow out the candles.
        </motion.p>

        {/* CSS Three-Tier Cake Container */}
        <div className="relative w-80 sm:w-96 flex flex-col items-center justify-end h-[340px] my-4 select-none">
          {/* Ambient Candle Glow behind top tier */}
          {candlesLit && (
            <div className="absolute top-0 w-32 h-20 bg-amber-200/50 rounded-full blur-xl -z-10 animate-pulse" />
          )}

          {/* 3 Candles on top */}
          <div className="flex items-end justify-center gap-6 sm:gap-8 mb-[-2px] z-30">
            {[0, 1, 2].map((candleIndex) => (
              <div key={candleIndex} className="flex flex-col items-center relative">
                {/* Candle Flame / Smoke */}
                <div className="h-10 flex items-end justify-center relative">
                  {candlesLit ? (
                    <div className="candle-flame w-3.5 h-8 rounded-full bg-gradient-to-t from-[#ff5722] via-[#ffeb3b] to-[#ffffff] shadow-[0_0_15px_#ff9800]" />
                  ) : showSmoke ? (
                    <div className="smoke-puff w-3 h-3 rounded-full bg-gray-400/60 blur-[1px]" />
                  ) : (
                    /* Extinguished black wick */
                    <div className="w-0.5 h-2.5 bg-gray-600 rounded" />
                  )}
                </div>

                {/* Candle Wick */}
                {candlesLit && <div className="w-0.5 h-1.5 bg-gray-800" />}

                {/* Candle Stick */}
                <div className="w-3.5 h-12 rounded-t-sm bg-gradient-to-r from-[#ffd1dc] via-[#ffffff] to-[#ffb6c1] border border-[#e0a9af]/60 shadow-sm relative overflow-hidden">
                  {/* Rose gold spiral stripe */}
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(212,175,55,0.45)_50%,transparent_75%)]" />
                </div>
              </div>
            ))}
          </div>

          {/* Top Tier (Smallest) */}
          <div className="relative w-40 sm:w-48 h-18 bg-gradient-to-r from-[#ffe4e6] via-[#fff5f6] to-[#fce7f3] rounded-t-2xl shadow-md border-t-2 border-x border-[#e0a9af]/60 flex flex-col items-center justify-between z-20 overflow-hidden">
            {/* Frosting Drips */}
            <div className="w-full flex justify-around">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-3 bg-white rounded-b-full shadow-sm -mt-0.5"
                />
              ))}
            </div>

            {/* Gold Pearl Beadings */}
            <div className="w-full flex items-center justify-center gap-2 pb-1.5">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-gradient-to-tr from-[#d4af37] to-[#fef08a] shadow-sm"
                />
              ))}
            </div>
          </div>

          {/* Middle Tier (Medium) */}
          <div className="relative w-56 sm:w-64 h-22 bg-gradient-to-r from-[#fff0f3] via-[#ffccd5] to-[#ffe4e6] rounded-t-2xl shadow-lg border-t-2 border-x border-[#e0a9af]/60 flex flex-col items-center justify-between z-10 overflow-hidden -mt-1">
            {/* White Frosting Swirls */}
            <div className="w-full flex justify-around">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="w-5 h-4 bg-white/95 rounded-b-full shadow-sm -mt-0.5"
                />
              ))}
            </div>

            {/* Rose Gold Filigree Lace Center band */}
            <div className="w-full h-3 bg-gradient-to-r from-[#b76e79] via-[#d4af37] to-[#b76e79] opacity-80 flex items-center justify-center">
              <span className="text-[8px] font-serif text-white tracking-widest uppercase">
                Forever Blessed
              </span>
            </div>

            {/* Pearls bottom line */}
            <div className="w-full flex items-center justify-center gap-2 pb-1.5">
              {[...Array(13)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-gradient-to-tr from-[#d4af37] to-[#fef08a] shadow-sm"
                />
              ))}
            </div>
          </div>

          {/* Bottom Tier (Largest Foundation) */}
          <div className="relative w-72 sm:w-84 h-26 bg-gradient-to-r from-[#ffe4e6] via-[#fff5f6] to-[#fce7f3] rounded-t-2xl shadow-xl border-t-2 border-x border-[#e0a9af]/70 flex flex-col items-center justify-between z-0 overflow-hidden -mt-1">
            {/* Elegant Scalloped Frosting */}
            <div className="w-full flex justify-around">
              {[...Array(11)].map((_, i) => (
                <div
                  key={i}
                  className="w-6 h-5 bg-white rounded-b-full shadow-sm -mt-0.5"
                />
              ))}
            </div>

            {/* Middle heart badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/90 border border-[#d4af37]/50 shadow-sm">
              <Heart className="w-3 h-3 text-[#b76e79] fill-[#b76e79]" />
              <span className="text-[10px] font-serif font-bold text-[#9c535e] tracking-widest uppercase">
                AMMA
              </span>
              <Heart className="w-3 h-3 text-[#b76e79] fill-[#b76e79]" />
            </div>

            {/* Pearl rim */}
            <div className="w-full flex items-center justify-center gap-2 pb-1.5">
              {[...Array(17)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-gradient-to-tr from-[#d4af37] to-[#fef08a] shadow-sm"
                />
              ))}
            </div>
          </div>

          {/* Golden Royal Cake Stand / Pedestal */}
          <div className="w-80 sm:w-96 flex flex-col items-center -mt-1 z-10">
            {/* Stand Plate */}
            <div className="w-full h-4 rounded-full bg-gradient-to-r from-[#aa7c11] via-[#f5d061] to-[#aa7c11] shadow-[0_8px_20px_rgba(212,175,55,0.4)] border border-[#fef08a]" />
            {/* Stand Base */}
            <div className="w-24 h-4 bg-gradient-to-r from-[#8a650e] via-[#d4af37] to-[#8a650e] rounded-b-xl shadow-md" />
          </div>
        </div>

        {/* Wish Announcement Reveal Banner */}
        <AnimatePresence>
          {wishMade && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ duration: 0.6, type: 'spring' }}
              className="mt-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#ffe4e6] via-[#fff1f2] to-[#fef3c7] border-2 border-[#d4af37] shadow-[0_20px_45px_rgba(212,175,55,0.3)] max-w-lg w-full relative overflow-hidden"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-[#d4af37] animate-spin" style={{ animationDuration: '6s' }} />
                <span className="font-serif text-xs font-bold uppercase tracking-widest text-[#9c535e]">
                  Heaven Has Heard Your Heart
                </span>
                <Sparkles className="w-5 h-5 text-[#d4af37] animate-spin" style={{ animationDuration: '6s' }} />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold gold-gradient-text leading-tight my-2">
                May all your wishes come true, Amma! ❤️
              </h3>

              <p className="font-cormorant text-lg italic text-[#733841] mt-2">
                &ldquo;Every wish you make is blessed with all my love and prayers.&rdquo;
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Button: Make a Wish / Relight Candles */}
        <div className="mt-8 flex items-center justify-center gap-4">
          {candlesLit ? (
            <button
              onClick={handleMakeWish}
              className="shimmer-btn relative px-8 py-4 rounded-full font-serif font-bold text-sm tracking-widest uppercase text-white shadow-[0_15px_30px_rgba(183,110,121,0.35)] hover:shadow-[0_20px_40px_rgba(183,110,121,0.5)] active:scale-95 transition-all cursor-pointer bg-gradient-to-r from-[#b76e79] via-[#c47c87] to-[#d4af37] flex items-center gap-3 overflow-hidden"
            >
              <Flame className="w-4 h-4 fill-amber-300 text-amber-300 animate-bounce" />
              <span>MAKE A WISH</span>
              <Heart className="w-4 h-4 fill-white" />
            </button>
          ) : (
            <button
              onClick={handleRelight}
              className="px-7 py-3.5 rounded-full font-serif font-bold text-xs sm:text-sm tracking-widest uppercase text-[#733841] bg-white hover:bg-[#fff0f3] border-2 border-[#d4af37] shadow-[0_10px_25px_rgba(212,175,55,0.25)] active:scale-95 transition-all cursor-pointer flex items-center gap-2.5"
            >
              <RotateCcw className="w-4 h-4 text-[#d4af37]" />
              <span>LIGHT THE CANDLES AGAIN ✨</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
