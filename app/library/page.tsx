import type { Metadata } from "next";
import { pageMetadata } from "../lib/metadata";
import LibraryBrowser from "../components/LibraryBrowser";
import PageHeader from "../components/PageHeader";
import { getLibraryNotes } from "../lib/library";
import "../styles/pages.css";

export const metadata: Metadata = pageMetadata({
  title: "The Engineer's Library",
  description:
    "Open access notes, textbooks, and resources for all 8 semesters of IOE Industrial Engineering.",
  path: "/library",
});

export default async function LibraryPage() {
  const notes = await getLibraryNotes();

  return (
    <main id="main-content" className="page">
      <PageHeader
        crumb="Library"
        title="The Engineer's Library"
        lede="Open access notes, textbooks, and resources for all 8 semesters of IOE Industrial Engineering."
      />
      <div className="container">
        <LibraryBrowser notes={notes} />
      </div>
    </main>
  );
}
