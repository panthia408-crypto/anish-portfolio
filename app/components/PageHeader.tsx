import Link from "next/link";
import type { ReactNode } from "react";

type PageHeaderProps = {
  crumb: string;
  title: string;
  lede?: ReactNode;
  children?: ReactNode;
};

/** Subpage header: breadcrumb, h1, lede. The content below opens with its own hairline. */
export default function PageHeader({ crumb, title, lede, children }: PageHeaderProps) {
  return (
    <header className="page-head container">
      <p className="label page-head__crumb">
        <Link href="/" className="text-link">
          Home
        </Link>
        <span aria-hidden="true"> / </span>
        <span>{crumb}</span>
      </p>
      <h1 className="page-head__title">{title}</h1>
      {lede && <p className="lede page-head__lede">{lede}</p>}
      {children}
    </header>
  );
}
