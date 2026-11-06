import { committee, imageSize, sanityImg } from "./soies-events";

// The home page "College gallery". Most photos come from the College gallery batches in Sanity
// (see app/lib/collegeGallery.ts). These photos of Anish from this site and the SOIES Nepal records
// are always included too.

export type GalleryCategory = "academic" | "extracurricular" | "visits";

export const galleryCategories: { value: GalleryCategory; label: string }[] = [
  { value: "academic", label: "Academic" },
  { value: "extracurricular", label: "Extracurricular" },
  { value: "visits", label: "Visits and tours" },
];

export type GalleryPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  /** Photos without a category only show under "All". */
  category?: GalleryCategory;
  /** Where to crop from, as a CSS object-position. */
  position?: string;
};

function soies(file: string, alt: string, caption: string, position?: string): GalleryPhoto {
  return { src: sanityImg(file), ...imageSize(file), alt, caption, category: "extracurricular", position };
}

export const curatedPhotos: GalleryPhoto[] = [
  {
    src: "/images/anish-portrait.jpg",
    width: 1080,
    height: 1080,
    alt: "Portrait of Anish Panthi wearing a dhaka topi and a navy blazer",
    caption: "Portrait",
    position: "50% 30%",
  },
  {
    ...soies(committee.presidentPhoto, "Anish Panthi in a black shirt with a campus lanyard, outdoors", "Committee portrait, SOIES Nepal", "50% 25%"),
    category: undefined,
  },
  soies(
    "ea98439ef518f8ac744f536c2454c93f49f8a2cf-1536x2048.jpg",
    "Anish Panthi seated at the conference table while the proposal slides are shown at the National Planning Commission",
    "Presenting the proposal, National Planning Commission, June 2026",
    "35% 60%",
  ),
  {
    src: "/images/anish-mechtrix-speech.jpg",
    width: 2400,
    height: 1600,
    alt: "Anish Panthi speaking at a podium on stage in front of the MechTRIX 2082 banner",
    caption: "Speaking at MechTRIX 2082, February 2026",
    category: "extracurricular",
    position: "30% 40%",
  },
  soies(
    "a9582b510576ccee358c887c9695beaa6c135646-2048x1536.jpg",
    "Anish Panthi with three SOIES Nepal members outside the National Planning Commission",
    "Outside the National Planning Commission, June 2026",
    "50% 40%",
  ),
  soies(
    "c6bc7a03df8f0bf7a3079a619e3f448842466c2e-6000x4000.jpg",
    "Anish Panthi reading Industrial Vision Vol. 11 between two guests at its launch",
    "Launch of Industrial Vision Vol. 11, August 2026",
    "50% 45%",
  ),
  soies(
    "27a346b38bd0c992c0a8fd4b090f3a777868f082-2048x1365.jpg",
    "Anish Panthi holding a plaque with a fellow student on the MechTRIX 2082 stage",
    "MechTRIX 2082, February 2026",
    "60% 35%",
  ),
  soies(
    "bff31df7941dee9f853c77303247d5984667e065-5184x3456.jpg",
    "Anish Panthi handing over a certificate on the MechTRIX 2082 stage",
    "Prize distribution, MechTRIX 2082",
    "45% 35%",
  ),
  soies(
    "b7e8d539937b24c7b493dd1c77481411273db400-1280x963.jpg",
    "Anish Panthi presenting a token of thanks to a guest at a SOIES Nepal workshop",
    "Research Paper Writing Workshop, October 2025",
    "40% 40%",
  ),
];
