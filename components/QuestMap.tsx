"use client";

import { motion } from "framer-motion";
import PixelSprite, { PixelRects } from "./pixel/PixelSprite";
import {
  castle,
  demonTower,
  heroMage,
  slash,
  pineTree,
  roundTree,
  rock,
  bush,
  pond,
  signpost,
} from "./pixel/sprites";
import type { Hackathon } from "../data/hackathons";
import { demonKing } from "../data/hackathons";

/** Deterministic PRNG so SSR/client match */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const W = 1200;
const H = 430;
const PAD = 170;

type MapNode = {
  id: string;
  x: number;
  y: number; // ground line where the sprite's base sits
  label: string;
  date: string;
  status: "in-battle" | "victorious" | "not-encountered";
  isBoss: boolean;
};

/** Pixel-staircase road: horizontal run + small rise per step, 45° chamfered corners */
function buildRoadD(pts: { x: number; y: number }[], stepH = 22, ch = 10): string {
  if (pts.length < 2) return "";
  // expand each segment into staircase points
  const full: { x: number; y: number }[] = [pts[0]];
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const dy = b.y - a.y;
    const steps = Math.max(1, Math.round(Math.abs(dy) / stepH));
    const run = (b.x - a.x) / steps;
    const rise = dy / steps;
    for (let s = 1; s <= steps; s++) {
      full.push({ x: a.x + run * s, y: a.y + rise * (s - 1) }); // end of horizontal run
      full.push({ x: a.x + run * s, y: a.y + rise * s }); // end of vertical rise
    }
  }
  // chamfer interior corners with a 45° cut
  const out: string[] = [`M ${full[0].x} ${full[0].y}`];
  for (let i = 1; i < full.length - 1; i++) {
    const p = full[i - 1];
    const c = full[i];
    const n = full[i + 1];
    const l1 = Math.hypot(p.x - c.x, p.y - c.y) || 1;
    const l2 = Math.hypot(n.x - c.x, n.y - c.y) || 1;
    const a1 = Math.min(ch, l1 / 2);
    const a2 = Math.min(ch, l2 / 2);
    out.push(
      `L ${c.x + ((p.x - c.x) / l1) * a1} ${c.y + ((p.y - c.y) / l1) * a1}`,
      `L ${c.x + ((n.x - c.x) / l2) * a2} ${c.y + ((n.y - c.y) / l2) * a2}`
    );
  }
  const last = full[full.length - 1];
  out.push(`L ${last.x} ${last.y}`);
  return out.join(" ");
}

/** Stepped hill silhouette */
function hillD(
  rand: () => number,
  baseY: number,
  minH: number,
  maxH: number,
  stepW: number
): string {
  let d = `M 0 ${baseY}`;
  let x = 0;
  while (x < W) {
    const h = Math.round(minH + rand() * (maxH - minH));
    x += stepW;
    d += ` h ${stepW} V ${baseY - h}`;
  }
  d += ` H ${W} V ${H} H 0 Z`;
  return d;
}

type Props = {
  hackathons: Hackathon[];
  activeId: string | null;
  onSelect: (id: string) => void;
};

export default function QuestMap({ hackathons, activeId, onSelect }: Props) {
  const allNodes = [
    ...hackathons.map((h) => ({
      id: h.id,
      label: h.project,
      date: h.dateLabel,
      status: h.status,
      isBoss: false,
    })),
    {
      id: "demon-king",
      label: "???",
      date: "???",
      status: "not-encountered" as const,
      isBoss: true,
    },
  ];

  const nodes: MapNode[] = allNodes.map((n, i) => {
    const count = allNodes.length;
    const x = PAD + ((W - PAD * 2) / Math.max(count - 1, 1)) * i;
    const y = i % 2 === 0 ? 284 : 304;
    return { ...n, x, y };
  });

  const road = buildRoadD(nodes.map((n) => ({ x: n.x, y: n.y + 4 })));

  // Terrain (deterministic)
  const farHills = hillD(mulberry32(7), 298, 18, 60, 56);
  const nearGround = hillD(mulberry32(42), 308, 8, 26, 44);

  // grass texture ticks on the ground band
  const randGrass = mulberry32(1234);
  const grassTicks = Array.from({ length: 42 }, (_, i) => ({
    x: Math.round(randGrass() * W),
    y: Math.round(312 + randGrass() * 108),
    key: `g-${i}`,
  }));

  // map sky stars (deterministic)
  const randStar = mulberry32(99);
  const mapStars = Array.from({ length: 26 }, (_, i) => ({
    x: Math.round(randStar() * W),
    y: Math.round(randStar() * 190),
    s: randStar() < 0.2 ? 2.4 : 1.6,
    o: 0.22 + randStar() * 0.45,
    key: `ms-${i}`,
  }));

  const currentNode = nodes.find((n) => n.status === "in-battle");

  return (
    <>
      {/* ---------- Desktop: framed SVG world map ---------- */}
      <div className="hidden md:block dq-box">
        {/* window titlebar */}
        <div className="flex items-center justify-between px-4 py-2 border-b-2 border-[var(--dq-border)] bg-[#10102a]">
          <span className="pixel-font text-[9px] text-[var(--dq-gold)] tracking-widest">
            ◆ WORLD MAP
          </span>
          <span className="flex gap-1.5" aria-hidden="true">
            <i className="w-2.5 h-2.5 bg-[var(--dq-gold-dark)] inline-block" />
            <i className="w-2.5 h-2.5 bg-[var(--dq-border)] inline-block" />
            <i className="w-2.5 h-2.5 bg-[var(--dq-border)] inline-block" />
          </span>
        </div>

        <div className="dq-box-inner !p-2">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            width="100%"
            role="img"
            aria-label="Quest map: a winding road connects each hackathon castle to the demon king's tower"
          >
            {/* map stars */}
            {mapStars.map((s) => (
              <rect key={s.key} x={s.x} y={s.y} width={s.s} height={s.s} fill="var(--dq-cream)" opacity={s.o} />
            ))}

            {/* far hills */}
            <path d={farHills} fill="#161e3d" opacity={0.95} />
            {/* near ground */}
            <path d={nearGround} fill="#122419" />
            {/* grass ticks */}
            {grassTicks.map((g) => (
              <rect key={g.key} x={g.x} y={g.y} width={3} height={2} fill="#1f6e42" opacity={0.5} />
            ))}

            {/* road */}
            <path d={road} fill="none" stroke="#0c0c22" strokeWidth={14} />
            {/* draw-in underline */}
            <motion.path
              d={road}
              fill="none"
              stroke="rgba(249,213,110,0.28)"
              strokeWidth={5}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
            />
            {/* marching-ants center line (opacity fade only — keeps CSS dasharray intact) */}
            <motion.path
              d={road}
              className="road-dash"
              fill="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            />

            {/* scenery (foreground band) */}
            <g opacity={0.95}>
              <g transform="translate(49 272) scale(2.2)">
                <PixelRects map={pineTree} />
              </g>
              <g transform="translate(303 296) scale(1.8)">
                <PixelRects map={roundTree} />
              </g>
              <g transform="translate(452 292) scale(2)">
                <PixelRects map={pineTree} />
              </g>
              <g transform="translate(724 274) scale(2.4)">
                <PixelRects map={pineTree} />
              </g>
              <g transform="translate(862 286) scale(1.9)">
                <PixelRects map={roundTree} />
              </g>
              <g transform="translate(1118 272) scale(2.2)">
                <PixelRects map={pineTree} />
              </g>
              <g transform="translate(560 330) scale(1.6)">
                <PixelRects map={pond} />
              </g>
              <g transform="translate(384 344) scale(1.6)">
                <PixelRects map={rock} />
              </g>
              <g transform="translate(998 340) scale(1.5)">
                <PixelRects map={bush} />
              </g>
              <g transform="translate(206 344) scale(1.4)">
                <PixelRects map={bush} />
              </g>
            </g>

            {/* signpost beside first node, on the grass below the road */}
            {nodes[0] && (
              <g
                transform={`translate(${nodes[0].x + 58} ${nodes[0].y + 14}) scale(1.8)`}
                opacity={0.92}
              >
                <PixelRects map={signpost} />
              </g>
            )}

            {/* nodes */}
            {nodes.map((n) => {
              const isActive = activeId === n.id;
              const isUnknown = n.status === "not-encountered";
              const isCurrent = n.status === "in-battle";
              const sprite = n.isBoss ? demonTower : castle;
              const s = 3; // 16px map → 48px

              return (
                <g
                  key={n.id}
                  className={`map-node${n.isBoss ? " cursor-default" : ""}`}
                  onClick={() => !n.isBoss && onSelect(n.id)}
                  role={n.isBoss ? undefined : "button"}
                  aria-label={n.isBoss ? undefined : `Jump to ${n.label}`}
                >
                  {/* ground shadow */}
                  <ellipse cx={n.x} cy={n.y + 3} rx={30} ry={5} fill="rgba(0,0,0,0.45)" />

                  {/* active highlight disc */}
                  {isActive && (
                    <ellipse cx={n.x} cy={n.y + 3} rx={34} ry={7} fill="rgba(249,213,110,0.16)" />
                  )}

                  {/* in-battle pulsing ring */}
                  {isCurrent && (
                    <circle
                      className="pulse-ring"
                      cy={n.y - 2}
                      cx={n.x}
                      r={32}
                      fill="none"
                      stroke="var(--dq-red)"
                      strokeWidth={2}
                    />
                  )}

                  {/* sprite — base row anchored at n.y (inner g takes CSS hover transform) */}
                  <g transform={`translate(${n.x - (16 * s) / 2} ${n.y - 16 * s}) scale(${s})`} opacity={isUnknown ? 0.6 : 1}>
                    <g className="node-body">
                      <PixelRects map={sprite} />
                    </g>
                  </g>

                  {/* status marks */}
                  {n.status === "victorious" && (
                    <text x={n.x + 24} y={n.y - 44} textAnchor="middle" fontSize={15} fill="var(--dq-green)" fontWeight="bold">
                      ✓
                    </text>
                  )}
                  {isCurrent && (
                    <motion.circle
                      cx={n.x + 26}
                      cy={n.y - 48}
                      r={4}
                      fill="var(--dq-red)"
                      animate={{ opacity: [1, 0.25, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    />
                  )}

                  {/* labels */}
                  <text
                    x={n.x}
                    y={n.y + 22}
                    textAnchor="middle"
                    fill={isActive ? "var(--dq-gold)" : "var(--dq-cream)"}
                    fontSize={16}
                    fontFamily="VT323, monospace"
                    opacity={isActive ? 1 : 0.85}
                  >
                    {n.label}
                  </text>
                  <text
                    x={n.x}
                    y={n.y + 38}
                    textAnchor="middle"
                    fill="var(--dq-muted)"
                    fontSize={13}
                    fontFamily="VT323, monospace"
                  >
                    {n.date}
                  </text>
                </g>
              );
            })}

            {/* hero + slash at current battle */}
            {currentNode && (
              <g>
                <motion.g
                  initial={{ opacity: 0, x: -26 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1, type: "spring", stiffness: 90 }}
                >
                  {/* bobbing ▼ marker */}
                  <motion.text
                    x={currentNode.x - 62}
                    textAnchor="middle"
                    fontSize={13}
                    fill="var(--dq-gold)"
                    animate={{ y: [currentNode.y - 64, currentNode.y - 58, currentNode.y - 64] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    ▼
                  </motion.text>
                  {/* hero base aligned with node ground line (nested g so CSS bounce
                      doesn't clobber the positioning transform) */}
                  <g transform={`translate(${currentNode.x - 76} ${currentNode.y - 16 * 2.6 + 2}) scale(2.6)`}>
                    <g className="hero-bounce">
                      <PixelRects map={heroMage} />
                    </g>
                  </g>
                </motion.g>
                {/* slash flash between hero and castle */}
                <motion.g
                  transform={`translate(${currentNode.x - 36} ${currentNode.y - 40}) scale(2.9)`}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.9, repeat: Infinity, times: [0, 0.25, 0.5] }}
                >
                  <PixelRects map={slash} />
                </motion.g>
              </g>
            )}
          </svg>
        </div>

        {/* legend */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 px-4 pb-3 text-[15px] text-[var(--dq-muted)]">
          <span className="inline-flex items-center gap-2">
            <i className="w-2.5 h-2.5 bg-[var(--dq-green)] inline-block" /> VICTORY
          </span>
          <span className="inline-flex items-center gap-2">
            <i className="w-2.5 h-2.5 bg-[var(--dq-red)] inline-block" /> IN BATTLE
          </span>
          <span className="inline-flex items-center gap-2">
            <i className="w-2.5 h-2.5 bg-[var(--dq-purple)] inline-block" /> FINAL BOSS
          </span>
          <span className="inline-flex items-center gap-2 kbd-hint">click a castle to inspect the battle</span>
        </div>
      </div>

      {/* ---------- Mobile: vertical quest trail ---------- */}
      <div className="md:hidden quest-trail pl-1">
        {nodes.map((n, idx) => {
          const isUnknown = n.status === "not-encountered";
          const isCurrent = n.status === "in-battle";
          const sprite = n.isBoss ? demonTower : castle;
          return (
            <div key={n.id} className="relative flex items-center gap-4 py-4" style={{ minHeight: 84 }}>
              {/* node */}
              <div className="relative z-10 shrink-0 bg-[var(--night-1)] p-1.5 border-2 border-[var(--dq-border)]">
                <PixelSprite map={sprite} scale={n.isBoss ? 2.4 : 2.6} />
                {isCurrent && (
                  <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[var(--dq-red)] animate-pulse" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-xl text-[var(--dq-cream)] leading-none">{n.label}</span>
                  <span className="text-[15px] text-[var(--dq-muted)]">{n.date}</span>
                </div>
                <div className="text-[15px] mt-0.5">
                  {n.status === "in-battle" && <span className="text-[var(--dq-red)]">⚔ IN BATTLE — tap ▶ to inspect</span>}
                  {n.status === "victorious" && <span className="text-[var(--dq-green)]">✓ CLEARED</span>}
                  {isUnknown && <span className="text-[var(--dq-purple)]">? UNCHARTED</span>}
                </div>
              </div>
              {!n.isBoss && (
                <button
                  type="button"
                  className="cmd-link !text-[8px] !px-2.5 !py-2"
                  onClick={() => onSelect(n.id)}
                  aria-label={`Jump to ${n.label}`}
                >
                  ▶
                </button>
              )}
              {idx === nodes.length - 1 && (
                <div className="absolute right-2 bottom-1 text-[13px] text-[var(--dq-muted)]">to be continued…</div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
