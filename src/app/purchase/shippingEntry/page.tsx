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
        <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <div className="text-center p-8 bg-gray-900 rounded-lg shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-white mb-4">Processing Your Order</h2>
          <p className="text-lg text-gray-300 mb-6">
            Your order is being processed. Thank you for your patience!
          </p>
          <p className="text-gray-400 mt-2">
            You will be redirected shortly once the process is complete.
          </p>
          <div className="mt-8 flex justify-center items-center">
            <div className="w-12 h-12 border-4 border-dashed border-blue-400 rounded-full animate-spin"></div>
          </div>
        </div>
      </div>        
      ) : (
        <ShippingForm onSubmit={handleShippingSubmit} />
      )}
    </div>
  );
};

export default CheckoutPage;
