import type { Metadata } from "next";
import Figure from "../components/ui/Figure";
import { ArrowLink, Button } from "../components/ui/Links";
import { Placeholder } from "../components/ui/Placeholder";
import Reveal from "../components/ui/Reveal";
import Section from "../components/ui/Section";
import SpecList from "../components/ui/SpecList";
import "./styleguide.css";

export const metadata: Metadata = {
  title: "Style guide",
  robots: { index: false, follow: false },
};

const swatches = ["paper", "paper-raised", "ink", "graphite", "pencil", "rule", "accent", "accent-strong"];
const steps = ["5", "4", "3", "2", "1", "0", "-1", "-2"];

export default function StyleguidePage() {
  return (
    <main id="main-content" className="styleguide">
      <Section number="00" label="Tokens" title="The drawing sheet, in parts">
        <div className="grid">
          <div className="col-main">
            <ul className="sg-swatches">
              {swatches.map((name) => (
                <li key={name}>
                  <span className="sg-swatch" style={{ background: `var(--${name})` }} />
                  <span className="mono">--{name}</span>
                </li>
              ))}
            </ul>
            <div className="sg-steps">
              {steps.map((step) => (
                <p key={step} style={{ fontSize: `var(--step-${step})`, fontFamily: Number(step) >= 1 ? "var(--font-display)" : undefined }}>
                  <span className="label">step {step}</span> Industrial Vision, Vol. 11
                </p>
              ))}
              <p className="mono">Mono: Fig. 02, 2025 to 2026, 8th semester</p>
            </div>
          </div>
        </div>
      </Section>

      <Section number="01" label="Primitives" title="Links, buttons, specs and figures">
        <div className="grid sg-row">
          <div className="col-rail">
            <SpecList
              items={[
                { term: "Role", value: "3D design" },
                { term: "Status", value: "In progress" },
                { term: "Method", value: "[PLACEHOLDER: method, short phrase]" },
              ]}
            />
          </div>
          <div className="col-main sg-stack">
            <p className="lede">A lede paragraph in the display serif, kept to about 34 characters a line.</p>
            <p className="prose">
              Body text in IBM Plex Sans. An inline placeholder looks like this:{" "}
              <Placeholder>[PLACEHOLDER: research question, 1 to 2 sentences]</Placeholder> and the sentence carries on.
            </p>
            <div className="sg-actions">
              <Button href="#">Solid button</Button>
              <Button href="#" variant="outline">
                Outline button
              </Button>
              <ArrowLink href="/projects">Arrow link</ArrowLink>
              <ArrowLink href="https://example.com" external>
                External link
              </ArrowLink>
            </div>
            <Reveal>
              <Figure number="02" ratio="16 / 9" placeholder="[PLACEHOLDER: turbine CAD render, 16:9]" caption="[PLACEHOLDER: caption, under 15 words]" />
            </Reveal>
            <Figure
              number="01"
              plate="photo"
              ratio="4 / 5"
              className="sg-portrait"
              src="/assets/placeholder.jpg"
              alt="Portrait of Anish Panthi"
              width={1080}
              height={1080}
              sizes="20rem"
              caption="A photo plate"
            />
          </div>
        </div>
      </Section>
    </main>
  );
}
