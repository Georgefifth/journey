import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const url = "https://georgefifth.xyz/git-practice-exercises";
const title = "Git practice exercises: six checks you can finish in a browser";
const description = "Practice Git commits, branches, merges, tags, and remotes through six short GitQuest challenges. Check the graph after each exercise.";

export const metadata: Metadata = {
  title: `${title} | GitQuest`,
  description,
  alternates: { canonical: "/git-practice-exercises" },
  openGraph: { title, description, url, siteName: "The Build Log", type: "article", images: [{ url: "/og.png", width: 1200, height: 630, alt: "The Build Log pixel-art quest map" }] },
};

const exercises = [
  {
    number: "01", title: "Make a commit you can find", level: "wake up, repo / the first commit",
    task: "Initialize the empty game repository, add a README, and make one commit. Then locate the new node in the graph.",
    check: "The graph has one commit. Your current branch points to it, and the working area has no staged change.",
    hint: "A file must be staged before it can join a commit. Use git status when you lose track of that step.",
    answer: "A typical path is git init, create the README in the game, git add README.md, and git commit -m \"Add README\". The target graph, not the exact message, determines whether the level passes.",
  },
  {
    number: "02", title: "Leave main where it is", level: "branching out",
    task: "Create a feature branch, switch to it, and commit a change. Before you look at the answer, predict which branch label will move.",
    check: "feature points to the new commit. main still points to its previous commit. HEAD follows feature.",
    hint: "git switch -c creates and selects a branch in one step. A commit moves the branch you currently have checked out.",
    answer: "Run git switch -c feature, make and stage a small file, then commit. If main moved instead, inspect your current branch before repeating the exercise.",
  },
  {
    number: "03", title: "Join two lines of work", level: "the merge",
    task: "Use the game's merge level. Bring experiment into main. Point to the two parents of the new merge commit.",
    check: "main points to a merge commit with two parents. Both the experiment and main changes remain in the joined history.",
    hint: "You start on main. Run git merge experiment to bring in the other branch.",
    answer: "Run git merge experiment. This level starts with commits on both branches, so the target has a real merge commit with two parents.",
  },
  {
    number: "04", title: "Resolve a conflict deliberately", level: "conflict resolution",
    task: "Start the conflict level and try the merge. Read the conflict markers before choosing the final file content.",
    check: "config.txt contains exactly v2, with no conflict markers. The merge completes, and the graph joins both histories.",
    hint: "Edit the conflicted file, stage that resolved file, and complete the merge. Do not commit marker lines by accident.",
    answer: "Run git merge tuning, replace config.txt with v2, stage it with git add config.txt, then commit the merge. The exact file content is the level's pass condition.",
  },
  {
    number: "05", title: "Mark the release point", level: "tag, you're it",
    task: "Tag the first of three commits as v0.1. Explain how the tag differs from a branch.",
    check: "v0.1 is on the first commit. main still points to the third commit; the tag does not move with it.",
    hint: "Use git tag with the requested name at the chosen commit. Tags mark a point; branches move as you commit.",
    answer: "Run git tag v0.1 HEAD~2. HEAD~2 names the first commit when HEAD points to the third. Recheck both labels in the graph.",
  },
  {
    number: "06", title: "Read a remote before pushing", level: "ship it",
    task: "Reach the game's final level. Add origin as a simulated remote, predict its branch label, then push main.",
    check: "The target remote branch points to the expected commit. Your local branch and the remote label can be identified separately.",
    hint: "Name the destination and branch. Check the graph's remote label after the command, rather than assuming push changed your local history.",
    answer: "Run git remote add origin https://gitquest.dev/repo.git, then git push origin main. The URL belongs to the game's simulation; a real push needs an accessible repository.",
  },
];

const structuredData = { "@context": "https://schema.org", "@type": "Article", "@id": `${url}#article`, url, headline: title, description, author: { "@type": "Person", name: "George Fifth" }, isPartOf: { "@id": "https://georgefifth.xyz/#website" } };

export default function GitPracticeExercises() {
  return (
    <main className="journey-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <article className="relative z-10 mx-auto max-w-4xl px-5 pb-20 pt-8 sm:px-8 sm:pt-12">
        <nav aria-label="Page navigation" className="identity-nav !max-w-none !px-0"><span className="text-[var(--dq-gold)]">SAVE FILE: GITQUEST</span><Link href="/#firstcommit-gitquest">THE BUILD LOG ↗</Link></nav>
        <header className="grid items-center gap-8 pb-12 pt-12 sm:grid-cols-[1.2fr_0.8fr] sm:gap-12 sm:pt-20">
          <div>
            <p className="section-label">SIX EXERCISES · ONE GRAPH</p>
            <h1 className="pixel-font pixel-title mt-7 text-lg leading-[1.8] sm:text-2xl">GIT PRACTICE EXERCISES</h1>
            <p className="mt-5 max-w-[55ch] text-2xl leading-snug text-[var(--dq-cream)]">Try a command. Predict the graph. Check the result.</p>
            <p className="mt-3 max-w-[58ch] text-xl leading-relaxed">These six challenges use George Fifth&apos;s GitQuest game. Each gives you a task, a visible pass check, and a hint when you need it.</p>
            <a className="cmd-link mt-7 !bg-[var(--dq-gold)] !text-[var(--dq-blue)]" href="https://georgefifth.github.io/gitquest/" target="_blank" rel="noopener noreferrer">▶ START THE EXERCISES</a>
          </div>
          <div className="dq-box overflow-hidden"><div className="dq-box-inner !p-3"><Image src="/builds/gitquest.webp" width={640} height={440} alt="GitQuest terminal beside a changing commit graph" className="h-auto w-full" priority /></div></div>
        </header>

        <section className="mx-auto max-w-2xl" aria-labelledby="how-to-use">
          <h2 id="how-to-use" className="pixel-font text-[11px] leading-relaxed text-[var(--dq-gold)] sm:text-sm">HOW TO USE THIS PAGE</h2>
          <p className="mt-5 text-xl leading-relaxed">Start at the first level and work forward. GitQuest unlocks later levels as you go. Before each command, say what you expect the graph to show. Run it, compare the labels, then open the hint or answer only if you need one.</p>
          <p className="mt-4 text-xl leading-relaxed">This is solo practice in a simulated repository. It will not change your files or push to your real project. If a level goes wrong, use the game&apos;s reset control and try the same task again.</p>
        </section>

        <section className="mx-auto mt-14 max-w-2xl space-y-6" aria-label="Six Git practice exercises">
          {exercises.map((exercise) => (
            <div className="dq-box" key={exercise.number}><div className="dq-box-inner !p-5 sm:!p-8">
              <p className="section-label">EXERCISE {exercise.number} · {exercise.level}</p>
              <h2 className="pixel-font mt-4 text-[11px] leading-relaxed text-[var(--dq-gold)] sm:text-sm">{exercise.title.toUpperCase()}</h2>
              <p className="mt-5 text-xl leading-relaxed">{exercise.task}</p>
              <p className="mt-4 text-xl leading-relaxed text-[var(--dq-cream)]"><strong>Pass check:</strong> {exercise.check}</p>
              <details className="mt-5 border-t border-[var(--dq-border)] pt-4 text-xl leading-relaxed"><summary className="cursor-pointer text-[var(--dq-gold)]">Show hint</summary><p className="mt-3">{exercise.hint}</p></details>
              <details className="mt-4 text-xl leading-relaxed"><summary className="cursor-pointer text-[var(--dq-gold)]">Show answer</summary><p className="mt-3">{exercise.answer}</p></details>
            </div></div>
          ))}
        </section>

        <section className="mx-auto mt-14 max-w-2xl" aria-labelledby="finish-check">
          <h2 id="finish-check" className="pixel-font text-[11px] leading-relaxed text-[var(--dq-gold)] sm:text-sm">FINISH CHECK</h2>
          <p className="mt-5 text-xl leading-relaxed">Explain these three differences without looking back: staged file versus commit, branch versus tag, and local branch versus remote branch. Then replay the exercise you found hardest without opening its answer. A correct command matters less than knowing what changed.</p>
          <p className="mt-4 text-xl leading-relaxed">GitQuest checks the structure of the target graph. Real Git can also hold uncommitted files and team changes that this solo game does not model. Repeat the same skills in a disposable local repository before using them on important work.</p>
        </section>

        <nav aria-label="Related Git practice and official sources" className="mx-auto mt-14 max-w-2xl border-t border-[var(--dq-border)] pt-7">
          <p className="pixel-font text-[9px] leading-relaxed text-[var(--dq-gold)]">PRACTICE AND SOURCES</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-xl">
            <Link href="/interactive-git-learning-game" className="underline hover:text-[var(--dq-gold)]">Interactive Git learning game</Link>
            <Link href="/git-merge-conflict-practice" className="underline hover:text-[var(--dq-gold)]">Merge conflict practice</Link>
            <Link href="/git-tag-example" className="underline hover:text-[var(--dq-gold)]">Git tag example</Link>
            <Link href="/#firstcommit-gitquest" className="underline hover:text-[var(--dq-gold)]">GitQuest build log</Link>
            <a href="https://github.com/Georgefifth/gitquest" className="underline hover:text-[var(--dq-gold)]">GitQuest source</a>
            <a href="https://git-scm.com/docs/git" className="underline hover:text-[var(--dq-gold)]">Official Git commands</a>
          </div>
        </nav>
      </article>
    </main>
  );
}
