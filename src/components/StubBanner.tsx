export function StubBanner() {
  return (
    <div
      className="border-b border-[color:var(--warm)]/25 bg-[color:var(--warm)]/10"
      role="status"
    >
      <p className="mx-auto max-w-6xl px-4 py-2.5 text-center text-xs leading-relaxed text-[color:var(--ink)] sm:px-6 sm:text-sm">
        <span className="font-semibold">Sample prices for illustration</span>{" "}
        — live retailer feeds coming soon. Email alerts and buy links are not
        connected yet.
      </p>
    </div>
  );
}
