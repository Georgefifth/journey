import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Interactive Git learning game: try GitQuest in your browser",
  description:
    "Practice Git commands in an 11-level browser game. See your repository change as you type, then try branches, merges, and a sandbox in GitQuest.",
  alternates: { canonical: "/interactive-git-learning-game" },
};

const steps = [
  {
    number: "01",
    title: "Start with an empty repository",
    body: "The first level asks you to initialize a repository. Type git init into the game terminal. The repository panel changes from empty to initialized, so the command has a visible result.",
  },
  {
    number: "02",
    title: "Make history you can see",
    body: "The next levels move into commits and their history. The point is to connect each command with a change in the graph, rather than memorize a list of commands without context.",
  },
  {
    number: "03",
    title: "Follow the branch path",
    body: "Later levels are named branching out, parallel worlds, the merge, and conflict resolution. Work through them in order to see how a branch and a merge change the story of a repository.",
  },
  {
    number: "04",
    title: "Try your own commands",
    body: "The map also offers sandbox mode. Open it when you want to test a command without following a level objective. Reset the practice state when you need a fresh start.",
  },
];

export default function InteractiveGitLearningGame() {
  return (
    <main className="journey-page">
      <div className="relative z-10 mx-auto max-w-4xl px-5 pb-20 pt-8 sm:px-8 sm:pt-12">
        <nav aria-label="Page navigation" className="identity-nav !max-w-none !px-0">
          <span className="text-[var(--dq-gold)]">SAVE FILE: GITQUEST</span>
          <Link href="/#firstcommit-gitquest">THE BUILD LOG ↗</Link>
        </nav>

        <header className="grid items-center gap-8 pb-12 pt-12 sm:grid-cols-[1.2fr_0.8fr] sm:gap-12 sm:pt-20">
          <div>
            <p className="section-label">TYPE A COMMAND. SEE WHAT CHANGES.</p>
            <h1 className="pixel-font pixel-title mt-7 text-lg leading-[1.8] sm:text-2xl">
              AN INTERACTIVE GIT LEARNING GAME
            </h1>
            <p className="mt-5 max-w-[58ch] text-2xl leading-snug text-[var(--dq-cream)]">
              Learn your first Git commands by using them.
            </p>
            <p className="mt-3 max-w-[58ch] text-xl leading-relaxed text-[var(--dq-text)]">
              GitQuest is George Fifth&apos;s browser game. Type into its terminal and watch the repository panel respond.
            </p>
            <a
              className="cmd-link mt-7 !bg-[var(--dq-gold)] !text-[var(--dq-blue)]"
              href="https://georgefifth.github.io/gitquest/"
              target="_blank"
              rel="noopener noreferrer"
            >
              ▶ PLAY GITQUEST
            </a>
          </div>
          <div className="dq-box overflow-hidden">
            <div className="dq-box-inner !p-3">
              <Image
                src="/builds/gitquest.webp"
                width={640}
                height={440}
                alt="GitQuest terminal game and repository view"
                className="h-auto w-full"
                priority
              />
            </div>
          </div>
        </header>

        <section className="dq-box" aria-labelledby="how-it-works">
          <div className="dq-box-inner !p-5 sm:!p-8">
            <h2 id="how-it-works" className="pixel-font text-[11px] leading-relaxed text-[var(--dq-gold)] sm:text-sm">
              YOUR FIRST FOUR MOVES
            </h2>
            <p className="mt-5 max-w-[65ch] text-xl leading-relaxed">
              A command makes more sense when you can see its effect. GitQuest gives each level a small objective, a terminal, and a repository view. Its opening level starts with an empty workspace and asks for <code>git init</code>. The panel changes when the command works. You can use the objective and hint controls when you get stuck.
            </p>
            <ol className="mt-8 divide-y divide-[var(--dq-border)]">
              {steps.map((step) => (
                <li key={step.number} className="grid gap-3 py-6 sm:grid-cols-[3rem_1fr] sm:gap-6">
                  <span className="pixel-font text-[11px] text-[var(--dq-gold)]">{step.number}</span>
                  <div>
                    <h3 className="text-2xl text-[var(--dq-cream)]">{step.title}</h3>
                    <p className="mt-2 max-w-[65ch] text-xl leading-relaxed">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mx-auto mt-14 max-w-2xl" aria-labelledby="scope">
          <h2 id="scope" className="pixel-font text-[11px] leading-relaxed text-[var(--dq-gold)] sm:text-sm">
            WHAT THIS GAME COVERS
          </h2>
          <p className="mt-5 text-xl leading-relaxed">
            The map shows 11 levels. It begins with setup and the first commit. It later names branches, merges, conflict resolution, tags, and a final shipping step. Later levels unlock after you finish earlier ones. That structure makes GitQuest a short guided route for someone starting out.
          </p>
          <p className="mt-5 text-xl leading-relaxed">
            This is a practice game, not your project&apos;s Git repository. Use its simulated commands to learn what happens, then repeat the same ideas in a small real repository. For a detailed account of how Git handles branches and merges, read the <a className="underline hover:text-[var(--dq-gold)]" href="https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging">official Pro Git chapter</a>.
          </p>
          <p className="mt-5 text-xl leading-relaxed">
            Want a different kind of practice? <Link className="underline hover:text-[var(--dq-gold)]" href="/learn-git-branching-alternative">GitQuest and Learn Git Branching</Link> compares this short path with a larger browser lesson set. <Link className="underline hover:text-[var(--dq-gold)]" href="/oh-my-git-alternative">GitQuest and Oh My Git!</Link> compares the browser demo with a downloadable game. Both guides explain when the other tool may fit better.
          </p>
        </section>

        <section className="mx-auto mt-14 max-w-2xl" aria-labelledby="before-you-play">
          <h2 id="before-you-play" className="pixel-font text-[11px] leading-relaxed text-[var(--dq-gold)] sm:text-sm">
            BEFORE YOU PLAY
          </h2>
          <p className="mt-5 text-xl leading-relaxed">
            You can start from the first level without installing Git. The game opens in your browser. The first prompt explains the goal, and the terminal accepts a Git command. If the command does not do what you expected, inspect the repository panel before trying another one. This habit carries into real Git work: check your current state before changing it again.
          </p>
          <p className="mt-5 text-xl leading-relaxed">
            The game calls itself a terminal adventure about your first commit. That is the right expectation. It offers a guided introduction and a sandbox, not a claim to cover every Git command or team workflow. The later level names show where the path goes, but they do not replace practice with your own code and teammates.
          </p>
        </section>

        <nav aria-label="Project and source links" className="mx-auto mt-14 max-w-2xl border-t border-[var(--dq-border)] pt-7">
          <p className="pixel-font text-[9px] leading-relaxed text-[var(--dq-gold)]">FOLLOW THE SOURCE</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-xl">
            <Link href="/#firstcommit-gitquest" className="underline hover:text-[var(--dq-gold)]">GitQuest build log</Link>
            <a href="https://georgefifth.github.io/gitquest/" className="underline hover:text-[var(--dq-gold)]">GitQuest demo</a>
            <a href="https://devpost.com/software/gitquest" className="underline hover:text-[var(--dq-gold)]">Devpost entry</a>
            <a href="https://github.com/Georgefifth/gitquest" className="underline hover:text-[var(--dq-gold)]">GitQuest source</a>
          </div>
        </nav>
      </div>
    </main>
  );
}
