"use client";

import { useMemo, useState } from "react";
import { projectGroups, projects, type ProjectGroup } from "../data/projects";
import { ArrowLink } from "./ui/Links";
import { stagger } from "./ui/Reveal";

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
    <section className="entries container" aria-labelledby="entries-title">
      <h2 id="entries-title" className="sr-only">All projects</h2>
      <div className="entries__controls">
        <div className="entries__filters" role="group" aria-label="Filter projects by type">
          {projectGroups.map((group) => (
            <button
              type="button"
              className="entries__filter"
              aria-pressed={group === activeGroup}
              key={group}
              onClick={() => updateGroup(group)}
            >
              {group}
            </button>
          ))}
        </div>
        <label className="entries__search">
          <span className="label">Search</span>
          <input
            type="search"
            placeholder="Title, role or tag"
            value={search}
            onChange={(event) => updateSearch(event.target.value)}
          />
        </label>
      </div>

      <p className="entries__count mono" aria-live="polite">
        {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
      </p>

      {filteredProjects.length === 0 ? (
        <p className="entries__empty">Nothing matches that. Try a shorter word.</p>
      ) : (
        <ol className="entries__list">
          {visibleProjects.map((project, index) => (
            <li className="entry grid" key={project.id} id={project.id} data-animate="" style={stagger(index)}>
              <p className="entry__rail mono">
                <span className="entry__group">{project.group}</span>
                {project.period && <span>{project.period}</span>}
                <span>{project.status}</span>
              </p>
              <div className="entry__main">
                <h3 className="entry__title">{project.title}</h3>
                <p className="entry__role mono">{project.role}</p>
                <p className="entry__summary">{project.summary}</p>
                <p className="entry__tags mono">{project.tags.join(", ")}</p>
                {project.links && (
                  <p className="entry__links">
                    {project.links.map((link) => (
                      <ArrowLink href={link.href} key={link.href} external={link.external}>
                        {link.label}
                      </ArrowLink>
                    ))}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      )}

      {visibleCount < filteredProjects.length && (
        <button
          type="button"
          className="btn btn--outline entries__more"
          onClick={() => setVisibleCount((count) => count + 6)}
        >
          Show {Math.min(6, filteredProjects.length - visibleCount)} more
        </button>
      )}
    </section>
  );
}
