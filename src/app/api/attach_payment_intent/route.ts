import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization:
        "Basic " +
        Buffer.from(process.env.PAYMONGO_SECRET + "").toString("base64"),
    },
    body: JSON.stringify({
      data: {
        attributes: {
          payment_method: body.paymentMethodId,
          client_key: body.paymentIntentClientKey,
        },
      },
    }),
  };

  const response = await fetch(
    `https://api.paymongo.com/v1/payment_intents/${body.paymentIntentId}/attach`,
    options,
  ).then((res) => res.json());

  if (response.errors) {
    console.log(JSON.stringify(response.errors));
    return NextResponse.json({ errors: response.errors }, { status: 400 });
  }
  return NextResponse.json({ body: response });
}
