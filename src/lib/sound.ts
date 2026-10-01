// Tiny chiptune sound effects built with the Web Audio API. No audio files needed.

let ctx: AudioContext | null = null;
let muted = false;

try {
  muted = localStorage.getItem("efn-muted") === "1";
} catch {
  /* storage unavailable */
}

function audio(): AudioContext | null {
  if (muted) return null;
  try {
    if (!ctx) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function tone(freq: number, start: number, dur: number, type: OscillatorType = "square", vol = 0.06) {
  const a = audio();
  if (!a) return;
  const t = a.currentTime + start;
  const osc = a.createOscillator();
  const gain = a.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  gain.gain.setValueAtTime(vol, t);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(gain).connect(a.destination);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

export const sfx = {
  coin() {
    tone(988, 0, 0.08);
    tone(1319, 0.08, 0.35);
  },
  blip() {
    tone(660, 0, 0.04, "square", 0.03);
  },
  select() {
    tone(523, 0, 0.05, "square", 0.04);
    tone(784, 0.05, 0.08, "square", 0.04);
  },
  start() {
    [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, i * 0.07, 0.18, "square", 0.05));
    tone(131, 0, 0.6, "triangle", 0.08);
  },
  achievement() {
    tone(784, 0, 0.07, "square", 0.035);
    tone(1047, 0.07, 0.07, "square", 0.035);
    tone(1568, 0.14, 0.2, "square", 0.035);
  },
};

export function isMuted() {
  return muted;
}

export function setMuted(value: boolean) {
  muted = value;
  try {
    localStorage.setItem("efn-muted", value ? "1" : "0");
  } catch {
    /* storage unavailable */
  }
  if (value && ctx) void ctx.suspend();
}

/** Call from a user gesture so later sounds are allowed to play. */
export function unlockAudio() {
  audio();
}
