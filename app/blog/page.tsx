import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import PageReader from "../components/PageReader";
import SiteNav from "../components/SiteNav";
import { magazine, pieces } from "../data/iv11";
import "../css/page-common.css";
import "../css/writing.css";

export const metadata: Metadata = {
  title: "Writing | Anish Panthi",
  description:
    "Articles and messages by Anish Panthi, first published in Industrial Vision, the annual magazine of SOIES Nepal.",
};

export default function BlogPage() {
  return (
    <div className="writing-page page-wrapper">
      <canvas id="bg-canvas"></canvas>
      <SiteNav active="/blog" />

      <main className="site-container">
        <header className="writing-header">
          <span className="writing-eyebrow">WRITING</span>
          <h1>Writing</h1>
          <p>
            Pieces I wrote for Industrial Vision, the annual magazine of SOIES
            Nepal, shown as they were printed.
          </p>
        </header>

        <div className="writing-list">
          {pieces.map((piece) => (
            <article id={piece.id} className="writing-item" key={piece.id}>
              <div className="writing-cover-frame">
                <img
                  src={piece.pages[0].src}
                  alt={piece.pages[0].alt}
                  width={piece.pages[0].width}
                  height={piece.pages[0].height}
                  loading="lazy"
                />
              </div>
              <div className="writing-item-content">
                <span className="writing-kind">{piece.kind}</span>
                <h2>{piece.title}</h2>
                {piece.subtitle && <p className="writing-subtitle">{piece.subtitle}</p>}
                <p className="writing-summary">{piece.summary}</p>
                <p className="writing-credit">{piece.credit}</p>
                <div className="writing-actions">
                  <PageReader piece={piece} />
                  <a
                    className="writing-secondary-link"
                    href={magazine.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download the full magazine (PDF)
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <footer className="writing-footer">
        <span>© 2026 Anish Panthi</span>
        <Link href="/">Back to home</Link>
      </footer>

      <Script src="/js/page-bg.js" strategy="afterInteractive" />
    </div>
  );
}
