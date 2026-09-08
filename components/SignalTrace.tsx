"use client";

import { motion } from "framer-motion";
import type { Hackathon } from "../data/hackathons";

type Props = {
  hackathons: Hackathon[];
  activeId: string | null;
  onSelect: (id: string) => void;
};

export default function SignalTrace({ hackathons, activeId, onSelect }: Props) {
  const width = 1000;
  const height = 120;
  const padding = 60;
  const usableWidth = width - padding * 2;
  const blipCount = hackathons.length;

  // Generate a flat signal baseline with blips at each hackathon position
  const baselineY = height / 2;
  const points: string[] = [];
  const blipPositions: { x: number; h: Hackathon }[] = [];

  // Build a signal-like path: flat baseline, spike at each blip
  const segments = 200;
  for (let i = 0; i <= segments; i++) {
    const x = padding + (usableWidth / segments) * i;
    const t = i / segments;

    // Find nearest blip
    let y = baselineY;
    let nearestDist = Infinity;
    blipPositions.length = 0;

    hackathons.forEach((h, idx) => {
      const blipT = blipCount === 1 ? 0.5 : idx / (blipCount - 1);
      const blipX = padding + usableWidth * blipT;
      const dist = Math.abs(x - blipX);
      if (dist < nearestDist) {
        nearestDist = dist;
      }
    });

    // Spike shape: sharp peak near blip
    if (nearestDist < 30) {
      const intensity = 1 - nearestDist / 30;
      y = baselineY - intensity * 40;
    }

    // Small noise for organic feel
    const noise = Math.sin(t * 80) * 2;
    y += noise;

    points.push(`${x},${y}`);
  }

  // Record blip positions for rendering dots
  hackathons.forEach((h, idx) => {
    const blipT = blipCount === 1 ? 0.5 : idx / (blipCount - 1);
    const blipX = padding + usableWidth * blipT;
    blipPositions.push({ x: blipX, h });
  });

  const pathData = `M ${points.join(" L ")}`;

  return (
    <div className="signal-trace">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Hackathon timeline signal trace"
      >
        {/* Faint grid lines */}
        <line
          x1={padding}
          y1={baselineY}
          x2={width - padding}
          y2={baselineY}
          className="signal-line"
          strokeDasharray="2 4"
          opacity={0.3}
        />

        {/* Animated signal path */}
        <motion.path
          d={pathData}
          fill="none"
          stroke="var(--signal)"
          strokeWidth={1.5}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Blips */}
        {blipPositions.map(({ x, h }) => {
          const isActive = activeId === h.id;
          return (
            <g
              key={h.id}
              className={`signal-blip ${isActive ? "signal-blip-active" : ""}`}
              onClick={() => onSelect(h.id)}
            >
              {/* Pulse ring */}
              {isActive && (
                <motion.circle
                  cx={x}
                  cy={baselineY - 40}
                  r={6}
                  fill="none"
                  stroke="var(--signal)"
                  strokeWidth={1}
                  initial={{ r: 6, opacity: 0.8 }}
                  animate={{ r: 18, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                />
              )}
              {/* Core dot */}
              <motion.circle
                cx={x}
                cy={baselineY - 40}
                r={isActive ? 5 : 3.5}
                fill={isActive ? "var(--signal)" : "var(--surface-2)"}
                stroke="var(--signal)"
                strokeWidth={1}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              />
              {/* Label */}
              <text
                x={x}
                y={baselineY + 30}
                textAnchor="middle"
                fill={isActive ? "var(--signal)" : "var(--mist)"}
                fontSize={11}
                fontFamily="JetBrains Mono, monospace"
              >
                {h.dateLabel}
              </text>
              {/* Project name */}
              <text
                x={x}
                y={baselineY + 46}
                textAnchor="middle"
                fill={isActive ? "var(--bone)" : "var(--mist)"}
                fontSize={10}
                fontFamily="JetBrains Mono, monospace"
                opacity={isActive ? 1 : 0.6}
              >
                {h.project}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
