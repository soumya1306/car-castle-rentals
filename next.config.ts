import type { NextConfig } from "next";

const VERCEL_BLOB_URL = process.env.VERCEL_BLOB_URL;

const nextConfig: NextConfig = {
    images: {
    remotePatterns: [new URL(`${VERCEL_BLOB_URL}/**`)],
  },
};

export default nextConfig;
