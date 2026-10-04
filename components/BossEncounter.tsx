"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, animate, useReducedMotion } from "framer-motion";
import PixelSprite from "./pixel/PixelSprite";
import {
  slimeBoss,
  slimeBossBlink,
  iconBox,
  iconChest,
  iconSparkle,
} from "./pixel/sprites";
import { statusConfig, dateLabel, type Hackathon, type Build } from "../data/hackathons";
import Image from "next/image";
import posthog from "posthog-js";
import Link from "next/link";
import GitQuestFeedback from "./GitQuestFeedback";

type Props = {
  hackathon: Hackathon;
  index: number;
};

const BOSS_SPRITES: Record<string, typeof slimeBoss> = {
  slime: slimeBoss,
};

/** Typewriter reveal — respects prefers-reduced-motion; click-to-skip supported */
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
  const skip = useCallback(() => setN(text.length), [text]);
  return { shown: text.slice(0, n), done: n >= text.length, skip };
}

export default function BossEncounter({ hackathon, index }: Props) {
  return <section id={hackathon.id} className="scroll-mt-8" aria-label={hackathon.eventName}>
    {hackathon.builds.length ? hackathon.builds.map(build => <BuildEncounter key={build.id} quest={hackathon} build={build} level={index + 1}/>) : <EmptyQuest hackathon={hackathon} />}
  </section>;
}

function EmptyQuest({ hackathon }: { hackathon: Hackathon }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (inView) posthog.capture("quest_without_public_build_viewed", { quest_id: hackathon.id });
  }, [inView, hackathon.id]);
  return <article ref={ref} className="dq-box mb-10"><div className="dq-box-inner">
      <span className={`badge ${statusConfig[hackathon.status].badgeClass}`}>{statusConfig[hackathon.status].label}</span>
      <h2 className="pixel-font text-[11px] leading-relaxed mt-3 text-[var(--dq-gold)]">{hackathon.eventName}</h2>
      <p className="text-[var(--dq-muted)] mt-2">{dateLabel(hackathon)}</p>
      <p className="mt-3">Registered on Devpost. No public submitted build recorded.</p>
      <a className="cmd-link mt-4" href={hackathon.eventUrl} target="_blank" rel="noopener noreferrer">▶ QUEST DETAILS</a>
      <details className="mt-3 text-[var(--dq-muted)]"><summary>Save-file notes</summary><p>{hackathon.statusEvidence}</p></details>
    </div></article>;
}
function BuildEncounter({quest, build, level}: {quest: Hackathon; build: Build; level: number}) {
  const hackathon = {
    ...quest, id: `${quest.id}-${build.id}`, name: quest.eventName, project: build.projectName,
    dateLabel: dateLabel(quest), tagline: build.description,
    story: build.buildNotes.length > 650 ? build.buildNotes.slice(0,650).replace(/\s+\S*$/, "") + "…" : build.buildNotes || build.description, stack: build.technologies,
    demo: build.demoUrl, repo: build.githubUrl, bossEmoji: "", level,
    hp: statusConfig[quest.status].progress ?? 0, maxHp: 100,
    learnings: build.reflection ? build.reflection.split("\n") : [],
    reward: build.award ?? (quest.status === "COMPLETED" ? "Battle cleared · no award recorded on Devpost" : "A submitted build · verdict unconfirmed"),
  };
  const reduced = useReducedMotion();
  const status = statusConfig[hackathon.status];
  const sprite = hackathon.bossSprite ? BOSS_SPRITES[hackathon.bossSprite] : undefined;

  const cardRef = useRef<HTMLElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "-80px" });

  // typewriter story
  const { shown, done, skip } = useTypewriter(hackathon.story, inView);

  // animated HP counter
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
      initial={false}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: reduced ? 0 : 0.55, ease: "easeOut" }}
      className="mb-16 scroll-mt-8"
    >
      {/* ── Boss emerges ── */}
      <div className="flex items-center justify-center gap-5 mb-5">
        <motion.div
          initial={false}
          animate={inView ? { scale: 1, rotate: 0 } : undefined}
          transition={{ type: "spring", stiffness: 160, damping: 13, delay: 0.15 }}
          className="relative"
        >
          {sprite ? (
            <div className="slime-idle relative drop-shadow-[0_0_14px_rgba(77,217,232,0.35)]">
              <PixelSprite map={sprite} scale={5} label={hackathon.bossName} />
              {/* blink frame — overlays the transparent eye holes briefly */}
              {sprite === slimeBoss && (
                <PixelSprite
                  map={slimeBossBlink}
                  scale={5}
                  className="slime-blink-frame absolute inset-0"
                />
              )}
            </div>
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
          <h2 className="pixel-font text-[10px] sm:text-xs text-[var(--dq-cream)] leading-relaxed break-words">
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
                QUEST PROGRESS
              </span>
              <span className="text-lg text-[var(--dq-cream)]" style={{ fontVariantNumeric: "tabular-nums" }}>
                {dispHp}%
              </span>
            </div>
            <div className={`hp-bar ${hpTone}`} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={hackathon.hp} aria-label="Quest progress (status metaphor)">
              {Array.from({ length: segCount }).map((_, i) => (
                <motion.span
                  key={i}
                  className={`hp-seg ${i < lit ? "on" : ""}`}
                  initial={false}
                  animate={inView ? { opacity: 1 } : undefined}
                  transition={{ delay: 0.35 + i * 0.055 }}
                />
              ))}
            </div>
          </div>

          <p className="text-[var(--dq-muted)] text-[15px] -mt-3 mb-5">A status metaphor, not a measurement of work completed.</p>
          {build.image && <Image src={build.image} alt={`${build.projectName} project preview from Devpost`} width={build.imageWidth ?? 640} height={build.imageHeight ?? 400} className="build-thumbnail mb-5" sizes="(max-width: 640px) 90vw, 640px"/>}
          {/* story — typewriter dialogue (click to skip) */}
          <div className="mb-6 dialogue-story">
            <p
              className="relative text-[var(--dq-text)] text-lg leading-relaxed cursor-pointer select-none"
              onClick={skip}
              onKeyDown={e => {if(e.key === "Enter" || e.key === " ") {e.preventDefault();skip();}}}
              tabIndex={0}
              role="button"
              aria-label="Reveal full build notes"
              title="Click or press Enter to reveal full notes"
            >
              <span className="sr-only">{hackathon.story}</span>
              <span className="invisible" aria-hidden="true">{hackathon.story}</span>
              <span className="absolute inset-0" aria-hidden="true">{shown}{!done && inView && <span className="type-caret" />}</span>
            </p>
          </div>

          {build.buildNotes.length > 650 && <details className="mb-6"><summary className="text-[var(--dq-gold)]">Read full build notes</summary><p className="mt-2">{build.buildNotes}</p></details>}
          {/* inventory */}
          {hackathon.stack.length > 0 && <div className="mb-6">
            <div className="pixel-font text-[8px] text-[var(--dq-gold)] mb-2.5 tracking-widest">
              INVENTORY
            </div>
            <div className="flex flex-wrap gap-2">
              {hackathon.stack.map((item, i) => (
                <motion.span
                  key={item}
                  className="item-tag"
                  initial={false}
                  animate={inView ? { opacity: 1, y: 0 } : undefined}
                  transition={{ delay: 0.7 + i * 0.12 }}
                >
                  <PixelSprite map={iconBox} scale={1.5} />
                  {item}
                </motion.span>
              ))}
            </div>
          </div>

          }
          {/* commands */}
          {(
            <div className="flex flex-wrap gap-3 mb-6">
              <a href={build.devpostUrl} target="_blank" rel="noopener noreferrer" className="cmd-link" onClick={() => posthog.capture("build_link_opened", { build_id: build.id, destination: "devpost" })}>▶ DEVPOST</a>
              {hackathon.demo && (
                <a href={hackathon.demo} target="_blank" rel="noopener noreferrer" className="cmd-link" onClick={() => {
                  posthog.capture("build_link_opened", { build_id: build.id, destination: "demo" });
                  if (build.id === "gitquest") posthog.capture("gitquest_demo_opened", { build_id: build.id });
                }}>
                  ▶ DEMO
                </a>
              )}
              {hackathon.repo && (
                <a href={hackathon.repo} target="_blank" rel="noopener noreferrer" className="cmd-link" onClick={() => posthog.capture("build_link_opened", { build_id: build.id, destination: "github" })}>
                  ▶ REPO
                </a>
              )}
              {build.id === "gitquest" && (
                <>
                  <Link href="/oh-my-git-alternative" className="cmd-link">▶ OH MY GIT! GUIDE</Link>
                  <Link href="/learn-git-branching-alternative" className="cmd-link">▶ LEARN GIT BRANCHING GUIDE</Link>
                </>
              )}
            </div>
          )}

          {build.id === "gitquest" && <GitQuestFeedback />}

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
          {hackathon.learnings.length > 0 && <div className="pt-4 border-t border-[rgba(74,74,110,0.6)]">
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
                  initial={false}
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
          </div>}
          <details className="mt-4 text-[var(--dq-muted)] text-[16px]">
            <summary>Save-file evidence · checked {quest.reviewedAt}</summary>
            <p className="mt-2">{quest.statusEvidence}</p>
            {quest.notes.map(note => <p key={note}>{note}</p>)}
            {build.team && <p>Devpost credits: {build.team}</p>}
            {build.createdAt && <p>Project page created: {new Intl.DateTimeFormat("en-MY",{dateStyle:"medium",timeZone:"Asia/Kuala_Lumpur"}).format(new Date(build.createdAt))} (not a submission date).</p>}
          </details>
        </div>
      </div>

      {/* continue arrow */}
      <div className="flex justify-center mt-5">
        <span className="dq-arrow pixel-font text-xs" aria-hidden="true">▼</span>
      </div>
    </motion.article>
  );
}
