"use client";

import { useMemo, useState } from "react";
import { resourcesForShelf, shelves, type LibraryNote, type Resource } from "../data/library";
import { stagger } from "./ui/Reveal";

function ResourceList({ resources }: { resources: Resource[] }) {
  return (
    <ul className="shelf__resources">
      {resources.map((resource) => (
        <li key={`${resource.shelf}-${resource.title}`}>
          {resource.url ? (
            <a className="arrow-link" href={resource.url} target="_blank" rel="noopener noreferrer">
              <span className="arrow-link__text">{resource.title}</span>
              <span className="arrow-link__glyph" aria-hidden="true">
                ↗
              </span>
            </a>
          ) : (
            resource.title
          )}
          {resource.shelf && <span className="shelf__resource-shelf mono">{resource.shelf}</span>}
        </li>
      ))}
    </ul>
  );
}

export default function LibraryBrowser({ notes }: { notes: LibraryNote[] | null }) {
  const [query, setQuery] = useState("");
  const q = query.toLowerCase().trim();

  const shelfResources = useMemo(
    () => new Map(shelves.map((shelf) => [shelf.key, notes ? resourcesForShelf(notes, shelf.key) : []])),
    [notes],
  );

  const matches = useMemo(() => {
    if (!notes || q.length < 2) return [];
    return notes.flatMap((doc) =>
      (doc.subjects ?? [])
        .filter((subject) => subject.title?.toLowerCase().includes(q))
        .map((subject) => ({ title: subject.title ?? "", url: subject.externalLink, shelf: doc.semesterName ?? "" })),
    );
  }, [notes, q]);

  const visibleShelves = shelves.filter(
    (shelf) => !q || `${shelf.label} ${shelf.subtitle ?? ""} ${shelf.number}`.toLowerCase().includes(q),
  );

  if (!notes) {
    return (
      <p className="library__error">
        The library couldn&apos;t load right now. Try again in a few minutes.
      </p>
    );
  }

  return (
    <div className="library">
      <label className="entries__search library__search">
        <span className="label">Search semesters or subjects</span>
        <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} />
      </label>

      {matches.length > 0 && (
        <section className="library__matches" aria-labelledby="library-matches-title">
          <h2 id="library-matches-title" className="label">
            Matching subjects ({matches.length})
          </h2>
          <ResourceList resources={matches} />
        </section>
      )}

      <p className="entries__count mono" aria-live="polite">
        {q.length >= 2 && matches.length === 0 && visibleShelves.length === 0
          ? "Nothing matches that. Try a shorter word."
          : `${visibleShelves.length} shelves`}
      </p>

      <ul className="shelves">
        {visibleShelves.map((shelf, index) => {
          const resources = shelfResources.get(shelf.key) ?? [];
          return (
            <li key={shelf.key} data-animate="" style={stagger(index)}>
              <details className="shelf">
                <summary className="shelf__summary grid">
                  <span className="shelf__num mono">{shelf.number}</span>
                  <span className="shelf__label">
                    <span className="shelf__title">{shelf.label}</span>
                    {shelf.subtitle && <span className="shelf__subtitle mono">{shelf.subtitle}</span>}
                  </span>
                  <span className="shelf__count mono">
                    {resources.length === 0 ? "Nothing yet" : `${resources.length} ${resources.length === 1 ? "resource" : "resources"}`}
                  </span>
                </summary>
                <div className="shelf__body grid">
                  <div className="col-main">
                    {resources.length > 0 ? (
                      <ResourceList resources={resources} />
                    ) : (
                      <p className="shelf__empty">No resources on this shelf yet.</p>
                    )}
                  </div>
                </div>
              </details>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
