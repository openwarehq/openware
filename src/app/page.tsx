import Link from "next/link";
import { Board } from "@/components/Board";
import { CopyBlock } from "@/components/CopyBlock";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { OpenSlotArt, WorkshopArt } from "@/components/PlaceholderArt";
import { DROPS, ledger } from "@/data/drops";
import { BOARD_TARGETS, ON_THE_BLOCK } from "@/data/targets";
import { asset } from "@/lib/asset";
import { NOMINATE, REPO } from "@/lib/links";

const BOARD_COUNT = BOARD_TARGETS.length;

const ENV = `LLM_BASE_URL=https://openrouter.ai/api/v1
LLM_MODEL=google/gemma-4-26b-a4b-it:free
LLM_API_KEY=                    # free key, no card`;

const BAR = [
  {
    n: "01",
    title: "Your model. Always.",
    body: "Local on your own GPU, or your own API key. Never ours. If it can't run fully offline against a local model, it doesn't ship.",
  },
  {
    n: "02",
    title: "One command.",
    body: "docker compose up. If installing it needs a wiki, it isn't self-hostable — it's homework.",
  },
  {
    n: "03",
    title: "The core job, end to end.",
    body: "The thing the product is actually for, working, with real output. Mocked backends are not releases.",
  },
  {
    n: "04",
    title: "An honest “what this doesn't do.”",
    body: "In every README, near the top. Scope you state up front is a feature. Scope discovered at 2am is a betrayal.",
  },
  {
    n: "05",
    title: "It gets used before it ships.",
    body: "If we wouldn't reach for it over the thing it replaces, it isn't finished.",
  },
];

export default function Home() {
  const { count } = ledger();

  return (
    <>
      <Nav />
      <main id="main">
        {/* ── Hero ───────────────────────────────────────────── */}
        <section className="hero">
          <div className="hero__glow" aria-hidden="true" />
          <div className="shell hero__grid">
            <div className="hero__copy">
              <p className="eyebrow" data-reveal>Open source · Self-hosted · MIT</p>
              <h1 className="display hero__title" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
                Software you
                <br />
                own outright.
              </h1>

              <p className="lede hero__lede" data-reveal style={{ "--i": 2 } as React.CSSProperties}>
                Every release replaces a subscription you are already paying
                for. Clone it, point it at a model you own, and keep it — no
                account, no tier, nothing to buy.
              </p>
              <div className="hero__actions" data-reveal style={{ "--i": 3 } as React.CSSProperties}>
                <Link href="/drops" className="btn btn--primary">
                  Browse the drops
                  <span className="btn__arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
                <Link href="/how-it-works" className="btn btn--ghost">
                  How it works
                </Link>
              </div>
            </div>

            <div className="hero__board" data-reveal style={{ "--i": 2 } as React.CSSProperties}>
              <Board />
              <p className="hero__board-caption mono">
                {BOARD_COUNT} on the list.{" "}
                {count > 0
                  ? `${count} replaced so far.`
                  : "None replaced yet."}
              </p>
            </div>
          </div>
        </section>

        {/* ── The rail ───────────────────────────────────────── */}
        <section className="section rail-section">
          <div className="shell">
            <div className="section-head" data-reveal>
              <div>
                <p className="eyebrow">The drops</p>
                <h2 className="h2">Software you can actually own.</h2>
              </div>
              <Link href="/drops" className="btn btn--ghost">
                View all
                <span className="btn__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>

          <div className="rail" role="list">
            <div className="rail__pad" aria-hidden="true" />
            {DROPS.map((drop) => (
              <Link
                key={drop.slug}
                href={`/drops/${drop.slug}`}
                className="shot"
                role="listitem"
                data-reveal
              >
                <div className="shot__frame">
                  <img
                    src={asset(drop.hero.src)}
                    alt={drop.hero.alt}
                    width={1200}
                    height={750}
                    loading="lazy"
                  />
                  <span className="shot__index mono">{drop.id}</span>
                </div>
                <div className="shot__body">
                  <h3 className="h3 shot__name">{drop.name}</h3>
                  <p className="shot__tagline">{drop.tagline}</p>
                  <p className="shot__foot mono">
                    <span>
                      Replaces {drop.replaces.name}{" "}
                      <span className="struck">{drop.replaces.price}</span>
                    </span>
                    <span className="shot__arrow" aria-hidden="true">
                      →
                    </span>
                  </p>
                </div>
              </Link>
            ))}

            {/* An empty slot that says what it is, rather than a fake card. */}
            <article className="shot shot--ghost" role="listitem" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
              <div className="shot__frame shot__frame--empty">
                <WorkshopArt />
              </div>
              <div className="shot__body">
                <h3 className="h3 shot__name">In the workshop</h3>
                <p className="shot__tagline">
                  The next replacement is being built and used before it ships.
                  Nothing lands here until it clears all five rules.
                </p>
                <p className="shot__foot mono">
                  <a href={REPO} target="_blank" rel="noreferrer">
                    Watch the repo →
                  </a>
                </p>
              </div>
            </article>

            <article className="shot shot--ghost" role="listitem" data-reveal style={{ "--i": 2 } as React.CSSProperties}>
              <div className="shot__frame shot__frame--empty">
                <OpenSlotArt />
              </div>
              <div className="shot__body">
                <h3 className="h3 shot__name">Name the next one</h3>
                <p className="shot__tagline">
                  The best nominations are specific: what it costs, what it
                  actually does underneath, and the moment the paywall ruined
                  your day.
                </p>
                <p className="shot__foot mono">
                  <a href={NOMINATE} target="_blank" rel="noreferrer">
                    Nominate a target →
                  </a>
                </p>
              </div>
            </article>
            <div className="rail__pad" aria-hidden="true" />
          </div>
        </section>

        {/* ── The bar ────────────────────────────────────────── */}
        <section className="section bar-section" id="the-bar">
          <div className="shell">
            <div className="section-head" data-reveal>
              <div>
                <p className="eyebrow">The bar</p>
                <h2 className="h2">
                  Five rules. All five,
                  <br />
                  or it doesn&rsquo;t ship.
                </h2>
              </div>
              <p className="lede bar-section__note">
                Missing a day is survivable. One broken folder isn&rsquo;t.
              </p>
            </div>

            <ol className="bar">
              {BAR.map((rule, i) => (
                <li key={rule.n} className="rule" data-reveal style={{ "--i": i } as React.CSSProperties}>
                  <span className="rule__n mono">{rule.n}</span>
                  <h3 className="rule__title">{rule.title}</h3>
                  <p className="rule__body">{rule.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Bring your own everything ──────────────────────── */}
        <section className="section byo">
          <div className="shell byo__grid">
            <div data-reveal>
              <p className="eyebrow">Configuration</p>
              <h2 className="h2">Bring your own everything.</h2>
              <p className="lede" style={{ marginTop: "1.25rem" }}>
                Every drop reads the same three variables. Drop 001 and drop 100
                take identical config, so you set this up once and never think
                about it again.
              </p>
              <ul className="byo__list">
                <li>
                  <strong>You do not need a GPU.</strong> The default is a free
                  hosted model — no download, no credit card, about a minute to
                  get a key.
                </li>
                <li>
                  <strong>There is no keyless free model.</strong> Every hosted
                  provider rejects unauthenticated requests — checked, not
                  assumed. Free means free of charge, not free of signup.
                </li>
                <li>
                  <strong>Free tiers are smaller than they look.</strong>{" "}
                  Measured: OpenRouter gives 50 requests a day on{" "}
                  <code>:free</code> models. A 10-slide deck spends eleven of
                  them.
                </li>
              </ul>
              <Link
                href="/how-it-works"
                className="btn btn--ghost"
                style={{ marginTop: "1.75rem" }}
              >
                Read the setup
                <span className="btn__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>

            <div className="byo__code" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
              <CopyBlock code={ENV} label=".env" />
              <p className="byo__note mono">
                Anything speaking the OpenAI chat-completions shape works —
                Ollama, LM Studio, llama.cpp, vLLM, OpenRouter, Groq, Together,
                Cerebras, Google AI Studio, OpenAI itself.
              </p>
            </div>
          </div>
        </section>

        {/* ── On the block ───────────────────────────────────── */}
        <section className="section section--tight block">
          <div className="shell">
            <p className="eyebrow" data-reveal>On the block</p>
            <h2 className="h3 block__title">
              Subscriptions with a replacement coming.
            </h2>
            <ul className="chips" data-reveal>
              {ON_THE_BLOCK.map((name) => (
                <li key={name} className="chip">
                  {name}
                </li>
              ))}
            </ul>
            <a
              href={NOMINATE}
              className="btn btn--primary"
              target="_blank"
              rel="noreferrer"
              style={{ marginTop: "2rem" }}
            >
              Nominate a target
              <span className="btn__arrow" aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
