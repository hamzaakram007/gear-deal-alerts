"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import {
  categories,
  deals,
  dropPercent,
  formatMoney,
  isAtOrBelowTarget,
  isPriceDrop,
  type Deal,
  type DealCategory,
} from "@/lib/deals";
import {
  readWatchlist,
  toggleWatch,
  writeWatchlist,
  type WatchEntry,
} from "@/lib/watchlist";

type Filter = DealCategory | "all";

export function DealBoard() {
  const [watchlist, setWatchlist] = useState<WatchEntry[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [email, setEmail] = useState("");
  const [alertDealId, setAlertDealId] = useState<string>("");
  const [status, setStatus] = useState<string | null>(null);
  const [stubId, setStubId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setWatchlist(readWatchlist());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writeWatchlist(watchlist);
  }, [watchlist, hydrated]);

  const watchedDeals = useMemo(() => {
    return watchlist
      .map((w) => deals.find((d) => d.id === w.dealId))
      .filter((d): d is Deal => Boolean(d));
  }, [watchlist]);

  const visibleDeals = useMemo(() => {
    if (filter === "all") return deals;
    return deals.filter((d) => d.category === filter);
  }, [filter]);

  const dropCount = useMemo(
    () => watchedDeals.filter((d) => isPriceDrop(d)).length,
    [watchedDeals],
  );

  function onToggle(dealId: string) {
    setWatchlist((prev) => toggleWatch(dealId, prev));
    setAlertDealId((current) => current || dealId);
  }

  function onSubmitAlert(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    setStubId(null);
    setError(null);

    const dealId = alertDealId || watchedDeals[0]?.id || "";
    if (!dealId) {
      setError("Add at least one item to your watchlist first.");
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch("/api/alerts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, dealId, channel: "email" }),
        });
        const data = (await res.json()) as {
          ok: boolean;
          message?: string;
          error?: string;
          stub?: boolean;
          alert?: { id: string; dealName?: string | null };
        };
        if (!res.ok || !data.ok) {
          setError(data.error ?? "Could not queue alert stub.");
          return;
        }
        setStubId(data.alert?.id ?? null);
        setStatus(
          data.message ??
            `Stub queued for ${data.alert?.dealName ?? "deal"} — no email sent.`,
        );
        setWatchlist((prev) =>
          prev.map((w) =>
            w.dealId === dealId ? { ...w, alertEmail: email } : w,
          ),
        );
      } catch {
        setError("Network error while queuing the stub alert.");
      }
    });
  }

  return (
    <>
      <section
        id="watchlist"
        className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14 sm:px-6 sm:py-16"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl text-[color:var(--ink)] sm:text-4xl">
              Your watchlist
            </h2>
            <p className="mt-2 max-w-xl text-[color:var(--muted)]">
              Saved in this browser only. Mock drops vs last check show up as
              badges — real push/email delivery is not wired yet.
            </p>
          </div>
          <p className="text-sm text-[color:var(--muted)]" aria-live="polite">
            {!hydrated
              ? "Loading…"
              : `${watchedDeals.length} watching${
                  dropCount ? ` · ${dropCount} with drops` : ""
                }`}
          </p>
        </div>

        {!hydrated ? (
          <p className="mt-8 border-t border-[color:var(--line)] pt-6 text-[color:var(--muted)]">
            Loading watchlist…
          </p>
        ) : watchedDeals.length === 0 ? (
          <div className="mt-8 border-t border-[color:var(--line)] pt-6">
            <p className="text-[color:var(--muted)]">
              Empty for now. Browse deals below and tap <em>Watch</em> on an SSD,
              headset, or TV.
            </p>
            <a
              href="#deals"
              className="mt-4 inline-block text-sm font-medium text-[color:var(--accent-ink)] underline decoration-[color:var(--accent)]/40 underline-offset-2"
            >
              Jump to seed deals →
            </a>
          </div>
        ) : (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {watchedDeals.map((deal) => (
              <li key={deal.id}>
                <DealRow
                  deal={deal}
                  watching
                  onToggle={() => onToggle(deal.id)}
                />
              </li>
            ))}
          </ul>
        )}

        <form
          onSubmit={onSubmitAlert}
          className="mt-10 rounded-md border border-dashed border-[color:var(--warm)]/40 bg-[color:var(--warm)]/[0.06] p-5 sm:p-6"
          aria-describedby="alert-stub-help"
        >
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-[family-name:var(--font-display)] text-xl text-[color:var(--ink)]">
              Email alert stub
            </h3>
            <span className="rounded-md border border-[color:var(--warm)]/35 bg-white/70 px-2 py-0.5 text-xs font-medium text-[color:var(--warm)]">
              Demo only — no email sent
            </span>
          </div>
          <p
            id="alert-stub-help"
            className="mt-2 max-w-2xl text-sm text-[color:var(--muted)]"
          >
            Calls{" "}
            <code className="text-[color:var(--ink)]">POST /api/alerts</code> and
            returns a stub queue id. Resend / Discord webhooks are not connected
            — your inbox will stay empty.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end">
            <label className="flex flex-1 flex-col gap-1.5 text-sm">
              <span className="text-[color:var(--muted)]">Email (for stub payload)</span>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="rounded-md border border-[color:var(--line)] bg-white px-3 py-2.5 text-[color:var(--ink)] outline-none ring-[color:var(--accent)] focus:ring-2"
              />
            </label>
            <label className="flex flex-1 flex-col gap-1.5 text-sm">
              <span className="text-[color:var(--muted)]">Deal from watchlist</span>
              <select
                value={alertDealId}
                onChange={(e) => setAlertDealId(e.target.value)}
                className="rounded-md border border-[color:var(--line)] bg-white px-3 py-2.5 text-[color:var(--ink)] outline-none ring-[color:var(--accent)] focus:ring-2"
              >
                <option value="">Pick from watchlist…</option>
                {watchedDeals.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="submit"
              disabled={pending || watchedDeals.length === 0}
              className="rounded-md bg-[color:var(--ink)] px-5 py-2.5 text-sm font-medium text-[color:var(--paper)] transition hover:bg-[color:var(--accent-ink)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? "Queuing stub…" : "Queue stub alert"}
            </button>
          </div>
          {status && (
            <div
              className="mt-4 rounded-md border border-[color:var(--accent)]/30 bg-white/80 px-3 py-2.5 text-sm text-[color:var(--accent-ink)]"
              role="status"
            >
              <p className="font-medium">Stub queued successfully</p>
              <p className="mt-1 text-[color:var(--muted)]">{status}</p>
              {stubId && (
                <p className="mt-1 font-mono text-xs text-[color:var(--ink)]">
                  id: {stubId}
                </p>
              )}
            </div>
          )}
          {error && (
            <p className="mt-4 text-sm text-red-700" role="alert">
              {error}
            </p>
          )}
        </form>
      </section>

      <section
        id="deals"
        className="scroll-mt-20 border-t border-[color:var(--line)] bg-[color:var(--surface)]/60"
      >
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <h2 className="font-[family-name:var(--font-display)] text-3xl text-[color:var(--ink)] sm:text-4xl">
            Seed deals
          </h2>
          <p className="mt-2 max-w-2xl text-[color:var(--muted)]">
            Ten mock SKUs with manual prices. Numbers are demo data — not live
            retailer feeds.
          </p>

          <div className="mt-5">
            <AffiliateDisclosure compact />
          </div>

          <div
            className="-mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
            role="tablist"
            aria-label="Filter by category"
          >
            {categories.map((c) => {
              const active = filter === c.slug;
              return (
                <button
                  key={c.slug}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(c.slug)}
                  className={`shrink-0 rounded-md border px-3 py-1.5 text-sm transition ${
                    active
                      ? "border-[color:var(--accent)] bg-[color:var(--accent-soft)] text-[color:var(--accent-ink)]"
                      : "border-[color:var(--line)] text-[color:var(--muted)] hover:border-[color:var(--ink)]/30 hover:text-[color:var(--ink)]"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {visibleDeals.map((deal, i) => (
              <li
                key={deal.id}
                className="animate-fade-up"
                style={{ animationDelay: `${Math.min(i, 6) * 0.05}s` }}
              >
                <DealRow
                  deal={deal}
                  watching={watchlist.some((w) => w.dealId === deal.id)}
                  onToggle={() => onToggle(deal.id)}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function DealRow({
  deal,
  watching,
  onToggle,
}: {
  deal: Deal;
  watching: boolean;
  onToggle: () => void;
}) {
  const drop = dropPercent(deal);
  const dropped = isPriceDrop(deal);
  const hitTarget = isAtOrBelowTarget(deal);

  return (
    <article className="flex h-full flex-col justify-between border border-[color:var(--line)] bg-white/80 p-5 transition hover:border-[color:var(--accent)]/50">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-wide text-[color:var(--muted)]">
            {deal.categoryLabel} · {deal.retailer}
          </span>
          <span className="text-xs text-[color:var(--muted)]">Mock price</span>
          {dropped && (
            <span className="animate-pulse-soft text-xs font-medium text-[color:var(--accent-ink)]">
              ↓ {drop}% drop
            </span>
          )}
          {hitTarget && (
            <span className="text-xs font-medium text-[color:var(--warm)]">
              At target
            </span>
          )}
          {!deal.inStock && (
            <span className="text-xs text-red-700">Out of stock</span>
          )}
        </div>
        <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl text-[color:var(--ink)]">
          {deal.name}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-[color:var(--muted)]">
          {deal.blurb}
        </p>
        <div className="mt-4 flex flex-wrap items-baseline gap-3">
          <p className="text-2xl font-medium text-[color:var(--ink)]">
            {formatMoney(deal.price, deal.currency)}
          </p>
          {dropped && (
            <p className="text-sm text-[color:var(--muted)] line-through">
              {formatMoney(deal.previousPrice, deal.currency)}
            </p>
          )}
          <p className="text-sm text-[color:var(--muted)]">
            Alert below {formatMoney(deal.targetPrice, deal.currency)}
          </p>
        </div>
        <p className="mt-2 text-xs text-[color:var(--muted)]">
          History:{" "}
          {deal.history.map((p) => formatMoney(p, deal.currency)).join(" → ")}
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onToggle}
            aria-pressed={watching}
            className={`rounded-md border px-3.5 py-2 text-sm font-medium transition ${
              watching
                ? "border-[color:var(--accent)] bg-[color:var(--accent-soft)] text-[color:var(--accent-ink)]"
                : "border-[color:var(--line)] text-[color:var(--ink)] hover:border-[color:var(--ink)]/40"
            }`}
          >
            {watching ? "Watching" : "Watch"}
          </button>
          <a
            href={deal.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored nofollow"
            title="Placeholder affiliate link — opens example.com"
            className="rounded-md bg-[color:var(--ink)] px-3.5 py-2 text-sm font-medium text-[color:var(--paper)] transition hover:bg-[color:var(--accent-ink)]"
          >
            Buy link (placeholder)
          </a>
        </div>
        <p className="text-[11px] leading-relaxed text-[color:var(--muted)]">
          Affiliate stub →{" "}
          <code className="break-all text-[color:var(--ink)]/80">
            {deal.affiliateUrl.replace("https://", "")}
          </code>
        </p>
      </div>
    </article>
  );
}
