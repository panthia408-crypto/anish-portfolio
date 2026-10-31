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
        <SpecList className="research__specs col-rail" items={research.specs} animate />

        <div className="research__blocks col-main">
          {research.blocks.map((block, index) => (
            <Reveal key={block.title} className="research__block" index={index}>
              <h3 className="research__block-title">{block.title}</h3>
              <div className="research__block-body">
                {block.body.map((paragraph) => (
                  <p key={paragraph}>{withPlaceholders(paragraph)}</p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <div className="research__figure col-main">
          <Figure
            number="02"
            plate="photo"
            animate="plot"
            {...research.figure}
            sizes="(min-width: 64rem) 52rem, 100vw"
          />
        </div>
      </div>
    </Section>
  );
}
