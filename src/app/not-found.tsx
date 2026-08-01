import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main" className="notfound">
        <div className="shell">
          <p className="eyebrow" data-reveal>404</p>
          <h1 className="display notfound__title" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            Nothing pinned
            <br />
            up here.
          </h1>
          <p className="lede" data-reveal style={{ "--i": 2 } as React.CSSProperties}>
            This page doesn&rsquo;t exist — or it did, and the drop it belonged
            to was removed.
          </p>
          <div className="hero__actions" data-reveal style={{ "--i": 3 } as React.CSSProperties}>
            <Link href="/drops" className="btn btn--primary">
              Browse the drops
              <span className="btn__arrow" aria-hidden="true">
                →
              </span>
            </Link>
            <Link href="/" className="btn btn--ghost">
              Back home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
