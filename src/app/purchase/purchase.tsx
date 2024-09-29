import Image from 'next/image';
import productsData from '../data/products.json'; 

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
      <h1>Products</h1>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '20px' }}>
            <Image src={product.image} alt={product.name} width={200} height={200} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Purchase;
