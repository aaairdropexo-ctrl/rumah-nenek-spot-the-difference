// Rumah Nenek — tuning & layout.
// One place for every number the game uses, so a balance change never means
// hunting through draw code. Nothing here is read from the network.
export const GAME = {
  title: 'Rumah Nenek',
  sub: 'Cari bedanya di rumah nenek',
  width: 1280,
  height: 800,
  scenesTotal: 6,
  diffsPerScene: 8,
  timePerScene: 100, // seconds on the clock when a scene starts
  hintsPerScene: 3,
  maxStrikes: 3,
  wrongClickCost: 3, // seconds lost on a wrong click
  findScore: 100,
  streakBonus: 25, // +25 per step of the streak
};

// The two picture panels. Both panels show the same scene; the right one
// carries the changes. Labels sit above the panels, the footer below them.
export const PANELS = {
  left: { x: 30, y: 112, w: 580, h: 556 },
  right: { x: 670, y: 112, w: 580, h: 556 },
  labelLeft: 'Gambar A — asli',
  labelRight: 'Gambar B — ada yang beda!',
};

// Small shared helpers. The HUD, the world and the shots all use these,
// so the clock, the score and the scene keys never disagree.
export function clamp(v, lo, hi) {
  return v < lo ? lo : v > hi ? hi : v;
}

export function fmtTime(sec) {
  const s = Math.max(0, Math.ceil(sec));
  return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
}

// Keyboard: H hint, R restart the scene, P pause, 1–6 jump to a scene.
export const KEYS = { hint: 'h', restart: 'r', pause: 'p', scenes: ['1', '2', '3', '4', '5', '6'] };

// One line of help, shown in the footer of every screen.
export const HELP_TEXT =
  'Klik bedanya di gambar mana pun. H = petunjuk, R = ulang, P = jeda, 1–6 = pindah scene.';

// Flat, warm palette. The whole game is drawn from these colours — no
// image files, no network, so the dossier stays small and deterministic.
export const COLORS = {
  bg: '#1d2436',
  header: '#232c44',
  panelEdge: '#3a4666',
  cream: '#f7ead2',
  ink: '#2b2620',
  gold: '#f5b942',
  goldSoft: '#ffd97a',
  green: '#3fae6a',
  red: '#e05d4d',
  sky: '#bfe3f2',
};

