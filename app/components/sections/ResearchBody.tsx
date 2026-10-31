import { research } from "../../data/research";
import Figure from "../ui/Figure";
import { withPlaceholders } from "../ui/Placeholder";
import Reveal from "../ui/Reveal";
import SpecList from "../ui/SpecList";

/** The full research write-up: spec sheet, three short blocks and the CAD model. Used on /research. */
export default function ResearchBody() {
  return (
    <div className="research grid container">
      <SpecList className="research__specs col-rail" items={research.specs} animate />

      <div className="research__blocks col-main">
        {research.blocks.map((block, index) => (
          <Reveal key={block.title} className="research__block" index={index}>
            <h2 className="research__block-title">{block.title}</h2>
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
          number="01"
          plate="photo"
          animate="plot"
          {...research.figure}
          sizes="(min-width: 64rem) 52rem, 100vw"
        />
      </div>
    </div>
  );
}
