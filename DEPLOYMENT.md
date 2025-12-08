# Portfolio Production Deployment

This document provides instructions for deploying the portfolio to various hosting platforms.

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel --prod`
3. Or connect GitHub repo at [vercel.com](https://vercel.com)

### Option 2: Netlify
1. Install Netlify CLI: `npm i -g netlify-cli`
2. Run: `netlify deploy --prod`
3. Or drag & drop the root folder at [netlify.com/drop](https://app.netlify.com/drop)

### Option 3: GitHub Pages
1. Enable GitHub Pages in repo settings
2. Set source to "GitHub Actions"
3. Push to main branch (workflow will auto-deploy)

## 📦 Build Process

Run the build script:
```bash
chmod +x build.sh
./build.sh
```

This creates a `dist/` folder with all production files.

## ✅ Pre-Deployment Checklist

- [ ] Update Google Analytics tracking ID in `index.html`
- [ ] Replace placeholder favicon files with actual icons
- [ ] Update domain in `sitemap.xml` and `robots.txt`
- [ ] Test all links and navigation
- [ ] Verify mobile responsiveness
- [ ] Test performance with Lighthouse
- [ ] Ensure all images are optimized
- [ ] Update email addresses and social links
- [ ] Test contact form functionality (if added)
- [ ] Review SEO meta tags
- [ ] Test across different browsers

## 🔧 Environment Configuration

### Custom Domain Setup
1. Add your domain in hosting platform settings
2. Update `canonical` URLs in HTML files
3. Update `sitemap.xml` with your domain
4. Update `robots.txt` with your sitemap URL
5. Configure DNS records as per hosting provider

### Analytics Setup
1. Create Google Analytics property
2. Replace `G-XXXXXXXXXX` in `index.html` with your tracking ID
3. Or use Plausible Analytics (uncomment the script)

## 🛡️ Security Headers

Security headers are configured in:
- `_headers` (Netlify)
- `netlify.toml` (Netlify alternative)
- `vercel.json` (Vercel)

These include:
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Content Security Policy

## 📊 Performance Optimization

Already implemented:
- DNS prefetching
- Resource preloading
- Deferred script loading
- Optimized font loading
- CSS/JS minification ready
- Image lazy loading ready

## 🔍 SEO Optimization

Implemented features:
- Open Graph tags
- Twitter Card metadata
- Structured data (JSON-LD)
- Sitemap.xml
- Robots.txt
- Canonical URLs
- Meta descriptions

## 🧪 Testing

Before deployment:
```bash
# Test locally
python3 -m http.server 8000
# Visit http://localhost:8000

# Run Lighthouse audit
# Use Chrome DevTools > Lighthouse
```

## 📱 PWA Support

To enable Progressive Web App features:
1. Generate icons using [realfavicongenerator.net](https://realfavicongenerator.net/)
2. Add generated files to root
3. Update `site.webmanifest` with correct icon paths

## 🆘 Troubleshooting

### Images not loading
- Check file paths are relative
- Verify assets folder structure
- Check file extensions match

### Scripts not working
- Verify js/main.js is loading
- Check browser console for errors
- Ensure CDN scripts are accessible

### Styling issues
- Clear browser cache
- Check CSS file path
- Verify Tailwind CDN is loading

## 📞 Support

For issues or questions:
- Email: hirnaymay@gmail.com
- GitHub: [@octopols](https://github.com/octopols)
