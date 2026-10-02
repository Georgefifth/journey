import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "GitQuest and Oh My Git! | A guide to two Git games",
  description: "Compare George Fifth's browser GitQuest demo with the desktop Oh My Git! game. See how each starts, then try the one that fits your goal.",
  alternates: { canonical: "/oh-my-git-alternative" },
};

const rows = [
  {
    topic: "Where you play",
    gitquest: "A browser demo hosted on GitHub Pages. Open it and choose a level or sandbox mode.",
    ohmygit: "A downloadable game for Linux, macOS, and Windows, linked from its official site.",
  },
  {
    topic: "How you act",
    gitquest: "Type Git commands into a game terminal and watch the commit graph change.",
    ohmygit: "Use playing cards for introduced commands, or use its integrated terminal.",
  },
  {
    topic: "What is shown",
    gitquest: "An 11-level path from setup through commits, branches, merges, and a fake remote.",
    ohmygit: "Live Git repository structures, with lessons that include remotes and team workflows.",
  },
];

export default function OhMyGitAlternative() {
  return (
    <main className="journey-page">
      <div className="relative z-10 mx-auto max-w-4xl px-5 pb-20 pt-8 sm:px-8 sm:pt-12">
        <nav aria-label="Page navigation" className="identity-nav !max-w-none !px-0">
          <span className="text-[var(--dq-gold)]">SAVE FILE: GITQUEST</span>
          <Link href="/#firstcommit-gitquest">THE BUILD LOG ↗</Link>
        </nav>

        <header className="grid items-center gap-8 pb-12 pt-12 sm:grid-cols-[1.2fr_0.8fr] sm:gap-12 sm:pt-20">
          <div>
            <p className="section-label">PICK YOUR GIT QUEST</p>
            <h1 className="pixel-font pixel-title mt-7 text-lg leading-[1.8] sm:text-2xl">
              GITQUEST AND OH MY GIT!
            </h1>
            <p className="mt-5 max-w-[58ch] text-2xl leading-snug text-[var(--dq-cream)]">
              Two games teach Git by letting you see what your commands do.
            </p>
            <p className="mt-3 max-w-[58ch] text-xl leading-relaxed text-[var(--dq-text)]">
              Choose GitQuest for a browser terminal challenge. Choose Oh My Git! for a downloadable game with command cards.
            </p>
            <a className="cmd-link mt-7 !bg-[var(--dq-gold)] !text-[var(--dq-blue)]" href="https://georgefifth.github.io/gitquest/" target="_blank" rel="noopener noreferrer">
              ▶ PLAY GITQUEST
            </a>
          </div>
          <div className="dq-box overflow-hidden">
            <div className="dq-box-inner !p-3">
              <Image src="/builds/gitquest.webp" width={640} height={440} alt="GitQuest game preview" className="h-auto w-full" priority />
            </div>
          </div>
        </header>

        <section aria-labelledby="comparison-title" className="dq-box">
          <div className="dq-box-inner !p-4 sm:!p-7">
            <h2 id="comparison-title" className="pixel-font text-[11px] leading-relaxed text-[var(--dq-gold)] sm:text-sm">CHOOSE YOUR PATH</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="border border-[var(--dq-border)] bg-[var(--night-0)] p-5">
                <h3 className="pixel-font text-[10px] leading-relaxed text-[var(--dq-gold)]">GITQUEST</h3>
                <p className="mt-3 text-xl leading-relaxed">George Fifth&apos;s browser demo. Type commands through 11 levels, or open its sandbox.</p>
              </div>
              <div className="border border-[var(--dq-border)] bg-[var(--night-0)] p-5">
                <h3 className="pixel-font text-[10px] leading-relaxed text-[var(--dq-cream)]">OH MY GIT!</h3>
                <p className="mt-3 text-xl leading-relaxed">A desktop game with a card interface, an integrated terminal, and lessons about remotes.</p>
              </div>
            </div>
            <div className="mt-4 divide-y divide-[var(--dq-border)]">
              {rows.map((row) => (
                <div key={row.topic} className="grid gap-3 py-5 sm:grid-cols-[9rem_1fr_1fr] sm:gap-5">
                  <h3 className="text-xl text-[var(--dq-gold)]">{row.topic}</h3>
                  <p className="max-w-[60ch] text-xl leading-relaxed">{row.gitquest}</p>
                  <p className="max-w-[60ch] text-xl leading-relaxed text-[var(--dq-cream)]">{row.ohmygit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-14 max-w-2xl">
          <h2 className="pixel-font text-[11px] leading-relaxed text-[var(--dq-gold)] sm:text-sm">WHICH ONE FITS?</h2>
          <p className="mt-5 text-xl leading-relaxed">GitQuest suits a quick browser session built around typing commands. Oh My Git! suits someone who wants a desktop game with visual command cards and an integrated terminal. Both let you watch Git change as you play.</p>
          <p className="mt-5 text-lg text-[var(--dq-muted)]">This is a guide to two public games. It does not claim they cover the same lessons or features.</p>
        </section>

        <nav aria-label="Project and source links" className="mx-auto mt-14 max-w-2xl border-t border-[var(--dq-border)] pt-7">
          <p className="pixel-font text-[9px] leading-relaxed text-[var(--dq-gold)]">FOLLOW THE SOURCE</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-xl">
            <Link href="/#firstcommit-gitquest" className="underline hover:text-[var(--dq-gold)]">GitQuest build log</Link>
            <a href="https://devpost.com/software/gitquest" className="underline hover:text-[var(--dq-gold)]">Devpost entry</a>
            <a href="https://github.com/Georgefifth/gitquest" className="underline hover:text-[var(--dq-gold)]">GitQuest source</a>
            <a href="https://ohmygit.org/" className="underline hover:text-[var(--dq-gold)]">Oh My Git! official site</a>
          </div>
        </nav>
      </div>
    </main>
  );
}
