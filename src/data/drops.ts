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
  /**
   * Overrides the "Run it" block. Most drops are a compose file and get the
   * default; a drop that isn't a running service would otherwise be told to
   * `docker compose up` something that has no compose file.
   */
  run?: { code: string; note: string };
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
    slug: "fableclip",
    name: "fableclip",
    tagline: "A long video in, ranked vertical shorts out — with the score explained",
    summary:
      "Paste a long video and get vertical, captioned shorts back, ranked by how likely each is to travel and told in plain numbers why. The model never writes a timestamp: transcript lines are numbered, it returns line ids, and TypeScript does the arithmetic. Every contribution to the 0–100 score is shown on the card.",
    replaces: {
      name: "OpusClip",
      url: "https://www.opus.pro",
      price: "$29/mo",
      annualUsd: 348,
    },
    status: "built",
    statusNote: "484 tests, verified end to end in Docker",
    tags: [
      "video",
      "clips",
      "shorts",
      "reels",
      "tiktok",
      "captions",
      "subtitles",
      "opusclip",
      "youtube",
      "repurposing",
    ],
    hero: {
      src: "/shots/fableclip-app.jpg",
      alt: "The fableclip interface: a URL field with clip count, length, framing and caption-style controls, above a completed fetch, transcribe, analyse and render pipeline",
      caption:
        "Paste a link, pick how many clips and how long, and the pipeline runs: fetch, transcribe, analyse, render. The model is named in the corner — it is yours, and it is the only thing here you supply.",
    },
    gallery: [],
    highlights: [
      {
        title: "The model never writes a timestamp",
        body: "Transcript lines are numbered and the model returns line ids; TypeScript turns those into times. A model that cannot invent a number cannot hand you a clip that starts mid-word.",
      },
      {
        title: "The score is arithmetic you can read",
        body: "Six 0–10 judgements weighted in code, plus modifiers measured from the transcript. Every contribution is shown on the card, so a ranking you disagree with tells you exactly which part to argue with.",
      },
      {
        title: "Free word-level alignment, if you know where to look",
        body: "YouTube's machine captions carry per-word tOffsetMs — creator-uploaded tracks do not, so the machine track is preferred over the human one. That is a word-accurate caption timing for nothing.",
      },
      {
        title: "Auto-focus without face detection",
        body: "96×54 greyscale samples, columns scored on motion and detail. It picked the speaker out of a side-by-side Zoom two-shot where a centre crop lands on the seam.",
      },
    ],
    limits: [
      "No face tracking, and it shows. Measured on the four clips above: three are framed on the speaker, one on the armchair beside him — a high-contrast object the heuristic likes as much as a face. One drag of the focus slider fixes it.",
      "Filler is removed from the captions, not the audio. You still hear the “um”; you just do not read it.",
      "No b-roll, no zooms, no music, no stock footage, no AI voice. It cuts what is there.",
      "No speaker diarisation. The transcript knows what was said, not who said it.",
      "No emoji or animated caption effects. Scaling the active word was tried and removed — ASS re-lays the line out every frame, so the caption twitches for the length of the clip.",
      "It cannot tell you what will go viral. Nothing can. It ranks the moments in this video against each other, which is a genuinely useful and different thing.",
      "The image is large — 1.6 GB measured. That is what ffmpeg, Python and faster-whisper weigh.",
    ],
    measured: [
      { label: "Tests green", value: "484" },
      { label: "Docker image", value: "1.6 GB" },
      { label: "38-min interview", value: "4 clips out" },
      { label: "Clip output", value: "1080×1920 H.264+AAC" },
    ],
  },
  {
    id: "008",
    slug: "pier",
    name: "pier",
    tagline: "As many macOS docks as you want, each pinned to its own display",
    summary:
      "macOS gives you one Dock, and on two monitors it either lives on one screen or chases the pointer. Pier gives you as many as you like — each pinned to a display, each with its own contents, position and look. Native Swift, built from source, and it asks for no permissions and never touches the network.",
    replaces: {
      name: "ExtraDock",
      url: "https://extradock.app",
      price: "€9.99/yr",
      annualUsd: 11,
    },
    status: "shipped",
    statusNote: "native macOS, no permissions, no network",
    tags: [
      "dock",
      "macos",
      "multi-monitor",
      "displays",
      "extradock",
      "launcher",
      "menu bar",
      "magnification",
    ],
    hero: {
      src: "/shots/pier-dock.jpg",
      alt: "A Pier dock with app icons, one magnified under the pointer, running indicators, a divider and the Trash",
      caption:
        "Icons magnify under the pointer, running apps get a dot, and dividers and widgets sit in the same row. Blur is composited by the window server, so it cannot be captured offscreen — the real thing is translucent.",
    },
    gallery: [
      {
        src: "/shots/pier-vertical.jpg",
        alt: "A vertical Pier dock pinned to the edge of a second display",
        caption:
          "Each dock is pinned to a display by its hardware UUID, not its display ID — IDs get recycled, so a dock pinned to “display 3” would otherwise reappear on whatever became display 3 next.",
      },
    ],
    highlights: [
      {
        title: "One struct owns the geometry",
        body: "DockLayout produces tile frames, hit testing and drag-insertion points. The SwiftUI drawing and the AppKit hit-testing both ask it, so they cannot disagree about where a tile is.",
      },
      {
        title: "Magnification is pure arithmetic",
        body: "A raised-cosine falloff plus neighbour displacement that sums to zero, so the dock does not drift sideways as the swell moves under your pointer. It is the one thing everyone notices when it is wrong, and far easier to prove than to eyeball.",
      },
      {
        title: "Zero permissions, again",
        body: "Global mouse monitoring needs no Accessibility grant — only keyboard monitoring does. Auto-hide reveal is a 4pt band at the screen edge, watched by pointer position alone.",
      },
      {
        title: "A dock whose monitor is gone, goes",
        body: "Screens are identified by CGDisplayCreateUUIDFromDisplayID with a name-and-resolution fallback. Unplug a display and its dock hides rather than piling onto whatever screen is left.",
      },
    ],
    limits: [
      "No notification badges. The unread count on a Dock icon is not published by macOS to anyone but the Dock, and guessing would be worse than omitting it.",
      "Mirroring the macOS Dock is a snapshot taken when you toggle it, not a live feed.",
      "Not notarized, no signed DMG. You build it from source; it is ad-hoc signed on your own machine.",
      "macOS 13+. No iOS, no Windows, no Linux.",
    ],
    measured: [
      { label: "Tests green", value: "59" },
      { label: "Build warnings", value: "0" },
      { label: "Permissions requested", value: "0" },
      { label: "Network calls", value: "0" },
    ],
  },
  {
    id: "009",
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
      src: "/shots/kve-tool.jpg",
      alt: "The kve editor: the transcript on the left with a struck-out word marking a cut, and the cleanup and judgment panels on the right",
      caption:
        "You edit the video by editing its transcript — a struck-out word is a cut. Dead air comes from ffmpeg reading the waveform, not from the transcript, because whisper stretches word ends across silence.",
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
  {
    id: "011",
    slug: "flowy",
    name: "flowy",
    tagline: "Screenshots in, a scored launch film out, rendered on your machine",
    summary:
      "Describe a product, drop in a few screenshots, and flowy writes the script against your own model, animates it into a beat-locked motion-graphics film, and renders the 1080p MP4 locally. The score is original and composed offline, and the film's beat grid is derived from the track, so every cut lands on the music rather than near it. No account, no credits, and nothing that counts your exported minutes.",
    replaces: {
      name: "Clueso",
      url: "https://www.clueso.io/pricing",
      price: "$120/mo billed yearly",
      annualUsd: 1440,
    },
    status: "shipped",
    statusNote: "76 tests, real MP4 out of a clean `docker compose up`",
    tags: [
      "video",
      "demo video",
      "product video",
      "launch film",
      "motion graphics",
      "screenshots",
      "clueso",
      "saas",
      "remotion",
    ],
    hero: {
      src: "/shots/flowy-studio.jpg",
      alt: "The flowy studio: a brief on the left, the animated film playing in the browser on the right, and a render panel offering the finished MP4",
      caption:
        "The player is the real composition, fully animated. Edit a scene and it changes in front of you \u2014 the MP4 is the same thing, encoded.",
    },
    gallery: [
      {
        src: "/shots/flowy-film.jpg",
        alt: "A frame from a rendered film: a product screenshot in a browser frame, tilted in 3D, under a small capsule reading LIVES IN YOUR TERMINAL",
        caption:
          "Your screenshots do the work, in browser frames the camera moves around. The type is Poppins, embedded in the bundle rather than fetched.",
      },
      {
        src: "/shots/flowy-stat.jpg",
        alt: "A frame from a rendered film: the figure 1M in large white type above a capsule reading tokens of context",
        caption:
          "One of nine board kinds. The cut onto the number is placed on a beat of the track that is playing under it.",
      },
      {
        src: "/shots/flowy-home.jpg",
        alt: "The flowy home screen: a form asking for a product name and what it does, above a list of films",
        caption:
          "The whole app. There is no sign-in, because there is nothing to sign in to.",
      },
    ],
    highlights: [
      {
        title: "The export is the point",
        body: "Clueso's cheapest paid tier is six hours of video exports a year, and its free tier is ten minutes and seven days. flowy writes an MP4 to a folder. There is no minute to count, so nothing counts it.",
      },
      {
        title: "Two ways to get a script, and you always know which",
        body: "Your model writes it, or a deterministic outline builds one from the brief with no model at all. The app it grew from silently swapped in the template whenever the model call failed \u2014 you got a worse script and no way to tell. Here the failure is shown and the outline is a button you press on purpose.",
      },
      {
        title: "The model never picks the timing",
        body: "Scene durations are computed in code from the narration, then quantised onto the beat grid of the track. A language model asked for frame counts returns a film that is eight seconds or four minutes long, depending on its mood.",
      },
      {
        title: "It renders where you are",
        body: "The original exported through Remotion Lambda: an AWS account, a deployed function, a bucket, four environment variables and a per-render cost. All of it existed to make export worth charging for. This is `@remotion/renderer` in the same process.",
      },
    ],
    limits: [
      "The render engine is Remotion, which is source-available and not MIT. Free for individuals and for-profit companies up to three employees; larger for-profits need a company licence. flowy's own code is MIT \u2014 the engine under it is not, and this is the one drop here with a pricing page still underneath it.",
      "16:9 only. No vertical and no square: the board grammar is composed for a wide frame.",
      "It does not record your screen. You bring screenshots and it makes motion graphics out of them.",
      "No narration. Films are scored, not spoken \u2014 the timing machinery for voiceover is there and nothing in the drop produces the audio.",
      "Rendering is slower in Docker than you will expect: a 32.6-second film took 83 seconds natively and 195 in the container, on the same machine.",
      "The three background worlds and the stock stills are fixed assets. It composes and scores your film; it does not generate new footage.",
      "One render at a time, and a restart loses the one in flight \u2014 the queue lives in the web process, because a queue that needs its own service is a second command.",
    ],
    measured: [
      { label: "Tests green", value: "76" },
      { label: "32.6s film, native", value: "83s" },
      { label: "Same film, in Docker", value: "195s" },
      { label: "Dependencies", value: "8, from 38" },
    ],
  },
  {
    id: "010",
    slug: "websiteprompts",
    name: "websiteprompts",
    tagline:
      "Twenty-three prompts that make any coding agent build a cinematic website",
    summary:
      "A prompt per site. Paste one into Claude Code, Cursor or v0 and you get the whole page back — markup, styles, animation, and a background video that is already hosted, so there is nothing to download and nothing to wire up. They are long on purpose: every one specifies its own colours, easing curves, blur radii and z-index order, because those are the details a model fills with defaults when you leave them out.",
    replaces: {
      name: "Framer",
      url: "https://www.framer.com/pricing/",
      price: "$10/mo per site",
      annualUsd: 120,
    },
    status: "shipped",
    statusNote: "23 prompts, no signup, free commercially",
    tags: [
      "prompts",
      "website",
      "landing page",
      "hero section",
      "animation",
      "video background",
      "framer",
      "webflow",
      "template",
      "design",
      "tailwind",
      "react",
    ],
    hero: {
      src: "/shots/websiteprompts-prisma.webp",
      alt: "The Prisma landing page: an oversized serif wordmark over a video of a cabin on a floating island above the clouds, with a thin nav and a pill call-to-action",
      caption:
        "Prisma, built from one paste. The wordmark, the nav, the copy block and the pill button are code the model wrote; the video behind them is fetched from a URL that was already in the prompt.",
    },
    gallery: [
      {
        src: "/shots/websiteprompts-koi.webp",
        alt: "The Koi Garden hero: white serif type reading “Rain writes rings on black water” over a slow-motion water droplet, with vertical Japanese text down the right edge",
        caption:
          "Koi Garden. The prompt names the typeface, the ripple video, the vertical rail of Japanese text and where each one sits — which is why two different models give you roughly the same page.",
      },
      {
        src: "/shots/websiteprompts-ascent.webp",
        alt: "The Ascent landing page: a climber on a sunlit rock face, a headline reading “Gear that has never once let go”, and a row of three statistics beneath it",
        caption:
          "Ascent. Same structure, different skin — the usual second step is “keep this, make the accent #c0603c and sell bread instead”, not a rewrite.",
      },
    ],
    highlights: [
      {
        title: "The output is yours, not a hosted page",
        body: "A site builder rents you the page and keeps the runtime. These give you the file. Whatever the model writes is code in your repo, on your stack, with no editor to log into and nothing that stops rendering when a subscription lapses.",
      },
      {
        title: "The video is already up",
        body: "The hardest part of a cinematic hero is having the footage. Every prompt carries a URL to a video that is already hosted and serving, so the page looks right on the first run instead of after an afternoon of sourcing clips.",
      },
      {
        title: "Long on purpose",
        body: "They average 942 words and run to 1,649. That is the point — the specificity is what stops the result looking generated. Trimming a prompt to something tidy is how you get the default gradient and the default easing back.",
      },
      {
        title: "Model-agnostic, because it is only text",
        body: "There is no SDK, no key and no runtime. Anything that writes code takes them, which also means they do not rot when a provider changes an API.",
      },
    ],
    limits: [
      "It is not software. There is no compose file, no server and nothing to install — it is twenty-three markdown files. It sits on this site because it kills a bill, not because you can run it.",
      "Framer also hosts your site, gives you a visual editor and a CMS. This replaces the part that makes a page look expensive, and none of the rest — you still need somewhere to put the result.",
      "Seventeen of the twenty-three are hero sections, not whole sites. Four are full landing pages and two are interactive. You get the top of the page, not the pricing table.",
      "The videos live in a bucket that isn’t yours. They are up now and meant to stay up, but a permanent site should download the mp4 and serve it itself.",
      "The result is only as good as the model you paste into. Expect one follow-up on the first pass — usually a single interaction it missed.",
      "These twenty-three are the free tier. The scroll-driven ones and the other eighty-eight sites are behind uiprompts.app.",
    ],
    measured: [
      { label: "Prompts", value: "23" },
      { label: "Hosted videos, checked live", value: "21/21" },
      { label: "Average prompt", value: "942 words" },
      { label: "Signup required", value: "none" },
    ],
    run: {
      code: `open https://github.com/openwarehq/websiteprompts
# open any prompt, copy the whole fenced block
# paste it into Claude Code, Cursor or v0`,
      note: "There is nothing to install. Copy the entire block, including the parts that look redundant — the length is what makes the output look designed rather than generated.",
    },
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
