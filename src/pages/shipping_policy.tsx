import React from "react";

const ShippingPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">Shipping Policy</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Processing Time</h2>
        <p>
          Orders are processed within 1–3 business days (excluding weekends and
          holidays) after receiving your order confirmation email. You will
          receive another notification when your order has shipped.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          Shipping Rates & Estimates
        </h2>
        <p className="mb-2">
          Shipping charges for your order will be calculated and displayed at
          checkout.
        </p>
        <ul className="list-disc ml-6 space-y-1">
          <li>Standard Shipping (5–7 business days)</li>
          <li>Express Shipping (2–3 business days)</li>
          <li>Overnight Shipping (1 business day)</li>
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
        <h2 className="text-xl font-semibold mb-2">Order Tracking</h2>
        <p>
          Once your order has shipped, you will receive an email with a tracking
          number and link to track your package.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Shipping Delays</h2>
        <p>
          Delivery times may be affected during peak seasons or due to
          unforeseen circumstances. We appreciate your patience and
          understanding.
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
