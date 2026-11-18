import type { Metadata } from "next";
import { Figtree, Syne } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { StubBanner } from "@/components/StubBanner";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://gear-deal-alerts.vercel.app";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Gear Deal Alerts — SSD, headset & TV price-drop watcher",
    template: "%s · Gear Deal Alerts",
  },
  description:
    "Watch console gear deals for SSDs, headsets, and TVs. Mock prices for MVP, email alert stub, and affiliate buy-link placeholders. Built by Hamza Akram.",
  applicationName: "Gear Deal Alerts",
  authors: [{ name: "Hamza Akram" }],
  creator: "Hamza Akram",
  keywords: [
    "gear deals",
    "price drop alerts",
    "SSD deals",
    "gaming headset deals",
    "TV deals",
    "console gear",
    "affiliate",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Gear Deal Alerts",
    title: "Gear Deal Alerts — watch SSD, headset & TV price drops",
    description:
      "Local watchlist + mock price drops + email alert stub. Affiliate buy links are placeholders until networks are wired.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gear Deal Alerts",
    description:
      "Watch console gear prices. Mock MVP with alert stub and affiliate placeholders.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-[color:var(--ink)] focus:px-3 focus:py-2 focus:text-sm focus:text-[color:var(--paper)]"
        >
          Skip to content
        </a>
        <StubBanner />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
