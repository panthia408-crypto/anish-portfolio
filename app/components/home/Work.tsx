import { projects, type Project } from "../../data/projects";
import { soiesTerm } from "../../data/work";
import WorkRow from "../WorkRow";
import { ArrowLink } from "../ui/Links";
import Section from "../ui/Section";

function project(id: string): Project {
  const found = projects.find((item) => item.id === id);
  if (!found) throw new Error(`Project data is missing: ${id}`);
  return found;
}

const magazine = project("industrial-vision-11");
const indexRows = [
  { item: project("npc-proposal"), href: "/soies" },
  { item: project("soies-website"), href: "https://soiesnepal.org.np", external: true },
  { item: project("engineers-library"), href: "/library" },
];

export default function Work() {
  return (
    <Section id="work" number="02" label="Work" title="Things I made or led">
      <ul className="work-list">
        <WorkRow
          variant="feature"
          index={0}
          number="01"
          category={magazine.group}
          period={magazine.period}
          title={magazine.title}
          summary="I coordinated the team and learned InDesign to design the whole issue, print ready."
          role={magazine.role}
          href="/blog"
          image={{
            src: "/files/industrial-vision-vol11-cover.jpg",
            alt: "Cover of Industrial Vision Volume 11",
            width: 1800,
            height: 2545,
          }}
        />
        <WorkRow variant="feature" index={1} number="02" {...soiesTerm} />
        {indexRows.map(({ item, href, external }, index) => (
          <WorkRow
            key={item.id}
            variant="index"
            index={index + 2}
            number={String(index + 3).padStart(2, "0")}
            category={item.group}
            title={item.title}
            href={href}
            external={external}
          />
        ))}
      </ul>
      <div className="work-more">
        <ArrowLink href="/projects">All {projects.length} projects</ArrowLink>
      </div>
    </Section>
  );
}
