"use client";

import { useState } from 'react';
import ShippingForm from './shippingForm';
import { loadStripe } from '@stripe/stripe-js';
import { placeOrder } from '@/app/api/stripe/inventory';
import { checkInventory } from '../helper/productHelper';
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
    const stripe = await stripePromise;
    // let Product: Product= getPurchasedProducts().
    // const inventoryCheckResponse = await fetch(`https://0d2vpawpie.execute-api.us-east-1.amazonaws.com/Test/orderprocessing?{}`, {
    //   method: 'GET',
    //   headers: {
    //   'Content-Type': 'application/json',
    //       }
    //     });
       
    //     if (!inventoryCheckResponse.ok) {
    //       console.error('Inventory check failed or item is out of stock');
    //   return;
    //     }
    const inventoryStatus:number = await checkInventory();
    if(inventoryStatus != 200)
    {
      console.error("Inventory does not contain product");
      return;
    }
    // Send shipping and product info to the API route
    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        photoId: 1,   // Example photo ID, replace as needed
        price: 200,    // Example price, replace as needed
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
      customer_name: "John Doe",
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

      {/* Optionally display shipping details after form submission */}
      {shippingDetails && (
        <div>
          <h2>Review Shipping Details:</h2>
          <p>Name: {shippingDetails.name}</p>
          <p>Street: {shippingDetails.address.street}</p>
          <p>City: {shippingDetails.address.city}</p>
          <p>State: {shippingDetails.address.state}</p>
          <p>Postal Code: {shippingDetails.address.postalCode}</p>
          <p>Country: {shippingDetails.address.country}</p>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
