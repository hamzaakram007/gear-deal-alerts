import { DealBoard } from "@/components/DealBoard";

export default function Home() {
  return (
    <>
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
          <p className="animate-fade-up font-[family-name:var(--font-display)] text-4xl leading-[1.05] tracking-tight text-[color:var(--ink)] sm:text-6xl md:text-7xl">
            Gear Deal Alerts
          </p>
          <h1 className="animate-fade-up-delay mt-5 max-w-2xl text-xl font-medium leading-snug text-[color:var(--ink)]/85 sm:text-2xl">
            Watch SSD, headset, and TV prices — get nudged when they drop.
          </h1>
          <p className="animate-fade-up-delay-2 mt-4 max-w-xl text-base leading-relaxed text-[color:var(--muted)]">
            Pick a few SKUs, keep a local watchlist, and queue an email stub when
            a mock price falls. Built to pair with Console Gear Hub — this
            watches; the hub compares.
          </p>
          <div className="animate-fade-up-delay-2 mt-8 flex flex-wrap gap-3">
            <a
              href="#deals"
              className="rounded-md bg-[color:var(--ink)] px-5 py-2.5 text-sm font-medium text-[color:var(--paper)] transition hover:bg-[color:var(--accent-ink)]"
            >
              Browse seed deals
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

      <section className="border-t border-[color:var(--line)]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[color:var(--ink)]">
            How this MVP works
          </h2>
          <ol className="mt-6 grid gap-6 sm:grid-cols-3">
            {[
              {
                t: "1. Watch",
                d: "Save SSDs, headsets, TVs (and one capture card) to a browser watchlist.",
              },
              {
                t: "2. Spot drops",
                d: "Seed prices include a short history. Drops vs last check are highlighted.",
              },
              {
                t: "3. Stub alert",
                d: "Queue an email stub. Wire Resend or Discord later for real pings.",
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
          <p className="mt-10 max-w-3xl text-sm leading-relaxed text-[color:var(--muted)]">
            <strong className="font-medium text-[color:var(--ink)]">
              Affiliate disclosure:
            </strong>{" "}
            Buy buttons use placeholder affiliate URLs (
            <code>example.com/aff/…?tag=PLACEHOLDER</code>). If real affiliate
            networks are connected later, purchases after those clicks may earn a
            commission at no extra cost to you.
          </p>
        </div>
      </section>
    </>
  );
}
