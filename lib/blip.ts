// ============================================================
// Tiny 8-bit blip engine — Web Audio square-wave chiptune SFX.
// AudioContext is created lazily on first user gesture (browser
// autoplay policy). Mute state persists in localStorage.
// ============================================================

type BlipKind = "start" | "select";

let ctx: AudioContext | null = null;
let muted = false;

if (typeof window !== "undefined") {
  try {
    muted = window.localStorage.getItem("blip-muted") === "1";
  } catch {
    /* private mode — default to sound on */
  }
}

function ensureCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

/** One square-wave note. */
function note(
  ac: AudioContext,
  freq: number,
  t0: number,
  dur: number,
  gain: number
) {
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = "square";
  osc.frequency.value = freq;
  g.gain.setValueAtTime(gain, t0);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g).connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}

/** Play a short chiptune blip. Safe to call anywhere; no-ops when muted. */
export function playBlip(kind: BlipKind = "select") {
  if (muted) return;
  const ac = ensureCtx();
  if (!ac) return;
  const t = ac.currentTime;
  const G = 0.035;
  if (kind === "start") {
    // rising two-note fanfare: E5 → A5
    note(ac, 659.25, t, 0.07, G);
    note(ac, 880.0, t + 0.08, 0.11, G);
  } else {
    // short menu blip: A5
    note(ac, 880.0, t, 0.05, G);
  }
}

export function isMuted() {
  return muted;
}

export function setMuted(v: boolean) {
  muted = v;
  try {
    window.localStorage.setItem("blip-muted", v ? "1" : "0");
  } catch {
    /* ignore */
  }
}
