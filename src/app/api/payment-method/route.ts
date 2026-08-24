import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = process.env.PAYMONGO_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Payment service is not configured" }, { status: 500 });
  }

  try {
    const attributes = await request.json();
    if (
      attributes.type !== "card" ||
      !attributes.details?.card_number ||
      !attributes.details?.exp_month ||
      !attributes.details?.exp_year ||
      !attributes.details?.cvc
    ) {
      return NextResponse.json({ error: "Complete card details are required" }, { status: 400 });
    }

    const response = await fetch("https://api.paymongo.com/v1/payment_methods", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${secret}:`).toString("base64")}`,
      },
      body: JSON.stringify({ data: { attributes } }),
    });
    const result = await response.json();
    return NextResponse.json(result, { status: response.status });
  } catch {
    return NextResponse.json({ error: "Unable to create payment method" }, { status: 500 });
  }
}
