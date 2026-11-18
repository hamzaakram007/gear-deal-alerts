const STORAGE_KEY = "gear-deal-alerts:watchlist-v1";

export type WatchEntry = {
  dealId: string;
  addedAt: string;
  alertEmail?: string;
};

export function readWatchlist(): WatchEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as WatchEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeWatchlist(entries: WatchEntry[]): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function toggleWatch(
  dealId: string,
  current: WatchEntry[],
): WatchEntry[] {
  const exists = current.some((e) => e.dealId === dealId);
  if (exists) {
    return current.filter((e) => e.dealId !== dealId);
  }
  return [
    ...current,
    { dealId, addedAt: new Date().toISOString() },
  ];
}
