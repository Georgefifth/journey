# The Build Log

Georgefifth’s living pixel-art RPG chronicle: hackathons are quests, projects are builds, and each shipped experiment expands the save file. Next.js 15, Tailwind 3, Framer Motion, original hand-drawn SVG sprites, optional Web Audio SFX.

## Run and verify

Use Node 22.18+ (the OG utility imports TypeScript sprite data).

For a regular static web host, run `npm run export:static` and upload the contents of `out/`. The export includes all content and local optimized thumbnails without a Node server or Devpost access. Standard `npm run build` keeps the existing Next/Vercel hosting option.

```sh
npm ci
npm run dev
npm run validate:data
npm run typecheck
npm run build
npm start
```

## Save-file data

`data/hackathons.json` is the static source of truth. One record per **event**, with a `builds` array. Graphiques has two submissions under one event; Auris has separate submission pages at two events. Project names alone are not unique IDs. `data/hackathons.ts` owns types, status presentation, progress and computed counters.

Quests store stable IDs, exact event names, source URLs, offset-aware start/end dates or null, status, award or null, builds, evidence, review dates and uncertainty notes. Builds store project-page IDs, names, descriptions, build notes, page creation dates (not submission dates), Devpost/GitHub/demo links, local thumbnails/source URLs, technology tags, public credits, awards and optional reflections. Unknown fields stay null. Descriptions are the author’s public pitch, not independent verification of product claims.

The map follows **submission deadlines**, because event windows overlap and registration dates are not public. Missing dates have their own final region. Malaysia time is used for display. Regions contain at most three quests, retaining the original desktop scenery and mobile trail. Previous/next, a region selector and the complete index make all stops reachable.

Counters count events with public submitted builds or explicitly documented active work, not registrations. BUILDS counts public submission pages, including Auris’s two submissions. VICTORIES counts winning events, not award categories.

### Add a battle manually

1. Append an event record, or add a build to an existing event by its URL. Use stable IDs; do not duplicate events.
2. Verify names, links, dates, technologies and awards. Store exact evidence, a review date and notes. A deadline does not prove submission or loss.
3. Put an optimized thumbnail in `public/builds/`, with its path/source URL, or use null.
4. Keep reflections null unless they are your own notes. DemandRadar preserves the original repository’s reflection.
5. Sort by deadline (unknown dates last), run data validation and `npm run generate:og` when counts change.
6. Build and inspect desktop/mobile before committing.

### Status rules

| Status | Display | Progress | Evidence |
|---|---|---|---|
| UPCOMING | UPCOMING | 0% | Verified event window has not started |
| IN_BATTLE | IN BATTLE | 50% default | Actual ongoing work, not registration alone |
| SUBMITTED | SUBMITTED | 90% | Public submission; window open or timing unavailable |
| AWAITING_RESULTS | AWAITING VERDICT | 95% | Submitted, closed window, winners TBD |
| VICTORY | VICTORY! | 100% | Explicit recorded award |
| COMPLETED | BATTLE CLEARED | 100% | Winners announced, no recorded project award |
| ABANDONED | QUEST PAUSED | Unknown | Explicit intentionally discontinued work |
| REGISTERED | REGISTERED | Unknown | Registration only; participation/result unverified |

Progress is a status metaphor, never a precise completion measurement. Statuses are reviewed snapshots, not automatically inferred from a visitor’s clock. Re-check results before updating pending records. A participation certificate is not a ranked prize; exact Devpost award names are retained.

## Devpost review and future synchronization

The 2 Oct 2026 review inspected all 17 project pages, both pages listing 36 registered events, all seven achievements and event pages. DemandRadar’s extra event appears on its submission page but is absent from registrations, giving 37 stops and 16 submitted events. No public project was excluded. Registration-only entries remain visible but do not inflate battle totals.

`npm run sync:devpost` is optional, best-effort **discovery**. It follows visible registration pagination, compares public URLs with local records and writes `.research/devpost-suggestions.json`. It never overwrites data, assigns results, runs in production or blocks builds. It does not detect every edit to existing pages; review those manually. Changed HTML or blocked access is recorded in the report. Static local data remains authoritative.

See `docs/source-review.md` for uncertainties and `docs/deployment.md` for production setup.

## Production

Canonical: https://georgefifth.xyz. Metadata, sitemap, robots and social cards use that domain. `vercel.json` redirects www to the apex while preserving paths. Keep the original preview until the custom domain works.

Use the **existing** Vercel project connected to `Georgefifth/journey`. Confirm the production branch: the repository uses `master`, not `main`. With authenticated CLI access:

```sh
npx vercel link
npx vercel --prod
```

Add both domains in Settings → Domains. Copy the project-specific A/CNAME/TXT values Vercel displays to your DNS provider. Do not guess values or replace nameservers/email records.

## Visual system

`components/pixel/sprites.ts` holds the original palette/artwork. `QuestRegion.tsx` retains the road, castles, mage, birds and moon; `QuestMap.tsx` adds navigation. `BossEncounter.tsx` retains dialogue cards, typewriter, segmented progress, inventory and loot. `scripts/generate-og.mjs` renders the same vector sprites and a bitmap alphabet into a 1200×630 poster without network dependencies.

SFX defaults off and remembers the user’s choice. Motion respects reduced-motion preferences. Thirteen real project thumbnails total about 66 KB before Next image optimization; generic Devpost logos are omitted.
