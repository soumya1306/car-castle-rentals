import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Only allow this in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Debug endpoint disabled in production' }, { status: 404 });
  }

  return NextResponse.json({
    environment: process.env.NODE_ENV,
    jwtSecretSet: !!process.env.JWT_SECRET,
    jwtSecretLength: process.env.JWT_SECRET?.length || 0,
    availableEnvVars: Object.keys(process.env || {}).filter(key => 
      key.startsWith('JWT') || 
      key.startsWith('NEXT_PUBLIC') || 
      key.startsWith('VERCEL')
    ),
  });
}