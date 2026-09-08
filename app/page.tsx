"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { hackathons } from "../data/hackathons";
import SignalTrace from "../components/SignalTrace";
import TimelineEntry from "../components/TimelineEntry";

export default function Home() {
  const [activeId, setActiveId] = useState<string | null>(
    hackathons[0]?.id ?? null
  );

  const handleSelect = (id: string) => {
    setActiveId(id);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Track scroll to update active blip
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    hackathons.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const shippingCount = hackathons.filter(
    (h) => h.status === "shipping"
  ).length;
  const shippedCount = hackathons.filter((h) => h.status === "shipped").length;

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Eyebrow */}
          <div className="font-mono text-xs text-mist tracking-widest uppercase mb-6">
            georgefifth / build log
          </div>

          {/* Title */}
          <h1 className="font-display text-5xl md:text-7xl text-bone leading-[1.05] mb-4">
            The Build Log
          </h1>
          <p className="font-display italic text-xl md:text-2xl text-signal mb-8">
            a signal trace of hackathons — what I built, what broke, what I
            learned.
          </p>

          {/* Stats line */}
          <div className="font-mono text-sm text-mist flex flex-wrap gap-x-6 gap-y-2">
            <span>
              <span className="text-bone">{hackathons.length}</span> entered
            </span>
            <span>
              <span className="text-signal">{shippingCount}</span> shipping
            </span>
            <span>
              <span className="text-amber">{shippedCount}</span> shipped
            </span>
            <span className="text-mist/60">
              currently: {hackathons[0]?.project}
              <span className="cursor-blink" />
            </span>
          </div>
        </motion.div>
      </section>

      {/* Signal trace */}
      <section className="max-w-5xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="font-mono text-[10px] uppercase tracking-widest text-mist/60 mb-2">
            signal trace — click a blip
          </div>
          <SignalTrace
            hackathons={hackathons}
            activeId={activeId}
            onSelect={handleSelect}
          />
        </motion.div>
      </section>

      {/* Timeline */}
      <section className="max-w-5xl mx-auto px-6 pb-32">
        <div className="relative">
          <div className="timeline-spine" />
          <div className="space-y-0">
            {hackathons.map((h, i) => (
              <TimelineEntry key={h.id} hackathon={h} index={i} />
            ))}
          </div>
        </div>

        {/* Future placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative pl-8 pt-4"
        >
          <div className="absolute left-0 top-6 w-2 h-2 rounded-full border border-surface-2 bg-ink" />
          <div className="font-mono text-xs text-mist/50 italic">
            next signal incoming...
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-6 pb-12 border-t border-surface-2 pt-8">
        <div className="flex flex-wrap justify-between gap-4 font-mono text-xs text-mist">
          <span>
            built with next.js + framer motion / deployed on vercel
          </span>
          <a
            href="https://github.com/Georgefifth"
            target="_blank"
            rel="noopener noreferrer"
            className="link-arrow"
          >
            → github
          </a>
        </div>
      </footer>
    </main>
  );
}
