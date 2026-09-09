"use client";

import { useState, useEffect } from "react";
import { hackathons } from "../data/hackathons";
import Starfield from "../components/Starfield";
import TitleScreen from "../components/TitleScreen";
import QuestMap from "../components/QuestMap";
import BossEncounter from "../components/BossEncounter";
import DemonKing from "../components/DemonKing";
import SoundToggle from "../components/SoundToggle";
import { playBlip } from "../lib/blip";

export default function Home() {
  const [activeId, setActiveId] = useState<string | null>(
    hackathons[0]?.id ?? null
  );

  const handleSelect = (id: string) => {
    playBlip("select");
    setActiveId(id);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleStart = () => {
    playBlip("start");
    document.getElementById("world-map")?.scrollIntoView({
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
    <main className="journey-page">
      {/* ambient night sky */}
      <Starfield />

      {/* 8-bit SFX toggle (HUD chip, bottom-right) */}
      <SoundToggle />

      <div className="relative z-10">
        {/* Title screen */}
        <TitleScreen
          battles={hackathons.length}
          inBattle={inBattle}
          victories={victories}
          onStart={handleStart}
        />

        {/* World map */}
        <section id="world-map" className="max-w-4xl mx-auto px-4 sm:px-6 mb-14 scroll-mt-6">
          <div className="text-center mb-5">
            <span className="section-label">WORLD MAP</span>
          </div>
          <QuestMap
            hackathons={hackathons}
            activeId={activeId}
            onSelect={handleSelect}
          />
        </section>

        {/* Battle logs */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
          <div className="text-center mb-10">
            <span className="section-label">BATTLE LOGS</span>
          </div>

          {hackathons.map((h, i) => (
            <BossEncounter key={h.id} hackathon={h} index={i} />
          ))}

          {/* Final boss */}
          <DemonKing />
        </section>

        {/* Footer */}
        <footer className="max-w-4xl mx-auto px-6 pb-10 text-center">
          <div className="border-t-2 border-[rgba(74,74,110,0.55)] pt-6">
            <p className="text-[var(--dq-muted)] text-[16px] mb-4">
              Built with Next.js + Framer Motion · Deployed on Vercel
            </p>
            <a
              href="https://github.com/Georgefifth"
              target="_blank"
              rel="noopener noreferrer"
              className="cmd-link"
            >
              ▶ GITHUB
            </a>
            <p className="pixel-font text-[7px] text-[var(--dq-muted)] mt-6 tracking-widest opacity-70">
              © 2026 GEORGEFIFTH · THE BUILD LOG · VER.2.2
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
