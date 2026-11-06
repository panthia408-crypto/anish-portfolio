import type { Metadata } from "next";
import Contact from "./components/home/Contact";
import Gallery from "./components/home/Gallery";
import Hero from "./components/home/Hero";
import Publication from "./components/home/Publication";
import Work from "./components/home/Work";
import { site, socials } from "./data/site";
import "./styles/home.css";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  image: `${site.url}/images/anish-portrait.jpg`,
  jobTitle: "Industrial Engineering student",
  email: `mailto:${site.email}`,
  homeLocation: { "@type": "Place", name: "Malarani-5, Arghakhanchi, Nepal" },
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "Thapathali Campus, Institute of Engineering, Tribhuvan University",
    address: { "@type": "PostalAddress", addressLocality: "Kathmandu", addressCountry: "NP" },
  },
  knowsAbout: ["Industrial Engineering", "Wind turbine design", "Editorial design", "AutoCAD MEP"],
  sameAs: socials.map((social) => social.href),
};

export default function Home() {
  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />

      <Work />

      <Publication />

      <Gallery />

      <Contact />
    </main>
  );
}
