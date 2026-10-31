import type { Metadata } from "next";
import PageHeader from "../components/PageHeader";
import LearningLog, { learningDate } from "../components/sections/LearningLog";
import SpecList from "../components/ui/SpecList";
import { getLearningEntries } from "../lib/learning";
import { pageMetadata } from "../lib/metadata";
import "../styles/pages.css";
import "../styles/sections.css";

export const metadata: Metadata = pageMetadata({
  title: "Learning",
  description: "What Anish Panthi is learning in MEP and HVAC design, logged as he goes, starting with AutoCAD MEP.",
  path: "/learning",
});

export default async function LearningPage() {
  const entries = await getLearningEntries();

  return (
    <main id="main-content" className="page">
      <PageHeader
        crumb="Learning"
        title="What I'm learning in MEP"
        lede="Notes on HVAC and MEP design as I pick them up, starting with AutoCAD MEP."
      />
      <div className="learning grid container">
        <SpecList
          className="learning__specs col-rail"
          items={[
            { term: "Focus", value: "HVAC and MEP design" },
            { term: "Tool", value: "AutoCAD MEP" },
            { term: "Entries", value: String(entries.length) },
            ...(entries[0] ? [{ term: "Updated", value: learningDate(entries[0].date) }] : []),
          ]}
        />
        <div className="learning__log col-main">
          <LearningLog entries={entries} headingLevel="h2" />
        </div>
      </div>
    </main>
  );
}
