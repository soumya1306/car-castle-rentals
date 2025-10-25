import { NextRequest, NextResponse } from "next/server";
import { 
  verifyRefreshToken, 
  generateToken, 
  generateRefreshToken,
  AdminUser 
} from "@/utils/auth";

/**
 * Handles POST requests to refresh JWT access token
 * 
 * @param request - Next.js request object containing refresh token
 * @returns NextResponse with new tokens or error message
 * 
 * @example
 * // Refresh access token
 * POST /api/auth/refresh
 * {
 *   "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const { refreshToken } = await request.json();

    // Validate required fields
    if (!refreshToken) {
      return NextResponse.json(
        { error: 'Refresh token is required' },
        { status: 400 }
      );
    }

    // Verify refresh token
    const payload = verifyRefreshToken(refreshToken);
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid or expired refresh token' },
        { status: 401 }
      );
    }

    // Create admin user object from payload
    const adminUser: AdminUser = {
      id: payload.userId,
      email: payload.email,
      role: payload.role
    };

    // Generate new tokens
    const newAccessToken = generateToken(adminUser);
    const newRefreshToken = generateRefreshToken(adminUser);

    console.log('Token refresh successful for user:', payload.email);

    return NextResponse.json({
      success: true,
      message: 'Tokens refreshed successfully',
      tokens: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Token refresh error:', error);
    
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