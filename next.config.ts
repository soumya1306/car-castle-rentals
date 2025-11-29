import type { NextConfig } from "next";

const VERCEL_BLOB_URL = process.env.VERCEL_BLOB_URL;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL(`${VERCEL_BLOB_URL}/**`)],
  },

  // CORS Configuration using headers
  async headers() {
    return [
      {
        // Apply CORS headers to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*', // Allow all origins for now to fix the 403 error
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization, X-Requested-With, Accept, Origin',
          },
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'false', // Must be false when using wildcard origin
          },
          {
            key: 'Access-Control-Max-Age',
            value: '86400', // 24 hours
          },
        ],
      },
      {
        // Specific headers for API routes
        source: '/api/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*', // Allow all origins for API routes
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization, X-Requested-With, Accept, Origin, X-User-Id, X-User-Email, X-User-Role',
          },
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'false', // Must be false when using wildcard origin
          },
        ],
      },
    ];
  },
};

export default nextConfig;
