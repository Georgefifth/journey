# The Build Log

A signal trace of hackathons — what I built, what broke, what I learned.

Built with Next.js 15, Tailwind CSS, and Framer Motion. Deployed on Vercel.

Every hackathon is a boss encounter on a pixel-art world map: a chibi mage
(the hero) travels a winding road, battles bosses, and banks EXP. All sprites
are hand-drawn ASCII pixel maps rendered as crisp SVG — no emoji, no image assets.

## Structure

- `app/page.tsx` — main page (title screen → world map → battle logs → demon king)
- `components/TitleScreen.tsx` — title screen with PRESS START + save-file stats
- `components/QuestMap.tsx` — pixel world map (desktop SVG window + mobile vertical trail)
- `components/BossEncounter.tsx` — DQ dialogue-box battle card (typewriter story, segmented HP bar, EXP list)
- `components/DemonKing.tsx` — final boss placeholder
- `components/Starfield.tsx` — ambient twinkling stars + pixel moon
- `components/pixel/PixelSprite.tsx` — pixel-art renderer (SVG rects from string maps)
- `components/pixel/sprites.ts` — **all pixel sprites live here** (hero, bosses, castles, scenery, icons)
- `data/hackathons.ts` — all hackathon entries (add new ones here)

## Add a new hackathon

1. Edit `data/hackathons.ts` and append a new entry to the `hackathons` array.
   The map, stats, and battle logs update automatically.
2. (Optional) Give the boss its own sprite: draw a new pixel map in
   `components/pixel/sprites.ts`, register it in `BOSS_SPRITES` inside
   `components/BossEncounter.tsx`, and set `bossSprite: "your-key"` on the entry.
   Without a sprite it falls back to `bossEmoji`.

### Drawing pixel sprites

A sprite is just an array of equal-length strings. Each character maps to a
color in `PALETTE`; `.` or space = transparent:

```ts
export const myBoss: PixelMap = [
  "..kkkk..",
  ".kcccck.",
  "kcceeck.",   // e = eyes
  "kccccck.",
  ".kkkkkk.",
];
```

## Run locally

```bash
npm install
npm run dev
```

## Deploy

Pushes to `main` auto-deploy to Vercel.
