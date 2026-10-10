import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Learn Git Branching alternative? Try the GitQuest demo",
  description:
    "Compare Learn Git Branching's browser lessons and sandbox with George Fifth's 11-level GitQuest demo. See the scope of each, then choose where to practice Git.",
  alternates: { canonical: "/learn-git-branching-alternative" },
  openGraph: {
    title: "Learn Git Branching alternative? Try the GitQuest demo",
    url: "/learn-git-branching-alternative",
    siteName: "The Build Log",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "The Build Log — a pixel hero stands between a castle and the demon king's tower" }],
    type: "website",
  },
};

const comparisons = [
  {
    label: "First step",
    gitquest: "Start a story-driven level with git init. Later levels unlock in order.",
    learn: "Choose a lesson from the Main or Remote tracks, or start in the sandbox.",
  },
  {
    label: "Practice",
    gitquest: "Type commands in a game terminal. Watch your repo and commit graph respond.",
    learn: "Type commands in a simulated repo. Watch the commit tree change beside them.",
  },
  {
    label: "Scope",
    gitquest: "An 11-level demo that starts with setup, then reaches branches, merges, and a simulated remote.",
    learn: "Several lesson groups cover local and remote Git, with later challenges and a freeform sandbox.",
  },
];

export default function LearnGitBranchingAlternative() {
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
              GITQUEST OR LEARN GIT BRANCHING?
            </h1>
            <p className="mt-5 max-w-[58ch] text-2xl leading-snug text-[var(--dq-cream)]">
              Two browser games let you see Git change as you type.
            </p>
            <p className="mt-3 max-w-[58ch] text-xl leading-relaxed text-[var(--dq-text)]">
              GitQuest offers a short story path. Learn Git Branching offers more lesson groups and a sandbox.
            </p>
            <a
              className="cmd-link mt-7 !bg-[var(--dq-gold)] !text-[var(--dq-blue)]"
              href="https://georgefifth.github.io/gitquest/"
              target="_blank"
              rel="noopener noreferrer"
            >
              ▶ PLAY THE GITQUEST DEMO
            </a>
          </div>
          <div className="dq-box overflow-hidden">
            <div className="dq-box-inner !p-3">
              <Image
                src="/builds/gitquest.webp"
                width={640}
                height={440}
                alt="GitQuest terminal game preview"
                className="h-auto w-full"
                priority
              />
            </div>
          </div>
        </header>

        <section aria-labelledby="comparison-title" className="dq-box">
          <div className="dq-box-inner !p-4 sm:!p-7">
            <h2 id="comparison-title" className="pixel-font text-[11px] leading-relaxed text-[var(--dq-gold)] sm:text-sm">
              CHOOSE YOUR PATH
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="border border-[var(--dq-border)] bg-[var(--night-0)] p-5">
                <h3 className="pixel-font text-[10px] leading-relaxed text-[var(--dq-gold)]">GITQUEST</h3>
                <p className="mt-3 text-xl leading-relaxed">
                  George Fifth&apos;s browser demo. Follow 11 levels in order, or open sandbox mode.
                </p>
              </div>
              <div className="border border-[var(--dq-border)] bg-[var(--night-0)] p-5">
                <h3 className="pixel-font text-[10px] leading-relaxed text-[var(--dq-cream)]">LEARN GIT BRANCHING</h3>
                <p className="mt-3 text-xl leading-relaxed">
                  A browser Git visualizer with lesson tracks, challenges, and a sandbox.
                </p>
              </div>
            </div>
            <div className="mt-4 divide-y divide-[var(--dq-border)]">
              {comparisons.map((item) => (
                <div key={item.label} className="grid gap-3 py-5 sm:grid-cols-[9rem_1fr_1fr] sm:gap-5">
                  <h3 className="text-xl text-[var(--dq-gold)]">{item.label}</h3>
                  <p className="max-w-[60ch] text-xl leading-relaxed">{item.gitquest}</p>
                  <p className="max-w-[60ch] text-xl leading-relaxed text-[var(--dq-cream)]">{item.learn}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-14 max-w-2xl">
          <h2 className="pixel-font text-[11px] leading-relaxed text-[var(--dq-gold)] sm:text-sm">
            WHICH ONE FITS?
          </h2>
          <p className="mt-5 text-xl leading-relaxed">
            Try GitQuest for a short, guided start with Git. Choose Learn Git Branching to explore more lesson groups or build your own practice in its sandbox.
          </p>
          <p className="mt-5 text-lg text-[var(--dq-muted)]">
            GitQuest is a scoped demo. This guide does not claim that it covers every Learn Git Branching lesson or feature.
          </p>
        </section>

        <nav aria-label="Project and source links" className="mx-auto mt-14 max-w-2xl border-t border-[var(--dq-border)] pt-7">
          <p className="pixel-font text-[9px] leading-relaxed text-[var(--dq-gold)]">FOLLOW THE SOURCE</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-xl">
            <Link href="/#firstcommit-gitquest" className="underline hover:text-[var(--dq-gold)]">GitQuest build log</Link>
            <a href="https://georgefifth.github.io/gitquest/" className="underline hover:text-[var(--dq-gold)]">GitQuest demo</a>
            <a href="https://devpost.com/software/gitquest" className="underline hover:text-[var(--dq-gold)]">Devpost entry</a>
            <a href="https://github.com/Georgefifth/gitquest" className="underline hover:text-[var(--dq-gold)]">GitQuest source</a>
            <a href="https://learngitbranching.js.org/" className="underline hover:text-[var(--dq-gold)]">Learn Git Branching</a>
            <a href="https://github.com/pcottle/learnGitBranching" className="underline hover:text-[var(--dq-gold)]">Lesson source</a>
          </div>
        </nav>
      </div>
    </main>
  );
}
