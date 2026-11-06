import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { events } from "../../data/soies-events";
import { site } from "../../data/site";
import Figure from "../ui/Figure";
import { ArrowLink, Button } from "../ui/Links";
import CountUp from "./CountUp";
import HeroBackdrop from "./HeroBackdrop";

const order = (index: number) => ({ "--t": index }) as CSSProperties;

/** One tick per event, every fifth one taller, like a tally or a ruler. */
function TallyGlyph({ count }: { count: number }) {
  const step = 196 / Math.max(count - 1, 1);
  return (
    <svg className="glyph glyph--tally" viewBox="0 0 200 32" preserveAspectRatio="none" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <g key={index} style={order(index)}>
          <line x1={2 + index * step} x2={2 + index * step} y1={index % 5 === 4 ? 2 : 13} y2={32} />
        </g>
      ))}
    </svg>
  );
}

/** The real cover of the issue, on top of a second page. */
function CoverGlyph() {
  return (
    <span className="glyph glyph--cover" aria-hidden="true">
      <Image src="/files/industrial-vision-vol11-cover.jpg" alt="" width={1800} height={2545} sizes="64px" />
    </span>
  );
}

/** Plan view of a spherical turbine: wind comes in from the left and four curved vents turn about the shaft. */
function TurbineGlyph() {
  return (
    <svg className="glyph glyph--turbine" viewBox="0 0 64 40" aria-hidden="true">
      <g className="glyph__wind">
        <line x1="0" y1="12" x2="17" y2="12" />
        <line x1="0" y1="20" x2="21" y2="20" />
        <line x1="0" y1="28" x2="17" y2="28" />
      </g>
      <circle className="glyph__shell" cx="42" cy="20" r="17" />
      <g className="glyph__rotor">
        <g className="glyph__boost">
          <path d="M42 20 Q37.9 8.7 50 6.1" />
          <path d="M42 20 Q53.3 15.9 55.9 28" />
          <path d="M42 20 Q46.1 31.3 34 33.9" />
          <path d="M42 20 Q30.7 24.1 28.1 12" />
        </g>
      </g>
      <circle className="glyph__hub" cx="42" cy="20" r="2.2" />
    </svg>
  );
}

/** Eight semesters: seven done, the eighth is now. */
function SemesterGlyph() {
  return (
    <span className="glyph glyph--semester" aria-hidden="true">
      {Array.from({ length: 8 }, (_, index) => (
        <span key={index} className={index === 7 ? "is-now" : undefined} style={order(index)} />
      ))}
    </span>
  );
}

type Fact = { id: string; href: string; figure: ReactNode; label: string; glyph: ReactNode };

const facts: Fact[] = [
  {
    id: "events",
    href: "/soies",
    figure: <CountUp to={events.length} />,
    label: "events led as President, SOIES Nepal",
    glyph: <TallyGlyph count={events.length} />,
  },
  {
    id: "magazine",
    href: "/blog",
    figure: "Vol. 11",
    label: "Industrial Vision, designed in InDesign",
    glyph: <CoverGlyph />,
  },
  {
    id: "research",
    href: "/research",
    figure: "FYP",
    label: "omnidirectional wind turbine research",
    glyph: <TurbineGlyph />,
  },
  {
    id: "semester",
    href: "/about",
    figure: "8th",
    label: "semester, B.E. Industrial Engineering",
    glyph: <SemesterGlyph />,
  },
];

export default function Hero() {
  return (
    <section className="hero-sheet" aria-labelledby="hero-title">
      <HeroBackdrop />
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
              {site.name.split(" ").map((word, index) => (
                <span key={word}>
                  {index > 0 && " "}
                  <span className="hero-sheet__word">
                    <span style={{ "--i": index } as CSSProperties}>{word}</span>
                  </span>
                </span>
              ))}
            </h1>
            <p className="hero-sheet__lede">
              Final-year Industrial Engineering student from Malarani-5, Arghakhanchi. I&apos;m studying how the{" "}
              <mark className="hero-sheet__mark">vent area and vent ratio</mark> of an omnidirectional wind turbine
              affect its power generation. I also led SOIES Nepal for a year and coordinated and designed its
              magazine, <mark className="hero-sheet__mark">cover to print</mark>.
            </p>
            <p className="hero-sheet__status mono">
              <span className="hero-sheet__dot" aria-hidden="true" />
              <span>
                <span className="hero-sheet__now">Now:</span> {site.status}
              </span>
            </p>
            <div className="hero-sheet__actions">
              <Button href="/about" glyph="→">
                About me
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
            caption="Anish Panthi"
          />
        </div>

        <ul className="hero-sheet__facts">
          {facts.map((fact) => (
            <li key={fact.id}>
              <Link href={fact.href} className={`hero-fact hero-fact--${fact.id}`}>
                <span className="hero-fact__glyph">{fact.glyph}</span>
                <span className="hero-fact__figure">{fact.figure}</span>
                <span className="hero-fact__label mono">{fact.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
