"use client";

import { useState, useEffect } from 'react';
import * as productHelper from "../helper/productHelper";
import { Product } from "../homePage/productCard";
import Header from "../homePage/header";
import Footer from "../homePage/footer";
import RedirectButton from './redirectButton';

const ViewOrder = () => {
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>([]);
  const [totalCost, setTotalCost] = useState<number>(0);

  useEffect(() => {
    const items = productHelper.getPurchasedProducts(); // Assuming this returns a Map<Product, number>

    // Transform the map into an array of objects for easier rendering
    const transformedItems = Array.from(items).map(([product, quantity]) => ({ product, quantity }));

    setCartItems(transformedItems);
    calculateTotalCost(transformedItems);
  }, []);

  const calculateTotalCost = (items: { product: Product; quantity: number }[]) => {
    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    setTotalCost(total);
  };


  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Order Summary</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Product</th>
                  <th className="border px-4 py-2">Quantity</th>
                  <th className="border px-4 py-2">Price</th>
                  <th className="border px-4 py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.product.id}>
                    <td className="border px-4 py-2">{item.product.name}</td>
                    <td className="border px-4 py-2">{item.quantity}</td>
                    <td className="border px-4 py-2">${item.product.price.toFixed(2)}</td>
                    <td className="border px-4 py-2">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h2 className="text-2xl font-bold mt-4">
              Total Cost: ${totalCost.toFixed(2)}
            </h2>
            <RedirectButton/>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ViewOrder;
