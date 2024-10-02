import ProductCard from './productCard';

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;