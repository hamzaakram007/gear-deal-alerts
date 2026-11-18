import { NextResponse } from "next/server";
import { getDeal } from "@/lib/deals";

type AlertBody = {
  email?: string;
  dealId?: string;
  channel?: "email" | "discord";
};

/**
 * MVP stub — accepts an alert request and returns a queued response.
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
      { ok: false, error: "A valid email is required for this stub." },
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

  const stubId = `stub_${Date.now().toString(36)}`;

  return NextResponse.json({
    ok: true,
    stub: true,
    message:
      "Alert queued in stub mode. No email or Discord message was sent. Connect Resend or a Discord webhook to go live.",
    alert: {
      id: stubId,
      channel,
      email,
      dealId: deal?.id ?? null,
      dealName: deal?.name ?? null,
      currentPrice: deal?.price ?? null,
      targetPrice: deal?.targetPrice ?? null,
      queuedAt: new Date().toISOString(),
    },
  });
}
