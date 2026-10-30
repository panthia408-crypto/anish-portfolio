import type { Metadata } from "next";
import PageHeader from "../components/PageHeader";
import PageReader from "../components/PageReader";
import Figure from "../components/ui/Figure";
import { ArrowLink } from "../components/ui/Links";
import { magazine, pieces } from "../data/iv11";
import { site } from "../data/site";
import "../styles/pages.css";

export const metadata: Metadata = {
  title: "Writing | Anish Panthi",
  description:
    "Articles and messages by Anish Panthi, first published in Industrial Vision, the annual magazine of SOIES Nepal.",
};

export default function BlogPage() {
  return (
    <main id="main-content" className="page">
      <PageHeader
        crumb="Writing"
        title="Writing"
        lede="Pieces I wrote for Industrial Vision, the annual magazine of SOIES Nepal, shown as they were printed."
      />

      <div className="container">
        {pieces.map((piece, index) => (
          <article id={piece.id} className="article-row grid" key={piece.id}>
            <p className="article-row__rail mono">
              <span className="article-row__num">{String(index + 1).padStart(2, "0")}</span>
              <span>{piece.kind}</span>
              <span>
                {magazine.name}, {magazine.volume}
              </span>
            </p>
            <Figure
              className="article-row__figure"
              src={piece.pages[0].src}
              alt={piece.pages[0].alt}
              width={piece.pages[0].width}
              height={piece.pages[0].height}
              sizes="(min-width: 64rem) 20rem, 80vw"
              eager={index === 0}
            />
            <div className="article-row__body">
              <h2 className="article-row__title">{piece.title}</h2>
              {piece.subtitle && <p className="article-row__subtitle">{piece.subtitle}</p>}
              <p className="article-row__summary">{piece.summary}</p>
              <p className="mono article-row__credit">{piece.credit}</p>
              <div className="article-row__actions">
                <PageReader piece={piece} />
                <ArrowLink href={magazine.pdf} external>
                  Full issue (PDF, {site.magazinePdf.size})
                </ArrowLink>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
