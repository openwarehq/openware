/**
 * Prefix a public/ asset with the deployment base path.
 *
 * next/link and next/font handle basePath themselves; a raw <img src> does
 * not. A GitHub project site lives at /slopsource, so "/shots/a.png" has to
 * become "/slopsource/shots/a.png" or every screenshot 404s.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return `${BASE}${path.startsWith("/") ? path : `/${path}`}`;
}
