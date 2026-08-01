"use client";

import { useMemo, useState } from "react";
import { DropCard } from "@/components/DropCard";
import { DROPS, searchDrops } from "@/data/drops";
import { NOMINATE } from "@/lib/links";

export function DropsBrowser() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchDrops(query), [query]);

  return (
    <>
      <div className="search">
        <label htmlFor="drop-search" className="search__label">
          Search drops
        </label>
        <div className="search__field">
          <svg
            className="search__icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            id="drop-search"
            type="search"
            className="search__input"
            placeholder="Search drops or the subscription they replace"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
        </div>
      </div>

      <p className="results-count mono" role="status">
        {results.length} {results.length === 1 ? "drop" : "drops"}
        {query && ` matching “${query}”`}
      </p>

      {results.length > 0 ? (
        <div className="grid">
          {results.map((drop, i) => (
            <DropCard key={drop.slug} drop={drop} index={i} />
          ))}
        </div>
      ) : (
        <div className="empty">
          {DROPS.length === 0 ? (
            <>
              <h2 className="h3">Nothing published yet.</h2>
              <p className="empty__body">
                The first replacement is being built and used before it ships —
                nothing lands here until it clears all five rules. Tell us which
                subscription to take on and it goes on the list.
              </p>
            </>
          ) : (
            <>
              <h2 className="h3">Nothing matches “{query}”.</h2>
              <p className="empty__body">
                There {DROPS.length === 1 ? "is" : "are"} only {DROPS.length}{" "}
                drop{DROPS.length === 1 ? "" : "s"} so far, so the honest answer
                is usually “not yet”. If the thing you searched for is a
                subscription worth replacing, say so and it goes on the list.
              </p>
            </>
          )}
          <div className="empty__actions">
            {/* Nothing to clear when the query is what's empty. */}
            {query && (
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => setQuery("")}
              >
                Clear search
              </button>
            )}
            <a
              href={NOMINATE}
              className="btn btn--primary"
              target="_blank"
              rel="noreferrer"
            >
              Nominate {query ? `“${query}”` : "a target"}
              <span className="btn__arrow" aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
