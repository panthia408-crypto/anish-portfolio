/* =====================================================
   HERO BACKGROUND — Interactive Constellation Network
   Magnetic cursor field · connection lines · glow pulses
   Shape morphing · flowing energy trails
   ===================================================== */
(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, nodes = [], t = 0;
  const N = 70;
  const LINK_DIST = 160;
  const MOUSE_RADIUS = 220;

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
  function dist(a, b) { const dx = a.x - b.x, dy = a.y - b.y; return Math.sqrt(dx * dx + dy * dy); }
  function lerp(a, b, t) { return a + (b - a) * t; }

  /* ── Node factory ── */
  function mk() {
    const col = pick(PAL);
    const sz = rnd(2, 6);
    return {
      x: rnd(0, W), y: rnd(0, H),
      ox: 0, oy: 0,               // offset from mouse push
      vx: rnd(-0.4, 0.4), vy: rnd(-0.4, 0.4),
      r: sz, baseR: sz,
      col,
      pulse: rnd(0, Math.PI * 2), // phase offset for glow pulse
      shape: pick(['circle', 'hex', 'diamond', 'ring', 'star']),
      trail: [],
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
    t += 0.008;
    ctx.clearRect(0, 0, W, H);

    /* ── Update nodes ── */
    for (const n of nodes) {
      n.x += n.vx; n.y += n.vy;

      // Soft bounce at edges
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
      n.x = Math.max(0, Math.min(W, n.x));
      n.y = Math.max(0, Math.min(H, n.y));

      // Mouse magnetic repulsion
      if (mouse.active) {
        const dx = n.x - mouse.x, dy = n.y - mouse.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < MOUSE_RADIUS && d > 0) {
          const force = (1 - d / MOUSE_RADIUS) * 3.5;
          n.ox += (dx / d) * force;
          n.oy += (dy / d) * force;
        }
      }

      // Ease offset back to zero (spring)
      n.ox *= 0.92; n.oy *= 0.92;

      // Glow pulse
      const pulse = Math.sin(t * 2.5 + n.pulse) * 0.5 + 0.5;
      n.r = n.baseR + pulse * 2;

      // Trail
      n.trail.push({ x: n.x + n.ox, y: n.y + n.oy, a: 0.3 });
      if (n.trail.length > 6) n.trail.shift();
    }

    /* ── Draw connection lines ── */
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      const ax = a.x + a.ox, ay = a.y + a.oy;
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const bx = b.x + b.ox, by = b.y + b.oy;
        const d = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2);
        if (d < LINK_DIST) {
          const alpha = (1 - d / LINK_DIST) * 0.15;
          // Gradient line between two particle colors
          const grad = ctx.createLinearGradient(ax, ay, bx, by);
          grad.addColorStop(0, `rgba(${a.col.join(',')}, ${alpha})`);
          grad.addColorStop(1, `rgba(${b.col.join(',')}, ${alpha})`);
          ctx.beginPath();
          ctx.moveTo(ax, ay); ctx.lineTo(bx, by);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    /* ── Draw mouse energy ring ── */
    if (mouse.active) {
      const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, MOUSE_RADIUS);
      grad.addColorStop(0, 'rgba(79,172,254,.06)');
      grad.addColorStop(0.5, 'rgba(124,58,237,.03)');
      grad.addColorStop(1, 'rgba(124,58,237,0)');
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.arc(mouse.x, mouse.y, MOUSE_RADIUS, 0, Math.PI * 2); ctx.fill();

      // Spinning ring around cursor
      ctx.save();
      ctx.translate(mouse.x, mouse.y);
      ctx.rotate(t * 1.5);
      ctx.strokeStyle = 'rgba(79,172,254,.12)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(0, 0, 50, 0, Math.PI * 1.2); ctx.stroke();
      ctx.rotate(Math.PI);
      ctx.strokeStyle = 'rgba(244,114,182,.1)';
      ctx.beginPath(); ctx.arc(0, 0, 35, 0, Math.PI * 0.8); ctx.stroke();
      ctx.restore();
    }

    /* ── Draw trails + nodes ── */
    for (const n of nodes) {
      const px = n.x + n.ox, py = n.y + n.oy;

      // Trails (fading)
      for (let ti = 0; ti < n.trail.length; ti++) {
        const tp = n.trail[ti];
        const ta = (ti / n.trail.length) * 0.06;
        ctx.fillStyle = `rgba(${n.col.join(',')}, ${ta})`;
        ctx.beginPath();
        ctx.arc(tp.x, tp.y, n.r * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Outer glow
      const glow = ctx.createRadialGradient(px, py, 0, px, py, n.r * 4);
      glow.addColorStop(0, `rgba(${n.col.join(',')}, 0.08)`);
      glow.addColorStop(1, `rgba(${n.col.join(',')}, 0)`);
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(px, py, n.r * 4, 0, Math.PI * 2); ctx.fill();

      // Node itself
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(t + n.pulse);
      ctx.fillStyle = `rgba(${n.col.join(',')}, 0.6)`;
      ctx.strokeStyle = `rgba(${n.col.join(',')}, 0.3)`;
      drawShape(n, n.r);
      ctx.restore();
    }

    requestAnimationFrame(frame);
  }

  /* ── Events ── */
  canvas.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.active = true;
  });
  canvas.addEventListener('mouseleave', () => { mouse.active = false; });
  canvas.style.pointerEvents = 'auto';

  /* ── Init ── */
  resize();
  for (let i = 0; i < N; i++) nodes.push(mk());
  frame();
  window.addEventListener('resize', () => { resize(); });
})();
