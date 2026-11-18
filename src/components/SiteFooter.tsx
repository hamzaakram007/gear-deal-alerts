import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[color:var(--line)] bg-[color:var(--surface)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-4 text-sm text-[color:var(--muted)] sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-md">
            <p className="font-[family-name:var(--font-display)] text-base text-[color:var(--ink)]">
              Gear Deal Alerts
            </p>
            <p className="mt-2 leading-relaxed">
              Price-drop watcher for console gear. Mock prices for MVP. Pairs with{" "}
              <a
                href="https://github.com/hamzaakram007/console-gear-hub"
                className="underline decoration-[color:var(--line)] underline-offset-2 transition hover:text-[color:var(--accent-ink)] hover:decoration-[color:var(--accent)]"
                rel="noopener noreferrer"
                target="_blank"
              >
                Console Gear Hub
              </a>{" "}
              (compare there, watch here).
            </p>
          </div>
          <div className="space-y-1">
            <p>Built by Hamza Akram</p>
            <p>Console-friendly · no Rockstar IP · no retailer scraping in MVP</p>
            <p className="pt-2 text-xs">
              Alert delivery is stubbed —{" "}
              <code className="text-[color:var(--ink)]">POST /api/alerts</code>{" "}
              queues only; no real email or Discord send.
            </p>
          </div>
        </div>
        <AffiliateDisclosure />
      </div>
    </footer>
  );
}
