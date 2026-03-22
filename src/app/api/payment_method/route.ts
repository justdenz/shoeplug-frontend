import { NextResponse } from "next/server";

export async function POST() {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      authorization:
        "Basic " +
        Buffer.from(process.env.PAYMONGO_SECRET + "").toString("base64"),
    },
    body: JSON.stringify({
      data: {
        attributes: {
          details: {
            card_number: "4343434343434345",
            exp_month: 6,
            exp_year: 27,
            cvc: "676",
            bank_code: "test_bank_one ",
          },
          billing: {
            address: {
              line1: "67 Skibidi Toilet",
              city: "Fanum Tax",
              state: "Stateside",
              postal_code: "1106",
              country: "PH",
            },
            name: "Denzel Adrian Co",
            phone: "0967 676 7676",
            email: "johndoe@gmail.om",
          },
          type: "card",
        },
      },
    }),
  };

  const response = await fetch(
    "https://api.paymongo.com/v1/payment_methods",
    options,
  ).then((res) => res.json());

  if (response.errors) {
    console.log(JSON.stringify(response.errors));
    return NextResponse.json({ errors: response.errors }, { status: 400 });
  }
  return NextResponse.json({ body: response });
}
