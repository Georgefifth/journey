// Optional, review-only discovery. Never runs during a build or visitor request.
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
const local = JSON.parse(readFileSync(new URL('../data/hackathons.json', import.meta.url)));
const normalize = url => new URL(url,'https://devpost.com').href.split('?')[0].replace(/\/$/,'');
const knownProjects = new Set(local.flatMap(q => q.builds.map(b => normalize(b.devpostUrl))));
const knownEvents = new Set(local.map(q => normalize(q.eventUrl)));
const report = { checkedAt: new Date().toISOString(), newProjectUrls: [], newEventUrls: [], errors: [], notice: 'Suggestions only. Verify project pages, event dates and results before editing data/hackathons.json. No local data is overwritten.' };
async function page(url) {
  const response = await fetch(url,{signal:AbortSignal.timeout(20000)});
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  return response.text();
}
try {
  const html = await page('https://devpost.com/Georgefifth');
  const projects = new Set([...html.matchAll(/href=["'](https:\/\/devpost\.com\/software\/[^"'#]+)["']/g)].map(m => normalize(m[1].replaceAll('&amp;','&'))));
  if (!projects.size) report.errors.push('No project links found. Devpost may have changed HTML or blocked access.');
  report.newProjectUrls = [...projects].filter(url => !knownProjects.has(url));
  let next = 'https://devpost.com/Georgefifth/challenges';
  const visited = new Set();
  const events = new Set();
  while (next && !visited.has(next) && visited.size < 20) {
    visited.add(next);
    const html = await page(next);
    for (const m of html.matchAll(/href=["'](https:\/\/[a-z0-9-]+\.devpost\.com\/?\?ref_content=default[^"']*)["']/g)) events.add(normalize(m[1]));
    const link = [...html.matchAll(/<a\b([^>]+)>/g)].find(m => /rel=["']next["']/.test(m[1]));
    const href = link?.[1].match(/href=["']([^"']+)["']/)?.[1];
    next = href ? new URL(href.replaceAll('&amp;','&'),'https://devpost.com').href : null;
    if (next && !next.startsWith('https://devpost.com/Georgefifth/challenges')) throw new Error('Unexpected pagination URL; stopped.');
  }
  report.newEventUrls = [...events].filter(url => !knownEvents.has(url));
  if (!events.size) report.errors.push('No registration links found; review the profile manually.');
} catch (error) { report.errors.push(error.message); }
mkdirSync(new URL('../.research/',import.meta.url),{recursive:true});
writeFileSync(new URL('../.research/devpost-suggestions.json',import.meta.url),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
