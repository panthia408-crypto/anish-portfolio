import { research } from "../../data/research";
import Figure from "../ui/Figure";
import { withPlaceholders } from "../ui/Placeholder";
import Reveal from "../ui/Reveal";
import Section from "../ui/Section";
import SpecList from "../ui/SpecList";

export default function Research() {
  return (
    <Section id="research" number="01" label="Research" title={research.title}>
      <div className="research grid">
        <SpecList className="research__specs col-rail" items={research.specs} />

        <div className="research__blocks col-main">
          {research.blocks.map((block) => (
            <Reveal key={block.title} className="research__block">
              <h3 className="research__block-title">{block.title}</h3>
              <div className="research__block-body">
                {block.body.map((paragraph) => (
                  <p key={paragraph}>{withPlaceholders(paragraph)}</p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="research__figure col-main">
          <Figure number="02" ratio="16 / 9" placeholder={research.figure.placeholder} caption={research.figure.caption} />
        </Reveal>
      </div>
    </Section>
  );
}
