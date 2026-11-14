import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const url = "https://georgefifth.xyz/git-practice-before-hackathon";
const title = "Practice Git commits and branches before a hackathon";
const questions = [
  {
    question: "Can I finish this plan without installing Git?",
    answer: "You can do the game steps in a browser. The final practice uses a separate local folder and needs Git installed on your computer.",
  },
  {
    question: "What should I know before the event?",
    answer: "Create a commit, switch to a new branch, commit there, and show which branch points to each commit.",
  },
  {
    question: "Does GitQuest teach the full team workflow?",
    answer: "No. GitQuest is a solo practice game. This plan does not simulate code review, a shared remote, or a full hackathon team workflow.",
  },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    url,
    headline: title,
    description: "A solo practice plan that joins a first Git commit, a feature branch, and a check of the commit graph before an event.",
    author: { "@type": "Person", name: "George Fifth" },
    isPartOf: { "@id": "https://georgefifth.xyz/#website" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: questions.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  },
];

export const metadata: Metadata = {
  title: `${title} | GitQuest`,
  description: "New to hackathons? Practice a first Git commit and feature branch in GitQuest, then repeat the steps in a disposable local repository.",
  alternates: { canonical: "/git-practice-before-hackathon" },
  openGraph: {
    title,
    description: "A short GitQuest practice plan for commits and branches before a hackathon.",
    url: "/git-practice-before-hackathon",
    siteName: "The Build Log",
    type: "article",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "The Build Log pixel-art quest map" }],
  },
};

const gameSteps = [
  {
    number: "01",
    title: "Save your first change",
    body: <>Start with <strong>01 wake up, repo</strong>, then <strong>02 the first commit</strong>. Initialize the repository, create <code>README.md</code>, stage it, and commit it. Point to the first commit on <code>main</code>.</>,
  },
  {
    number: "02",
    title: "Move work to a branch",
    body: <>Continue until <strong>branching out</strong> unlocks. That level starts with a committed <code>app.js</code>. Run <code>git switch -c feature</code>, create <code>feature.js</code>, stage it, and commit. Point to where <code>feature</code> and <code>main</code> now sit.</>,
  },
  {
    number: "03",
    title: "Explain the graph",
    body: <>Say which commit was made first and which branch moved after your second commit. If you cannot explain the two pointers, reset the branch level and repeat it.</>,
  },
];

export default function GitPracticeBeforeHackathon() {
  return (
    <main className="journey-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <article className="relative z-10 mx-auto max-w-4xl px-5 pb-20 pt-8 sm:px-8 sm:pt-12">
        <nav aria-label="Page navigation" className="identity-nav !max-w-none !px-0">
          <span className="text-[var(--dq-gold)]">SAVE FILE: GITQUEST</span>
          <Link href="/#firstcommit-gitquest">THE BUILD LOG ↗</Link>
        </nav>

        <header className="grid items-center gap-8 pb-12 pt-12 sm:grid-cols-[1.2fr_0.8fr] sm:gap-12 sm:pt-20">
          <div>
            <p className="section-label">BEFORE THE EVENT · SOLO PRACTICE</p>
            <h1 className="pixel-font pixel-title mt-7 text-lg leading-[1.8] sm:text-2xl">GIT PRACTICE BEFORE A HACKATHON</h1>
            <p className="mt-5 max-w-[55ch] text-2xl leading-snug text-[var(--dq-cream)]">Make one commit. Move one branch. Read the result.</p>
            <p className="mt-3 max-w-[58ch] text-xl leading-relaxed">Use George Fifth&apos;s GitQuest game to see each step. Then repeat it in a disposable folder on your computer.</p>
            <a className="cmd-link mt-7 !bg-[var(--dq-gold)] !text-[var(--dq-blue)]" href="https://georgefifth.github.io/gitquest/" target="_blank" rel="noopener noreferrer">▶ START GITQUEST</a>
          </div>
          <div className="dq-box overflow-hidden">
            <div className="dq-box-inner !p-3">
              <Image src="/builds/gitquest.webp" width={640} height={440} alt="GitQuest terminal beside its repository graph" className="h-auto w-full" priority />
            </div>
          </div>
        </header>

        <section className="dq-box" aria-labelledby="game-plan">
          <div className="dq-box-inner !p-5 sm:!p-8">
            <h2 id="game-plan" className="pixel-font text-[11px] leading-relaxed text-[var(--dq-gold)] sm:text-sm">PLAY THE TWO SKILLS</h2>
            <p className="mt-5 max-w-[62ch] text-xl leading-relaxed">GitQuest runs in your browser. Its levels are separate exercises, so the branch level starts from its own prepared repository.</p>
            <ol className="mt-7 divide-y divide-[var(--dq-border)]">
              {gameSteps.map((step) => (
                <li key={step.number} className="grid gap-3 py-5 sm:grid-cols-[3rem_1fr] sm:gap-6">
                  <span className="pixel-font text-[11px] text-[var(--dq-gold)]">{step.number}</span>
                  <div>
                    <h3 className="text-2xl text-[var(--dq-cream)]">{step.title}</h3>
                    <p className="mt-2 max-w-[60ch] text-xl leading-relaxed">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mx-auto mt-14 max-w-2xl" aria-labelledby="real-repo">
          <h2 id="real-repo" className="pixel-font text-[11px] leading-relaxed text-[var(--dq-gold)] sm:text-sm">REPEAT IN A THROWAWAY FOLDER</h2>
          <p className="mt-5 text-xl leading-relaxed">Install Git first. Open a terminal in a new, empty folder. Use a folder you can delete afterward, not an event project.</p>
          <pre className="mt-6 overflow-x-auto border border-[var(--dq-border)] bg-[var(--dq-blue)] p-5 text-lg leading-relaxed text-[var(--dq-cream)]"><code>{`mkdir git-practice
cd git-practice
git init
git branch -M main
printf 'Practice Git\\n' > README.md
git add README.md
git commit -m "Add README"
git switch -c feature
printf 'Feature practice\\n' > feature.txt
git add feature.txt
git commit -m "Add feature practice"
git log --oneline --graph --all --decorate`}</code></pre>
          <p className="mt-5 text-xl leading-relaxed">The graph should show two commits. <code>feature</code> points to the second one. <code>main</code> stays at the first.</p>
          <p className="mt-4 text-xl leading-relaxed">If Git asks for your name and email, set them using <a className="underline hover:text-[var(--dq-gold)]" href="https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup">Git&apos;s setup guide</a>. Run <code>git status</code> to check your current branch before another change.</p>
        </section>

        <section className="mx-auto mt-14 max-w-2xl" aria-labelledby="ready-check">
          <h2 id="ready-check" className="pixel-font text-[11px] leading-relaxed text-[var(--dq-gold)] sm:text-sm">YOUR READY CHECK</h2>
          <p className="mt-5 text-xl leading-relaxed">Without looking at the commands, make a fresh folder and repeat the two commits. Then explain why <code>main</code> did not move when you committed on <code>feature</code>.</p>
          <p className="mt-4 text-lg leading-relaxed text-[var(--dq-muted)]">This is solo practice. GitQuest does not simulate team review, a shared remote, or a full hackathon workflow.</p>
        </section>

        <section className="mx-auto mt-14 max-w-2xl" aria-labelledby="faq">
          <h2 id="faq" className="pixel-font text-[11px] leading-relaxed text-[var(--dq-gold)] sm:text-sm">COMMON QUESTIONS</h2>
          <div className="mt-5 divide-y divide-[var(--dq-border)]">
            {questions.map(({ question, answer }) => (
              <div key={question} className="py-5">
                <h3 className="text-2xl text-[var(--dq-cream)]">{question}</h3>
                <p className="mt-2 text-xl leading-relaxed">{answer}</p>
              </div>
            ))}
          </div>
        </section>

        <nav aria-label="Related practice and official sources" className="mx-auto mt-14 max-w-2xl border-t border-[var(--dq-border)] pt-7">
          <p className="pixel-font text-[9px] leading-relaxed text-[var(--dq-gold)]">PRACTICE AND SOURCES</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-xl">
            <Link href="/git-first-commit-practice" className="underline hover:text-[var(--dq-gold)]">First commit guide</Link>
            <Link href="/git-branching-practice" className="underline hover:text-[var(--dq-gold)]">Branch guide</Link>
            <Link href="/#firstcommit-gitquest" className="underline hover:text-[var(--dq-gold)]">GitQuest build log</Link>
            <a href="https://github.com/Georgefifth/gitquest" className="underline hover:text-[var(--dq-gold)]">GitQuest source</a>
            <a href="https://git-scm.com/docs/git-add" className="underline hover:text-[var(--dq-gold)]">Official staging reference</a>
            <a href="https://git-scm.com/docs/git-switch" className="underline hover:text-[var(--dq-gold)]">Official branch reference</a>
            <a href="https://git-scm.com/docs/git-log" className="underline hover:text-[var(--dq-gold)]">Official graph reference</a>
          </div>
        </nav>
      </article>
    </main>
  );
}
