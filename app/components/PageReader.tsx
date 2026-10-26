"use client";

import { useEffect, useRef, useState } from "react";
import type { Piece } from "../data/iv11";

type PageReaderProps = {
  piece: Piece;
};

export default function PageReader({ piece }: PageReaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const hasOpened = useRef(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen && hasOpened.current) {
      buttonRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="writing-btn writing-btn-primary"
        onClick={() => {
          hasOpened.current = true;
          setIsOpen(true);
        }}
      >
        Read the pages
      </button>

      {isOpen && (
        <div
          className="page-reader-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={piece.title}
          ref={dialogRef}
          tabIndex={-1}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <div className="page-reader-topbar">
            <strong>{piece.title}</strong>
            <button
              type="button"
              className="page-reader-close"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
          <div className="page-reader-column">
            {piece.pages.map((page) => (
              <img
                key={page.src}
                src={page.src}
                alt={page.alt}
                width={page.width}
                height={page.height}
                loading="lazy"
              />
            ))}
            <p className="page-reader-credit">{piece.credit}</p>
          </div>
        </div>
      )}
    </>
  );
}
