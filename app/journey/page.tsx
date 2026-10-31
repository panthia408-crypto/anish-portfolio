import type { Metadata } from "next";
import { pageMetadata } from "../lib/metadata";
import PageHeader from "../components/PageHeader";
import { alsoOrganised, certificates, milestones, roles, type Credential } from "../data/journey";
import { stagger } from "../components/ui/Reveal";
import "../styles/pages.css";

export const metadata: Metadata = pageMetadata({
  title: "Timeline",
  description:
    "Education, leadership roles and certificates of Anish Panthi, from school in 2020 to the 8th semester of Industrial Engineering.",
  path: "/journey",
});

function CredentialList({ title, items }: { title: string; items: Credential[] }) {
  return (
    <section className="credentials">
      <h2 className="label credentials__title">{title}</h2>
      <ul>
        {items.map((item, index) => (
          <li key={item.title} className="credentials__item" data-animate="" style={stagger(index)}>
            <h3>{item.title}</h3>
            <p className="mono">{item.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function JourneyPage() {
  return (
    <main id="main-content" className="page">
      <PageHeader crumb="Timeline" title="Timeline" lede="Where I studied, what I led, and what I learned along the way." />

      <div className="container">
        <section aria-labelledby="timeline-title">
          <h2 id="timeline-title" className="sr-only">
            Timeline
          </h2>
          <ol className="timeline">
            {milestones.map((milestone, index) => (
              <li
                key={`${milestone.year}-${milestone.title}`}
                className="timeline__row grid"
                data-animate=""
                style={stagger(index, 3)}
              >
                <p className="timeline__year mono">{milestone.year}</p>
                <div className="timeline__main">
                  <h3 className="timeline__title">{milestone.title}</h3>
                  <p className="timeline__place mono">{milestone.place}</p>
                  <p className="timeline__text">{milestone.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div className="credentials-grid grid">
          <CredentialList title="Certificates and training" items={certificates} />
          <div className="credentials-col">
            <CredentialList title="Roles" items={roles} />
            <p className="credentials__also">{alsoOrganised}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
