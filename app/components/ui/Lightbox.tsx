"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export type LightboxPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Shown in the bar in place of the title, when set. */
  caption?: string;
};

type LightboxProps = {
  title: string;
  photos: LightboxPhoto[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
};

/**
 * Full-screen photo viewer. Escape closes it, arrow keys and swipes step through the photos,
 * Tab stays inside, and focus goes back to whatever opened it.
 */
export default function Lightbox({ title, photos, index, onIndexChange, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const swipeStartRef = useRef<number | null>(null);
  const count = photos.length;
  const photo = photos[index];

  useEffect(() => {
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      opener?.focus();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowLeft" && count > 1) {
        onIndexChange((index - 1 + count) % count);
      } else if (event.key === "ArrowRight" && count > 1) {
        onIndexChange((index + 1) % count);
      } else if (event.key === "Tab") {
        const buttons = dialogRef.current?.querySelectorAll<HTMLElement>("button");
        if (!buttons || buttons.length === 0) return;
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        const active = document.activeElement;
        if (event.shiftKey && (active === first || active === dialogRef.current)) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [count, index, onClose, onIndexChange]);

  const step = (delta: number) => onIndexChange((index + delta + count) % count);

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      tabIndex={-1}
      ref={dialogRef}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onPointerDown={(event) => {
        swipeStartRef.current = event.clientX;
      }}
      onPointerUp={(event) => {
        const start = swipeStartRef.current;
        swipeStartRef.current = null;
        if (start === null) return;
        const dx = event.clientX - start;
        if (Math.abs(dx) > 50 && count > 1) step(dx < 0 ? 1 : -1);
      }}
    >
      <div className="lightbox__bar">
        <p className="lightbox__title">{photo.caption ?? title}</p>
        <button className="btn btn--outline" type="button" aria-label="Close photo viewer" onClick={onClose}>
          Close
        </button>
      </div>
      <div className="lightbox__content">
        <Image
          key={photo.src}
          className="lightbox__image"
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes="100vw"
          quality={85}
          loading="eager"
          draggable={false}
        />
      </div>
      {count > 1 && (
        <div className="lightbox__controls">
          <button type="button" aria-label="Previous photo" onClick={() => step(-1)}>
            ← Previous
          </button>
          <span className="mono" aria-live="polite">
            {index + 1} / {count}
          </span>
          <button type="button" aria-label="Next photo" onClick={() => step(1)}>
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
