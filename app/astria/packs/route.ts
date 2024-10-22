// app/api/astria/packs/route.ts
import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

const API_KEY = process.env.ASTRIA_API_KEY;
const DOMAIN = "https://api.astria.ai/gallery";

export async function GET() {
  if (!API_KEY) {
    return NextResponse.json({ error: "API key is missing" }, { status: 500 });
  }

  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const headers = { 
      Authorization: `Bearer ${API_KEY}`,
      'Cache-Control': 'no-store'
    };
    
    const response = await axios.get(`${DOMAIN}/packs`, { 
      headers,
      timeout: 10000
    });

    if (!Array.isArray(response.data)) {
      return NextResponse.json(
        { error: "Unexpected response format" }, 
        { 
          status: 500,
          headers: {
            'Cache-Control': 'no-store',
            'Pragma': 'no-cache'
          }
        }
      );
    }

    const packs = response.data.map((pack: any) => ({
      id: pack.id,
      name: pack.name,
      image_url: pack.image_url || '/placeholder.jpg'
    }));

    return NextResponse.json(packs, {
      headers: {
        'Cache-Control': 'no-store',
        'Pragma': 'no-cache'
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch packs" }, 
      { status: 500 }
    );
  }
}