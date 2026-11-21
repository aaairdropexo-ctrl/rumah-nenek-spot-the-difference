# Rumah Nenek — Cari Bedanya

[![make.fun bounty](https://make.fun/badge/best-spot-the-difference-game-20261121-0451.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451)
[![rank](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/aaairdropexo-ctrl/rumah-nenek-spot-the-difference/rank.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451)
[![reward](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/aaairdropexo-ctrl/rumah-nenek-spot-the-difference/reward.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451)

A spot-the-difference game set in grandma's house — four hand-drawn scenes,
eight differences in each, a clock that keeps you honest.

**Scenes:** Dapur (Kitchen) · Ruang Tamu (Living Room) · Kebun (Garden) ·
Beranda Senja (Porch at Dusk)

## How to play

Two pictures sit side by side. The right one hides eight changes: things
removed, recoloured, moved, resized, flipped, or added. Click a difference
on either picture to ring it — in both panels at once.

- **100 seconds** per scene, **3 hints** per scene (H), **3 strikes** per
  scene. A wrong click costs 3 seconds and breaks your streak.
- A find scores **100**, plus **25 per step of your streak**. Clearing a
  scene banks a time bonus.
- Keys: **H** hint · **R** restart the scene · **P** pause · **1–4** jump
  to a scene · **Enter** start.

Everything is drawn in code — flat vector shapes, no image files, no
network. The game runs from its own files in a desktop browser.

## Run it

```sh
cd game && python3 -m http.server 8080
# open http://localhost:8080 in a desktop browser
```

## Files

- `game/index.html` — the page; `game/src/main.js` boots the game
- `game/src/config.js` — tuning, layout, palette, helpers
- `game/src/scenes.js` — the four scenes and their eight differences each
- `game/src/world.js` — state and rules (score, streak, hints, timer)
- `game/src/render.js` — everything drawn: header, panels, markers, footer
- `game/src/input.js` — mouse + keyboard
- `game/src/shots.js` — staged states for the screenshots (`?shot=...`)
- `main.ts` — copies game/ + screenshots/ to /output, writes dossier.json
- `vendor/makefun-game.ts` — the kit's dossier library, unchanged

## License

MIT — see LICENSE.
