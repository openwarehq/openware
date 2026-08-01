/**
 * The drop index.
 *
 * This file is the whole content layer. Every page, the browse search, the
 * static route params and the counters on the home page read from here —
 * adding drop #006 means appending one object below and nothing else.
 */

export type DropStatus = "shipped" | "built" | "planned";

export interface Replaces {
  /** Product name only. No logos, no marks, no assets — see the README. */
  name: string;
  url: string;
  /** Exactly as the vendor bills it. */
  price: string;
  /** What that works out to per year, in USD, for the ledger arithmetic. */
  annualUsd: number;
}

export interface Shot {
  src: string;
  alt: string;
  caption: string;
}

export interface Drop {
  /** Zero-padded drop number, as used in the repo. */
  id: string;
  slug: string;
  name: string;
  /** One line, sentence case, no trailing period. */
  tagline: string;
  /** Two or three sentences for the detail page lede. */
  summary: string;
  replaces: Replaces;
  status: DropStatus;
  /** Honest qualifier shown next to the status badge, if any. */
  statusNote?: string;
  /** Drives search. Lowercase, no punctuation. */
  tags: string[];
  hero: Shot;
  gallery: Shot[];
  /** The argument for the drop. Two to five. */
  highlights: { title: string; body: string }[];
  /** Bar rule #4: an honest "what this doesn't do", verbatim from the README. */
  limits: string[];
  /** Numbers that were measured, not estimated. */
  measured?: { label: string; value: string }[];
}

export const DROPS: Drop[] = [
  {
    id: "006",
    slug: "ledge",
    name: "ledge",
    tagline: "A shelf in the corner of your screen that asks for no permissions",
    summary:
      "A box docked in a screen corner, invisible until you drag something at it — then it comes out to take the drop and slides away when you are done. Native macOS, built from source on your own machine. It asks for no Accessibility prompt, no Full Disk Access, no login, and it never touches the network.",
    replaces: {
      name: "Dropover",
      url: "https://dropoverapp.com",
      price: "$7 one-time",
      // One-time purchases contribute nothing to a per-year figure.
      annualUsd: 0,
    },
    status: "shipped",
    statusNote: "native macOS, no permissions, no network",
    tags: [
      "shelf",
      "drag and drop",
      "files",
      "macos",
      "dropover",
      "yoink",
      "clipboard",
      "finder",
      "airdrop",
    ],
    hero: {
      src: "/shots/ledge-shelf.jpg",
      alt: "The Ledge shelf holding a stack of files, a link and a text snippet",
      caption:
        "A stack of two files, a link, and a text snippet. Stacks fan out and count themselves; links get a colour derived from their domain, because fetching a favicon would mean touching the network.",
    },
    gallery: [
      {
        src: "/shots/ledge-empty.jpg",
        alt: "An empty Ledge shelf with a drag hovering over it",
        caption:
          "Empty, with a drag hovering. The shelf comes out to meet the drag rather than waiting to be found.",
      },
    ],
    highlights: [
      {
        title: "Zero permissions, by construction",
        body: "macOS lets any app watch mouse events globally without permission — only keyboard monitoring needs Accessibility. So the shelf wakes on where your pointer is, never on what you type. The global shortcut goes through Carbon’s RegisterEventHotKey, which also needs none. That is why a 1990s API is in there.",
      },
      {
        title: "Three independent ways in",
        body: "A hot corner, a 10pt edge tab that is itself a drop target, and a hotkey. Global mouse events during another app’s drag session cannot be relied on, so the edge tab works even when no pointer event ever reaches Ledge.",
      },
      {
        title: "Text and links become real files",
        body: "A snippet is mirrored to a .txt and a link to a .webloc the moment it lands, so Finder accepts them — while text fields still receive the plain string.",
      },
      {
        title: "It never touches the network",
        body: "No telemetry, no account, no updates, no model. The only drop with no .env, because a shelf that needs an API key is the joke this whole project is about.",
      },
    ],
    limits: [
      "No Handoff, no cross-device sync, no cloud. Real Handoff needs a paid Apple developer account and iCloud entitlements, which an app you build yourself cannot have. AirDrop via the share button is one click and needs no account.",
      "Not notarized, no signed DMG. You build it from source; it is ad-hoc signed on your own machine, which is why Gatekeeper never gets involved.",
      "One shelf, not many. If you want three floating shelves at once, Dropover does that and does it well.",
      "No upload targets — no S3, Dropbox, Imgur or link shortening. Nothing here talks to a server.",
      "It doesn’t watch your Desktop for screenshots. Drag them in; it won’t take them.",
      "macOS 14+, Apple silicon or Intel. No iOS, no Windows, no Linux.",
    ],
    measured: [
      { label: "Tests green", value: "58" },
      { label: "Build warnings", value: "0" },
      { label: "Permissions requested", value: "0" },
      { label: "Network calls", value: "0" },
    ],
  },
  {
    id: "007",
    slug: "kve",
    name: "kve",
    tagline: "Drop in raw footage, get a cut, captioned, scored short back",
    summary:
      "An agent-driven editor for short-form video. It transcribes every word, cuts the dead air, draws motion graphics, animates captions and mixes music, then exports a portrait master. The CLI is deterministic and never calls a model — the judgment lives in markdown skills, so the same folder runs on whichever coding agent you already use.",
    replaces: {
      name: "Descript",
      url: "https://www.descript.com",
      price: "$24/mo",
      annualUsd: 288,
    },
    status: "built",
    statusNote: "first draft, verified on a real clip",
    tags: [
      "video",
      "editing",
      "captions",
      "subtitles",
      "shorts",
      "reels",
      "descript",
      "opus clip",
      "transcription",
      "motion graphics",
    ],
    hero: {
      src: "/shots/kve-graphics.jpg",
      alt: "Three motion-graphic plates kve renders: a title card, a stat card and a numbered steps list",
      caption:
        "Graphics kve draws for a cut — a title, a stat and a step list. They are HyperFrames HTML rendered to video, so every one is editable text rather than a baked image.",
    },
    gallery: [],
    highlights: [
      {
        title: "The CLI never calls a model",
        body: "Every command is a pure function of disk state and flags. The intelligence is markdown in .claude/skills/, which is why it is model-agnostic by construction: running it on a different agent means pointing that agent at the same folder, with no code change, no SDK and no API key in the repo.",
      },
      {
        title: "All state is JSON on disk",
        body: "The edit decision list is the source of truth and the agent writes only that plus the graphics. Derived files are never hand-edited, so a fresh session resumes from one status command.",
      },
      {
        title: "Content-addressed render cache",
        body: "Re-exporting an unchanged segment is a cache hit, which took one test clip from 54s to 4.4s.",
      },
      {
        title: "Dead air comes from the audio, not the transcript",
        body: "Whisper stretches word end times across silence, so word ends are useless as cut boundaries. Silence is detected from the waveform instead — the bug that finding cost is now the design.",
      },
    ],
    limits: [
      "It is a folder you drive with a coding agent, not an app. There is no GUI and no timeline to scrub.",
      "Portrait output. The pipeline targets 1080×1920 short-form, not 16:9 long-form.",
      "You install ffmpeg and whisper-cpp yourself. Both are one brew command, but they are not bundled.",
      "First draft. It has been run end to end on a real clip, not across a wide range of footage — treat the edge cases as unexplored.",
      "It cannot judge what is interesting. The agent decides what to cut from a transcript; a bad take stays a bad take.",
    ],
    measured: [
      { label: "Tests green", value: "41" },
      { label: "Test clip, cut", value: "18.5s → 15.5s" },
      { label: "Re-export with cache", value: "54s → 4.4s" },
      { label: "LLM calls made by the CLI", value: "0" },
    ],
  },
];

export const DROPS_BY_SLUG: ReadonlyMap<string, Drop> = new Map(
  DROPS.map((d) => [d.slug, d]),
);

export function getDrop(slug: string): Drop | undefined {
  return DROPS_BY_SLUG.get(slug);
}

/**
 * What the shipped drops save you per year, and the monthly figure the README
 * quotes. Derived so the headline number can never drift from the table.
 */
export function ledger() {
  const annual = DROPS.reduce((sum, d) => sum + d.replaces.annualUsd, 0);
  return {
    count: DROPS.length,
    annualUsd: annual,
    monthlyUsd: Math.round(annual / 12),
  };
}

/**
 * Free-text search over the fields a person would actually type: the drop's
 * own name, what it replaces, and what it is for. Empty query returns
 * everything, in order.
 */
export function searchDrops(query: string, drops: Drop[] = DROPS): Drop[] {
  const q = query.trim().toLowerCase();
  if (!q) return drops;
  const terms = q.split(/\s+/);
  return drops.filter((drop) => {
    const haystack = [
      drop.name,
      drop.tagline,
      drop.summary,
      drop.replaces.name,
      ...drop.tags,
    ]
      .join(" ")
      .toLowerCase();
    return terms.every((term) => haystack.includes(term));
  });
}
