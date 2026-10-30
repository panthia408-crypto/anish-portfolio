import Link from "next/link";
import type { ReactNode } from "react";

type LinkBase = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  download?: boolean;
  /** Overrides the trailing glyph: → by default, ↗ for external, ↓ for downloads. */
  glyph?: string;
  ariaLabel?: string;
};

function isInternal(href: string) {
  return href.startsWith("/") && !href.startsWith("/files/") && !href.includes(".pdf");
}

function Anchor({ href, children, className, external, download, ariaLabel }: Omit<LinkBase, "glyph">) {
  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  if (download || !isInternal(href)) {
    return (
      <a href={href} className={className} download={download || undefined} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

export function ArrowLink({ glyph, className = "", ...props }: LinkBase) {
  const mark = glyph ?? (props.external ? "↗" : props.download ? "↓" : "→");
  return (
    <Anchor {...props} className={`arrow-link ${className}`.trim()}>
      <span className="arrow-link__text">{props.children}</span>
      <span className="arrow-link__glyph" aria-hidden="true">
        {mark}
      </span>
    </Anchor>
  );
}

export function Button({
  variant = "solid",
  className = "",
  glyph,
  ...props
}: LinkBase & { variant?: "solid" | "outline" }) {
  return (
    <Anchor {...props} className={`btn btn--${variant} ${className}`.trim()}>
      <span>{props.children}</span>
      {glyph && (
        <span className="btn__glyph" aria-hidden="true">
          {glyph}
        </span>
      )}
    </Anchor>
  );
}
