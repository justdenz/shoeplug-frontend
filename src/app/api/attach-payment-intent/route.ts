import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = process.env.PAYMONGO_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Payment service is not configured" }, { status: 500 });
  }

  try {
    const { paymentIntentId, paymentMethodId, clientKey } = await request.json();
    if (!paymentIntentId || !paymentMethodId || !clientKey) {
      return NextResponse.json({ error: "Payment identifiers are required" }, { status: 400 });
    }

    const response = await fetch(
      `https://api.paymongo.com/v1/payment_intents/${encodeURIComponent(paymentIntentId)}/attach`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(`${secret}:`).toString("base64")}`,
        },
        body: JSON.stringify({
          data: { attributes: { payment_method: paymentMethodId, client_key: clientKey } },
        }),
      },
    );
    const result = await response.json();
    return NextResponse.json(result, { status: response.status });
  } catch {
    return NextResponse.json({ error: "Unable to attach payment method" }, { status: 500 });
  }
}
