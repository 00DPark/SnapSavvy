/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from "@/app/purchase/homePage/productCard";
import { getPurchasedProducts } from "@/app/purchase/helper/productHelper";
import { getCustomerName, saveAndGetShippingAddress } from "@/app/purchase/helper/checkoutHelper";
interface OrderItem {
  item_name: string;
  quantity_ordered: number;
}

interface OrderData {
  customer_name: string;
  shipment_address: string;
  business_id: number;
  items: OrderItem[];
}

const Snap_Savvy_Business_Id: number= 5280;
const productMap: Map<Product, number> = getPurchasedProducts();
export async function placeOrder() {
  // Prepare order data with customer name and item list
  const orderData: OrderData = {
    customer_name: getCustomerName(),
    shipment_address: saveAndGetShippingAddress(),
    business_id: Snap_Savvy_Business_Id,
    items: Array.from(productMap).map(([product, quantity]) => ({
      item_name: product.name,
      item_id: product.id,
      quantity_ordered: quantity,
      weight: product.weight
    })),
  };

  const url = 'https://0d2vpawpie.execute-api.us-east-1.amazonaws.com/Test/order-processing';
  
  try {
    console.log(orderData)
    console.log(JSON.stringify(orderData, null, 2))
    const response:Response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    // Return the JSON response if the order was successful
    return await response.json();
  } catch (error) {
    console.error('Order submission error:', error);
    throw error;
  }
}
