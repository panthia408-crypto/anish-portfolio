import type { Metadata } from "next";
import { site } from "../data/site";

/** Title, description, canonical URL and social cards for one page. */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const fullTitle = `${title} · ${site.name}`;
  // A page-level openGraph replaces the root one, so the shared card from app/opengraph-image.tsx is listed again.
  const images = [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name}, Industrial Engineering student` }];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: site.name, locale: "en_US", title: fullTitle, description, url: path, images },
    twitter: { card: "summary_large_image", title: fullTitle, description, images },
  };
}
