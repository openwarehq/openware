import { DROPS, ledger } from "@/data/drops";
import { ON_THE_BLOCK } from "@/data/targets";
import { asset } from "@/lib/asset";

/**
 * The hero's right-hand visual: a receipt for everything you stop paying for,
 * coming out of the till of the shop that printed it.
 *
 * The shop is a picture — generated pixel art, no photograph and no vendor
 * mark anywhere in it. The receipt is not a picture. Its lines are built from
 * the real data — the published drops struck through at their actual prices,
 * the rest pending — so if a drop ships, the receipt changes on its own. That
 * is why the paper is still drawn in CSS on top of the art rather than baked
 * into it: a painted receipt would be frozen the day it was painted.
 *
 * The art is loaded through asset() rather than a CSS url(), because a
 * stylesheet gets no basePath and this site is served from a subdirectory.
 */
export function Receipt() {
  const pending = ON_THE_BLOCK.filter((n) => n.length < 18).slice(0, 4);
  const { annualUsd } = ledger();

  return (
    <div
      className="store"
      style={{ backgroundImage: `url(${asset("/media/store.webp")})` }}
    >
      {/* The inset lives on this wrapper, not on .store. Percentage padding
          resolves against the containing block's width — put it on .store and
          it measures the hero column instead of the shop, so the paper drifts
          off the counter the moment the column changes size. Here the
          containing block is .store itself, which is exactly what the art is
          drawn at. */}
      <div className="store__inner">
        <div className="receipt" role="img" aria-label={label()}>
        <div className="receipt__paper">
          <div className="receipt__head">
            <span className="receipt__title mono">SUBSCRIPTIONS</span>
            <span className="receipt__sub mono">cancelled · openware</span>
          </div>

          <div className="receipt__rule" aria-hidden="true" />

          <ul className="receipt__lines">
            {DROPS.map((drop, i) => (
              <li
                key={drop.slug}
                className="receipt__line receipt__line--paid mono"
                style={{ "--n": i } as React.CSSProperties}
              >
                <span className="receipt__what">{drop.replaces.name}</span>
                <span className="receipt__dots" aria-hidden="true" />
                <span className="receipt__price">{drop.replaces.price}</span>
              </li>
            ))}
            {pending.map((name, i) => (
              <li
                key={name}
                className="receipt__line receipt__line--pending mono"
                style={{ "--n": DROPS.length + i } as React.CSSProperties}
              >
                <span className="receipt__what">{name}</span>
                <span className="receipt__dots" aria-hidden="true" />
                <span className="receipt__price">pending</span>
              </li>
            ))}
          </ul>

          <div className="receipt__rule" aria-hidden="true" />

          {/* What the struck-through lines add up to. A one-time purchase
            contributes nothing to a per-year figure, so ledge's $7 is on the
            receipt but not in this number — hence the explicit /yr. */}
          <div className="receipt__subtotal mono">
            <span className="receipt__what">THEY CHARGE</span>
            <span className="receipt__dots" aria-hidden="true" />
            <span className="receipt__price">
              ${annualUsd.toLocaleString("en-US")}/yr
            </span>
          </div>

          <div className="receipt__total">
            <span className="receipt__total-label mono">YOU PAY</span>
            <span className="receipt__total-value">$0</span>
          </div>

          <p className="receipt__foot mono">
            no account · no tier · nothing to cancel
          </p>

            {/* The torn edge. */}
            <div className="receipt__tear" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}

function label(): string {
  const replaced = DROPS.map(
    (d) => `${d.replaces.name} at ${d.replaces.price}`,
  ).join(", ");
  // role="img" means this string is the whole receipt to a screen reader, so
  // the figure has to be in here too or it is sighted-only.
  const annual = ledger().annualUsd.toLocaleString("en-US");
  return `A receipt of cancelled subscriptions: ${replaced}, all struck through. They charge $${annual} a year; you pay zero.`;
}
