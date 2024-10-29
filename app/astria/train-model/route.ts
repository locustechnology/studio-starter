import { Database } from "@/types/supabase";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const astriaApiKey = process.env.ASTRIA_API_KEY;
const astriaApiDomain = process.env.ASTRIA_API_DOMAIN;
const astriaTestModeIsOn = process.env.ASTRIA_TEST_MODE === "true";


// Add validation check
if (!astriaApiDomain) {
  throw new Error("MISSING ASTRIA_API_DOMAIN!");
}

const packsIsEnabled = !process.env.ASTRIA_TEST_MODE && process.env.NEXT_PUBLIC_TUNE_TYPE === "packs";
const appWebhookSecret = process.env.APP_WEBHOOK_SECRET;
const stripeIsConfigured = process.env.NEXT_PUBLIC_STRIPE_IS_ENABLED === "true";

if (!appWebhookSecret) {
  throw new Error("MISSING APP_WEBHOOK_SECRET!");
}

export async function POST(request: Request) {
  console.log('Starting model training process');
  
  const payload = await request.json();
  console.log('Received payload', { payload });

  const modelInfo = payload.modelInfo;
  const images = payload.imageUrls;
  const pack = payload.selectedPack;
  // Extract model type, gender, packId, and packSlug from modelInfo
  
  const type = modelInfo.type;
  const gender = modelInfo.type;
  const packId = pack.id
  const packSlug = pack.slug
  const name = modelInfo.name;

  const supabase = createRouteHandlerClient<Database>({ cookies });
  console.log('Supabase client created');

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.log('Unauthorized access attempt');
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  if (!astriaApiKey) {
    console.log('Missing Astria API Key configuration');
    return NextResponse.json(
      {
        message: "Missing API Key: Add your Astria API Key to generate headshots",
      },
      { status: 500 }
    );
  }

  if (images?.length < 4) {
    console.log("Insufficient images provided", { count: images?.length });
    return NextResponse.json(
      { message: "Upload at least 4 sample images" },
      { status: 500 }
    );
  }
  let _credits = null;

  console.log("Is Stripe Configured?", { stripeIsConfigured });
  if (stripeIsConfigured) {
    const { error: creditError, data: credits } = await supabase
      .from("credits")
      .select("credits")
      .eq("user_id", user.id);

    if (creditError) {
      console.error("Error fetching credits", { creditError });
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
        console.error("Error Creating Credits", { errorCreatingCredits });
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
        },
        { status: 500 }
      );
    } else {
      _credits = credits;
    }
  }

  // create a model row in supabase
  const { error: modelError, data } = await supabase
    .from("models")
    .insert({
      user_id: user.id,
      name,
      type,
    })
    .select("id")
    .single();

  if (modelError) {
    console.error("Error Creating Model", { modelError });
    return NextResponse.json(
      {
        message: "Something went wrong!",
      },
      { status: 500 }
    );
  }
  
  // Get the modelId from the created model
  const modelId = data?.id;

  try {

    const trainWebhook = `https://${process.env.VERCEL_URL}/astria/train-webhook`;
    const trainWebhookWithParams = `${trainWebhook}?user_id=${user.id}&model_id=${modelId}&webhook_secret=${appWebhookSecret}`;

    console.log("Train Webhook", { trainWebhookWithParams });
    const promptWebhook = `https://${process.env.VERCEL_URL}/astria/prompt-webhook`;
    const promptWebhookWithParams = `${promptWebhook}?user_id=${user.id}&&model_id=${modelId}&webhook_secret=${appWebhookSecret}`;

    console.log("Prompt Webhook", { promptWebhookWithParams });
    const API_KEY = astriaApiKey;
    const DOMAIN = astriaApiDomain;

    // Create a fine tuned model using Astria tune API
    const tuneBody = {
      tune: {
        title: name,
        // Hard coded tune id of Realistic Vision v5.1 from the gallery - https://www.astria.ai/gallery/tunes
        // https://www.astria.ai/gallery/tunes/690204/prompts
        base_tune_id: 690204,
        name: type,
        branch: astriaTestModeIsOn ? "fast" : "sd15",
        token: "ohwx",
        image_urls: images,
        callback: trainWebhookWithParams,
        prompts_attributes: [
          {
            text: `portrait of ohwx ${type} wearing a business suit, professional photo, white background, Amazing Details, Best Quality, Masterpiece, dramatic lighting highly detailed, analog photo, overglaze, 80mm Sigma f/1.4 or any ZEISS lens`,
            callback: promptWebhookWithParams,
            num_images: 8,
          }
        ],
      },
    };

    console.log("Tune Body", JSON.stringify(tuneBody));

    // Create a fine tuned model using Astria packs API
    const packBody = {
      tune: {
        title: name,
        name: type,
        callback: trainWebhookWithParams,
        prompt_attributes: {
          callback: promptWebhookWithParams,
        },
        image_urls: images,
      },
    };

    console.log("Pack Body", JSON.stringify(packBody));

    const apiUrl = DOMAIN + (packsIsEnabled ? `/p/${packId}/tunes` : "/tunes");
    const requestBody = packsIsEnabled ? packBody : tuneBody;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    };

    console.log('API Request Details:', {
      url: apiUrl,
      method: 'POST',
      headers,
      body: requestBody
    });

    const response = await fetch(
      apiUrl,
      {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody)
      }
    );

    const { status } = response;
    console.log("Response", { response });

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

    const { error: samplesError } = await supabase.from("samples").insert(
      images.map((sample: string) => ({
        modelId: modelId,
        uri: sample,
      }))
    );

    if (samplesError) {
      console.log("Error Creating Samples", { samplesError });
      console.error("samplesError: ", samplesError);
      return NextResponse.json(
        {
          message: "Something went wrong!",
        },
        { status: 500 }
      );
    }

    if (stripeIsConfigured && _credits && _credits.length > 0) {
      const subtractedCredits = _credits[0].credits - 1;
      const { error: updateCreditError, data } = await supabase
        .from("credits")
        .update({ credits: subtractedCredits })
        .eq("user_id", user.id)
        .select("*");

      console.log({ data });
      console.log({ subtractedCredits });

      if (updateCreditError) {
        console.log("Error Updating Credits", { updateCreditError });
        console.error({ updateCreditError });
        return NextResponse.json(
          {
            message: "Something went wrong!",
          },
          { status: 500 }
        );
      }
    }
  } catch (e) {
      console.log("Error Training Model", { e });
    // Rollback: Delete the created model if something goes wrong
    if (modelId) {
      await supabase.from("models").delete().eq("id", modelId);
    }
    return NextResponse.json(
      {
        message: "Something went wrong!",
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      message: "success",
    },
    { status: 200 }
  );
}
