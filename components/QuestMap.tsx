"use client";
import { useState } from "react";
import QuestRegion from "./QuestRegion";
import { dateLabel, statusConfig, type Hackathon } from "../data/hackathons";

type Props = {hackathons: Hackathon[]; activeId: string | null; onSelect: (id: string) => void};
export default function QuestMap({hackathons, activeId, onSelect}: Props) {
  // Keep castles legible: three quests + the final tower at most per scene.
  const regions: Hackathon[][] = [];
  for (const quest of hackathons) {
    const year = quest.endDate?.slice(0,4) ?? "Unknown dates";
    const last = regions[regions.length - 1];
    if (!last || last.length === 3 || (last[0].endDate?.slice(0,4) ?? "Unknown dates") !== year) regions.push([quest]);
    else last.push(quest);
  }
  const initial = Math.max(0, regions.findIndex(r => r.some(h => h.status === "IN_BATTLE" || h.status === "SUBMITTED")));
  const [region, setRegion] = useState(initial);
  const [query, setQuery] = useState("");
  const current = regions[region] ?? [];
  const matchingHackathons = hackathons.filter(h =>
    `${h.eventName} ${h.builds.map(build => build.projectName).join(" ")}`.toLowerCase().includes(query.trim().toLowerCase())
  );
  return <div>
    <p className="text-center text-[var(--dq-muted)] mb-4">{hackathons.length} quest stops · ordered by submission deadline · dates in Malaysia time</p>
    <nav aria-label="Campaign regions" className="map-controls mb-5">
      <button className="cmd-link" disabled={region === 0} onClick={() => setRegion(region - 1)}>◀ PREV</button>
      <label className="flex-1 min-w-0 text-center">REGION
        <select aria-label="Choose campaign region" value={region} onChange={e => setRegion(Number(e.target.value))}>
          {regions.map((r,i) => <option key={i} value={i}>{r[0].endDate?.slice(0,4) ?? "Unknown dates"} · {i+1}/{regions.length} · {dateLabel(r[0])}</option>)}
        </select>
      </label>
      <button className="cmd-link" disabled={region === regions.length - 1} onClick={() => setRegion(region + 1)}>NEXT ▶</button>
    </nav>
    <QuestRegion key={region} hackathons={current} activeId={activeId} onSelect={onSelect} finalRegion={region === regions.length - 1}/>
    <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 text-[16px]" aria-label="Map status legend">
      {Object.entries(statusConfig).filter(([s]) => !["ABANDONED"].includes(s)).map(([key,s]) => <span key={key} style={{color:s.color}}>◆ {s.label}</span>)}
    </div>
    <details className="campaign-index mt-6">
      <summary className="cmd-link">▶ QUEST INDEX — ALL {hackathons.length} STOPS</summary>
      <input
        type="search"
        className="quest-index-search"
        aria-label="Find a quest or build"
        placeholder="FIND BUILD"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <ol className="mt-4 grid sm:grid-cols-2 gap-2">
        {matchingHackathons.map(h => <li key={h.id}><button className="quest-index-link" onClick={() => {setRegion(regions.findIndex(r => r.some(q => q.id === h.id))); onSelect(h.id);}}>
          <span>{h.eventName}</span><span className="text-[var(--dq-muted)]">{dateLabel(h)} · {statusConfig[h.status].label}</span>
          {query.trim() && h.builds.filter(build => build.projectName.toLowerCase().includes(query.trim().toLowerCase())).map(build =>
            <span key={build.id} className="text-[var(--dq-gold)]">{build.projectName}</span>
          )}
        </button></li>)}
      </ol>
      {matchingHackathons.length === 0 && <p className="mt-4 text-[var(--dq-muted)]">No matching quests.</p>}
    </details>
  </div>;
}
