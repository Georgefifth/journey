# The Build Log

A signal trace of hackathons — what I built, what broke, what I learned.

Built with Next.js 15, Tailwind CSS, and Framer Motion. Deployed on Vercel.

## Structure

- `app/page.tsx` — main timeline page
- `components/SignalTrace.tsx` — the signature radar/signal trace element
- `components/TimelineEntry.tsx` — individual hackathon entry card
- `data/hackathons.ts` — all hackathon entries (add new ones here)

## Add a new hackathon

Edit `data/hackathons.ts` and append a new entry to the `hackathons` array. The signal trace and timeline update automatically.

## Run locally

```bash
npm install
npm run dev
```

## Deploy

Pushes to `main` auto-deploy to Vercel.
