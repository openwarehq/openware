import { DROPS, ledger } from "@/data/drops";
import { ON_THE_BLOCK } from "@/data/targets";

/**
 * The hero's right-hand visual: a receipt for everything you stop paying for.
 *
 * Drawn rather than photographed, and built from the real data — the published
 * drops are struck through with their actual prices, and the rest of the list
 * is pending. Nothing here is decorative filler; if a drop ships, the receipt
 * changes on its own.
 */
export function Receipt() {
  const pending = ON_THE_BLOCK.filter((n) => n.length < 18).slice(0, 4);
  const { annualUsd } = ledger();

  return (
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
