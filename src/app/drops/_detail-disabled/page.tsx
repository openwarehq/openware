// ─────────────────────────────────────────────────────────────────────────
// The per-drop detail page. Parked, not deleted.
//
// Next cannot export a dynamic route that produces zero pages — with an empty
// DROPS array `next build` fails with:
//   Page "/drops/[slug]" is missing "generateStaticParams()"
// and no config flag avoids it (dynamicParams was tried).
//
// Folders prefixed with "_" are private in the App Router, so this file is
// typechecked but not routed. TO RESTORE, once DROPS has an entry:
//
//   git mv "src/app/drops/_detail-disabled" "src/app/drops/[slug]"
//
// Nothing inside needs changing.
// ─────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyBlock } from "@/components/CopyBlock";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { DROPS, getDrop } from "@/data/drops";
import { asset } from "@/lib/asset";
import { dropRepo } from "@/lib/links";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return DROPS.map((drop) => ({ slug: drop.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const drop = getDrop(slug);
  if (!drop) return { title: "Not found" };
  return {
    title: `${drop.name} — replaces ${drop.replaces.name}`,
    description: drop.tagline,
  };
}

export default async function DropPage({ params }: Params) {
  const { slug } = await params;
  const drop = getDrop(slug);
  if (!drop) notFound();

  const repo = dropRepo(drop.slug);
  const quickstart = `git clone ${repo}
cd ${drop.slug}
docker compose up`;

  return (
    <>
      <Nav />
      <main id="main" className="page">
        <div className="page__glow" aria-hidden="true" />
        <div className="shell">
          <Link href="/drops" className="back mono">
            ← All drops
          </Link>

          <header className="drop-head">
            <p className="mono drop-head__meta" data-reveal>
              Drop {drop.id}
              <span className="dot" aria-hidden="true" />
              Replaces {drop.replaces.name}{" "}
              <span className="struck">{drop.replaces.price}</span>
              <span className="dot" aria-hidden="true" />
              <span className="badge">
                {drop.status === "shipped" ? "Shipped" : "Built"}
                {drop.statusNote ? ` — ${drop.statusNote}` : ""}
              </span>
            </p>
            <h1
              className="display drop-head__title"
              data-reveal
              style={{ "--i": 1 } as React.CSSProperties}
            >
              {drop.name}
            </h1>
            <p
              className="drop-head__tagline"
              data-reveal
              style={{ "--i": 2 } as React.CSSProperties}
            >
              {drop.tagline}.
            </p>

            <div
              className="drop-head__actions"
              data-reveal
              style={{ "--i": 3 } as React.CSSProperties}
            >
              <a
                href={repo}
                className="btn btn--primary"
                target="_blank"
                rel="noreferrer"
              >
                View the source
                <span className="btn__arrow" aria-hidden="true">
                  →
                </span>
              </a>
              <a
                href={`${repo}#readme`}
                className="btn btn--ghost"
                target="_blank"
                rel="noreferrer"
              >
                Read the README
              </a>
            </div>
          </header>

          <figure className="figure" data-reveal>
            <img
              src={asset(drop.hero.src)}
              alt={drop.hero.alt}
              width={1600}
              height={1000}
            />
            <figcaption>{drop.hero.caption}</figcaption>
          </figure>

          <section className="prose">
            <p className="prose__lede" data-reveal>
              {drop.summary}
            </p>
          </section>

          <section className="drop-section">
            <h2 className="h2 drop-section__title" data-reveal>
              Why it works
            </h2>
            <div className="points">
              {drop.highlights.map((h, i) => (
                <article
                  key={h.title}
                  className="point"
                  data-reveal
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <h3 className="point__title">{h.title}</h3>
                  <p className="point__body">{h.body}</p>
                </article>
              ))}
            </div>
          </section>

          {drop.gallery.map((shot) => (
            <figure key={shot.src} className="figure" data-reveal>
              <img
                src={asset(shot.src)}
                alt={shot.alt}
                width={1600}
                height={1000}
              />
              <figcaption>{shot.caption}</figcaption>
            </figure>
          ))}

          <section className="drop-section split">
            <div data-reveal>
              <h2 className="h2 drop-section__title">Run it</h2>
              <CopyBlock code={quickstart} label="shell" />
              <p className="split__note">
                Then open the app and connect a model — pick a provider, paste a
                free key, done. It also reads a repo-root <code>.env</code> if
                you prefer a file.
              </p>
            </div>

            {drop.measured && (
              <div data-reveal style={{ "--i": 1 } as React.CSSProperties}>
                <h2 className="h2 drop-section__title">Measured</h2>
                <dl className="measured">
                  {drop.measured.map((m) => (
                    <div key={m.label} className="measured__row">
                      <dt>{m.label}</dt>
                      <dd className="mono">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </section>

          <section className="drop-section limits">
            <h2 className="h2 drop-section__title" data-reveal>
              What it doesn&rsquo;t do
            </h2>
            <p className="limits__note" data-reveal>
              Stated up front, because scope discovered at 2am is a betrayal.
            </p>
            <ul className="limits__list">
              {drop.limits.map((limit, i) => (
                <li
                  key={limit}
                  data-reveal
                  style={{ "--i": Math.min(i, 5) } as React.CSSProperties}
                >
                  {limit}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
