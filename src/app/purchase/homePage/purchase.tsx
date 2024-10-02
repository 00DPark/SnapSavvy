"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import productsData from '../../data/products.json'; 
import Header from './header';
import ProductList from './productList';
import Footer from './footer';

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

const Purchase = () => {
  const products: Product[] = productsData;

  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Latest Products </h1>
        <ProductList products={products} />
      </main>
      <Footer />
    </div>
  );
};

export default Purchase;