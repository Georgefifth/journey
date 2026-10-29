import Link from "next/link";

type Section = { heading: string; paragraphs: string[] };

export default function NoticePage({ title, intro, sections }: { title: string; intro: string; sections: Section[] }) {
  return (
    <main className="journey-page">
      <div className="relative z-10 mx-auto max-w-3xl px-6 pb-16 pt-10 sm:pt-16">
        <nav aria-label="Site navigation" className="identity-nav !max-w-none !px-0">
          <span className="text-[var(--dq-gold)]">SAVE FILE: GEORGEFIFTH</span>
          <Link href="/">THE BUILD LOG ↗</Link>
        </nav>
        <header className="mx-auto max-w-2xl pb-10 pt-12 text-center sm:pt-20">
          <p className="section-label">SITE NOTICE</p>
          <h1 className="pixel-font pixel-title mt-8 text-xl leading-relaxed sm:text-2xl">{title}</h1>
          <p className="mx-auto mt-5 max-w-xl text-xl text-[var(--dq-cream)]">{intro}</p>
          <p className="mt-4 text-base text-[var(--dq-muted)]">Updated 2 October 2026</p>
        </header>
        <div className="dq-box">
          <div className="dq-box-inner !px-5 !py-2 sm:!px-8">
            {sections.map(({ heading, paragraphs }, index) => (
              <section key={heading} className={`py-7 ${index ? "border-t border-[var(--dq-border)]" : ""}`}>
                <h2 className="text-[var(--dq-gold)] text-2xl leading-tight">{heading}</h2>
                {paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-3 max-w-[65ch] text-xl leading-relaxed text-[var(--dq-text)]">{paragraph}</p>
                ))}
              </section>
            ))}
          </div>
        </div>
        <footer className="pt-12 text-center text-xl text-[var(--dq-muted)]">
          <Link href="/" className="cmd-link !bg-[var(--dq-gold)] !text-[var(--dq-blue)]">▶ VIEW BUILD LOG</Link>
          <p className="mt-8">Questions? <a className="underline hover:text-[var(--dq-gold)]" href="mailto:georgefifth@mail.tin.computer">Email Georgefifth</a>.</p>
          <nav aria-label="Other site notices" className="mt-5 flex justify-center gap-6">
            <Link className="underline hover:text-[var(--dq-gold)]" href="/terms">Terms</Link>
            <Link className="underline hover:text-[var(--dq-gold)]" href="/privacy">Privacy</Link>
          </nav>
        </footer>
      </div>
    </main>
  );
}
