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
          payment_method: req.body.paymentMethodId,
          client_key: req.body.paymentIntentClientKey,
        },
      },
    }),
  };

  await fetch(
    `https://api.paymongo.com/v1/payment_intents/${req.body.paymentIntentId}/attach`,
    options,
  )
    .then((response) => response.json())
    .then(async (response) => {
      if (response.errors) {
        console.log(JSON.stringify(response.errors));
      } else {
        res.status(200).json({ body: response });
      }
    });
}
