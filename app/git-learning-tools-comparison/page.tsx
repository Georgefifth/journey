import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Git learning games compared: GitQuest, Oh My Git!, Learn Git Branching",
  description:
    "Compare three interactive Git learning games by where you play, how you practice, and lesson scope. Try George Fifth's GitQuest browser demo.",
  alternates: { canonical: "/git-learning-tools-comparison" },
  openGraph: {
    title: "Git learning games compared: GitQuest, Oh My Git!, Learn Git Branching",
    url: "/git-learning-tools-comparison",
    siteName: "The Build Log",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "The Build Log pixel-art journey" }],
    type: "article",
  },
};

const tools = [
  {
    name: "GitQuest",
    tag: "SHORT STORY PATH",
    place: "Browser demo",
    action: "Type Git commands and match a target commit graph.",
    scope: "11 linked levels, from the first commit to branches, merges, conflicts, and a simulated push. A sandbox is also available.",
    fit: "Choose it when you want one guided route you can start without a download.",
    href: "https://georgefifth.github.io/gitquest/",
    source: "Live GitQuest demo",
  },
  {
    name: "Learn Git Branching",
    tag: "BROAD BROWSER LESSONS",
    place: "Browser game",
    action: "Type commands to solve visual commit-tree challenges.",
    scope: "Main and Remote lesson tracks, later challenges, and a sandbox.",
    fit: "Choose it when you want to jump among more Git topics.",
    href: "https://learngitbranching.js.org/",
    source: "Official game and lesson list",
  },
  {
    name: "Oh My Git!",
    tag: "DOWNLOADABLE GAME",
    place: "Linux, macOS, or Windows download",
    action: "Use command cards or an integrated terminal while repository structures change on screen.",
    scope: "Step-by-step levels and practice with remotes and team workflows.",
    fit: "Choose it when you want a desktop game with visual command cards and real Git.",
    href: "https://ohmygit.org/",
    source: "Official game site",
  },
];

export default function GitLearningToolsComparison() {
  return (
    <main className="journey-page">
      <div className="relative z-10 mx-auto max-w-5xl px-5 pb-20 pt-8 sm:px-8 sm:pt-12">
        <nav aria-label="Page navigation" className="identity-nav !max-w-none !px-0">
          <span className="text-[var(--dq-gold)]">SAVE FILE: GIT PRACTICE</span>
          <Link href="/#firstcommit-gitquest">THE BUILD LOG ↗</Link>
        </nav>

        <header className="grid items-center gap-8 pb-14 pt-12 sm:grid-cols-[1.15fr_0.85fr] sm:gap-12 sm:pt-20">
          <div>
            <p className="section-label">CHOOSE YOUR PRACTICE MAP</p>
            <h1 className="pixel-font pixel-title mt-7 text-lg leading-[1.8] sm:text-2xl">
              GIT LEARNING GAMES COMPARED
            </h1>
            <p className="mt-5 max-w-[55ch] text-2xl leading-snug text-[var(--dq-cream)]">
              Three ways to learn Git by doing.
            </p>
            <p className="mt-3 max-w-[58ch] text-xl leading-relaxed">
              GitQuest, Learn Git Branching, and Oh My Git! all show what commands change. Pick the format that fits your next lesson.
            </p>
            <a className="cmd-link mt-7 !bg-[var(--dq-gold)] !text-[var(--dq-blue)]" href="https://georgefifth.github.io/gitquest/" target="_blank" rel="noopener noreferrer">
              ▶ PLAY THE GITQUEST DEMO
            </a>
          </div>
          <div className="dq-box overflow-hidden">
            <div className="dq-box-inner !p-3">
              <Image src="/builds/gitquest.webp" width={640} height={440} alt="GitQuest terminal game and commit graph" className="h-auto w-full" priority />
            </div>
          </div>
        </header>

        <section className="dq-box" aria-labelledby="map-title">
          <div className="dq-box-inner !p-5 sm:!p-8">
            <h2 id="map-title" className="pixel-font text-[11px] leading-relaxed text-[var(--dq-gold)] sm:text-sm">PICK YOUR PATH</h2>
            <p className="mt-4 max-w-[65ch] text-xl leading-relaxed">All three teach through interaction. Their main difference is how you enter and move through practice.</p>
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {tools.map((tool) => (
                <article key={tool.name} className="border border-[var(--dq-border)] bg-[var(--night-0)] p-5 sm:p-6">
                  <p className="pixel-font text-[9px] leading-relaxed text-[var(--dq-gold)]">{tool.tag}</p>
                  <h3 className="mt-4 text-3xl leading-tight text-[var(--dq-cream)]">{tool.name}</h3>
                  <dl className="mt-6 space-y-4 text-xl leading-relaxed">
                    <div><dt className="text-[var(--dq-gold)]">Where</dt><dd>{tool.place}</dd></div>
                    <div><dt className="text-[var(--dq-gold)]">How</dt><dd>{tool.action}</dd></div>
                    <div><dt className="text-[var(--dq-gold)]">Scope</dt><dd>{tool.scope}</dd></div>
                  </dl>
                  <p className="mt-6 border-t border-[var(--dq-border)] pt-5 text-xl leading-relaxed">{tool.fit}</p>
                  <a href={tool.href} className="mt-5 inline-block text-lg underline underline-offset-4 hover:text-[var(--dq-gold)]">{tool.source} ↗</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-14 max-w-2xl" aria-labelledby="next-step">
          <h2 id="next-step" className="pixel-font text-[11px] leading-relaxed text-[var(--dq-gold)] sm:text-sm">START WITH THE FORMAT</h2>
          <p className="mt-5 text-xl leading-relaxed">Need a short interactive Git learning game in your browser? GitQuest follows one 11-level story. Learn Git Branching offers more browser lessons. Oh My Git! suits a desktop session with command cards and real Git.</p>
          <p className="mt-5 text-lg leading-relaxed text-[var(--dq-muted)]">GitQuest here means George Fifth&apos;s demo, not the separate product at gitquest.app. The tools differ in lesson scope. This guide makes no claim that one teaches every Git topic.</p>
        </section>

        <nav aria-label="More Git guides" className="mx-auto mt-14 max-w-2xl border-t border-[var(--dq-border)] pt-7">
          <p className="pixel-font text-[9px] leading-relaxed text-[var(--dq-gold)]">READ THE FOCUSED GUIDES</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-xl">
            <Link href="/oh-my-git-alternative" className="underline hover:text-[var(--dq-gold)]">Oh My Git! alternative</Link>
            <Link href="/learn-git-branching-alternative" className="underline hover:text-[var(--dq-gold)]">Learn Git Branching alternative</Link>
            <Link href="/interactive-git-learning-game" className="underline hover:text-[var(--dq-gold)]">Interactive Git learning game</Link>
            <Link href="/#firstcommit-gitquest" className="underline hover:text-[var(--dq-gold)]">GitQuest build log</Link>
          </div>
        </nav>
      </div>
    </main>
  );
}
