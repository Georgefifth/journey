import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const url = "https://georgefifth.xyz/beginner-git-game-lesson";
const title = "A short beginner Git lesson with a visual browser game";
const questions = [
  {
    question: "Can beginners use GitQuest without installing Git?",
    answer: "Yes. GitQuest runs in a browser and lets learners practice commands in a simulated terminal. They can inspect the repository graph after each step.",
  },
  {
    question: "What should learners show at the end of the lesson?",
    answer: "Ask each learner to point to their first commit and explain why the feature branch advances while main stays at its earlier commit.",
  },
  {
    question: "Does GitQuest grade students or sync with a course system?",
    answer: "No. GitQuest is a practice demo. The teacher must check understanding and record any grade outside the game.",
  },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    url,
    headline: title,
    description: "A 35-minute browser lesson for a first Git commit and branch, with a visible understanding check.",
    author: { "@type": "Person", name: "George Fifth" },
    isPartOf: { "@id": "https://georgefifth.xyz/#website" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: questions.map(({ question, answer }) => ({
      "@type": "Question", name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  },
];

export const metadata: Metadata = {
  title: `${title} | GitQuest`,
  description: "Teach a first commit and feature branch in a 35-minute GitQuest browser lesson. Includes learner steps and a check for understanding.",
  alternates: { canonical: "/beginner-git-game-lesson" },
  openGraph: {
    title, description: "A 35-minute GitQuest lesson for first commits and branches.",
    url: "/beginner-git-game-lesson", siteName: "The Build Log", type: "article",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "The Build Log pixel-art quest map" }],
  },
};

const lesson = [
  { time: "00–04", heading: "Show the goal", body: "Open GitQuest together. Point out its terminal, objective, and repository graph. Ask learners what a saved change might look like." },
  { time: "04–13", heading: "Make one commit", body: "Play 01 wake up, repo with git init. In 02 the first commit, create README.md, stage it, and commit it. Pause when the graph gains a commit on main." },
  { time: "13–28", heading: "Move to a branch", body: "Continue through the required levels until branching out unlocks. There, create and switch to feature, add feature.js, and commit. Compare the feature and main pointers." },
  { time: "28–35", heading: "Check understanding", body: "Ask learners to point to the new commit and explain which branch moved. Let a partner check the graph and their answer." },
];

export default function BeginnerGitGameLesson() {
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
            <p className="section-label">35 MINUTES · TWO VISIBLE IDEAS</p>
            <h1 className="pixel-font pixel-title mt-7 text-lg leading-[1.8] sm:text-2xl">A SHORT BEGINNER GIT LESSON</h1>
            <p className="mt-5 max-w-[55ch] text-2xl leading-snug text-[var(--dq-cream)]">
              Make a commit. Move a branch. See both happen.
            </p>
            <p className="mt-3 max-w-[58ch] text-xl leading-relaxed">
              Use George Fifth&apos;s GitQuest browser game for one hands-on lesson. Learners type commands and inspect the graph.
            </p>
            <a className="cmd-link mt-7 !bg-[var(--dq-gold)] !text-[var(--dq-blue)]" href="https://georgefifth.github.io/gitquest/" target="_blank" rel="noopener noreferrer">▶ OPEN GITQUEST</a>
          </div>
          <div className="dq-box overflow-hidden">
            <div className="dq-box-inner !p-3">
              <Image src="/builds/gitquest.webp" width={640} height={440} alt="GitQuest terminal beside a visual repository graph" className="h-auto w-full" priority />
            </div>
          </div>
        </header>

        <section className="dq-box" aria-labelledby="lesson-plan">
          <div className="dq-box-inner !p-5 sm:!p-8">
            <h2 id="lesson-plan" className="pixel-font text-[11px] leading-relaxed text-[var(--dq-gold)] sm:text-sm">THE CLASS PLAN</h2>
            <p className="mt-5 max-w-[62ch] text-xl leading-relaxed">Allow 35 minutes. The branch level needs earlier levels unlocked, so budget extra time for a new class.</p>
            <ol className="mt-7 divide-y divide-[var(--dq-border)]">
              {lesson.map((step) => (
                <li key={step.time} className="grid gap-2 py-5 sm:grid-cols-[5rem_1fr] sm:gap-5">
                  <span className="pixel-font text-[10px] text-[var(--dq-gold)]">{step.time}</span>
                  <div>
                    <h3 className="text-2xl text-[var(--dq-cream)]">{step.heading}</h3>
                    <p className="mt-2 max-w-[58ch] text-xl leading-relaxed">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mx-auto mt-14 max-w-2xl" aria-labelledby="check">
          <h2 id="check" className="pixel-font text-[11px] leading-relaxed text-[var(--dq-gold)] sm:text-sm">WHAT TO CHECK</h2>
          <p className="mt-5 text-xl leading-relaxed">Ask: "Why does <code>main</code> stay behind after your commit on <code>feature</code>?" A sound answer names the new commit and shows where each branch points.</p>
          <p className="mt-4 text-xl leading-relaxed">If a learner cannot show that graph, return to the branch command. Check which branch was active before the commit.</p>
          <p className="mt-4 text-lg leading-relaxed text-[var(--dq-muted)]">GitQuest is a practice demo, not a grading tool or course-system sync. Record assessment outside the game.</p>
        </section>

        <section className="mx-auto mt-14 max-w-2xl" aria-labelledby="faq">
          <h2 id="faq" className="pixel-font text-[11px] leading-relaxed text-[var(--dq-gold)] sm:text-sm">TEACHER QUESTIONS</h2>
          <div className="mt-5 divide-y divide-[var(--dq-border)]">
            {questions.map(({ question, answer }) => (
              <div key={question} className="py-5">
                <h3 className="text-2xl text-[var(--dq-cream)]">{question}</h3>
                <p className="mt-2 text-xl leading-relaxed">{answer}</p>
              </div>
            ))}
          </div>
        </section>

        <nav aria-label="More Git practice and sources" className="mx-auto mt-14 max-w-2xl border-t border-[var(--dq-border)] pt-7">
          <p className="pixel-font text-[9px] leading-relaxed text-[var(--dq-gold)]">PRACTICE AND SOURCES</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-xl">
            <Link href="/git-first-commit-practice" className="underline hover:text-[var(--dq-gold)]">First commit guide</Link>
            <Link href="/git-branching-practice" className="underline hover:text-[var(--dq-gold)]">Branch guide</Link>
            <Link href="/git-learning-tools-comparison" className="underline hover:text-[var(--dq-gold)]">Compare Git games</Link>
            <a href="https://github.com/Georgefifth/gitquest" className="underline hover:text-[var(--dq-gold)]">GitQuest source</a>
            <a href="https://git-scm.com/docs/git-add" className="underline hover:text-[var(--dq-gold)]">Official staging reference</a>
            <a href="https://git-scm.com/docs/git-switch" className="underline hover:text-[var(--dq-gold)]">Official branch switch reference</a>
          </div>
        </nav>
      </article>
    </main>
  );
}
