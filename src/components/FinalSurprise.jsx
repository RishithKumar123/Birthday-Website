import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEffects } from '../utils/soundEffects';

export default function FinalSurprise({ onCelebrateAgain }) {
  const triggerGrandFireworks = () => {
    soundEffects.playCelebrationChime();

    // Multi-stage fireworks cannon
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 },
        colors: ['#ffd700', '#ff69b4', '#ffffff', '#e0a9af'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.6, 0.9), y: Math.random() - 0.2 },
        colors: ['#d4af37', '#b76e79', '#ffffff', '#ffccd5'],
      });
    }, 250);

    if (onCelebrateAgain) {
      onCelebrateAgain();
    }
  };

  return (
    <section className="relative min-h-screen py-24 px-4 flex flex-col items-center justify-center bg-gradient-to-b from-[#2a0e14] via-[#4a1823] to-[#1c080d] text-white overflow-hidden z-20">
      {/* Background Glowing Ambient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

      {/* Floating glowing golden particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-[#ffd700] to-[#ffb6c1]"
            style={{
              width: 3 + (i % 4) * 2,
              height: 3 + (i % 4) * 2,
              top: `${(i * 9 + 4) % 95}%`,
              left: `${(i * 13 + 5) % 95}%`,
            }}
            animate={{
              y: [0, -35, 0],
              opacity: [0.2, 0.9, 0.2],
              scale: [0.8, 1.4, 0.8],
            }}
            transition={{
              duration: 3 + (i % 3) * 1.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center flex flex-col items-center z-10">
        {/* Monogram Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-[#d4af37]/40 text-[#f7e7ce] text-xs font-semibold tracking-widest uppercase mb-8 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
        >
          <Sparkles className="w-4 h-4 text-[#ffd700]" />
          <span>An Eternal Dedication</span>
          <Sparkles className="w-4 h-4 text-[#ffd700]" />
        </motion.div>

        {/* Supporting Emotional Dedication Lines */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-cormorant text-2xl sm:text-3xl italic text-[#fce8eb] mb-3 tracking-wide"
        >
          To My Forever Amma...
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-cormorant text-xl sm:text-2xl text-[#f7e7ce]/90 max-w-2xl leading-relaxed mb-4"
        >
          &ldquo;Thank you for being my mother, my strength, and my greatest blessing.&rdquo;
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="font-cormorant text-lg sm:text-xl italic text-[#e0a9af] mb-8"
        >
          Every heartbeat carries a little more love for you.
        </motion.p>

        {/* Large Final Birthday Text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="my-4"
        >
          <h2 className="font-serif text-4xl sm:text-6xl md:text-8xl font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] via-[#f7e7ce] to-[#e0a9af] drop-shadow-[0_10px_25px_rgba(212,175,55,0.4)]">
            HAPPY BIRTHDAY, AMMA! ❤️
          </h2>
        </motion.div>

        {/* Sub-text: You Are My World */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="font-serif font-bold tracking-widest text-lg sm:text-2xl text-[#ffe4e6] mt-4 mb-12 uppercase drop-shadow-sm"
        >
          YOU ARE MY WORLD. I LOVE YOU FOREVER.
        </motion.p>

        {/* Action Button: CELEBRATE AGAIN */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          <button
            onClick={triggerGrandFireworks}
            className="shimmer-btn relative px-10 py-5 rounded-full font-serif font-bold text-sm sm:text-base tracking-widest uppercase text-[#381119] shadow-[0_15px_40px_rgba(212,175,55,0.4)] hover:shadow-[0_20px_50px_rgba(212,175,55,0.65)] active:scale-95 transition-all cursor-pointer bg-gradient-to-r from-[#ffd700] via-[#fae8ff] to-[#f5d061] flex items-center gap-3 overflow-hidden border-2 border-white/60"
          >
            <PartyPopper className="w-5 h-5 text-[#381119]" />
            <span>CELEBRATE AGAIN 🎉</span>
            <Heart className="w-5 h-5 fill-[#be123c] text-[#be123c]" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
