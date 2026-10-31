import Figure from "../ui/Figure";
import { ArrowLink } from "../ui/Links";
import Section from "../ui/Section";

export default function AboutTeaser() {
  return (
    <Section id="about" number="03" label="About" title="IE taught me to see everything as a system.">
      <div className="teaser grid">
        <Figure
          className="teaser__rail"
          src="/images/anish-mechtrix-speech.jpg"
          alt="Anish Panthi speaking at a podium on stage in front of the MechTRIX 2082 exhibition banner"
          width={2400}
          height={1600}
          ratio="3 / 2"
          sizes="(min-width: 64rem) 18rem, 100vw"
          animate="photo"
        />
        <div className="teaser__main">
          <p className="lede" data-animate="">
            I&apos;m Anish, an Industrial Engineering student in my 8th semester at Thapathali Campus. When something
            breaks, I look for the root cause and fix that.
          </p>
          <blockquote className="teaser__quote" data-animate="">
            <p>A student magazine should be made by students, from the articles and sponsors to the design.</p>
          </blockquote>
          <ArrowLink href="/about">More about me</ArrowLink>
        </div>
      </div>
    </Section>
  );
}
