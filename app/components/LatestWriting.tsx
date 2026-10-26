import { pieces } from "../data/iv11";
import "../css/writing.css";

export default function LatestWriting() {
  const [featured, secondary] = pieces;

  return (
    <div className="latest-writing">
      <div className="latest-writing-grid">
        {[featured, secondary].map((piece, index) => (
          <a
            className={`latest-writing-card ${index === 0 ? "latest-writing-card-featured" : ""}`}
            href={`/blog#${piece.id}`}
            key={piece.id}
          >
            <div className="latest-writing-image-frame">
              <img
                src={piece.pages[0].src}
                alt={piece.pages[0].alt}
                width={piece.pages[0].width}
                height={piece.pages[0].height}
                loading="lazy"
              />
            </div>
            <span className="latest-writing-label">{piece.kind}</span>
            <h3>{piece.title}</h3>
            <p>{piece.summary}</p>
            <span className="latest-writing-read">Read <span aria-hidden="true">→</span></span>
          </a>
        ))}
      </div>
      <a className="latest-writing-all" href="/blog">See all writing</a>
    </div>
  );
}
