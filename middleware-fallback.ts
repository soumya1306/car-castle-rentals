import { NextRequest, NextResponse } from 'next/server';

// Fallback middleware for Node.js runtime if Edge Runtime fails in production
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const method = request.method;
  
  console.log(`[Middleware-Fallback] ${method} ${pathname}`);

  // For API routes that need protection
  if (pathname.startsWith('/api/cars') && ['PUT', 'POST', 'DELETE'].includes(method)) {
    console.log('[Middleware-Fallback] Protected API route accessed');
    
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('[Middleware-Fallback] No valid auth header, returning 401');
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // For Node.js runtime, we can use dynamic import to use the regular auth module
    try {
      const { verifyToken } = await import('@/utils/auth');
      const token = authHeader.substring(7);
      const payload = verifyToken(token);

      if (!payload || payload.role !== 'admin') {
        console.log('[Middleware-Fallback] Token verification failed, returning 403');
        return NextResponse.json(
          { error: 'Admin access required' },
          { status: 403 }
        );
      }

      console.log('[Middleware-Fallback] Authentication successful, proceeding');

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
    } catch (error) {
      console.error('[Middleware-Fallback] Error:', error);
      return NextResponse.json(
        { error: 'Authentication failed' },
        { status: 500 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/cars/:path*',
  ],
  // Remove runtime specification to use Node.js runtime
};