"use client";

import { useEffect } from "react";

export default function NavScroll() {
  useEffect(() => {
    const nav = document.querySelector(".main-nav");
    if (!nav) {
      return;
    }

    let lastScrollY = window.scrollY;
    let frameId: number | null = null;

    const updateNav = () => {
      frameId = null;
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY - lastScrollY > 8;
      const scrollingUp = lastScrollY - currentScrollY > 8;
      const menuIsOpen = nav.querySelector(".nav-links.active") !== null;
      const hasFocusInsideNav = nav.contains(document.activeElement);

      if (
        currentScrollY <= 80 ||
        scrollingUp ||
        menuIsOpen ||
        hasFocusInsideNav
      ) {
        nav.classList.remove("nav-hidden");
      } else if (scrollingDown && currentScrollY > 80) {
        nav.classList.add("nav-hidden");
      }

      lastScrollY = currentScrollY;
    };

    const handleScroll = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateNav);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      nav.classList.remove("nav-hidden");
    };
  }, []);

  return null;
}
