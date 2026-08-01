"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/asset";

/**
 * The full-bleed backdrop behind the hero.
 *
 * The <video> deliberately has no `autoplay` attribute. Playback is started
 * from here only when the visitor has not asked for reduced motion, which
 * means:
 *
 *   - reduced motion  → the poster frame, held still. Same image, no movement.
 *   - no JavaScript   → the poster frame. Nothing is missing, nothing downloads.
 *   - otherwise       → it plays, muted and looping.
 *
 * The poster is frame 0 of the clip, so the still and the first painted frame
 * are the same picture and there is no jump when playback starts.
 */
export function HeroBackdrop() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      if (motion.matches) {
        video.pause();
        video.removeAttribute("data-playing");
        return;
      }
      // A rejected play() is not an error worth surfacing — some browsers
      // refuse until the page has been interacted with, and the poster is a
      // perfectly good fallback.
      void video.play().then(
        () => video.setAttribute("data-playing", ""),
        () => {},
      );
    };

    sync();
    motion.addEventListener("change", sync);
    return () => motion.removeEventListener("change", sync);
  }, []);

  return (
    <div className="backdrop" aria-hidden="true">
      <video
        ref={ref}
        className="backdrop__video"
        poster={asset("/media/ridge.jpg")}
        muted
        loop
        playsInline
        preload="none"
        tabIndex={-1}
      >
        <source src={asset("/media/ridge.mp4")} type="video/mp4" />
      </video>
      <div className="backdrop__scrim" />
      <div className="backdrop__grain" />
    </div>
  );
}
