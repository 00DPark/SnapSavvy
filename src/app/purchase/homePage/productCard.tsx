import { useState, useEffect } from 'react';
import Image from 'next/image';
import * as productHelper from '../helper/productHelper';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

const ProductCard = ({ product }: { product: Product }) => {
  const [productCount, setProductCount] = useState<number>(0);

  // updates product count when the component loads
  useEffect(() => {
    const total = productHelper.getProductTotal(product) ?? 0; 
    setProductCount(total);
  }, [product]);

  // adds an item to the cart and increase the displayed count
  const addToCart = () => {
    productHelper.addToCart(product);
    setProductCount((prevCount) => prevCount + 1); 
  };

  // removes the item from the cart and decreases the count as well as prevents negative count
  const removeFromCart = () => {
    productHelper.removeFromCart(product);
    setProductCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0)); 
  };

  return (
    <div className="border p-4 w-48 bg-white shadow-md flex flex-col items-center">
      <Image src={product.image} alt={product.name} width={200} height={200} className="mb-4" />
      <h2 className="text-xl font-semibold text-blue-600 text-center">{product.name}</h2>
      <p className="text-gray-700 text-center">{product.description}</p>
      <p className="text-lg font-bold text-center">${product.price.toFixed(2)}</p>
      <div className="flex items-center space-x-4 mt-4">
        <button
          onClick={removeFromCart}
          className="w-10 h-10 bg-gray-500 text-white rounded-full flex justify-center items-center transition duration-300 ease-in-out"
        >
          -
        </button>
        <h1 className="text-lg">{productCount}</h1>
        <button
          onClick={addToCart}
          className="w-10 h-10 bg-gray-800 text-white rounded-full  flex justify-center items-center transition duration-300 ease-in-out"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
