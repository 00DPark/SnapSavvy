
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// Define the request body interface
interface CheckoutRequestBody {
  products: {
    photoId: string;
    price: number;
    photoName: string;  // Add photoName here
    quantity: number; // Include quantity here
  }[];
  shippingDetails: {
    name: string;
    address: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
  };
}

// POST function to handle the Stripe session creation
export async function POST(request: Request) {
  try {
    // Parse the request body and ensure it matches the expected interface
    const { products, shippingDetails }: CheckoutRequestBody = await request.json();

    // Create the line_items array by mapping through the products
    const lineItems = products.map((product) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.photoName, // Use the photoId for product name
        },
        unit_amount: product.price * 100, // Convert price to cents
      },
      quantity: product.quantity, // Use the quantity from the product object
    }));

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'], // Specify allowed countries for shipping
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 500, // Shipping cost in cents ($5.00)
              currency: 'usd',
            },
            display_name: 'Standard Shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 5 },
              maximum: { unit: 'business_day', value: 7 },
            },
          },
        },
      ],
      line_items: lineItems, // Pass the created line items here
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/purchase/finalizingOrder`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/purchase/viewCancel`,
    });

    // Respond with the Stripe session ID
    return NextResponse.json({ id: session.id });
  } catch (err) {
    if (err instanceof Error) {
      // Return the error message in case of failure
      return NextResponse.json({ error: err.message }, { status: 500 });
    }

    // Generic error message
    return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
  }
}
