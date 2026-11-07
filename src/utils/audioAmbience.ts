// Web Audio API procedural music synthesizer for lively, inspiring study background music
// 100% self-contained, no external mp3 assets needed, zero network lag, works fully offline.

class StudyMusicEngine {
  private ctx: AudioContext | null = null;
  private isMusicPlaying: boolean = false;
  private volume: number = 0.4;
  private masterGain: GainNode | null = null;
  private intervalId: number | null = null;
  private currentStep: number = 0;
  private currentTrack: 'bright_morning' | 'youth_energy' = 'bright_morning';
  private onStateChange: ((isPlaying: boolean, trackName: string) => void) | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Pentatonic & Major scales for bright, cheerful notes (C Major / F Major)
  // Track 1: Nắng Sớm Thanh Xuân (C - G - Am - F) - Inspiring, uplifting, joyful
  // Frequencies (Hz)
  private readonly NOTE_FREQS: Record<string, number> = {
    C3: 130.81,
    E3: 164.81,
    F3: 174.61,
    G3: 196.0,
    A3: 220.0,
    B3: 246.94,
    C4: 261.63,
    D4: 293.66,
    E4: 329.63,
    F4: 349.23,
    G4: 392.0,
    A4: 440.0,
    B4: 493.88,
    C5: 523.25,
    D5: 587.33,
    E5: 659.25,
    G5: 783.99,
    A5: 880.0,
    C6: 1046.5,
  };

  // Upbeat, cheerful sequence: 16-step melody loops
  private readonly MELODY_BRIGHT: { note: string; inst: 'kalimba' | 'bell' | 'bass' }[][] = [
    // Step 0: C chord start
    [{ note: 'C3', inst: 'bass' }, { note: 'C5', inst: 'kalimba' }],
    // Step 1
    [{ note: 'E5', inst: 'kalimba' }],
    // Step 2
    [{ note: 'G5', inst: 'bell' }],
    // Step 3
    [{ note: 'C5', inst: 'kalimba' }],
    // Step 4: G chord
    [{ note: 'G3', inst: 'bass' }, { note: 'D5', inst: 'kalimba' }],
    // Step 5
    [{ note: 'G5', inst: 'bell' }],
    // Step 6
    [{ note: 'B4', inst: 'kalimba' }],
    // Step 7
    [{ note: 'D5', inst: 'bell' }],
    // Step 8: Am chord
    [{ note: 'A3', inst: 'bass' }, { note: 'C5', inst: 'kalimba' }, { note: 'E5', inst: 'bell' }],
    // Step 9
    [{ note: 'A5', inst: 'bell' }],
    // Step 10
    [{ note: 'G5', inst: 'kalimba' }],
    // Step 11
    [{ note: 'E5', inst: 'bell' }],
    // Step 12: F chord
    [{ note: 'F3', inst: 'bass' }, { note: 'A4', inst: 'kalimba' }],
    // Step 13
    [{ note: 'C5', inst: 'bell' }],
    // Step 14
    [{ note: 'F5', inst: 'kalimba' }, { note: 'A5', inst: 'bell' }],
    // Step 15: upbeat transition
    [{ note: 'G5', inst: 'bell' }],
  ];

  // Cheerful chime note synthesizer (Kalimba / Glockenspiel / Marimba sound)
  private playNote(noteName: string, inst: 'kalimba' | 'bell' | 'bass') {
    if (!this.ctx || !this.masterGain) return;
    const freq = this.NOTE_FREQS[noteName];
    if (!freq) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    if (inst === 'kalimba') {
      // Warm, bright marimba / kalimba timbre
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.65);
    } else if (inst === 'bell') {
      // Sparkling glockenspiel bell
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.95);
    } else if (inst === 'bass') {
      // Warm acoustic plucked bass
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.22, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.85);
    }
  }

  // Play celebration / success chime
  playChime() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (Arpeggio)
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.001, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.16, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.65);
      });
    } catch {
      // ignore
    }
  }

  // Start / stop upbeat music
  toggleMusic(callback?: (isPlaying: boolean, trackName: string) => void): boolean {
    try {
      this.initCtx();
      if (!this.ctx) return false;

      if (this.isMusicPlaying) {
        this.stopMusic();
        callback?.(false, this.getTrackTitle());
        this.onStateChange?.(false, this.getTrackTitle());
        return false;
      }

      // Initialize Master Gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Start Upbeat Step Sequencer (130 BPM, 16th notes -> ~115ms per step)
      this.currentStep = 0;
      const stepDurationMs = 150; // Cheerful, bouncy cadence

      this.intervalId = window.setInterval(() => {
        const stepEvents = this.MELODY_BRIGHT[this.currentStep];
        if (stepEvents) {
          stepEvents.forEach((ev) => this.playNote(ev.note, ev.inst));
        }
        this.currentStep = (this.currentStep + 1) % this.MELODY_BRIGHT.length;
      }, stepDurationMs);

      this.isMusicPlaying = true;
      const trackTitle = this.getTrackTitle();
      callback?.(true, trackTitle);
      this.onStateChange?.(true, trackTitle);
      return true;
    } catch {
      this.isMusicPlaying = false;
      callback?.(false, this.getTrackTitle());
      return false;
    }
  }

  stopMusic() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.masterGain) {
      try {
        this.masterGain.disconnect();
      } catch {
        // ignore
      }
      this.masterGain = null;
    }
    this.isMusicPlaying = false;
    this.onStateChange?.(false, this.getTrackTitle());
  }

  setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  getVolume(): number {
    return this.volume;
  }

  isPlaying(): boolean {
    return this.isMusicPlaying;
  }

  getTrackTitle(): string {
    return 'Giai điệu Tươi tắn · Nắng sớm 12A03';
  }

  subscribe(listener: (isPlaying: boolean, trackName: string) => void) {
    this.onStateChange = listener;
  }
}

export const soundEngine = new StudyMusicEngine();
