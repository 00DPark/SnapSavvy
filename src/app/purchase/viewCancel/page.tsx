"use client"
import { useEffect } from 'react';
import Link from 'next/link';
import { FaTimesCircle } from 'react-icons/fa';
import { clearCart } from '../helper/productHelper';

const CancelPage = () => {
  useEffect(() => {
    // Clear the cart when the CancelPage component mounts
    clearCart();
  }, []); // Empty dependency array ensures it runs only once on mount

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100">
      <FaTimesCircle className="text-red-500 text-6xl mb-4" />
      <h1 className="text-3xl font-bold text-red-700 mb-2">Payment Canceled</h1>
      <p className="text-lg text-red-600 mb-6">Your payment was not successful. Please try again.</p>
      <div className="flex space-x-4">
        <Link href="/">
          <div className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300 ease-in-out">
            Go to Home
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CancelPage;
