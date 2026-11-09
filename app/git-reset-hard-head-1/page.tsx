import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Git reset --hard HEAD~1: practice the last-commit reset | GitQuest",
  description: "See what git reset --hard HEAD~1 removes, then practice rewinding one commit in GitQuest's browser-based time travel level.",
  alternates: { canonical: "/git-reset-hard-head-1" },
  openGraph: {
    title: "Practice git reset --hard HEAD~1 | GitQuest",
    description: "Rewind one commit and see the branch move in a browser Git game.",
    url: "/git-reset-hard-head-1",
    siteName: "The Build Log",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "The Build Log pixel-art quest map" }],
    type: "article",
  },
};

export default function GitResetHardHeadOne() {
  return (
    <main className="journey-page">
      <article className="relative z-10 mx-auto max-w-4xl px-5 pb-20 pt-8 sm:px-8 sm:pt-12">
        <nav aria-label="Page navigation" className="identity-nav !max-w-none !px-0">
          <span className="text-[var(--dq-gold)]">SAVE FILE: GITQUEST</span>
          <Link href="/#firstcommit-gitquest">THE BUILD LOG ↗</Link>
        </nav>

        <header className="grid items-center gap-8 pb-12 pt-12 sm:grid-cols-[1.2fr_0.8fr] sm:gap-12 sm:pt-20">
          <div>
            <p className="section-label">TIME TRAVEL · ONE COMMIT BACK</p>
            <h1 className="pixel-font pixel-title mt-7 text-lg leading-[1.8] sm:text-2xl">GIT RESET --HARD HEAD~1</h1>
            <p className="mt-5 max-w-[58ch] text-2xl leading-snug text-[var(--dq-cream)]">Move your branch back one commit. See what disappears.</p>
            <p className="mt-3 max-w-[58ch] text-xl leading-relaxed text-[var(--dq-text)]">
              Practice the reset in GitQuest&apos;s disposable browser repo before you consider it in your own work.
            </p>
            <a className="cmd-link mt-7 !bg-[var(--dq-gold)] !text-[var(--dq-blue)]" href="https://georgefifth.github.io/gitquest/" target="_blank" rel="noopener noreferrer">▶ PLAY THE TIME TRAVEL LEVEL</a>
          </div>
          <div className="dq-box overflow-hidden">
            <div className="dq-box-inner !p-3">
              <Image src="/builds/gitquest.webp" width={640} height={440} alt="GitQuest terminal beside its changing commit graph" className="h-auto w-full" priority />
            </div>
          </div>
        </header>

        <section className="dq-box" aria-labelledby="meaning">
          <div className="dq-box-inner !p-5 sm:!p-8">
            <h2 id="meaning" className="pixel-font text-[11px] leading-relaxed text-[var(--dq-gold)] sm:text-sm">WHAT THE COMMAND DOES</h2>
            <p className="mt-5 max-w-[65ch] text-xl leading-relaxed">
              <code>HEAD</code> names the commit you currently have checked out. <code>HEAD~1</code> names its first parent, one commit earlier. <code>git reset --hard HEAD~1</code> moves your current branch to that parent. It also updates tracked files and the index to match that earlier commit.
            </p>
            <p className="mt-5 max-w-[65ch] text-xl leading-relaxed">
              Imagine a straight graph: <code>A → B → C</code>, with <code>main</code> at <code>C</code>. Run the command while on <code>main</code>, and its label moves to <code>B</code>. Commit <code>C</code> is no longer on that branch. Tracked edits made after <code>B</code> are discarded from your working files. Untracked files usually remain.
            </p>
            <p className="mt-5 max-w-[65ch] text-xl leading-relaxed">
              This is different from <code>git reset --hard HEAD</code>. That command keeps the branch at the same commit and discards tracked, uncommitted changes. The <code>~1</code> is what moves the branch back.
            </p>
          </div>
        </section>

        <section className="mx-auto mt-14 max-w-2xl" aria-labelledby="practice">
          <h2 id="practice" className="pixel-font text-[11px] leading-relaxed text-[var(--dq-gold)] sm:text-sm">PRACTICE THE RESET</h2>
          <p className="mt-5 text-xl leading-relaxed">Open GitQuest and reach its <strong>time travel</strong> level. Earlier levels unlock it. The level asks you to reset <code>main</code> back one commit. The graph shows where <code>main</code> points before you type anything.</p>
          <ol className="mt-8 divide-y divide-[var(--dq-border)]">
            <li className="grid gap-3 py-6 sm:grid-cols-[3rem_1fr] sm:gap-6"><span className="pixel-font text-[11px] text-[var(--dq-gold)]">01</span><div><h3 className="text-2xl text-[var(--dq-cream)]">Check the current branch</h3><p className="mt-2 text-xl leading-relaxed">Read the branch label beside the newest commit. The level starts on <code>main</code>. A reset changes the branch you are on, so confirm it before you act.</p></div></li>
            <li className="grid gap-3 py-6 sm:grid-cols-[3rem_1fr] sm:gap-6"><span className="pixel-font text-[11px] text-[var(--dq-gold)]">02</span><div><h3 className="text-2xl text-[var(--dq-cream)]"><code>git reset --hard HEAD~1</code></h3><p className="mt-2 text-xl leading-relaxed">Type this exact command in the game terminal. Watch <code>main</code> move to its parent. Compare the result with the target graph.</p></div></li>
            <li className="grid gap-3 py-6 sm:grid-cols-[3rem_1fr] sm:gap-6"><span className="pixel-font text-[11px] text-[var(--dq-gold)]">03</span><div><h3 className="text-2xl text-[var(--dq-cream)]">Explain the change</h3><p className="mt-2 text-xl leading-relaxed">Name the commit that lost the <code>main</code> label. Notice that the command changed the branch history, not just the visible file contents. Reset the level and try again until you can predict the graph.</p></div></li>
          </ol>
        </section>

        <section className="mx-auto mt-14 max-w-2xl" aria-labelledby="real-repo">
          <h2 id="real-repo" className="pixel-font text-[11px] leading-relaxed text-[var(--dq-gold)] sm:text-sm">BEFORE YOU USE IT IN A REAL REPO</h2>
          <p className="mt-5 text-xl leading-relaxed">Run <code>git status</code> and inspect your recent commits with <code>git log --oneline -3</code>. Check which branch is active and whether you need the current tracked changes. A hard reset can discard work that has not been committed. If you only want to undo a shared commit without rewriting its branch, <code>git revert</code> creates a new inverse commit instead.</p>
          <p className="mt-5 text-xl leading-relaxed">If you reset the wrong commit, <code>git reflog</code> may show the earlier branch tip while Git still retains it. That is a recovery path for commits, not a promise that discarded uncommitted edits can return. The <a className="underline hover:text-[var(--dq-gold)]" href="https://git-scm.com/docs/git-reset">official Git reset reference</a> explains how each reset mode treats the branch, index, and working tree.</p>
          <p className="mt-5 text-xl leading-relaxed">GitQuest uses a simulated repository. The time travel level cannot change files on your computer or push a rewritten branch. Use it to learn the shape of the operation, then make a backup branch before trying the command on important local work.</p>
        </section>

        <nav aria-label="Project and source links" className="mx-auto mt-14 max-w-2xl border-t border-[var(--dq-border)] pt-7">
          <p className="pixel-font text-[9px] leading-relaxed text-[var(--dq-gold)]">FOLLOW THE SOURCE</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-xl">
            <Link href="/#firstcommit-gitquest" className="underline hover:text-[var(--dq-gold)]">GitQuest build log</Link>
            <Link href="/git-rebase-practice" className="underline hover:text-[var(--dq-gold)]">Rebase practice</Link>
            <a href="https://georgefifth.github.io/gitquest/" className="underline hover:text-[var(--dq-gold)]">GitQuest demo</a>
            <a href="https://github.com/Georgefifth/gitquest" className="underline hover:text-[var(--dq-gold)]">GitQuest source</a>
          </div>
        </nav>
      </article>
    </main>
  );
}
