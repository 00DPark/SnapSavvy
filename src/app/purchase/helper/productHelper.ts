/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from "../homePage/productCard";

// Store to hold products and their quantities
const ProductList: Map<Product, number> = loadCartFromLocalStorage();
let OrderID: number= 0;
/**
 * Adds the specific product to the cart
 * @param product holds the current product selected
 */
export function addToCart(product: Product) {
  if (ProductList.has(product)) {
    ProductList.set(product, ProductList.get(product)! + 1);
  } else {
    ProductList.set(product, 1);
  }
  if (typeof window !== "undefined") {
    saveCartToLocalStorage();  // Save to localStorage after adding (only client-side)
  }
}
export function setOrderId(id: number)
{
  OrderID= id;
}

export function getOrderId()
{
  return OrderID
}
/**
 * Removes the specific product from the cart
 * @param product holds the current product selected
 */
export function removeFromCart(product: Product) {
  ProductList.delete(product);
  if (typeof window !== "undefined") {
    saveCartToLocalStorage();  // Save to localStorage after removing (only client-side)
  }
}

/**
 * Gets the product list from all items the user purchased
 * @returns the list of products
 */
export function getPurchasedProducts() {
  return ProductList;
}

/**
 * Clears the purchased products from the cart
 */
export function clearCart() {
  ProductList.clear();
  if (typeof window !== "undefined") {
    localStorage.removeItem("purchasedProducts");  // Clear cart from localStorage (only client-side)
  }
}

/**
 * Gets the total quantity of a specific product in the cart
 * @param product holds the current product selected
 * @returns the specific count associated with the product
 */
export function getProductTotal(product: Product) {
  return getPurchasedProducts().get(product);
}


/**
 * Check inventory for the purchased products
 * @returns a status code (200 for success, other for error)
 */
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

// Load cart from localStorage and ensure Product type is respected
function loadCartFromLocalStorage(): Map<Product, number> {
  if (typeof window === "undefined") {
    return new Map(); // Return an empty map if we are not on the client
  }

  const storedData = localStorage.getItem("purchasedProducts");
  if (!storedData) return new Map();

  const productsArray = JSON.parse(storedData);
  const productMap = new Map<Product, number>();

  productsArray.forEach((item: any) => {
    // Ensure the Product object contains all required fields: id, name, price, description, image
    const product: Product = {
      id: item.id,
      name: item.name,
      price: item.price,
      description: item.description,  // Ensure this field exists
      image: item.image,  // Ensure this field exists
    };
    productMap.set(product, item.quantity);
  });
  return productMap;
}

// Save the cart to localStorage
function saveCartToLocalStorage() {
  if (typeof window === "undefined") return; // Do nothing if we are on the server

  const productsArray = Array.from(ProductList.entries()).map(([product, quantity]) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    description: product.description,  // Include all required properties
    image: product.image,  // Include all required properties
    quantity,
  }));
  localStorage.setItem("purchasedProducts", JSON.stringify(productsArray));
}
