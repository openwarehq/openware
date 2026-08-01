"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * One scroll-reveal runtime for the whole site.
 *
 * Any element on any page can opt in with `data-reveal` — no wrapper
 * component, so pages stay server components.
 *
 * The hidden state is gated behind `html[data-reveal="on"]`, which only this
 * component sets. With JS unavailable the attribute is never added, the CSS
 * never applies, and every element renders visible. Failing open matters on a
 * static site: content must not depend on a script to be readable.
 */
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;

    // Honour the OS setting: no hiding, no observing, nothing to undo.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.removeAttribute("data-reveal");
      return;
    }

    root.dataset.reveal = "on";

    // Anything already on screen at load reveals immediately rather than
    // waiting for a scroll that may never come on a short page.
    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          obs.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
    );

    const observe = (el: HTMLElement) => {
      if (!el.classList.contains("is-in")) observer.observe(el);
    };

    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach(observe);

    // The search results on /drops are rendered client-side and re-created as
    // the query changes, long after the pass above. Without this, a tile that
    // React mounts fresh is never observed and stays at opacity 0 for good.
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (!(node instanceof HTMLElement)) continue;
          if (node.hasAttribute("data-reveal")) observe(node);
          node
            .querySelectorAll<HTMLElement>("[data-reveal]")
            .forEach(observe);
        }
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
    // Client navigation swaps the DOM, so the new page needs observing.
  }, [pathname]);

  return null;
}
