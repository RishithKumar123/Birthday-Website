import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart, Sparkles, RotateCcw, Eye, Feather } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

const letterParagraphs = [
  "Dear Amma,",
  "Words can never explain how much you mean to me.",
  "You are my first teacher, my biggest supporter, my greatest strength, and my safest place.",
  "Your love gives me courage. Your smile gives me happiness. Your sacrifices have shaped my life in ways I can never fully express.",
  "I may not say it every day, but I am forever grateful to have you in my life.",
  "No gift in this world can match the love you have given me.",
  "I wish you endless happiness, good health, beautiful moments, and countless reasons to smile.",
  "Happy Birthday, Amma!",
  "I LOVE YOU FOREVER. ❤️"
];

const fullText = letterParagraphs.join('\n\n');

export default function HeartLetter() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showFullImmediately, setShowFullImmediately] = useState(false);

  // Typewriter effect triggered once when scrolled into view
  useEffect(() => {
    if (!isInView || showFullImmediately) return;

    setIsTyping(true);
    let index = 0;
    setDisplayedText('');

    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 28); // gentle reading speed

    return () => clearInterval(interval);
  }, [isInView, showFullImmediately]);

  const handleReplay = () => {
    soundEffects.playSparkle();
    setShowFullImmediately(false);
    setIsTyping(true);
    setDisplayedText('');
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 25);
  };

  const handleShowAll = () => {
    setShowFullImmediately(true);
    setDisplayedText(fullText);
    setIsTyping(false);
  };

  const activeText = showFullImmediately ? fullText : displayedText;

  return (
    <section id="letter" ref={containerRef} className="py-24 px-4 relative z-20">
      <div className="max-w-3xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-[#e0a9af]/40 shadow-sm text-xs font-semibold text-[#9c535e] uppercase tracking-widest mb-3"
          >
            <Feather className="w-3.5 h-3.5 text-[#d4af37]" />
            From The Depths of My Soul
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#4a3b32]"
          >
            A Letter <span className="rose-gold-text">From My Heart</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-[#733841]/80 font-cormorant italic text-lg sm:text-xl mt-2"
          >
            Every word written with pure love, gratitude, and admiration.
          </motion.p>
        </div>

        {/* Elegant Letter Parchment Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl p-6 sm:p-10 md:p-14 bg-gradient-to-b from-[#FFFDF9] via-[#FFF9F6] to-[#FAF4ED] shadow-[0_25px_60px_-15px_rgba(183,110,121,0.25)] border-2 border-[#e0a9af]/40 overflow-hidden"
        >
          {/* Ornate Gold Corner Flourishes */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#d4af37]/60 rounded-tl-lg pointer-events-none" />
          <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#d4af37]/60 rounded-tr-lg pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#d4af37]/60 rounded-bl-lg pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#d4af37]/60 rounded-br-lg pointer-events-none" />

          {/* Background Watermark Heart */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none">
            <Heart className="w-96 h-96 text-[#b76e79] fill-[#b76e79]" />
          </div>

          {/* Letter Header Date / Location */}
          <div className="flex items-center justify-between border-b border-[#e0a9af]/30 pb-4 mb-8 text-xs font-sans text-[#9c535e] tracking-wider uppercase">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              Dedicated with all my soul
            </span>
            <span>Your Birthday Celebration</span>
          </div>

          {/* Letter Body Text with Typewriter animation */}
          <div className="min-h-[380px] font-cormorant text-xl sm:text-2xl md:text-2xl leading-relaxed text-[#4A3B32] space-y-6">
            {activeText ? (
              activeText.split('\n\n').map((para, idx) => {
                const isSalutation = idx === 0;
                const isSpecialHappy = para.includes("Happy Birthday, Amma!");
                const isEnding = para.includes("I LOVE YOU FOREVER");

                return (
                  <p
                    key={idx}
                    className={`transition-opacity duration-300 ${
                      isSalutation
                        ? 'font-serif font-bold text-2xl sm:text-3xl text-[#9c535e]'
                        : isSpecialHappy
                        ? 'font-serif font-bold text-2xl sm:text-3xl text-[#b76e79] py-2'
                        : isEnding
                        ? 'font-serif font-extrabold text-2xl sm:text-3xl gold-gradient-text tracking-wide'
                        : 'font-normal italic'
                    }`}
                  >
                    {para}
                  </p>
                );
              })
            ) : (
              <p className="italic text-[#9c535e]/60 font-serif">Opening your letter...</p>
            )}

            {/* Blinking typewriter cursor */}
            {isTyping && (
              <span className="inline-block w-2.5 h-6 bg-[#b76e79] ml-1 animate-pulse align-middle" />
            )}
          </div>

          {/* Signature Section */}
          <div className="mt-12 pt-8 border-t border-[#e0a9af]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-xs uppercase font-sans tracking-widest text-[#9c535e] mb-1">
                Eternal Promise
              </p>
              <p className="font-script text-3xl sm:text-4xl text-[#733841]">
                With endless love, Your Child ❤️
              </p>
            </div>

            {/* Rose Gold Wax Seal Decoration */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#9c535e] via-[#b76e79] to-[#d4af37] p-1 shadow-[0_4px_15px_rgba(183,110,121,0.4)] flex items-center justify-center self-end sm:self-center">
              <div className="w-full h-full rounded-full bg-[#881337] flex flex-col items-center justify-center border border-[#f7e7ce]/50 text-white">
                <Heart className="w-5 h-5 fill-white text-white" />
                <span className="text-[8px] font-serif uppercase tracking-widest mt-0.5">
                  Forever
                </span>
              </div>
            </div>
          </div>

          {/* Letter Controls: Replay / Instant View */}
          <div className="mt-8 pt-4 flex items-center justify-end gap-3 text-xs">
            {isTyping && (
              <button
                onClick={handleShowAll}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-[#ffe4e6] text-[#733841] border border-[#e0a9af]/40 transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Read Full Letter</span>
              </button>
            )}

            {!isTyping && (
              <button
                onClick={handleReplay}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-[#ffe4e6] text-[#733841] border border-[#e0a9af]/40 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Replay Typing Effect</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
