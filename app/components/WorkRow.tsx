import Image from "next/image";
import { SmartLink } from "./ui/Links";
import { stagger } from "./ui/Reveal";

export type WorkRowImage = { src: string; alt: string; width: number; height: number };

type WorkRowProps = {
  variant: "feature" | "index";
  number: string;
  category: string;
  period?: string;
  title: string;
  summary?: string;
  role?: string;
  href: string;
  external?: boolean;
  image?: WorkRowImage;
  id?: string;
  headingLevel?: "h2" | "h3";
  /** Position in the list, for the scroll-in stagger. */
  index?: number;
};

/** One line of the work index. The whole row is the link. */
export default function WorkRow({
  variant,
  number,
  category,
  period,
  title,
  summary,
  role,
  href,
  external,
  image,
  id,
  headingLevel: Heading = "h3",
  index = 0,
}: WorkRowProps) {
  return (
    <li className={`work-row work-row--${variant}`} id={id} data-animate="" style={stagger(index)}>
      <SmartLink href={href} external={external} className="work-row__link grid">
        <span className="work-row__rail mono">
          <span className="work-row__num">{number}</span>
          <span>{category}</span>
          {period && variant === "feature" && <span>{period}</span>}
        </span>
        <span className="work-row__main">
          <Heading className="work-row__title">{title}</Heading>
          {summary && <span className="work-row__summary">{summary}</span>}
          {role && <span className="work-row__role mono">{role}</span>}
        </span>
        {image && (
          <span className="work-row__media" data-animate="photo">
            <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(min-width: 64rem) 22rem, 100vw" />
          </span>
        )}
        <span className="work-row__glyph" aria-hidden="true">
          {external ? "↗" : "→"}
        </span>
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </SmartLink>
    </li>
  );
}
