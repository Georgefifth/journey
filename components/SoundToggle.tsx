"use client";

import { useEffect, useState } from "react";
import { isMuted, setMuted, playBlip } from "../lib/blip";

/** Fixed bottom-right HUD chip: toggles the 8-bit SFX on/off. */
export default function SoundToggle() {
  const [on, setOn] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // defer sync state from localStorage to avoid setState-in-effect lint error
    const t = window.setTimeout(() => {
      setOn(!isMuted());
      setMounted(true);
    }, 0);
    return () => window.clearTimeout(t);
  }, []);

  if (!mounted) return null;

  const toggle = () => {
    const next = !on;
    setOn(next);
    setMuted(!next);
    if (next) playBlip("select"); // confirm blip when re-enabling
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? "Mute sound effects" : "Unmute sound effects"}
      className="sfx-toggle pixel-font"
    >
      {on ? "SFX ON" : "SFX OFF"}
    </button>
  );
}
