"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
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

export default function EventsTimeline({ events }: EventsTimelineProps) {
  const [lightbox, setLightbox] = useState<LightboxPhoto | null>(null);
  const photoButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const lightboxRef = useRef<HTMLDivElement>(null);
  const lastPhotoKeyRef = useRef<string | null>(null);

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

  useEffect(() => {
    if (!lightbox) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lightboxRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightbox(null);
      } else if (event.key === "ArrowLeft") {
        setLightbox((current) =>
          current
            ? {
                ...current,
                index:
                  (current.index - 1 + current.photos.length) %
                  current.photos.length,
              }
            : current,
        );
      } else if (event.key === "ArrowRight") {
        setLightbox((current) =>
          current
            ? {
                ...current,
                index: (current.index + 1) % current.photos.length,
              }
            : current,
        );
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightbox]);

  useEffect(() => {
    if (lightbox) {
      return;
    }
    if (lastPhotoKeyRef.current) {
      photoButtonRefs.current[lastPhotoKeyRef.current]?.focus();
    }
  }, [lightbox]);

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
          <section className="soies-month" key={month}>
            <h3 className="soies-month__title">{month}</h3>
            {monthEvents.map((event) => (
              <article className="soies-event" key={event.id}>
                <div className="soies-event-copy">
                  <time className="mono" dateTime={event.date}>{dateLabel(event.date)}</time>
                  <span className="soies-event-type mono">{event.type}</span>
                  <h4>{event.title}</h4>
                  {event.description && <p>{event.description}</p>}
                  {event.note && <p className="soies-event-note">{event.note}</p>}
                </div>
                {event.photos.length > 0 && (
                  <div className="soies-event-photos">
                    {event.photos.map((photo, index) => {
                      const photoKey = `${event.id}-${index}`;
                      return (
                        <button
                          className={
                            index === 0
                              ? "soies-photo soies-photo-large"
                              : "soies-photo soies-photo-thumb"
                          }
                          type="button"
                          key={photoKey}
                          ref={(button) => {
                            photoButtonRefs.current[photoKey] = button;
                          }}
                          onClick={() => openLightbox(event, index)}
                          aria-label={`Open ${event.title}, photo ${index + 1}`}
                        >
                          <Image
                            src={sanityImg(photo)}
                            alt={`${event.title}, photo ${index + 1}`}
                            {...imageSize(photo)}
                            sizes={index === 0 ? "(min-width: 64rem) 30rem, 100vw" : "(min-width: 64rem) 10rem, 33vw"}
                          />
                        </button>
                      );
                    })}
                  </div>
                )}
              </article>
            ))}
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
        >
          <button
            className="btn btn--outline soies-lightbox-close"
            type="button"
            aria-label="Close photo viewer"
            onClick={() => setLightbox(null)}
          >
            Close
          </button>
          <div className="soies-lightbox-content">
            <Image
              key={lightbox.photos[lightbox.index]}
              src={sanityImg(lightbox.photos[lightbox.index])}
              alt={`${lightbox.eventTitle}, photo ${lightbox.index + 1}`}
              {...imageSize(lightbox.photos[lightbox.index])}
              sizes="100vw"
              loading="eager"
            />
            <div className="soies-lightbox-controls">
              <button
                type="button"
                aria-label="Previous photo"
                onClick={() =>
                  setLightbox((current) =>
                    current
                      ? {
                          ...current,
                          index:
                            (current.index - 1 + current.photos.length) %
                            current.photos.length,
                        }
                      : current,
                  )
                }
              >
                Previous
              </button>
              <span className="mono">
                {lightbox.index + 1} / {lightbox.photos.length}
              </span>
              <button
                type="button"
                aria-label="Next photo"
                onClick={() =>
                  setLightbox((current) =>
                    current
                      ? {
                          ...current,
                          index: (current.index + 1) % current.photos.length,
                        }
                      : current,
                  )
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
