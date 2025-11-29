import { NextRequest, NextResponse } from 'next/server';
import { verifyTokenEdge, extractTokenFromHeader, isAdmin } from '@/utils/auth-edge';
import { getAllowedOrigins, isOriginAllowed, getCorsHeaders, isValidDomain } from '@/utils/domain';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const method = request.method;
  const origin = request.headers.get('origin');
  const hostname = request.nextUrl.hostname;
  
  // Enhanced logging for production debugging
  console.log(`[Middleware] ${method} ${pathname} from origin: ${origin}, hostname: ${hostname}`);

  // Check if the request is from a valid domain
  if (!isValidDomain(hostname) && process.env.NODE_ENV === 'production') {
    console.log('[Middleware] Invalid domain access attempt:', hostname);
    return NextResponse.json(
      { error: 'Domain not allowed' },
      { status: 403 }
    );
  }

  // Handle preflight OPTIONS requests
  if (method === 'OPTIONS') {
    console.log('[Middleware] Handling OPTIONS preflight request');
    return new NextResponse(null, {
      status: 200,
      headers: getCorsHeaders(origin),
    });
  }

  // For API routes that need protection
  if (pathname.startsWith('/api/cars') && ['PUT', 'POST', 'DELETE'].includes(method)) {
    console.log('[Middleware] Protected API route accessed');
    
    // Check if origin is allowed for API requests
    if (origin && !isOriginAllowed(origin)) {
      console.log('[Middleware] Origin not allowed for API access:', origin);
      return NextResponse.json(
        { error: 'Origin not allowed' },
        { 
          status: 403,
          headers: getCorsHeaders(origin),
        }
      );
    }
    
    const authHeader = request.headers.get('authorization');
    console.log('[Middleware] Auth header present:', !!authHeader);
    
    const token = extractTokenFromHeader(authHeader);
    
    if (!token) {
      console.log('[Middleware] No token found, returning 401');
      return NextResponse.json(
        { error: 'Authentication required' },
        { 
          status: 401,
          headers: getCorsHeaders(origin),
        }
      );
    }

    console.log('[Middleware] Token found, verifying...');
    const payload = await verifyTokenEdge(token);

    if (!payload) {
      console.log('[Middleware] Token verification failed, returning 403');
      return NextResponse.json(
        { error: 'Invalid token' },
        { 
          status: 403,
          headers: getCorsHeaders(origin),
        }
      );
    }

    if (!isAdmin(payload)) {
      console.log('[Middleware] User is not admin, returning 403');
      return NextResponse.json(
        { error: 'Admin access required' },
        { 
          status: 403,
          headers: getCorsHeaders(origin),
        }
      );
    }

    console.log('[Middleware] Authentication successful, proceeding');

    // Add user info to headers for use in API routes
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', payload.userId);
    requestHeaders.set('x-user-email', payload.email);
    requestHeaders.set('x-user-role', payload.role);

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    // Add CORS headers to the response
    Object.entries(getCorsHeaders(origin)).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  }

  // For all other requests, add CORS headers
  const response = NextResponse.next();
  Object.entries(getCorsHeaders(origin)).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: [
    // Match all API routes for CORS handling
    '/api/:path*',
    // Match all pages for general CORS
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)',
  ],
  runtime: 'edge', // Explicitly specify Edge Runtime
};