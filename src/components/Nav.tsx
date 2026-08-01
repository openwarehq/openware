"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mark } from "./Mark";
import { NOMINATE, REPO } from "@/lib/links";

const LINKS = [
  { href: "/drops", label: "Browse drops" },
  { href: "/how-it-works", label: "How it works" },
  { href: NOMINATE, label: "Nominate a target", external: true },
] as const;

/**
 * There is deliberately no "Sign in". There is no Openware account and there
 * will never be one, so the slot that would hold it holds GitHub instead.
 */
export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="nav">
      <Link href="/" className="nav__brand" aria-label="Openware — home">
        <Mark />
        <span>openware.</span>
      </Link>

      <div className="nav__links">
        {LINKS.map((link) =>
          "external" in link && link.external ? (
            <a
              key={link.href}
              href={link.href}
              className="nav__link"
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
            </a>
          ) : (
            <Link
              key={link.href}
              href={link.href}
              className="nav__link"
              aria-current={
                pathname === link.href || pathname === `${link.href}/`
                  ? "page"
                  : undefined
              }
            >
              {link.label}
            </Link>
          ),
        )}
      </div>

      <a className="nav__cta" href={REPO} target="_blank" rel="noreferrer">
        GitHub
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M7 17 17 7M8 7h9v9" />
        </svg>
      </a>
    </nav>
  );
}
