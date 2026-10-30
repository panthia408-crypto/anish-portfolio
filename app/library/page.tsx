import type { Metadata } from "next";
import LibraryBrowser from "../components/LibraryBrowser";
import PageHeader from "../components/PageHeader";
import { getLibraryNotes } from "../lib/library";
import "../styles/pages.css";

export const metadata: Metadata = {
  title: "The Engineer's Library | Anish Panthi",
  description:
    "Open access notes, textbooks, and resources for all 8 semesters of IOE Industrial Engineering.",
};

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
