import { Fragment, type ReactNode } from "react";

// Missing content is written as "[PLACEHOLDER: what is needed]" so `grep -rn "PLACEHOLDER:" app` lists it all.
// See TODO_CONTENT.md for what each one needs.

const PLACEHOLDER_PATTERN = /(\[PLACEHOLDER:[^\]]*\])/g;

export function Placeholder({ children }: { children: string }) {
  return <span className="ph">{children}</span>;
}

export function isPlaceholder(text: string | undefined) {
  return typeof text === "string" && text.includes("[PLACEHOLDER:");
}

/** Renders a string, styling any [PLACEHOLDER: ...] parts as drafting annotations. */
export function withPlaceholders(text: string): ReactNode {
  if (!isPlaceholder(text)) return text;
  return text.split(PLACEHOLDER_PATTERN).map((part, index) =>
    part.startsWith("[PLACEHOLDER:") ? (
      <Placeholder key={index}>{part}</Placeholder>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}
