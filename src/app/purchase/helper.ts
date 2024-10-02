import { Product } from "./productCard";
const productList: Array<Product> = [];
/**
 * Adds the specific product to the cart
 * @param product holds the current product select
 */
export function addProduct(product: Product) 
{
  productList.push(product);
}

/**
 * Removes the specific product for the cart
 * @param product holds the current product select
 */
export function removeProduct(product: Product) 
{
  const index = productList.findIndex((p) => p.id === product.id);
  if (index !== -1) 
  {
    productList.splice(index, 1);
  }
}