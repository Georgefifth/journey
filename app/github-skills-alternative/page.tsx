import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "GitHub Skills alternative for Git practice | GitQuest",
  description: "Compare GitQuest with GitHub Skills. Practice Git commands in a browser game, or learn the real GitHub pull request workflow in a guided repository.",
  alternates: { canonical: "/github-skills-alternative" },
  openGraph: {
    title: "GitHub Skills alternative for Git practice | GitQuest",
    description: "A direct choice between a Git command game and a real GitHub workflow exercise.",
    url: "/github-skills-alternative",
    siteName: "The Build Log",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "The Build Log pixel-art quest map" }],
    type: "article",
  },
};

const rows = [
  { topic: "First move", game: "Open the demo and start the first level in a simulated repository.", skills: "Copy the Introduction to GitHub exercise into your GitHub account." },
  { topic: "What you practice", game: "Type Git commands to change files, commits, branches, and a visible graph.", skills: "Create a branch and commit, then open and merge a pull request on GitHub." },
  { topic: "Feedback", game: "The level checks whether your repository reaches its target state.", skills: "The course gives automated feedback as you work in the exercise repository." },
  { topic: "Where work lives", game: "The challenge runs inside the browser game, separate from your real repositories.", skills: "The exercise uses a repository in your GitHub account." },
];

const sections = [
  {
    id: "start",
    title: "Start with the skill you need today",
    paragraphs: [
      "If a command like git switch still feels abstract, start with GitQuest. Its levels give you a target and show how each command changes the repository. You can make a wrong turn, reset, and try again without touching a project. That makes the game useful before your first assignment, hackathon, or pull request.",
      "If you already know the basic commands and need to contribute on GitHub, start with GitHub Skills. Its Introduction to GitHub exercise walks through a branch, a commit, a pull request, and a merge. You finish in an actual GitHub repository. That is the practice a game cannot replace.",
      "You can use both in order. Spend a short session learning what a branch and commit do in GitQuest. Then complete the GitHub Skills exercise to see how those ideas appear in a shared workflow. This is a learning sequence, not a claim that either tool contains the other.",
    ],
  },
  {
    id: "gitquest",
    title: "What GitQuest actually gives you",
    paragraphs: [
      "GitQuest is George Fifth's browser game for command-led Git practice. The visible level map starts with a repository, moves through first commits and branching, then reaches merges, conflicts, tags, and later history tasks. Each challenge asks you to reach a target state. The game also has a sandbox for experiments outside its story path.",
      "The useful part is the link between an action and the graph. A beginner can see that creating a branch gives a commit another name. They can see one branch advance after a commit while the other stays put. Those details often disappear when a tutorial presents commands as a list to memorize.",
      "The game is a simulation. It gives you room to practice the shape of a Git repository, but it does not teach you how a team reviews a real pull request. It does not become your project host, your issue tracker, or your course grading system. Its best job is helping commands feel less mysterious before you use them elsewhere.",
    ],
  },
  {
    id: "skills",
    title: "Where GitHub Skills is stronger",
    paragraphs: [
      "GitHub Skills teaches inside GitHub. Its official Introduction to GitHub course says that a learner creates a branch, commits a file, opens a pull request, and merges it. The exercise begins by copying a template into the learner's account. GitHub's learning resources describe these courses as free and interactive, with automated feedback and help.",
      "That setting matters when your question is, 'What does a pull request look like?' You work with the same pages and terms that appear in a real contribution. You can inspect a branch, read a change, and complete the merge in a repository you own. GitQuest can prepare you for the ideas, but the GitHub exercise gives you the real surface.",
      "GitHub Skills also covers more than basic Git. Its course catalog includes work such as GitHub Pages and open source contributions. If your goal is to learn GitHub features, choose its relevant course. A command game should not pretend to replace a full course library or an account-based workflow.",
    ],
  },
  {
    id: "lesson",
    title: "A short lesson that uses both",
    paragraphs: [
      "Begin in GitQuest with the first commit. Notice what changes after you stage a file and commit it. Before entering each command, predict whether the working files, staged files, or commit history will change. Then check the graph and the game's response. If your prediction was wrong, reset that level and explain the difference aloud.",
      "Next, try the branching level. Create the named feature branch and make one commit on it. Check that the main branch still points to the earlier commit. This is a smaller task than making a pull request, and that is the point. You can isolate one idea before GitHub adds account pages and review steps.",
      "Now open GitHub Skills' Introduction to GitHub exercise. Copy its template to your account, follow the course instructions, and complete its branch, commit, pull request, and merge steps. Look for the same branch and commit ideas you saw in the game. The pull request is the new part: it packages a proposed change for review and merge.",
      "Finish with a small repository of your own. Change one Markdown line, commit it on a branch, and open a pull request. If a step feels unclear, return to the matching exercise. The test of learning is whether you can explain what changed, where the change lives, and what will happen when you merge.",
    ],
  },
  {
    id: "mistakes",
    title: "What happens when you make a mistake",
    paragraphs: [
      "In GitQuest, a wrong command is part of the exercise. Read the response and inspect the current graph before resetting. Did you commit on the wrong branch? Did you create a branch without switching to it? Did you stage a file but forget to commit? These are separate states, and learning to name the state is more useful than memorizing a rescue command.",
      "A simple habit helps in both tools: pause before each step and say what you expect to change. A branch command changes which line of work you follow. A commit records staged work. A merge joins histories. If the result differs from your prediction, stop and inspect the repository. That habit transfers to real projects better than racing through a checklist.",
      "In GitHub Skills, a mistake happens in an exercise repository. Follow the course feedback and inspect the branch, changed file, or pull request before repeating a step. The point is to learn the platform workflow, including where to look for the result. A successful game level is useful preparation, but it cannot show every account, review, or merge screen you will meet on GitHub.",
      "Do not copy a command from the game into a work repository without checking its context. In a real project, run git status first, confirm the branch name, and read the command's effect before using a reset or history change. Practice in a disposable repository until you can explain what your command will touch.",
    ],
  },
  {
    id: "limits",
    title: "Choose the other path when it fits better",
    paragraphs: [
      "Choose GitHub Skills first when you need to practice a real GitHub task today. A student asked to submit a pull request should see the actual pull request page. A new contributor who must use issues or GitHub Pages should use the course that teaches that feature. The repository-based setup is useful practice, even if it takes longer to begin.",
      "Choose GitQuest first when you need low-stakes repetition with Git commands. It is useful when the words branch, stage, and commit are still hard to picture. You can practice without a real project's files or a GitHub account. The story levels give a specific next step, while the sandbox lets you test an idea after you understand the basics.",
      "If you teach a class, the two tools can play different roles. Use the game to introduce a command and its visible result. Use GitHub Skills for the later exercise in a real repository. Check the course requirements yourself before assigning it; GitQuest is a public demo, not a replacement for classroom management or grading.",
    ],
  },
  {
    id: "questions",
    title: "Questions before you pick",
    paragraphs: [
      "Do I need an account? You can open the public GitQuest game directly. GitHub Skills' Introduction to GitHub exercise asks you to copy a repository to your GitHub account. Pick the entry point that matches how much setup you want for this session.",
      "Will either one teach every Git command? No. GitQuest has a defined story path and sandbox. GitHub Skills has separate courses focused on specific workflows. For a command or case outside the exercise, use the official Git documentation and try it in a disposable repository before using it on work you care about.",
      "Which one should a complete beginner finish first? If commands make no sense yet, complete the first GitQuest levels and then move to GitHub Skills. If you already know what a branch and commit do, start with the GitHub exercise. Your first goal is a clear mental model, then a real contribution.",
    ],
  },
];

export default function GitHubSkillsAlternative() {
  return (
    <main className="journey-page">
      <article className="relative z-10 mx-auto max-w-4xl px-5 pb-20 pt-8 sm:px-8 sm:pt-12">
        <nav aria-label="Page navigation" className="identity-nav !max-w-none !px-0">
          <span className="text-[var(--dq-gold)]">SAVE FILE: GITQUEST</span>
          <Link href="/#firstcommit-gitquest">THE BUILD LOG ↗</Link>
        </nav>

        <header className="grid items-center gap-8 pb-12 pt-12 sm:grid-cols-[1.2fr_0.8fr] sm:gap-12 sm:pt-20">
          <div>
            <p className="section-label">PICK YOUR PRACTICE</p>
            <h1 className="pixel-font pixel-title mt-7 text-lg leading-[1.8] sm:text-2xl">GITHUB SKILLS ALTERNATIVE FOR GIT PRACTICE</h1>
            <p className="mt-5 max-w-[58ch] text-2xl leading-snug text-[var(--dq-cream)]">Learn commands in a game. Learn pull requests on GitHub.</p>
            <p className="mt-3 max-w-[58ch] text-xl leading-relaxed">GitQuest gives you a safe command puzzle. GitHub Skills gives you a real repository workflow. Use the one that matches your next step.</p>
            <a className="cmd-link mt-7 !bg-[var(--dq-gold)] !text-[var(--dq-blue)]" href="https://georgefifth.github.io/gitquest/" target="_blank" rel="noopener noreferrer">▶ TRY GITQUEST</a>
          </div>
          <div className="dq-box overflow-hidden"><div className="dq-box-inner !p-3">
            <Image src="/builds/gitquest.webp" width={640} height={440} alt="GitQuest terminal and repository graph" className="h-auto w-full" priority />
          </div></div>
        </header>

        <section className="dq-box" aria-labelledby="at-a-glance"><div className="dq-box-inner !p-5 sm:!p-8">
          <h2 id="at-a-glance" className="pixel-font text-[11px] leading-relaxed text-[var(--dq-gold)] sm:text-sm">THE DECISION AT A GLANCE</h2>
          <p className="mt-5 max-w-[65ch] text-xl leading-relaxed">Need to understand what Git commands do? Try GitQuest. Need to open your first real pull request? Try GitHub Skills.</p>
          <div className="mt-6 divide-y divide-[var(--dq-border)]">
            {rows.map((row) => <div key={row.topic} className="grid gap-3 py-5 sm:grid-cols-[8rem_1fr_1fr] sm:gap-5">
              <h3 className="text-xl text-[var(--dq-gold)]">{row.topic}</h3>
              <p className="text-xl leading-relaxed"><strong className="text-[var(--dq-cream)]">GitQuest: </strong>{row.game}</p>
              <p className="text-xl leading-relaxed"><strong className="text-[var(--dq-cream)]">GitHub Skills: </strong>{row.skills}</p>
            </div>)}
          </div>
        </div></section>

        {sections.map((section) => <section key={section.id} aria-labelledby={section.id} className="mx-auto mt-14 max-w-2xl">
          <h2 id={section.id} className="pixel-font text-[11px] leading-relaxed text-[var(--dq-gold)] sm:text-sm">{section.title.toUpperCase()}</h2>
          {section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-5 text-xl leading-relaxed">{paragraph}</p>)}
        </section>)}

        <nav aria-label="Project and source links" className="mx-auto mt-14 max-w-2xl border-t border-[var(--dq-border)] pt-7">
          <p className="pixel-font text-[9px] leading-relaxed text-[var(--dq-gold)]">FOLLOW THE SOURCE</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-xl">
            <Link href="/#firstcommit-gitquest" className="underline hover:text-[var(--dq-gold)]">GitQuest build log</Link>
            <Link href="/git-first-commit-practice" className="underline hover:text-[var(--dq-gold)]">First Git commit practice</Link>
            <Link href="/git-branching-practice" className="underline hover:text-[var(--dq-gold)]">Git branching practice</Link>
            <a href="https://georgefifth.github.io/gitquest/" className="underline hover:text-[var(--dq-gold)]">GitQuest demo</a>
            <a href="https://github.com/Georgefifth/gitquest" className="underline hover:text-[var(--dq-gold)]">GitQuest source</a>
            <a href="https://github.com/skills/introduction-to-github" className="underline hover:text-[var(--dq-gold)]">GitHub Skills exercise</a>
            <a href="https://docs.github.com/en/get-started/start-your-journey/git-and-github-learning-resources" className="underline hover:text-[var(--dq-gold)]">GitHub learning resources</a>
          </div>
        </nav>
      </article>
    </main>
  );
}
