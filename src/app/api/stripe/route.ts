import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// Define the request body interface
interface CheckoutRequestBody {
  photoId: number;
  price: number;
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
    const { photoId, price }: CheckoutRequestBody = await request.json();

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
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Photo #${photoId}`, // Use the photoId for product name
            },
            unit_amount: price * 100, // Price in cents (multiply by 100 to convert dollars to cents)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/purchase/viewConfirmation`,
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
