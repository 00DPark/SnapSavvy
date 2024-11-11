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
    <div>
      <p>Processing your order...</p>
    </div>
  );
};

export default OrderProcessor;
