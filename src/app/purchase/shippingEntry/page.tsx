"use client";

import { useState } from 'react';
import ShippingForm from './shippingForm';
import { loadStripe } from '@stripe/stripe-js';
import { placeOrder } from '@/app/api/stripe/inventory';
import { checkInventory, getPurchasedProducts } from '../helper/productHelper';
import { Product } from '../homePage/productCard';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface ShippingDetails {
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

const CheckoutPage = () => {

  const [shippingDetails, setShippingDetails] = useState<ShippingDetails | null>(null);

  const handleShippingSubmit = async (details: ShippingDetails) => {

    setShippingDetails(details);  // Store shipping details in state for later use
    const inventoryStatus:number = await checkInventory();
    if(inventoryStatus != 200)
    {
      console.error("Inventory does not contain product");
      return;
    }


    const productMap: Map<Product, number> = getPurchasedProducts();

// Create an array of products with their photoId, price, and quantity
const productsToSend = Array.from(productMap).map(([product, quantity]) => ({
  photoName: product.name,  // Pass the photo name
  photoId: product.id,     // Using the product's ID
  price: product.price,    // Using the product's price
  quantity: quantity,      // Using the quantity from the productMap
}));

// Send shipping and product info to the API route
const stripe = await stripePromise;
const response = await fetch('/api/stripe', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    products: productsToSend, // Send the array of products with photoId, price, and quantity
    shippingDetails: details,  // Pass shipping details to backend
  }),
});
    
    const session = await response.json();

    // Redirect to Stripe Checkout page
    const result = await stripe?.redirectToCheckout({ sessionId: session.id });

    // Check if there is an error and handle it
    if (result?.error) {
      console.error('Stripe Checkout Error:', result.error.message);
    }

    const orderData= 
    {
      customer_name: details.name,
      items:[
        {item_name: "Boats", item_id: 2, quantity_ordered: 2},
        {item_name: "Cliffside", item_id: 5, quantity_ordered: 2}
      ]
    }
    const orderResponse: Response = await placeOrder(orderData);

    if(!orderResponse.ok)
    {
      console.error("Inventory update failed");
      console.error(orderResponse.json)
    }
  };

  return (
    <div>
      <ShippingForm onSubmit={handleShippingSubmit} />
    </div>
  );
};

export default CheckoutPage;
