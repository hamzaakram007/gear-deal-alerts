/** Canonical production host for Gear Deal Alerts. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://deals.neongulf.com";

export const SITE_NAME = "Gear Deal Alerts";
export const BRAND_NAME = "NeonGulf";

export function absoluteUrl(path = "/"): string {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
