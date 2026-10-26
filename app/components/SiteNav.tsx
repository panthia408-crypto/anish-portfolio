"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type SiteNavProps = {
  active?: string;
};

export default function SiteNav({ active = "" }: SiteNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuLinksRef = useRef<HTMLUListElement>(null);

  const links = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "My Projects" },
    { href: "/journey", label: "Journey" },
    { href: "/library", label: "Library" },
    { href: "/blog", label: "Blog" },
  ];

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        !menuButtonRef.current?.contains(target) &&
        !menuLinksRef.current?.contains(target)
      ) {
        setMenuOpen(false);
      }
    };

    const handleDocumentKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleDocumentKeyDown);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("keydown", handleDocumentKeyDown);
    };
  }, [menuOpen]);

  return (
    <nav className="main-nav" role="navigation" aria-label="Main navigation">
      <div className="nav-left">
        <Link href="/" className="logo-link">
          <img src="/logo.png" alt="Logo" className="nav-logo" />
          <span className="logo-text">A.Panthi</span>
        </Link>
      </div>

      <ul
        ref={menuLinksRef}
        id="main-navigation-links"
        className={`nav-links${menuOpen ? " active" : ""}`}
      >
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className={link.href === active ? "active" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="nav-right">
        <button
          ref={menuButtonRef}
          type="button"
          className={`mobile-menu-icon${menuOpen ? " active" : ""}`}
          id="mobile-menu-btn"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="main-navigation-links"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </button>
      </div>
    </nav>
  );
}
