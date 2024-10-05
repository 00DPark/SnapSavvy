"use client";

import { useState } from 'react';
import ShippingForm from './shipping/shippingForm';
import { loadStripe } from '@stripe/stripe-js';

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

    // Send shipping and product info to the API route
    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        photoId: 1,   // Example photo ID, replace as needed
        price: 20,    // Example price, replace as needed
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
  };

  return (
    <div>
      <h1>Checkout</h1>
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
