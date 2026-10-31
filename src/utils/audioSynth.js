// Beautiful music-box synthesizer for sweet birthday lullaby melody
// Provides immediate audio playback if user hasn't placed an mp3 in public/music yet

class MusicBoxSynthesizer {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.volume = 0.7;
    this.currentTime = 0;
    this.duration = 28; // 28 seconds loop
    this.timerId = null;
    this.startTime = 0;
    this.onTimeUpdate = null;
    this.onEnd = null;
    this.activeNodes = [];

    // "Happy Birthday to Amma" - delicate music-box arrangement
    // [frequency, relativeStartTime, durationInSeconds]
    this.melody = [
      // Hap-py
      { freq: 261.63, time: 0.0, dur: 0.4 }, // C4
      { freq: 261.63, time: 0.5, dur: 0.4 }, // C4
      // Birth-day
      { freq: 293.66, time: 1.0, dur: 0.8 }, // D4
      { freq: 261.63, time: 2.0, dur: 0.8 }, // C4
      // to
      { freq: 349.23, time: 3.0, dur: 0.8 }, // F4
      // you (Amma)
      { freq: 329.63, time: 4.0, dur: 1.6 }, // E4

      // Hap-py
      { freq: 261.63, time: 6.0, dur: 0.4 }, // C4
      { freq: 261.63, time: 6.5, dur: 0.4 }, // C4
      // Birth-day
      { freq: 293.66, time: 7.0, dur: 0.8 }, // D4
      { freq: 261.63, time: 8.0, dur: 0.8 }, // C4
      // to
      { freq: 392.00, time: 9.0, dur: 0.8 }, // G4
      // you
      { freq: 349.23, time: 10.0, dur: 1.6 }, // F4

      // Hap-py
      { freq: 261.63, time: 12.0, dur: 0.4 }, // C4
      { freq: 261.63, time: 12.5, dur: 0.4 }, // C4
      // Birth-day dear
      { freq: 523.25, time: 13.0, dur: 0.8 }, // C5
      { freq: 440.00, time: 14.0, dur: 0.8 }, // A4
      // Am-ma
      { freq: 349.23, time: 15.0, dur: 0.8 }, // F4
      { freq: 329.63, time: 16.0, dur: 0.8 }, // E4
      { freq: 293.66, time: 17.0, dur: 1.4 }, // D4

      // Hap-py
      { freq: 466.16, time: 19.0, dur: 0.4 }, // Bb4
      { freq: 466.16, time: 19.5, dur: 0.4 }, // Bb4
      // Birth-day
      { freq: 440.00, time: 20.0, dur: 0.8 }, // A4
      { freq: 349.23, time: 21.0, dur: 0.8 }, // F4
      // to
      { freq: 392.00, time: 22.0, dur: 0.8 }, // G4
      // you! (chime flourish)
      { freq: 349.23, time: 23.0, dur: 2.5 }, // F4
      { freq: 523.25, time: 24.0, dur: 2.0 }, // C5
      { freq: 698.46, time: 24.5, dur: 2.2 }, // F5
      { freq: 880.00, time: 25.0, dur: 2.5 }, // A5
    ];
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playNote(freq, delayFromNow, noteDuration) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime + delayFromNow;

    // Harmonic 1 (fundamental celesta chime)
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // Harmonic 2 (sparkle chime overtone)
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now);

    // Master note gain
    const masterNoteGain = this.ctx.createGain();
    masterNoteGain.gain.setValueAtTime(this.volume * 0.4, now);

    // Envelope for music box: sharp attack, shimmering exponential decay
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.6, now + 0.015);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + noteDuration);

    gain2.gain.setValueAtTime(0, now);
    gain2.gain.linearRampToValueAtTime(0.2, now + 0.01);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + noteDuration * 0.6);

    osc1.connect(gain1);
    osc2.connect(gain2);

    gain1.connect(masterNoteGain);
    gain2.connect(masterNoteGain);
    masterNoteGain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);

    osc1.stop(now + noteDuration + 0.1);
    osc2.stop(now + noteDuration + 0.1);

    this.activeNodes.push(osc1, osc2);
  }

  play(startOffset = 0) {
    this.init();
    if (!this.ctx) return;

    this.stopAll();
    this.isPlaying = true;
    this.currentTime = startOffset;
    this.startTime = this.ctx.currentTime - startOffset;

    // Schedule remaining notes
    this.melody.forEach(item => {
      if (item.time >= startOffset) {
        const delay = item.time - startOffset;
        this.playNote(item.freq, delay, item.dur);
      }
    });

    // Time update loop
    if (this.timerId) clearInterval(this.timerId);
    this.timerId = setInterval(() => {
      if (!this.isPlaying || !this.ctx) return;
      const elapsed = this.ctx.currentTime - this.startTime;
      if (elapsed >= this.duration) {
        // loop seamlessly
        this.play(0);
      } else {
        this.currentTime = elapsed;
        if (this.onTimeUpdate) {
          this.onTimeUpdate(this.currentTime, this.duration);
        }
      }
    }, 100);
  }

  pause() {
    this.isPlaying = false;
    this.stopAll();
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  stopAll() {
    this.activeNodes.forEach(node => {
      try {
        node.stop();
        node.disconnect();
      } catch {
        // already stopped
      }
    });
    this.activeNodes = [];
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  seek(seconds) {
    const wasPlaying = this.isPlaying;
    this.pause();
    this.currentTime = seconds;
    if (wasPlaying) {
      this.play(seconds);
    } else if (this.onTimeUpdate) {
      this.onTimeUpdate(this.currentTime, this.duration);
    }
  }
}

export const musicBoxSynth = new MusicBoxSynthesizer();
