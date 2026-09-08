"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import PixelSprite from "./pixel/PixelSprite";
import {
  slimeBoss,
  iconBox,
  iconChest,
  iconSparkle,
} from "./pixel/sprites";
import type { Hackathon } from "../data/hackathons";

type Props = {
  hackathon: Hackathon;
  index: number;
};

const BOSS_SPRITES: Record<string, typeof slimeBoss> = {
  slime: slimeBoss,
};

const statusConfig = {
  "in-battle": { label: "IN BATTLE", badgeClass: "badge-battle" },
  victorious: { label: "VICTORY!", badgeClass: "badge-victory" },
  "not-encountered": { label: "???", badgeClass: "badge-unknown" },
};

/** Typewriter reveal — respects prefers-reduced-motion */
function useTypewriter(text: string, play: boolean, cps = 60) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!play) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const t = window.setTimeout(() => setN(text.length), 0);
      return () => window.clearTimeout(t);
    }
    const id = window.setInterval(() => {
      setN((v) => {
        if (v >= text.length) {
          window.clearInterval(id);
          return v;
        }
        return v + 1;
      });
    }, 1000 / cps);
    return () => window.clearInterval(id);
  }, [play, text, cps]);
  return { shown: text.slice(0, n), done: n >= text.length };
}

export default function BossEncounter({ hackathon, index }: Props) {
  const status = statusConfig[hackathon.status];
  const sprite = hackathon.bossSprite ? BOSS_SPRITES[hackathon.bossSprite] : undefined;

  const cardRef = useRef<HTMLElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "-80px" });

  // typewriter story
  const { shown, done } = useTypewriter(hackathon.story, inView);

  // animated HP counter
  const ratio = hackathon.hp / hackathon.maxHp;
  const segCount = 10;
  const [dispHp, setDispHp] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const t = window.setTimeout(() => setDispHp(hackathon.hp), 0);
      return () => window.clearTimeout(t);
    }
    const controls = animate(0, hackathon.hp, {
      duration: 1.3,
      delay: 0.35,
      ease: "easeOut",
      onUpdate: (v) => setDispHp(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, hackathon.hp]);

  const litRatio = dispHp / hackathon.maxHp;
  const hpTone = litRatio > 0.6 ? "hp-high" : litRatio > 0.3 ? "hp-mid" : "hp-low";
  const lit = Math.round(litRatio * segCount);

  return (
    <motion.article
      ref={cardRef}
      id={hackathon.id}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="mb-16 scroll-mt-8"
    >
      {/* ── Boss emerges ── */}
      <div className="flex items-center justify-center gap-5 mb-5">
        <motion.div
          initial={{ scale: 0, rotate: -18 }}
          animate={inView ? { scale: 1, rotate: 0 } : undefined}
          transition={{ type: "spring", stiffness: 160, damping: 13, delay: 0.15 }}
          className="relative"
        >
          {sprite ? (
            <PixelSprite
              map={sprite}
              scale={5}
              label={hackathon.bossName}
              className="drop-shadow-[0_0_14px_rgba(77,217,232,0.35)]"
            />
          ) : (
            <span className="boss-emoji">{hackathon.bossEmoji}</span>
          )}
          <div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-2 rounded-[50%] bg-black/50 blur-[2px]"
            aria-hidden="true"
          />
        </motion.div>
        <div className="text-left">
          <span className={`badge ${status.badgeClass} mb-2`}>{status.label}</span>
          <h2 className="pixel-font text-sm sm:text-base text-[var(--dq-cream)] leading-relaxed">
            {hackathon.bossName}
          </h2>
        </div>
      </div>

      {/* ── DQ dialogue box ── */}
      <div className="dq-box">
        <div className="dq-box-inner">
          {/* quest meta */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4 pb-3 border-b border-[rgba(74,74,110,0.6)] text-[17px]">
            <span className="pixel-font text-[8px] text-[var(--dq-gold)]">QUEST</span>
            <span className="text-[var(--dq-cream)]">{hackathon.name}</span>
            <span className="text-[var(--dq-gold)]">LV.{hackathon.level}</span>
            <span className="text-[var(--dq-muted)]">{hackathon.dateLabel}</span>
          </div>

          {/* project name + tagline */}
          <h3 className="pixel-font text-base sm:text-lg text-[var(--dq-gold)] pixel-title mb-3">
            {hackathon.project}
          </h3>
          <p className="text-[var(--dq-cream)] text-xl italic mb-5 leading-snug">
            <span className="text-[var(--dq-gold-dark)]" aria-hidden="true">❝ </span>
            {hackathon.tagline}
            <span className="text-[var(--dq-gold-dark)]" aria-hidden="true"> ❞</span>
          </p>

          {/* HP bar */}
          <div className="mb-5">
            <div className="flex justify-between items-end mb-1.5">
              <span className="pixel-font text-[8px] text-[var(--dq-text)] tracking-widest">
                BOSS HP
              </span>
              <span className="text-lg text-[var(--dq-cream)]" style={{ fontVariantNumeric: "tabular-nums" }}>
                {dispHp} / {hackathon.maxHp}
              </span>
            </div>
            <div className={`hp-bar ${hpTone}`} role="img" aria-label={`Boss HP ${hackathon.hp} of ${hackathon.maxHp}`}>
              {Array.from({ length: segCount }).map((_, i) => (
                <motion.span
                  key={i}
                  className={`hp-seg ${i < lit ? "on" : ""}`}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : undefined}
                  transition={{ delay: 0.35 + i * 0.055 }}
                />
              ))}
            </div>
          </div>

          {/* story — typewriter dialogue */}
          <div className="mb-6 min-h-[96px]">
            <p className="text-[var(--dq-text)] text-lg leading-relaxed">
              {shown}
              {!done && inView && <span className="type-caret" aria-hidden="true" />}
            </p>
          </div>

          {/* inventory */}
          <div className="mb-6">
            <div className="pixel-font text-[8px] text-[var(--dq-gold)] mb-2.5 tracking-widest">
              INVENTORY
            </div>
            <div className="flex flex-wrap gap-2">
              {hackathon.stack.map((item, i) => (
                <motion.span
                  key={item}
                  className="item-tag"
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : undefined}
                  transition={{ delay: 0.7 + i * 0.12 }}
                >
                  <PixelSprite map={iconBox} scale={1.5} />
                  {item}
                </motion.span>
              ))}
            </div>
          </div>

          {/* commands */}
          {(hackathon.demo || hackathon.repo) && (
            <div className="flex flex-wrap gap-3 mb-6">
              {hackathon.demo && (
                <a href={hackathon.demo} target="_blank" rel="noopener noreferrer" className="cmd-link">
                  ▶ DEMO
                </a>
              )}
              {hackathon.repo && (
                <a href={hackathon.repo} target="_blank" rel="noopener noreferrer" className="cmd-link">
                  ▶ REPO
                </a>
              )}
            </div>
          )}

          {/* reward */}
          <div className="mb-6 pt-4 border-t border-[rgba(74,74,110,0.6)]">
            <div className="pixel-font text-[8px] text-[var(--dq-gold)] mb-2 tracking-widest">
              LOOT
            </div>
            <div className="flex items-center gap-3">
              <PixelSprite map={iconChest} scale={2.6} className="shrink-0" />
              <p className="text-[var(--dq-cream)] italic">{hackathon.reward}</p>
            </div>
          </div>

          {/* EXP gained */}
          <div className="pt-4 border-t border-[rgba(74,74,110,0.6)]">
            <div className="flex items-center gap-2 mb-3">
              <PixelSprite map={iconSparkle} scale={1.8} />
              <span className="pixel-font text-[8px] text-[var(--dq-purple)] tracking-widest">
                EXP GAINED
              </span>
            </div>
            <ul className="space-y-2.5">
              {hackathon.learnings.map((learning, i) => (
                <motion.li
                  key={i}
                  className="flex gap-2.5 text-[var(--dq-cream)] text-[17px] leading-relaxed"
                  initial={{ opacity: 0, x: -14 }}
                  animate={inView ? { opacity: 1, x: 0 } : undefined}
                  transition={{ delay: 1.0 + i * 0.16 }}
                >
                  <span className="text-[var(--dq-gold)] shrink-0">▸</span>
                  <span>
                    {learning}
                    <span
                      className="exp-float"
                      style={{ animationDelay: `${1.4 + i * 0.16}s` }}
                      aria-hidden="true"
                    >
                      +EXP
                    </span>
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* continue arrow */}
      <div className="flex justify-center mt-5">
        <span className="dq-arrow pixel-font text-xs" aria-hidden="true">▼</span>
      </div>
    </motion.article>
  );
}
