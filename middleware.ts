import { NextRequest, NextResponse } from 'next/server';
import { verifyTokenEdge, extractTokenFromHeader, isAdmin } from '@/utils/auth-edge';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const method = request.method;
  
  // Enhanced logging for production debugging
  console.log(`[Middleware] ${method} ${pathname}`);

  // For API routes that need protection
  if (pathname.startsWith('/api/cars') && ['PUT', 'POST', 'DELETE'].includes(method)) {
    console.log('[Middleware] Protected API route accessed');
    
    const authHeader = request.headers.get('authorization');
    console.log('[Middleware] Auth header present:', !!authHeader);
    
    const token = extractTokenFromHeader(authHeader);
    
    if (!token) {
      console.log('[Middleware] No token found, returning 401');
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    console.log('[Middleware] Token found, verifying...');
    const payload = await verifyTokenEdge(token);

    if (!payload) {
      console.log('[Middleware] Token verification failed, returning 403');
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 403 }
      );
    }

    if (!isAdmin(payload)) {
      console.log('[Middleware] User is not admin, returning 403');
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    console.log('[Middleware] Authentication successful, proceeding');

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
    // Match all API routes under /api/cars that need protection
    '/api/cars/:path*',
  ],
  runtime: 'edge', // Explicitly specify Edge Runtime
};