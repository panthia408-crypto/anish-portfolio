"use client";

import Image from "next/image";
import { useMemo, useState, type CSSProperties } from "react";
import { imageSize, sanityImg, type SoiesEvent } from "../data/soies-events";
import Lightbox, { type LightboxPhoto } from "./ui/Lightbox";

type EventsTimelineProps = {
  events: SoiesEvent[];
};

type OpenPhoto = {
  title: string;
  photos: LightboxPhoto[];
  index: number;
};

type PhotoLayout = "single" | "lead" | "row";

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

function isLandscape(file: string) {
  const { width, height } = imageSize(file);
  return width >= height;
}

/** Leads with the first landscape photo, so the wide slot never crops a tall photo into a strip. */
function orderPhotos(photos: string[]) {
  const lead = photos.findIndex(isLandscape);
  return lead <= 0 ? photos : [photos[lead], ...photos.filter((_, index) => index !== lead)];
}

/** "lead": one wide photo over a row of the rest. "row": tall photos side by side. */
function layoutFor(photos: string[]): PhotoLayout {
  if (photos.length === 1) return "single";
  return isLandscape(photos[0]) ? "lead" : "row";
}

// The event column is about 56rem wide at full container width and 72vw between 64rem and 78rem.
function columnSizes(columns: number, mobileColumns = columns) {
  return [
    `(min-width: 78rem) ${Math.ceil(56 / columns)}rem`,
    `(min-width: 64rem) ${Math.ceil(72 / columns)}vw`,
    `(min-width: 40rem) ${Math.ceil(100 / columns)}vw`,
    `${Math.ceil(100 / mobileColumns)}vw`,
  ].join(", ");
}

function sizesFor(layout: PhotoLayout, index: number, count: number) {
  if (layout === "single") return "(min-width: 40rem) 28rem, 100vw";
  if (layout === "lead") return index === 0 ? columnSizes(1) : columnSizes(count - 1);
  return columnSizes(count, 2);
}

export default function EventsTimeline({ events }: EventsTimelineProps) {
  const [open, setOpen] = useState<OpenPhoto | null>(null);

  const groupedEvents = useMemo(() => {
    const sorted = [...events].sort(
      (a, b) => new Date(`${b.date}T00:00:00Z`).getTime() - new Date(`${a.date}T00:00:00Z`).getTime(),
    );
    return sorted.reduce<Record<string, SoiesEvent[]>>((groups, event) => {
      const month = monthLabel(event.date);
      groups[month] = groups[month] || [];
      groups[month].push(event);
      return groups;
    }, {});
  }, [events]);

  const openPhoto = (event: SoiesEvent, photos: string[], index: number) => {
    setOpen({
      title: event.title,
      index,
      photos: photos.map((photo, photoIndex) => ({
        src: sanityImg(photo),
        alt: `${event.title}, photo ${photoIndex + 1} of ${photos.length}`,
        ...imageSize(photo),
      })),
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
              {monthEvents.map((event) => {
                const photos = orderPhotos(event.photos);
                const layout = layoutFor(photos);
                const columns = layout === "lead" ? photos.length - 1 : photos.length;

                return (
                  <article className="soies-event" id={event.id} key={event.id} data-animate="">
                    <div className="soies-event-copy">
                      <p className="soies-event-meta mono">
                        <time dateTime={event.date}>{dateLabel(event.date)}</time>
                        <span className="soies-event-type">{event.type}</span>
                        <span className="soies-event-count">
                          {photos.length} {photos.length === 1 ? "photo" : "photos"}
                        </span>
                      </p>
                      <h4>{event.title}</h4>
                      {event.description && <p>{event.description}</p>}
                      {event.note && <p className="soies-event-note">{event.note}</p>}
                    </div>
                    {photos.length > 0 && (
                      <div
                        className={`soies-event-photos soies-event-photos--${layout}`}
                        style={{ "--n": columns } as CSSProperties}
                      >
                        {photos.map((photo, index) => {
                          const size = imageSize(photo);
                          const large = layout === "single" || (layout === "lead" && index === 0);
                          return (
                            <button
                              className={`soies-photo${large ? " soies-photo--lead" : ""}`}
                              type="button"
                              key={photo}
                              onClick={() => openPhoto(event, photos, index)}
                              aria-label={`Open ${event.title}, photo ${index + 1} of ${photos.length}`}
                              data-animate="photo"
                              style={{
                                ...staggerStyle(index + 1),
                                ...(layout === "single" ? { aspectRatio: `${size.width} / ${size.height}` } : {}),
                              }}
                            >
                              <Image
                                src={sanityImg(photo)}
                                alt=""
                                {...size}
                                sizes={sizesFor(layout, index, photos.length)}
                                quality={large ? 85 : 75}
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
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {open && (
        <Lightbox
          title={open.title}
          photos={open.photos}
          index={open.index}
          onIndexChange={(index) => setOpen((current) => (current ? { ...current, index } : current))}
          onClose={() => setOpen(null)}
        />
      )}
    </>
  );
}
