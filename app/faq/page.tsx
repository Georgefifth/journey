import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About George Fifth | The Build Log",
  description: "Who George Fifth is and what you can find in The Build Log.",
  alternates: { canonical: "/faq" },
};

const questions = [
  {
    question: "Who is George Fifth?",
    answer: "George Fifth, also known as Georgefifth, is the creator behind this public build log. The linked GitHub and Devpost profiles show the projects and hackathon entries recorded here.",
  },
  {
    question: "What is georgefifth.xyz?",
    answer: "It is The Build Log, a pixel-art record of George Fifth's hackathon work. The world map shows events, while the battle logs link to public builds, demos, and source code when available.",
  },
  {
    question: "Is this a page about King George V or the George V Hotel?",
    answer: "No. This site records Georgefifth's own projects and hackathon journey. It has no connection to the historical figure or the hotel.",
  },
];

const faqData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://georgefifth.xyz/faq/#faq",
  mainEntity: questions.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

export default function FaqPage() {
  return (
    <main className="journey-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData).replace(/</g, "\\u003c") }} />
      <div className="relative z-10 mx-auto max-w-3xl px-6 pb-16 pt-10 sm:pt-16">
        <nav aria-label="FAQ navigation" className="identity-nav !max-w-none !px-0">
          <span className="text-[var(--dq-gold)]">SAVE FILE: GEORGEFIFTH</span>
          <Link href="/">THE BUILD LOG ↗</Link>
        </nav>

        <header className="mx-auto max-w-2xl pb-12 pt-12 text-center sm:pt-20">
          <p className="section-label">SAVE FILE NOTES</p>
          <h1 className="pixel-font pixel-title mt-8 text-xl leading-relaxed sm:text-2xl">WHO IS GEORGE FIFTH?</h1>
          <p className="mx-auto mt-5 max-w-xl text-xl text-[var(--dq-cream)]">
            A quick guide to the creator and the work behind this build log.
          </p>
        </header>

        <section aria-label="Common questions" className="dq-box">
          <div className="dq-box-inner !px-5 !py-2 sm:!px-8">
            {questions.map(({ question, answer }, index) => (
              <article key={question} className={`py-7 ${index ? "border-t border-[var(--dq-border)]" : ""}`}>
                <h2 className="text-[var(--dq-gold)] text-2xl leading-tight">{question}</h2>
                <p className="mt-3 max-w-[65ch] text-xl leading-relaxed text-[var(--dq-text)]">{answer}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="pt-12 text-center">
          <Link href="/" className="cmd-link !bg-[var(--dq-gold)] !text-[var(--dq-blue)]">▶ VIEW BUILD LOG</Link>
          <p className="mt-8 text-xl text-[var(--dq-muted)]">
            Questions about a build? <a className="underline hover:text-[var(--dq-gold)]" href="mailto:georgefifth@mail.tin.computer">Email Georgefifth</a>.
          </p>
        </div>
      </div>
    </main>
  );
}
