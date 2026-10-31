"use client";

import { useEffect } from "react";

/**
 * Adds "is-in" to every [data-animate] element as it scrolls into view, including elements added later
 * (filtered lists, client-side navigation). Nothing is hidden until this has run: the hidden start states
 * in components.css need html.reveal-ready, which is set here. Skipped entirely under reduced motion.
 */
export default function ScrollAnimator() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 },
    );

    const watch = (scope: ParentNode, firstPass: boolean) => {
      const nodes =
        scope instanceof Element && scope.matches("[data-animate]")
          ? [scope, ...scope.querySelectorAll("[data-animate]")]
          : [...scope.querySelectorAll("[data-animate]")];
      const pending = nodes.filter((node) => !node.classList.contains("is-in"));
      if (!firstPass) {
        pending.forEach((node) => io.observe(node));
        return;
      }
      // On the first pass, anything already on screen is shown as is, so it never flickers.
      // Read every position before changing any class, so the browser lays out the page once.
      const viewportHeight = window.innerHeight;
      const onScreen = pending.map((node) => node.getBoundingClientRect().top < viewportHeight);
      pending.forEach((node, index) => {
        if (onScreen[index]) node.classList.add("is-in");
        else io.observe(node);
      });
    };

    watch(document, true);
    document.documentElement.classList.add("reveal-ready");

    const mo = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (node instanceof Element) watch(node, false);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
