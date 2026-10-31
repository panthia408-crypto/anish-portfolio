import Image from "next/image";
import type { LearningEntry } from "../../lib/learning";
import { ArrowLink } from "../ui/Links";
import { stagger } from "../ui/Reveal";

export function learningDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Entries from the MEP learning log, newest first. Used on the home page (latest few) and on /learning. */
export default function LearningLog({
  entries,
  headingLevel: Heading = "h3",
}: {
  entries: LearningEntry[];
  headingLevel?: "h2" | "h3";
}) {
  if (entries.length === 0) {
    return (
      <p className="learning__empty" data-animate="">
        I&apos;m learning AutoCAD MEP and how buildings are heated, cooled and plumbed. Notes on what I pick up will
        show up here as I go.
      </p>
    );
  }

  return (
    <ol className="learning__list">
      {entries.map((entry, index) => (
        <li key={entry._id} className="learning__entry" data-animate="" style={stagger(index)}>
          <p className="learning__meta mono">
            <time dateTime={entry.date}>{learningDate(entry.date)}</time>
            {entry.area && <span>{entry.area}</span>}
            {entry.source && <span>{entry.source}</span>}
          </p>
          <div className="learning__body">
            <Heading className="learning__title">{entry.title}</Heading>
            {entry.note && <p className="learning__note">{entry.note}</p>}
            {entry.link && (
              <ArrowLink href={entry.link} external>
                More
              </ArrowLink>
            )}
          </div>
          {entry.imageUrl && entry.imageWidth && entry.imageHeight && (
            <div className="learning__image" data-animate="photo">
              <Image
                src={entry.imageUrl}
                alt=""
                width={entry.imageWidth}
                height={entry.imageHeight}
                sizes="(min-width: 64rem) 16rem, 100vw"
              />
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}
