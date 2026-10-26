import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Practice Git branching online | GitQuest",
  description: "Create a feature branch, commit a file, and see why main stays put. Follow GitQuest's branching out exercise in your browser.",
  alternates: { canonical: "/git-branching-practice" },
  openGraph: {
    title: "Practice Git branching online | GitQuest",
    description: "A short browser exercise that makes a feature branch visible in the commit graph.",
    url: "/git-branching-practice",
    siteName: "The Build Log",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "The Build Log pixel-art quest map" }],
    type: "article",
  },
};

const steps = [
  { command: "git switch -c feature", detail: "Create feature from the current commit and switch to it. The branch starts at the same point as main." },
  { command: "touch feature.js", detail: "Make a new file in GitQuest's simulated workspace. This does not create a commit yet." },
  { command: "git add .", detail: "Stage the new file so the next commit includes it." },
  { command: 'git commit -m "feature work"', detail: "Record the change on feature. The graph moves feature forward while main stays at the starting commit." },
];

export default function GitBranchingPractice() {
  return (
    <main className="journey-page">
      <article className="relative z-10 mx-auto max-w-4xl px-5 pb-20 pt-8 sm:px-8 sm:pt-12">
        <nav aria-label="Page navigation" className="identity-nav !max-w-none !px-0">
          <span className="text-[var(--dq-gold)]">SAVE FILE: GITQUEST</span>
          <Link href="/#firstcommit-gitquest">THE BUILD LOG ↗</Link>
        </nav>

        <header className="grid items-center gap-8 pb-12 pt-12 sm:grid-cols-[1.2fr_0.8fr] sm:gap-12 sm:pt-20">
          <div>
            <p className="section-label">ONE START. TWO PATHS.</p>
            <h1 className="pixel-font pixel-title mt-7 text-lg leading-[1.8] sm:text-2xl">PRACTICE GIT BRANCHING ONLINE</h1>
            <p className="mt-5 max-w-[58ch] text-2xl leading-snug text-[var(--dq-cream)]">Make a commit without moving main.</p>
            <p className="mt-3 max-w-[58ch] text-xl leading-relaxed text-[var(--dq-text)]">
              GitQuest shows where each branch points as you type. Its branching out level gives you one short route to try.
            </p>
            <a className="cmd-link mt-7 !bg-[var(--dq-gold)] !text-[var(--dq-blue)]" href="https://georgefifth.github.io/gitquest/" target="_blank" rel="noopener noreferrer">▶ PRACTICE IN GITQUEST</a>
          </div>
          <div className="dq-box overflow-hidden">
            <div className="dq-box-inner !p-3">
              <Image src="/builds/gitquest.webp" width={640} height={440} alt="GitQuest terminal beside its repository graph" className="h-auto w-full" priority />
            </div>
          </div>
        </header>

        <section className="dq-box" aria-labelledby="route">
          <div className="dq-box-inner !p-5 sm:!p-8">
            <h2 id="route" className="pixel-font text-[11px] leading-relaxed text-[var(--dq-gold)] sm:text-sm">THE FOUR COMMANDS</h2>
            <p className="mt-5 max-w-[65ch] text-xl leading-relaxed">
              Open GitQuest and choose <strong>branching out</strong> on the level map. Earlier levels unlock it. This level begins with <code>app.js</code> committed on <code>main</code>. Your goal is one new commit on <code>feature</code>, with <code>main</code> still at its original commit.
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

        <section className="mx-auto mt-14 max-w-2xl" aria-labelledby="graph">
          <h2 id="graph" className="pixel-font text-[11px] leading-relaxed text-[var(--dq-gold)] sm:text-sm">READ THE GRAPH</h2>
          <p className="mt-5 text-xl leading-relaxed">
            A branch is a name that points to a commit. At first, <code>main</code> and <code>feature</code> point to the same one. The new commit advances <code>feature</code>. <code>main</code> still points to the parent. That is the result this level checks.
          </p>
          <p className="mt-5 text-xl leading-relaxed">
            Use <code>git branch</code> or <code>git status</code> to check your current branch before you commit. The <code>*</code> in <code>git branch</code> marks the checked-out branch. Git&apos;s <a className="underline hover:text-[var(--dq-gold)]" href="https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell">branching guide</a> explains how branch pointers move in a real repository.
          </p>
        </section>

        <section className="mx-auto mt-14 max-w-2xl" aria-labelledby="stuck">
          <h2 id="stuck" className="pixel-font text-[11px] leading-relaxed text-[var(--dq-gold)] sm:text-sm">IF THE LEVEL DOES NOT FINISH</h2>
          <p className="mt-5 text-xl leading-relaxed">
            Check that you created a branch named exactly <code>feature</code>. Then check that you are on it. <code>git branch feature</code> creates a branch without switching; <code>git switch -c feature</code> does both. If you committed on <code>main</code>, reset the level and run the switch command before making the file.
          </p>
          <p className="mt-5 text-xl leading-relaxed">
            Check that you staged <code>feature.js</code> before committing. GitQuest runs a simulated terminal, so its file and graph stay in the game. When the route makes sense, repeat it in a small local repository. Keep your real work safe by checking <code>git status</code> before changing branches.
          </p>
        </section>

        <nav aria-label="Project and source links" className="mx-auto mt-14 max-w-2xl border-t border-[var(--dq-border)] pt-7">
          <p className="pixel-font text-[9px] leading-relaxed text-[var(--dq-gold)]">FOLLOW THE SOURCE</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-xl">
            <Link href="/#firstcommit-gitquest" className="underline hover:text-[var(--dq-gold)]">GitQuest build log</Link>
            <Link href="/git-first-commit-practice" className="underline hover:text-[var(--dq-gold)]">First Git commit practice</Link>
            <Link href="/git-merge-conflict-practice" className="underline hover:text-[var(--dq-gold)]">Git merge conflict practice</Link>
            <Link href="/github-skills-alternative" className="underline hover:text-[var(--dq-gold)]">GitHub Skills alternative</Link>
            <a href="https://georgefifth.github.io/gitquest/" className="underline hover:text-[var(--dq-gold)]">GitQuest demo</a>
            <a href="https://github.com/Georgefifth/gitquest" className="underline hover:text-[var(--dq-gold)]">GitQuest source</a>
          </div>
        </nav>
      </article>
    </main>
  );
}
