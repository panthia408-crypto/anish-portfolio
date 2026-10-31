import type { Metadata } from "next";
import PageHeader from "../components/PageHeader";
import ResearchBody from "../components/sections/ResearchBody";
import { pageMetadata } from "../lib/metadata";
import { research } from "../data/research";
import "../styles/pages.css";
import "../styles/sections.css";

export const metadata: Metadata = pageMetadata({
  title: "Research",
  description:
    "Final year research by Anish Panthi: how the vent area and ratio at the center of an omnidirectional wind turbine affect its torque and power output.",
  path: "/research",
});

export default function ResearchPage() {
  return (
    <main id="main-content" className="page">
      <PageHeader crumb="Research" title={research.title} lede={research.summary} />
      <ResearchBody />
    </main>
  );
}
