"use client";

import { useEffect, useRef } from "react";

/**
 * The blueprint grid behind the hero. With a mouse, a brighter patch of grid and a drafting
 * crosshair follow the pointer, like the cursor in a CAD drawing. Touch and reduced motion get the plain grid.
 */
export default function HeroBackdrop() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = ref.current;
    const hero = layer?.parentElement;
    if (!layer || !hero) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      layer.style.setProperty("--mx", `${x}px`);
      layer.style.setProperty("--my", `${y}px`);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const box = hero.getBoundingClientRect();
      x = event.clientX - box.left;
      y = event.clientY - box.top;
      layer.classList.add("is-lit");
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onLeave = () => layer.classList.remove("is-lit");

    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className="hero-sheet__backdrop" aria-hidden="true">
      <div className="hero-sheet__grid-bg" />
      <div className="hero-sheet__spot" />
      <div className="hero-sheet__cross" />
    </div>
  );
}
