import Image from "next/image";
import { getLearningEntries } from "../../lib/learning";
import { ArrowLink } from "../ui/Links";
import { stagger } from "../ui/Reveal";
import Section from "../ui/Section";
import SpecList from "../ui/SpecList";

function dateLabel(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default async function Learning() {
  const entries = await getLearningEntries();

  return (
    <Section id="learning" number="04" label="Learning" title="What I'm learning in MEP">
      <div className="learning grid">
        <SpecList
          className="learning__specs col-rail"
          items={[
            { term: "Focus", value: "HVAC and MEP design" },
            { term: "Tool", value: "AutoCAD MEP" },
            { term: "Entries", value: String(entries.length) },
            ...(entries[0] ? [{ term: "Updated", value: dateLabel(entries[0].date) }] : []),
          ]}
        />

        <div className="learning__log col-main">
          {entries.length === 0 ? (
            <p className="learning__empty" data-animate="">
              I&apos;m learning AutoCAD MEP and how buildings are heated, cooled and plumbed. Notes on what I pick up
              will show up here as I go.
            </p>
          ) : (
            <ol className="learning__list">
              {entries.map((entry, index) => (
                <li key={entry._id} className="learning__entry" data-animate="" style={stagger(index)}>
                  <p className="learning__meta mono">
                    <time dateTime={entry.date}>{dateLabel(entry.date)}</time>
                    {entry.area && <span>{entry.area}</span>}
                    {entry.source && <span>{entry.source}</span>}
                  </p>
                  <div className="learning__body">
                    <h3 className="learning__title">{entry.title}</h3>
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
          )}
        </div>
      </div>
    </Section>
  );
}
