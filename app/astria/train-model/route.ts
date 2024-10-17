import { Database } from "@/types/supabase";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import paypal from '@paypal/checkout-server-sdk';

export const dynamic = "force-dynamic";

const astriaApiKey = process.env.ASTRIA_API_KEY;
const astriaTestModeIsOn = process.env.ASTRIA_TEST_MODE === "true";
const packsIsEnabled = process.env.NEXT_PUBLIC_TUNE_TYPE === "packs";

const appWebhookSecret = process.env.APP_WEBHOOK_SECRET;
const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const paypalClientSecret = process.env.CLIENT_SECRET;
const paypalIsConfigured = !!paypalClientId && !!paypalClientSecret;

if (!appWebhookSecret) {
  throw new Error("MISSING APP_WEBHOOK_SECRET!");
}

// PayPal configuration
let environment, client;
if (paypalIsConfigured) {
  environment = new paypal.core.SandboxEnvironment(paypalClientId, paypalClientSecret);
  client = new paypal.core.PayPalHttpClient(environment);
}

export async function POST(request: Request) {
  console.log("Train model route hit");
  try {
    const payload = await request.json();
    console.log("Received payload:", payload);
    const { modelInfo, imageUrls, paymentInfo } = payload;

    const supabase = createRouteHandlerClient<Database>({ cookies });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    // Check credits
    const { data: credits, error: creditError } = await supabase
      .from("credits")
      .select("credits")
      .eq("user_id", user.id)
      .single();

    if (creditError) {
      if (creditError.code === 'PGRST116') {
        // No credits entry found for the user
        console.log("No credits entry found for the user. Creating one with 0 credits.");
        const { error: insertError } = await supabase
          .from("credits")
          .insert({ user_id: user.id, credits: 0 });
        
        if (insertError) {
          console.error("Error creating credits entry:", insertError);
          return NextResponse.json({ message: "Failed to create credits entry" }, { status: 500 });
        }
        
        return NextResponse.json(
          {
            message: "Not enough credits, please purchase some credits and try again.",
            redirect: "/get-credits"
          },
          { status: 402 }
        );
      } else {
        console.error("Error fetching credits:", creditError);
        return NextResponse.json({ message: "Failed to check credits" }, { status: 500 });
      }
    }

    if (!credits || credits.credits < 1) {
      return NextResponse.json(
        {
          message: "Not enough credits, please purchase some credits and try again.",
          redirect: "/get-credits"
        },
        { status: 402 }
      );
    }

    if (!astriaApiKey) {
      return NextResponse.json(
        {
          message:
            "Missing API Key: Add your Astria API Key to generate headshots",
        },
        {
          status: 500,
        }
      );
    }

    if (imageUrls?.length < 4) {
      return NextResponse.json(
        {
          message: "Upload at least 4 sample images",
        },
        { status: 500 }
      );
    }

    let _credits = null;

    console.log({ paypalIsConfigured, paypalClientId, paypalClientSecret });

    if (paypalIsConfigured) {
      const { error: creditError, data: credits } = await supabase
        .from("credits")
        .select("credits")
        .eq("user_id", user.id);

      if (creditError) {
        console.error({ creditError });
        return NextResponse.json(
          {
            message: "Something went wrong!",
          },
          { status: 500 }
        );
      }

      if (credits.length === 0) {
        // create credits for user.
        const { error: errorCreatingCredits } = await supabase
          .from("credits")
          .insert({
            user_id: user.id,
            credits: 0,
          });

        if (errorCreatingCredits) {
          console.error({ errorCreatingCredits });
          return NextResponse.json(
            {
              message: "Something went wrong!",
            },
            { status: 500 }
          );
        }

        return NextResponse.json(
          {
            message:
              "Not enough credits, please purchase some credits and try again.",
          },
          { status: 500 }
        );
      } else if (credits[0]?.credits < 1) {
        return NextResponse.json(
          {
            message:
              "Not enough credits, please purchase some credits and try again.",
            redirect: "/get-credits"
          },
          { status: 402 }
        );
      } else {
        _credits = credits;
      }
    } else {
      console.log("PayPal is not configured. Skipping credit check.");
    }

    // Create a model row in supabase
    const { error: modelError, data } = await supabase
      .from("models")
      .insert({
        user_id: user.id,
        name: modelInfo.name,
        type: modelInfo.type,
      })
      .select("id")
      .single();

    if (modelError) {
      console.error("modelError: ", modelError);
      return NextResponse.json(
        {
          message: "Something went wrong!",
        },
        { status: 500 }
      );
    }
    
    const modelId = data?.id;

    try {
      const trainWebhook = `https://${process.env.VERCEL_URL}/astria/train-webhook`;
      const trainWebhookWithParams = `${trainWebhook}?user_id=${user.id}&model_id=${modelId}&webhook_secret=${appWebhookSecret}`;

      const promptWebhook = `https://${process.env.VERCEL_URL}/astria/prompt-webhook`;
      const promptWebhookWithParams = `${promptWebhook}?user_id=${user.id}&&model_id=${modelId}&webhook_secret=${appWebhookSecret}`;

      const API_KEY = astriaApiKey;
      const DOMAIN = "https://api.astria.ai";

      // Create a fine tuned model using Astria tune API
      const tuneBody = {
        tune: {
          title: modelInfo.name,
          // Hard coded tune id of Realistic Vision v5.1 from the gallery - https://www.astria.ai/gallery/tunes
          // https://www.astria.ai/gallery/tunes/690204/prompts
          base_tune_id: 690204,
          name: modelInfo.type,
          branch: astriaTestModeIsOn ? "fast" : "sd15",
          token: "ohwx",
          image_urls: imageUrls,
          callback: trainWebhookWithParams,
          prompts_attributes: [
            {
              text: `portrait of ohwx ${modelInfo.type} wearing a business suit, professional photo, white background, Amazing Details, Best Quality, Masterpiece, dramatic lighting highly detailed, analog photo, overglaze, 80mm Sigma f/1.4 or any ZEISS lens`,
              callback: promptWebhookWithParams,
              num_images: 8,
            },
            {
              text: `8k close up linkedin profile picture of ohwx ${modelInfo.type}, professional jack suite, professional headshots, photo-realistic, 4k, high-resolution image, workplace settings, upper body, modern outfit, professional suit, business, blurred background, glass building, office window`,
              callback: promptWebhookWithParams,
              num_images: 8,
            },
          ],
        },
      };

      // Create a fine tuned model using Astria packs API
      const packBody = {
        tune: {
          title: modelInfo.name,
          name: modelInfo.type,
          callback: trainWebhookWithParams,
          prompt_attributes: {
            callback: promptWebhookWithParams,
          },
          image_urls: imageUrls,
        },
      };

      const response = await axios.post(
        DOMAIN + (packsIsEnabled ? `/p/${packBody.tune.name}/tunes` : "/tunes"),
        packsIsEnabled ? packBody : tuneBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      const { status } = response;

      if (status !== 201) {
        console.error({ status });
        // Rollback: Delete the created model if something goes wrong
        if (modelId) {
          await supabase.from("models").delete().eq("id", modelId);
        }

        if (status === 400) {
          return NextResponse.json(
            {
              message: "webhookUrl must be a URL address",
            },
            { status }
          );
        }
        if (status === 402) {
          return NextResponse.json(
            {
              message: "Training models is only available on paid plans.",
            },
            { status }
          );
        }
      }

      // Insert sample images
      const { error: samplesError } = await supabase.from("samples").insert(
        imageUrls.map((sample: string) => ({
          modelId: modelId,
          uri: sample,
        }))
      );

      if (samplesError) {
        console.error("samplesError: ", samplesError);
        return NextResponse.json(
          {
            message: "Something went wrong!",
          },
          { status: 500 }
        );
      }

      if (paypalIsConfigured && _credits && _credits.length > 0) {
        const subtractedCredits = _credits[0].credits - 1;
        const { error: updateCreditError, data } = await supabase
          .from("credits")
          .update({ credits: subtractedCredits })
          .eq("user_id", user.id)
          .select("*");

        console.log({ data });
        console.log({ subtractedCredits });

        if (updateCreditError) {
          console.error({ updateCreditError });
          return NextResponse.json(
            {
              message: "Something went wrong!",
            },
            { status: 500 }
          );
        }
      }

      return NextResponse.json(
        {
          message: "success",
        },
        { status: 200 }
      );
    } catch (e) {
      console.error(e);
      // Rollback: Delete the created model if something goes wrong
      if (modelId) {
        await supabase.from("models").delete().eq("id", modelId);
      }
      return NextResponse.json(
        {
          message: "Something went wrong!",
          error: e.message,
        },
        { status: 500 }
      );
    }
  } catch (e) {
    console.error("Error in train-model route:", e);
    return NextResponse.json(
      {
        message: "Something went wrong!",
        error: e.message,
      },
      { status: 500 }
    );
  }
}
