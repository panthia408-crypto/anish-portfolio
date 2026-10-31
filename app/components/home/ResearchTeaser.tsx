import { research } from "../../data/research";
import Figure from "../ui/Figure";
import { ArrowLink } from "../ui/Links";
import Section from "../ui/Section";
import SpecList from "../ui/SpecList";

const teaserTerms = ["Status", "Measuring", "Due"];

export default function ResearchTeaser() {
  return (
    <Section id="research" number="01" label="Research" title={research.title}>
      <div className="teaser grid">
        <SpecList
          className="teaser__rail"
          items={research.specs.filter((spec) => teaserTerms.includes(spec.term))}
          animate
        />
        <div className="teaser__text">
          <p className="lede" data-animate="">
            {research.blocks[0].body[0]}
          </p>
          <ArrowLink href="/research">Read the full research</ArrowLink>
        </div>
        <Figure
          className="teaser__figure"
          plate="photo"
          animate="plot"
          src={research.figure.src}
          alt={research.figure.alt}
          width={research.figure.width}
          height={research.figure.height}
          sizes="(min-width: 64rem) 22rem, 100vw"
        />
      </div>
    </Section>
  );
}
