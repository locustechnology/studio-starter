import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { Database } from './types/supabase'

export async function middleware(req: NextRequest) {
  try {
    // Create a response early
    const res = NextResponse.next()

    // Create the Supabase client
    const supabase = createMiddlewareClient<Database>({ req, res })

    // Refresh session if expired - required for Server Components
    await supabase.auth.getSession()

    return res
  } catch (e) {
    console.error('Middleware error:', e)
    // In case of error, allow the request to continue
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}