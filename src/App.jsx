import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// Components
import LoadingScreen from './components/LoadingScreen';
import IntroEnvelope from './components/IntroEnvelope';
import BackgroundAmbience from './components/BackgroundAmbience';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import HeartLetter from './components/HeartLetter';
import SpecialReasons from './components/SpecialReasons';
import WishesSection from './components/WishesSection';
import InteractiveCake from './components/InteractiveCake';
import MusicPlayer from './components/MusicPlayer';
import FinalSurprise from './components/FinalSurprise';
import Footer from './components/Footer';
import FloatingControls from './components/FloatingControls';
import { soundEffects } from './utils/soundEffects';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasOpenedSurprise, setHasOpenedSurprise] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Initial loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Track active section for navigation
  useEffect(() => {
    if (!hasOpenedSurprise) return;

    const sections = ['hero', 'letter', 'reasons', 'wishes', 'cake', 'music'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasOpenedSurprise]);

  const handleOpenEnvelope = () => {
    setHasOpenedSurprise(true);
    // Automatically start the sweet birthday melody on opening the surprise
    setIsMusicPlaying(true);
  };

  const toggleMusic = () => {
    soundEffects.init();
    setIsMusicPlaying((prev) => !prev);
  };

  const handleDiscover = () => {
    const el = document.getElementById('letter');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePlaySongCta = () => {
    setIsMusicPlaying(true);
    const el = document.getElementById('music');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCelebrateAgain = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#4A3B32] selection:bg-[#fce8eb] selection:text-[#9c535e] relative">
      {/* 1. Custom Preloader */}
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      {/* 2. Full-Screen Magical Introduction Envelope */}
      <AnimatePresence>
        {!isLoading && !hasOpenedSurprise && (
          <IntroEnvelope onOpen={handleOpenEnvelope} />
        )}
      </AnimatePresence>

      {/* 3. Main Celebration Website (revealed upon opening envelope) */}
      {hasOpenedSurprise && (
        <>
          {/* Ambient Background Petals, Butterflies, and Sparkles */}
          <BackgroundAmbience />

          {/* Fixed / Floating Luxury Navigation Bar */}
          <Navigation
            activeSection={activeSection}
            isMusicPlaying={isMusicPlaying}
            toggleMusic={toggleMusic}
          />

          <main>
            {/* Section 2: Hero Birthday Celebration */}
            <HeroSection
              onDiscover={handleDiscover}
              onPlaySong={handlePlaySongCta}
            />

            {/* Section 3: A Letter From My Heart */}
            <HeartLetter />

            {/* Section 4: Reasons Why You Are Special */}
            <SpecialReasons />

            {/* Section 5: Beautiful Birthday Wishes */}
            <WishesSection />

            {/* Section 6: Interactive Birthday Cake */}
            <InteractiveCake />

            {/* Section 7: Special Birthday Song */}
            <MusicPlayer
              isPlaying={isMusicPlaying}
              onTogglePlay={toggleMusic}
            />

            {/* Section 8: Final Surprise */}
            <FinalSurprise onCelebrateAgain={handleCelebrateAgain} />
          </main>

          {/* Footer */}
          <Footer />

          {/* Floating Music and Back-To-Top Controls */}
          <FloatingControls
            isMusicPlaying={isMusicPlaying}
            toggleMusic={toggleMusic}
          />
        </>
      )}
    </div>
  );
}
