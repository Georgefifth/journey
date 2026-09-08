"use client";

import { motion } from "framer-motion";
import type { Hackathon } from "../data/hackathons";

type Props = {
  hackathon: Hackathon;
  index: number;
};

const statusConfig = {
  "in-battle": { label: "IN BATTLE", badgeClass: "badge-battle", icon: "⚔️" },
  victorious: { label: "VICTORY!", badgeClass: "badge-victory", icon: "🏆" },
  "not-encountered": { label: "???", badgeClass: "badge-unknown", icon: "❓" },
};

export default function BossEncounter({ hackathon, index }: Props) {
  const status = statusConfig[hackathon.status];
  const hpPercent = (hackathon.hp / hackathon.maxHp) * 100;

  return (
    <motion.article
      id={hackathon.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="mb-12"
    >
      {/* Encounter header — boss appears */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 150, delay: 0.2 }}
          className="boss-emoji"
        >
          {hackathon.bossEmoji}
        </motion.div>
        <div>
          <div className="pixel-font text-xs text-[var(--dq-gold)] mb-1">
            {status.icon} {status.label}
          </div>
          <div className="font-bold text-2xl text-[var(--dq-cream)]">
            {hackathon.bossName}
          </div>
        </div>
      </div>

      {/* DQ Dialogue Box — the main card */}
      <div className="dq-box">
        <div className="dq-box-inner">
          {/* Quest info line */}
          <div className="flex flex-wrap items-center gap-3 mb-4 pb-3 border-b border-[var(--dq-border)]">
            <span className={`badge ${status.badgeClass}`}>
              {status.label}
            </span>
            <span className="text-[var(--dq-text)] text-sm">
              QUEST: {hackathon.name}
            </span>
            <span className="text-[var(--dq-gold)] text-sm">
              LV.{hackathon.level}
            </span>
          </div>

          {/* Project name */}
          <h2 className="pixel-font text-lg text-[var(--dq-gold)] mb-2 title-glow">
            {hackathon.project}
          </h2>

          {/* Tagline — italic RPG flavor text */}
          <p className="italic text-[var(--dq-cream)] text-lg mb-5 leading-relaxed">
            &ldquo;{hackathon.tagline}&rdquo;
          </p>

          {/* HP Bar */}
          <div className="mb-5">
            <div className="flex justify-between items-center mb-1">
              <span className="pixel-font text-[8px] text-[var(--dq-text)]">
                BOSS HP
              </span>
              <span className="text-sm text-[var(--dq-text)] font-mono">
                {hackathon.hp} / {hackathon.maxHp}
              </span>
            </div>
            <div className="hp-bar-container">
              <motion.div
                className="hp-bar-fill"
                initial={{ width: 0 }}
                whileInView={{ width: `${hpPercent}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              />
            </div>
          </div>

          {/* Story — RPG dialogue style */}
          <div className="mb-5">
            <p className="text-[var(--dq-cream)] leading-relaxed">
              {hackathon.story}
            </p>
          </div>

          {/* Inventory — tech stack as items */}
          <div className="mb-5">
            <div className="pixel-font text-[8px] text-[var(--dq-gold)] mb-2">
              INVENTORY:
            </div>
            <div className="flex flex-wrap gap-2">
              {hackathon.stack.map((item) => (
                <span key={item} className="item-tag">
                  📦 {item}
                </span>
              ))}
            </div>
          </div>

          {/* Commands — demo/repo links */}
          {(hackathon.demo || hackathon.repo) && (
            <div className="flex flex-wrap gap-3 mb-5">
              {hackathon.demo && (
                <a
                  href={hackathon.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cmd-link"
                >
                  ▶ DEMO
                </a>
              )}
              {hackathon.repo && (
                <a
                  href={hackathon.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cmd-link"
                >
                  ▶ REPO
                </a>
              )}
            </div>
          )}

          {/* Reward */}
          <div className="mb-5 pt-3 border-t border-[var(--dq-border)]">
            <div className="pixel-font text-[8px] text-[var(--dq-gold)] mb-1">
              REWARD:
            </div>
            <p className="text-[var(--dq-cream)] text-sm italic">
              💰 {hackathon.reward}
            </p>
          </div>

          {/* Learnings — EXP gained */}
          <div className="pt-3 border-t border-[var(--dq-border)]">
            <div className="pixel-font text-[8px] text-[var(--dq-purple)] mb-3">
              ✨ EXP GAINED:
            </div>
            <ul className="space-y-2">
              {hackathon.learnings.map((learning, i) => (
                <li
                  key={i}
                  className="text-[var(--dq-cream)] text-sm leading-relaxed flex gap-2"
                >
                  <span className="text-[var(--dq-gold)] shrink-0">▸</span>
                  <span>{learning}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Continue arrow */}
      <div className="flex justify-center mt-4">
        <span className="dq-arrow pixel-font text-xs">▼</span>
      </div>
    </motion.article>
  );
}
