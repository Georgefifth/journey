"use client";

import { motion } from "framer-motion";
import PixelSprite from "./pixel/PixelSprite";
import {
  heroMage,
  platform,
  iconSword,
  iconFlame,
  iconTrophy,
} from "./pixel/sprites";

type Props = {
  battles: number;
  inBattle: number;
  victories: number;
  onStart: () => void;
};

export default function TitleScreen({ battles, inBattle, victories, onStart }: Props) {
  return (
    <section className="relative z-10 px-6 pt-16 pb-12 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Hero on a grass platform */}
        <div className="relative inline-block mb-2">
          <div className="hero-bounce">
            <PixelSprite map={heroMage} scale={5} label="The hero, a chibi mage" />
          </div>
          <div className="mt-1 opacity-90">
            <PixelSprite map={platform} scale={4} />
          </div>
        </div>

        {/* Title */}
        <h1 className="pixel-font pixel-title text-2xl sm:text-3xl md:text-4xl mt-6 mb-5 leading-relaxed flicker">
          THE BUILD LOG
        </h1>

        {/* Subtitles */}
        <p className="text-[var(--dq-cream)] text-xl md:text-2xl mb-1 italic">
          A hero&rsquo;s journey through hackathon dungeons
        </p>
        <p className="text-[var(--dq-muted)] text-lg mb-8">
          What I built. What broke. What I learned.
        </p>

        {/* Save-file stats card */}
        <div className="dq-box inline-block px-4 py-3 mb-9">
          <div className="dq-box-inner !p-3 sm:!p-4">
            <div className="flex flex-wrap justify-center items-center gap-x-7 gap-y-2">
              <span className="inline-flex items-center gap-2 text-[var(--dq-cream)] text-lg">
                <PixelSprite map={iconSword} scale={2} />
                BATTLES: <span className="text-[var(--dq-gold)]">{battles}</span>
              </span>
              <span className="inline-flex items-center gap-2 text-[var(--dq-cream)] text-lg">
                <PixelSprite map={iconFlame} scale={2} />
                IN BATTLE: <span className="text-[var(--dq-red)]">{inBattle}</span>
              </span>
              <span className="inline-flex items-center gap-2 text-[var(--dq-cream)] text-lg">
                <PixelSprite map={iconTrophy} scale={2} />
                VICTORIES: <span className="text-[var(--dq-green)]">{victories}</span>
              </span>
            </div>
          </div>
        </div>

        {/* PRESS START */}
        <div className="mt-2">
          <button type="button" className="press-start" onClick={onStart}>
            ▶ PRESS START
          </button>
        </div>
        <p className="kbd-hint mt-3">▼ scroll to enter the dungeon ▼</p>
      </motion.div>
    </section>
  );
}
