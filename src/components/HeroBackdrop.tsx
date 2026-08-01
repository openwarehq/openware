import { asset } from "@/lib/asset";

/**
 * The sky plate behind the hero.
 *
 * A still image with a very slow CSS drift rather than a video: 35 KB instead
 * of a megabyte of MP4, no playback policy to fight, nothing to pause, and it
 * stops dead under `prefers-reduced-motion` because the animation is declared
 * inside a `no-preference` query rather than bolted on and overridden.
 *
 * It is a server component for the same reason — no runtime is involved.
 */
export function HeroBackdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <img
        className="backdrop__img"
        src={asset("/media/sky.jpg")}
        alt=""
        width={1920}
        height={1072}
        /* Above the fold: this is the one image that must not lazy-load. */
        fetchPriority="high"
      />
      <div className="backdrop__scrim" />
    </div>
  );
}
