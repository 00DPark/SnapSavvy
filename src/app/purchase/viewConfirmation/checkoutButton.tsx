"use client";  // Mark this component as a Client Component

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Load Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

interface CheckoutButtonProps {
  photoId: number;
  price: number;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ photoId, price }) => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      // Send a POST request to the Stripe API route
      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ photoId, price }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { id } = await response.json();  // Get the Stripe session ID
      const stripe = await stripePromise;  // Get the Stripe instance

      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId: id });
        if (error) {
          console.error(error.message);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }

    setLoading(false);
  };

  return (
    <button onClick={handleCheckout} disabled={loading}
      className={`px-6 py-3 font-semibold text-white rounded-lg transition duration-300 ease-in-out ${
        loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-800'
      }`}>
      {loading ? 'Processing...' : 'Buy Now'}
    </button>
  );
};

export default CheckoutButton;
