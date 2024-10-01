import Image from 'next/image';

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="border p-4 w-48 bg-white shadow-md">
      <Image src={product.image} alt={product.name} width={200} height={200} className="mb-4" />
      <h2 className="text-xl font-semibold text-blue-600">{product.name}</h2>
      <p className="text-gray-700">{product.description}</p>
      <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
    </div>
  );
};

export default ProductCard;