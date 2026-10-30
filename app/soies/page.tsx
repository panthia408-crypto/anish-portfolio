import type { Metadata } from "next";
import { pageMetadata } from "../lib/metadata";
import EventsTimeline from "../components/EventsTimeline";
import PageHeader from "../components/PageHeader";
import Figure from "../components/ui/Figure";
import { ArrowLink } from "../components/ui/Links";
import { site } from "../data/site";
import { committee, events, imageSize, sanityImg } from "../data/soies-events";
import "../styles/pages.css";
import "../styles/soies.css";

export const metadata: Metadata = pageMetadata({
  title: "SOIES Nepal, 18th Executive Committee",
  description:
    "A record of the 18th Executive Committee of SOIES Nepal: 20 events, workshops, competitions and partnerships, 2025 to 2026.",
  path: "/soies",
});

export default function SoiesPage() {
  return (
    <main id="main-content" className="page">
      <PageHeader crumb="SOIES Nepal" title={committee.title}>
        <p className="soies-years mono">{committee.years}</p>
        <p className="soies-intro">
          I served as President of the 18th Executive Committee of SOIES Nepal, the student society of the
          Department of Industrial Engineering at Thapathali Campus. This page is a record of what we did together:{" "}
          {events.length} events, from orientation and workshops to a research partnership proposal at the National
          Planning Commission.
        </p>
        <p className="soies-links">
          <ArrowLink href={site.magazinePdf.href} external>
            Industrial Vision Vol. 11 (PDF, {site.magazinePdf.size})
          </ArrowLink>
          <ArrowLink href={committee.sourceUrl} external>
            Original committee page
          </ArrowLink>
        </p>
      </PageHeader>

      <div className="container">
        <Figure
          className="soies-photo"
          src={sanityImg(committee.groupPhoto)}
          alt={committee.groupPhotoAlt}
          {...imageSize(committee.groupPhoto)}
          sizes="(min-width: 75rem) 75rem, 100vw"
          eager
          caption={committee.groupPhotoAlt}
        />

        <section aria-labelledby="events-title" className="soies-events">
          <h2 id="events-title" className="label soies-events__title">
            Events, newest first
          </h2>
          <EventsTimeline events={events} />
        </section>

        <section aria-labelledby="team-title" className="soies-team">
          <h2 id="team-title" className="label">
            The team
          </h2>
          <ul className="soies-team__list">
            {committee.team.map((member) => (
              <li key={member.name}>
                <span className="soies-team__name">{member.name}</span>
                <span className="mono">{member.role}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
