import { site } from "../../data/site";
import { toolGroups } from "../../data/tools";
import Figure from "../ui/Figure";
import { ArrowLink } from "../ui/Links";
import Reveal from "../ui/Reveal";
import Section from "../ui/Section";
import SpecList from "../ui/SpecList";

export default function About() {
  return (
    <Section id="about" number="03" label="About" title="IE taught me to see everything as a system.">
      <div className="about grid">
        <aside className="about__rail col-rail">
          <Figure
            src="/images/anish-mechtrix-speech.jpg"
            alt="Anish Panthi speaking at a podium on stage in front of the MechTRIX 2082 exhibition banner"
            width={2400}
            height={1600}
            ratio="3 / 2"
            sizes="(min-width: 64rem) 18rem, 100vw"
            number="03"
          />
          <SpecList
            items={[
              { term: "Studying", value: `${site.degree}, ${site.campus}, 2022 to now` },
              { term: "Semester", value: "8th" },
              { term: "Was", value: "President, SOIES Nepal, 2025 to 2026" },
              { term: "Learning", value: "AutoCAD MEP" },
              { term: "Looking for", value: "An HVAC or MEP internship" },
            ]}
          />
          <ArrowLink href="/journey">Full timeline</ArrowLink>
        </aside>

        <div className="about__body col-main">
          <Reveal className="about__bio prose">
            <p className="lede">
              I&apos;m Anish, an Industrial Engineering student in my 8th semester at Thapathali Campus.
            </p>
            <p>
              When something breaks, you don&apos;t patch the surface. You find the root cause and fix that.
              I&apos;ve carried that way of thinking into every room I&apos;ve been in, including the National
              Planning Commission at Singha Durbar, where I presented on the role of IE in reviving Nepal&apos;s
              industries.
            </p>
            <p>
              Since my sixth semester, I&apos;ve been part of a wind turbine research project with my teacher,
              handling the design side. The original omnidirectional design is patented, so we&apos;re studying
              something new: what happens when the shape and ratio of its center area change. As far as we know,
              nobody has tested that before.
            </p>
            <p>
              During my term as president of SOIES Nepal, I coordinated our annual magazine, Industrial Vision
              Vol. 11. The deadline was close, the team wasn&apos;t sure we could do it, and hiring an editor was
              the easy way out. I said no.
            </p>
            <blockquote className="about__quote">
              <p>A student magazine should be made by students, from the articles and sponsors to the design.</p>
            </blockquote>
            <p>
              So I learned InDesign and designed the whole thing myself, print ready, while my friends spent weeks
              of late nights on Discord finalizing articles, interviews and infographics. We made it.
            </p>
            <p>
              Next, I want to go deep into MEP. I&apos;m learning AutoCAD MEP during my holidays and looking for an
              HVAC internship where I can learn how buildings actually work.
            </p>
          </Reveal>

          <Reveal className="about__tools">
            <h3 className="about__tools-title label">Tools</h3>
            <div className="about__tool-groups">
              {toolGroups.map((group) => (
                <div key={group.title} className="about__tool-group">
                  <h4>{group.title}</h4>
                  <ul>
                    {group.tools.map((tool) => (
                      <li key={tool.name}>
                        {tool.name}
                        {tool.note && <span className="about__tool-note mono"> {tool.note}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
