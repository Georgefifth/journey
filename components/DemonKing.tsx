"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PixelSprite from "./pixel/PixelSprite";
import { demonTower } from "./pixel/sprites";
import { demonKing } from "../data/hackathons";

export default function DemonKing() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : undefined}
      transition={{ duration: 0.8 }}
      className="dq-box mt-14"
    >
      {/* ominous shake on first appearance */}
      <motion.div
        animate={
          inView
            ? { x: [0, -5, 5, -3, 3, 0] }
            : undefined
        }
        transition={{ duration: 0.55, delay: 0.35 }}
      >
        <div className="dq-box-inner text-center">
          <div className="demon-glow inline-block mb-3">
            <PixelSprite map={demonTower} scale={5} label="A dark tower on the horizon" />
          </div>

          <h3 className="pixel-font text-xs sm:text-sm text-[var(--dq-purple)] mb-3 tracking-wider">
            {demonKing.name}
          </h3>

          {/* ??? HP bar */}
          <div className="max-w-xs mx-auto mb-4">
            <div className="hp-bar opacity-60" aria-hidden="true">
              {Array.from({ length: 10 }).map((_, i) => (
                <span key={i} className="hp-seg" />
              ))}
            </div>
            <div className="pixel-font text-[8px] text-[var(--dq-muted)] mt-2 tracking-widest">
              ??? / ???
            </div>
          </div>

          <p className="text-[var(--dq-muted)] italic text-lg">{demonKing.hint}</p>

          <div className="mt-5">
            <span className="dq-arrow pixel-font text-[10px]">▼ THE JOURNEY CONTINUES ▼</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
