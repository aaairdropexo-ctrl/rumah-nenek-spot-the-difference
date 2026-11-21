// Rumah Nenek — the world: state and rules, no drawing.
// The world is plain data. Rendering reads it, input mutates it through
// these functions, and the shots stage it. Nothing here touches the DOM.

import { GAME } from './config.js';
import { SCENES } from './scenes.js';

export function newWorld() {
  return {
    phase: 'title', // title | playing | paused | clear | over | win
    sceneIndex: 0,
    found: new Set(), // diff ids found in the current scene
    foundNames: [], // names, in the order they were found
    strikes: 0,
    hintsLeft: GAME.hintsPerScene,
    score: 0,
    streak: 0,
    bestStreak: 0,
    timeLeft: GAME.timePerScene,
    animT: 0, // animation clock, advanced by tick — never Date.now
    hintFlash: null, // {x, y, t} — a pulsing ring on a hinted difference
    lastFind: null, // {x, y, t} — the pop animation of the latest find
    wrongFlash: null, // {x, y, t} — the red X of the latest wrong click
    scenesDone: 0,
    totalFound: 0,
  };
}

export function currentScene(world) {
  return SCENES[world.sceneIndex];
}

export function startScene(world, index) {
  world.sceneIndex = index;
  world.found = new Set();
  world.foundNames = [];
  world.strikes = 0;
  world.hintsLeft = GAME.hintsPerScene;
  world.timeLeft = GAME.timePerScene;
  world.streak = 0;
  world.hintFlash = null;
  world.lastFind = null;
  world.wrongFlash = null;
  world.phase = 'playing';
}

// A click inside a panel, in panel coordinates (0..580, 0..556).
// Returns 'found' | 'wrong' | 'ignored'.
export function clickAt(world, px, py) {
  if (world.phase !== 'playing') return 'ignored';
  const scene = currentScene(world);
  for (const d of scene.diffs) {
    if (world.found.has(d.id)) continue;
    const hitHere =
      Math.hypot(px - d.x, py - d.y) <= d.r ||
      (d.ax !== undefined && Math.hypot(px - d.ax, py - d.ay) <= d.r);
    if (hitHere) {
      world.found.add(d.id);
      world.foundNames.push(d.name);
      world.totalFound += 1;
      world.streak += 1;
      world.bestStreak = Math.max(world.bestStreak, world.streak);
      world.score += GAME.findScore + (world.streak - 1) * GAME.streakBonus;
      world.lastFind = { x: d.x, y: d.y, t: 0 };
      world.hintFlash = null;
      if (world.found.size === scene.diffs.length) {
        world.score += Math.round(world.timeLeft) * 5; // time bonus
        world.scenesDone += 1;
        world.phase = world.scenesDone === SCENES.length ? 'win' : 'clear';
      }
      return 'found';
    }
  }
  // Wrong click: a strike, three seconds off the clock, streak reset.
  world.strikes += 1;
  world.streak = 0;
  world.timeLeft = Math.max(0, world.timeLeft - GAME.wrongClickCost);
  world.wrongFlash = { x: px, y: py, t: 0 };
  if (world.strikes >= GAME.maxStrikes || world.timeLeft <= 0) {
    world.phase = 'over';
  }
  return 'wrong';
}

// A hint rings the next unfound difference for two seconds.
export function useHint(world) {
  if (world.phase !== 'playing' || world.hintsLeft <= 0) return false;
  const scene = currentScene(world);
  const next = scene.diffs.find((d) => !world.found.has(d.id));
  if (!next) return false;
  world.hintsLeft -= 1;
  world.hintFlash = { x: next.x, y: next.y, t: 0 };
  return true;
}

// --- tick & flow ------------------------------------------------------------

// Advance the clock and the animation timers. Called once per frame.
export function tick(world, dt) {
  world.animT += dt;
  if (world.lastFind) world.lastFind.t += dt;
  if (world.wrongFlash) world.wrongFlash.t += dt;
  if (world.hintFlash) world.hintFlash.t += dt;
  if (world.phase === 'playing') {
    world.timeLeft -= dt;
    if (world.timeLeft <= 0) {
      world.timeLeft = 0;
      world.phase = 'over';
    }
  }
}

// Move on after a cleared scene: next scene, or the win screen.
export function nextScene(world) {
  if (world.phase === 'clear' && world.sceneIndex + 1 < SCENES.length) {
    startScene(world, world.sceneIndex + 1);
  } else if (world.phase === 'clear') {
    world.phase = 'win';
  }
}

// Start over from scene one, keeping nothing but the title.
export function resetAll(world) {
  const fresh = newWorld();
  Object.assign(world, fresh);
}

// One line for the footer: what has been found so far, by name.
export function foundSummary(world) {
  if (world.foundNames.length === 0) return 'Belum ada yang ketemu — mulai dari yang paling kentara.';
  return 'Sudah ketemu: ' + world.foundNames.map((n) => '✓ ' + n).join('  ·  ');
}
