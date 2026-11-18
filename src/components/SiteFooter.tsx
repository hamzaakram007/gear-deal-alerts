export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[color:var(--line)] bg-[color:var(--surface)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-[color:var(--muted)] sm:px-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-md">
          <p className="font-[family-name:var(--font-display)] text-base text-[color:var(--ink)]">
            Gear Deal Alerts
          </p>
          <p className="mt-2 leading-relaxed">
            Price-drop watcher for console gear. Mock prices for MVP. Buy links
            are affiliate placeholders — we may earn a commission if you purchase
            after clicking.
          </p>
        </div>
        <div className="space-y-1 text-[color:var(--muted)]">
          <p>Built by Hamza Akram</p>
          <p>Console-friendly · no Rockstar IP · no scraping in MVP</p>
          <p className="pt-2 text-xs">
            Alert delivery is stubbed (no real email yet).
          </p>
        </div>
      </div>
    </footer>
  );
}
