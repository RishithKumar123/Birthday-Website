import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Music, ChevronDown, Sparkles } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

// Ornate Rose Flower SVG created with layered petals and gradients
const OrnamentalRose = ({ className = '', size = 120, rotation = 0 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={`${className}`}
    style={{ transform: `rotate(${rotation}deg)` }}
  >
    <defs>
      <radialGradient id="roseCenter" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fff5f5" />
        <stop offset="35%" stopColor="#f472b6" />
        <stop offset="70%" stopColor="#be123c" />
        <stop offset="100%" stopColor="#881337" />
      </radialGradient>
      <linearGradient id="goldFiligree" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f5d061" />
        <stop offset="50%" stopColor="#d4af37" />
        <stop offset="100%" stopColor="#aa7c11" />
      </linearGradient>
    </defs>

    {/* Outer Petals */}
    <path
      d="M50 15 C35 15, 20 30, 25 50 C15 65, 30 85, 50 85 C70 85, 85 65, 75 50 C80 30, 65 15, 50 15 Z"
      fill="#fbcfe8"
      opacity="0.8"
    />
    {/* Middle Petals */}
    <path
      d="M50 22 C38 22, 28 35, 32 50 C26 62, 38 78, 50 78 C62 78, 74 62, 68 50 C72 35, 62 22, 50 22 Z"
      fill="url(#roseCenter)"
      opacity="0.85"
    />
    {/* Inner Spiral Petals */}
    <path
      d="M50 32 C43 32, 38 40, 41 50 C38 58, 44 68, 50 68 C56 68, 62 58, 59 50 C62 40, 57 32, 50 32 Z"
      fill="#e11d48"
    />
    <path
      d="M48 40 C45 42, 45 48, 50 52 C53 48, 53 44, 48 40 Z"
      fill="#fdf2f8"
      opacity="0.9"
    />
    {/* Golden stamen sparkles */}
    <circle cx="50" cy="46" r="2.5" fill="url(#goldFiligree)" />
    <circle cx="46" cy="49" r="1.5" fill="#fef08a" />
    <circle cx="53" cy="49" r="1.5" fill="#fef08a" />
  </svg>
);

// Elegant Filigree Floral Divider
const GoldFiligreeDivider = () => (
  <div className="flex items-center justify-center gap-3 my-4 opacity-90">
    <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-r from-transparent via-[#d4af37] to-[#b76e79]" />
    <Sparkles className="w-4 h-4 text-[#d4af37]" />
    <Heart className="w-4 h-4 text-[#b76e79] fill-[#b76e79]" />
    <Sparkles className="w-4 h-4 text-[#d4af37]" />
    <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-l from-transparent via-[#d4af37] to-[#b76e79]" />
  </div>
);

export default function HeroSection({ onDiscover, onPlaySong }) {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      {/* Decorative SVG Flowers along edges */}
      <div className="absolute -top-10 -left-10 opacity-70 pointer-events-none hidden sm:block animate-float-slow">
        <OrnamentalRose size={140} rotation={25} />
      </div>
      <div className="absolute top-1/4 -right-12 opacity-70 pointer-events-none hidden sm:block animate-float-medium">
        <OrnamentalRose size={160} rotation={-35} />
      </div>
      <div className="absolute -bottom-8 left-10 opacity-60 pointer-events-none hidden md:block animate-float-gentle">
        <OrnamentalRose size={110} rotation={60} />
      </div>

      <div className="max-w-4xl mx-auto text-center z-10 flex flex-col items-center">
        {/* Crown / Monogram Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#e0a9af]/50 shadow-sm mb-6"
        >
          <Sparkles className="w-4 h-4 text-[#d4af37]" />
          <span className="font-serif text-xs md:text-sm font-semibold tracking-widest text-[#9c535e] uppercase">
            A Royal Celebration of Love
          </span>
          <Sparkles className="w-4 h-4 text-[#d4af37]" />
        </motion.div>

        {/* Large Elegant Birthday Typography */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <p className="font-cormorant text-2xl sm:text-3xl md:text-4xl italic text-[#733841] mb-2 tracking-wide">
            Wishing The Happiest Birthday To
          </p>

          <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight leading-none my-2">
            <span className="gold-gradient-text block drop-shadow-sm">
              Happy Birthday,
            </span>
            <span className="font-script font-normal text-6xl sm:text-7xl md:text-9xl text-[#b76e79] block -mt-2 sm:-mt-4">
              Amma! ❤️
            </span>
          </h1>
        </motion.div>

        {/* Filigree Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full flex justify-center"
        >
          <GoldFiligreeDivider />
        </motion.div>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-2 text-lg sm:text-xl md:text-2xl text-[#5c4a40] font-cormorant italic max-w-2xl mx-auto leading-relaxed"
        >
          &ldquo;To the woman who makes my world beautiful, every single day.&rdquo;
        </motion.p>

        {/* Two Main Call To Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          {/* Button 1: Discover Your Surprise */}
          <button
            onClick={() => {
              soundEffects.playSparkle();
              onDiscover();
            }}
            className="shimmer-btn relative w-full sm:w-auto px-8 py-4 rounded-full font-serif font-bold text-sm tracking-wider uppercase text-white shadow-[0_15px_30px_rgba(183,110,121,0.35)] hover:shadow-[0_20px_40px_rgba(183,110,121,0.5)] active:scale-95 transition-all cursor-pointer bg-gradient-to-r from-[#b76e79] via-[#c27682] to-[#d4af37] flex items-center justify-center gap-3 overflow-hidden"
          >
            <span>Discover Your Surprise</span>
            <Heart className="w-4 h-4 fill-white animate-pulse" />
          </button>

          {/* Button 2: Play Birthday Song */}
          <button
            onClick={() => {
              soundEffects.playSparkle();
              onPlaySong();
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-full font-serif font-semibold text-sm tracking-wider uppercase text-[#733841] bg-white/90 hover:bg-[#fff0f3] border border-[#d4af37]/60 shadow-[0_10px_25px_rgba(212,175,55,0.18)] hover:shadow-[0_15px_30px_rgba(212,175,55,0.3)] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-3 backdrop-blur-sm"
          >
            <Music className="w-4 h-4 text-[#d4af37]" />
            <span>Play Birthday Song</span>
          </button>
        </motion.div>

        {/* Beautiful Scrolling Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-16 sm:mt-20 flex flex-col items-center gap-2 cursor-pointer group"
          onClick={onDiscover}
        >
          <span className="text-xs font-sans tracking-widest text-[#9c535e] uppercase font-medium group-hover:text-[#b76e79] transition-colors">
            Scroll To Read Your Letter
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-8 h-12 rounded-full border-2 border-[#b76e79]/40 flex items-start justify-center p-1.5 shadow-sm bg-white/50"
          >
            <motion.div
              animate={{ y: [0, 16, 0], opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-2.5 rounded-full bg-gradient-to-b from-[#b76e79] to-[#d4af37]"
            />
          </motion.div>
          <ChevronDown className="w-4 h-4 text-[#b76e79] -mt-1 group-hover:translate-y-1 transition-transform" />
        </motion.div>
      </div>
    </section>
  );
}
