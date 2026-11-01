"use client";

/**
 * Tiny WebAudio synth — no audio assets to download, so sounds work offline
 * and add zero bytes to the bundle. Every call is guarded: if the browser
 * blocks audio (no user gesture yet) nothing breaks.
 */

let ctx: AudioContext | null = null;

function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
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

type Tone = { f: number; t: number; d: number; type?: OscillatorType; gain?: number };

function play(tones: Tone[], enabled: boolean) {
  if (!enabled) return;
  const ac = audio();
  if (!ac) return;
  const now = ac.currentTime;
  for (const tone of tones) {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = tone.type ?? "sine";
    osc.frequency.setValueAtTime(tone.f, now + tone.t);
    gain.gain.setValueAtTime(0.0001, now + tone.t);
    gain.gain.exponentialRampToValueAtTime(tone.gain ?? 0.08, now + tone.t + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + tone.t + tone.d);
    osc.connect(gain).connect(ac.destination);
    osc.start(now + tone.t);
    osc.stop(now + tone.t + tone.d + 0.02);
  }
}

export const sfx = {
  correct(enabled: boolean) {
    play(
      [
        { f: 660, t: 0, d: 0.1, type: "triangle", gain: 0.07 },
        { f: 990, t: 0.07, d: 0.14, type: "triangle", gain: 0.06 },
      ],
      enabled,
    );
  },
  wrong(enabled: boolean) {
    play(
      [
        { f: 200, t: 0, d: 0.16, type: "sawtooth", gain: 0.035 },
        { f: 150, t: 0.09, d: 0.2, type: "sine", gain: 0.05 },
      ],
      enabled,
    );
  },
  levelUp(enabled: boolean) {
    play(
      [
        { f: 523, t: 0, d: 0.12, type: "triangle" },
        { f: 659, t: 0.1, d: 0.12, type: "triangle" },
        { f: 784, t: 0.2, d: 0.16, type: "triangle" },
        { f: 1047, t: 0.32, d: 0.24, type: "triangle" },
      ],
      enabled,
    );
  },
  tap(enabled: boolean) {
    play([{ f: 420, t: 0, d: 0.05, type: "sine", gain: 0.04 }], enabled);
  },
};

export function haptic(pattern: number | number[], enabled: boolean) {
  if (!enabled || typeof navigator === "undefined" || !("vibrate" in navigator)) return;
  try {
    navigator.vibrate(pattern);
  } catch {
    /* ignored */
  }
}
