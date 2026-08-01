/**
 * Art for the two empty slots on the drop rail.
 *
 * They sit beside real product screenshots, so they must read as deliberate
 * rather than as an image that failed to load — which is exactly what a
 * diagonal-stripe swatch reads as. Both are drawn, like everything else here.
 */

/** A plan, not a product: a wireframe part-drawn over blueprint grid. */
export function WorkshopArt() {
  return (
    <svg
      className="placeholder"
      viewBox="0 0 320 200"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern id="ow-grid" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M16 0H0v16" stroke="#8d7a5e" strokeWidth="0.5" opacity="0.35" />
        </pattern>
      </defs>
      <rect width="320" height="200" fill="url(#ow-grid)" />

      {/* The window being drawn. Solid where it's decided, dashed where it isn't. */}
      <g stroke="#4a3d2c" strokeLinecap="round" strokeLinejoin="round">
        <rect x="58" y="42" width="204" height="116" rx="7" strokeWidth="1.8" />
        <path d="M58 66h204" strokeWidth="1.4" />
        <circle cx="71" cy="54" r="2.6" fill="#4a3d2c" stroke="none" />
        <circle cx="80" cy="54" r="2.6" fill="#4a3d2c" stroke="none" opacity="0.5" />
        <circle cx="89" cy="54" r="2.6" fill="#4a3d2c" stroke="none" opacity="0.28" />

        {/* Sidebar: settled. */}
        <path d="M104 66v92" strokeWidth="1.4" />
        <path d="M70 82h22M70 95h22M70 108h16" strokeWidth="2.6" opacity="0.42" />

        {/* Content: still a sketch. */}
        <path
          d="M120 84h128M120 100h128M120 116h86"
          strokeWidth="2.6"
          strokeDasharray="7 6"
          opacity="0.44"
        />
        <rect
          x="120"
          y="130"
          width="52"
          height="16"
          rx="8"
          strokeWidth="1.6"
          strokeDasharray="5 5"
          opacity="0.55"
        />
      </g>

      {/* Pinned, like everything on the board. */}
      <circle cx="160" cy="30" r="6" fill="#b8322c" />
      <circle cx="158" cy="28" r="2" fill="#ff9b93" opacity="0.85" />
    </svg>
  );
}

/** An invitation: an empty pinned card with a plus where a drop would go. */
export function OpenSlotArt() {
  return (
    <svg
      className="placeholder"
      viewBox="0 0 320 200"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="#4a3d2c" strokeLinecap="round" strokeLinejoin="round">
        {/* Two cards behind, suggesting a stack with room at the front. */}
        <rect
          x="96"
          y="40"
          width="128"
          height="120"
          rx="6"
          strokeWidth="1.4"
          opacity="0.22"
          transform="rotate(-7 160 100)"
        />
        <rect
          x="96"
          y="40"
          width="128"
          height="120"
          rx="6"
          strokeWidth="1.4"
          opacity="0.34"
          transform="rotate(4 160 100)"
        />
        {/* The empty one at the front. */}
        <rect
          x="96"
          y="40"
          width="128"
          height="120"
          rx="6"
          strokeWidth="1.9"
          strokeDasharray="8 7"
        />
        <path d="M160 78v44M138 100h44" strokeWidth="3" opacity="0.65" />
      </g>

      <circle cx="160" cy="30" r="6" fill="#b8322c" />
      <circle cx="158" cy="28" r="2" fill="#ff9b93" opacity="0.85" />
    </svg>
  );
}
