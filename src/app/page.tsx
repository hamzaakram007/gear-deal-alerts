import type { Metadata } from "next";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { DealBoard } from "@/components/DealBoard";
import { BRAND_NAME, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: `${SITE_NAME} — SSD, headset & TV price-drop watcher · ${BRAND_NAME}`,
  },
  description:
    "Watch console gear deals for SSDs, headsets, and TVs. Sample prices for illustration until live retailer feeds. A NeonGulf product.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE_NAME} — watch console gear price drops`,
    description:
      "Local watchlist with sample prices and alert previews. Pairs with Console Gear Hub comparisons.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} · ${BRAND_NAME}`,
    description:
      "Watch SSD, headset, and TV sample prices on deals.neongulf.com.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE_NAME,
  url: SITE_URL,
  applicationCategory: "ShoppingApplication",
  operatingSystem: "Web",
  description:
    "Watch console gear deals for SSDs, headsets, and TVs with a local watchlist. Sample prices until live retailer feeds. A NeonGulf product.",
  author: {
    "@type": "Organization",
    name: BRAND_NAME,
    url: "https://neongulf.com",
  },
  isPartOf: {
    "@type": "WebSite",
    name: BRAND_NAME,
    url: "https://neongulf.com",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="hero-wash relative overflow-hidden">
        <div className="noise-overlay absolute inset-0" aria-hidden />
        <div
          className="animate-drift absolute -right-20 top-16 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl"
          aria-hidden
        />
        <div
          className="animate-drift absolute -left-16 bottom-8 h-56 w-56 rounded-full bg-orange-400/15 blur-3xl"
          style={{ animationDelay: "2.2s" }}
          aria-hidden
        />

        <div className="relative mx-auto flex min-h-[72vh] max-w-6xl flex-col justify-center px-4 py-20 sm:px-6 sm:py-28">
          <p className="animate-fade-up text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--muted)]">
            NeonGulf
          </p>
          <p className="animate-fade-up font-[family-name:var(--font-display)] text-4xl leading-[1.05] tracking-tight text-[color:var(--ink)] sm:text-6xl md:text-7xl">
            Gear Deal Alerts
          </p>
          <h1 className="animate-fade-up-delay mt-5 max-w-2xl text-xl font-medium leading-snug text-[color:var(--ink)]/85 sm:text-2xl">
            Watch SSD, headset, and TV prices — get nudged when they drop.
          </h1>
          <p className="animate-fade-up-delay-2 mt-4 max-w-xl text-base leading-relaxed text-[color:var(--muted)]">
            Pick a few SKUs, keep a local watchlist, and preview email alerts when
            a sample price falls. Built to pair with Console Gear Hub — this
            watches; the hub compares.
          </p>
          <div className="animate-fade-up-delay-2 mt-8 flex flex-wrap gap-3">
            <a
              href="#deals"
              className="rounded-md bg-[color:var(--ink)] px-5 py-2.5 text-sm font-medium text-[color:var(--paper)] transition hover:bg-[color:var(--accent-ink)]"
            >
              Browse sample deals
            </a>
            <a
              href="#watchlist"
              className="rounded-md border border-[color:var(--ink)]/25 px-5 py-2.5 text-sm font-medium text-[color:var(--ink)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent-ink)]"
            >
              Open watchlist
            </a>
          </div>
        </div>
      </section>

      <DealBoard />

      <section
        id="how"
        className="scroll-mt-20 border-t border-[color:var(--line)]"
      >
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[color:var(--ink)]">
            How it works
          </h2>
          <ol className="mt-6 grid gap-6 sm:grid-cols-3">
            {[
              {
                t: "1. Watch",
                d: "Save SSDs, headsets, TVs (and one capture card) to a browser watchlist.",
              },
              {
                t: "2. Spot drops",
                d: "Sample prices include a short history. Drops vs last check are highlighted.",
              },
              {
                t: "3. Preview alerts",
                d: "Queue an alert preview via /api/alerts. Email delivery is not connected yet — nothing is emailed today.",
              },
            ].map((step) => (
              <li key={step.t} className="border-t border-[color:var(--line)] pt-4">
                <p className="font-[family-name:var(--font-display)] text-lg text-[color:var(--ink)]">
                  {step.t}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">
                  {step.d}
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <AffiliateDisclosure />
          </div>
        </div>
      </section>
    </>
  );
}
