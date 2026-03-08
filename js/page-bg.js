/* =====================================================
   PAGE BG — Interactive Constellation + Scroll Waves
   Magnetic cursor · constellation lines · scroll warp
   Wave field distortion · glow trails · energy grid
   ===================================================== */
(function () {
  const c = document.getElementById('bg-canvas');
  if (!c) return;
  const ctx = c.getContext('2d');

  let W, H, nodes = [], t = 0, scrollY = 0;
  const N = 55;
  const LINK_DIST = 150;
  const MOUSE_R = 200;

  const PAL = [
    [79, 172, 254],  // blue
    [124, 58, 237],  // violet
    [244, 114, 182], // pink
    [0, 201, 167],   // teal
  ];

  let mouse = { x: -9999, y: -9999, active: false };
  let scrollVel = 0, lastScroll = 0;

  function resize() { W = c.width = window.innerWidth; H = c.height = window.innerHeight; }
  function rnd(a, b) { return Math.random() * (b - a) + a; }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }

  /* ── Node factory ── */
  function mk() {
    const col = pick(PAL);
    return {
      x: rnd(0, W), y: rnd(0, H),
      baseX: 0, baseY: 0,
      ox: 0, oy: 0,
      vx: rnd(-0.3, 0.3), vy: rnd(-0.3, 0.3),
      r: rnd(1.5, 4.5), baseR: 0,
      col,
      phase: rnd(0, Math.PI * 2),
      depth: rnd(0.3, 1),          // parallax layer
      shape: pick(['circle', 'hex', 'diamond', 'ring', 'star']),
      trail: [],
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

    // Smooth scroll velocity
    const curScroll = window.scrollY || window.pageYOffset;
    scrollVel += (curScroll - lastScroll - scrollVel) * 0.1;
    lastScroll = curScroll;

    /* ── Flowing wave field (scroll-reactive) ── */
    const waveIntensity = Math.min(Math.abs(scrollVel) * 0.3, 12);
    ctx.strokeStyle = 'rgba(79,172,254,.025)';
    ctx.lineWidth = 0.8;
    for (let row = 0; row < H; row += 50) {
      ctx.beginPath();
      for (let col = 0; col <= W; col += 8) {
        const wave = Math.sin(col * 0.008 + t * 2 + row * 0.003) * (8 + waveIntensity)
                   + Math.sin(col * 0.015 - t * 1.3) * 4;
        const y = row + wave + scrollVel * 0.15 * Math.sin(col * 0.01);
        col === 0 ? ctx.moveTo(col, y) : ctx.lineTo(col, y);
      }
      ctx.stroke();
    }

    /* ── Update nodes ── */
    for (const n of nodes) {
      // Scroll warp: nodes shift based on depth and scroll velocity
      const scrollPush = scrollVel * n.depth * 0.5;
      n.x += n.vx;
      n.y += n.vy + scrollPush * 0.05;

      // Wrap around edges
      if (n.x < -20) n.x = W + 20;
      if (n.x > W + 20) n.x = -20;
      if (n.y < -20) n.y = H + 20;
      if (n.y > H + 20) n.y = -20;

      // Sine-wave micro-drift
      n.x += Math.sin(t * 1.5 + n.phase) * 0.15;
      n.y += Math.cos(t * 1.2 + n.phase) * 0.12;

      // Mouse magnetic repulsion
      if (mouse.active) {
        const dx = n.x - mouse.x, dy = n.y - mouse.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < MOUSE_R && d > 0) {
          const force = (1 - d / MOUSE_R) * 3;
          n.ox += (dx / d) * force;
          n.oy += (dy / d) * force;
        }
      }
      n.ox *= 0.93; n.oy *= 0.93;

      // Glow pulse
      const pulse = Math.sin(t * 2 + n.phase) * 0.5 + 0.5;
      n.r = n.baseR + pulse * 1.5;

      // Trail
      n.trail.push({ x: n.x + n.ox, y: n.y + n.oy });
      if (n.trail.length > 5) n.trail.shift();
    }

    /* ── Connection lines ── */
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      const ax = a.x + a.ox, ay = a.y + a.oy;
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const bx = b.x + b.ox, by = b.y + b.oy;
        const d = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2);
        if (d < LINK_DIST) {
          const alpha = (1 - d / LINK_DIST) * 0.12;
          const grad = ctx.createLinearGradient(ax, ay, bx, by);
          grad.addColorStop(0, `rgba(${a.col.join(',')}, ${alpha})`);
          grad.addColorStop(1, `rgba(${b.col.join(',')}, ${alpha})`);
          ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by);
          ctx.strokeStyle = grad; ctx.lineWidth = 0.5; ctx.stroke();
        }
      }
    }

    /* ── Cursor energy field ── */
    if (mouse.active) {
      const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, MOUSE_R);
      grad.addColorStop(0, 'rgba(79,172,254,.05)');
      grad.addColorStop(0.6, 'rgba(124,58,237,.02)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.arc(mouse.x, mouse.y, MOUSE_R, 0, Math.PI * 2); ctx.fill();

      // Rotating arc
      ctx.save();
      ctx.translate(mouse.x, mouse.y);
      ctx.rotate(t * 2);
      ctx.strokeStyle = 'rgba(79,172,254,.1)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(0, 0, 40, 0, Math.PI); ctx.stroke();
      ctx.rotate(Math.PI * 0.7);
      ctx.strokeStyle = 'rgba(244,114,182,.08)';
      ctx.beginPath(); ctx.arc(0, 0, 28, 0, Math.PI * 0.7); ctx.stroke();
      ctx.restore();

      // Lines from nearby nodes to cursor
      for (const n of nodes) {
        const px = n.x + n.ox, py = n.y + n.oy;
        const d = Math.sqrt((px - mouse.x) ** 2 + (py - mouse.y) ** 2);
        if (d < MOUSE_R * 0.7) {
          const alpha = (1 - d / (MOUSE_R * 0.7)) * 0.08;
          ctx.strokeStyle = `rgba(${n.col.join(',')}, ${alpha})`;
          ctx.lineWidth = 0.4;
          ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }
    }

    /* ── Draw trails + nodes ── */
    for (const n of nodes) {
      const px = n.x + n.ox, py = n.y + n.oy;

      // Trail
      for (let ti = 0; ti < n.trail.length; ti++) {
        const tp = n.trail[ti];
        const ta = (ti / n.trail.length) * 0.04;
        ctx.fillStyle = `rgba(${n.col.join(',')}, ${ta})`;
        ctx.beginPath(); ctx.arc(tp.x, tp.y, n.r * 0.4, 0, Math.PI * 2); ctx.fill();
      }

      // Outer glow
      const glow = ctx.createRadialGradient(px, py, 0, px, py, n.r * 3.5);
      glow.addColorStop(0, `rgba(${n.col.join(',')}, 0.07)`);
      glow.addColorStop(1, `rgba(${n.col.join(',')}, 0)`);
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(px, py, n.r * 3.5, 0, Math.PI * 2); ctx.fill();

      // Core node
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(t * 0.8 + n.phase);
      ctx.fillStyle = `rgba(${n.col.join(',')}, 0.55)`;
      ctx.strokeStyle = `rgba(${n.col.join(',')}, 0.25)`;
      drawShape(n.shape, n.r);
      ctx.restore();
    }

    /* ── Scroll-speed indicator lines (cinematic) ── */
    if (Math.abs(scrollVel) > 1.5) {
      const count = Math.min(Math.floor(Math.abs(scrollVel) * 0.8), 15);
      const dir = scrollVel > 0 ? 1 : -1;
      for (let i = 0; i < count; i++) {
        const x = rnd(0, W);
        const y = rnd(0, H);
        const len = rnd(15, 40) * Math.min(Math.abs(scrollVel) * 0.15, 3);
        ctx.strokeStyle = `rgba(79,172,254, ${rnd(0.02, 0.06)})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + len * dir); ctx.stroke();
      }
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
