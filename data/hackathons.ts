export type Hackathon = {
  id: string;
  date: string;
  dateLabel: string;
  name: string;
  project: string;
  tagline: string;
  status: "in-battle" | "victorious" | "not-encountered";
  stack: string[];
  demo?: string;
  repo?: string;
  learnings: string[];
  story: string;
  // RPG fields
  bossName: string;
  bossEmoji: string;
  level: number;
  hp: number;
  maxHp: number;
  reward: string;
  // optional: pixel sprite key (falls back to bossEmoji)
  bossSprite?: "slime";
};

export const hackathons: Hackathon[] = [
  {
    id: "demandradar",
    date: "2026-09",
    dateLabel: "Sep 2026",
    name: "AI Content Engine Hackathon",
    project: "DemandRadar",
    tagline: "The topic looks covered. The details are not.",
    status: "in-battle",
    stack: ["Vanilla JS", "YouTube Data API v3", "Render Static"],
    demo: "https://demandradar.onrender.com",
    repo: "https://github.com/Georgefifth/DemandRadar",
    learnings: [
      "Reinventing comment clustering isn't enough — the original move was framing 'false saturation' as the problem.",
      "Supply-side relevance can't default to 'strong match' or every topic looks saturated.",
      "Keyword boundary matching matters: 'invent' is not 'vent', 'carbon' alone is too vague.",
      "A static browser app with user-supplied API keys can ship without a backend and still feel real.",
    ],
    story:
      "The guild posted a bounty: build a tool for AI content creators. The lane was crowded — ContentPulse, CreatorLoop, ChannelIQ all camped the comment-analysis dungeon. I pivoted. Stop hunting 'topics nobody covered' and start hunting 'topics everyone covered but nobody answered well.' DemandRadar detects false saturation by comparing audience demand evidence against supply coverage at the detail level.",
    bossName: "The False Saturation",
    bossEmoji: "🌀",
    bossSprite: "slime",
    level: 1,
    hp: 62,
    maxHp: 100,
    reward: "A shipped demo + a new way to see content gaps",
  },
];

// The final boss — always at the end of the path
export const demonKing = {
  name: "The Demon King of Procrastination",
  emoji: "👑",
  hint: "The final boss. Not yet encountered. The journey continues...",
};
