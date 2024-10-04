import { Product } from "../homePage/productCard";
const ProductList: Map<Product, number> = new Map<Product, number>();
/**
 * Adds the specific product to the cart
 * @param product holds the current product select
 */
export function addToCart(product: Product) 
{
  if(ProductList.has(product))
  {
      ProductList.set(product, ProductList.get(product)! + 1);
  }
  else
  {
      ProductList.set(product, 1);
  }
}

/**
 * Removes the specific product for the cart
 * @param product holds the current product select
 */
export function removeFromCart(product: Product) 
{
  ProductList.delete(product);
}

/**
 * Gets the product list from all items the user purchased
 * @returns the list of products
 */
export function getPurchasedProducts()
{
  return ProductList;
}

/**
 * Clears the purchased products from the cart
 */
export function clearCart()
{
  ProductList.clear();
}

/**
 * 
 * @param product holds the current product select
 * @returns the specific count associated with the product
 */
export function getProductTotal(product: Product)
{
  return getPurchasedProducts().get(product);
}