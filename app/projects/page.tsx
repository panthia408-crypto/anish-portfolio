import type { Metadata } from "next";
import { pageMetadata } from "../lib/metadata";
import PageHeader from "../components/PageHeader";
import ProjectsList from "../components/ProjectsList";
import WorkRow from "../components/WorkRow";
import StatStrip from "../components/ui/StatStrip";
import { projectGroups, projects, type ProjectGroup } from "../data/projects";
import { soiesTerm } from "../data/work";
import "../styles/pages.css";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Projects, leadership and research by Anish Panthi, an Industrial Engineering student at Thapathali Campus.",
  path: "/projects",
});

const groupLabels: Record<ProjectGroup, [string, string]> = {
  Publication: ["publication", "publications"],
  Research: ["research project", "research projects"],
  Leadership: ["leadership role", "leadership roles"],
  Events: ["event or program", "events and programs"],
  Web: ["website", "websites"],
};

const groupStats = projectGroups
  .filter((group): group is ProjectGroup => group !== "All")
  .map((group) => {
    const count = projects.filter((project) => project.group === group).length;
    return { figure: String(count), label: groupLabels[group][count === 1 ? 0 : 1] };
  });

export default function ProjectsPage() {
  return (
    <main id="main-content" className="page">
      <PageHeader
        crumb="Work"
        title="Work"
        lede="Everything I've made, led or helped run, from a printed magazine to an engineering fest."
      />

      <div className="container">
        <StatStrip className="projects-stats" stats={groupStats} />
        <ul className="work-list work-list--page">
          <WorkRow variant="feature" number="00" id="soies" headingLevel="h2" {...soiesTerm} />
        </ul>
      </div>

      <ProjectsList />
    </main>
  );
}
