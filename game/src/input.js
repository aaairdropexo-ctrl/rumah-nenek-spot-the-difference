// Rumah Nenek — input: mouse and keyboard, nothing else.
// Clicks land on the header buttons first, then on a panel (either panel
// counts), then nowhere. Overlays eat the click and advance the phase.

import { PANELS, KEYS } from './config.js';
import { HEADER_BUTTONS, FOOTER_BUTTONS } from './render.js';
import { clickAt, useHint, startScene, nextScene, resetAll } from './world.js';

export function attachInput(canvas, world) {
  function toCanvas(e) {
    const r = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - r.left) * (canvas.width / r.width),
      y: (e.clientY - r.top) * (canvas.height / r.height),
    };
  }

  function inRect(p, b) {
    return p.x >= b.x && p.x <= b.x + b.w && p.y >= b.y && p.y <= b.y + b.h;
  }

  canvas.addEventListener('click', (e) => {
    const p = toCanvas(e);
    if (world.phase === 'title') {
      startScene(world, 0);
      return;
    }
    if (world.phase === 'clear') {
      nextScene(world);
      return;
    }
    if (world.phase === 'over' || world.phase === 'win') {
      resetAll(world);
      return;
    }
    if (inRect(p, HEADER_BUTTONS.hint)) {
      useHint(world);
      return;
    }
    if (inRect(p, HEADER_BUTTONS.pause)) {
      world.phase = world.phase === 'paused' ? 'playing' : 'paused';
      return;
    }
    if (world.phase === 'paused') {
      world.phase = 'playing';
      return;
    }
    // Footer scene buttons: jump to a scene, or restart the current one.
    for (const b of FOOTER_BUTTONS) {
      if (inRect(p, b)) {
        if (b.restart) startScene(world, world.sceneIndex);
        else startScene(world, b.scene);
        return;
      }
    }
    for (const side of [PANELS.left, PANELS.right]) {
      if (p.x >= side.x && p.x <= side.x + side.w && p.y >= side.y && p.y <= side.y + side.h) {
        clickAt(world, p.x - side.x, p.y - side.y);
        return;
      }
    }
  });

  window.addEventListener('keydown', (e) => {
    const k = e.key.toLowerCase();
    if (k === KEYS.hint) useHint(world);
    else if (k === KEYS.restart) startScene(world, world.sceneIndex);
    else if (k === KEYS.pause) {
      if (world.phase === 'playing') world.phase = 'paused';
      else if (world.phase === 'paused') world.phase = 'playing';
    } else if (KEYS.scenes.includes(k)) startScene(world, Number(k) - 1);
    else if (k === 'enter' && world.phase === 'title') startScene(world, 0);
  });
}

// Losing the window pauses the game, so the clock never runs while the
// player is looking elsewhere. Added after the first play-test, where a
// tab switch ate half the timer unnoticed.
export function attachAutoPause(world) {
  window.addEventListener('blur', () => {
    if (world.phase === 'playing') world.phase = 'paused';
  });
}
