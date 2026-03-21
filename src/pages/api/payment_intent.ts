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
      "content-type": "application/json",
      authorization: "Basic " + btoa(process.env.PAYMONGO_SECRET + ""),
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

  await fetch("https://api.paymongo.com/v1/payment_intents", options)
    .then((response) => response.json())
    .then(async (response) => {
      if (response.errors) {
        console.log(JSON.stringify(response.errors));
        res.status(400).json({ errors: response.errors });
      } else {
        res.status(200).json({ body: response });
      }
    });
}
