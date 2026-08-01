"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/asset";

/**
 * The sky behind the hero: drifting cloud under a halftone dot screen.
 *
 * The <video> deliberately has no `autoplay` attribute. Playback is started
 * from here only when the visitor has not asked for reduced motion, so:
 *
 *   - reduced motion  → the poster frame, held still. Same picture, no movement.
 *   - no JavaScript   → the poster frame. Nothing missing, nothing downloaded.
 *   - otherwise       → it plays, muted and looping.
 *
 * The poster is frame 0 of the clip, so the still and the first painted frame
 * are identical and nothing jumps when playback starts.
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
        return;
      }
      // A rejected play() is not worth surfacing — some browsers refuse until
      // the page has been interacted with, and the poster is a fine fallback.
      void video.play().catch(() => {});
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
        poster={asset("/media/sky.jpg")}
        muted
        loop
        playsInline
        preload="metadata"
        tabIndex={-1}
      >
        <source src={asset("/media/sky.mp4")} type="video/mp4" />
      </video>
      {/* The dot screen that makes it read as a print, not a stock loop. */}
      <div className="backdrop__halftone" />
      <div className="backdrop__scrim" />
    </div>
  );
}
