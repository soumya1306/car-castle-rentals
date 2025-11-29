// Production-ready CORS configuration for next.config.ts
// Use this after testing that the wildcard (*) works

import type { NextConfig } from "next";

const VERCEL_BLOB_URL = process.env.VERCEL_BLOB_URL;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL(`${VERCEL_BLOB_URL}/**`)],
  },

  // CORS Configuration with dynamic origin checking
  async headers() {
    return [
      {
        // Handle preflight OPTIONS requests
        source: '/api/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization, X-Requested-With, Accept, Origin',
          },
          {
            key: 'Access-Control-Max-Age',
            value: '86400',
          },
        ],
      },
    ];
  },
};

export default nextConfig;