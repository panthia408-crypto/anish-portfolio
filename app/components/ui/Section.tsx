import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  number: string;
  label: string;
  title: ReactNode;
  children: ReactNode;
  className?: string;
};

/** A numbered sheet: hairline, mono label rail, heading, then content. */
export default function Section({ id, number, label, title, children, className = "" }: SectionProps) {
  const headingId = id ? `${id}-title` : undefined;

  return (
    <section id={id} className={`section ${className}`.trim()} aria-labelledby={headingId}>
      <div className="container">
        <header className="section__head grid">
          <span className="section__rule" data-animate="line" aria-hidden="true" />
          <p className="section__label label">
            <span className="section__num">{number}</span>
            {label}
          </p>
          <h2 id={headingId} className="section__title">
            {title}
          </h2>
        </header>
        {children}
      </div>
    </section>
  );
}
