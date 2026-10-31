import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#FFFDF9] via-[#FFF5F6] to-[#FCEEEA]"
    >
      <div className="relative flex flex-col items-center">
        {/* Pulsing Aura */}
        <div className="absolute w-44 h-44 rounded-full bg-gradient-to-tr from-[#ffe4e6] to-[#fef3c7] blur-2xl animate-pulse" />

        {/* Golden spinning ring */}
        <div className="w-24 h-24 rounded-full border-2 border-[#d4af37]/30 border-t-[#b76e79] border-r-[#d4af37] animate-spin flex items-center justify-center">
          {/* Inner Heart */}
          <div className="w-14 h-14 rounded-full bg-white/90 shadow-md flex items-center justify-center">
            <Heart className="w-7 h-7 text-[#b76e79] fill-[#b76e79] animate-pulse" />
          </div>
        </div>

        {/* Text */}
        <div className="mt-6 text-center">
          <p className="font-serif text-lg font-bold text-[#4a3b32] tracking-wider">
            Preparing Something Beautiful
          </p>
          <p className="font-cormorant italic text-sm text-[#9c535e] mt-1 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            With all my love for Amma...
          </p>
        </div>
      </div>
    </motion.div>
  );
}
