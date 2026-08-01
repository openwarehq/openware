import { BOARD_TARGETS, type Target } from "@/data/targets";
import { Glyph } from "./Glyph";

/**
 * Where a card's pin sits, in the board's 0–100 coordinate space: the top
 * centre of a 17.5%-wide card. Keep in step with .card width in globals.css.
 */
const PIN_DX = 8.75;
const PIN_DY = 1.2;

function pin(t: Target) {
  return { x: t.x + PIN_DX, y: t.y + PIN_DY };
}

/** Order the string is strung in: around the outside, then two chords across. */
const CIRCUIT = [0, 1, 2, 5, 4, 3, 0];
const CHORDS: [number, number][] = [
  [1, 4],
  [3, 5],
];

function polyline(indices: number[]): string {
  return indices
    .map((i, n) => {
      const p = pin(BOARD_TARGETS[i]);
      return `${n === 0 ? "M" : "L"}${p.x} ${p.y}`;
    })
    .join(" ");
}

/**
 * The board: subscriptions pinned up and struck through.
 *
 * Every part of this is drawn — the cork, the pins, the string and the marks.
 * There is no image file behind it, so it stays sharp at any size and costs
 * nothing to load. Motion is a pure CSS stagger and stops entirely under
 * prefers-reduced-motion.
 */
export function Board() {
  return (
    <div className="board" role="img" aria-label={ariaLabel()}>
      <div className="board__grain" aria-hidden="true" />
      <div className="board__light" aria-hidden="true" />

      {/* String sits under the cards so the pins appear to hold it down. */}
      <svg
        className="board__string"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* pathLength normalises every path to 1 unit, so one dash pattern
            draws them all regardless of their real length or the non-uniform
            viewBox scale. */}
        <path
          d={polyline(CIRCUIT)}
          className="board__thread"
          pathLength={1}
          vectorEffect="non-scaling-stroke"
        />
        {CHORDS.map(([a, b], i) => (
          <path
            key={i}
            d={polyline([a, b])}
            className="board__thread board__thread--chord"
            pathLength={1}
            vectorEffect="non-scaling-stroke"
            style={{ animationDelay: `${1.15 + i * 0.12}s` }}
          />
        ))}
      </svg>

      <div className="board__stage">
        {BOARD_TARGETS.map((t, i) => (
          <article
            key={t.name}
            className="card"
            style={
              {
                "--x": t.x,
                "--y": t.y,
                "--tilt": `${t.tilt}deg`,
                "--delay": `${0.12 + i * 0.09}s`,
              } as React.CSSProperties
            }
          >
            <span className="card__pin" aria-hidden="true" />
            <div className="card__tile">
              <Glyph name={t.glyph} />
              <svg
                className="card__strike"
                viewBox="0 0 100 100"
                aria-hidden="true"
              >
                <path
                  d="M14 15 86 85"
                  pathLength={1}
                  style={{ animationDelay: `calc(var(--delay) + 1.35s)` }}
                />
                <path
                  d="M86 15 14 85"
                  pathLength={1}
                  style={{ animationDelay: `calc(var(--delay) + 1.48s)` }}
                />
              </svg>
            </div>
            <div className="card__caption">
              <span className="card__name">{t.name}</span>
              <span className="card__price">{t.price}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ariaLabel(): string {
  const names = BOARD_TARGETS.map((t) => `${t.name} at ${t.price}`).join(", ");
  return `A pinboard of subscriptions marked for replacement, connected by red string: ${names}.`;
}
