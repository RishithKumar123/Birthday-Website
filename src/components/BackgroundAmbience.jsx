import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// SVG Rose Petal Component
const RosePetal = ({ color = '#e0a9af', size = 24, rotation = 0 }) => (
  <svg
    width={size}
    height={size * 1.3}
    viewBox="0 0 30 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: `rotate(${rotation}deg)` }}
  >
    <path
      d="M15 2C8 2 2 10 2 22C2 33 10 38 15 38C20 38 28 33 28 22C28 10 22 2 15 2Z"
      fill={`url(#petal-grad-${color.replace('#', '')})`}
      opacity="0.85"
    />
    <path
      d="M15 4C11 12 11 28 15 35"
      stroke="#ffffff"
      strokeWidth="0.8"
      strokeOpacity="0.4"
      strokeLinecap="round"
    />
    <defs>
      <linearGradient id={`petal-grad-${color.replace('#', '')}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fff0f3" />
        <stop offset="50%" stopColor={color} />
        <stop offset="100%" stopColor="#9c535e" />
      </linearGradient>
    </defs>
  </svg>
);

// SVG Butterfly Component with flapping wings
const Butterfly = ({ size = 32, wingColor = '#f7e7ce', accentColor = '#b76e79' }) => (
  <div className="relative inline-block" style={{ width: size, height: size }}>
    <svg viewBox="0 0 100 80" className="w-full h-full overflow-visible">
      {/* Left Wing with subtle CSS flap */}
      <g className="origin-right animate-pulse">
        <path
          d="M50 40 C35 15, 5 10, 5 35 C5 50, 25 55, 45 45 Z"
          fill={wingColor}
          stroke={accentColor}
          strokeWidth="1.5"
          opacity="0.9"
        />
        <path
          d="M48 45 C35 50, 15 65, 25 75 C35 80, 45 65, 48 50 Z"
          fill={accentColor}
          opacity="0.75"
        />
        <circle cx="25" cy="35" r="4" fill="#d4af37" opacity="0.8" />
        <circle cx="28" cy="65" r="3" fill="#ffffff" opacity="0.8" />
      </g>
      {/* Right Wing */}
      <g className="origin-left animate-pulse">
        <path
          d="M50 40 C65 15, 95 10, 95 35 C95 50, 75 55, 55 45 Z"
          fill={wingColor}
          stroke={accentColor}
          strokeWidth="1.5"
          opacity="0.9"
        />
        <path
          d="M52 45 C65 50, 85 65, 75 75 C65 80, 55 65, 52 50 Z"
          fill={accentColor}
          opacity="0.75"
        />
        <circle cx="75" cy="35" r="4" fill="#d4af37" opacity="0.8" />
        <circle cx="72" cy="65" r="3" fill="#ffffff" opacity="0.8" />
      </g>
      {/* Butterfly Body */}
      <ellipse cx="50" cy="45" rx="3" ry="16" fill="#733841" />
      {/* Antennae */}
      <path d="M49 32 Q45 20, 38 18 M51 32 Q55 20, 62 18" stroke="#733841" strokeWidth="1.2" fill="none" />
      <circle cx="38" cy="18" r="1.5" fill="#d4af37" />
      <circle cx="62" cy="18" r="1.5" fill="#d4af37" />
    </svg>
  </div>
);

// Floating Heart SVG
const FloatingHeart = ({ size = 20, color = '#f43f5e' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill={color}
      opacity="0.75"
    />
  </svg>
);

// Sparkle Star SVG
const Sparkle = ({ size = 16, color = '#d4af37' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} opacity="0.85">
    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
  </svg>
);

export default function BackgroundAmbience() {
  // Deterministic petal distribution
  const petals = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      left: `${(i * 7.1 + 4) % 96}%`,
      duration: 12 + (i % 6) * 3,
      delay: (i * 1.5) % 8,
      size: 18 + (i % 4) * 6,
      color: i % 3 === 0 ? '#b76e79' : i % 3 === 1 ? '#e0a9af' : '#fbcfe8',
    }));
  }, []);

  // Floating butterflies
  const butterflies = useMemo(() => [
    { id: 1, top: '15%', left: '8%', delay: 0, duration: 16, scale: 0.9 },
    { id: 2, top: '45%', left: '88%', delay: 3, duration: 19, scale: 1.1 },
    { id: 3, top: '75%', left: '12%', delay: 7, duration: 18, scale: 0.85 },
  ], []);

  // Sparkles
  const sparkles = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      top: `${(i * 8.5 + 5) % 92}%`,
      left: `${(i * 14.3 + 8) % 94}%`,
      size: 10 + (i % 3) * 6,
      duration: 3 + (i % 4),
      delay: (i * 0.7) % 4,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10" aria-hidden="true">
      {/* Ambient background glowing orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-pink-200/25 to-champagne/20 blur-3xl" />
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-rose-200/20 to-champagne-light/30 blur-3xl" />
      <div className="absolute bottom-[-10%] left-[20%] w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-rose-100/30 to-amber-100/20 blur-3xl" />

      {/* Floating Petals */}
      {petals.map(petal => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{ left: petal.left, top: '-50px' }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, Math.sin(petal.id) * 60, Math.cos(petal.id) * -50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: 'linear',
          }}
        >
          <RosePetal color={petal.color} size={petal.size} />
        </motion.div>
      ))}

      {/* Floating Butterflies */}
      {butterflies.map(b => (
        <motion.div
          key={b.id}
          className="absolute"
          style={{ top: b.top, left: b.left }}
          animate={{
            x: [0, 40, -30, 20, 0],
            y: [0, -35, -10, -45, 0],
            rotate: [0, 12, -8, 15, 0],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            delay: b.delay,
            ease: 'easeInOut',
          }}
        >
          <div style={{ transform: `scale(${b.scale})` }}>
            <Butterfly />
          </div>
        </motion.div>
      ))}

      {/* Subtle Golden Sparkles */}
      {sparkles.map(sp => (
        <motion.div
          key={sp.id}
          className="absolute"
          style={{ top: sp.top, left: sp.left }}
          animate={{
            opacity: [0.1, 0.9, 0.1],
            scale: [0.7, 1.2, 0.7],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: sp.duration,
            repeat: Infinity,
            delay: sp.delay,
            ease: 'easeInOut',
          }}
        >
          <Sparkle size={sp.size} />
        </motion.div>
      ))}
    </div>
  );
}
