import type { ReactNode } from "react";
import { withPlaceholders } from "./Placeholder";

export type Spec = { term: string; value: ReactNode };

export default function SpecList({ items, className = "" }: { items: Spec[]; className?: string }) {
  return (
    <dl className={`spec-list ${className}`.trim()}>
      {items.map((item) => (
        <div className="spec-list__row" key={item.term}>
          <dt className="label">{item.term}</dt>
          <dd>{typeof item.value === "string" ? withPlaceholders(item.value) : item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
