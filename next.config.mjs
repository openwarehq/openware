/**
 * Static export. `next build` writes plain HTML/CSS/JS to out/ — no server,
 * no Node runtime, nothing to host beyond a bucket or GitHub Pages.
 *
 * Stop the dev server before building. `next dev` and `next build` both own
 * .next, so a build run against a live dev server replaces the chunks it is
 * serving and it dies with "Cannot find module './240.js'". Setting distDir
 * does NOT avoid this — the build's server output still lands in .next, and
 * all distDir does is send the export somewhere other than out/, which is
 * worse. Just stop dev first.
 */

/**
 * BASE_PATH exists because a GitHub project site is served from a
 * subdirectory, while a custom domain is served from the root. The Pages
 * workflow sets it; local dev leaves it empty.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  // Every href in the app is written relative to this, so a subdirectory
  // deploy needs no per-link edits.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  // The optimiser is a server feature; a static export cannot run it.
  images: { unoptimized: true },
  // Pages serves /drops/ as /drops/index.html. Without this, links to
  // /drops 404 on the first request.
  trailingSlash: true,
};

export default nextConfig;
