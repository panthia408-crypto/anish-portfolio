import { cacheLife } from "next/cache";

// Read-only access to the portfolio's Sanity dataset over the public HTTP API.
// Same project, dataset and API version as studio/sanity.config.js and the old client scripts.
const PROJECT_ID = "e7hia29y";
const DATASET = "production";
const API_VERSION = "v2021-10-21";

export async function sanityQuery<T>(query: string): Promise<T> {
  "use cache";
  cacheLife("hours");

  const url = `https://${PROJECT_ID}.api.sanity.io/${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Sanity query failed with ${response.status}`);
  }
  const { result } = (await response.json()) as { result: T };
  return result;
}
