/* =====================================================
   PAGE BG — Interactive Constellation Network
   Performance-optimised: no scroll reactions,
   batched draws, no per-frame gradient creation
   ===================================================== */
(function () {
  const c = document.getElementById('bg-canvas');
  if (!c) return;
  const ctx = c.getContext('2d');

  let W, H, nodes = [], t = 0;
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) || window.innerWidth < 768;
  const N = isMobile ? 15 : 35;
  const LINK_DIST = 140;
  const LINK_DIST_SQ = LINK_DIST * LINK_DIST;
  const MOUSE_R = 180;

  const PAL = [
    [79, 172, 254],  // blue
    [124, 58, 237],  // violet
    [244, 114, 182], // pink
    [0, 201, 167],   // teal
  ];

  let mouse = { x: -9999, y: -9999, active: false };

  function resize() { W = c.width = window.innerWidth; H = c.height = window.innerHeight; }
  function rnd(a, b) { return Math.random() * (b - a) + a; }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }

  /* ── Node factory ── */
  function mk() {
    const col = pick(PAL);
    return {
      x: rnd(0, W), y: rnd(0, H),
      ox: 0, oy: 0,
      vx: rnd(-0.25, 0.25), vy: rnd(-0.25, 0.25),
      r: rnd(1.5, 4), baseR: 0,
      col,
      colStr: col.join(','),      // pre-cached string
      phase: rnd(0, Math.PI * 2),
      shape: pick(['circle', 'hex', 'diamond', 'ring', 'star']),
    };
  }

  /* ── Shapes ── */
  function drawShape(shape, r) {
    switch (shape) {
      case 'circle':
        ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fill(); break;
      case 'hex':
        ctx.beginPath();
        for (let i = 0; i < 6; i++) { const a = Math.PI / 3 * i - Math.PI / 6; ctx[i ? 'lineTo' : 'moveTo'](r * Math.cos(a), r * Math.sin(a)); }
        ctx.closePath(); ctx.fill(); break;
      case 'diamond':
        ctx.beginPath(); ctx.moveTo(0, -r); ctx.lineTo(r * 0.6, 0); ctx.lineTo(0, r); ctx.lineTo(-r * 0.6, 0);
        ctx.closePath(); ctx.fill(); break;
      case 'ring':
        ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.lineWidth = 1; ctx.stroke(); break;
      case 'star':
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const ai = Math.PI * 2 / 5 * i - Math.PI / 2;
          const ao = ai + Math.PI / 5;
          ctx[i ? 'lineTo' : 'moveTo'](r * Math.cos(ai), r * Math.sin(ai));
          ctx.lineTo(r * 0.4 * Math.cos(ao), r * 0.4 * Math.sin(ao));
        }
        ctx.closePath(); ctx.fill(); break;
    }
  }

  /* ── Main loop ── */
  function frame() {
    t += 0.006;
    ctx.clearRect(0, 0, W, H);

    /* ── Update nodes ── */
    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;

      if (n.x < -20) n.x = W + 20;
      if (n.x > W + 20) n.x = -20;
      if (n.y < -20) n.y = H + 20;
      if (n.y > H + 20) n.y = -20;

      n.x += Math.sin(t * 1.5 + n.phase) * 0.12;
      n.y += Math.cos(t * 1.2 + n.phase) * 0.1;

      if (mouse.active) {
        const dx = n.x - mouse.x, dy = n.y - mouse.y;
        const dSq = dx * dx + dy * dy;
        if (dSq < MOUSE_R * MOUSE_R && dSq > 0) {
          const d = Math.sqrt(dSq);
          const force = (1 - d / MOUSE_R) * 2.5;
          n.ox += (dx / d) * force;
          n.oy += (dy / d) * force;
        }
      }
      n.ox *= 0.92; n.oy *= 0.92;

      const pulse = Math.sin(t * 2 + n.phase) * 0.5 + 0.5;
      n.r = n.baseR + pulse * 1.2;
    }

    /* ── Connection lines (batched, no per-line gradient) ── */
    ctx.lineWidth = 0.5;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      const ax = a.x + a.ox, ay = a.y + a.oy;
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const bx = b.x + b.ox, by = b.y + b.oy;
        const dSq = (ax - bx) ** 2 + (ay - by) ** 2;
        if (dSq < LINK_DIST_SQ) {
          const alpha = (1 - Math.sqrt(dSq) / LINK_DIST) * 0.1;
          ctx.strokeStyle = `rgba(${a.colStr}, ${alpha})`;
          ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
        }
      }
    }

    /* ── Cursor energy field (simplified) ── */
    if (mouse.active) {
      // Single radial glow
      const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, MOUSE_R);
      grad.addColorStop(0, 'rgba(79,172,254,.04)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.arc(mouse.x, mouse.y, MOUSE_R, 0, Math.PI * 2); ctx.fill();

      // Rotating arc
      ctx.save();
      ctx.translate(mouse.x, mouse.y);
      ctx.rotate(t * 2);
      ctx.strokeStyle = 'rgba(79,172,254,.08)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(0, 0, 36, 0, Math.PI); ctx.stroke();
      ctx.restore();

      // Beams to nearby nodes
      for (const n of nodes) {
        const px = n.x + n.ox, py = n.y + n.oy;
        const dSq = (px - mouse.x) ** 2 + (py - mouse.y) ** 2;
        const limit = MOUSE_R * 0.6;
        if (dSq < limit * limit) {
          const alpha = (1 - Math.sqrt(dSq) / limit) * 0.06;
          ctx.strokeStyle = `rgba(${n.colStr}, ${alpha})`;
          ctx.lineWidth = 0.4;
          ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }
    }

    /* ── Draw nodes (no trails, no per-node gradient glow) ── */
    for (const n of nodes) {
      const px = n.x + n.ox, py = n.y + n.oy;

      // Soft glow (simple filled circle, no gradient)
      ctx.fillStyle = `rgba(${n.colStr}, 0.04)`;
      ctx.beginPath(); ctx.arc(px, py, n.r * 3, 0, Math.PI * 2); ctx.fill();

      // Core node
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(t * 0.8 + n.phase);
      ctx.fillStyle = `rgba(${n.colStr}, 0.5)`;
      ctx.strokeStyle = `rgba(${n.colStr}, 0.2)`;
      drawShape(n.shape, n.r);
      ctx.restore();
    }

    requestAnimationFrame(frame);
  }

  /* ── Events ── */
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true; });
  window.addEventListener('mouseleave', () => { mouse.active = false; });

  /* ── Init ── */
  resize();
  for (let i = 0; i < N; i++) { const n = mk(); n.baseR = n.r; nodes.push(n); }
  frame();
  window.addEventListener('resize', resize);
})();
