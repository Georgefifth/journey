export type Hackathon = {
  id: string;
  date: string;
  dateLabel: string;
  name: string;
  project: string;
  tagline: string;
  status: "shipping" | "shipped" | "planned";
  stack: string[];
  demo?: string;
  repo?: string;
  learnings: string[];
  story: string;
};

export const hackathons: Hackathon[] = [
  {
    id: "demandradar",
    date: "2026-09",
    dateLabel: "Sep 2026",
    name: "AI Content Engine Hackathon",
    project: "DemandRadar",
    tagline: "The topic looks covered. The details are not.",
    status: "shipping",
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
      "Started as a generic comment-to-topic recommender. After studying 79 gallery entries, that lane was already crowded — ContentPulse, CreatorLoop, ChannelIQ all lived there. The pivot: stop looking for 'topics nobody covered' and start finding 'topics everyone covered but nobody answered well.' DemandRadar detects false saturation by comparing audience demand evidence against supply coverage at the detail level, not the topic level.",
  },
];
