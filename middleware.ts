import { NextRequest, NextResponse } from 'next/server';
import { verifyTokenEdge, extractTokenFromHeader, isAdmin } from '@/utils/auth-edge';

export async function middleware(request: NextRequest) {
  console.log('Middleware triggered for:', request.nextUrl.pathname);

  // For API routes that need protection
  if (request.nextUrl.pathname.startsWith('/api/cars') && 
      ['PUT', 'POST', 'DELETE'].includes(request.method)) {
    
    const authHeader = request.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader);
    
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const payload = await verifyTokenEdge(token);

    if (!payload || !isAdmin(payload)) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    // Add user info to headers for use in API routes
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', payload.userId);
    requestHeaders.set('x-user-email', payload.email);
    requestHeaders.set('x-user-role', payload.role);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)',
  ],
  runtime: 'edge', // Explicitly specify Edge Runtime
};