/**
 * The drop index.
 *
 * This file is the whole content layer. Every page, the browse search, the
 * static route params and the counters on the home page read from here —
 * adding drop #006 means appending one object below and nothing else.
 */

export type DropStatus = "shipped" | "built" | "planned";

export interface Replaces {
  /** Product name only. No logos, no marks, no assets — see the README. */
  name: string;
  url: string;
  /** Exactly as the vendor bills it. */
  price: string;
  /** What that works out to per year, in USD, for the ledger arithmetic. */
  annualUsd: number;
}

export interface Shot {
  src: string;
  alt: string;
  caption: string;
}

export interface Drop {
  /** Zero-padded drop number, as used in the repo. */
  id: string;
  slug: string;
  name: string;
  /** One line, sentence case, no trailing period. */
  tagline: string;
  /** Two or three sentences for the detail page lede. */
  summary: string;
  replaces: Replaces;
  status: DropStatus;
  /** Honest qualifier shown next to the status badge, if any. */
  statusNote?: string;
  /** Drives search. Lowercase, no punctuation. */
  tags: string[];
  hero: Shot;
  gallery: Shot[];
  /** The argument for the drop. Two to five. */
  highlights: { title: string; body: string }[];
  /** Bar rule #4: an honest "what this doesn't do", verbatim from the README. */
  limits: string[];
  /** Numbers that were measured, not estimated. */
  measured?: { label: string; value: string }[];
}

/**
 * No drops published yet. Adding one is a single object here — every page, the
 * search index, the home counters and the static route params follow from it.
 * See the Drop interface above for the shape; the schema is exercised and the
 * empty case is handled everywhere (rail, browse, ledger).
 */
export const DROPS: Drop[] = [];

export const DROPS_BY_SLUG: ReadonlyMap<string, Drop> = new Map(
  DROPS.map((d) => [d.slug, d]),
);

export function getDrop(slug: string): Drop | undefined {
  return DROPS_BY_SLUG.get(slug);
}

/**
 * What the shipped drops save you per year, and the monthly figure the README
 * quotes. Derived so the headline number can never drift from the table.
 */
export function ledger() {
  const annual = DROPS.reduce((sum, d) => sum + d.replaces.annualUsd, 0);
  return {
    count: DROPS.length,
    annualUsd: annual,
    monthlyUsd: Math.round(annual / 12),
  };
}

/**
 * Free-text search over the fields a person would actually type: the drop's
 * own name, what it replaces, and what it is for. Empty query returns
 * everything, in order.
 */
export function searchDrops(query: string, drops: Drop[] = DROPS): Drop[] {
  const q = query.trim().toLowerCase();
  if (!q) return drops;
  const terms = q.split(/\s+/);
  return drops.filter((drop) => {
    const haystack = [
      drop.name,
      drop.tagline,
      drop.summary,
      drop.replaces.name,
      ...drop.tags,
    ]
      .join(" ")
      .toLowerCase();
    return terms.every((term) => haystack.includes(term));
  });
}
