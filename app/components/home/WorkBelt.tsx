"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import type { BeltItem, BeltShape } from "../../data/work";
import { useReducedMotion } from "../ui/useReducedMotion";

/** Drift speed in pixels per second. */
const SPEED = 36;
/** The cards are rendered three times. The middle copy is the real, focusable one; the outer two let it loop. */
const COPIES = 3;
/** How far a pointer has to move sideways before a press turns into a drag. */
const DRAG_THRESHOLD = 6;
/** After a touch, drag or sideways scroll, the belt waits this long before it drifts again. */
const RESUME_AFTER = 2400;

const ratios: Record<BeltShape, number> = {
  a4: 210 / 297,
  landscape: 4 / 3,
  portrait: 3 / 4,
  screen: 16 / 10,
};

// Card widths follow --belt-h in home.css: 15rem tall on phones, up to 24rem on wide screens.
const sizes: Record<BeltShape, string> = {
  a4: "(min-width: 64rem) 17rem, 45vw",
  landscape: "(min-width: 64rem) 32rem, 85vw",
  portrait: "(min-width: 64rem) 18rem, 48vw",
  screen: "(min-width: 64rem) 39rem, 100vw",
};

function CardLink({ item, hidden, children }: { item: BeltItem; hidden: boolean; children: ReactNode }) {
  const tabIndex = hidden ? -1 : undefined;
  if (item.external) {
    return (
      <a
        className="belt__card"
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={tabIndex}
        draggable={false}
      >
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link className="belt__card" href={item.href} tabIndex={tabIndex} draggable={false}>
      {children}
    </Link>
  );
}

/**
 * The work cards on a conveyor belt. It drifts sideways on its own and loops forever. Hovering or
 * keyboard focus holds it, it can be dragged, flicked and scrolled sideways, and the button pauses it.
 * A drag never counts as a click, so only a clean click opens a card.
 */
export default function WorkBelt({ items }: { items: BeltItem[] }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const reducedMotion = useReducedMotion();
  const [choice, setChoice] = useState<"play" | "pause" | null>(null);
  const playing = choice ? choice === "play" : !reducedMotion;
  const playingRef = useRef(playing);

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    let start = 0; // where the track begins inside the belt (it lines up with the page column)
    let loop = 0; // width of one copy of the cards, gaps included
    let offset = 0; // how far the track is moved left; a card at x in the track shows at start + x - offset
    let speed = 0;
    let velocity = 0;
    let glideTo: number | null = null;
    let hovering = false;
    let pressed = false;
    let focusInside = false;
    let holdUntil = 0;
    let visible = false;
    let frame = 0;
    let last = 0;

    let pointerId: number | null = null;
    let startX = 0;
    let startY = 0;
    let startOffset = 0;
    let dragging = false;
    let suppressClick = false;
    let samples: { x: number; t: number }[] = [];

    const measure = () => {
      const first = track.children[0] as HTMLElement | undefined;
      const second = track.children[items.length] as HTMLElement | undefined;
      if (!first || !second) return;
      const nextLoop = second.offsetLeft - first.offsetLeft;
      const nextStart = track.offsetLeft;
      if (nextLoop <= 0) return;
      // The first time, offset becomes one loop, which shows the middle copy exactly where the server
      // put the first one. After a resize, the belt keeps its place in the loop.
      const phase = loop > 0 ? (offset - start) / loop : 1 - nextStart / nextLoop;
      start = nextStart;
      loop = nextLoop;
      offset = start + phase * loop;
    };

    // Keep the offset in [start, start + 2 * loop): the screen is then always covered by cards,
    // as long as one copy is at least as wide as the screen (eight cards are).
    const wrap = () => {
      if (loop <= 0) return;
      let shift = 0;
      while (offset + shift >= start + 2 * loop) shift -= loop;
      while (offset + shift < start) shift += loop;
      if (shift !== 0) {
        offset += shift;
        startOffset += shift;
        if (glideTo !== null) glideTo += shift;
      }
    };

    const paint = () => {
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
    };

    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;

      if (!dragging) {
        if (glideTo !== null) {
          const remaining = glideTo - offset;
          offset += remaining * (1 - Math.exp(-dt * 9));
          if (Math.abs(remaining) < 0.5) {
            offset = glideTo;
            glideTo = null;
          }
          speed = 0;
        } else if (Math.abs(velocity) > 8) {
          offset += velocity * dt;
          velocity *= Math.exp(-dt * 3.2);
          speed = 0;
        } else {
          velocity = 0;
          const drift = playingRef.current && !hovering && !pressed && !focusInside && now >= holdUntil;
          // Ease in and out of the drift instead of starting or stopping dead.
          speed += ((drift ? SPEED : 0) - speed) * (1 - Math.exp(-dt * 2.5));
          offset += speed * dt;
        }
      }

      wrap();
      paint();
      frame = requestAnimationFrame(tick);
    };

    const run = () => {
      if (frame || !visible || document.hidden) return;
      last = 0;
      frame = requestAnimationFrame(tick);
    };

    const halt = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      pointerId = event.pointerId;
      startX = event.clientX;
      startY = event.clientY;
      startOffset = offset;
      dragging = false;
      pressed = true;
      velocity = 0;
      glideTo = null;
      samples = [{ x: event.clientX, t: event.timeStamp }];
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return;
      const dx = event.clientX - startX;
      if (!dragging) {
        const dy = event.clientY - startY;
        if (Math.abs(dx) < DRAG_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;
        dragging = true;
        viewport.setPointerCapture(event.pointerId);
        viewport.classList.add("is-dragging");
      }
      offset = startOffset - dx;
      samples.push({ x: event.clientX, t: event.timeStamp });
      if (samples.length > 5) samples.shift();
    };

    const onPointerEnd = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return;
      pointerId = null;
      pressed = false;
      if (event.pointerType !== "mouse") holdUntil = performance.now() + RESUME_AFTER;
      if (!dragging) return;

      dragging = false;
      viewport.classList.remove("is-dragging");
      if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
      holdUntil = performance.now() + RESUME_AFTER;

      if (event.type === "pointerup") {
        // Fling: keep the speed of the last tenth of a second of the drag.
        const recent = samples.filter((sample) => event.timeStamp - sample.t < 120);
        if (recent.length > 1) {
          const first = recent[0];
          const latest = recent[recent.length - 1];
          const seconds = (latest.t - first.t) / 1000;
          if (seconds > 0) velocity = Math.max(-4000, Math.min(4000, -(latest.x - first.x) / seconds));
        }
        // The click that follows a drag must not open the card under the pointer.
        suppressClick = true;
        window.setTimeout(() => {
          suppressClick = false;
        }, 0);
      }
    };

    const onClickCapture = (event: MouseEvent) => {
      if (!suppressClick) return;
      suppressClick = false;
      event.preventDefault();
      event.stopPropagation();
    };

    const onWheel = (event: WheelEvent) => {
      const sideways = Math.abs(event.deltaX) > Math.abs(event.deltaY);
      if (!sideways && !event.shiftKey) return; // an ordinary wheel turn scrolls the page
      event.preventDefault();
      const unit = event.deltaMode === 1 ? 32 : event.deltaMode === 2 ? viewport.clientWidth : 1;
      offset += (sideways ? event.deltaX : event.deltaY) * unit;
      velocity = 0;
      glideTo = null;
      holdUntil = performance.now() + RESUME_AFTER;
    };

    const onPointerEnter = (event: PointerEvent) => {
      if (event.pointerType === "mouse") hovering = true;
    };

    const onPointerLeave = (event: PointerEvent) => {
      if (event.pointerType === "mouse") hovering = false;
    };

    // Keyboard focus holds the belt and glides the focused card to the middle. A mouse click also
    // focuses a link, but that shouldn't stop the belt, so only :focus-visible counts.
    const onFocusIn = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLElement) || !target.matches(":focus-visible")) return;
      const card = target.closest<HTMLElement>(".belt__item");
      if (!card) return;
      focusInside = true;
      velocity = 0;
      glideTo = start + card.offsetLeft - Math.max(0, (viewport.clientWidth - card.offsetWidth) / 2);
    };

    const onFocusOut = (event: FocusEvent) => {
      const next = event.relatedTarget;
      if (next instanceof Node && viewport.contains(next)) return;
      focusInside = false;
      holdUntil = performance.now() + RESUME_AFTER;
    };

    // The belt clips instead of scrolling, but if a browser scrolls it anyway, undo that.
    const onScroll = () => {
      if (viewport.scrollLeft !== 0) viewport.scrollLeft = 0;
    };

    const onVisibilityChange = () => (document.hidden ? halt() : run());

    viewport.dataset.live = "";
    viewport.scrollLeft = 0;
    measure();
    paint();

    const resizeObserver = new ResizeObserver(() => {
      measure();
      wrap();
      paint();
    });
    resizeObserver.observe(track);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) run();
        else halt();
      },
      { rootMargin: "120px 0px" },
    );
    intersectionObserver.observe(viewport);

    viewport.addEventListener("pointerdown", onPointerDown);
    viewport.addEventListener("pointermove", onPointerMove);
    viewport.addEventListener("pointerup", onPointerEnd);
    viewport.addEventListener("pointercancel", onPointerEnd);
    viewport.addEventListener("pointerenter", onPointerEnter);
    viewport.addEventListener("pointerleave", onPointerLeave);
    viewport.addEventListener("click", onClickCapture, true);
    viewport.addEventListener("wheel", onWheel, { passive: false });
    viewport.addEventListener("focusin", onFocusIn);
    viewport.addEventListener("focusout", onFocusOut);
    viewport.addEventListener("scroll", onScroll);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      halt();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("pointermove", onPointerMove);
      viewport.removeEventListener("pointerup", onPointerEnd);
      viewport.removeEventListener("pointercancel", onPointerEnd);
      viewport.removeEventListener("pointerenter", onPointerEnter);
      viewport.removeEventListener("pointerleave", onPointerLeave);
      viewport.removeEventListener("click", onClickCapture, true);
      viewport.removeEventListener("wheel", onWheel);
      viewport.removeEventListener("focusin", onFocusIn);
      viewport.removeEventListener("focusout", onFocusOut);
      viewport.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [items.length]);

  return (
    <div className="belt-wrap">
      <div className="belt" ref={viewportRef} role="region" aria-roledescription="carousel" aria-label="Work">
        <ul className="belt__track" ref={trackRef}>
          {Array.from({ length: COPIES }, (_, copy) =>
            items.map((item) => {
              const hidden = copy !== 1;
              return (
                <li
                  key={`${copy}-${item.id}`}
                  className={`belt__item belt__item--${item.shape}`}
                  aria-hidden={hidden || undefined}
                  style={{ "--ratio": ratios[item.shape] } as CSSProperties}
                >
                  <CardLink item={item} hidden={hidden}>
                    <span className="belt__media">
                      <Image
                        src={item.image.src}
                        alt=""
                        width={item.image.width}
                        height={item.image.height}
                        sizes={sizes[item.shape]}
                        draggable={false}
                        style={item.image.position ? { objectPosition: item.image.position } : undefined}
                      />
                    </span>
                    <span className="belt__caption">
                      <span className="belt__meta mono">{item.meta}</span>
                      <h3 className="belt__title">{item.title}</h3>
                    </span>
                  </CardLink>
                </li>
              );
            }),
          )}
        </ul>
      </div>
      <div className="container belt__controls">
        <button
          type="button"
          className="control-button mono"
          onClick={() => setChoice(playing ? "pause" : "play")}
          aria-label={playing ? "Pause the moving work cards" : "Play the moving work cards"}
        >
          <span className={`control-button__${playing ? "pause" : "play"}`} aria-hidden="true" />
          {playing ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
}
