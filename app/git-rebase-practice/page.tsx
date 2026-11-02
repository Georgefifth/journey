import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Practice Git rebase online | GitQuest",
  description: "Practice git rebase in a browser. Replay a feature commit on top of main, inspect the graph, and learn what changes before trying it in a real repo.",
  alternates: { canonical: "/git-rebase-practice" },
  openGraph: {
    title: "Practice Git rebase online | GitQuest",
    description: "Two commands, one changed commit graph. Try GitQuest's linear dream level in your browser.",
    url: "/git-rebase-practice",
    siteName: "The Build Log",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "The Build Log pixel-art quest map" }],
    type: "article",
  },
};

export default function GitRebasePractice() {
  return (
    <main className="journey-page">
      <article className="relative z-10 mx-auto max-w-4xl px-5 pb-20 pt-8 sm:px-8 sm:pt-12">
        <nav aria-label="Page navigation" className="identity-nav !max-w-none !px-0">
          <span className="text-[var(--dq-gold)]">SAVE FILE: GITQUEST</span>
          <Link href="/#firstcommit-gitquest">THE BUILD LOG ↗</Link>
        </nav>

        <header className="grid items-center gap-8 pb-12 pt-12 sm:grid-cols-[1.2fr_0.8fr] sm:gap-12 sm:pt-20">
          <div>
            <p className="section-label">MOVE A BRANCH. KEEP THE WORK.</p>
            <h1 className="pixel-font pixel-title mt-7 text-lg leading-[1.8] sm:text-2xl">PRACTICE GIT REBASE ONLINE</h1>
            <p className="mt-5 max-w-[58ch] text-2xl leading-snug text-[var(--dq-cream)]">Put your feature commit after main&apos;s latest commit.</p>
            <p className="mt-3 max-w-[58ch] text-xl leading-relaxed text-[var(--dq-text)]">
              GitQuest lets you type the commands and watch the commit graph change. Try its linear dream level in a disposable browser repo.
            </p>
            <a className="cmd-link mt-7 !bg-[var(--dq-gold)] !text-[var(--dq-blue)]" href="https://georgefifth.github.io/gitquest/" target="_blank" rel="noopener noreferrer">▶ PRACTICE IN GITQUEST</a>
          </div>
          <div className="dq-box overflow-hidden">
            <div className="dq-box-inner !p-3">
              <Image src="/builds/gitquest.webp" width={640} height={440} alt="GitQuest terminal beside its repository graph" className="h-auto w-full" priority />
            </div>
          </div>
        </header>

        <section className="dq-box" aria-labelledby="mission">
          <div className="dq-box-inner !p-5 sm:!p-8">
            <h2 id="mission" className="pixel-font text-[11px] leading-relaxed text-[var(--dq-gold)] sm:text-sm">THE MISSION</h2>
            <p className="mt-5 max-w-[65ch] text-xl leading-relaxed">
              Open GitQuest and select <strong>linear dream</strong> from its level map. Earlier levels unlock it. The game sets up two branches for you. A base commit sits below both. <code>feature</code> adds a commit called <code>feature work</code>. Then <code>main</code> adds <code>main advances</code>. The branches now split from the same base.
            </p>
            <p className="mt-5 max-w-[65ch] text-xl leading-relaxed">
              Your goal is a straight history: base, then main&apos;s new commit, then the feature work. Finish on <code>feature</code>. You do not need to create the setup commits yourself; they are already in the level.
            </p>
            <ol className="mt-8 divide-y divide-[var(--dq-border)]">
              <li className="grid gap-3 py-6 sm:grid-cols-[3rem_1fr] sm:gap-6">
                <span className="pixel-font text-[11px] text-[var(--dq-gold)]">01</span>
                <div><h3 className="text-2xl text-[var(--dq-cream)]"><code>git switch feature</code></h3><p className="mt-2 max-w-[65ch] text-xl leading-relaxed">Move to the branch whose commit you want to replay. Rebase acts on the branch you are on. Check the branch label in the graph before moving on.</p></div>
              </li>
              <li className="grid gap-3 py-6 sm:grid-cols-[3rem_1fr] sm:gap-6">
                <span className="pixel-font text-[11px] text-[var(--dq-gold)]">02</span>
                <div><h3 className="text-2xl text-[var(--dq-cream)]"><code>git rebase main</code></h3><p className="mt-2 max-w-[65ch] text-xl leading-relaxed">Replay the feature work on top of main&apos;s current tip. The graph should become one line, with <code>feature</code> at the newest commit and <code>main</code> one commit behind it.</p></div>
              </li>
            </ol>
          </div>
        </section>

        <section className="mx-auto mt-14 max-w-2xl" aria-labelledby="graph">
          <h2 id="graph" className="pixel-font text-[11px] leading-relaxed text-[var(--dq-gold)] sm:text-sm">READ THE NEW GRAPH</h2>
          <p className="mt-5 text-xl leading-relaxed">Before the rebase, the feature and main commits share a parent. Neither sits above the other. After the rebase, Git replays the feature change after main&apos;s commit. The feature branch points to that new copy. Main stays where it was.</p>
          <p className="mt-5 text-xl leading-relaxed">Look closely at the feature commit. Its message and change may look familiar, but its parent is different, so its commit identity changes. Rebase does not simply drag the old commit to a new spot. That detail matters when another person has already based work on the old history.</p>
          <p className="mt-5 text-xl leading-relaxed">The game checks the resulting graph, not just the command text. If you switch to <code>main</code> and run <code>git rebase feature</code>, you move the wrong branch. The graph will tell you that even if the command itself succeeds.</p>
        </section>

        <section className="mx-auto mt-14 max-w-2xl" aria-labelledby="why">
          <h2 id="why" className="pixel-font text-[11px] leading-relaxed text-[var(--dq-gold)] sm:text-sm">WHEN TO USE THIS IN REAL WORK</h2>
          <p className="mt-5 text-xl leading-relaxed">A rebase can bring your local feature branch up to date before you ask for review. It keeps the branch history in a line and lets you see your change after the latest work on main. That can make a small change easier to read.</p>
          <p className="mt-5 text-xl leading-relaxed">It is a poor first move on a shared branch. Rebase rewrites commit identities. Anyone who pulled the earlier commits may need to reconcile a different history. Ask your team how it handles shared branches before you rebase one.</p>
          <p className="mt-5 text-xl leading-relaxed">Use <code>git status</code> before you start in a real repository. Save or commit unfinished work. If Git stops on a conflict, inspect both changes, resolve the file, stage it, and run <code>git rebase --continue</code>. Use <code>git rebase --abort</code> when you need to return to the pre-rebase state. The <a className="underline hover:text-[var(--dq-gold)]" href="https://git-scm.com/docs/git-rebase">official Git rebase reference</a> explains these commands and their effects.</p>
        </section>

        <section className="mx-auto mt-14 max-w-2xl" aria-labelledby="stuck">
          <h2 id="stuck" className="pixel-font text-[11px] leading-relaxed text-[var(--dq-gold)] sm:text-sm">IF THE LEVEL DOES NOT FINISH</h2>
          <p className="mt-5 text-xl leading-relaxed">Confirm you are on <code>feature</code>. Then compare the graph with the target: main&apos;s new commit must be below the replayed feature commit. If the branches still fork, the rebase did not change the intended branch.</p>
          <p className="mt-5 text-xl leading-relaxed">Reset the level if the graph is hard to read, and run only the two commands above. This reset affects GitQuest&apos;s simulated repo. It does not touch a project on your computer. Once you can explain the graph, try the same sequence in a disposable local repository.</p>
        </section>

        <nav aria-label="Project and source links" className="mx-auto mt-14 max-w-2xl border-t border-[var(--dq-border)] pt-7">
          <p className="pixel-font text-[9px] leading-relaxed text-[var(--dq-gold)]">FOLLOW THE SOURCE</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-xl">
            <Link href="/#firstcommit-gitquest" className="underline hover:text-[var(--dq-gold)]">GitQuest build log</Link>
            <Link href="/git-branching-practice" className="underline hover:text-[var(--dq-gold)]">Git branching practice</Link>
            <Link href="/git-merge-conflict-practice" className="underline hover:text-[var(--dq-gold)]">Git merge conflict practice</Link>
            <a href="https://georgefifth.github.io/gitquest/" className="underline hover:text-[var(--dq-gold)]">GitQuest demo</a>
            <a href="https://github.com/Georgefifth/gitquest" className="underline hover:text-[var(--dq-gold)]">GitQuest source</a>
          </div>
        </nav>
      </article>
    </main>
  );
}
