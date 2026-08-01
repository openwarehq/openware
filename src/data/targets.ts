/**
 * On the block — subscriptions with a drop coming for them.
 *
 * These are names only. The board draws an abstract mark for each one; nothing
 * here is or resembles a real logo, and no vendor asset is used anywhere in
 * this repo. `glyph` picks which of the drawn marks a card gets.
 */

export type Glyph = "orbit" | "wave" | "bolt" | "spark" | "prism" | "loop";

export interface Target {
  name: string;
  /** What it costs, as billed. Shown struck through. */
  price: string;
  glyph: Glyph;
  /** Board placement, in percent of the board's box. */
  x: number;
  y: number;
  /** Degrees of pin rotation. Small values only — these are pinned, not thrown. */
  tilt: number;
}

/**
 * Pinned to the hero board, connected by string.
 *
 * x/y are the card's top-left corner as a percentage of the board. A card is
 * 17.5% wide and roughly 35% tall. The two rows are staggered horizontally and
 * kept ~46 apart vertically so the string has open cork to cross — bigger
 * cards fill the board and the string disappears behind them.
 */
export const BOARD_TARGETS: Target[] = [
  { name: "Perplexity", price: "$20/mo", glyph: "orbit", x: 5, y: 5, tilt: -4.5 },
  { name: "Cursor", price: "$20/mo", glyph: "prism", x: 40, y: 1, tilt: 3.2 },
  { name: "Wispr Flow", price: "$12/mo", glyph: "wave", x: 75, y: 6, tilt: -2.4 },
  { name: "Rize", price: "$16.99/mo", glyph: "loop", x: 14, y: 52, tilt: 4.1 },
  { name: "Napkin", price: "$10/mo", glyph: "spark", x: 48, y: 56, tilt: -3.6 },
  { name: "Granola", price: "$18/mo", glyph: "bolt", x: 79, y: 50, tilt: 2.8 },
];

/** The longer list, shown as chips further down the page. */
export const ON_THE_BLOCK: string[] = [
  "Perplexity",
  "Cursor",
  "Wispr Flow",
  "Rize",
  "Opal",
  "Napkin",
  "Granola",
  "Superhuman",
  "Otter",
  "every screentime app charging a subscription to turn off notifications",
];
