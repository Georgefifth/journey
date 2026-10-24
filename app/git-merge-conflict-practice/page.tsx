import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Practice resolving a Git merge conflict online | GitQuest",
  description: "Practice a Git merge conflict in your browser. Read conflict markers, choose the final file content, stage it, and finish the merge in GitQuest.",
  alternates: { canonical: "/git-merge-conflict-practice" },
  openGraph: {
    title: "Practice resolving a Git merge conflict online | GitQuest",
    description: "A browser exercise for reading conflict markers and finishing a Git merge.",
    url: "/git-merge-conflict-practice",
    siteName: "The Build Log",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "The Build Log pixel-art quest map" }],
    type: "article",
  },
};

const steps = [
  { command: "git merge tuning", detail: "Merge the tuning branch into main. Both branches changed config.txt, so Git stops and asks you to resolve the clash." },
  { command: "cat config.txt", detail: "Read both proposed versions and the conflict markers. The markers show which lines came from each side." },
  { command: 'echo "v2" > config.txt', detail: "Replace the conflicted file with the exact final content the level requests. This also removes the conflict markers." },
  { command: "git add config.txt", detail: "Tell Git that config.txt now holds your resolved version." },
  { command: 'git commit -m "merge tuning"', detail: "Finish the merge. The graph should join both lines of history with a merge commit." },
];

export default function GitMergeConflictPractice() {
  return (
    <main className="journey-page">
      <article className="relative z-10 mx-auto max-w-4xl px-5 pb-20 pt-8 sm:px-8 sm:pt-12">
        <nav aria-label="Page navigation" className="identity-nav !max-w-none !px-0">
          <span className="text-[var(--dq-gold)]">SAVE FILE: GITQUEST</span>
          <Link href="/#firstcommit-gitquest">THE BUILD LOG ↗</Link>
        </nav>

        <header className="grid items-center gap-8 pb-12 pt-12 sm:grid-cols-[1.2fr_0.8fr] sm:gap-12 sm:pt-20">
          <div>
            <p className="section-label">ONE FILE. TWO BRANCHES. YOUR CALL.</p>
            <h1 className="pixel-font pixel-title mt-7 text-lg leading-[1.8] sm:text-2xl">PRACTICE A GIT MERGE CONFLICT ONLINE</h1>
            <p className="mt-5 max-w-[58ch] text-2xl leading-snug text-[var(--dq-cream)]">Resolve a real choice between two versions.</p>
            <p className="mt-3 max-w-[58ch] text-xl leading-relaxed text-[var(--dq-text)]">
              GitQuest gives you a safe browser exercise. Merge two branches, read the conflict, and choose what the file should say.
            </p>
            <a className="cmd-link mt-7 !bg-[var(--dq-gold)] !text-[var(--dq-blue)]" href="https://georgefifth.github.io/gitquest/" target="_blank" rel="noopener noreferrer">▶ PRACTICE IN GITQUEST</a>
          </div>
          <div className="dq-box overflow-hidden">
            <div className="dq-box-inner !p-3">
              <Image src="/builds/gitquest-conflict.png" width={1350} height={900} alt="GitQuest conflict resolution level with terminal and commit graph" className="h-auto w-full" priority />
            </div>
          </div>
        </header>

        <section className="dq-box" aria-labelledby="walkthrough">
          <div className="dq-box-inner !p-5 sm:!p-8">
            <h2 id="walkthrough" className="pixel-font text-[11px] leading-relaxed text-[var(--dq-gold)] sm:text-sm">THE PRACTICE ROUTE</h2>
            <p className="mt-5 max-w-[65ch] text-xl leading-relaxed">
              Open the game and choose <strong>conflict resolution</strong> from its level map. The exercise starts with a main branch and a tuning branch. Both changed <code>config.txt</code> after their shared starting point. Your goal is to merge tuning into main and leave that file containing exactly <code>v2</code>.
            </p>
            <p className="mt-5 max-w-[65ch] text-xl leading-relaxed">
              The conflict is deliberate. Git can combine separate edits on its own, but it cannot choose between changes to the same lines. You make that decision in the file, then tell Git the decision is complete.
            </p>
            <ol className="mt-8 divide-y divide-[var(--dq-border)]">
              {steps.map((step, index) => (
                <li key={step.command} className="grid gap-3 py-6 sm:grid-cols-[3rem_1fr] sm:gap-6">
                  <span className="pixel-font text-[11px] text-[var(--dq-gold)]">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-2xl text-[var(--dq-cream)]"><code>{step.command}</code></h3>
                    <p className="mt-2 max-w-[65ch] text-xl leading-relaxed">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mx-auto mt-14 max-w-2xl" aria-labelledby="markers">
          <h2 id="markers" className="pixel-font text-[11px] leading-relaxed text-[var(--dq-gold)] sm:text-sm">READ THE MARKERS BEFORE YOU EDIT</h2>
          <p className="mt-5 text-xl leading-relaxed">
            The line after <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</code> comes from the branch you were on. The line after <code>=======</code> comes from the branch being merged. <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt; tuning</code> ends that conflicted region. In this level, one side says <code>v2-stable</code> and the other says <code>v2-beta</code>. The requested answer is <code>v2</code>, so simply keeping either side would miss the goal.
          </p>
          <p className="mt-5 text-xl leading-relaxed">
            In a real project, read the surrounding code and ask what behavior the team needs. You may keep one side, combine both, or write a third version. Remove every marker before staging. Git&apos;s <a className="underline hover:text-[var(--dq-gold)]" href="https://git-scm.com/docs/git-merge#_how_conflicts_are_presented">merge documentation</a> shows the same marker format outside the game.
          </p>
        </section>

        <section className="mx-auto mt-14 max-w-2xl" aria-labelledby="finish">
          <h2 id="finish" className="pixel-font text-[11px] leading-relaxed text-[var(--dq-gold)] sm:text-sm">HOW TO KNOW THE MERGE FINISHED</h2>
          <p className="mt-5 text-xl leading-relaxed">
            After the commit, inspect the graph in GitQuest. The new commit should have two parents: the earlier main history and the tuning branch. The game checks both the graph and the resolved file content. If it still shows a conflict, check that you replaced the file, ran <code>git add config.txt</code>, and then committed.
          </p>
          <p className="mt-5 text-xl leading-relaxed">
            In a local repository, <code>git status</code> tells you whether any unmerged paths remain. If you started a merge by mistake and have not finished it, <code>git merge --abort</code> attempts to restore the state from before that merge. Do not use abort as the solution here: the exercise asks you to complete the merge. See the official <a className="underline hover:text-[var(--dq-gold)]" href="https://git-scm.com/docs/git-merge">merge reference</a> for the real command&apos;s limits.
          </p>
        </section>

        <section className="mx-auto mt-14 max-w-2xl" aria-labelledby="stuck">
          <h2 id="stuck" className="pixel-font text-[11px] leading-relaxed text-[var(--dq-gold)] sm:text-sm">IF YOU GET STUCK</h2>
          <p className="mt-5 text-xl leading-relaxed">
            If <code>git merge tuning</code> does not produce a conflict, check which level you opened. The conflict resolution level starts with the two branches already prepared. You do not need to create either branch. If you entered another level, return to the map and select the one named <strong>conflict resolution</strong>.
          </p>
          <p className="mt-5 text-xl leading-relaxed">
            If Git still says the file is unmerged after your edit, run <code>git add config.txt</code>. Editing the file and staging the resolution are separate steps. If the level rejects a completed merge, check the file&apos;s exact content. It asks for <code>v2</code>, without <code>-stable</code>, <code>-beta</code>, or conflict markers. The target is intentionally a third version, so the lesson cannot be passed by blindly choosing one side.
          </p>
          <p className="mt-5 text-xl leading-relaxed">
            If the graph looks wrong, read the level objective before trying more commands. A merge commit joins histories; another ordinary commit on one branch does not. The simulator lets you reset the level and try again. In a real team repository, pause before rewriting history or discarding any work. Ask a teammate when you cannot tell whose changes a line represents.
          </p>
        </section>

        <section className="mx-auto mt-14 max-w-2xl" aria-labelledby="transfer">
          <h2 id="transfer" className="pixel-font text-[11px] leading-relaxed text-[var(--dq-gold)] sm:text-sm">TAKE THE LESSON INTO YOUR REPO</h2>
          <p className="mt-5 text-xl leading-relaxed">
            GitQuest simulates a terminal and repository. It is practice, not a change to files on your computer. Once you can explain why <code>v2</code> is the resolved content, try a small local exercise with two branches that edit one line of a scratch file. Merge them, inspect the markers, write the final line, stage, and commit. That repetition turns a warning message into a decision you know how to make.
          </p>
        </section>

        <nav aria-label="Project and source links" className="mx-auto mt-14 max-w-2xl border-t border-[var(--dq-border)] pt-7">
          <p className="pixel-font text-[9px] leading-relaxed text-[var(--dq-gold)]">FOLLOW THE SOURCE</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-xl">
            <Link href="/#firstcommit-gitquest" className="underline hover:text-[var(--dq-gold)]">GitQuest build log</Link>
            <Link href="/interactive-git-learning-game" className="underline hover:text-[var(--dq-gold)]">Interactive Git learning game guide</Link>
            <Link href="/git-branching-practice" className="underline hover:text-[var(--dq-gold)]">Git branching practice</Link>
            <a href="https://georgefifth.github.io/gitquest/" className="underline hover:text-[var(--dq-gold)]">GitQuest demo</a>
            <a href="https://github.com/Georgefifth/gitquest" className="underline hover:text-[var(--dq-gold)]">GitQuest source</a>
          </div>
        </nav>
      </article>
    </main>
  );
}
