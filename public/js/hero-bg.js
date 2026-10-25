/* =====================================================
   HERO BACKGROUND — Interactive Constellation Network
   Performance-optimised: no per-frame gradients on
   nodes/links, reduced count, cached color strings
   ===================================================== */
(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) || window.innerWidth < 768;
  let W, H, nodes = [], t = 0;
  const N = isMobile ? 18 : 45;
  const LINK_DIST = 150;
  const LINK_DIST_SQ = LINK_DIST * LINK_DIST;
  const MOUSE_RADIUS = 200;

  const PAL = [
    [79, 172, 254],   // blue
    [124, 58, 237],   // violet
    [244, 114, 182],  // pink
    [0, 201, 167],    // teal
  ];

  let mouse = { x: -9999, y: -9999, active: false };

  /* ── Resize ── */
  function resize() {
    const sec = canvas.closest('.hero') || canvas.parentElement;
    W = canvas.width = sec.offsetWidth;
    H = canvas.height = sec.offsetHeight;
  }

  function rnd(a, b) { return Math.random() * (b - a) + a; }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }

  /* ── Node factory ── */
  function mk() {
    const col = pick(PAL);
    const sz = rnd(2, 5.5);
    return {
      x: rnd(0, W), y: rnd(0, H),
      ox: 0, oy: 0,
      vx: rnd(-0.35, 0.35), vy: rnd(-0.35, 0.35),
      r: sz, baseR: sz,
      col,
      colStr: col.join(','),     // pre-cached
      pulse: rnd(0, Math.PI * 2),
      shape: pick(['circle', 'hex', 'diamond', 'ring', 'star']),
    };
  }

  /* ── Shape renderers ── */
  function drawShape(n, r) {
    switch (n.shape) {
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
        ctx.lineWidth = 1.2; ctx.stroke(); break;
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
    if (paused) return;
    t += 0.008;
    ctx.clearRect(0, 0, W, H);

    /* ── Update nodes ── */
    for (const n of nodes) {
      n.x += n.vx; n.y += n.vy;

      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
      n.x = Math.max(0, Math.min(W, n.x));
      n.y = Math.max(0, Math.min(H, n.y));

      // Mouse repulsion — desktop only
      if (!isMobile && mouse.active) {
        const dx = n.x - mouse.x, dy = n.y - mouse.y;
        const dSq = dx * dx + dy * dy;
        if (dSq < MOUSE_RADIUS * MOUSE_RADIUS && dSq > 0) {
          const d = Math.sqrt(dSq);
          const force = (1 - d / MOUSE_RADIUS) * 3;
          n.ox += (dx / d) * force;
          n.oy += (dy / d) * force;
        }
      }

      n.ox *= 0.92; n.oy *= 0.92;

      const pulse = Math.sin(t * 2.5 + n.pulse) * 0.5 + 0.5;
      n.r = n.baseR + pulse * 1.8;
    }

    /* ── Connection lines (no per-line gradient) ── */
    ctx.lineWidth = 0.6;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      const ax = a.x + a.ox, ay = a.y + a.oy;
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const bx = b.x + b.ox, by = b.y + b.oy;
        const dSq = (ax - bx) ** 2 + (ay - by) ** 2;
        if (dSq < LINK_DIST_SQ) {
          const alpha = (1 - Math.sqrt(dSq) / LINK_DIST) * 0.12;
          ctx.strokeStyle = `rgba(${a.colStr}, ${alpha})`;
          ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
        }
      }
    }

    /* ── Mouse energy ring — desktop only ── */
    if (!isMobile && mouse.active) {
      const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, MOUSE_RADIUS);
      grad.addColorStop(0, 'rgba(79,172,254,.05)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.arc(mouse.x, mouse.y, MOUSE_RADIUS, 0, Math.PI * 2); ctx.fill();

      ctx.save();
      ctx.translate(mouse.x, mouse.y);
      ctx.rotate(t * 1.5);
      ctx.strokeStyle = 'rgba(79,172,254,.1)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(0, 0, 45, 0, Math.PI * 1.2); ctx.stroke();
      ctx.rotate(Math.PI);
      ctx.strokeStyle = 'rgba(244,114,182,.08)';
      ctx.beginPath(); ctx.arc(0, 0, 30, 0, Math.PI * 0.8); ctx.stroke();
      ctx.restore();
    }

    /* ── Draw nodes (no trails, no per-node gradient) ── */
    for (const n of nodes) {
      const px = n.x + n.ox, py = n.y + n.oy;

      // Soft glow (simple fill, no gradient)
      ctx.fillStyle = `rgba(${n.colStr}, 0.05)`;
      ctx.beginPath(); ctx.arc(px, py, n.r * 3, 0, Math.PI * 2); ctx.fill();

      // Core node
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(t + n.pulse);
      ctx.fillStyle = `rgba(${n.colStr}, 0.55)`;
      ctx.strokeStyle = `rgba(${n.colStr}, 0.25)`;
      drawShape(n, n.r);
      ctx.restore();
    }

    requestAnimationFrame(frame);
  }

  /* ── Pause when tab hidden (battery saver) ── */
  let paused = false;
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { paused = true; }
    else { paused = false; frame(); }
  });

  /* ── Events (use window, keep canvas pointer-events:none for mobile scroll) ── */
  window.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    const mx = e.clientX - r.left, my = e.clientY - r.top;
    if (mx >= 0 && mx <= W && my >= 0 && my <= H) {
      mouse.x = mx; mouse.y = my; mouse.active = true;
    } else { mouse.active = false; }
  });
  window.addEventListener('mouseleave', () => { mouse.active = false; });

  /* ── Init ── */
  resize();
  for (let i = 0; i < N; i++) nodes.push(mk());
  frame();
  window.addEventListener('resize', () => { resize(); });
})();
