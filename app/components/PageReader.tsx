"use client";

import Image from "next/image";
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
        className="btn btn--solid"
        onClick={() => {
          hasOpened.current = true;
          setIsOpen(true);
        }}
      >
        Read the printed pages
      </button>

      {isOpen && (
        <div
          className="reader"
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
          <div className="reader__bar">
            <strong className="reader__title">{piece.title}</strong>
            <button
              type="button"
              className="btn btn--outline reader__close"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
          <div className="reader__pages">
            {piece.pages.map((page) => (
              <Image
                key={page.src}
                src={page.src}
                alt={page.alt}
                width={page.width}
                height={page.height}
                sizes="(min-width: 50rem) 48rem, 100vw"
              />
            ))}
            <p className="reader__credit mono">{piece.credit}</p>
          </div>
        </div>
      )}
    </>
  );
}
