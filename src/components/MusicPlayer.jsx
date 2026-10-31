import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Music, Disc3, Sparkles, Heart } from 'lucide-react';
import { musicBoxSynth } from '../utils/audioSynth';

export default function MusicPlayer({ isPlaying, onTogglePlay }) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(26);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [audioSourceMode, setAudioSourceMode] = useState('mp3'); // 'mp3' or 'synth'
  const audioRef = useRef(null);

  // Sync with HTML5 audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = isMuted ? 0 : volume;

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleTimeUpdate = () => {
      if (audioSourceMode === 'mp3') {
        setCurrentTime(audio.currentTime);
      }
    };

    const handleEnded = () => {
      // Loop song
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

    const handleError = () => {
      // If MP3 fails, seamlessly fallback to built-in musicBoxSynth
      console.info('Switching to built-in music box synthesizer fallback.');
      setAudioSourceMode('synth');
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [audioSourceMode, isMuted, volume]);

  // Handle master play/pause synchronization
  useEffect(() => {
    const audio = audioRef.current;

    if (isPlaying) {
      if (audioSourceMode === 'mp3' && audio) {
        audio.play().catch((err) => {
          console.warn('Audio play restricted or file not ready, falling back to synthesizer:', err);
          setAudioSourceMode('synth');
          musicBoxSynth.play(currentTime);
        });
      } else {
        musicBoxSynth.play(currentTime);
      }
    } else {
      if (audio) audio.pause();
      musicBoxSynth.pause();
    }
  }, [isPlaying, audioSourceMode]);

  // Sync synthesizer time updates
  useEffect(() => {
    musicBoxSynth.setVolume(isMuted ? 0 : volume);
    musicBoxSynth.onTimeUpdate = (time, dur) => {
      if (audioSourceMode === 'synth') {
        setCurrentTime(time);
        setDuration(dur);
      }
    };
  }, [audioSourceMode, isMuted, volume]);

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioSourceMode === 'mp3' && audioRef.current) {
      audioRef.current.currentTime = newTime;
    } else {
      musicBoxSynth.seek(newTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
    }
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
    musicBoxSynth.setVolume(newVol);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.volume = !isMuted ? 0 : volume;
    }
    musicBoxSynth.setVolume(!isMuted ? 0 : volume);
  };

  const formatTime = (secs) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section id="music" className="py-24 px-4 relative z-20">
      {/* Underlying Audio Element */}
      <audio ref={audioRef} src="/music/birthday-song.mp3" preload="auto" loop />

      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#e0a9af]/40 shadow-sm text-xs font-semibold text-[#9c535e] uppercase tracking-widest mb-3"
          >
            <Music className="w-3.5 h-3.5 text-[#d4af37]" />
            A Melodic Tribute
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#4a3b32]"
          >
            A Song <span className="gold-gradient-text">Just For You, Amma</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-[#733841]/80 font-cormorant italic text-lg sm:text-xl mt-2"
          >
            A delicate birthday melody composed with love, tenderness, and reverence.
          </motion.p>
        </div>

        {/* Luxury Glassmorphism Music Player Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-white/90 via-[#fff8f9]/85 to-[#fdfbf7]/90 backdrop-blur-2xl border-2 border-[#d4af37]/40 shadow-[0_25px_60px_-15px_rgba(183,110,121,0.22)] overflow-hidden"
        >
          {/* Floating musical notes */}
          {isPlaying && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {['♪', '♫', '♩', '♬', '❤️', '✨'].map((note, idx) => (
                <motion.div
                  key={idx}
                  className="absolute text-lg sm:text-xl text-[#b76e79]/70 font-serif"
                  style={{ left: `${15 + idx * 15}%`, bottom: '20%' }}
                  animate={{
                    y: [0, -120],
                    x: [0, (idx % 2 === 0 ? 25 : -25)],
                    opacity: [0, 1, 0],
                    scale: [0.7, 1.2, 0.6],
                  }}
                  transition={{
                    duration: 3 + (idx % 2),
                    repeat: Infinity,
                    delay: idx * 0.6,
                    ease: 'easeOut',
                  }}
                >
                  {note}
                </motion.div>
              ))}
            </div>
          )}

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Spinning Rose Gold Vinyl Disc */}
            <div className="relative shrink-0">
              <div
                className={`w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-tr from-[#2d1b20] via-[#59313b] to-[#1f1115] p-3 shadow-[0_15px_35px_rgba(183,110,121,0.35)] flex items-center justify-center border-4 border-[#d4af37]/60 transition-transform ${
                  isPlaying ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '8s' }}
              >
                {/* Grooves */}
                <div className="w-full h-full rounded-full border border-white/10 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 rounded-full border border-white/10 flex items-center justify-center">
                    {/* Center Vinyl Label */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#b76e79] to-[#d4af37] p-0.5 flex items-center justify-center shadow-inner">
                      <div className="w-full h-full rounded-full bg-[#fdfbf7] flex flex-col items-center justify-center text-center p-1">
                        <Heart className="w-4 h-4 text-[#b76e79] fill-[#b76e79]" />
                        <span className="text-[7px] font-serif font-bold text-[#9c535e] uppercase">
                          Amma
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tonearm needle decorative indicator */}
              <div className="absolute -top-2 right-2 w-8 h-8 rounded-full bg-gradient-to-tr from-[#d4af37] to-[#fef08a] border border-white flex items-center justify-center shadow-sm">
                <Disc3 className="w-4 h-4 text-[#733841]" />
              </div>
            </div>

            {/* Controls & Visualizer */}
            <div className="flex-1 w-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-sans font-semibold tracking-wider text-[#9c535e] uppercase">
                    Track: Amma&apos;s Birthday Serenade
                  </span>
                  <span className="text-[10px] uppercase font-sans tracking-widest px-2.5 py-0.5 rounded-full bg-[#ffe4e6] text-[#b76e79] font-medium">
                    {audioSourceMode === 'mp3' ? 'MP3 Audio' : 'Music Box Synth'}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#4a3b32] mt-1 mb-2">
                  To The Best Mother In The Universe
                </h3>

                <p className="font-cormorant text-base sm:text-lg italic text-[#733841]">
                  &ldquo;A melody that echoes the love you have showered upon me every single day.&rdquo;
                </p>
              </div>

              {/* Animated Music Visualizer Bars */}
              <div className="my-6 flex items-end justify-center sm:justify-start gap-1 sm:gap-1.5 h-12 bg-white/50 p-2.5 rounded-2xl border border-[#e0a9af]/30 shadow-inner">
                {[
                  35, 60, 85, 45, 95, 70, 50, 80, 100, 65, 40, 90, 75, 55, 85, 45, 70, 95, 60, 40, 75, 85, 50, 65
                ].map((barHeight, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 sm:w-2 rounded-full bg-gradient-to-t from-[#b76e79] via-[#e0a9af] to-[#d4af37]"
                    animate={
                      isPlaying
                        ? {
                            height: [`${barHeight * 0.25}%`, `${barHeight}%`, `${barHeight * 0.4}%`],
                          }
                        : { height: '15%' }
                    }
                    transition={{
                      duration: 0.6 + (i % 4) * 0.15,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>

              {/* Progress Slider */}
              <div className="space-y-1.5">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  step="0.1"
                  value={currentTime}
                  onChange={handleSeek}
                  aria-label="Audio progress scrubber"
                  className="w-full h-1.5 bg-[#e0a9af]/40 rounded-lg appearance-none cursor-pointer accent-[#b76e79]"
                />
                <div className="flex justify-between text-xs text-[#9c535e] font-sans font-medium">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Playback Controls & Volume */}
              <div className="mt-5 flex items-center justify-between pt-2">
                {/* Master Play/Pause Button */}
                <button
                  onClick={onTogglePlay}
                  className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#b76e79] via-[#c47c87] to-[#d4af37] text-white flex items-center justify-center shadow-[0_8px_20px_rgba(183,110,121,0.4)] hover:shadow-[0_12px_28px_rgba(183,110,121,0.55)] active:scale-95 transition-all cursor-pointer group"
                  aria-label={isPlaying ? 'Pause music' : 'Play music'}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 fill-white" />
                  ) : (
                    <Play className="w-6 h-6 fill-white ml-0.5 group-hover:scale-110 transition-transform" />
                  )}
                </button>

                {/* Volume Slider & Mute Toggle */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-full text-[#733841] hover:bg-[#ffe4e6] transition-colors cursor-pointer"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-[#b76e79]" />
                    )}
                  </button>

                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    aria-label="Volume controller"
                    className="w-20 sm:w-28 h-1.5 bg-[#e0a9af]/40 rounded-lg appearance-none cursor-pointer accent-[#b76e79]"
                  />
                </div>
              </div>

              {/* Note on custom song replacement */}
              <div className="mt-4 pt-3 border-t border-[#e0a9af]/20 flex items-center justify-between text-[11px] text-[#9c535e]/80">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                  Custom audio path: <code className="font-mono text-[#733841]">public/music/birthday-song.mp3</code>
                </span>
                <button
                  onClick={() => setAudioSourceMode(audioSourceMode === 'mp3' ? 'synth' : 'mp3')}
                  className="underline hover:text-[#733841] cursor-pointer"
                >
                  Switch to {audioSourceMode === 'mp3' ? 'Music Box Synth' : 'MP3 Audio'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
