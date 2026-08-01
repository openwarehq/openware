import Link from "next/link";
import type { Drop } from "@/data/drops";
import { asset } from "@/lib/asset";

/**
 * One card for a drop, used by both the home rail and the browse grid — so the
 * two pages cannot drift apart.
 */
export function DropCard({
  drop,
  index = 0,
}: {
  drop: Drop;
  index?: number;
}) {
  return (
    <Link
      href={`/drops/${drop.slug}`}
      className="card-drop"
      data-reveal
      style={{ "--i": Math.min(index, 6) } as React.CSSProperties}
    >
      <div className="card-drop__frame">
        <img
          src={asset(drop.hero.src)}
          alt={drop.hero.alt}
          width={1200}
          height={750}
          loading="lazy"
        />
        <span className="card-drop__id mono">{drop.id}</span>
      </div>

      <div className="card-drop__body">
        <div className="card-drop__row">
          <h3 className="card-drop__name">{drop.name}</h3>
          <span className="card-drop__go" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </div>

        <p className="card-drop__tagline">{drop.tagline}</p>

        <p className="card-drop__foot mono">
          <span>Replaces {drop.replaces.name}</span>
          <span className="struck">{drop.replaces.price}</span>
        </p>
      </div>
    </Link>
  );
}

/** The slot at the end of the rail: what is coming, and how to influence it. */
export function DropCardGhost({
  title,
  body,
  cta,
  href,
  art,
  index = 0,
}: {
  title: string;
  body: string;
  cta: string;
  href: string;
  art: React.ReactNode;
  index?: number;
}) {
  return (
    <article
      className="card-drop card-drop--ghost"
      data-reveal
      style={{ "--i": Math.min(index, 6) } as React.CSSProperties}
    >
      <div className="card-drop__frame card-drop__frame--art">{art}</div>
      <div className="card-drop__body">
        <div className="card-drop__row">
          <h3 className="card-drop__name">{title}</h3>
        </div>
        <p className="card-drop__tagline">{body}</p>
        <p className="card-drop__foot mono">
          <a href={href} target="_blank" rel="noreferrer">
            {cta} →
          </a>
        </p>
      </div>
    </article>
  );
}
