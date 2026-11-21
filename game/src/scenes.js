// Rumah Nenek — the scenes.
// Every scene is drawn twice: variant 'A' is the original, 'B' carries the
// changes. A difference is data, not a second drawing: each entry names the
// change, its zone (panel coordinates, 580 x 556), and its kind. The draw
// function branches on the variant at exactly those eight spots, so the two
// panels can never drift apart anywhere else.
//
// Zone hit-testing: a click inside a zone's radius counts, on either panel.
// A "moved" difference lists both spots (ax, ay = where it was, x, y = where
// it went) and either one counts.

function circle(ctx, x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

function rr(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  ctx.fill();
}

function line(ctx, x1, y1, x2, y2, w, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = w;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

// --- Scene 1: Dapur (Kitchen) -------------------------------------------
function drawKitchen(ctx, v, W, H) {
  // Wall + floor.
  ctx.fillStyle = '#f7ead2';
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#c89b6a';
  ctx.fillRect(0, 470, W, H - 470);
  ctx.fillStyle = '#b3854f';
  for (let x = 0; x < W; x += 90) ctx.fillRect(x, 470, 3, H - 470);

  // Window with sun and two clouds (same in both variants).
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(380, 28, 160, 140);
  ctx.fillStyle = '#bfe3f2';
  ctx.fillRect(390, 38, 140, 120);
  ctx.fillStyle = '#ffd94d';
  circle(ctx, 500, 75, 26);
  ctx.fillStyle = '#ffffff';
  circle(ctx, 420, 70, 14);
  circle(ctx, 436, 70, 18);
  circle(ctx, 452, 70, 14);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(455, 38, 6, 120);
  ctx.fillRect(390, 92, 140, 6);

  // Wall clock, top centre-left (clear of the window). A: 10:10.
  // B: hands moved to 2:40 (moved).
  ctx.fillStyle = '#fff8e6';
  circle(ctx, 330, 75, 34);
  ctx.strokeStyle = '#2b2620';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(330, 75, 34, 0, Math.PI * 2);
  ctx.stroke();
  if (v === 'A') {
    line(ctx, 330, 75, 313, 58, 4, '#2b2620');
    line(ctx, 330, 75, 347, 58, 4, '#2b2620');
  } else {
    line(ctx, 330, 75, 347, 92, 4, '#2b2620');
    line(ctx, 330, 75, 313, 92, 4, '#2b2620');
  }
  ctx.fillStyle = '#2b2620';
  circle(ctx, 330, 75, 4);

  // Shelf with three jars. B: the middle jar is shorter (resized).
  ctx.fillStyle = '#8a5a2e';
  ctx.fillRect(40, 196, 260, 12);
  const jars = [
    { x: 70, h: 52, c: '#e07a5f' },
    { x: 150, h: v === 'A' ? 52 : 30, c: '#81b29a' },
    { x: 230, h: 52, c: '#f2cc8f' },
  ];
  for (const j of jars) {
    ctx.fillStyle = j.c;
    rr(ctx, j.x, 208 - j.h, 44, j.h, 8);
    ctx.fillStyle = '#6d4c2f';
    ctx.fillRect(j.x + 4, 208 - j.h - 6, 36, 8);
  }

  // Stove with two pots and a kettle. Steam curls above the kettle.
  ctx.fillStyle = '#4a4a55';
  rr(ctx, 40, 320, 220, 150, 10);
  ctx.fillStyle = '#2f2f38';
  ctx.fillRect(55, 335, 190, 10);
  ctx.fillStyle = '#c0c0cc';
  circle(ctx, 100, 320, 26);
  circle(ctx, 200, 320, 26);
  ctx.fillStyle = '#3d405b';
  rr(ctx, 70, 288, 60, 34, 8);
  ctx.fillStyle = '#e07a5f';
  rr(ctx, 170, 288, 60, 34, 8);
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(230, 280);
  ctx.quadraticCurveTo(222, 262, 230, 246);
  ctx.quadraticCurveTo(238, 262, 230, 246);
  ctx.stroke();

  // Hanging pan. B: the handle flips to the other side (flipped).
  ctx.fillStyle = '#3d405b';
  circle(ctx, 330, 300, 26);
  ctx.fillStyle = '#2f2f38';
  if (v === 'A') ctx.fillRect(322, 258, 16, 26);
  else ctx.fillRect(322, 316, 16, 26);

  // Table with teapot, fruit bowl and (B only) a spoon.
  ctx.fillStyle = '#8a5a2e';
  ctx.fillRect(320, 400, 220, 14);
  ctx.fillRect(340, 414, 14, 56);
  ctx.fillRect(506, 414, 14, 56);
  // Teapot. A: teal. B: orange (recoloured).
  ctx.fillStyle = v === 'A' ? '#2a9d8f' : '#e76f51';
  rr(ctx, 350, 360, 52, 40, 12);
  ctx.beginPath();
  ctx.moveTo(402, 372);
  ctx.lineTo(424, 362);
  ctx.lineTo(424, 382);
  ctx.lineTo(402, 388);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#6d4c2f';
  ctx.fillRect(368, 352, 16, 10);
  // Fruit bowl. A: 3 apples + 2 oranges. B: one apple gone (removed).
  ctx.fillStyle = '#81b29a';
  ctx.beginPath();
  ctx.moveTo(430, 400);
  ctx.lineTo(510, 400);
  ctx.lineTo(500, 424);
  ctx.lineTo(440, 424);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#e05d4d';
  circle(ctx, 448, 392, 11);
  if (v === 'A') circle(ctx, 470, 388, 11);
  circle(ctx, 492, 392, 11);
  ctx.fillStyle = '#f4a259';
  circle(ctx, 458, 396, 9);
  circle(ctx, 482, 396, 9);
  // Spoon, lying on the table, only in B (added).
  if (v === 'B') {
    ctx.fillStyle = '#c0c0cc';
    circle(ctx, 525, 396, 7);
    ctx.fillRect(525, 394, 16, 4);
  }

  // Chair and cat. A: cat on the chair. B: cat moved to the floor (moved).
  ctx.fillStyle = '#8a5a2e';
  ctx.fillRect(70, 470, 90, 10);
  ctx.fillRect(76, 480, 8, 60);
  ctx.fillRect(146, 480, 8, 60);
  ctx.fillRect(70, 440, 10, 40);
  const cat = v === 'A' ? { x: 115, y: 452 } : { x: 490, y: 516 };
  ctx.fillStyle = '#e07a5f';
  circle(ctx, cat.x, cat.y, 16);
  circle(ctx, cat.x + 16, cat.y - 10, 10);
  ctx.beginPath();
  ctx.moveTo(cat.x + 10, cat.y - 18);
  ctx.lineTo(cat.x + 14, cat.y - 28);
  ctx.lineTo(cat.x + 18, cat.y - 17);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(cat.x - 14, cat.y + 4);
  ctx.quadraticCurveTo(cat.x - 34, cat.y + 10, cat.x - 28, cat.y - 8);
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#e07a5f';
  ctx.stroke();

  // Rug. A: red stripe. B: blue stripe (recoloured).
  ctx.fillStyle = '#f2cc8f';
  rr(ctx, 180, 500, 240, 44, 10);
  ctx.fillStyle = v === 'A' ? '#e05d4d' : '#3d6fb4';
  ctx.fillRect(180, 514, 240, 14);
}

const KITCHEN_DIFFS = [
  { id: 'jam', name: 'Jarum jam pindah', type: 'moved', x: 330, y: 75, r: 36 },
  { id: 'apel', name: 'Satu apel hilang', type: 'removed', x: 470, y: 390, r: 26 },
  { id: 'teko', name: 'Warna teko berubah', type: 'recoloured', x: 380, y: 378, r: 30 },
  { id: 'kucing', name: 'Kucing pindah tempat', type: 'moved', x: 490, y: 516, r: 30, ax: 115, ay: 452 },
  { id: 'toples', name: 'Toples tengah memendek', type: 'resized', x: 172, y: 178, r: 26 },
  { id: 'wajan', name: 'Gagang wajan terbalik', type: 'flipped', x: 330, y: 292, r: 32 },
  { id: 'sendok', name: 'Sendok muncul', type: 'added', x: 530, y: 396, r: 20 },
  { id: 'karpet', name: 'Warna garis karpet berubah', type: 'recoloured', x: 300, y: 521, r: 40 },
];

// --- Scene 2: Ruang Tamu (Living Room) ------------------------------------
function drawLiving(ctx, v, W, H) {
  // Wall + floor.
  ctx.fillStyle = '#e6ead9';
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#c89b6a';
  ctx.fillRect(0, 470, W, H - 470);
  ctx.fillStyle = '#b3854f';
  for (let x = 0; x < W; x += 90) ctx.fillRect(x, 470, 3, H - 470);

  // Window with red curtains.
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(380, 28, 160, 150);
  ctx.fillStyle = '#bfe3f2';
  ctx.fillRect(390, 38, 140, 130);
  ctx.fillStyle = '#ffd94d';
  circle(ctx, 505, 70, 22);
  ctx.fillStyle = '#ffffff';
  circle(ctx, 420, 80, 12);
  circle(ctx, 434, 80, 15);
  ctx.fillStyle = '#c0392b';
  ctx.beginPath();
  ctx.moveTo(380, 28);
  ctx.lineTo(410, 28);
  ctx.lineTo(400, 178);
  ctx.lineTo(380, 178);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(540, 28);
  ctx.lineTo(510, 28);
  ctx.lineTo(520, 178);
  ctx.lineTo(540, 178);
  ctx.closePath();
  ctx.fill();

  // Bookshelf with coloured spines. B: one spine red -> green (recoloured).
  ctx.fillStyle = '#8a5a2e';
  ctx.fillRect(40, 60, 140, 220);
  ctx.fillStyle = '#f7ead2';
  ctx.fillRect(48, 68, 124, 204);
  const spines = ['#e05d4d', '#3d6fb4', '#f2cc8f', '#81b29a', '#e07a5f', '#2a9d8f'];
  for (let i = 0; i < 6; i++) {
    ctx.fillStyle = i === 0 && v === 'B' ? '#3fae6a' : spines[i];
    ctx.fillRect(54 + i * 20, 80, 16, 80);
  }
  ctx.fillStyle = '#8a5a2e';
  ctx.fillRect(48, 164, 124, 8);
  for (let i = 0; i < 5; i++) {
    ctx.fillStyle = spines[(i + 2) % 6];
    ctx.fillRect(54 + i * 22, 176, 16, 70);
  }

  // Two photo frames. B: the left picture is sea, not mountains (recoloured).
  ctx.fillStyle = '#6d4c2f';
  ctx.fillRect(230, 80, 100, 80);
  ctx.fillStyle = '#bfe3f2';
  ctx.fillRect(236, 86, 88, 68);
  if (v === 'A') {
    ctx.fillStyle = '#81b29a';
    ctx.beginPath();
    ctx.moveTo(236, 154);
    ctx.lineTo(270, 100);
    ctx.lineTo(306, 154);
    ctx.closePath();
    ctx.fill();
  } else {
    ctx.fillStyle = '#3d6fb4';
    ctx.fillRect(236, 120, 88, 34);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(240, 130);
    ctx.quadraticCurveTo(260, 122, 280, 130);
    ctx.quadraticCurveTo(300, 138, 320, 130);
    ctx.stroke();
  }

  // Wall clock, between the frames and the window. A: 3:00.
  // B: hands moved to 3:30 (moved).
  ctx.fillStyle = '#fff8e6';
  circle(ctx, 355, 60, 24);
  ctx.strokeStyle = '#2b2620';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(355, 60, 24, 0, Math.PI * 2);
  ctx.stroke();
  line(ctx, 355, 60, 373, 60, 3, '#2b2620');
  if (v === 'A') line(ctx, 355, 60, 355, 40, 3, '#2b2620');
  else line(ctx, 355, 60, 355, 80, 3, '#2b2620');

  // Sofa with three cushions. B: the blue cushion moved to the right end.
  ctx.fillStyle = '#b5654a';
  rr(ctx, 40, 330, 300, 110, 16);
  ctx.fillStyle = '#9c4f38';
  rr(ctx, 40, 330, 300, 40, 16);
  const cushions = v === 'A'
    ? [{ x: 60, c: '#3d6fb4' }, { x: 150, c: '#f2cc8f' }, { x: 240, c: '#81b29a' }]
    : [{ x: 60, c: '#f2cc8f' }, { x: 150, c: '#81b29a' }, { x: 240, c: '#3d6fb4' }];
  for (const c of cushions) {
    ctx.fillStyle = c.c;
    rr(ctx, c.x, 350, 80, 60, 10);
  }

  // TV on its stand. The screen is the same in both panels — a changing
  // screen that is not a registered difference would punish a player for
  // clicking a real change, so it stays static decor.
  ctx.fillStyle = '#6d4c2f';
  ctx.fillRect(360, 420, 180, 12);
  ctx.fillRect(380, 432, 12, 38);
  ctx.fillRect(508, 432, 12, 38);
  ctx.fillStyle = '#2f2f38';
  rr(ctx, 370, 300, 160, 116, 8);
  ctx.fillStyle = '#3fae6a';
  ctx.fillRect(380, 310, 140, 96);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(440, 350, 20, 6);

  // Floor lamp, right of the TV. A: lit, light cone on the wall.
  // B: dark, cone gone (removed).
  ctx.fillStyle = '#2f2f38';
  ctx.fillRect(544, 240, 8, 230);
  ctx.fillStyle = '#2f2f38';
  circle(ctx, 548, 472, 22);
  if (v === 'A') {
    ctx.fillStyle = 'rgba(255, 217, 77, 0.35)';
    ctx.beginPath();
    ctx.moveTo(548, 240);
    ctx.lineTo(490, 420);
    ctx.lineTo(580, 420);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#ffd94d';
  } else {
    ctx.fillStyle = '#8a8578';
  }
  ctx.beginPath();
  ctx.moveTo(528, 240);
  ctx.lineTo(568, 240);
  ctx.lineTo(560, 200);
  ctx.lineTo(536, 200);
  ctx.closePath();
  ctx.fill();

  // Coffee table. B: a third cup appears (added).
  ctx.fillStyle = '#8a5a2e';
  ctx.fillRect(200, 486, 220, 12);
  ctx.fillRect(214, 498, 12, 40);
  ctx.fillRect(394, 498, 12, 40);
  ctx.fillStyle = '#ffffff';
  circle(ctx, 250, 478, 12);
  circle(ctx, 330, 478, 12);
  if (v === 'B') circle(ctx, 390, 478, 12);

  // Plant. A: 5 leaves. B: 4 leaves (removed).
  ctx.fillStyle = '#b5654a';
  rr(ctx, 60, 500, 60, 40, 8);
  ctx.fillStyle = '#3fae6a';
  const leaves = v === 'A' ? 5 : 4;
  for (let i = 0; i < leaves; i++) {
    ctx.beginPath();
    ctx.ellipse(90, 470 - i * 6, 10, 22, (i - 2) * 0.35, 0, Math.PI * 2);
    ctx.fill();
  }

  // Rug. A: tassels stick out on the left. B: on the right (flipped).
  ctx.fillStyle = '#f2cc8f';
  rr(ctx, 150, 520, 300, 30, 8);
  ctx.fillStyle = '#e05d4d';
  ctx.fillRect(150, 528, 300, 8);
  ctx.fillStyle = '#f7ead2';
  const tx = v === 'A' ? 138 : 450;
  for (let i = 0; i < 5; i++) ctx.fillRect(tx, 522 + i * 5, 12, 3);
}

const LIVING_DIFFS = [
  { id: 'lampu', name: 'Lampu padam', type: 'removed', x: 548, y: 330, r: 40 },
  { id: 'buku', name: 'Warna punggung buku berubah', type: 'recoloured', x: 62, y: 120, r: 18 },
  { id: 'foto', name: 'Foto jadi laut', type: 'recoloured', x: 280, y: 120, r: 30 },
  { id: 'daun', name: 'Satu daun hilang', type: 'removed', x: 90, y: 452, r: 26 },
  { id: 'bantal', name: 'Bantal biru pindah ujung', type: 'moved', x: 280, y: 380, r: 32, ax: 100, ay: 380 },
  { id: 'jam2', name: 'Jarum jam pindah', type: 'moved', x: 355, y: 60, r: 26 },
  { id: 'cangkir', name: 'Cangkir ketiga muncul', type: 'added', x: 390, y: 478, r: 18 },
  { id: 'rumbai', name: 'Rumbai karpet pindah sisi', type: 'flipped', x: 445, y: 535, r: 26, ax: 145, ay: 535 },
];

// --- Scene 3: Kebun (Garden) ------------------------------------------------
function drawGarden(ctx, v, W, H) {
  // Sky + sun. A: 8 rays. B: 6 rays (resized).
  ctx.fillStyle = '#bfe3f2';
  ctx.fillRect(0, 0, W, 380);
  ctx.fillStyle = '#ffd94d';
  circle(ctx, 480, 70, 30);
  ctx.strokeStyle = '#ffd94d';
  ctx.lineWidth = 5;
  const rays = v === 'A' ? 8 : 6;
  for (let i = 0; i < rays; i++) {
    const a = (i / 8) * Math.PI * 2;
    line(ctx, 480 + Math.cos(a) * 38, 70 + Math.sin(a) * 38,
      480 + Math.cos(a) * 52, 70 + Math.sin(a) * 52, 5, '#ffd94d');
  }
  ctx.fillStyle = '#ffffff';
  circle(ctx, 120, 70, 16);
  circle(ctx, 138, 70, 20);
  circle(ctx, 156, 70, 16);

  // Grass + fence.
  ctx.fillStyle = '#8fbf6f';
  ctx.fillRect(0, 380, W, H - 380);
  ctx.fillStyle = '#a8d08a';
  ctx.fillRect(0, 380, W, 14);
  ctx.fillStyle = '#e8dcc0';
  ctx.fillRect(0, 330, W, 12);
  ctx.fillRect(0, 356, W, 12);
  for (let x = 20; x < W; x += 60) ctx.fillRect(x, 320, 10, 60);

  // Tree with apples. A: 5 apples. B: 4 (removed).
  ctx.fillStyle = '#6d4c2f';
  ctx.fillRect(105, 220, 26, 120);
  ctx.fillStyle = '#5da24a';
  circle(ctx, 80, 200, 46);
  circle(ctx, 150, 190, 50);
  circle(ctx, 118, 150, 44);
  ctx.fillStyle = '#e05d4d';
  const apples = v === 'A'
    ? [[80, 190], [150, 180], [118, 150], [100, 220], [140, 215]]
    : [[80, 190], [150, 180], [118, 150], [140, 215]];
  for (const [ax, ay] of apples) circle(ctx, ax, ay, 9);

  // Birdhouse on a pole. A: round door. B: square door (reshaped).
  ctx.fillStyle = '#8a5a2e';
  ctx.fillRect(506, 220, 10, 120);
  ctx.fillStyle = '#b5654a';
  rr(ctx, 480, 170, 62, 52, 6);
  ctx.fillStyle = '#6d4c2f';
  ctx.beginPath();
  ctx.moveTo(476, 172);
  ctx.lineTo(511, 140);
  ctx.lineTo(546, 172);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#2b2620';
  if (v === 'A') circle(ctx, 511, 200, 9);
  else ctx.fillRect(502, 191, 18, 18);

  // Butterfly. A: present. B: gone (removed).
  if (v === 'A') {
    ctx.fillStyle = '#e07a5f';
    ctx.beginPath();
    ctx.ellipse(238, 116, 12, 8, -0.5, 0, Math.PI * 2);
    ctx.ellipse(262, 116, 12, 8, 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#2b2620';
    ctx.fillRect(248, 112, 4, 12);
  }

  // Flower bed. A: middle flower pink. B: purple (recoloured).
  ctx.fillStyle = '#6d4c2f';
  rr(ctx, 220, 420, 200, 50, 10);
  const flowers = [250, 290, 330, 370, 400];
  for (let i = 0; i < flowers.length; i++) {
    ctx.strokeStyle = '#3fae6a';
    ctx.lineWidth = 4;
    line(ctx, flowers[i], 420, flowers[i], 400, 4, '#3fae6a');
    ctx.fillStyle = i === 2 ? (v === 'A' ? '#ff8fa3' : '#9b5de5') : '#ffd94d';
    for (let p = 0; p < 5; p++) {
      const a = (p / 5) * Math.PI * 2;
      circle(ctx, flowers[i] + Math.cos(a) * 10, 394 + Math.sin(a) * 10, 7);
    }
    ctx.fillStyle = '#e07a5f';
    circle(ctx, flowers[i], 394, 6);
  }

  // Watering can. A: left of the bed. B: moved right (moved).
  const can = v === 'A' ? { x: 400, y: 450 } : { x: 500, y: 450 };
  ctx.fillStyle = '#3d6fb4';
  rr(ctx, can.x - 22, can.y - 18, 44, 36, 8);
  ctx.beginPath();
  ctx.moveTo(can.x + 22, can.y - 8);
  ctx.lineTo(can.x + 44, can.y - 22);
  ctx.lineTo(can.x + 44, can.y - 12);
  ctx.lineTo(can.x + 22, can.y + 2);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#3d6fb4';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(can.x - 22, can.y, 14, Math.PI * 0.5, Math.PI * 1.5);
  ctx.stroke();

  // Bucket. A: upright. B: tipped over (flipped).
  ctx.fillStyle = '#8a5a2e';
  if (v === 'A') {
    ctx.beginPath();
    ctx.moveTo(70, 480);
    ctx.lineTo(110, 480);
    ctx.lineTo(104, 516);
    ctx.lineTo(76, 516);
    ctx.closePath();
    ctx.fill();
  } else {
    ctx.save();
    ctx.translate(90, 500);
    ctx.rotate(Math.PI / 2.2);
    ctx.beginPath();
    ctx.moveTo(-20, -18);
    ctx.lineTo(20, -18);
    ctx.lineTo(14, 18);
    ctx.lineTo(-14, 18);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // Mushroom, only in B (added).
  if (v === 'B') {
    ctx.fillStyle = '#f7ead2';
    ctx.fillRect(516, 500, 8, 16);
    ctx.fillStyle = '#e05d4d';
    ctx.beginPath();
    ctx.arc(520, 500, 14, Math.PI, 0);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    circle(ctx, 514, 494, 3);
    circle(ctx, 526, 496, 3);
  }

  // Path stones + grass tufts (same in both variants).
  ctx.fillStyle = '#d9d2c0';
  for (const [sx, sy] of [[250, 500], [310, 520], [370, 500], [430, 520]]) {
    ctx.beginPath();
    ctx.ellipse(sx, sy, 26, 10, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.strokeStyle = '#5da24a';
  ctx.lineWidth = 3;
  for (const [gx, gy] of [[40, 420], [560, 430], [200, 530], [470, 540]]) {
    line(ctx, gx, gy, gx - 6, gy - 14, 3, '#5da24a');
    line(ctx, gx, gy, gx + 6, gy - 14, 3, '#5da24a');
  }
}

const GARDEN_DIFFS = [
  { id: 'kupu', name: 'Kupu-kupu hilang', type: 'removed', x: 250, y: 116, r: 24 },
  { id: 'bunga', name: 'Warna bunga berubah', type: 'recoloured', x: 330, y: 394, r: 22 },
  { id: 'apel2', name: 'Satu apel hilang', type: 'removed', x: 100, y: 220, r: 22 },
  { id: 'siraman', name: 'Penyiram pindah', type: 'moved', x: 500, y: 450, r: 30, ax: 400, ay: 450 },
  { id: 'pintu', name: 'Pintu rumah burung berubah', type: 'resized', x: 511, y: 200, r: 22 },
  { id: 'matahari', name: 'Sinar matahari berkurang', type: 'resized', x: 480, y: 70, r: 40 },
  { id: 'ember', name: 'Ember terbalik', type: 'flipped', x: 90, y: 498, r: 28 },
  { id: 'jamur', name: 'Jamur muncul', type: 'added', x: 520, y: 502, r: 20 },
];

// --- Scene 4: Beranda Senja (Porch at Dusk) ----------------------------------
function drawPorch(ctx, v, W, H) {
  // Dusk sky: purple up top, orange at the horizon.
  ctx.fillStyle = '#6b5b95';
  ctx.fillRect(0, 0, W, 200);
  ctx.fillStyle = '#b5658a';
  ctx.fillRect(0, 200, W, 80);
  ctx.fillStyle = '#f4a259';
  ctx.fillRect(0, 280, W, 40);

  // Moon. A: full. B: crescent (reshaped).
  ctx.fillStyle = '#fff3c4';
  circle(ctx, 480, 90, 30);
  if (v === 'B') {
    ctx.fillStyle = '#6b5b95';
    circle(ctx, 492, 82, 26);
  }

  // Stars. A: 7. B: 6 — the one at (200, 60) is gone (removed).
  ctx.fillStyle = '#fff8e6';
  const stars = [[80, 50], [140, 90], [200, 60], [260, 40], [330, 80], [400, 45], [540, 130]];
  for (let i = 0; i < stars.length; i++) {
    if (v === 'B' && i === 2) continue;
    circle(ctx, stars[i][0], stars[i][1], 4);
  }

  // String lights across the top. B: the middle bulb is gone (removed).
  ctx.strokeStyle = '#2b2620';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(40, 40);
  ctx.quadraticCurveTo(290, 90, 540, 40);
  ctx.stroke();
  const bulbs = [90, 200, 300, 400, 500];
  for (let i = 0; i < bulbs.length; i++) {
    if (v === 'B' && i === 2) continue;
    const bx = bulbs[i];
    const by = 40 + Math.sin((bx - 40) / 500 * Math.PI) * 38;
    ctx.fillStyle = ['#ffd94d', '#ff8fa3', '#81b29a', '#f4a259', '#bfe3f2'][i];
    circle(ctx, bx, by + 8, 8);
  }

  // House wall + porch floor.
  ctx.fillStyle = '#5b5470';
  ctx.fillRect(0, 320, W, 140);
  ctx.fillStyle = '#8a5a2e';
  ctx.fillRect(0, 460, W, H - 460);
  ctx.fillStyle = '#6d4c2f';
  for (let x = 0; x < W; x += 90) ctx.fillRect(x, 460, 3, H - 460);

  // Door with a wreath.
  ctx.fillStyle = '#6d4c2f';
  ctx.fillRect(60, 300, 100, 160);
  ctx.fillStyle = '#3fae6a';
  circle(ctx, 110, 340, 22);
  ctx.fillStyle = '#e05d4d';
  circle(ctx, 110, 322, 5);
  circle(ctx, 122, 344, 5);
  circle(ctx, 98, 344, 5);
  ctx.fillStyle = '#ffd94d';
  circle(ctx, 148, 380, 5);

  // Window glowing warm.
  ctx.fillStyle = '#fff8e6';
  ctx.fillRect(400, 330, 120, 100);
  ctx.fillStyle = '#ffd94d';
  ctx.fillRect(410, 340, 100, 80);
  ctx.fillStyle = '#2b2620';
  ctx.fillRect(455, 340, 6, 80);
  ctx.fillRect(410, 375, 100, 6);

  // Rocking chair with a cushion. A: terracotta. B: teal (recoloured).
  ctx.fillStyle = '#6d4c2f';
  ctx.fillRect(190, 360, 110, 14);
  ctx.fillRect(200, 374, 10, 80);
  ctx.fillRect(280, 374, 10, 80);
  ctx.beginPath();
  ctx.arc(240, 460, 60, 0, Math.PI);
  ctx.strokeStyle = '#6d4c2f';
  ctx.lineWidth = 6;
  ctx.stroke();
  ctx.fillStyle = v === 'A' ? '#e07a5f' : '#2a9d8f';
  rr(ctx, 205, 330, 80, 44, 10);

  // Side table with a lantern. A: lit. B: unlit (recoloured).
  ctx.fillStyle = '#6d4c2f';
  ctx.fillRect(330, 420, 70, 10);
  ctx.fillRect(340, 430, 8, 30);
  ctx.fillRect(382, 430, 8, 30);
  if (v === 'A') {
    ctx.fillStyle = 'rgba(255, 217, 77, 0.4)';
    circle(ctx, 365, 400, 34);
  }
  ctx.fillStyle = v === 'A' ? '#ffd94d' : '#8a8578';
  rr(ctx, 352, 382, 26, 38, 6);
  ctx.fillStyle = '#2b2620';
  ctx.fillRect(360, 374, 10, 8);

  // Tea cup. A: on the table. B: on the chair arm (moved).
  const cup = v === 'A' ? { x: 365, y: 372 } : { x: 290, y: 352 };
  ctx.fillStyle = '#ffffff';
  circle(ctx, cup.x, cup.y, 10);
  ctx.strokeStyle = '#2b2620';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cup.x + 10, cup.y, 5, -Math.PI / 2, Math.PI / 2);
  ctx.stroke();

  // Doormat. A: 3 stripes. B: 2 stripes (resized).
  ctx.fillStyle = '#c9b18a';
  rr(ctx, 70, 470, 110, 30, 6);
  ctx.fillStyle = '#b5654a';
  ctx.fillRect(80, 478, 90, 5);
  ctx.fillRect(80, 488, 90, 5);
  if (v === 'A') ctx.fillRect(80, 493, 90, 4);

  // Sleeping cat. A: tail curls left. B: tail curls right (flipped).
  ctx.fillStyle = '#e07a5f';
  ctx.beginPath();
  ctx.ellipse(320, 500, 34, 16, 0, 0, Math.PI * 2);
  ctx.fill();
  circle(ctx, 348, 492, 12);
  ctx.beginPath();
  ctx.moveTo(352, 500);
  ctx.lineTo(358, 494);
  ctx.lineTo(360, 501);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#e07a5f';
  ctx.lineWidth = 6;
  ctx.beginPath();
  if (v === 'A') {
    ctx.moveTo(288, 502);
    ctx.quadraticCurveTo(268, 498, 274, 482);
  } else {
    ctx.moveTo(288, 502);
    ctx.quadraticCurveTo(308, 512, 312, 496);
  }
  ctx.stroke();

  // Potted plant.
  ctx.fillStyle = '#b5654a';
  rr(ctx, 480, 470, 60, 40, 8);
  ctx.fillStyle = '#3fae6a';
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.ellipse(510, 440 - i * 4, 9, 24, (i - 1.5) * 0.4, 0, Math.PI * 2);
    ctx.fill();
  }
}

const PORCH_DIFFS = [
  { id: 'bulan', name: 'Bulan jadi sabit', type: 'resized', x: 480, y: 90, r: 32 },
  { id: 'bintang', name: 'Satu bintang hilang', type: 'removed', x: 200, y: 60, r: 14 },
  { id: 'lampu-hias', name: 'Satu lampu hias hilang', type: 'removed', x: 300, y: 78, r: 16 },
  { id: 'lentera', name: 'Lentera padam', type: 'recoloured', x: 365, y: 400, r: 28 },
  { id: 'cangkir-teh', name: 'Cangkir pindah', type: 'moved', x: 365, y: 372, r: 20, ax: 290, ay: 352 },
  { id: 'keset', name: 'Garis keset berkurang', type: 'resized', x: 125, y: 485, r: 30 },
  { id: 'bantal-kursi', name: 'Warna bantal berubah', type: 'recoloured', x: 245, y: 352, r: 30 },
  { id: 'ekor', name: 'Ekor kucing berbalik', type: 'flipped', x: 300, y: 498, r: 26 },
];

// --- Scene 5: Kamar Tidur (Bedroom) ----------------------------------------
// The late-game ramp: the differences here are smaller and quieter than
// the first scenes — one slipper among two, one pillow among two.
function drawBedroom(ctx, v, W, H) {
  // Wall + floor.
  ctx.fillStyle = '#efe6d8';
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#c89b6a';
  ctx.fillRect(0, 470, W, H - 470);
  ctx.fillStyle = '#b3854f';
  for (let x = 0; x < W; x += 90) ctx.fillRect(x, 470, 3, H - 470);

  // Night window with moon, stars and curtains (same in both variants,
  // except the curtain tie, which is a registered difference below).
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(400, 28, 140, 130);
  ctx.fillStyle = '#2b3a5c';
  ctx.fillRect(410, 38, 120, 110);
  ctx.fillStyle = '#fff3c4';
  circle(ctx, 500, 70, 18);
  ctx.fillStyle = '#ffffff';
  circle(ctx, 430, 60, 3);
  circle(ctx, 455, 90, 3);
  circle(ctx, 480, 55, 3);
  circle(ctx, 515, 100, 3);
  ctx.fillStyle = '#c0392b';
  ctx.beginPath();
  ctx.moveTo(400, 28);
  ctx.lineTo(424, 28);
  ctx.lineTo(416, 158);
  ctx.lineTo(400, 158);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(540, 28);
  ctx.lineTo(516, 28);
  ctx.lineTo(524, 158);
  ctx.lineTo(540, 158);
  ctx.closePath();
  ctx.fill();
  // Curtain tie. A: knotted on the left panel. B: on the right (flipped).
  ctx.fillStyle = '#ffd94d';
  if (v === 'A') circle(ctx, 412, 92, 7);
  else circle(ctx, 528, 92, 7);

  // Wall painting. A: 120 x 80. B: 90 x 60 (resized).
  ctx.fillStyle = '#6d4c2f';
  if (v === 'A') ctx.fillRect(56, 36, 128, 88);
  else ctx.fillRect(71, 46, 98, 68);
  ctx.fillStyle = '#81b29a';
  if (v === 'A') ctx.fillRect(62, 42, 116, 76);
  else ctx.fillRect(77, 52, 86, 56);
  ctx.fillStyle = '#e07a5f';
  circle(ctx, v === 'A' ? 120 : 120, v === 'A' ? 80 : 80, 16);

  // Wardrobe, right side, below the window.
  ctx.fillStyle = '#8a5a2e';
  ctx.fillRect(470, 200, 90, 270);
  ctx.fillStyle = '#a8763e';
  ctx.fillRect(478, 208, 74, 254);
  ctx.fillStyle = '#6d4c2f';
  ctx.fillRect(512, 208, 4, 254);
  ctx.fillStyle = '#ffd94d';
  circle(ctx, 506, 340, 5);
  circle(ctx, 522, 340, 5);

  // Bed: headboard, mattress, blanket, pillows.
  ctx.fillStyle = '#8a5a2e';
  ctx.fillRect(40, 250, 300, 18);
  ctx.fillRect(40, 250, 14, 120);
  ctx.fillStyle = '#fff8e6';
  rr(ctx, 54, 300, 286, 70, 10);
  // Pillows. A: two. B: the right one is gone (removed).
  ctx.fillStyle = '#ffffff';
  rr(ctx, 66, 306, 56, 34, 10);
  if (v === 'A') rr(ctx, 134, 306, 56, 34, 10);
  ctx.strokeStyle = '#d9d2c0';
  ctx.lineWidth = 2;
  ctx.strokeRect(66, 306, 56, 34);
  if (v === 'A') ctx.strokeRect(134, 306, 56, 34);
  // Blanket over the lower half. Stripes: A blue, B green (recoloured).
  ctx.fillStyle = '#f2cc8f';
  rr(ctx, 54, 360, 286, 110, 10);
  ctx.fillStyle = v === 'A' ? '#3d6fb4' : '#3fae6a';
  ctx.fillRect(54, 392, 286, 12);
  ctx.fillRect(54, 428, 286, 12);
  // Teddy bear, only in B (added).
  if (v === 'B') {
    ctx.fillStyle = '#b5654a';
    circle(ctx, 250, 340, 14);
    circle(ctx, 250, 322, 10);
    circle(ctx, 240, 314, 5);
    circle(ctx, 260, 314, 5);
    ctx.fillStyle = '#2b2620';
    circle(ctx, 246, 320, 2);
    circle(ctx, 254, 320, 2);
  }

  // Bedside table with a lit lamp (static) and an alarm clock.
  ctx.fillStyle = '#8a5a2e';
  ctx.fillRect(360, 400, 100, 70);
  ctx.fillStyle = '#6d4c2f';
  ctx.fillRect(368, 408, 84, 8);
  ctx.fillStyle = '#2f2f38';
  ctx.fillRect(396, 340, 8, 60);
  ctx.fillStyle = '#ffd94d';
  ctx.beginPath();
  ctx.moveTo(382, 340);
  ctx.lineTo(418, 340);
  ctx.lineTo(410, 310);
  ctx.lineTo(390, 310);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = 'rgba(255, 217, 77, 0.3)';
  circle(ctx, 400, 330, 26);
  // Alarm clock. A: 7:00. B: 7:30 (moved).
  ctx.fillStyle = '#fff8e6';
  circle(ctx, 440, 388, 16);
  ctx.strokeStyle = '#2b2620';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(440, 388, 16, 0, Math.PI * 2);
  ctx.stroke();
  line(ctx, 440, 388, 440, 376, 2, '#2b2620');
  if (v === 'A') line(ctx, 440, 388, 450, 388, 2, '#2b2620');
  else line(ctx, 440, 388, 440, 400, 2, '#2b2620');
  // Book. A: on the bed. B: on the table, clear of the clock (moved).
  const book = v === 'A' ? { x: 280, y: 340 } : { x: 376, y: 388 };
  ctx.fillStyle = '#e05d4d';
  rr(ctx, book.x - 16, book.y - 10, 32, 20, 3);
  ctx.fillStyle = '#f7ead2';
  ctx.fillRect(book.x - 12, book.y - 6, 24, 3);

  // Rug + slippers. A: a pair. B: the right slipper is gone (removed).
  ctx.fillStyle = '#f2cc8f';
  rr(ctx, 180, 500, 220, 40, 10);
  ctx.fillStyle = '#e05d4d';
  ctx.fillRect(180, 512, 220, 12);
  ctx.fillStyle = '#3d6fb4';
  rr(ctx, 140, 484, 34, 16, 8);
  if (v === 'A') rr(ctx, 184, 484, 34, 16, 8);
}

const BEDROOM_DIFFS = [
  { id: 'bantal-tidur', name: 'Satu bantal hilang', type: 'removed', x: 162, y: 323, r: 22 },
  { id: 'selimut', name: 'Warna garis selimut berubah', type: 'recoloured', x: 200, y: 398, r: 40 },
  { id: 'jam-wekker', name: 'Jarum jam wekker pindah', type: 'moved', x: 440, y: 388, r: 20 },
  { id: 'buku-tidur', name: 'Buku pindah ke meja', type: 'moved', x: 376, y: 388, r: 20, ax: 280, ay: 340 },
  { id: 'gorden', name: 'Ikatan gorden pindah sisi', type: 'flipped', x: 528, y: 92, r: 16, ax: 412, ay: 92 },
  { id: 'lukisan-tidur', name: 'Lukisan mengecil', type: 'resized', x: 120, y: 80, r: 30 },
  { id: 'sandal', name: 'Satu sandal hilang', type: 'removed', x: 201, y: 492, r: 16 },
  { id: 'boneka', name: 'Boneka muncul', type: 'added', x: 250, y: 332, r: 22 },
];

// --- Scene 6: Ruang Makan (Dining Room) --------------------------------------
// The hardest scene: four plates, three bulbs, four chairs — the changes
// hide among lookalikes, so the eye has to count, not just glance.
function drawDining(ctx, v, W, H) {
  // Wall + floor.
  ctx.fillStyle = '#f3e2c7';
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#c89b6a';
  ctx.fillRect(0, 470, W, H - 470);
  ctx.fillStyle = '#b3854f';
  for (let x = 0; x < W; x += 90) ctx.fillRect(x, 470, 3, H - 470);

  // Window with daylight (static).
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(40, 28, 140, 130);
  ctx.fillStyle = '#bfe3f2';
  ctx.fillRect(50, 38, 120, 110);
  ctx.fillStyle = '#ffd94d';
  circle(ctx, 140, 70, 20);
  ctx.fillStyle = '#ffffff';
  circle(ctx, 80, 90, 11);
  circle(ctx, 94, 90, 14);

  // Wall picture. A: 110 x 80. B: 80 x 60 (resized).
  ctx.fillStyle = '#6d4c2f';
  if (v === 'A') ctx.fillRect(426, 56, 118, 88);
  else ctx.fillRect(441, 66, 88, 68);
  ctx.fillStyle = '#f4a259';
  if (v === 'A') ctx.fillRect(432, 62, 106, 76);
  else ctx.fillRect(447, 72, 76, 56);
  ctx.fillStyle = '#3fae6a';
  circle(ctx, 485, 100, 14);

  // Chandelier: three bulbs. B: the middle one is dark (removed).
  ctx.fillStyle = '#2b2620';
  ctx.fillRect(287, 0, 6, 40);
  ctx.strokeStyle = '#2b2620';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(240, 44);
  ctx.lineTo(340, 44);
  ctx.stroke();
  const bulbs = [260, 290, 320];
  for (let i = 0; i < bulbs.length; i++) {
    ctx.fillStyle = i === 1 && v === 'B' ? '#8a8578' : '#ffd94d';
    circle(ctx, bulbs[i], 56, 10);
  }
  if (v === 'A') {
    ctx.fillStyle = 'rgba(255, 217, 77, 0.25)';
    circle(ctx, 290, 56, 40);
  }

  // Sideboard, left, with a bowl only in B (added).
  ctx.fillStyle = '#8a5a2e';
  ctx.fillRect(40, 400, 100, 70);
  ctx.fillStyle = '#6d4c2f';
  ctx.fillRect(48, 408, 84, 8);
  if (v === 'B') {
    ctx.fillStyle = '#81b29a';
    ctx.beginPath();
    ctx.moveTo(70, 396);
    ctx.lineTo(110, 396);
    ctx.lineTo(104, 410);
    ctx.lineTo(76, 410);
    ctx.closePath();
    ctx.fill();
  }

  // Table with a tablecloth. A: red checks. B: plain cream (recoloured).
  ctx.fillStyle = '#8a5a2e';
  ctx.fillRect(120, 380, 340, 14);
  ctx.fillRect(140, 394, 14, 76);
  ctx.fillRect(426, 394, 14, 76);
  if (v === 'A') {
    ctx.fillStyle = '#f7ead2';
    ctx.fillRect(120, 360, 340, 20);
    ctx.fillStyle = '#e05d4d';
    for (let x = 120; x < 460; x += 40) ctx.fillRect(x, 360, 20, 20);
  } else {
    ctx.fillStyle = '#f7ead2';
    ctx.fillRect(120, 360, 340, 20);
    ctx.fillStyle = '#e05d4d';
    ctx.fillRect(120, 374, 340, 6);
  }

  // Four plates. B: the third one is gone (removed).
  ctx.fillStyle = '#ffffff';
  const plates = [180, 260, 340, 420];
  for (let i = 0; i < plates.length; i++) {
    if (v === 'B' && i === 2) continue;
    circle(ctx, plates[i], 352, 16);
    ctx.strokeStyle = '#d9d2c0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(plates[i], 352, 10, 0, Math.PI * 2);
    ctx.stroke();
  }
  // Fork. A: left of plate one. B: right of it (flipped).
  ctx.fillStyle = '#c0c0cc';
  const forkX = v === 'A' ? 156 : 204;
  ctx.fillRect(forkX, 342, 4, 20);
  circle(ctx, forkX + 2, 340, 5);

  // Vase with flowers, table centre. A: red. B: yellow (recoloured).
  ctx.fillStyle = '#3d6fb4';
  rr(ctx, 278, 330, 24, 30, 6);
  ctx.fillStyle = v === 'A' ? '#e05d4d' : '#ffd94d';
  for (let p = 0; p < 5; p++) {
    const a = (p / 5) * Math.PI * 2;
    circle(ctx, 290 + Math.cos(a) * 10, 318 + Math.sin(a) * 10, 6);
  }
  ctx.fillStyle = '#e07a5f';
  circle(ctx, 290, 318, 5);

  // Chairs: left, right, and two in front. The right chair slides out
  // in B (moved) — it ends up clear of the table.
  ctx.fillStyle = '#6d4c2f';
  const chairs = [
    { x: 150, y: 410 },
    { x: 210, y: 478 },
    { x: 330, y: 478 },
  ];
  const rightChair = v === 'A' ? { x: 450, y: 410 } : { x: 508, y: 440 };
  for (const c of [...chairs, rightChair]) {
    ctx.fillRect(c.x, c.y, 50, 10);
    ctx.fillRect(c.x + 4, c.y + 10, 8, 40);
    ctx.fillRect(c.x + 38, c.y + 10, 8, 40);
    ctx.fillRect(c.x, c.y - 36, 10, 40);
  }
}

const DINING_DIFFS = [
  { id: 'piring', name: 'Satu piring hilang', type: 'removed', x: 340, y: 352, r: 18 },
  { id: 'vas-makan', name: 'Warna bunga vas berubah', type: 'recoloured', x: 290, y: 318, r: 22 },
  { id: 'bohlam', name: 'Satu bohlam padam', type: 'removed', x: 290, y: 56, r: 16 },
  { id: 'kursi-makan', name: 'Kursi geser keluar', type: 'moved', x: 508, y: 440, r: 28, ax: 450, ay: 410 },
  { id: 'taplak', name: 'Motif taplak berubah', type: 'recoloured', x: 290, y: 370, r: 40 },
  { id: 'garpu', name: 'Garpu pindah sisi piring', type: 'flipped', x: 204, y: 352, r: 14, ax: 156, ay: 352 },
  { id: 'lukisan-makan', name: 'Lukisan mengecil', type: 'resized', x: 485, y: 100, r: 28 },
  { id: 'mangkuk', name: 'Mangkuk muncul', type: 'added', x: 90, y: 402, r: 18 },
];

// --- The set ----------------------------------------------------------------
export const SCENES = [
  { id: 1, name: 'Dapur', sub: 'Dapur nenek yang hangat', draw: drawKitchen, diffs: KITCHEN_DIFFS },
  { id: 2, name: 'Ruang Tamu', sub: 'Sore di ruang tamu', draw: drawLiving, diffs: LIVING_DIFFS },
  { id: 3, name: 'Kebun', sub: 'Kebun belakang rumah', draw: drawGarden, diffs: GARDEN_DIFFS },
  { id: 4, name: 'Beranda Senja', sub: 'Senja di beranda', draw: drawPorch, diffs: PORCH_DIFFS },
  { id: 5, name: 'Kamar Tidur', sub: 'Malam di kamar tidur', draw: drawBedroom, diffs: BEDROOM_DIFFS },
  { id: 6, name: 'Ruang Makan', sub: 'Makan malam keluarga', draw: drawDining, diffs: DINING_DIFFS },
];
