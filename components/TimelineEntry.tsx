"use client";

import { motion } from "framer-motion";
import type { Hackathon } from "../data/hackathons";

type Props = {
  hackathon: Hackathon;
  index: number;
};

export default function TimelineEntry({ hackathon, index }: Props) {
  const isShipping = hackathon.status === "shipping";

  return (
    <motion.article
      id={hackathon.id}
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="relative pl-8 pb-20"
    >
      {/* Spine node */}
      <div className="absolute left-0 top-2 flex items-center">
        <div
          className={`w-2 h-2 rounded-full border ${
            isShipping
              ? "bg-signal border-signal"
              : "bg-surface border-surface-2"
          }`}
        />
      </div>

      {/* Date on the spine */}
      <div className="font-mono text-xs text-mist mb-3 tracking-wide">
        {hackathon.dateLabel}
      </div>

      {/* Card */}
      <div className="entry-card border border-surface-2 rounded-lg p-6 bg-surface/30 backdrop-blur-sm">
        {/* Status badge */}
        <div className="flex items-center gap-2 mb-4">
          {isShipping ? (
            <span className="font-mono text-[10px] uppercase tracking-widest text-signal flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
              shipping
            </span>
          ) : (
            <span className="font-mono text-[10px] uppercase tracking-widest text-mist">
              shipped
            </span>
          )}
          <span className="text-mist text-xs">/</span>
          <span className="font-mono text-xs text-mist">{hackathon.name}</span>
        </div>

        {/* Project name */}
        <h2 className="font-display text-3xl md:text-4xl text-bone mb-2 leading-tight">
          {hackathon.project}
        </h2>

        {/* Tagline */}
        <p className="font-display italic text-lg text-signal mb-6 leading-relaxed">
          {hackathon.tagline}
        </p>

        {/* Story */}
        <p className="text-bone/80 text-sm leading-relaxed mb-6 max-w-2xl">
          {hackathon.story}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {hackathon.stack.map((tech) => (
            <span key={tech} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        {(hackathon.demo || hackathon.repo) && (
          <div className="flex flex-wrap gap-6 mb-8">
            {hackathon.demo && (
              <a
                href={hackathon.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="link-arrow"
              >
                → demo
              </a>
            )}
            {hackathon.repo && (
              <a
                href={hackathon.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="link-arrow"
              >
                → repo
              </a>
            )}
          </div>
        )}

        {/* Learnings */}
        <div className="border-t border-surface-2 pt-5">
          <h3 className="font-mono text-[10px] uppercase tracking-widest text-amber mb-4">
            what I learned
          </h3>
          <ul className="space-y-3">
            {hackathon.learnings.map((learning, i) => (
              <li
                key={i}
                className="text-sm text-bone/70 leading-relaxed flex gap-3"
              >
                <span className="text-signal font-mono text-xs mt-0.5 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{learning}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
}
