import type { Metadata } from "next";
import PageHeader from "../components/PageHeader";
import ProjectsList from "../components/ProjectsList";
import SiteNav from "../components/SiteNav";
import WorkRow from "../components/WorkRow";
import { soiesTerm } from "../data/work";
import "../styles/pages.css";

export const metadata: Metadata = {
  title: "Work | Anish Panthi",
  description:
    "Projects, leadership and research by Anish Panthi, an Industrial Engineering student at Thapathali Campus.",
};

export default function ProjectsPage() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <SiteNav active="/projects" />

      <main id="main-content" className="page">
        <PageHeader
          crumb="Work"
          title="Work"
          lede="Everything I've made, led or helped run, from a printed magazine to an engineering fest."
        />

        <div className="container">
          <ul className="work-list work-list--page">
            <WorkRow variant="feature" number="00" id="soies" headingLevel="h2" {...soiesTerm} />
          </ul>
        </div>

        <ProjectsList />
      </main>
    </>
  );
}
