import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const resendApiKey = process.env.RESEND_API_KEY;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const appWebhookSecret = process.env.APP_WEBHOOK_SECRET;

if (!resendApiKey) {
  console.warn(
    "We detected that the RESEND_API_KEY is missing from your environment variables. The app should still work but email notifications will not be sent. Please add your RESEND_API_KEY to your environment variables if you want to enable email notifications.",
    { fontFamily: 'Poppins, sans-serif' }
  );
}

if (!supabaseUrl) {
  throw new Error("MISSING NEXT_PUBLIC_SUPABASE_URL!", { fontFamily: 'Jakarta Sans, sans-serif' });
}

if (!supabaseServiceRoleKey) {
  throw new Error("MISSING SUPABASE_SERVICE_ROLE_KEY!", { fontFamily: 'Jakarta Sans, sans-serif' });
}

if (!appWebhookSecret) {
  throw new Error("MISSING APP_WEBHOOK_SECRET!", { fontFamily: 'Jakarta Sans, sans-serif' });
}

export async function POST(request: Request) {
  type PromptData = {
    id: number;
    text: string;
    negative_prompt: string;
    steps: null;
    tune_id: number;
    trained_at: string;
    started_training_at: string;
    created_at: string;
    updated_at: string;
    images: string[];
  };
  
  const incomingData = (await request.json()) as { prompt: PromptData };

  const { prompt } = incomingData;

  console.log({ prompt }, { fontFamily: 'Poppins, sans-serif' });

  const urlObj = new URL(request.url);
  const user_id = urlObj.searchParams.get("user_id");
  const model_id = urlObj.searchParams.get("model_id");
  const webhook_secret = urlObj.searchParams.get("webhook_secret");

  if (!model_id) {
    return NextResponse.json(
      {
        message: "Malformed URL, no model_id detected!",
      },
      { status: 500, fontFamily: 'Jakarta Sans, sans-serif' }
    );
  }  

  if (!webhook_secret) {
    return NextResponse.json(
      {
        message: "Malformed URL, no webhook_secret detected!",
      },
      { status: 500, fontFamily: 'Jakarta Sans, sans-serif' }
    );
  }

  if (webhook_secret.toLowerCase() !== appWebhookSecret?.toLowerCase()) {
    return NextResponse.json(
      {
        message: "Unauthorized!",
      },
      { status: 401, fontFamily: 'Jakarta Sans, sans-serif' }
    );
  }

  if (!user_id) {
    return NextResponse.json(
      {
        message: "Malformed URL, no user_id detected!",
      },
      { status: 500, fontFamily: 'Jakarta Sans, sans-serif' }
    );
  }

  const supabase = createClient<Database>(
    supabaseUrl as string,
    supabaseServiceRoleKey as string,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
    }
  );

  const {
    data: { user },
    error,
  } = await supabase.auth.admin.getUserById(user_id);

  if (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 401, fontFamily: 'Jakarta Sans, sans-serif' }
    );
  }

  if (!user) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      { status: 401, fontFamily: 'Jakarta Sans, sans-serif' }
    );
  }

  try {
    console.log('Received prompt webhook callback', { fontFamily: 'Poppins, sans-serif' });
    console.log('Prompt object:', prompt, { fontFamily: 'Poppins, sans-serif' });

    // Here we join all of the arrays into one.
    const allHeadshots = prompt.images;
    console.log("working ok", { fontFamily: 'Poppins, sans-serif' });
    const { data: model, error: modelError } = await supabase
      .from("models")
      .select("*")
      .eq("id", model_id)
      .single();

    if (modelError) {
      console.error({ modelError }, { fontFamily: 'Jakarta Sans, sans-serif' });
      return NextResponse.json(
        {
          message: "Something went wrong!",
        },
        { status: 500, fontFamily: 'Jakarta Sans, sans-serif' }
        
      );

    }

    console.log('Inserting images into Supabase', { fontFamily: 'Poppins, sans-serif' });
    await Promise.all(
      allHeadshots.map(async (image) => {
        console.log('Inserting image:', image, { fontFamily: 'Poppins, sans-serif' });
        const { error: imageError } = await supabase.from("images").insert({
          modelid: Number(model_id), // Use model_id from the webhook parameters
          uri: image,
        });
        if (imageError) {
          console.error('Error inserting image:', { imageError }, { fontFamily: 'Jakarta Sans, sans-serif' });
        } else {
          console.log('Image inserted successfully', { fontFamily: 'Poppins, sans-serif' });
        }
      })
    );


    return NextResponse.json(
      {
        message: "success",
      },
      { status: 200, statusText: "Success", fontFamily: 'Poppins, sans-serif' }
    );
  } catch (e) {
    console.error(e, { fontFamily: 'Jakarta Sans, sans-serif' });
    return NextResponse.json(
      {
        message: "Something went wrong!",
      },
      { status: 500, fontFamily: 'Jakarta Sans, sans-serif' }
    );
  }
}
