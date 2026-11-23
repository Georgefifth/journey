import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Git tag example: mark a commit and check the graph | GitQuest",
  description: "Practice a Git tag example on a visible commit graph. Create a lightweight tag, check its target, and learn when an annotated release tag fits better.",
  alternates: { canonical: "/git-tag-example" },
  openGraph: {
    title: "Git tag example: mark a commit and check the graph",
    description: "A short Git tag exercise with a visible commit graph and a real-repository check.",
    url: "/git-tag-example",
    siteName: "The Build Log",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "The Build Log pixel-art quest map" }],
    type: "article",
  },
};

export default function GitTagExample() {
  return (
    <main className="journey-page">
      <article className="relative z-10 mx-auto max-w-4xl px-5 pb-20 pt-8 sm:px-8 sm:pt-12">
        <nav aria-label="Page navigation" className="identity-nav !max-w-none !px-0">
          <span className="text-[var(--dq-gold)]">SAVE FILE: GITQUEST</span>
          <Link href="/#firstcommit-gitquest">THE BUILD LOG ↗</Link>
        </nav>
        <header className="grid items-center gap-8 pb-12 pt-12 sm:grid-cols-[1.2fr_0.8fr] sm:gap-12 sm:pt-20">
          <div>
            <p className="section-label">MARK A MILESTONE</p>
            <h1 className="pixel-font pixel-title mt-7 text-lg leading-[1.8] sm:text-2xl">GIT TAG EXAMPLE</h1>
            <p className="mt-5 max-w-[58ch] text-2xl leading-snug text-[var(--dq-cream)]">Put a name on a commit. Watch that name stay put.</p>
            <p className="mt-3 max-w-[58ch] text-xl leading-relaxed text-[var(--dq-text)]">Create a lightweight tag in GitQuest, then check the same action in a real repository.</p>
            <a className="cmd-link mt-7 !bg-[var(--dq-gold)] !text-[var(--dq-blue)]" href="https://github.com/Georgefifth/gitquest" target="_blank" rel="noopener noreferrer">▶ GET GITQUEST SOURCE</a>
          </div>
          <div className="dq-box overflow-hidden"><div className="dq-box-inner !p-3">
            <Image src="/builds/gitquest.webp" width={640} height={440} alt="GitQuest terminal and commit graph" className="h-auto w-full" priority />
          </div></div>
        </header>

        <section className="dq-box" aria-labelledby="quick-example"><div className="dq-box-inner !p-5 sm:!p-8">
          <h2 id="quick-example" className="pixel-font text-[11px] leading-relaxed text-[var(--dq-gold)] sm:text-sm">THE SHORT EXAMPLE</h2>
          <p className="mt-5 text-xl leading-relaxed">A tag is a name attached to one commit. A branch name moves as you add commits. A tag normally stays on the commit you chose. That makes tags useful for marking releases and other milestones.</p>
          <pre className="mt-6 overflow-x-auto border border-[var(--dq-border)] p-4 text-base sm:text-lg"><code>{"git log --oneline -3\ngit tag v1.0\ngit tag\ngit log --oneline --decorate -3"}</code></pre>
          <p className="mt-5 text-xl leading-relaxed">In this example, <code>git tag v1.0</code> marks the current <code>HEAD</code> commit. <code>git tag</code> lists your local tags. The decorated log shows the tag beside its target commit. Make another commit and check again: the branch moves, but <code>v1.0</code> remains on the earlier commit.</p>
        </div></section>

        <section className="mx-auto mt-14 max-w-2xl" aria-labelledby="practice">
          <h2 id="practice" className="pixel-font text-[11px] leading-relaxed text-[var(--dq-gold)] sm:text-sm">PRACTICE ON A GRAPH</h2>
          <p className="mt-5 text-xl leading-relaxed">GitQuest is a local browser game with a simulated repository. Clone its <a className="underline hover:text-[var(--dq-gold)]" href="https://github.com/Georgefifth/gitquest">public source</a>, run <code>python3 -m http.server 8000</code> from that folder, and open <code>http://localhost:8000/</code>. The public demo is unavailable while its Pages site is disabled.</p>
          <ol className="mt-8 divide-y divide-[var(--dq-border)]">
            <li className="py-6"><h3 className="text-2xl text-[var(--dq-cream)]">1. Reach the tagging level</h3><p className="mt-2 text-xl leading-relaxed">Earlier levels introduce commits and branches. In the tagging level, read the branch labels and find the commit the task asks you to mark.</p></li>
            <li className="py-6"><h3 className="text-2xl text-[var(--dq-cream)]">2. Add the tag</h3><p className="mt-2 text-xl leading-relaxed">This level asks you to mark the first of three commits. Type <code>git tag v0.1 HEAD~2</code> and watch for the tag label beside that first commit.</p></li>
            <li className="py-6"><h3 className="text-2xl text-[var(--dq-cream)]">3. Check what moved</h3><p className="mt-2 text-xl leading-relaxed">Use <code>git tag</code> to list the tag. Make the next commit, then compare the branch and tag labels. The tag still marks its original commit.</p></li>
          </ol>
        </section>

        <section className="mx-auto mt-14 max-w-2xl" aria-labelledby="real-repo">
          <h2 id="real-repo" className="pixel-font text-[11px] leading-relaxed text-[var(--dq-gold)] sm:text-sm">USE IT IN A REAL REPOSITORY</h2>
          <p className="mt-5 text-xl leading-relaxed">The game teaches lightweight tags. For a release, consider an annotated tag: <code>git tag -a v1.0 -m &quot;Release 1.0&quot;</code>. An annotated tag carries a message and tagger details. The game does not teach or simulate that form, so use a real Git repository for it.</p>
          <p className="mt-5 text-xl leading-relaxed">Local tags do not reach a remote with an ordinary <code>git push</code>. To share one, run <code>git push origin v1.0</code> in your real repository after you check its target. GitQuest simulates branch pushes, not tag pushes. Do not use the game to test release publishing.</p>
          <p className="mt-5 text-xl leading-relaxed">If you tagged the wrong commit, check <code>git show v1.0</code> before changing anything. Delete a local mistaken tag with <code>git tag -d v1.0</code>, then create it at the right commit. A tag already shared with others needs a coordinated correction, since they may have fetched it.</p>
          <p className="mt-5 text-xl leading-relaxed">The <a className="underline hover:text-[var(--dq-gold)]" href="https://git-scm.com/book/en/v2/Git-Basics-Tagging">official Git tagging chapter</a> explains lightweight and annotated tags. The <a className="underline hover:text-[var(--dq-gold)]" href="https://git-scm.com/docs/git-tag">Git tag manual</a> lists the exact command forms.</p>
        </section>

        <nav aria-label="Related Git guides" className="mx-auto mt-14 max-w-2xl border-t border-[var(--dq-border)] pt-7">
          <p className="pixel-font text-[9px] leading-relaxed text-[var(--dq-gold)]">CONTINUE LEARNING</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-xl">
            <Link href="/git-practice-exercises" className="underline hover:text-[var(--dq-gold)]">Git practice exercises</Link>
            <Link href="/git-branching-practice" className="underline hover:text-[var(--dq-gold)]">Git branching practice</Link>
            <a href="https://github.com/Georgefifth/journey/blob/master/guides/README.md" className="underline hover:text-[var(--dq-gold)]">Readable Git guides</a>
          </div>
        </nav>
      </article>
    </main>
  );
}
