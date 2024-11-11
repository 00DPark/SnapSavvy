"use client";

import { useState, useEffect } from 'react';
import { placeOrder } from '@/app/api/stripe/inventory';
import CancelPage from '../../viewCancel/page';
import SuccessPage from '../page';
import { Product } from '../../homePage/productCard';
import { getPurchasedProducts } from '../../helper/productHelper';
const ProcessPage = () => {
  const [orderStatus, setOrderStatus] = useState<'processing' | 'success' | 'failure'>('processing');

  // Hardcode customer name and use getPurchasedProducts for product map
  const customerName = "John Doe";  // Hardcoded customer name
  const productMap: Map<Product, number> = getPurchasedProducts();

  // Proceed with order creation after Stripe Checkout session is created
  useEffect(() => {
    const placeOrderAsync = async () => {
      const orderData = {
        customer_name: customerName,  // Using the hardcoded name
        items: Array.from(productMap).map(([product, quantity]) => ({
          item_name: product.name, // Using the actual product name
          quantity_ordered: quantity, // Using the actual quantity
        })),
      };
      console.log(getPurchasedProducts)
      console.log("Order Data: ", JSON.stringify(orderData, null, 2));

      try {
        const orderResponse = await placeOrder();

        if (!orderResponse.ok || orderResponse.status !== 200) {
          console.error("Inventory update failed");
          console.error(await orderResponse.json()); // Print the error response in detail
          setOrderStatus('failure');
        } else {
          // Successfully placed order
          console.log("Order successfully placed!");
          setOrderStatus('success');
        }
      } catch (error) {
        console.error("Error placing order:", error);
        setOrderStatus('failure');
      }
    };

    placeOrderAsync();
  }, [productMap]); // Run when productMap changes

  return (
    <div>
      {orderStatus === 'processing' && <div>Processing your order...</div>}

      {orderStatus === 'success' && <SuccessPage />} {/* Show Confirmation Page on success */}

      {orderStatus === 'failure' && <CancelPage />} {/* Show Cancel Page on failure */}
    </div>
  );
};

export default ProcessPage;
