import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = process.env.PAYMONGO_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Payment service is not configured" }, { status: 500 });
  }

  try {
    const body = await request.json();
    const amount = Number(body.amount);
    if (!Number.isInteger(amount) || amount <= 0) {
      return NextResponse.json({ error: "Amount must be a positive integer" }, { status: 400 });
    }

    const response = await fetch("https://api.paymongo.com/v1/payment_intents", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${secret}:`).toString("base64")}`,
      },
      body: JSON.stringify({
        data: {
          attributes: {
            amount,
            payment_method_allowed: ["card"],
            payment_method_options: { card: { request_three_d_secure: "any" } },
            currency: "PHP",
            capture_type: "automatic",
          },
        },
      }),
    });
    const result = await response.json();
    return NextResponse.json(result, { status: response.status });
  } catch {
    return NextResponse.json({ error: "Unable to create payment intent" }, { status: 500 });
  }
}
