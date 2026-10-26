"use client";

import { useMemo, useState } from "react";
import { projectGroups, projects, type ProjectGroup } from "../data/projects";
import "../css/projects-list.css";

export default function ProjectsList() {
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState<"All" | ProjectGroup>("All");
  const [visibleCount, setVisibleCount] = useState(9);

  const filteredProjects = useMemo(() => {
    const query = search.toLowerCase().trim();
    return projects.filter((project) => {
      const matchesGroup = activeGroup === "All" || project.group === activeGroup;
      const searchable = [
        project.title,
        project.role,
        project.status,
        project.summary,
        ...project.tags,
      ].join(" ").toLowerCase();
      return matchesGroup && (!query || searchable.includes(query));
    });
  }, [activeGroup, search]);

  const visibleProjects = filteredProjects.slice(0, visibleCount);

  const updateSearch = (value: string) => {
    setSearch(value);
    setVisibleCount(9);
  };

  const updateGroup = (group: "All" | ProjectGroup) => {
    setActiveGroup(group);
    setVisibleCount(9);
  };

  return (
    <section className="projects-list site-container" aria-label="Projects">
      <div className="pl-controls">
        <label className="sr-only" htmlFor="project-search">Search projects</label>
        <input
          id="project-search"
          type="search"
          aria-label="Search projects"
          placeholder="Search projects"
          value={search}
          onChange={(event) => updateSearch(event.target.value)}
        />
        <div className="pl-filters" aria-label="Filter projects">
          {projectGroups.map((group) => (
            <button
              type="button"
              className={group === activeGroup ? "is-active" : undefined}
              aria-pressed={group === activeGroup}
              key={group}
              onClick={() => updateGroup(group)}
            >
              {group}
            </button>
          ))}
        </div>
      </div>

      <p className="pl-results" aria-live="polite">
        {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
      </p>

      {filteredProjects.length === 0 ? (
        <p className="pl-empty">No projects match your search.</p>
      ) : (
        <div className="pl-grid">
          {visibleProjects.map((project) => (
            <article className="pl-card" key={project.id}>
              <span className="pl-group">{project.group}</span>
              <h3>{project.title}</h3>
              <p className="pl-role">{project.role}</p>
              <p className="pl-status">
                {project.status}{project.period ? ` | ${project.period}` : ""}
              </p>
              <p className="pl-summary">{project.summary}</p>
              <p className="pl-tags">{project.tags.join(" · ")}</p>
              {project.links && (
                <div className="pl-links">
                  {project.links.map((link) => (
                    <a
                      href={link.href}
                      key={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                    >
                      {link.label} <span aria-hidden="true">→</span>
                    </a>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      )}

      {visibleCount < filteredProjects.length && (
        <button
          type="button"
          className="pl-show-more"
          onClick={() => setVisibleCount((count) => count + 6)}
        >
          Show more
        </button>
      )}
    </section>
  );
}
