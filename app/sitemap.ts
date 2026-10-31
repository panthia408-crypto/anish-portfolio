import type { MetadataRoute } from "next";
import { site } from "./data/site";

const routes = ["/", "/research", "/projects", "/blog", "/about", "/learning", "/journey", "/soies"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.url}${route === "/" ? "" : route}`,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
