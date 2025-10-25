import { NextRequest, NextResponse } from "next/server";
import { 
  validateAdminCredentials, 
  generateToken, 
  generateRefreshToken 
} from "@/utils/auth";

/**
 * Handles POST requests for admin login
 * 
 * @param request - Next.js request object containing login credentials
 * @returns NextResponse with JWT token and user info or error message
 * 
 * @example
 * // Login with admin credentials
 * POST /api/auth/login
 * {
 *   "email": "admin@carcastle.com",
 *   "password": "admin123"
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate admin credentials
    const adminUser = validateAdminCredentials(email, password);
    if (!adminUser) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT tokens
    const accessToken = generateToken(adminUser);
    const refreshToken = generateRefreshToken(adminUser);

    console.log('Admin login successful:', email);

    // Return success response with tokens
    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        id: adminUser.id,
        email: adminUser.email,
        role: adminUser.role
      },
      tokens: {
        accessToken,
        refreshToken
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Login API error:', error);
    
    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid request body format' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Handles GET requests to validate current session
 * 
 * @param request - Next.js request object with Authorization header
 * @returns NextResponse with user info if authenticated or error
 */
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const { verifyToken } = await import('@/utils/auth');
    const payload = verifyToken(token);

    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: payload.userId,
        email: payload.email,
        role: payload.role
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Session validation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}