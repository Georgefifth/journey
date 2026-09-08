"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { hackathons, demonKing } from "../data/hackathons";
import QuestMap from "../components/QuestMap";
import BossEncounter from "../components/BossEncounter";

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

  const inBattle = hackathons.filter((h) => h.status === "in-battle").length;
  const victories = hackathons.filter((h) => h.status === "victorious").length;

  return (
    <main className="min-h-screen crt-overlay">
      {/* Hero / Title Screen */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Hero sprite */}
          <div className="hero-sprite mb-4">🧙‍♂️</div>

          {/* Title */}
          <h1 className="pixel-font text-2xl md:text-4xl text-[var(--dq-gold)] title-glow mb-4 leading-tight">
            THE BUILD LOG
          </h1>

          {/* Subtitle — RPG intro style */}
          <p className="text-[var(--dq-cream)] text-xl mb-2 italic">
            A hero&rsquo;s journey through hackathon dungeons
          </p>
          <p className="text-[var(--dq-text)] text-base mb-8">
            What I built. What broke. What I learned.
          </p>

          {/* Stats — RPG status line */}
          <div className="inline-block dq-box px-6 py-3">
            <div className="dq-box-inner" style={{ padding: "0.5rem 1rem" }}>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm">
                <span className="text-[var(--dq-cream)]">
                  ⚔️ Battles: <span className="text-[var(--dq-gold)]">{hackathons.length}</span>
                </span>
                <span className="text-[var(--dq-cream)]">
                  🔥 In Battle: <span className="text-[var(--dq-red)]">{inBattle}</span>
                </span>
                <span className="text-[var(--dq-cream)]">
                  🏆 Victories: <span className="text-[var(--dq-green)]">{victories}</span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Quest Map */}
      <section className="max-w-4xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="text-center mb-2">
            <span className="pixel-font text-[10px] text-[var(--dq-gold)]">
              ◆ WORLD MAP ◆
            </span>
          </div>
          <p className="text-center text-[var(--dq-text)] text-sm mb-4">
            Click a castle to jump to the battle log
          </p>
          <QuestMap
            hackathons={hackathons}
            activeId={activeId}
            onSelect={handleSelect}
          />
        </motion.div>
      </section>

      {/* Battle Logs */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <div className="text-center mb-10">
          <span className="pixel-font text-[10px] text-[var(--dq-gold)]">
            ◆ BATTLE LOGS ◆
          </span>
        </div>

        {hackathons.map((h, i) => (
          <BossEncounter key={h.id} hackathon={h} index={i} />
        ))}

        {/* Demon King — final boss placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="dq-box mt-12"
        >
          <div className="dq-box-inner text-center">
            <div className="boss-emoji mb-3" style={{ opacity: 0.5 }}>
              {demonKing.emoji}
            </div>
            <h3 className="pixel-font text-sm text-[var(--dq-gold)] mb-2">
              {demonKing.name}
            </h3>
            <p className="text-[var(--dq-text)] italic text-sm">
              {demonKing.hint}
            </p>
            <div className="mt-4">
              <span className="dq-arrow pixel-font text-[10px]">
                ▼ THE JOURNEY CONTINUES ▼
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-6 pb-12 text-center">
        <div className="border-t border-[var(--dq-border)] pt-6">
          <p className="text-[var(--dq-text)] text-sm mb-3">
            Built with Next.js + Framer Motion / Deployed on Vercel
          </p>
          <a
            href="https://github.com/Georgefifth"
            target="_blank"
            rel="noopener noreferrer"
            className="cmd-link"
          >
            ▶ GITHUB
          </a>
        </div>
      </footer>
    </main>
  );
}
