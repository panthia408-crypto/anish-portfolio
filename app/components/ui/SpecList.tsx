import type { ReactNode } from "react";
import { withPlaceholders } from "./Placeholder";
import { stagger } from "./Reveal";

export type Spec = { term: string; value: ReactNode };

export default function SpecList({ items, className = "", animate = false }: { items: Spec[]; className?: string; animate?: boolean }) {
  return (
    <dl className={`spec-list ${className}`.trim()}>
      {items.map((item, index) => (
        <div
          className="spec-list__row"
          key={item.term}
          data-animate={animate ? "" : undefined}
          style={animate ? stagger(index, 8) : undefined}
        >
          <dt className="label">{item.term}</dt>
          <dd>{typeof item.value === "string" ? withPlaceholders(item.value) : item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
