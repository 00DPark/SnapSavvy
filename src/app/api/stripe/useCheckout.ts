import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Product } from "@/app/purchase/homePage/productCard";
import { checkInventory } from "@/app/purchase/helper/productHelper";
import { getPurchasedProducts } from "@/app/purchase/helper/productHelper";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export interface ShippingDetails {
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export interface OrderItem {
  item_name: string;
  quantity_ordered: number;
}

export const useCheckout = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async (details: ShippingDetails) => {
    setIsProcessing(true);
    const productMap: Map<Product, number> = getPurchasedProducts();

    const productsToSend = Array.from(productMap).map(([product, quantity]) => ({
      photoName: product.name,
      photoId: product.id,
      price: product.price,
      quantity: quantity,
    }));

    const inventoryStatus: number = await checkInventory();
    if (inventoryStatus !== 200) {
      console.error("Inventory does not contain product");
      setIsProcessing(false);
      return false;
    }

    const stripe = await stripePromise;
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ products: productsToSend, shippingDetails: details }),
    });

    const session = await response.json();
    const result = await stripe?.redirectToCheckout({ sessionId: session.id });

    if (result?.error) {
      console.error("Stripe Checkout Error:", result.error.message);
      setIsProcessing(false);
      return false;
    }

  };

  return { handleCheckout, isProcessing };
};
