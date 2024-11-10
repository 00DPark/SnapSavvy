/* eslint-disable @typescript-eslint/no-explicit-any */
export async function placeOrder(orderData: any) {
    const url = 'https://0d2vpawpie.execute-api.us-east-1.amazonaws.com/Test/order-processing';
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Order submission error:', error);
      throw error;
    }
  }