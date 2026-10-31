import type { Metadata } from "next";
import PageHeader from "../components/PageHeader";
import AboutBody from "../components/sections/AboutBody";
import { pageMetadata } from "../lib/metadata";
import "../styles/pages.css";
import "../styles/sections.css";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Anish Panthi, an 8th semester Industrial Engineering student at Thapathali Campus: root-cause thinking, wind turbine research, a student-made magazine, and a move into MEP.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main id="main-content" className="page">
      <PageHeader crumb="About" title="IE taught me to see everything as a system." />
      <AboutBody />
    </main>
  );
}
