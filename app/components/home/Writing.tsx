import Link from "next/link";
import { pieces } from "../../data/iv11";
import { site } from "../../data/site";
import Figure from "../ui/Figure";
import { ArrowLink } from "../ui/Links";
import Reveal from "../ui/Reveal";
import Section from "../ui/Section";

export default function Writing() {
  return (
    <Section id="writing" number="04" label="Writing" title="Printed in Industrial Vision">
      <div className="pieces grid">
        {pieces.map((piece, index) => (
          <Reveal key={piece.id} className={`piece piece--${index === 0 ? "lead" : "second"}`}>
            <article>
              <Link href={`/blog#${piece.id}`} className="piece__link">
                <Figure
                  src={piece.pages[0].src}
                  alt={piece.pages[0].alt}
                  width={piece.pages[0].width}
                  height={piece.pages[0].height}
                  sizes="(min-width: 64rem) 24rem, 70vw"
                />
                <p className="label piece__kind">{piece.kind}</p>
                <h3 className="piece__title">{piece.title}</h3>
              </Link>
              <p className="piece__summary">{piece.summary}</p>
              <p className="piece__credit mono">{piece.credit}</p>
            </article>
          </Reveal>
        ))}
        <div className="pieces__more col-main">
          <ArrowLink href="/blog">All writing</ArrowLink>
          <ArrowLink href={site.magazinePdf.href} external>
            Industrial Vision Vol. 11, full issue (PDF, {site.magazinePdf.size})
          </ArrowLink>
        </div>
      </div>
    </Section>
  );
}
