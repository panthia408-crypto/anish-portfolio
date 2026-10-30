"use client";

import { useEffect, useRef, type ReactNode } from "react";

// One observer shared by every Reveal on the page.
let observer: IntersectionObserver | null = null;

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer?.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
  }
  return observer;
}

/**
 * Fades content up 12px once. Nothing is hidden until this runs: the hidden state needs
 * html.reveal-ready (set here), so content stays visible without JS or before hydration.
 */
export default function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    // Already on screen: show it now so it never flickers out and back in.
    if (node.getBoundingClientRect().top < window.innerHeight) {
      node.classList.add("is-in");
    }
    document.documentElement.classList.add("reveal-ready");
    if (node.classList.contains("is-in")) return;
    const io = getObserver();
    io.observe(node);
    return () => io.unobserve(node);
  }, []);

  return (
    <div ref={ref} className={className} data-reveal="">
      {children}
    </div>
  );
}
