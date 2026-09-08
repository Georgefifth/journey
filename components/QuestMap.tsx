"use client";

import { motion } from "framer-motion";
import type { Hackathon } from "../data/hackathons";
import { demonKing } from "../data/hackathons";

type Props = {
  hackathons: Hackathon[];
  activeId: string | null;
  onSelect: (id: string) => void;
};

export default function QuestMap({ hackathons, activeId, onSelect }: Props) {
  const width = 1000;
  const height = 280;
  const padding = 80;
  const usableWidth = width - padding * 2;

  // All nodes: hackathons + demon king at the end
  const allNodes = [
    ...hackathons.map((h) => ({
      id: h.id,
      emoji: h.bossEmoji,
      label: h.project,
      date: h.dateLabel,
      status: h.status,
      isBoss: false,
    })),
    {
      id: "demon-king",
      emoji: demonKing.emoji,
      label: "???",
      date: "???",
      status: "not-encountered" as const,
      isBoss: true,
    },
  ];

  const nodeCount = allNodes.length;

  // Positions: zigzag path
  const positions = allNodes.map((node, i) => {
    const x = padding + (usableWidth / Math.max(nodeCount - 1, 1)) * i;
    // Zigzag: alternate up and down
    const y = height / 2 + (i % 2 === 0 ? -50 : 50);
    return { x, y, node };
  });

  // Build path connecting nodes
  const pathPoints = positions.map((p) => `${p.x},${p.y}`);
  const pathData = `M ${pathPoints.join(" L ")}`;

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Quest map showing hackathon bosses along a path"
      >
        {/* Animated dashed path */}
        <motion.path
          d={pathData}
          className="quest-path"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Nodes */}
        {positions.map(({ x, y, node }, i) => {
          const isActive = activeId === node.id;
          const isDefeated = node.status === "victorious";
          const isCurrent = node.status === "in-battle";
          const isUnknown = node.status === "not-encountered";

          return (
            <g
              key={node.id}
              className="map-node"
              onClick={() => !node.isBoss && onSelect(node.id)}
            >
              {/* Castle/boss base — pixel square */}
              <rect
                x={x - 22}
                y={y - 22}
                width={44}
                height={44}
                fill={isActive ? "var(--dq-gold)" : "var(--dq-blue-light)"}
                stroke={isActive ? "var(--dq-gold)" : "var(--dq-border)"}
                strokeWidth={2}
                rx={0}
              />

              {/* Inner border for depth */}
              <rect
                x={x - 18}
                y={y - 18}
                width={36}
                height={36}
                fill="none"
                stroke={isActive ? "var(--dq-blue)" : "var(--dq-border)"}
                strokeWidth={1}
                opacity={0.5}
              />

              {/* Boss emoji */}
              <text
                x={x}
                y={y + 7}
                textAnchor="middle"
                fontSize={22}
                opacity={isUnknown ? 0.4 : 1}
              >
                {isUnknown ? "?" : node.emoji}
              </text>

              {/* Status indicator dot */}
              {isCurrent && (
                <motion.circle
                  cx={x + 16}
                  cy={y - 16}
                  r={4}
                  fill="var(--dq-red)"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
              {isDefeated && (
                <text
                  x={x + 16}
                  y={y - 12}
                  textAnchor="middle"
                  fontSize={14}
                >
                  ✓
                </text>
              )}

              {/* Label below */}
              <text
                x={x}
                y={y + 38}
                textAnchor="middle"
                fill={isActive ? "var(--dq-gold)" : "var(--dq-text)"}
                fontSize={12}
                fontFamily="VT323, monospace"
                opacity={isActive ? 1 : 0.7}
              >
                {node.label}
              </text>
              <text
                x={x}
                y={y + 52}
                textAnchor="middle"
                fill="var(--dq-text)"
                fontSize={10}
                fontFamily="VT323, monospace"
                opacity={0.5}
              >
                {node.date}
              </text>

              {/* Hero sprite at current battle position */}
              {isCurrent && (
                <motion.text
                  x={x - 40}
                  y={y - 5}
                  textAnchor="middle"
                  fontSize={20}
                  initial={{ x: x - 60, opacity: 0 }}
                  animate={{ x: x - 40, opacity: 1 }}
                  transition={{ delay: 1, type: "spring" }}
                >
                  🗡️
                </motion.text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
