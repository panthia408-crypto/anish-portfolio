"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "../data/site";

const links = [
  { href: "/", label: "Home", match: ["/"] },
  { href: "/research", label: "Research", match: ["/research"] },
  { href: "/projects", label: "Work", match: ["/projects", "/soies"] },
  { href: "/blog", label: "Writing", match: ["/blog"] },
  { href: "/about", label: "About", match: ["/about", "/journey"] },
  { href: "/learning", label: "Learning", match: ["/learning"] },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!menuButtonRef.current?.contains(target) && !menuRef.current?.contains(target)) {
        setMenuOpen(false);
      }
    };

    const handleDocumentKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleDocumentKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("keydown", handleDocumentKeyDown);
    };
  }, [menuOpen]);

  // Close the sheet if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 48rem)");
    const close = () => query.matches && setMenuOpen(false);
    query.addEventListener("change", close);
    return () => query.removeEventListener("change", close);
  }, []);

  const linkList = (className: string) => (
    <ul className={className}>
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            aria-current={link.match.includes(pathname) ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <header className={`site-nav${scrolled ? " is-scrolled" : ""}${menuOpen ? " is-open" : ""}`}>
      <nav className="site-nav__bar container" aria-label="Main">
        <Link href="/" className="site-nav__mark">
          {site.name}
        </Link>

        {linkList("site-nav__links")}

        <a className="site-nav__cv mono" href={site.cv.href} download title={`PDF, ${site.cv.size}`}>
          CV <span aria-hidden="true">↓</span>
        </a>

        <button
          ref={menuButtonRef}
          type="button"
          className="site-nav__toggle mono"
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </nav>

      <div id="site-menu" ref={menuRef} className="site-nav__sheet" hidden={!menuOpen}>
        <div className="container">
          {linkList("site-nav__sheet-links")}
          <a className="arrow-link site-nav__sheet-cv" href={site.cv.href} download>
            <span className="arrow-link__text">
              Download CV (PDF, {site.cv.size})
            </span>
            <span className="arrow-link__glyph" aria-hidden="true">
              ↓
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
