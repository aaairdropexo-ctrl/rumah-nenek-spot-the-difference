// Rumah Nenek — staged screenshots (?shot=...).
// The screenshots the judge sees must show the game honestly, mid-play,
// so each shot stages a real world state: found markers on, several still
// unfound, a counter that says how many remain, a clock with time on it.
// Deterministic: no random, no clock reads. Used only for screenshots.
//
//   ?shot=cover  — scene 2 (Ruang Tamu), 3 found, 5 to go, 1:14 on the clock
//   ?shot=scene4 — scene 4 (Beranda Senja), 3 found, 5 to go
//   ?shot=scene3 — scene 3 (Kebun), 2 found, 6 to go
//   ?shot=clear  — scene 1 (Dapur), all 8 found, clear banner

import { currentScene, startScene } from './world.js';

export function applyShot(world, params) {
  const shot = params.get('shot');
  if (!shot) return false;

  if (shot === 'title') {
    world.phase = 'title';
    return true;
  }

  if (shot === 'cover') {
    startScene(world, 1);
    const scene = currentScene(world);
    for (const d of scene.diffs.slice(0, 3)) {
      world.found.add(d.id);
      world.foundNames.push(d.name);
      world.totalFound += 1;
    }
    world.streak = 3;
    world.bestStreak = 3;
    world.score = 325;
    world.timeLeft = 74;
    return true;
  }

  if (shot === 'scene3') {
    startScene(world, 2);
    const scene = currentScene(world);
    for (const d of scene.diffs.slice(0, 2)) {
      world.found.add(d.id);
      world.foundNames.push(d.name);
      world.totalFound += 1;
    }
    world.streak = 2;
    world.bestStreak = 2;
    world.score = 225;
    world.timeLeft = 61;
    return true;
  }

  if (shot === 'scene4') {
    startScene(world, 3);
    const scene = currentScene(world);
    for (const d of scene.diffs.slice(0, 3)) {
      world.found.add(d.id);
      world.foundNames.push(d.name);
      world.totalFound += 1;
    }
    world.streak = 3;
    world.bestStreak = 3;
    world.score = 325;
    world.timeLeft = 68;
    return true;
  }

  if (shot === 'clear') {
    startScene(world, 0);
    const scene = currentScene(world);
    for (const d of scene.diffs) {
      world.found.add(d.id);
      world.foundNames.push(d.name);
      world.totalFound += 1;
    }
    world.score = 800 + Math.round(42) * 5;
    world.scenesDone = 1;
    world.timeLeft = 42;
    world.phase = 'clear';
    return true;
  }

  return false;
}

// The four shots, in the order they are taken, for the screenshot script.
export const SHOT_LIST = [
  { name: '1-cover', shot: 'cover', note: 'Scene 2, 3 found, 5 to go, 1:14 left' },
  { name: '2-scene4', shot: 'scene4', note: 'Scene 4, 3 found, 5 to go' },
  { name: '3-scene3', shot: 'scene3', note: 'Scene 3, 2 found, 6 to go' },
  { name: '4-clear', shot: 'clear', note: 'Scene 1, all 8 found, clear banner' },
];
