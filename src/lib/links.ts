/**
 * Where the source lives.
 *
 * Each drop is its own repository under the org — github.com/openwarehq/<slug>
 * — rather than a folder in a monorepo. HUB is the repo this site lives in and
 * where nominations are filed as issues.
 *
 * Note: the org is currently empty, so every link built here 404s until the
 * repos are created and pushed.
 */
export const ORG_NAME = "openwarehq";
export const ORG = `https://github.com/${ORG_NAME}`;

/** The repo holding this site, the issue templates and the shared docs. */
const HUB = `${ORG}/openware`;

export const REPO = ORG;
export const NOMINATE = `${HUB}/issues/new?template=target.md`;
export const ISSUES = `${HUB}/issues`;
export const LICENSE = `${HUB}/blob/main/LICENSE`;

/** A drop's own repository. */
export function dropRepo(slug: string): string {
  return `${ORG}/${slug}`;
}
