/**
 * The Openware mark: an open crate.
 *
 * "Ware" is goods; the crate is open because the goods are yours to take.
 * Drawn, not an asset — it scales, and it adds no bytes beyond this file.
 */
export function Mark({ className = "mark" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* Body of the crate */}
      <path
        d="M3.4 8.6 12 12.7l8.6-4.1v9.05a1 1 0 0 1-.57.9l-7.6 3.6a1 1 0 0 1-.86 0l-7.6-3.6a1 1 0 0 1-.57-.9V8.6Z"
        fill="var(--accent)"
        opacity="0.9"
      />
      {/* Lid, hinged open */}
      <path
        d="m3.4 8.6 8.17-3.87a1 1 0 0 1 .86 0L20.6 8.6"
        stroke="var(--accent)"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* The seam down the middle: it opens */}
      <path
        d="M12 12.7V22"
        stroke="var(--ink-900)"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}
