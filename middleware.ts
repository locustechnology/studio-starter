// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });

  await supabase.auth.getSession();

  return res;
}

export const config = {
  matcher: [
    '/api/astria/:path*',
    '/astria/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};