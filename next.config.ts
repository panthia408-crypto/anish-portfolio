import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Learning log images uploaded in Sanity Studio.
    remotePatterns: [new URL("https://cdn.sanity.io/images/e7hia29y/production/**")],
  },
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/work.html", destination: "/projects", permanent: true },
      { source: "/timeline.html", destination: "/journey", permanent: true },
      { source: "/certifications.html", destination: "/journey", permanent: true },
      { source: "/library.html", destination: "/#learning", permanent: true },
      { source: "/library", destination: "/#learning", permanent: true },
      { source: "/blog.html", destination: "/blog", permanent: true },
      { source: "/events.html", destination: "/soies", permanent: true },
    ];
  },
};

export default nextConfig;
