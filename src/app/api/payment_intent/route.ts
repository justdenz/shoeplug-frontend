import { NextResponse } from "next/server";

export async function POST() {
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
          amount: 2000,
          payment_method_allowed: ["card"],
          payment_method_options: { card: { request_three_d_secure: "any" } },
          currency: "PHP",
          capture_type: "automatic",
          description: "test",
        },
      },
    }),
  };

  const response = await fetch(
    "https://api.paymongo.com/v1/payment_intents",
    options,
  ).then((res) => res.json());

  if (response.errors) {
    console.log(JSON.stringify(response.errors));
    return NextResponse.json({ errors: response.errors }, { status: 400 });
  }
  return NextResponse.json({ body: response });
}
