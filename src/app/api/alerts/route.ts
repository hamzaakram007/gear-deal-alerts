import { NextResponse } from "next/server";
import { getDeal } from "@/lib/deals";

type AlertBody = {
  email?: string;
  dealId?: string;
  channel?: "email" | "discord";
};

/**
 * Alert preview endpoint — accepts a request and returns a queued response.
 * Wire Resend / Discord webhook here later. No real email is sent.
 */
export async function POST(request: Request) {
  let body: AlertBody;
  try {
    body = (await request.json()) as AlertBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const email = body.email?.trim().toLowerCase() ?? "";
  const dealId = body.dealId?.trim() ?? "";
  const channel = body.channel ?? "email";

  if (!email || !email.includes("@")) {
    return NextResponse.json(
      { ok: false, error: "A valid email is required to preview an alert." },
      { status: 400 },
    );
  }

  const deal = dealId ? getDeal(dealId) : undefined;
  if (dealId && !deal) {
    return NextResponse.json(
      { ok: false, error: "Unknown deal id." },
      { status: 404 },
    );
  }

  const previewId = `preview_${Date.now().toString(36)}`;

  return NextResponse.json({
    ok: true,
    stub: true,
    message:
      "Alert preview queued for this request. No email or Discord message was sent — delivery is not connected yet.",
    alert: {
      id: previewId,
      channel,
      email,
      dealId: deal?.id ?? null,
      dealName: deal?.name ?? null,
      currentPrice: deal?.price ?? null,
      targetPrice: deal?.targetPrice ?? null,
      queuedAt: new Date().toISOString(),
      delivery: "none",
    },
  });
}
