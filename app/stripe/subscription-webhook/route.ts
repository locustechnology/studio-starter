import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(request: Request) {
  console.log('Webhook function started');
  
  try {
    const payload = await request.json();
    console.log('Received Paddle webhook:', JSON.stringify(payload, null, 2));

    if (payload.event_type !== 'checkout.completed') {
      console.log('Unhandled event type:', payload.event_type);
      return NextResponse.json({ message: 'Unhandled event type' }, { status: 200 });
    }

    const userId = payload.data.custom_data?.user_id;
    if (!userId) {
      console.error('Missing user_id in custom_data');
      return NextResponse.json({ message: 'Missing user_id' }, { status: 400 });
    }

    const priceId = payload.data.items[0].price.id;
    const quantity = payload.data.items[0].quantity;

    console.log('Price ID:', priceId);
    console.log('Quantity:', quantity);

    const creditAmounts: { [key: string]: number } = {
      [process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_ONE_CREDIT!]: 1,
      [process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_THREE_CREDITS!]: 3,
      [process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_FIVE_CREDITS!]: 5,
    };

    console.log('Credit amounts:', creditAmounts);

    const creditsToAdd = (creditAmounts[priceId] || 0) * quantity;

    if (creditsToAdd === 0) {
      console.error(`Unknown price ID: ${priceId}`);
      return NextResponse.json({ message: 'Invalid price ID' }, { status: 400 });
    }

    console.log(`Adding ${creditsToAdd} credits for user ${userId}`);

    // Define the type for the add_credits function
    type AddCreditsFunction = {
      (args: { p_user_id: string; p_credits: number }): Promise<{ data: any; error: any }>
    };

    // Create a properly typed Supabase client
    const supabase = createClient<{ rpc: { add_credits: AddCreditsFunction } }>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    console.log('Updating credits in the database');
    const { data, error } = await supabase.rpc('add_credits', {
      p_user_id: userId,
      p_credits: creditsToAdd
    });

    if (error) {
      console.error('Error adding credits:', error);
      console.error('User ID:', userId);
      console.error('Credits to add:', creditsToAdd);
      return NextResponse.json({ message: 'Error adding credits', error: error.message }, { status: 500 });
    }

    console.log('Credits added successfully. RPC function result:', data);

    // Verify credits were added
    const { data: creditData, error: creditError } = await supabase
      .from('credits')
      .select('credits')
      .eq('user_id', userId)
      .single();

    if (creditError) {
      console.error('Error checking credits:', creditError);
    } else {
      console.log('Current credits for user:', creditData?.credits);
    }

    return NextResponse.json({ message: 'Credits added successfully' }, { status: 200 });
  } catch (error) {
    console.error('Unexpected error in webhook handler:', error);
    return NextResponse.json({ message: 'Internal server error', error: (error as Error).message }, { status: 500 });
  }
}
