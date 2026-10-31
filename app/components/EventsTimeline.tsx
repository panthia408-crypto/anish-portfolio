"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { imageSize, sanityImg, type SoiesEvent } from "../data/soies-events";

type EventsTimelineProps = {
  events: SoiesEvent[];
};

type LightboxPhoto = {
  eventTitle: string;
  photos: string[];
  index: number;
};

function monthLabel(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function dateLabel(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

const staggerStyle = (index: number) => ({ "--i": index % 6 }) as CSSProperties;

function stepPhoto(current: LightboxPhoto | null, delta: number): LightboxPhoto | null {
  if (!current) return current;
  return { ...current, index: (current.index + delta + current.photos.length) % current.photos.length };
}

export default function EventsTimeline({ events }: EventsTimelineProps) {
  const [lightbox, setLightbox] = useState<LightboxPhoto | null>(null);
  const photoButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const lightboxRef = useRef<HTMLDivElement>(null);
  const lastPhotoKeyRef = useRef<string | null>(null);
  const swipeStartRef = useRef<number | null>(null);

  const groupedEvents = useMemo(() => {
    const sorted = [...events].sort(
      (a, b) =>
        new Date(`${b.date}T00:00:00Z`).getTime() -
        new Date(`${a.date}T00:00:00Z`).getTime(),
    );
    return sorted.reduce<Record<string, SoiesEvent[]>>((groups, event) => {
      const month = monthLabel(event.date);
      groups[month] = groups[month] || [];
      groups[month].push(event);
      return groups;
    }, {});
  }, [events]);

  const step = (delta: number) => setLightbox((current) => stepPhoto(current, delta));
  const isOpen = lightbox !== null;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lightboxRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightbox(null);
      } else if (event.key === "ArrowLeft") {
        setLightbox((current) => stepPhoto(current, -1));
      } else if (event.key === "ArrowRight") {
        setLightbox((current) => stepPhoto(current, 1));
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      return;
    }
    if (lastPhotoKeyRef.current) {
      photoButtonRefs.current[lastPhotoKeyRef.current]?.focus();
    }
  }, [isOpen]);

  const openLightbox = (event: SoiesEvent, index: number) => {
    lastPhotoKeyRef.current = `${event.id}-${index}`;
    setLightbox({
      eventTitle: event.title,
      photos: event.photos,
      index,
    });
  };

  return (
    <>
      <div className="soies-timeline">
        {Object.entries(groupedEvents).map(([month, monthEvents]) => (
          <section className="soies-month grid" key={month}>
            <header className="soies-month__rail">
              <h3 className="soies-month__title">{month}</h3>
              <p className="soies-month__count mono">
                {monthEvents.length} {monthEvents.length === 1 ? "event" : "events"}
              </p>
            </header>
            <div className="soies-month__events">
              {monthEvents.map((event) => (
                <article className="soies-event" key={event.id} data-animate="">
                  <div className="soies-event-copy">
                    <p className="soies-event-meta mono">
                      <time dateTime={event.date}>{dateLabel(event.date)}</time>
                      <span className="soies-event-type">{event.type}</span>
                    </p>
                    <h4>{event.title}</h4>
                    {event.description && <p>{event.description}</p>}
                    {event.note && <p className="soies-event-note">{event.note}</p>}
                  </div>
                  {event.photos.length > 0 && (
                    <div className={`soies-event-photos soies-event-photos--${Math.min(event.photos.length, 3)}`}>
                      {event.photos.map((photo, index) => {
                        const photoKey = `${event.id}-${index}`;
                        return (
                          <button
                            className={index === 0 ? "soies-photo soies-photo-large" : "soies-photo soies-photo-thumb"}
                            type="button"
                            key={photoKey}
                            ref={(button) => {
                              photoButtonRefs.current[photoKey] = button;
                            }}
                            onClick={() => openLightbox(event, index)}
                            aria-label={`Open ${event.title}, photo ${index + 1} of ${event.photos.length}`}
                            data-animate="photo"
                            style={staggerStyle(index + 1)}
                          >
                            <Image
                              src={sanityImg(photo)}
                              alt=""
                              {...imageSize(photo)}
                              sizes={index === 0 ? "(min-width: 64rem) 32rem, 100vw" : "(min-width: 64rem) 12rem, 33vw"}
                            />
                            <span className="soies-photo__hint mono" aria-hidden="true">
                              View
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      {lightbox && (
        <div
          className="soies-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.eventTitle}
          tabIndex={-1}
          ref={lightboxRef}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setLightbox(null);
            }
          }}
          onPointerDown={(event) => {
            swipeStartRef.current = event.clientX;
          }}
          onPointerUp={(event) => {
            const start = swipeStartRef.current;
            swipeStartRef.current = null;
            if (start === null) return;
            const dx = event.clientX - start;
            if (Math.abs(dx) > 50 && lightbox.photos.length > 1) step(dx < 0 ? 1 : -1);
          }}
        >
          <div className="soies-lightbox-bar">
            <p className="soies-lightbox-title">{lightbox.eventTitle}</p>
            <button
              className="btn btn--outline soies-lightbox-close"
              type="button"
              aria-label="Close photo viewer"
              onClick={() => setLightbox(null)}
            >
              Close
            </button>
          </div>
          <div className="soies-lightbox-content">
            <Image
              key={lightbox.photos[lightbox.index]}
              className="soies-lightbox-image"
              src={sanityImg(lightbox.photos[lightbox.index])}
              alt={`${lightbox.eventTitle}, photo ${lightbox.index + 1}`}
              {...imageSize(lightbox.photos[lightbox.index])}
              sizes="100vw"
              loading="eager"
              draggable={false}
            />
          </div>
          {lightbox.photos.length > 1 && (
            <div className="soies-lightbox-controls">
              <button type="button" aria-label="Previous photo" onClick={() => step(-1)}>
                ← Previous
              </button>
              <span className="mono" aria-live="polite">
                {lightbox.index + 1} / {lightbox.photos.length}
              </span>
              <button type="button" aria-label="Next photo" onClick={() => step(1)}>
                Next →
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
