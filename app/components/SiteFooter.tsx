import Link from "next/link";
import { site, socials } from "../data/site";
import { isPlaceholder } from "./ui/Placeholder";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__inner">
          <div className="site-footer__col">
            <p className="site-footer__name">{site.name}</p>
            <p>
              {site.campus}, {site.city}
            </p>
          </div>
  
          <ul className="site-footer__col site-footer__links" aria-label="Elsewhere">
            {!isPlaceholder(site.email) && (
              <li>
                <a href={`mailto:${site.email}`}>Email</a>
              </li>
            )}
            {socials.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  {social.label}
                </a>
              </li>
            ))}
            <li>
              <a href={site.cv.href} download>
                CV (PDF, {site.cv.size})
              </a>
            </li>
            <li>
              <Link href="/journey">Full timeline</Link>
            </li>
            <li>
              <Link href="/soies">SOIES record</Link>
            </li>
          </ul>
  
          <div className="site-footer__col">
            <p>© 2026 {site.name}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
