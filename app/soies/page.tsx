import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import EventsTimeline from "../components/EventsTimeline";
import NavScroll from "../components/NavScroll";
import SiteNav from "../components/SiteNav";
import { committee, events, sanityImg } from "../data/soies-events";
import "../css/page-common.css";
import "../css/soies.css";

export const metadata: Metadata = {
  title: "SOIES Nepal, 18th Executive Committee | Anish Panthi",
  description:
    "A record of the 18th Executive Committee of SOIES Nepal: 20 events, workshops, competitions and partnerships, 2025-2026.",
};

export default function SoiesPage() {
  return (
    <div className="soies-page page-wrapper">
      <canvas id="bg-canvas"></canvas>
      <SiteNav active="" />
      <NavScroll />

      <main>
        <section className="soies-intro site-container">
          <span className="soies-eyebrow">SOIES NEPAL</span>
          <h1>18th Executive Committee</h1>
          <p className="soies-years">{committee.years}</p>
          <p>
            I served as President of the 18th Executive Committee of SOIES
            Nepal, the student society of the Department of Industrial
            Engineering at Thapathali Campus. This page is a record of what we
            did together: {events.length} events, from orientation and
            workshops to a research partnership proposal at the National
            Planning Commission.
          </p>
          <div className="soies-intro-links">
            <a
              href="/files/industrial-vision-vol11.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read Industrial Vision Vol. 11
            </a>
            <a
              href={committee.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Original committee page
            </a>
          </div>
        </section>

        <figure className="soies-group-photo site-container">
          <img
            src={sanityImg(committee.groupPhoto)}
            alt={committee.groupPhotoAlt}
          />
          <figcaption>{committee.groupPhotoAlt}</figcaption>
        </figure>

        <section className="site-container" aria-label="Events timeline">
          <EventsTimeline events={events} />
        </section>

        <section className="soies-team site-container">
          <h2>The team</h2>
          <div className="soies-team-grid">
            {committee.team.map((member) => (
              <div className="soies-team-member" key={member.name}>
                <span>{member.name}</span>
                <small>{member.role}</small>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="soies-footer">
        <span>© 2026 Anish Panthi</span>
        <Link href="/">Back to home</Link>
      </footer>

      <Script src="/js/page-bg.js" strategy="afterInteractive" />
    </div>
  );
}
