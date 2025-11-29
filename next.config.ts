import type { NextConfig } from "next";

const VERCEL_BLOB_URL = process.env.VERCEL_BLOB_URL;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL(`${VERCEL_BLOB_URL}/**`)],
  },
  
  // Domain whitelisting and security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://carcastlegoa.com, https://www.carcastlegoa.com, http://localhost:3000",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization, X-Requested-With",
          },
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://carcastlegoa.com https://www.carcastlegoa.com;",
          },
        ],
      },
      {
        // Specific headers for API routes
        source: "/api/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://carcastlegoa.com, https://www.carcastlegoa.com, http://localhost:3000",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization, X-Requested-With, X-User-Id, X-User-Email, X-User-Role",
          },
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
        ],
      },
    ];
  },
  
  // Rewrites for domain routing if needed
  async rewrites() {
    return [
      {
        source: "/(.*)",
        destination: "/$1",
        has: [
          {
            type: "host",
            value: "carcastlegoa.com",
          },
        ],
      },
      {
        source: "/(.*)",
        destination: "/$1",
        has: [
          {
            type: "host",
            value: "www.carcastlegoa.com",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
