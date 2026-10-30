import type { LibraryNote } from "../data/library";
import { sanityQuery } from "./sanity";

// Same GROQ query as the old public/js/library-logic.js.
const NOTES_QUERY = `*[_type == "note"]{
  category,
  semesterName,
  subjects[]{
    title,
    externalLink
  }
}`;

/** Returns null when Sanity can't be reached, so the page can say so instead of showing empty shelves. */
export async function getLibraryNotes(): Promise<LibraryNote[] | null> {
  try {
    return await sanityQuery<LibraryNote[]>(NOTES_QUERY);
  } catch {
    return null;
  }
}
