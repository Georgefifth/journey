// ============================================================
// Pixel Art Sprites — hand-drawn ASCII pixel maps
// Each sprite is an array of strings; every char maps to a
// color in PALETTE. '.' or ' ' = transparent.
// To add a new sprite: draw rows of equal length. That's it.
// ============================================================

export type PixelMap = string[];

export const PALETTE: Record<string, string> = {
  k: "#10102a", // ink / outline
  w: "#ffffff", // pure white
  W: "#c9c9de", // soft white / steel
  f: "#f2c9a0", // skin
  F: "#d9a578", // skin shade
  h: "#4a74d9", // hero robe main
  H: "#7aa7f0", // hero robe light
  d: "#2c4f9e", // hero robe dark
  s: "#8a5a2b", // wood
  S: "#b07a3e", // wood light
  o: "#f9d56e", // gold
  O: "#c9973a", // gold dark
  y: "#ffe9a8", // gold light
  c: "#4dd9e8", // cyan (slime / water)
  C: "#a8f0f8", // cyan light
  x: "#1a8a9e", // cyan dark
  t: "#9aa3b5", // stone light
  T: "#6b7385", // stone mid
  u: "#3a3f55", // stone dark / door / window
  g: "#2e8b57", // green
  G: "#1f6e42", // green dark
  m: "#8a8fa8", // mountain gray
  M: "#b8bdd4", // mountain light
  p: "#b07ce8", // purple glow
  P: "#6a3fa0", // purple dark
  q: "#241a38", // tower dark
  Q: "#3a2b52", // tower mid
  b: "#b98a5a", // box tan
  B: "#8a5a2b", // box shade
  r: "#ff6b5e", // red accent
  R: "#c93a30", // red dark
  A: "#ff8c42", // orange (flame)
  Y: "#ffd166", // flame yellow
};

// --- The Hero: chibi mage with wizard hat + staff -----------
export const heroMage: PixelMap = [
  ".......kk.......",
  "......khhk......",
  ".....khhhhk.....",
  "....khhhhhhk....",
  "...khhhhhhhhk...",
  ".kkkkkkkkkkkkkk.",
  "....kffffffk..o.",
  "....kfeffefk..s.",
  "....kffFFffk..s.",
  "...khhhhhhhhk.s.",
  "..khhhhhhhhhhfs.",
  "..khHhhhhhhHhfs.",
  "..khhhhoohhhhk..",
  "..khhhhhhhhhhk..",
  ".khhk......khhk.",
  "..kffk....kffks.",
];

// --- Boss: The False Saturation (corrupted slime) -----------
export const slimeBoss: PixelMap = [
  "......kkkk......",
  "....kkcccckk....",
  "...kcccccccck...",
  "..kcCCccccxcck..",
  ".kcccccccccccck.",
  ".kcCccccccccccck",
  "kcceecccccceecck",
  "kcceecccccceecck",
  "kccccckkkcccccck",
  "kcccccccccccccck",
  ".kcccccccccccck.",
  "..kkcccccccckk..",
  "....kkkkkkkk....",
];

// blink frame: eyes (transparent holes) closed to dark-cyan lines
export const slimeBossBlink: PixelMap = [
  "......kkkk......",
  "....kkcccckk....",
  "...kcccccccck...",
  "..kcCCccccxcck..",
  ".kcccccccccccck.",
  ".kcCccccccccccck",
  "kccxxccccccxxcck",
  "kccxxccccccxxcck",
  "kccccckkkcccccck",
  "kcccccccccccccck",
  ".kcccccccccccck.",
  "..kkcccccccckk..",
  "....kkkkkkkk....",
];

// --- Castle node (quest site) -------------------------------
export const castle: PixelMap = [
  "......kSo.......",
  "......kSoo......",
  "......kSooo.....",
  "......kSo.......",
  "......kS........",
  "..kk.kk.kk.kk...",
  "..kkkkkkkkkkkk..",
  "..kttttttttttk..",
  "..kttTTttTTttk..",
  "..kttuuttuuttk..",
  "..kttTTttTTttk..",
  "..kttttttttttk..",
  "..kttTuuuuTttk..",
  "..kttTuuuuTttk..",
  "..kttTuuuuTttk..",
  ".kkuuuuuuuuuukk.",
];

// --- Demon King tower ----------------------------------------
export const demonTower: PixelMap = [
  "....o.o.o.......",
  "....ooooo.......",
  "....kqqqk.......",
  "....kqQqk.......",
  "....kqqqk.......",
  "...kqqQQqk......",
  "...kqqpqqk......",
  "...kqqqqqk......",
  "..kqqqQqqqk.....",
  "..kqqqpqqqk.....",
  "..kqqqqqqqk.....",
  ".kqqqQqqqqqk....",
  ".kqqqqpqqqqk....",
  "kqqqQQqqqqqqk...",
  "kqppqqqqqqppqk..",
  "kkkkkkkkkkkkkk..",
];

// --- Scenery --------------------------------------------------
export const pineTree: PixelMap = [
  "....kk....",
  "...kggk...",
  "...kggk...",
  "..kggggk..",
  ".kggggggk.",
  "...kggk...",
  "..kggggk..",
  ".kggggggk.",
  "kggggggggk",
  "....kk....",
  "...kssk...",
  "...kssk...",
];

export const roundTree: PixelMap = [
  "...kkk....",
  "..kgggk...",
  ".kggGggk..",
  ".kgggggk..",
  "kggGggggk.",
  "kgggggggk.",
  ".kgggggk..",
  "..kggk....",
  "...ks.....",
  "...ks.....",
];

export const rock: PixelMap = [
  "..kkkk..",
  ".kmmmmk.",
  "kmmMMmmk",
  "kmmmmmmk",
  ".kmmmmk.",
  "..kkkk..",
];

export const bush: PixelMap = [
  "..kkkk..",
  ".kggggk.",
  "kggGgggk",
  "kggggggk",
  ".kkkkkk.",
];

export const pond: PixelMap = [
  "...kkkkkk...",
  "..kxxccxxk..",
  ".kxcxCCcxxk.",
  ".kxxccxxcxk.",
  "..kxxxxxxk..",
  "...kkkkkk...",
];

export const moon: PixelMap = [
  "....yyyy....",
  "..yyyyyyyy..",
  ".yyyyyyyyyy.",
  ".yyyyooyyyy.",
  "yyyyyoyyyyyy",
  "yyyyooooyyyy",
  "yyyyyoyyyyyy",
  ".yyyyoooooy.",
  ".yyyyyyyyyy.",
  "..yyyyyyyy..",
  "....yyyy....",
];

export const platform: PixelMap = [
  "...gg......gg...",
  ".ggggg..gggggg..",
  "gggggggggggggggg",
  "GGGGGGGGGGGGGGGG",
];

export const star4: PixelMap = [
  "..y..",
  "..y..",
  "yyyyy",
  "..y..",
  "..y..",
];

export const slash: PixelMap = [
  "......w.",
  ".....ww.",
  "....ww..",
  "...ww...",
  "..ww....",
  ".ww.....",
  "ww......",
  "........",
];

export const signpost: PixelMap = [
  ".kkkkkkkkkk.",
  "kSSSSSSSSSSk",
  "kSssssssssSk",
  "kSssssssssSk",
  "kSSSSSSSSSSk",
  ".kkkkkkkkkk.",
  ".....ks.....",
  ".....ks.....",
  ".....ks.....",
  "....kssk....",
];

// --- Small icons (8x8) --------------------------------------
export const iconSword: PixelMap = [
  "...ww...",
  "...ww...",
  "...ww...",
  "...ww...",
  ".kwwwwk.",
  "..kwwk..",
  "...kk...",
  "...kk...",
];

export const iconFlame: PixelMap = [
  "....A...",
  "...AA...",
  "...AAA..",
  "..AAAAA.",
  ".AAYAAA.",
  ".AYYAAA.",
  ".AYYAAA.",
  "..AAAA..",
];

export const iconTrophy: PixelMap = [
  ".oooooo.",
  "oo.oo.oo",
  "oooooooo",
  ".oooooo.",
  "..oooo..",
  "...oo...",
  "...oo...",
  ".oooooo.",
];

export const iconBox: PixelMap = [
  "kkkkkkkk",
  "kbbttbbk",
  "kbbttbbk",
  "kkkkkkkk",
  "kbbttbbk",
  "kbbttbbk",
  "kbbttbbk",
  "kkkkkkkk",
];

export const iconChest: PixelMap = [
  ".kkkkkkkkkk.",
  "kBBBBBBBBBBk",
  "kBBBByyBBBBk",
  "kooooooooook",
  "kBBBBByyBBBk",
  "kBBBBByyBBBk",
  "kBBBBBBBBBBk",
  ".kkkkkkkkkk.",
];

export const iconSparkle: PixelMap = [
  "..p...",
  ".ppp..",
  "pppppp",
  ".ppp..",
  "..p...",
];
