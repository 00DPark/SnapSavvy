"use client";

import { useState } from "react";
import ShippingForm from "./shippingForm";
import { useCheckout, ShippingDetails } from "@/app/api/stripe/useCheckout";

const CheckoutPage = () => {
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails | null>(null);
  const { handleCheckout, isProcessing } = useCheckout();

  const handleShippingSubmit = async (details: ShippingDetails) => {
    setShippingDetails(details);
    const success = await handleCheckout(details);

    if (!success) {
      console.error("Checkout failed");
    }
  };

  return (
    <div>
      {isProcessing ? (
        <p>Processing your order...</p>
      ) : (
        <ShippingForm onSubmit={handleShippingSubmit} />
      )}
    </div>
  );
};

export default CheckoutPage;
