import dealsData from "@/data/deals.json";

export type DealCategory = "ssd" | "headset" | "tv" | "capture";

export type Deal = {
  id: string;
  name: string;
  category: DealCategory;
  categoryLabel: string;
  blurb: string;
  retailer: string;
  currency: string;
  price: number;
  previousPrice: number;
  targetPrice: number;
  history: number[];
  affiliateUrl: string;
  inStock: boolean;
};

export const deals = dealsData as Deal[];

export const categories: { slug: DealCategory | "all"; label: string }[] = [
  { slug: "all", label: "All gear" },
  { slug: "ssd", label: "SSDs" },
  { slug: "headset", label: "Headsets" },
  { slug: "tv", label: "TVs" },
  { slug: "capture", label: "Capture" },
];

export function getDeal(id: string): Deal | undefined {
  return deals.find((d) => d.id === id);
}

export function formatMoney(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

export function dropPercent(deal: Deal): number {
  if (deal.previousPrice <= 0 || deal.price >= deal.previousPrice) return 0;
  return Math.round(
    ((deal.previousPrice - deal.price) / deal.previousPrice) * 100,
  );
}

export function isPriceDrop(deal: Deal): boolean {
  return deal.price < deal.previousPrice;
}

export function isAtOrBelowTarget(deal: Deal): boolean {
  return deal.price <= deal.targetPrice;
}
