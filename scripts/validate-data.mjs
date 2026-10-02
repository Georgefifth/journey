import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const records=JSON.parse(readFileSync(new URL('../data/hackathons.json',import.meta.url)));
const statuses=new Set(['UPCOMING','IN_BATTLE','SUBMITTED','AWAITING_RESULTS','VICTORY','COMPLETED','ABANDONED','REGISTERED']);
const ids=new Set(), urls=new Set(), projects=new Set();
for(const q of records) {
  assert(!ids.has(q.id),`Duplicate quest ${q.id}`); ids.add(q.id);
  assert(!urls.has(q.eventUrl),`Duplicate event ${q.eventUrl}`); urls.add(q.eventUrl);
  assert(statuses.has(q.status),`Unknown status ${q.status}`);
  assert(q.statusEvidence && q.reviewedAt,`Missing evidence ${q.id}`);
  assert(q.status!=='VICTORY' || q.award,`Victory without award ${q.id}`);
  assert(!['REGISTERED','UPCOMING'].includes(q.status) || !q.builds.length,`Registration has submitted builds ${q.id}`);
  for(const d of [q.startDate,q.endDate]) assert(d===null || !Number.isNaN(Date.parse(d)),`Invalid date ${q.id}`);
  for(const b of q.builds) {
    assert(!projects.has(b.devpostUrl),`Duplicate submission ${b.devpostUrl}`); projects.add(b.devpostUrl);
    assert(b.projectName && b.description,`Empty build ${b.id}`);
    for(const link of [b.devpostUrl,b.githubUrl,b.demoUrl]) assert(link===null || new URL(link).protocol==='https:',`Invalid link ${b.id}`);
    assert(!b.image || existsSync(new URL('../public'+b.image,import.meta.url)),`Missing thumbnail ${b.id}`);
  }
}
assert.equal(records.find(q=>q.id==='graphiques-challenge').builds.length,2,'Keep the two Graphiques submissions under one event');
assert.equal(records.find(q=>q.id==='ai-content-engine-hacks').endDate,null,'Do not invent dates for the removed event');
const chronological=records.map(q=>q.endDate ?? '9999');
assert.deepEqual(chronological,[...chronological].sort(),'Deadline order, unknown dates last');
console.log(`${records.length} unique quests, ${projects.size} unique submissions; evidence, dates, links and assets validated.`);
