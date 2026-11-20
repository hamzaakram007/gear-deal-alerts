export function AffiliateDisclosure({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-xs leading-relaxed text-[color:var(--muted)]">
        <span className="font-medium text-[color:var(--ink)]">Affiliate note:</span>{" "}
        Buy links are sample deep links (
        <code className="text-[color:var(--ink)]">tag=PLACEHOLDER</code>). Affiliate
        networks are not connected yet.
      </p>
    );
  }

  return (
    <aside
      className="rounded-md border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3 text-sm leading-relaxed text-[color:var(--muted)]"
      aria-label="Affiliate disclosure"
    >
      <p>
        <span className="font-medium text-[color:var(--ink)]">
          Affiliate disclosure:
        </span>{" "}
        “Buy” buttons use sample deep links on{" "}
        <code className="text-[color:var(--ink)]">example.com</code> with{" "}
        <code className="text-[color:var(--ink)]">?tag=PLACEHOLDER</code>. When
        real affiliate programs are wired, we may earn a commission if you buy
        after clicking — at no extra cost to you. Prices on this page are{" "}
        <strong className="font-medium text-[color:var(--ink)]">
          sample / illustrative
        </strong>{" "}
        until live retailer feeds are connected.
      </p>
    </aside>
  );
}
