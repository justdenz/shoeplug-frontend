import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      authorization: "Basic " + btoa(process.env.PAYMONGO_SECRET + ""),
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

  fetch("https://api.paymongo.com/v1/payment_methods", options)
    .then((response) => response.json())
    .then(async (response) => {
      if (response.errors) {
        console.log(JSON.stringify(response.errors));
      } else {
        res.status(200).json({ body: response });
      }
    });
}
