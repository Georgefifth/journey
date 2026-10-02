import records from "./hackathons.json";

export type BattleStatus = "UPCOMING" | "IN_BATTLE" | "SUBMITTED" | "AWAITING_RESULTS" | "VICTORY" | "COMPLETED" | "ABANDONED" | "REGISTERED";
export type Build = {
  id: string; projectName: string; description: string; buildNotes: string;
  createdAt: string | null; devpostUrl: string; githubUrl: string | null;
  demoUrl: string | null; image: string | null; imageSource: string | null;
  imageWidth?: number; imageHeight?: number;
  technologies: string[]; team: string | null; award: string | null; reflection: string | null;
};
export type Hackathon = {
  id: string; eventName: string; eventUrl: string; startDate: string | null;
  endDate: string | null; status: BattleStatus; award: string | null;
  description: string; builds: Build[]; statusEvidence: string; sourceSignal: string;
  reviewedAt: string; notes: string[]; bossName: string; bossSprite: string;
};
export const statusConfig: Record<BattleStatus, {label: string; badgeClass: string; progress: number | null; color: string}> = {
  UPCOMING: {label: "UPCOMING", badgeClass: "badge-unknown", progress: 0, color: "var(--dq-muted)"},
  IN_BATTLE: {label: "IN BATTLE", badgeClass: "badge-battle", progress: 50, color: "var(--dq-red)"},
  SUBMITTED: {label: "SUBMITTED", badgeClass: "badge-pending", progress: 90, color: "var(--dq-gold)"},
  AWAITING_RESULTS: {label: "AWAITING VERDICT", badgeClass: "badge-pending", progress: 95, color: "var(--dq-purple)"},
  VICTORY: {label: "VICTORY!", badgeClass: "badge-victory", progress: 100, color: "var(--dq-green)"},
  COMPLETED: {label: "BATTLE CLEARED", badgeClass: "badge-complete", progress: 100, color: "#4dd9e8"},
  ABANDONED: {label: "QUEST PAUSED", badgeClass: "badge-unknown", progress: null, color: "var(--dq-muted)"},
  REGISTERED: {label: "REGISTERED", badgeClass: "badge-unknown", progress: null, color: "var(--dq-muted)"},
};
export const hackathons = records as Hackathon[];
export const participated = hackathons.filter(h => h.builds.length > 0 || h.status === "IN_BATTLE");
export const campaignStats = {
  battles: participated.length,
  inBattle: hackathons.filter(h => h.status === "IN_BATTLE").length,
  victories: hackathons.filter(h => h.status === "VICTORY").length,
  pending: hackathons.filter(h => h.status === "AWAITING_RESULTS").length,
  builds: hackathons.reduce((sum,h) => sum + h.builds.length,0),
};
export function dateLabel(h: Hackathon): string {
  const date = h.endDate;
  if (!date) return "Event dates unknown";
  return new Intl.DateTimeFormat("en-MY", {month: "short", day: "numeric", year: "numeric", timeZone: "Asia/Kuala_Lumpur"}).format(new Date(date));
}
export const demonKing = {name: "The Demon King of Procrastination", emoji: "👑", hint: "The final boss. Not yet encountered. The journey continues..."};
