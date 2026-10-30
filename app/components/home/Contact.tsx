import { site, socials } from "../../data/site";
import { ArrowLink } from "../ui/Links";
import { isPlaceholder, withPlaceholders } from "../ui/Placeholder";
import Section from "../ui/Section";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <Section id="contact" number="05" label="Contact" title="Hiring an HVAC or MEP intern?">
      <div className="contact grid">
        <div className="contact__direct col-main">
          <p className="lede">I&apos;m {withPlaceholders(site.availability)}.</p>
          <p className="contact__email">
            {isPlaceholder(site.email) ? (
              withPlaceholders(site.email)
            ) : (
              <a className="text-link" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            )}
          </p>
          <p className="contact__links">
            {socials
              .filter((social) => social.primary)
              .map((social) => (
                <ArrowLink key={social.label} href={social.href} external>
                  {social.label}
                </ArrowLink>
              ))}
            <ArrowLink href={site.cv.href} download>
              CV (PDF, {site.cv.size})
            </ArrowLink>
          </p>
        </div>

        <div className="contact__write col-main">
          <p className="label contact__write-label">Or write here</p>
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
