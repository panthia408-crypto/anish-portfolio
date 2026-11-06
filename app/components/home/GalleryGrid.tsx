"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { galleryCategories, type GalleryCategory, type GalleryPhoto } from "../../data/gallery";
import Lightbox from "../ui/Lightbox";
import { useReducedMotion } from "../ui/useReducedMotion";

/** How often one tile swaps for another photo. */
const SWAP_EVERY = 4500;
/** Tile shapes, in order. On a three-column grid each row is one wide and one narrow tile, swapping sides. */
const PATTERN = ["wide", "narrow", "narrow", "wide", "wide", "narrow"] as const;

type Shape = (typeof PATTERN)[number];
type Tile = { photo: GalleryPhoto; shape: Shape };
type Filter = "all" | GalleryCategory;

// The seed for the random mix. The server always renders seed 0 so the first paint matches,
// then the browser switches to its own seed, and Shuffle draws a new one.
let seed: number | null = null;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSeed() {
  if (seed === null) seed = 1 + Math.floor(Math.random() * 2 ** 31);
  return seed;
}

function reshuffle() {
  seed = 1 + Math.floor(Math.random() * 2 ** 31);
  listeners.forEach((listener) => listener());
}

/** Mulberry32, a tiny seeded random number generator: the same seed always gives the same mix. */
function seeded(value: number) {
  let state = value;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffled<T>(items: T[], random: () => number) {
  const out = [...items];
  for (let index = out.length - 1; index > 0; index--) {
    const swap = Math.floor(random() * (index + 1));
    [out[index], out[swap]] = [out[swap], out[index]];
  }
  return out;
}

const isWide = (photo: GalleryPhoto) => photo.width > photo.height;

/** Takes the first photo that suits the shape, or any photo if none does. */
function takeFor(shape: Shape, photos: GalleryPhoto[]) {
  const index = photos.findIndex((photo) => isWide(photo) === (shape === "wide"));
  return photos.splice(index === -1 ? 0 : index, 1)[0];
}

function pickTiles(value: number, pool: GalleryPhoto[]): Tile[] {
  const remaining = shuffled(pool, seeded(value));
  return PATTERN.slice(0, Math.min(PATTERN.length, pool.length)).map((shape) => ({
    shape,
    photo: takeFor(shape, remaining),
  }));
}

function sizesFor(shape: Shape, index: number, count: number) {
  if (shape === "wide") return "(min-width: 78rem) 50rem, (min-width: 40rem) 66vw, 100vw";
  // On phones the last narrow tile is alone on its row, so it runs the full width.
  const phone = index === count - 1 ? "100vw" : "50vw";
  return `(min-width: 78rem) 25rem, (min-width: 40rem) 33vw, ${phone}`;
}

export default function GalleryGrid({ photos }: { photos: GalleryPhoto[] }) {
  const value = useSyncExternalStore(subscribe, getSeed, () => 0);
  const reducedMotion = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("all");
  const [choice, setChoice] = useState<"play" | "pause" | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  // Tiles after live swaps, tagged with the mix they belong to. A new filter or shuffle starts a new mix.
  const [live, setLive] = useState<{ key: string; tiles: Tile[] } | null>(null);
  const hoveringRef = useRef(false);

  const playing = choice ? choice === "play" : !reducedMotion;
  const pool = useMemo(
    () => (filter === "all" ? photos : photos.filter((photo) => photo.category === filter)),
    [photos, filter],
  );
  const key = `${value}-${filter}`;
  const base = useMemo(() => pickTiles(value, pool), [value, pool]);
  const tiles = live && live.key === key ? live.tiles : base;

  const counts = useMemo(() => {
    const result: Record<Filter, number> = { all: photos.length, academic: 0, extracurricular: 0, visits: 0 };
    photos.forEach((photo) => {
      if (photo.category) result[photo.category] += 1;
    });
    return result;
  }, [photos]);

  // Every few seconds one tile, never the one under the pointer, fades to a photo not on screen yet.
  useEffect(() => {
    if (!playing || open !== null || pool.length <= base.length) return;
    const timer = window.setInterval(() => {
      if (hoveringRef.current || document.hidden) return;
      setLive((previous) => {
        const current = previous && previous.key === key ? previous.tiles : base;
        const shown = new Set(current.map((tile) => tile.photo.src));
        const spare = shuffled(
          pool.filter((photo) => !shown.has(photo.src)),
          Math.random,
        );
        if (spare.length === 0) return previous;
        const slot = Math.floor(Math.random() * current.length);
        const next = [...current];
        next[slot] = { shape: current[slot].shape, photo: takeFor(current[slot].shape, spare) };
        return { key, tiles: next };
      });
    }, SWAP_EVERY);
    return () => window.clearInterval(timer);
  }, [playing, open, pool, base, key]);

  return (
    <>
      <div className="gallery-filters" role="group" aria-label="Show photos from">
        {[{ value: "all" as Filter, label: "All" }, ...galleryCategories].map((option) => (
          <button
            key={option.value}
            type="button"
            className="gallery-filters__option"
            aria-pressed={filter === option.value}
            disabled={counts[option.value] === 0}
            onClick={() => setFilter(option.value)}
          >
            {option.label}
            <span className="gallery-filters__count mono">{counts[option.value]}</span>
          </button>
        ))}
      </div>

      <div
        className="gallery"

        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") hoveringRef.current = true;
        }}
        onPointerLeave={() => {
          hoveringRef.current = false;
        }}
      >
        {tiles.map((tile, index) => (
          <button
            key={`${index}-${tile.photo.src}`}
            type="button"
            className={`gallery__tile gallery__tile--${tile.shape}`}
            onClick={() => setOpen(pool.indexOf(tile.photo))}
            data-animate="photo"
            style={{ "--i": index } as CSSProperties}
          >
            <Image
              src={tile.photo.src}
              alt={tile.photo.alt}
              fill
              sizes={sizesFor(tile.shape, index, tiles.length)}
              quality={85}
              style={tile.photo.position ? { objectPosition: tile.photo.position } : undefined}
            />
            <span className="gallery__caption mono" aria-hidden="true">
              {tile.photo.caption}
            </span>
          </button>
        ))}
      </div>

      <div className="gallery__controls">
        <p className="gallery__note mono">
          {pool.length} {pool.length === 1 ? "photo" : "photos"} · tap one to see it full size
        </p>
        <button
          type="button"
          className="control-button mono"
          onClick={() => setChoice(playing ? "pause" : "play")}
          aria-label={playing ? "Pause the changing photos" : "Play the changing photos"}
        >
          <span className={`control-button__${playing ? "pause" : "play"}`} aria-hidden="true" />
          {playing ? "Pause" : "Play"}
        </button>
        <button type="button" className="control-button mono" onClick={reshuffle}>
          <span className="control-button__dice" aria-hidden="true" />
          Shuffle
        </button>
      </div>

      {open !== null && pool[open] && (
        <Lightbox
          title="College gallery"
          photos={pool}
          index={open}
          onIndexChange={setOpen}
          onClose={() => setOpen(null)}
        />
      )}
    </>
  );
}
