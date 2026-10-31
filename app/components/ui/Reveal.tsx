import type { CSSProperties, ReactNode } from "react";

export type AnimateVariant = "" | "photo" | "plot" | "line";

/** Inline style that staggers an animated element by its position in a list (capped so long lists don't lag). */
export function stagger(index: number, cap = 6): CSSProperties {
  return { "--i": index % cap } as CSSProperties;
}

/** Fades content up once as it scrolls into view. The observer lives in ScrollAnimator (root layout). */
export default function Reveal({
  children,
  className = "",
  index,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
}) {
  return (
    <div className={className} data-animate="" style={index === undefined ? undefined : stagger(index)}>
      {children}
    </div>
  );
}
