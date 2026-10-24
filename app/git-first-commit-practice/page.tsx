import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Practice your first Git commit online | GitQuest",
  description:
    "Practice git init, git add, and git commit in two free browser exercises. Follow the exact commands, check the commit graph, and repeat them in a real project.",
  alternates: { canonical: "/git-first-commit-practice" },
  openGraph: {
    title: "Practice your first Git commit online | GitQuest",
    description:
      "Two short browser exercises take you from an empty workspace to your first Git commit.",
    url: "/git-first-commit-practice",
    siteName: "The Build Log",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "The Build Log pixel-art quest map" }],
    type: "article",
  },
};

const commands = [
  { command: "git init", result: "The empty workspace becomes a repository. GitQuest shows an empty repo and a main branch." },
  { command: "touch README.md", result: "A new file appears. It exists in the workspace, but Git has not saved it." },
  { command: "git add README.md", result: "The file enters Git's staging area. You have chosen what the next commit will include." },
  { command: 'git commit -m "Add README"', result: "Git records the staged file. The graph gains its first commit on main." },
];

export default function GitFirstCommitPractice() {
  return (
    <main className="journey-page">
      <article className="relative z-10 mx-auto max-w-4xl px-5 pb-20 pt-8 sm:px-8 sm:pt-12">
        <nav aria-label="Page navigation" className="identity-nav !max-w-none !px-0">
          <span className="text-[var(--dq-gold)]">SAVE FILE: GITQUEST</span>
          <Link href="/#firstcommit-gitquest">THE BUILD LOG ↗</Link>
        </nav>

        <header className="grid items-center gap-8 pb-12 pt-12 sm:grid-cols-[1.2fr_0.8fr] sm:gap-12 sm:pt-20">
          <div>
            <p className="section-label">TWO LEVELS. ONE REAL IDEA.</p>
            <h1 className="pixel-font pixel-title mt-7 text-lg leading-[1.8] sm:text-2xl">
              PRACTICE YOUR FIRST GIT COMMIT ONLINE
            </h1>
            <p className="mt-5 max-w-[58ch] text-2xl leading-snug text-[var(--dq-cream)]">
              Turn an empty folder into a saved piece of history.
            </p>
            <p className="mt-3 max-w-[58ch] text-xl leading-relaxed text-[var(--dq-text)]">
              GitQuest lets you type the commands in a browser and watch the repository change. Start with its first two levels.
            </p>
            <a className="cmd-link mt-7 !bg-[var(--dq-gold)] !text-[var(--dq-blue)]" href="https://georgefifth.github.io/gitquest/" target="_blank" rel="noopener noreferrer">
              ▶ PRACTICE IN GITQUEST
            </a>
          </div>
          <div className="dq-box overflow-hidden">
            <div className="dq-box-inner !p-3">
              <Image src="/builds/gitquest.webp" width={640} height={440} alt="GitQuest terminal and repository graph" className="h-auto w-full" priority />
            </div>
          </div>
        </header>

        <section className="dq-box" aria-labelledby="walkthrough">
          <div className="dq-box-inner !p-5 sm:!p-8">
            <h2 id="walkthrough" className="pixel-font text-[11px] leading-relaxed text-[var(--dq-gold)] sm:text-sm">THE FOUR COMMANDS</h2>
            <p className="mt-5 max-w-[65ch] text-xl leading-relaxed">
              Open GitQuest and press Enter at the title screen. Choose <strong>01 wake up, repo</strong> on the map. The goal is to initialize an empty repository. Enter <code>git init</code> in the terminal. The repository panel changes, and the game opens the next level.
            </p>
            <p className="mt-5 max-w-[65ch] text-xl leading-relaxed">
              Choose <strong>02 the first commit</strong>. This level starts with a repository but no commits. It asks you to create <code>README.md</code>, stage it, and commit it. Type each command below and press Enter. Watch both the terminal response and the repository panel before you move on.
            </p>
            <ol className="mt-8 divide-y divide-[var(--dq-border)]">
              {commands.map((step, index) => (
                <li key={step.command} className="grid gap-3 py-6 sm:grid-cols-[3rem_1fr] sm:gap-6">
                  <span className="pixel-font text-[11px] text-[var(--dq-gold)]">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-2xl text-[var(--dq-cream)]"><code>{step.command}</code></h3>
                    <p className="mt-2 max-w-[65ch] text-xl leading-relaxed">{step.result}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-5 max-w-[65ch] text-xl leading-relaxed">
              GitQuest runs <code>git init</code> for you when level 02 begins. The first row shows the full sequence across both levels. In level 02, start at <code>touch README.md</code>. When the graph gains a commit, you have finished the level.
            </p>
          </div>
        </section>

        <section className="mx-auto mt-14 max-w-2xl" aria-labelledby="meaning">
          <h2 id="meaning" className="pixel-font text-[11px] leading-relaxed text-[var(--dq-gold)] sm:text-sm">WHAT EACH STEP MEANS</h2>
          <p className="mt-5 text-xl leading-relaxed">
            <code>git init</code> prepares the folder for Git history. It does not save your files as a commit. <code>touch README.md</code> creates a file in GitQuest&apos;s simulated workspace. The file can change or disappear before you record it. That is why the empty repository still has no history after the first command.
          </p>
          <p className="mt-5 text-xl leading-relaxed">
            <code>git add README.md</code> selects the file for the next commit. Git calls this selection the index, or staging area. If you change the file after staging it, you may need to add it again to include the new content. <a className="underline hover:text-[var(--dq-gold)]" href="https://git-scm.com/docs/git-add">Git&apos;s add reference</a> explains that Git records the content as it stands when you stage it.
          </p>
          <p className="mt-5 text-xl leading-relaxed">
            <code>git commit -m &quot;Add README&quot;</code> records the staged snapshot with a short message. The message tells your future self what changed. The graph shows the new commit on the current branch. If you skip <code>git add</code>, the new file is not in that snapshot. The distinction between a file you made and a change you committed is the lesson to keep.
          </p>
        </section>

        <section className="mx-auto mt-14 max-w-2xl" aria-labelledby="check">
          <h2 id="check" className="pixel-font text-[11px] leading-relaxed text-[var(--dq-gold)] sm:text-sm">CHECK YOUR RESULT</h2>
          <p className="mt-5 text-xl leading-relaxed">
            In GitQuest, the terminal confirms the commit and the repository panel shows it on <code>main</code>. The game also shows a completion screen when your repository matches the target. If the level does not finish, open its objective, compare the target graph with yours, and read the last terminal message. You can reset the level without affecting a real project.
          </p>
          <p className="mt-5 text-xl leading-relaxed">
            In a real local repository, use <code>git status</code> to see what is staged or untracked. After the commit, use <code>git log -1 --oneline</code> to see your latest recorded change. The Git documentation covers <a className="underline hover:text-[var(--dq-gold)]" href="https://git-scm.com/docs/git-status">status</a> and <a className="underline hover:text-[var(--dq-gold)]" href="https://git-scm.com/docs/git-log">log</a> in detail. These checks make the result visible when a game panel is no longer there to show you.
          </p>
        </section>

        <section className="mx-auto mt-14 max-w-2xl" aria-labelledby="troubleshoot">
          <h2 id="troubleshoot" className="pixel-font text-[11px] leading-relaxed text-[var(--dq-gold)] sm:text-sm">IF THE COMMIT DOES NOT APPEAR</h2>
          <p className="mt-5 text-xl leading-relaxed">
            First, check the file name. This exercise asks for <code>README.md</code>, so another name will not match its target. Next, check that you ran <code>git add README.md</code> after creating the file. A new file is not staged just because it exists. Then check the quotation marks around the commit message. If the terminal reports an error, fix that line and try again; do not guess what the graph should show.
          </p>
          <p className="mt-5 text-xl leading-relaxed">
            GitQuest is a simulator for practice. Its <code>touch</code> command and terminal support the lesson, but they are not your computer&apos;s shell. When you understand the graph, create a small folder on your computer and repeat the Git commands there. Make a real <code>README.md</code> with one line of text before you stage it. A real Git install may also ask you to set your name and email before the first commit. Follow that message if it appears.
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
