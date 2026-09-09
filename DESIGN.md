# The Build Log — Design Brief (VER.2.2, game-feel pass)

## Concept

A hero's journey through hackathon dungeons. Each hackathon is a boss encounter
on a pixel-art world map. The hero (a chibi mage) travels a winding road,
battling bosses, gaining EXP, and working toward the final Demon King.

The metaphor: hackathons are RPG quests. Shipping under deadline pressure is
battle. Bugs are damage. Learnings are EXP. The final boss (Procrastination) is
never truly defeated — the journey continues.

## What changed in VER.2.2

1. **The slime is alive.** The boss sprite idles with a slow pixel squash
   & stretch and blinks every ~4.6s (a second blink-frame sprite overlays
   the transparent eye holes — pure pixels, no filters).
2. **8-bit SFX.** A tiny Web Audio square-wave engine (`lib/blip.ts`):
   PRESS START plays a rising E5→A5 fanfare, map castles play a menu blip
   on click. AudioContext is created lazily on first gesture (autoplay
   policy); a fixed HUD chip (bottom-right, `SFX ON/OFF`) toggles and
   persists mute state in localStorage.
3. **Click-to-skip dialogue.** The typewriter story can be completed with
   a click (also keyboard-accessible via the card's natural focus flow).
4. **Hit feedback.** The in-battle castle shudders in sync with the slash
   flash (same 0.9s tempo).
5. All new motion is disabled under `prefers-reduced-motion`.

## What changed in VER.2.1

1. **Social share image.** `public/og.png` (1200×630) — pixel hero between a
   castle and the demon tower, generated from the same sprite palette.
   Wired up via `metadataBase` + `openGraph` + `twitter` card metadata, so
   links unfurl with the full pixel poster everywhere.
2. **A living map sky.** The world map now has a pixel moon with a soft
   radial halo, three drifting cloud silhouettes (deterministic shapes, CSS
   keyframe drift with negative delays so they're mid-flight on load), and
   two two-frame-flapping birds gliding across on long linear loops.
3. **Pond shimmer.** Two blinking cyan glints on the pond surface.
4. **Demon tower windows breathe.** Purple window rects pulse on both the
   map's tower node and the big Demon King sprite (staggered delays).
5. **Cursed mist.** Purple particles slowly rise from the Demon King tower's
   base (Framer Motion loops, `aria-hidden`).
6. **Accessibility.** All new ambient animations are disabled under
   `prefers-reduced-motion` (the block-caret / typewriter already were).

## What changed in VER.2.0

1. **Real pixel art everywhere.** Every emoji sprite was replaced with
   hand-drawn ASCII pixel maps rendered as SVG rects (`shapeRendering:
   crispEdges`). Sprites live in `components/pixel/sprites.ts` and render via
   `PixelSprite` (standalone) or `PixelRects` (nested inside the map SVG).
2. **A living world map.** The abstract zigzag became a framed in-game window:
   stepped hills, grass ticks, pine/round trees, pond, rocks, bushes, a
   signpost, and a staircase road with 45° chamfered corners. Castles are real
   pixel keeps with flags; the demon king is a dark tower with a gold crown and
   glowing purple windows. The hero stands on the road next to the current
   battle, complete with bobbing ▼ marker and a looping slash flash.
3. **Mobile quest trail.** Below `md` the map becomes a vertical trail with the
   same sprites (fixes the cramped-SVG problem from v1).
4. **DQ dialogue cards, upgraded.** Status badge, quest meta row, hard-shadow
   pixel titles, decorative quotes, inventory chips with pixel parcel icons,
   LOOT chest, EXP list with staggered pop-in and floating `+EXP` chips.
5. **Typewriter story text.** The story reveals character-by-character with a
   blinking block caret when the card scrolls into view (respects
   `prefers-reduced-motion`).
6. **Segmented HP bar.** 10 pixel segments light up sequentially while a
   tabular-numbers counter ticks up; color shifts green → gold → red with
   remaining HP.
7. **Atmosphere.** Deterministic starfield (seeded PRNG — no hydration
   mismatch), rare shooting star, floating pixel moon, deepened night-sky
   gradient, refined CRT scanlines + vignette.
8. **PRESS START.** The title screen is a real title screen: hero on a grass
   platform, blinking PRESS START that smooth-scrolls to the map, save-file
   stats card with pixel sword/flame/trophy icons.
9. **Pixel favicon** (slime) via inline SVG data URI; `theme-color` set for
   mobile chrome.

## Palette

- **Sky gradient**: `#0b0b1e → #141432 → #1a1a2e → #0e0e22`
- **Panel**: `#141b33` (dialogue box fill)
- **Gold**: `#f9d56e` (borders, titles, road dashes) / dark gold `#c9973a`
- **Text**: cream `#f5f3e7`, body `#e8e8f0`, muted `#9a9ab8`
- **Status**: red `#ff6b5e` (in battle), green `#3ddc84` (victory / HP high),
  purple `#b07ce8` (EXP / demon king)
- **Terrain**: far hills `#161e3d`, ground `#122419`, accents `#1f6e42`

## Typography

- **Press Start 2P** — system voice: titles, badges, labels, buttons (with
  hard offset shadows, never soft glows, for a crisp retro feel)
- **VT323** — human voice: story, dialogue, labels, map text (18px base)

## Animation inventory

- Hero bounce (2.2s loop), map hero bobbing marker
- Road: draw-in on load → marching-ants dashes (CSS `stroke-dashoffset`)
- Slash flash at the active battle (opacity keyframes, infinite)
- Card reveal + typewriter + HP segment stagger + counter
- EXP items stagger in with floating `+EXP` chips
- Demon king: purple glow pulse + one-time shake on first view
- Stars twinkle; moon floats; rare shooting star
- All motion respects `prefers-reduced-motion`

## Implementation notes worth remembering

- **CSS transforms vs SVG transform attributes**: CSS-animated `transform`
  (e.g. `.hero-bounce`) overrides an element's `transform` *attribute*. Any
  sprite that is both positioned via attribute and animated via CSS must be
  nested: outer `<g transform="...">` for placement, inner `<g class="...">`
  for animation.
- **framer-motion `pathLength` rewrites `stroke-dasharray`**, killing CSS
  marching dashes. Solution: two paths — one animates `pathLength` (draw-in
  underline), the other only fades opacity and keeps its CSS dasharray.
- **Deterministic randomness**: stars/hills use a seeded `mulberry32` PRNG so
  SSR and client markup match (no hydration warnings).
- **Pixel rects use `width={1.06}`** to avoid hairline seams between cells.

## Data model (data/hackathons.ts)

Same as v1, plus:

```typescript
bossSprite?: "slime"; // optional pixel sprite key; falls back to bossEmoji
```

## Tech stack

- Next.js 15 (App Router)
- Tailwind CSS 3 (palette via CSS variables; sprite colors in `PALETTE`)
- Framer Motion (scroll-triggered reveals, springs)
- Google Fonts: Press Start 2P + VT323 (via `<link>`; no next/font needed)
- Zero runtime image dependencies — everything on the page is inline SVG
  pixel art; the only raster asset is `public/og.png` for social embeds

## Future ideas

- Web Audio menu blips (cursor move / text scroll), behind a mute toggle
- "Press A to continue" gating for long stories
- Terrain variety per biome as the map grows (forest → cave → castle)
- Demon king encounter page (runtimes: ???)
