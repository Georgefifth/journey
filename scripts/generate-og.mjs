// Reuses the site's code-native pixel assets. Run with Node 22.18+.
import { readFileSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';
import { PALETTE, heroMage, castle, demonTower, pineTree, moon } from '../components/pixel/sprites.ts';
const records = JSON.parse(readFileSync(new URL('../data/hackathons.json', import.meta.url)));
const battles = records.filter(q => q.builds.length || q.status === 'IN_BATTLE').length;
const builds = records.reduce((s,q) => s + q.builds.length, 0);
const victories = records.filter(q => q.status === 'VICTORY').length;
const pixels = (map,x,y,scale) => `<g transform="translate(${x} ${y}) scale(${scale})">${map.flatMap((row,y) => [...row].map((c,x) => PALETTE[c] ? `<rect x="${x}" y="${y}" width="1" height="1" fill="${PALETTE[c]}"/>` : '')).join('')}</g>`;
// A small 5×7 bitmap alphabet keeps typography crisp without network fonts.
const alphabet = {
 A:['01110','10001','10001','11111','10001','10001','10001'], B:['11110','10001','10001','11110','10001','10001','11110'],
 C:['01111','10000','10000','10000','10000','10000','01111'], D:['11110','10001','10001','10001','10001','10001','11110'],
 E:['11111','10000','10000','11110','10000','10000','11111'], F:['11111','10000','10000','11110','10000','10000','10000'],
 G:['01111','10000','10000','10111','10001','10001','01110'], H:['10001','10001','10001','11111','10001','10001','10001'],
 I:['11111','00100','00100','00100','00100','00100','11111'], J:['00111','00010','00010','00010','10010','10010','01100'],
 K:['10001','10010','10100','11000','10100','10010','10001'], L:['10000','10000','10000','10000','10000','10000','11111'],
 M:['10001','11011','10101','10101','10001','10001','10001'], N:['10001','11001','10101','10011','10001','10001','10001'],
 O:['01110','10001','10001','10001','10001','10001','01110'], P:['11110','10001','10001','11110','10000','10000','10000'],
 Q:['01110','10001','10001','10001','10101','10010','01101'], R:['11110','10001','10001','11110','10100','10010','10001'],
 S:['01111','10000','10000','01110','00001','00001','11110'], T:['11111','00100','00100','00100','00100','00100','00100'],
 U:['10001','10001','10001','10001','10001','10001','01110'], V:['10001','10001','10001','10001','10001','01010','00100'],
 W:['10001','10001','10001','10101','10101','10101','01010'], X:['10001','10001','01010','00100','01010','10001','10001'],
 Y:['10001','10001','01010','00100','00100','00100','00100'], Z:['11111','00001','00010','00100','01000','10000','11111'],
 '0':['01110','10001','10011','10101','11001','10001','01110'], '1':['00100','01100','00100','00100','00100','00100','01110'],
 '2':['01110','10001','00001','00010','00100','01000','11111'], '3':['11110','00001','00001','01110','00001','00001','11110'],
 '4':['00010','00110','01010','10010','11111','00010','00010'], '5':['11111','10000','10000','11110','00001','00001','11110'],
 '6':['01110','10000','10000','11110','10001','10001','01110'], '7':['11111','00001','00010','00100','01000','01000','01000'],
 '8':['01110','10001','10001','01110','10001','10001','01110'], '9':['01110','10001','10001','01111','00001','00001','01110'],
 '.':['00000','00000','00000','00000','00000','00110','00110'], ':':['00000','00110','00110','00000','00110','00110','00000'],
 "'":['00100','00100','00000','00000','00000','00000','00000'],
};
function text(value,y,s,color) {
  const x=(1200-(value.length*6-1)*s)/2;
  return `<g fill="${color}">${[...value].flatMap((c,i) => (alphabet[c.toUpperCase()] ?? []).flatMap((row,r) => [...row].map((p,k) => p==='1' ? `<rect x="${x+(i*6+k)*s}" y="${y+r*s}" width="${s}" height="${s}"/>`:''))).join('')}</g>`;
}
const stars=Array.from({length:90},(_,i)=>`<rect x="${30+(i*137)%1140}" y="${30+(i*83)%480}" width="2" height="2" fill="#9a9ab8" opacity=".45"/>`).join('');
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" shape-rendering="crispEdges">
<rect width="1200" height="630" fill="#10102a"/>${stars}<rect x="20" y="20" width="1160" height="590" fill="none" stroke="#c9973a" stroke-width="4"/><rect x="28" y="28" width="1144" height="574" fill="none" stroke="#f9d56e" stroke-width="2"/>
${pixels(moon,1050,55,7)}${text('THE BUILD LOG',125,9,'#f9d56e')}${text("A HERO'S JOURNEY THROUGH HACKATHON DUNGEONS",220,3,'#f5f3e7')}${text(`BATTLES: ${battles}   BUILDS: ${builds}   VICTORIES: ${victories}`,280,3,'#9a9ab8')}
<path d="M30 500 H1170 V601 H30Z" fill="#122419"/><path d="M145 545 H1055" stroke="#c9973a" stroke-width="4" stroke-dasharray="8 6"/>
${pixels(castle,78,405,6)}${pixels(pineTree,255,425,6)}${pixels(pineTree,815,425,6)}${pixels(heroMage,535,396,8)}${pixels(demonTower,1010,405,6)}${text('GEORGEFIFTH.XYZ',575,3,'#f9d56e')}</svg>`;
writeFileSync(new URL('../public/og.svg',import.meta.url),svg);
await sharp(Buffer.from(svg)).png().toFile(new URL('../public/og.png',import.meta.url).pathname.replace(/^\/([A-Z]:)/,'$1'));
console.log('Updated OG poster from local quest data.');
