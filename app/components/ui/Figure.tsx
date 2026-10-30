import Image from "next/image";
import { withPlaceholders } from "./Placeholder";

type FigureProps = {
  number?: string;
  caption?: string;
  /** Aspect ratio as "w / h". Used for placeholders and to crop images. */
  ratio?: string;
  className?: string;
  /** "photo" keeps a light plate in dark mode so white-background photos read as prints. */
  plate?: "paper" | "photo";
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  sizes?: string;
  eager?: boolean;
  objectPosition?: string;
  /** Description of the missing image. Renders a hatched drawing frame instead of an image. */
  placeholder?: string;
};

export default function Figure({
  number,
  caption,
  ratio,
  className = "",
  plate = "paper",
  src,
  alt = "",
  width,
  height,
  sizes = "100vw",
  eager = false,
  objectPosition,
  placeholder,
}: FigureProps) {
  const showPlaceholder = placeholder !== undefined || !src;

  return (
    <figure className={`figure ${className}`.trim()}>
      <div
        className={`figure__plate figure__plate--${plate}${showPlaceholder ? " figure__plate--empty" : ""}`}
        style={ratio ? { aspectRatio: ratio } : undefined}
      >
        <span className="figure__marks" aria-hidden="true" />
        {showPlaceholder ? (
          <>
            <svg className="figure__cross" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <line x1="0" y1="0" x2="100" y2="100" />
              <line x1="100" y1="0" x2="0" y2="100" />
            </svg>
            <span className="figure__ph">{withPlaceholders(placeholder ?? "[PLACEHOLDER: image]")}</span>
          </>
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : undefined}
            style={objectPosition ? { objectPosition } : undefined}
          />
        )}
      </div>
      {(number || caption) && (
        <figcaption className="figure__caption mono">
          {number && <span className="figure__num">Fig. {number}</span>}
          {caption && <span>{withPlaceholders(caption)}</span>}
        </figcaption>
      )}
    </figure>
  );
}
