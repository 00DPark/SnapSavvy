"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { placeOrder } from "@/app/api/stripe/inventory";
import { clearCart } from "../helper/productHelper";

const OrderProcessor: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const processOrder = async () => {
    if (isProcessing) return; // Prevent multiple executions

    console.log("Placing order...");
    setIsProcessing(true); // Mark as processing

    try {
      const response = await placeOrder();
      console.log(response);
      const body = JSON.parse(response.body); // Parse the response body
      const orderId = body.order_id; // Extract order_id
      console.log(orderId);

      if (response.statusCode !== 200) {
        console.log(response);
        router.push("viewCancel");
        clearCart();
      } else {
        // Construct the URL with query string manually
        router.push(`viewConfirmation?orderId=${orderId}`);
        clearCart();
      }
    } catch (error) {
      console.error("Order failed:", error);
      // Navigate to cancellation view if order fails
      router.push("viewCancel");
    } finally {
      setIsProcessing(false); // Reset processing state after order attempt
    }
  };

  useEffect(() => {
    console.log("useEffect running...");
    processOrder();
  }, []); // Only run once on initial render

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="text-center p-8 bg-gray-900 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-4">Finalizing Your Order</h2>
        <p className="text-lg text-gray-300 mb-6">
          Please wait while we finalize your order details. This may take a few moments.
        </p>
        <div className="flex justify-center items-center">
          <div className="w-12 h-12 border-4 border-dashed border-green-400 rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-gray-400">We’re almost there!</p>
      </div>
    </div>
  );
  
};

export default OrderProcessor;
