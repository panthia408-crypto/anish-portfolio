import { sanityQuery } from "./sanity";

// Entries from the "MEP Learning Log" document type (studio/schemaTypes/learning.js).

export type LearningEntry = {
  _id: string;
  title: string;
  date: string;
  area?: string;
  source?: string;
  note?: string;
  link?: string;
  imageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
};

const LEARNING_FIELDS = `{
  _id,
  title,
  date,
  area,
  source,
  note,
  link,
  "imageUrl": image.asset->url,
  "imageWidth": image.asset->metadata.dimensions.width,
  "imageHeight": image.asset->metadata.dimensions.height
}`;

/** Newest entries first, up to `limit`. Returns an empty list if Sanity can't be reached, so the page still renders. */
export async function getLearningEntries(limit = 50): Promise<LearningEntry[]> {
  const query = `*[_type == "learningEntry" && defined(title) && defined(date)] | order(date desc)[0...${limit}]${LEARNING_FIELDS}`;
  try {
    return await sanityQuery<LearningEntry[]>(query);
  } catch {
    return [];
  }
}
