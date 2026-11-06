import { events, imageSize, sanityImg } from "./soies-events";

// The SOIES presidency, shown as a feature row at the top of /projects.
// Text comes from the existing /projects feature and the journey timeline.

export const soiesTerm = {
  category: "Leadership",
  period: "2025 to 2026",
  title: "SOIES Nepal, 18th Executive Committee",
  summary: `My term as President: ${events.length} events, a job fair, an industry MOU we coordinated with Nebico Limited, and a research partnership proposal to the National Planning Commission.`,
  role: "President",
  href: "/soies",
  image: {
    src: "/soies/ce5c800ac9d6f255a5799eee42775443fe8124a9-6000x4000.jpg",
    alt: "The 18th Executive Committee of SOIES Nepal",
    width: 6000,
    height: 4000,
  },
};

// The home page work belt: one picture and two short lines per card, and the whole card is the link.
// "a4" shows a full magazine page, "screen" a website, "landscape" and "portrait" are cropped photos.

export type BeltShape = "a4" | "landscape" | "portrait" | "screen";

export type BeltItem = {
  id: string;
  title: string;
  meta: string;
  href: string;
  external?: boolean;
  shape: BeltShape;
  image: { src: string; width: number; height: number; position?: string };
};

function soiesPhoto(file: string, position?: string) {
  return { src: sanityImg(file), ...imageSize(file), position };
}

export const beltItems: BeltItem[] = [
  {
    id: "industrial-vision-11",
    title: "Industrial Vision Vol. 11",
    meta: "Magazine · 2026",
    href: "/blog",
    shape: "a4",
    image: { src: "/files/industrial-vision-vol11-cover.jpg", width: 1800, height: 2545 },
  },
  {
    id: "soies-committee",
    title: "SOIES Nepal, 18th Committee",
    meta: "President · 2025 to 2026",
    href: "/soies",
    shape: "landscape",
    image: soiesPhoto("ce5c800ac9d6f255a5799eee42775443fe8124a9-6000x4000.jpg"),
  },
  {
    id: "npc-proposal",
    title: "Proposal to the National Planning Commission",
    meta: "Policy · June 2026",
    href: "/soies#npc-proposal-submission",
    shape: "landscape",
    image: soiesPhoto("e5f7f6377407baeafd2a8cb9d5a489cdb355d0cd-2048x1536.jpg", "50% 70%"),
  },
  {
    id: "nebico-mou",
    title: "MOU with Nebico Limited",
    meta: "Industry · February 2026",
    href: "/soies#job-fair-nebico-mou",
    shape: "portrait",
    image: soiesPhoto("4e2a2f26097015a577a7f01bc2dd63934b217627-2252x4000.jpg", "50% 55%"),
  },
  {
    id: "mechtrix-2082",
    title: "MechTRIX 2082",
    meta: "Exhibition · February 2026",
    href: "/soies#mechtrix-2082",
    shape: "landscape",
    image: soiesPhoto("1e0b578778adebedc0fca4396fb9fd292079702b-5184x3456.jpg"),
  },
  {
    id: "yathartha-3",
    title: "Yathartha 3.0",
    meta: "Engineering fest · January 2026",
    href: "/soies#project-demonstration-yatharth",
    shape: "landscape",
    image: soiesPhoto("2631f83a73902a156003948950a4fac3b1bfd09c-3936x2624.jpg", "40% 50%"),
  },
  {
    id: "higher-education-fair",
    title: "12th Nepal Higher Education Fair",
    meta: "Outreach · July 2026",
    href: "/soies#higher-education-fair",
    shape: "landscape",
    image: soiesPhoto("4ced84088d4ecab23d853984b574b83de2481543-2048x1536.jpg", "50% 60%"),
  },
  {
    id: "soies-website",
    title: "soiesnepal.org.np",
    meta: "Website · Next.js and Sanity",
    href: "https://soiesnepal.org.np",
    external: true,
    shape: "screen",
    image: { src: "/images/soies-website.jpg", width: 2160, height: 1350, position: "50% 0%" },
  },
];
