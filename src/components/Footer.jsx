import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 bg-[#140508] text-[#e0a9af] border-t border-[#d4af37]/20 relative z-20">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Heart icon badge */}
        <div className="w-10 h-10 rounded-full bg-white/5 border border-[#d4af37]/40 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
          <Heart className="w-4 h-4 text-[#ffd700] fill-[#ffd700]" />
        </div>

        <p className="font-serif text-lg font-bold text-white mb-1">
          Made With Endless Love For Amma
        </p>

        <p className="font-cormorant text-base italic text-[#f7e7ce]/80 max-w-md mb-6">
          &ldquo;She gave me love, and everything. Today, I want to give her a little happiness in return.&rdquo;
        </p>

        <div className="flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-[#9c535e]">
          <span>With Eternal Love, Rishith</span>
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>{currentYear}</span>
        </div>
      </div>
    </footer>
  );
}
