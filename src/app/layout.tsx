import type { Metadata } from "next";
import { Figtree, Syne } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { StubBanner } from "@/components/StubBanner";
import { BRAND_NAME, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const body = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — SSD, headset & TV price-drop watcher · ${BRAND_NAME}`,
    template: `%s · ${SITE_NAME} · ${BRAND_NAME}`,
  },
  description:
    "Watch console gear deals for SSDs, headsets, and TVs. Sample prices for illustration until live retailer feeds. A NeonGulf product at deals.neongulf.com.",
  applicationName: SITE_NAME,
  authors: [{ name: BRAND_NAME, url: "https://neongulf.com" }],
  creator: BRAND_NAME,
  publisher: BRAND_NAME,
  keywords: [
    "gear deals",
    "price drop alerts",
    "SSD deals",
    "gaming headset deals",
    "TV deals",
    "console gear",
    "NeonGulf",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: `${SITE_NAME} · ${BRAND_NAME}`,
    title: `${SITE_NAME} — watch SSD, headset & TV price drops`,
    description:
      "Local watchlist with sample prices and alert previews. Live retailer feeds coming soon. Pairs with Console Gear Hub on NeonGulf.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} · ${BRAND_NAME}`,
    description:
      "Watch console gear prices on deals.neongulf.com. Sample catalog until live retailer feeds.",
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
