// One-time script: saves every SOIES photo listed in app/data/soies-events.ts
// into public/soies/ so they are served from your own website forever.
//
// Run from the project root (anish-portfolio-next):
//   node scripts/download-soies-images.mjs

import fs from "node:fs/promises";
import path from "node:path";

const SRC = path.join("app", "data", "soies-events.ts");
const OUT = path.join("public", "soies");
const CDN = "https://cdn.sanity.io/images/bhcqd45q/production/";
const WIDTH = 1600; // longest side is limited to this many pixels
const QUALITY = 80;
const PARALLEL = 4;

let text;
try {
  text = await fs.readFile(SRC, "utf8");
} catch {
  console.error(`Cannot find ${SRC}. Run this from the project root and make sure the data file is in app/data.`);
  process.exit(1);
}

const files = [...new Set(text.match(/[0-9a-f]{40}-\d+x\d+\.(?:jpg|jpeg|png)/g) ?? [])];
console.log(`Found ${files.length} unique photos.`);
await fs.mkdir(OUT, { recursive: true });

let done = 0;
let skipped = 0;
const failed = [];

async function download(file) {
  const target = path.join(OUT, file);
  try {
    await fs.access(target);
    skipped++;
    return;
  } catch {
    // file does not exist yet, download it
  }
  const url = `${CDN}${file}?w=${WIDTH}&q=${QUALITY}`; // no auto=format, so the extension stays truthful
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(target, buf);
  done++;
  console.log(`saved ${file} (${Math.round(buf.length / 1024)} KB)`);
}

const queue = [...files];
async function worker() {
  while (queue.length) {
    const file = queue.shift();
    try {
      await download(file);
    } catch (err) {
      failed.push(`${file}: ${err.message}`);
    }
  }
}
await Promise.all(Array.from({ length: PARALLEL }, worker));

console.log(`\nDownloaded: ${done}, already there: ${skipped}, failed: ${failed.length}`);
if (failed.length) {
  console.log("Failed files:\n" + failed.join("\n"));
  process.exit(1);
}