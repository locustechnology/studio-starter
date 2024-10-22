import { NextResponse } from "next/server";
import axios from "axios";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";

// Add these export configurations
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

const API_KEY = process.env.ASTRIA_API_KEY;
const DOMAIN = "https://api.astria.ai/gallery";

export async function GET(request: Request) {
  // Create a new cookie store for each request
  const cookieStore = cookies();
  
  console.log("API route hit");
  if (!API_KEY) {
    console.log("API key is missing");
    return NextResponse.json({ error: "API key is missing" }, { status: 500 });
  }

  try {
    // Initialize Supabase client with the cookie store
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore });

    console.log("Checking user authentication");
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.log("Session error:", sessionError);
      return NextResponse.json({ error: "Session error" }, { status: 401 });
    }

    if (!session) {
      console.log("No active session");
      return NextResponse.json({ error: "No active session" }, { status: 401 });
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      console.log("Authentication error:", authError);
      return NextResponse.json({ error: "Authentication failed" }, { status: 401 });
    }

    console.log("User authenticated, fetching packs from Astria API");
    const headers = { 
      Authorization: `Bearer ${API_KEY}`,
      'Cache-Control': 'no-store'
    };
    
    const response = await axios.get(`${DOMAIN}/packs`, { 
      headers,
      timeout: 10000 // 10 second timeout
    });

    console.log("Raw Astria API response:", response.data);

    if (!Array.isArray(response.data)) {
      console.log("Unexpected response format from Astria API");
      return NextResponse.json(
        { error: "Unexpected response format from Astria API" }, 
        { 
          status: 500,
          headers: {
            'Cache-Control': 'no-store, must-revalidate',
            'Pragma': 'no-cache'
          }
        }
      );
    }

    console.log("Packs fetched, processing data");
    const packs = response.data.map((pack: any) => ({
      id: pack.id,
      name: pack.name,
      image_url: pack.image_url || '/placeholder.jpg'
    }));

    console.log("Returning processed packs", packs);
    return NextResponse.json(packs, {
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    });
  } catch (error) {
    console.error("Error fetching packs:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch packs", 
        details: error instanceof Error ? error.message : String(error) 
      },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      }
    );
  }
}