import type { GalleryCategory, GalleryPhoto } from "../data/gallery";
import { sanityQuery } from "./sanity";

// Photos from the "College gallery" document type (studio/schemaTypes/collegeAlbum.js).

type AlbumRow = {
  title?: string;
  category?: GalleryCategory;
  photos?: {
    caption?: string;
    category?: GalleryCategory;
    url?: string;
    width?: number;
    height?: number;
    hotspot?: { x: number; y: number };
  }[];
};

const QUERY = `*[_type == "collegeAlbum" && defined(category)] | order(date desc){
  title,
  category,
  "photos": photos[]{
    caption,
    category,
    hotspot,
    "url": asset->url,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height
  }
}`;

/** Every uploaded college photo, newest batch first. Empty if Sanity can't be reached, so the page still renders. */
export async function getCollegePhotos(): Promise<GalleryPhoto[]> {
  let albums: AlbumRow[];
  try {
    albums = await sanityQuery<AlbumRow[]>(QUERY);
  } catch {
    return [];
  }

  return albums.flatMap((album) =>
    (album.photos ?? [])
      .filter((photo) => photo.url && photo.width && photo.height)
      .map((photo) => {
        const caption = photo.caption?.trim() || album.title || "College life";
        return {
          src: photo.url!,
          width: photo.width!,
          height: photo.height!,
          alt: caption,
          caption,
          category: photo.category ?? album.category,
          // Crop around the hotspot set in the studio, if any.
          position: photo.hotspot
            ? `${Math.round(photo.hotspot.x * 100)}% ${Math.round(photo.hotspot.y * 100)}%`
            : undefined,
        };
      }),
  );
}
