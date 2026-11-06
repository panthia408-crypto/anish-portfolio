import { curatedPhotos } from "../../data/gallery";
import { getCollegePhotos } from "../../lib/collegeGallery";
import Section from "../ui/Section";
import GalleryGrid from "./GalleryGrid";

export default async function Gallery() {
  const uploaded = await getCollegePhotos();

  return (
    <Section id="gallery" number="03" label="College gallery" title="College life, in pictures">
      <GalleryGrid photos={[...uploaded, ...curatedPhotos]} />
    </Section>
  );
}
