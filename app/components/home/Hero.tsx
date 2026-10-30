import { site } from "../../data/site";
import Figure from "../ui/Figure";
import { ArrowLink, Button } from "../ui/Links";

const facts = [
  { figure: "20", label: "events led as President, SOIES Nepal" },
  { figure: "Vol. 11", label: "Industrial Vision, designed in InDesign" },
  { figure: "FYP", label: "omnidirectional wind turbine research" },
  { figure: "8th", label: "semester, B.E. Industrial Engineering" },
];

export default function Hero() {
  return (
    <section className="hero-sheet" aria-labelledby="hero-title">
      <div className="hero-sheet__grid-bg" aria-hidden="true" />
      <div className="container">
        <div className="hero-sheet__layout grid">
          <div className="hero-sheet__text">
            <p className="label hero-sheet__eyebrow">
              {["Industrial Engineering", site.campus, site.city].map((item, index, items) => (
                <span key={item}>
                  {item}
                  {index < items.length - 1 && <span aria-hidden="true"> ·</span>}
                </span>
              ))}
            </p>
            <h1 id="hero-title" className="hero-sheet__name">
              {site.name}
            </h1>
            <p className="hero-sheet__lede">
              Final-year Industrial Engineering student. I study how the center of an omnidirectional wind
              turbine affects its performance. I also led SOIES Nepal for a year and designed its magazine,
              cover to print.
            </p>
            <p className="hero-sheet__status mono">
              <span className="hero-sheet__dot" aria-hidden="true" />
              <span>
                <span className="hero-sheet__now">Now:</span> {site.status}
              </span>
            </p>
            <div className="hero-sheet__actions">
              <Button href="#research" glyph="↓">
                See the research
              </Button>
              <ArrowLink href={site.cv.href} download>
                Download CV (PDF, {site.cv.size})
              </ArrowLink>
            </div>
          </div>

          <Figure
            className="hero-sheet__portrait"
            plate="photo"
            ratio="4 / 5"
            src="/images/anish-portrait.jpg"
            alt="Portrait of Anish Panthi wearing a dhaka topi and a navy blazer"
            width={1080}
            height={1080}
            sizes="(min-width: 64rem) 22rem, (min-width: 40rem) 40vw, 52vw"
            objectPosition="50% 30%"
            eager
            number="01"
            caption="Anish Panthi, [PLACEHOLDER: year photo was taken]"
          />
        </div>

        <ul className="hero-sheet__facts">
          {facts.map((fact) => (
            <li key={fact.label}>
              <span className="hero-sheet__fact-figure">{fact.figure}</span>
              <span className="hero-sheet__fact-label mono">{fact.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
