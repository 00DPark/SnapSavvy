"use client";

import { useState, useEffect } from 'react';
import { placeOrder } from '@/app/api/stripe/inventory';
import CancelPage from '../../viewCancel/page';
import SuccessPage from '../page';
import { Product } from '../../homePage/productCard';
import { getPurchasedProducts } from '../../helper/productHelper';
import { getCustomerName } from '../../helper/checkoutHelper';

const ProcessPage = () => {
  const [orderStatus, setOrderStatus] = useState<'processing' | 'success' | 'failure'>('processing');

  // Hardcode customer name and use getPurchasedProducts for product map
  const customerName = getCustomerName(); // Hardcoded customer name
  const productMap: Map<Product, number> = getPurchasedProducts();

  // Proceed with order creation after Stripe Checkout session is created
  useEffect(() => {
    const placeOrderAsync = async () => {
      const orderData = {
        customer_name: customerName, // Using the hardcoded name
        items: Array.from(productMap).map(([product, quantity]) => ({
          item_name: product.name, // Using the actual product name
          quantity_ordered: quantity, // Using the actual quantity
        })),
      };
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 max-w-lg w-full bg-white shadow-md rounded-md">
        {orderStatus === 'processing' && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Processing Your Order</h2>
            <p className="text-gray-500">We are currently processing your order. This might take a few seconds...</p>
            <div className="mt-6">
              <div className="w-10 h-10 mx-auto border-4 border-dashed rounded-full border-blue-500 animate-spin"></div>
            </div>
          </div>
        )}

        {orderStatus === 'success' && (
          <div>
            <SuccessPage />
          </div>
        )}

        {orderStatus === 'failure' && (
          <div>
            <CancelPage />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessPage;
