"use client";

import { useState } from "react";
import posthog from "posthog-js";

export default function GitQuestFeedback() {
  const [choice, setChoice] = useState<"helpful" | "confusing" | null>(null);
  const [comment, setComment] = useState("");
  const [sent, setSent] = useState(false);

  return <div className="mb-6 border-t border-[rgba(74,74,110,0.6)] pt-4">
    <p className="pixel-font text-[8px] leading-relaxed text-[var(--dq-gold)]">GITQUEST FIELD NOTE</p>
    {sent ? <p role="status" className="mt-3 text-[var(--dq-cream)]">Thanks. Your note is saved.</p> : <form onSubmit={(event) => {
      event.preventDefault();
      if (!choice) return;
      posthog.capture("gitquest_feedback_submitted", {
        choice,
        ...(comment.trim() ? { comment: comment.trim() } : {}),
      });
      setSent(true);
    }}>
      <p className="mt-2 text-[var(--dq-cream)]">Did the demo help you learn Git?</p>
      <div role="group" aria-label="Rate the GitQuest demo" className="mt-3 flex flex-wrap gap-2">
        <button type="button" aria-pressed={choice === "helpful"} onClick={() => setChoice("helpful")} className={`feedback-choice ${choice === "helpful" ? "feedback-choice-selected" : ""}`}>👍 Helpful</button>
        <button type="button" aria-pressed={choice === "confusing"} onClick={() => setChoice("confusing")} className={`feedback-choice ${choice === "confusing" ? "feedback-choice-selected" : ""}`}>👎 Confusing</button>
      </div>
      {choice && <div className="mt-3">
        <label htmlFor="gitquest-comment" className="block text-[var(--dq-muted)]">What worked or got in your way? (optional)</label>
        <textarea id="gitquest-comment" value={comment} maxLength={500} rows={2} onChange={(event) => setComment(event.target.value)} className="feedback-comment mt-1 w-full" />
        <p className="mt-1 text-sm text-[var(--dq-muted)]">Your choice and note go to site analytics.</p>
        <button type="submit" className="feedback-send mt-2">SEND NOTE</button>
      </div>}
    </form>}
  </div>;
}
