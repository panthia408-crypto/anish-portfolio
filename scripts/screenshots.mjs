// Full-page screenshots of every route at 375, 768 and 1440 px.
// Usage: node scripts/screenshots.mjs <outDir> [baseUrl] [--dark] [--only=/,/projects]
import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { chromium } from "playwright";

const args = process.argv.slice(2);
const outDir = args[0] ?? "screenshots";
const baseUrl = args.find((arg) => arg.startsWith("http")) ?? "http://localhost:3000";
const dark = args.includes("--dark");
const only = args.find((arg) => arg.startsWith("--only="))?.slice(7).split(",");

const routes = only ?? ["/", "/projects", "/journey", "/library", "/blog", "/soies"];
const widths = [375, 768, 1440];

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
const problems = [];

for (const width of widths) {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
    colorScheme: dark ? "dark" : "light",
  });
  const page = await context.newPage();
  page.on("console", (msg) => {
    if (msg.type() === "error") problems.push(`${width}px console: ${msg.text()}`);
  });
  page.on("pageerror", (err) => problems.push(`${width}px pageerror: ${err.message}`));

  for (const route of routes) {
    await page.goto(baseUrl + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(800); // let hydration finish before scrolling
    // Scroll through so scroll reveals and lazy images fire.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 300) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 120));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(600);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 0) problems.push(`${width}px ${route}: horizontal overflow ${overflow}px`);

    const name = `${route === "/" ? "home" : route.slice(1).replace(/\//g, "-")}-${width}${dark ? "-dark" : ""}.png`;
    await page.screenshot({ path: join(outDir, name), fullPage: true });
  }
  await context.close();
}

await browser.close();
console.log(problems.length ? problems.join("\n") : "No overflow or console errors.");
