import type { Glyph as GlyphName } from "@/data/targets";

/**
 * Abstract marks for the board.
 *
 * These are deliberately generic geometry. No drop, page or asset in this
 * repo reproduces a real company's logo — vendor names appear as text only,
 * to say what a drop replaces. If one of these ever starts resembling a real
 * mark, change it.
 */
export function Glyph({ name }: { name: GlyphName }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className="glyph"
      aria-hidden="true"
      focusable="false"
    >
      {shape(name)}
    </svg>
  );
}

function shape(name: GlyphName) {
  const stroke = {
    stroke: "currentColor",
    strokeWidth: 2.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "orbit":
      return (
        <>
          <circle cx="24" cy="24" r="6.5" fill="currentColor" />
          <ellipse cx="24" cy="24" rx="16" ry="7.5" {...stroke} />
        </>
      );
    case "wave":
      return (
        <>
          <path d="M10 24v0M17 16v16M24 11v26M31 17v14M38 24v0" {...stroke} />
        </>
      );
    case "bolt":
      return (
        <path
          d="M27 8 13 27h8l-2 13 16-19h-9l1-13Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      );
    case "spark":
      return (
        <path
          d="M24 8c1.6 9 5 12.4 14 14-9 1.6-12.4 5-14 14-1.6-9-5-12.4-14-14 9-1.6 12.4-5 14-14Z"
          fill="currentColor"
        />
      );
    case "prism":
      return (
        <>
          <path d="M24 9 40 37H8L24 9Z" {...stroke} />
          <path d="M24 9v28" {...stroke} strokeWidth={1.5} opacity={0.55} />
        </>
      );
    case "loop":
      // A cycle, not two circles side by side — equal circles at mid-height
      // read as a face.
      return (
        <>
          <path d="M38 24a14 14 0 1 1-4.1-9.9" {...stroke} />
          <path d="M34 6v9h-9" {...stroke} />
        </>
      );
  }
}
