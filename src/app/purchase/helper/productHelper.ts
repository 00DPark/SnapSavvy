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

export async function checkInventory(): Promise<number> {
  const purchasedProducts = getPurchasedProducts();
  const entries = Array.from(purchasedProducts.entries());

  for (const [product, quantity] of entries) {
    const itemName = product.name;

    try {
      const inventoryCheckResponse = await fetch(
        `https://0d2vpawpie.execute-api.us-east-1.amazonaws.com/Test/inventory-management/inventory?name=${encodeURIComponent(itemName)}&quantity=${encodeURIComponent(quantity)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (inventoryCheckResponse.status !== 200) {
        console.error(`Inventory check failed for item: ${itemName} with status ${inventoryCheckResponse.status}`);
        return inventoryCheckResponse.status; // Exit early with the non-200 status
      }

      const data = await inventoryCheckResponse.json();
      console.log(`Inventory check for ${itemName}:`, data);

    } catch (error) {
      console.error(`Error checking inventory for item: ${itemName}`, error);
      return 500; // Return 500 for internal error
    }
  }

  // If all requests were successful, return 200
  return 200;
}