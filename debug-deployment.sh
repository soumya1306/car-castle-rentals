#!/bin/bash

echo "🔍 Debugging Vercel Deployment..."

# Check environment variables
echo "📋 Checking environment variables:"
vercel env ls

# Check build logs
echo "📊 Recent deployments:"
vercel ls

# Pull environment variables
echo "⬇️  Pulling environment variables:"
vercel env pull .env.production

echo "✅ Debug complete. Check logs in Vercel dashboard for runtime errors."