import type { Metadata } from "next";
import AboutTeaser from "./components/home/AboutTeaser";
import Contact from "./components/home/Contact";
import Hero from "./components/home/Hero";
import LearningTeaser from "./components/home/LearningTeaser";
import ResearchTeaser from "./components/home/ResearchTeaser";
import Work from "./components/home/Work";
import Writing from "./components/home/Writing";
import { site, socials } from "./data/site";
import "./styles/sections.css";
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

      <ResearchTeaser />

      <Work />

      <AboutTeaser />

      <LearningTeaser />

      <Writing />

      <Contact />
    </main>
  );
}
