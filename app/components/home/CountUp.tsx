"use client";

import { useEffect, useRef } from "react";

/**
 * A number that counts up from zero the first time it scrolls into view. The server renders the
 * final number, so it is right without JavaScript and under reduced motion.
 */
export default function CountUp({ to, duration = 1400 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let started = 0;
    const step = (now: number) => {
      if (!started) started = now;
      const progress = Math.min((now - started) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = String(Math.round(eased * to));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      element.textContent = "0";
      frame = requestAnimationFrame(step);
    });
    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      element.textContent = String(to);
    };
  }, [to, duration]);

  return <span ref={ref}>{to}</span>;
}
