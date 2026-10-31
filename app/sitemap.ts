import type { MetadataRoute } from "next";
import { site } from "./data/site";

const routes = ["/", "/projects", "/blog", "/journey", "/soies"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.url}${route === "/" ? "" : route}`,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
