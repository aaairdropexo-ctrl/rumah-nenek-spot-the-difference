// Rumah Nenek — entry program (Node 22, standard library only).
//
// The game is plain static files under game/ (index.html plus ES modules,
// no library, no network request). This program hands the game in: it
// copies game/ and screenshots/ from beside this file into /output and
// writes the dossier the judge reads, using the vendored make.fun library.
//
// Run it locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// Serve the game with a static server, then open http://localhost:8080.

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-game.ts';

const root = fileURLToPath(new URL('.', import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Fail fast with a readable error when the game folder is missing,
// instead of copying nothing and writing a dossier over an empty game.
if (!existsSync(join(root, 'game', 'index.html'))) {
  throw new Error('game/index.html is missing — build the game first');
}

mkdirSync(outDir, { recursive: true });
cpSync(join(root, 'game'), join(outDir, 'game'), { recursive: true });
mkdirSync(join(outDir, 'screenshots'), { recursive: true });
const shotsDir = join(root, 'screenshots');
if (existsSync(shotsDir)) {
  cpSync(shotsDir, join(outDir, 'screenshots'), { recursive: true });
}

// The gate's own caps. Only text_max_bytes shapes the bytes; the rest
// refuse an entry the scorer would refuse: more than 4 screenshots, one
// over 256 KiB, more than 993 files in game/ or 48 MiB of game files, or
// a game/ path over 1000 bytes (game/ counts beside /output's own cap).
const dossier = buildDossier(outDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  game_max_files: 993,
  game_max_bytes: 50331648,
  game_path_max_bytes: 1000,
});
writeFileSync(join(outDir, 'dossier.json'), dossier);
