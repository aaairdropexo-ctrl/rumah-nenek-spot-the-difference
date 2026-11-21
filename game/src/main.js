// Rumah Nenek — boot. Fits the 1280x800 stage into the window, wires the
// input, and runs the frame loop. A staged ?shot= renders one settled
// frame and stops, so screenshots are deterministic.

import { GAME } from './config.js';
import { newWorld, tick } from './world.js';
import { draw } from './render.js';
import { attachInput } from './input.js';
import { applyShot } from './shots.js';

const canvas = document.getElementById('stage');
const ctx = canvas.getContext('2d');
const world = newWorld();

function fit() {
  const scale = Math.min(window.innerWidth / GAME.width, window.innerHeight / GAME.height);
  canvas.style.width = GAME.width * scale + 'px';
  canvas.style.height = GAME.height * scale + 'px';
}
window.addEventListener('resize', fit);
fit();

attachInput(canvas, world);

const params = new URLSearchParams(window.location.search);
if (applyShot(world, params)) {
  draw(ctx, world);
} else {
  let last = performance.now();
  function frame(now) {
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    tick(world, dt);
    draw(ctx, world);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

// Debug hook for play-testing: the page exposes the live world so a test
// script can read the score, the found set and the phase without clicking.
window.__rumahNenek = { world, version: 1 };
