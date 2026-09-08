"use client";

import { useMemo } from "react";
import PixelSprite from "./pixel/PixelSprite";
import { moon } from "./pixel/sprites";

/** Deterministic PRNG so SSR and client render identical stars */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type StarSpec = {
  left: string;
  top: string;
  delay: string;
  dur: string;
  gold: boolean;
  big: boolean;
};

export default function Starfield({ count = 90 }: { count?: number }) {
  const stars = useMemo<StarSpec[]>(() => {
    const rand = mulberry32(20260908);
    return Array.from({ length: count }, (_, i) => {
      const gold = rand() < 0.3;
      const big = rand() < 0.12;
      return {
        left: `${(rand() * 100).toFixed(2)}%`,
        top: `${(rand() * 100).toFixed(2)}%`,
        delay: `${(rand() * 4).toFixed(2)}s`,
        dur: `${(2.2 + rand() * 3).toFixed(2)}s`,
        gold,
        big,
      };
    });
  }, [count]);

  return (
    <div className="starfield" aria-hidden="true">
      {stars.map((s, i) => (
        <span
          key={i}
          className={`star${s.gold ? " gold" : ""}${s.big ? " big" : ""}`}
          style={
            {
              left: s.left,
              top: s.top,
              "--tw-delay": s.delay,
              "--tw-dur": s.dur,
            } as React.CSSProperties
          }
        />
      ))}
      {/* one rare shooting star */}
      <span
        className="shooting-star"
        style={{ left: "72%", top: "9%", "--tw-delay": "3s" } as React.CSSProperties}
      />
      {/* pixel moon */}
      <div className="absolute right-[8%] top-[6%] opacity-90 float-moon">
        <PixelSprite map={moon} scale={4} />
      </div>
    </div>
  );
}
