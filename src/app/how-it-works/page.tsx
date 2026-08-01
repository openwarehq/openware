import type { Metadata } from "next";
import Link from "next/link";
import { CopyBlock } from "@/components/CopyBlock";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { NOMINATE } from "@/lib/links";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Clone a drop, point it at a model you own, and run it. One config, inherited by every drop. No account, no hosted tier.",
};

const ENV = `LLM_BASE_URL=https://openrouter.ai/api/v1
LLM_MODEL=google/gemma-4-26b-a4b-it:free
LLM_API_KEY=                    # free key, no card`;

const LOCAL = `brew install --cask ollama
OLLAMA_CONTEXT_LENGTH=16384 ollama serve
ollama pull qwen2.5-coder:7b`;

const PROVIDERS = [
  { name: "OpenRouter", url: "https://openrouter.ai/keys", base: "https://openrouter.ai/api/v1" },
  { name: "Groq", url: "https://console.groq.com/keys", base: "https://api.groq.com/openai/v1" },
  { name: "Cerebras", url: "https://cloud.cerebras.ai", base: "https://api.cerebras.ai/v1" },
  {
    name: "Google AI Studio",
    url: "https://aistudio.google.com/apikey",
    base: "https://generativelanguage.googleapis.com/v1beta/openai",
  },
  { name: "NVIDIA NIM", url: "https://build.nvidia.com", base: "https://integrate.api.nvidia.com/v1" },
];

const STEPS = [
  {
    n: "01",
    title: "Clone the one you want",
    body: "Every drop is its own repository. Its own compose file, its own dependencies, its own README — nothing shared, nothing to check out that you didn't ask for.",
  },
  {
    n: "02",
    title: "Point it at a model",
    body: "The same three variables in every drop. A free hosted key takes about a minute and needs no card, or run fully local against Ollama and nothing leaves your machine.",
  },
  {
    n: "03",
    title: "docker compose up",
    body: "That is the install. If it takes longer than a minute, that is a bug worth reporting — not a step you were supposed to figure out.",
  },
];

export default function HowItWorks() {
  return (
    <>
      <Nav />
      <main id="main" className="page">
        <div className="page__glow" aria-hidden="true" />
        <div className="shell">
          <Link href="/" className="back mono">
            ← Home
          </Link>

          <header className="page-head">
            <h1 className="display page-head__title" data-reveal>How it works</h1>
            <p className="page-head__lede" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
              Clone it, point it at a model you own, run it. Every drop reads the
              same three variables, so what you set up for the first one works
              for the hundredth.
            </p>
          </header>

          <ol className="steps">
            {STEPS.map((s, i) => (
              <li key={s.n} className="step" data-reveal style={{ "--i": i } as React.CSSProperties}>
                <span className="step__n mono">{s.n}</span>
                <h2 className="step__title">{s.title}</h2>
                <p className="step__body">{s.body}</p>
              </li>
            ))}
          </ol>

          <section className="drop-section split">
            <div>
              <h2 className="h2 drop-section__title" data-reveal>One config</h2>
              <CopyBlock code={ENV} label=".env"  />
              <p className="split__note">
                Anything that speaks the OpenAI chat-completions shape works.
                Point <code>LLM_BASE_URL</code> at Anthropic and drops that
                support it switch wire format themselves rather than making you
                configure it.
              </p>
            </div>
            <div>
              <h2 className="h2 drop-section__title" data-reveal>Or fully local</h2>
              <CopyBlock code={LOCAL} label="shell"  />
              <p className="split__note">
                <strong>
                  <code>OLLAMA_CONTEXT_LENGTH</code> is not optional.
                </strong>{" "}
                Ollama defaults to 4096 tokens and truncates longer prompts
                silently — generation looks fine while editing appears
                completely broken.
              </p>
            </div>
          </section>

          <section className="drop-section">
            <h2 className="h2 drop-section__title" data-reveal>Free providers, no card</h2>
            <div className="table-wrap" data-reveal>
              <table className="table">
                <thead>
                  <tr>
                    <th>Provider</th>
                    <th>Base URL</th>
                    <th>Key</th>
                  </tr>
                </thead>
                <tbody>
                  {PROVIDERS.map((p) => (
                    <tr key={p.name}>
                      <td>{p.name}</td>
                      <td className="mono">{p.base}</td>
                      <td>
                        <a href={p.url} target="_blank" rel="noreferrer">
                          Get one ↗
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="drop-section limits">
            <h2 className="h2 drop-section__title" data-reveal>Read this first</h2>
            <ul className="limits__list">
              <li>
                <strong>There is no keyless free model.</strong> Every hosted
                provider rejects unauthenticated requests — checked, not
                assumed. Free means free of charge, not free of signup.
              </li>
              <li>
                <strong>Free tiers are smaller than they look.</strong>{" "}
                Measured: OpenRouter gives 50 requests a day on{" "}
                <code>:free</code> models, Google AI Studio gives 20 a day on
                gemini-2.5-flash. A 10-slide deck spends eleven.
              </li>
              <li>
                <strong>A daily cap is not a rate limit.</strong> Google answers
                a daily quota with a 26-second retry delay, which is useless
                advice — the limit resets at midnight. Drops tell the difference
                and fail fast instead of backing off for three minutes.
              </li>
              <li>
                <strong>You do not need a GPU.</strong> The default is a free
                hosted model. Nothing here assumes a frontier model.
              </li>
            </ul>
          </section>

          <section className="cta-band" data-reveal>
            <h2 className="h2">Something you want replaced?</h2>
            <p className="cta-band__body">
              The best nominations are specific: what it costs, what it actually
              does underneath, and the exact moment the paywall ruined your day.
            </p>
            <a
              href={NOMINATE}
              className="btn btn--primary"
              target="_blank"
              rel="noreferrer"
            >
              Nominate a target
              <span className="btn__arrow" aria-hidden="true">
                →
              </span>
            </a>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
