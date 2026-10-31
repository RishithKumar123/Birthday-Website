import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, ShieldCheck, Home, Compass, Sun, HeartHandshake } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

const reasons = [
  {
    id: 1,
    title: "MY FIRST TEACHER",
    description: "You taught me how to live, love, and believe in myself.",
    icon: BookOpen,
    accent: "from-[#fce7f3] to-[#ffe4e6]",
    borderColor: "#e0a9af",
    tag: "Wisdom & Grace",
  },
  {
    id: 2,
    title: "MY BIGGEST STRENGTH",
    description: "Your support gives me the courage to face everything.",
    icon: ShieldCheck,
    accent: "from-[#fef3c7] to-[#fae8ff]",
    borderColor: "#d4af37",
    tag: "Unwavering Pillar",
  },
  {
    id: 3,
    title: "MY SAFE PLACE",
    description: "No matter what happens, your presence feels like home.",
    icon: Home,
    accent: "from-[#ffe4e6] to-[#fce7f3]",
    borderColor: "#b76e79",
    tag: "Warmth & Peace",
  },
  {
    id: 4,
    title: "MY INSPIRATION",
    description: "Your dedication and kindness inspire me every day.",
    icon: Compass,
    accent: "from-[#fef9c3] to-[#ffe4e6]",
    borderColor: "#d4af37",
    tag: "Guiding Light",
  },
  {
    id: 5,
    title: "MY HAPPINESS",
    description: "Your smile is one of the most beautiful things in my world.",
    icon: Sun,
    accent: "from-[#ffedd5] to-[#fce7f3]",
    borderColor: "#e0a9af",
    tag: "Pure Joy",
  },
  {
    id: 6,
    title: "MY FOREVER LOVE",
    description: "My love and gratitude for you will never end.",
    icon: HeartHandshake,
    accent: "from-[#fce7f3] to-[#fef3c7]",
    borderColor: "#b76e79",
    tag: "Eternal Bond",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

export default function SpecialReasons() {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <section id="reasons" className="py-24 px-4 relative z-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#e0a9af]/40 shadow-sm text-xs font-semibold text-[#9c535e] uppercase tracking-widest mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            What Makes You Priceless
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#4a3b32]"
          >
            Reasons Why <span className="gold-gradient-text">You Are Special</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-[#733841]/80 font-cormorant italic text-lg sm:text-xl mt-2"
          >
            A million reasons exist, but these six shine like stars in my heart.
          </motion.p>
        </div>

        {/* 6 Cards Grid with staggered entrance */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {reasons.map((item) => {
            const IconComponent = item.icon;
            const isHovered = activeCard === item.id;

            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                onMouseEnter={() => {
                  setActiveCard(item.id);
                  soundEffects.playSparkle();
                }}
                onMouseLeave={() => setActiveCard(null)}
                className="group relative rounded-3xl p-8 bg-white/75 backdrop-blur-xl border border-[#e0a9af]/35 shadow-[0_15px_35px_-10px_rgba(183,110,121,0.12)] hover:shadow-[0_20px_45px_-5px_rgba(183,110,121,0.25)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Background Shimmer Gradient on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 group-hover:opacity-40 transition-opacity duration-500 -z-10`}
                />

                {/* Top Corner Number & Tag */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#ffe4e6] to-[#fef3c7] border border-[#d4af37]/40 flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all duration-300">
                    <IconComponent className="w-6 h-6 text-[#9c535e] group-hover:text-[#b76e79] transition-colors" />
                  </div>

                  <span className="font-serif text-3xl font-bold text-[#b76e79]/30 group-hover:text-[#b76e79]/60 transition-colors">
                    0{item.id}
                  </span>
                </div>

                {/* Card Content */}
                <div>
                  <span className="text-[11px] font-sans font-semibold tracking-widest text-[#9c535e] uppercase">
                    {item.tag}
                  </span>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#4a3b32] mt-1 mb-3 group-hover:text-[#9c535e] transition-colors">
                    {item.title}
                  </h3>

                  <p className="font-cormorant text-lg sm:text-xl italic text-[#5c4a40] leading-relaxed">
                    &ldquo;{item.description}&rdquo;
                  </p>
                </div>

                {/* Bottom Decorative Gold Line */}
                <div className="mt-6 pt-4 border-t border-[#e0a9af]/25 flex items-center justify-between">
                  <span className="text-[10px] tracking-widest text-[#9c535e] uppercase font-medium">
                    With Immense Gratitude
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-[#d4af37] opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
