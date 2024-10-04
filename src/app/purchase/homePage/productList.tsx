import ProductCard from './productCard';
import { Product } from './productCard';

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