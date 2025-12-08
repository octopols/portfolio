#!/bin/bash

# Production Build Script
# This script prepares the portfolio for production deployment

echo "🚀 Starting production build..."

# Create dist directory if it doesn't exist
mkdir -p dist

# Copy essential files
echo "📦 Copying files..."
cp index.html dist/
cp photography.html dist/
cp template.html dist/ 2>/dev/null || true
cp robots.txt dist/
cp sitemap.xml dist/
cp site.webmanifest dist/
cp CNAME dist/
cp -r assets dist/
cp -r css dist/
cp -r js dist/

# Copy deployment configs
cp _headers dist/ 2>/dev/null || true
cp netlify.toml dist/ 2>/dev/null || true
cp vercel.json dist/ 2>/dev/null || true

# Copy favicon files (if they exist)
cp favicon*.png dist/ 2>/dev/null || true
cp apple-touch-icon.png dist/ 2>/dev/null || true
cp android-chrome-*.png dist/ 2>/dev/null || true
cp favicon.ico dist/ 2>/dev/null || true

echo "✅ Build complete! Files are in the 'dist' directory"
echo ""
echo "📋 Next steps:"
echo "  1. Test locally: open dist/index.html in a browser"
echo "  2. Deploy to hosting service (Vercel, Netlify, or GitHub Pages)"
echo "  3. Update Google Analytics tracking ID in dist/index.html"
echo "  4. Generate and add favicon files"
echo ""
