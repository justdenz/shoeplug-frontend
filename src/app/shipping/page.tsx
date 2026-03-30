import React from "react";

const ShippingPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">Shipping Policy</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Order</h2>
        <p>
          Contact us through our facebook or instagram page to place an order. We will confirm your order and provide you with payment details. Once payment is confirmed, we will process your order and prepare it for shipment.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          Shipping Rates & Estimates
        </h2>
        <p className="mb-2">
          Shipping rates will depend on the shipping method you choose and your location. We offer the following shipping options:
        </p>
        <ul className="list-disc ml-6 space-y-1">
          <li>Lalamove</li>
          <li>LBC</li>
          <li>DHL</li>
          <li>LBC</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">International Shipping</h2>
        <p>
          We currently ship internationally to selected countries. Shipping
          charges and delivery timelines vary by location and will be calculated
          at checkout.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
        <p>
          If you have any questions or concerns about your shipment, feel free
          to contact us at{" "}
          <a
            href="mailto:support@example.com"
            className="text-blue-600 underline"
          >
            support@example.com
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default ShippingPolicyPage;
