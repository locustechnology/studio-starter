import { NextResponse } from "next/server";
import axios from "axios";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";

const API_KEY = process.env.ASTRIA_API_KEY;
const DOMAIN = "https://api.astria.ai/gallery";

export async function GET(request: Request) {
  console.log("API route hit");
  if (!API_KEY) {
    console.log("API key is missing");
    return NextResponse.json({ error: "API key is missing" }, { status: 500 });
  }

  const supabase = createRouteHandlerClient<Database>({ cookies });

  try {
    console.log("Checking user authentication");
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError) {
      console.log("Authentication error:", authError);
      return NextResponse.json({ error: "Authentication failed" }, { status: 401 });
    }

    if (!user) {
      console.log("User not authenticated");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("User authenticated, fetching packs from Astria API");
    const headers = { Authorization: `Bearer ${API_KEY}` };
    const response = await axios.get(`${DOMAIN}/packs`, { headers });

    console.log("Raw Astria API response:", response.data);

    if (!Array.isArray(response.data)) {
      console.log("Unexpected response format from Astria API");
      return NextResponse.json({ error: "Unexpected response format from Astria API" }, { status: 500 });
    }

    console.log("Packs fetched, processing data");
    const packs = response.data.map((pack: any) => ({
      id: pack.id,
      name: pack.name,
      image_url: pack.image_url || '/placeholder.jpg'
    }));

    console.log("Returning processed packs", packs);
    return NextResponse.json(packs);
  } catch (error) {
    console.error("Error fetching packs:", error);
    return NextResponse.json(
      { error: "Failed to fetch packs", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}