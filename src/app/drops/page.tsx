import type { Metadata } from "next";
import Link from "next/link";
import { DropsBrowser } from "@/components/DropsBrowser";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "All drops",
  description:
    "Every self-hostable replacement, searchable by what you want to do or the subscription you want to cancel.",
};

export default function DropsPage() {
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
            <h1 className="display page-head__title" data-reveal>
              All drops
            </h1>
            <p className="page-head__lede" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
              Search by what you want to do — or by the subscription you want to
              replace.
            </p>
          </header>

          <DropsBrowser />
        </div>
      </main>
      <Footer />
    </>
  );
}
