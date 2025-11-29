import type { NextConfig } from "next";

const VERCEL_BLOB_URL = process.env.VERCEL_BLOB_URL;

// Define your whitelisted domains
const ALLOWED_ORIGINS = [
  'https://carcastlegoa.com/*',
  'https://www.carcastlegoa.com/*',
  'http://localhost:3000/*',
  'http://localhost:3001/*',
  'https://car-castle-rentals.vercel.app/*', // Your Vercel domain
];

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
            value: ALLOWED_ORIGINS.join(', '),
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
            value: 'true',
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
            value: ALLOWED_ORIGINS.join(', '),
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
            value: 'true',
          },
        ],
      },
    ];
  },

  // Optional: Rewrites for domain-specific routing
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/:path*',
        has: [
          {
            type: 'host',
            value: 'carcastlegoa.com',
          },
        ],
      },
      {
        source: '/:path*',
        destination: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.carcastlegoa.com',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
