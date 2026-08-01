import type { Metadata } from "next";
import localFont from "next/font/local";
import { Reveal } from "@/components/Reveal";
import { asset } from "@/lib/asset";
import "./globals.css";

/**
 * Self-hosted, so the page fetches nothing at load. Both faces are already in
 * the repo under their own licences — see fonts/LICENSE.md.
 */
const display = localFont({
  src: "./fonts/space-grotesk.woff2",
  variable: "--font-display",
  display: "swap",
  weight: "300 700",
});

const body = localFont({
  src: "./fonts/geist.woff2",
  variable: "--font-body",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Openware — software you own outright",
    template: "%s — Openware",
  },
  description:
    "Self-hostable replacements for overpriced subscription software. Clone one, point it at a model you own, and keep it. No account, no tier, nothing to buy.",
  applicationName: "Openware",
  openGraph: {
    title: "Openware — software you own outright",
    description:
      "Self-hostable replacements for overpriced subscription software. Clone it, run it, keep it.",
    type: "website",
    siteName: "Openware",
  },
  twitter: {
    card: "summary_large_image",
    title: "Openware — software you own outright",
    description:
      "Self-hostable replacements for overpriced subscription software.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable}`}
      /* The plates are referenced from CSS, which cannot know the deploy base
         path — so they are handed in as custom properties here. */
      style={
        {
          "--plate-sky": `url(${asset("/media/sky.jpg")})`,
          "--plate-mist": `url(${asset("/media/mist.jpg")})`,
        } as React.CSSProperties
      }
    >
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Reveal />
        {children}
      </body>
    </html>
  );
}
