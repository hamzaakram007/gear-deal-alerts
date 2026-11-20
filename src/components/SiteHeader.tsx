import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="relative z-20 border-b border-[color:var(--line)] bg-[color:var(--surface)]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-[color:var(--muted)]">
            NeonGulf
          </span>
          <span className="font-[family-name:var(--font-display)] text-lg tracking-tight text-[color:var(--ink)] transition group-hover:text-[color:var(--accent)] sm:text-xl">
            Gear Deal Alerts
          </span>
        </Link>
        <nav
          aria-label="Primary"
          className="flex items-center gap-4 text-sm text-[color:var(--muted)]"
        >
          <a href="#watchlist" className="transition hover:text-[color:var(--ink)]">
            Watchlist
          </a>
          <a href="#deals" className="transition hover:text-[color:var(--ink)]">
            Deals
          </a>
          <a href="#how" className="hidden transition hover:text-[color:var(--ink)] sm:inline">
            How it works
          </a>
          <a
            href="https://github.com/hamzaakram007/console-gear-hub"
            className="hidden transition hover:text-[color:var(--ink)] md:inline"
            rel="noopener noreferrer"
            target="_blank"
          >
            Gear Hub
          </a>
        </nav>
      </div>
    </header>
  );
}
