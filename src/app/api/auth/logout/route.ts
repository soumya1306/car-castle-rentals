import { NextResponse } from "next/server";

/**
 * Handles POST requests for admin logout
 * 
 * @param request - Next.js request object
 * @returns NextResponse with logout confirmation
 * 
 * @example
 * // Logout (client should clear tokens)
 * POST /api/auth/logout
 */
export async function POST() {
  try {
    // In a stateless JWT system, logout is handled client-side by removing tokens
    // This endpoint serves as a confirmation and for any server-side cleanup if needed
    
    console.log('Admin logout requested');

    return NextResponse.json({
      success: true,
      message: 'Logout successful'
    }, { status: 200 });

  } catch (error) {
    console.error('Logout API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}