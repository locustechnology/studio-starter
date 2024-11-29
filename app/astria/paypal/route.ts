import { NextResponse } from 'next/server';
import paypal from '@paypal/checkout-server-sdk';
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// Configure PayPal environment
const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '';
const clientSecret = process.env.CLIENT_SECRET ?? '';
let environment = process.env.NODE_ENV === 'production'
  ? new paypal.core.LiveEnvironment(clientId, clientSecret)
  : new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

export async function POST(req: Request) {
  try {
    const { amount, currency } = await req.json();

    if (!amount || !currency) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: currency,
          value: amount
        }
      }]
    });

    const response = await client.execute(request);
    console.log('PayPal order created successfully:', response.result);
    return NextResponse.json({ id: response.result.id });
  } catch (error) {
    console.error('Error creating PayPal order:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

export async function PUT(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  try {
    const { orderID } = await req.json();
    console.log('Received PUT request:', { orderID });

    if (!orderID) {
      return NextResponse.json({ error: 'Missing orderID' }, { status: 400 });
    }

    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    const response = await client.execute(request);
    console.log('PayPal order captured successfully:', response.result);

    // Get the authenticated user
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch or create user's credits
    const { data: creditData, error: creditError } = await supabase
      .from("credits")
      .select("credits")
      .eq("user_id", user.id)
      .single();

    let newCredits = 1; // Start with 1 credit for the current purchase

    if (creditError) {
      if (creditError.code === 'PGRST116') {
        // No credit entry found, create a new one
        const { error: insertError } = await supabase
          .from("credits")
          .insert({ user_id: user.id, credits: newCredits });

        if (insertError) {
          console.error('Error creating user credits:', insertError);
          return NextResponse.json({ error: "Failed to create user credits" }, { status: 500 });
        }
        console.log('New credit entry created for user');
      } else {
        console.error('Error fetching user credits:', creditError);
        return NextResponse.json({ error: "Failed to fetch user credits" }, { status: 500 });
      }
    } else {
      // Credit entry exists, update it
      newCredits += creditData.credits;
      const { error: updateCreditError } = await supabase
        .from("credits")
        .update({ credits: newCredits })
        .eq("user_id", user.id);

      if (updateCreditError) {
        console.error('Error updating user credits:', updateCreditError);
        return NextResponse.json({ error: "Failed to update user credits" }, { status: 500 });
      }
    }

    console.log('User credits updated successfully. New credit balance:', newCredits);

    return NextResponse.json({ 
      captureID: response.result.id,
      status: response.result.status,
      credits: newCredits,
      redirect: '/summary'
    });
  } catch (error) {
    console.error('Error processing payment and saving data:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
