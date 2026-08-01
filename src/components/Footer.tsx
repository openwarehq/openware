import Link from "next/link";
import { Mark } from "./Mark";
import { ISSUES, LICENSE, NOMINATE, REPO } from "@/lib/links";

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__grid">
          <div className="footer__col footer__col--brand">
            <Link
              href="/"
              className="nav__brand"
              style={{ fontSize: "1.35rem" }}
            >
              <Mark />
              <span>openware.</span>
            </Link>
            <p
              className="lede"
              style={{ marginTop: "1.1rem", fontSize: "1rem" }}
            >
              Every subscription gets a real, self-hostable replacement. Clone
              it, run it, keep it.
            </p>
          </div>

          <div className="footer__col">
            <h4>The work</h4>
            <ul className="footer__list">
              <li>
                <Link href="/drops">Browse drops</Link>
              </li>
              <li>
                <Link href="/how-it-works">How it works</Link>
              </li>
              <li>
                <a href={REPO} target="_blank" rel="noreferrer">
                  Source on GitHub
                </a>
              </li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Take part</h4>
            <ul className="footer__list">
              <li>
                <a href={NOMINATE} target="_blank" rel="noreferrer">
                  Nominate a target
                </a>
              </li>
              <li>
                <a href={ISSUES} target="_blank" rel="noreferrer">
                  Report a bug
                </a>
              </li>
              <li>
                <a href={LICENSE} target="_blank" rel="noreferrer">
                  MIT licence
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="footer__wordmark" aria-hidden="true">
          openware.
        </p>

        <div className="footer__base mono">
          <span>MIT — take it, sell it, host it, fork it.</span>
          <span>
            Not affiliated with any company named here. Names describe what a
            drop replaces; no logos or assets are used.
          </span>
        </div>
      </div>
    </footer>
  );
}
