// Shelves of The Engineer's Library. Resources come from Sanity "note" documents (studio/schemaTypes/note.js).

export type LibraryNote = {
  category?: string;
  semesterName?: string;
  subjects?: { title?: string; externalLink?: string }[];
};

export type Shelf = { key: string; number: string; label: string; subtitle?: string };

export type Resource = { title: string; url?: string; shelf: string };

export const shelves: Shelf[] = [
  { key: "1", number: "01", label: "Semester I", subtitle: "Foundational Engineering" },
  { key: "2", number: "02", label: "Semester II", subtitle: "Core Sciences" },
  { key: "3", number: "03", label: "Semester III", subtitle: "Engineering Mechanics" },
  { key: "4", number: "04", label: "Semester IV", subtitle: "Applied Engineering" },
  { key: "5", number: "05", label: "Semester V", subtitle: "Industrial Methods" },
  // The old subtitle here was "Current Semester", which is no longer true. See TODO_CONTENT.md.
  { key: "6", number: "06", label: "Semester VI" },
  { key: "7", number: "07", label: "Semester VII", subtitle: "Advanced Topics" },
  { key: "8", number: "08", label: "Semester VIII", subtitle: "Final Year" },
  { key: "research-docs", number: "R", label: "Research and papers", subtitle: "Official documents and studies" },
];

/** Same matching rules as the old client script: semester notes by name, research and work notes on the research shelf. */
export function resourcesForShelf(notes: LibraryNote[], shelfKey: string): Resource[] {
  const resources: Resource[] = [];
  for (const doc of notes) {
    const semesterName = (doc.semesterName ?? "").toLowerCase();
    const category = (doc.category ?? "").toLowerCase();
    const isSemesterMatch = category === "semester" && semesterName.includes(shelfKey.toLowerCase());
    const isResearchMatch = shelfKey === "research-docs" && (category === "research" || category === "work");
    if (!isSemesterMatch && !isResearchMatch) continue;
    for (const subject of doc.subjects ?? []) {
      if (subject.title) {
        resources.push({ title: subject.title, url: subject.externalLink, shelf: doc.semesterName ?? "" });
      }
    }
  }
  return resources;
}
