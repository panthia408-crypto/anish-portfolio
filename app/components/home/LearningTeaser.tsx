import { getLearningEntries } from "../../lib/learning";
import LearningLog from "../sections/LearningLog";
import { ArrowLink } from "../ui/Links";
import Section from "../ui/Section";

export default async function LearningTeaser() {
  const entries = await getLearningEntries(3);

  return (
    <Section id="learning" number="04" label="Learning" title="What I'm learning in MEP">
      <div className="teaser grid">
        <div className="teaser__main">
          <LearningLog entries={entries} />
          <ArrowLink href="/learning">{entries.length > 0 ? "All entries" : "The learning log"}</ArrowLink>
        </div>
      </div>
    </Section>
  );
}
