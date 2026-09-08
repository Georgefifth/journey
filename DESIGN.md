# The Build Log — Design Brief for Visual Refinement

## Concept

A hero's journey through hackathon dungeons. Each hackathon is a boss encounter on a world map. The hero (a chibi mage 🧙‍♂️) travels a winding path, battling bosses, gaining EXP, and working toward the final Demon King.

The metaphor: hackathons are RPG quests. Shipping under deadline pressure is battle. Bugs are damage. Learnings are EXP. The final boss (Procrastination) is never truly defeated — the journey continues.

## Why this theme

- Hackathons are inherently gamified (time pressure, scoring, prizes)
- RPG framing makes "what I learned" feel like earned progression, not a resume bullet
- Chibi/DQ aesthetic is warm and human, opposite of the cold corporate portfolio
- The "demon king not yet encountered" ending creates anticipation for future entries

## Current visual language

### Palette
- **Background**: Deep blue-black `#1a1a2e` (night sky / dungeon)
- **Surface**: `#16213e` (dialogue box fill)
- **Border accent**: Gold `#f9d56e` (treasure / quest reward)
- **Text**: Cream `#f5f3e7` (parchment)
- **Status colors**: Red `#e74c3c` (in battle), Green `#2ecc71` (victory), Purple `#9b59b6` (EXP)
- **Muted**: `#4a4a6e` (borders, unknown states)

### Typography
- **Headers / UI labels**: Press Start 2P (8-bit pixel font, used sparingly for titles, badges, section labels)
- **Body / dialogue**: VT323 (monospace pixel font, readable but retro, 18px base)
- **Hierarchy**: pixel font = system/labels, VT323 = narrative/human voice

### Signature elements
1. **DQ Dialogue Box**: Gold double-border box with inner border, drop shadow stack. This is the core container for every piece of content. Should feel like pressing A to advance text.
2. **World Map**: SVG zigzag path with castle nodes. Dashed path animates (marching ants). Hero sprite sits at current battle position.
3. **HP Bar**: Gradient fill (green→gold→red) showing boss health. Animates from 0 on scroll.
4. **CRT scanline overlay**: Subtle horizontal lines across entire viewport for retro CRT feel.

## Layout structure

```
┌─────────────────────────────┐
│      TITLE SCREEN           │
│   🧙‍♂️ (bouncing hero)        │
│   THE BUILD LOG (pixel)     │
│   subtitle (italic)          │
│   [stats box: battles/N]     │
├─────────────────────────────┤
│   ◆ WORLD MAP ◆              │
│   [SVG zigzag path with      │
│    castle nodes + labels]    │
│    🏰 ─ ─ ─ 🏰 ─ ─ ─ 👑      │
├─────────────────────────────┤
│   ◆ BATTLE LOGS ◆            │
│                              │
│   [BOSS ENCOUNTER CARD]      │
│   🌀 Boss Name               │
│   ┌─────────────────────┐   │
│   │ ⚔️ IN BATTLE  LV.1   │   │
│   │ DemandRadar          │   │
│   │ "tagline italic"      │   │
│   │ HP: ████████░░ 62/100 │   │
│   │ story text...         │   │
│   │ INVENTORY: [tag][tag] │   │
│   │ [▶ DEMO] [▶ REPO]     │   │
│   │ REWARD: 💰 ...        │   │
│   │ ✨ EXP GAINED:        │   │
│   │  ▸ learning 1         │   │
│   │  ▸ learning 2         │   │
│   └─────────────────────┘   │
│           ▼                  │
│                              │
│   [DEMON KING PLACEHOLDER]   │
│   👑 ???                     │
│   "The journey continues..." │
├─────────────────────────────┤
│   footer + github link       │
└─────────────────────────────┘
```

## Component breakdown

### QuestMap.tsx
- SVG viewBox 1000×280
- Nodes positioned in zigzag (alternate y ±50 from center)
- Each node: 44×44 rect (castle base) + boss emoji + status dot + label
- Path: animated dashed gold line, marching ants effect
- Active node: gold fill + gold border
- Current battle: red pulsing dot + 🗡️ hero sprite offset to the left
- Defeated: ✓ checkmark
- Unknown (demon king): "?" at 40% opacity
- Click node → smooth scroll to encounter

### BossEncounter.tsx
- Boss header: large emoji (drop-shadow glow) + status label + boss name
- DQ dialogue box (gold double border)
- Inner content:
  - Status badge (pixel font) + quest name + level
  - Project name (pixel font, gold, glow)
  - Tagline (italic, cream)
  - HP bar (animated fill on scroll)
  - Story (paragraph, cream)
  - Inventory (item tags with 📦 prefix)
  - Commands (▶ DEMO / ▶ REPO buttons)
  - Reward (💰 prefix, italic)
  - EXP GAINED (✨ header, ▸ bullet list)
- Continue arrow (▼ blinking) below

### page.tsx
- Title screen (hero sprite, title, subtitle, stats box)
- Quest map section
- Battle logs (mapped BossEncounter components)
- Demon king placeholder (faded, centered)
- Footer (built with / github link)

## Data model (data/hackathons.ts)

```typescript
{
  id: string,
  date: string,           // "2026-09"
  dateLabel: string,      // "Sep 2026"
  name: string,           // hackathon name
  project: string,        // project name
  tagline: string,        // one-liner, italic in UI
  status: "in-battle" | "victorious" | "not-encountered",
  stack: string[],        // tech → inventory items
  demo?: string,
  repo?: string,
  learnings: string[],    // → EXP GAINED list
  story: string,          // → dialogue paragraph
  // RPG-specific:
  bossName: string,       // e.g. "The False Saturation"
  bossEmoji: string,      // e.g. "🌀"
  level: number,           // quest difficulty
  hp: number,             // current boss HP (progress indicator)
  maxHp: number,           // max HP (100)
  reward: string,          // what you got from the battle
}
```

## Animation notes

- Hero sprite: gentle bounce (2s loop, translateY -4px)
- Quest path: draws in on load (2s, pathLength 0→1), then marching ants loop
- Boss emoji: spring scale-in on scroll (rotate -20° → 0°)
- HP bar: fills from 0 to target % on scroll (1.2s ease-out)
- Battle log cards: fade + slide up on scroll (y: 30 → 0)
- Continue arrow: blink (1s steps(2))
- Current battle dot: opacity pulse (1s loop)
- All animations respect `prefers-reduced-motion`

## Known limitations / areas for visual refinement

1. **No real pixel art**: Currently uses emoji for all sprites (hero, bosses, items). A visual LLM could replace these with actual pixel art sprites — 16×16 or 32×32 PNGs or CSS box-drawing.
2. **Castle nodes are plain rects**: Could be detailed pixel-art castle SVGs with battlements, doors, flags.
3. **World map is abstract zigzag**: Could be a real tile-based map with terrain (grass, forest, mountain, dungeon) and the path winding through it.
4. **No sound**: DQ games have iconic menu blips. Web Audio API could add cursor-move and text-scroll sounds (optional, can be intrusive).
5. **Dialogue box could animate text**: Currently shows all text at once. A typewriter effect (character-by-character reveal) would be more authentic DQ feel.
6. **No "press A to continue" interaction**: Could gate story text behind a button press for full RPG immersion.
7. **HP bar semantics are loose**: Currently HP represents "how far along the hackathon is" (62/100 = 62% done). Could be reframed as "boss health remaining" (lower = closer to victory) or kept as-is.
8. **Demon king is static**: Could have a subtle ominous animation (glow pulse, screen shake on scroll-into-view).
9. **Mobile layout**: Works but the world map SVG gets cramped. Could switch to a vertical scroll list of nodes on mobile.
10. **Color contrast**: Gold on dark blue passes WCAG, but pixel fonts at small sizes (8px) may be hard to read on some screens.

## Tech stack

- Next.js 15 (App Router, static export)
- Tailwind CSS 3 (custom palette via CSS variables)
- Framer Motion (scroll-triggered reveals, spring animations)
- Google Fonts: Press Start 2P + VT323
- Deployed on Vercel (static)

## File map

```
journey/
├── app/
│   ├── globals.css       # All custom CSS, DQ box, HP bar, CRT overlay
│   ├── layout.tsx        # Font imports, metadata
│   └── page.tsx          # Main page: title screen + map + battle logs
├── components/
│   ├── QuestMap.tsx      # SVG world map with boss nodes
│   └── BossEncounter.tsx # DQ dialogue box encounter card
├── data/
│   └── hackathons.ts     # All hackathon entries + demon king
├── tailwind.config.ts   # Custom palette + font families
└── globals.d.ts         # CSS module type declaration
```

## Design decisions worth defending

- **VT323 over Press Start 2P for body**: Press Start 2P is unreadable at body text sizes. VT323 keeps the pixel aesthetic but is legible at 18px. The hierarchy (pixel font = system, VT323 = human) mirrors how RPGs use different fonts for menus vs dialogue.
- **Gold as primary accent, not green**: Green is "go/victory", gold is "treasure/quest". Gold ties the whole palette together (borders, titles, links, rewards) while green/red are reserved for status semantics.
- **CRT overlay is subtle (6% opacity lines)**: Full CRT effect (curvature, chromatic aberration) would be heavy-handed. The scanlines are enough to signal "retro" without hurting readability.
- **Emoji sprites over pixel art**: Pragmatic choice — no pixel art assets exist yet. Emoji are universally rendered, instantly readable, and the drop-shadow glow makes them feel less like default Slack reactions. This is the #1 thing a visual LLM should replace.
