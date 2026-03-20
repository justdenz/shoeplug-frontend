// Function to Create a Payment Method by calling the PayMongo API
export const createPaymentMethod = async () => {
  const paymentMethod = fetch("https://api.paymongo.com/v1/payment_methods", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(process.env.NEXT_PUBLIC_PAYMONGO_PUBLIC + "").toString("base64")}`,
    },
    body: JSON.stringify({
      data: {
        attributes: {
          details: {
            card_number: "4343434343434345",
            exp_month: 2, //2
            exp_year: 22, //22
            cvc: "123", //"123",
          },
          billing: {
            name: "John Doe",
            email: "johndoe@example.com",
            phone: "09123456789",
          },
          type: "card",
        },
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });

  return paymentMethod;
};

// Function to Attach a Payment Method to the Intent by calling the PayMongo API
// export const attachIntentMethod = async (intent: any, method: any) => {
//   fetch(`https://api.paymongo.com/v1/payment_intents/${intent.id}/attach`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Basic ${Buffer.from(process.env.NEXT_PUBLIC_PAYMONGO_PUBLIC + "").toString("base64")}`,
//     },
//     body: JSON.stringify({
//       data: {
//         attributes: {
//           payment_method: `${method.id}`,
//           client_key: `${intent.attributes.client_key}`,
//         },
//       },
//     }),
//   })
//     .then((response) => response.json())
//     .then((response) => {
//       const paymentIntent = response.data;
//       console.log(paymentIntent);
//       const paymentIntentStatus = paymentIntent.attributes.status;
//       if (paymentIntentStatus === "awaiting_next_action") {
//         window.open(
//           paymentIntent.attributes.next_action.redirect.url,
//           "_blank",
//         );
//       } else {
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
