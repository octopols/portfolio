# 🌐 Domain Setup & GitHub Pages Deployment Guide

## Step 1: Purchase Domain (hirnaymay.com)

### Recommended Domain Registrars:
1. **Namecheap** (https://www.namecheap.com) - $10-15/year
2. **Google Domains** (https://domains.google) - $12/year
3. **Cloudflare** (https://www.cloudflare.com/products/registrar/) - At-cost pricing
4. **Porkbun** (https://porkbun.com) - $9-11/year

### What to Look For:
- ✅ Free WHOIS privacy
- ✅ Easy DNS management
- ✅ Good customer support
- ✅ No hidden renewal fees

---

## Step 2: Configure DNS Records

After purchasing `hirnaymay.com`, add these DNS records in your registrar's control panel:

### For GitHub Pages with Custom Domain:

**A Records (for apex domain: hirnaymay.com)**
```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153
```

**AAAA Records (IPv6 - Optional but recommended)**
```
Type: AAAA
Name: @
Value: 2606:50c0:8000::153

Type: AAAA
Name: @
Value: 2606:50c0:8001::153

Type: AAAA
Name: @
Value: 2606:50c0:8002::153

Type: AAAA
Name: @
Value: 2606:50c0:8003::153
```

**CNAME Record (for www subdomain)**
```
Type: CNAME
Name: www
Value: octopols.github.io
```

### DNS Propagation
- Changes can take **24-48 hours** to fully propagate
- Use https://dnschecker.org to check propagation status

---

## Step 3: Enable GitHub Pages

1. **Go to your GitHub repository**
   - Navigate to: https://github.com/octopols/portfolio

2. **Settings → Pages**
   - Click on "Settings" tab
   - Scroll down to "Pages" in the left sidebar

3. **Configure Source**
   - Source: **GitHub Actions** (already set up!)
   - Branch: Leave as default (workflow handles it)

4. **Add Custom Domain**
   - Custom domain: `hirnaymay.com`
   - Click "Save"
   - ✅ **Enforce HTTPS** (check this box after DNS propagates)

---

## Step 4: Deploy Your Portfolio

### Option A: Deploy Now (Automatic via GitHub Actions)

```bash
# Make sure you're in the portfolio directory
cd /Users/hiranmaybhaskar/portfolio

# Add all production files
git add .

# Commit with a meaningful message
git commit -m "feat: Production-ready portfolio with custom domain

- Add comprehensive SEO meta tags (Open Graph, Twitter Cards)
- Implement security headers and CSP
- Add analytics and error monitoring templates
- Configure GitHub Pages deployment with custom domain
- Add accessibility improvements (skip links, focus states)
- Create deployment documentation and guides
- Add PWA manifest and favicon templates"

# Push to GitHub (triggers automatic deployment)
git push origin main
```

The GitHub Actions workflow will automatically:
1. Build your site
2. Deploy to GitHub Pages
3. Make it available at `hirnaymay.com` (after DNS propagation)

### Option B: Manual Build & Deploy

```bash
# Build production files
./build.sh

# Review the dist/ directory
ls -la dist/

# Then commit and push as above
```

---

## Step 5: Verify Deployment

### Check Deployment Status
1. Go to: https://github.com/octopols/portfolio/actions
2. Watch the latest workflow run
3. Should complete in 2-3 minutes

### Test Your Site
```bash
# After workflow completes, visit:
# https://octopols.github.io/portfolio (immediate)
# https://hirnaymay.com (after DNS propagates)
```

### DNS Propagation Check
```bash
# Check if DNS has propagated
dig hirnaymay.com +short

# Should show GitHub Pages IPs:
# 185.199.108.153
# 185.199.109.153
# 185.199.110.153
# 185.199.111.153
```

---

## Step 6: Enable HTTPS

**⚠️ IMPORTANT: Wait for DNS to fully propagate first!**

1. Go to: https://github.com/octopols/portfolio/settings/pages
2. After DNS propagates (24-48 hours), you'll see:
   - ✅ "DNS check successful"
3. Check the box: **Enforce HTTPS**
4. Wait a few minutes for certificate provisioning

Your site will now be accessible at:
- ✅ https://hirnaymay.com (primary)
- ✅ https://www.hirnaymay.com (redirects to primary)
- ✅ https://octopols.github.io/portfolio (GitHub subdomain)

---

## Step 7: Post-Deployment Checklist

### Immediate (Day 1)
- [ ] Verify site loads at `https://octopols.github.io/portfolio`
- [ ] Check all pages (index.html, photography.html)
- [ ] Test mobile responsiveness
- [ ] Verify all images load correctly
- [ ] Test navigation menu and links

### After DNS Propagates (Day 2-3)
- [ ] Verify site loads at `https://hirnaymay.com`
- [ ] Enable HTTPS enforcement
- [ ] Test HTTPS redirect (http → https)
- [ ] Verify www redirect (www.hirnaymay.com → hirnaymay.com)

### SEO & Analytics (Week 1)
- [ ] Submit to Google Search Console
  - URL: https://search.google.com/search-console
  - Add property: `hirnaymay.com`
  - Verify via DNS TXT record or HTML file
  - Submit sitemap: `https://hirnaymay.com/sitemap.xml`

- [ ] Submit to Bing Webmaster Tools
  - URL: https://www.bing.com/webmasters
  - Import from Google Search Console (easier)

- [ ] Test social sharing
  - Facebook: https://developers.facebook.com/tools/debug/
  - Twitter: https://cards-dev.twitter.com/validator
  - LinkedIn: https://www.linkedin.com/post-inspector/

- [ ] Set up Google Analytics
  - Get tracking ID from https://analytics.google.com
  - Update `G-XXXXXXXXXX` in index.html

### Performance (Week 1)
- [ ] Run Lighthouse audit
  - Target: 90+ on all metrics
- [ ] Test on real devices (mobile, tablet)
- [ ] Check loading speed from different locations
  - Use: https://www.webpagetest.org

---

## Troubleshooting

### Site Not Loading After Push
- **Check Actions Tab**: https://github.com/octopols/portfolio/actions
- **Look for errors** in the workflow run
- **Common fix**: Re-run the workflow

### DNS Not Propagating
- **Be patient**: Can take up to 48 hours
- **Check status**: https://dnschecker.org
- **Verify records**: Make sure A records point to all 4 IPs

### HTTPS Not Working
- **Wait for DNS**: Must propagate first
- **GitHub Settings**: Ensure custom domain is set correctly
- **Uncheck/Recheck**: Try toggling "Enforce HTTPS"

### 404 Errors
- **Check CNAME file**: Must contain `hirnaymay.com`
- **Rebuild**: Push a new commit to trigger rebuild
- **Branch check**: Ensure deploying from correct branch

### Images Not Loading
- **Check paths**: All paths should be relative (start with `assets/`)
- **Case sensitivity**: GitHub Pages is case-sensitive
- **Verify files**: Ensure all images are in the repo

---

## Quick Reference Commands

```bash
# Check current branch
git branch

# View git status
git status

# Stage all changes
git add .

# Commit changes
git commit -m "Your message here"

# Push to GitHub (triggers deployment)
git push origin main

# Check deployment logs
# Visit: https://github.com/octopols/portfolio/actions

# Test DNS propagation
dig hirnaymay.com +short

# Local testing
python3 -m http.server 8000
```

---

## Additional Resources

- **GitHub Pages Docs**: https://docs.github.com/en/pages
- **Custom Domain Guide**: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
- **DNS Checker**: https://dnschecker.org
- **SSL Test**: https://www.ssllabs.com/ssltest/

---

## Support

If you encounter issues:
1. Check the [GitHub Pages documentation](https://docs.github.com/en/pages)
2. Review workflow logs in Actions tab
3. Verify DNS records are correct
4. Wait 24-48 hours for DNS propagation

---

**Created**: December 8, 2025  
**Status**: Ready to deploy  
**Next Step**: Push to GitHub, then configure DNS after purchasing domain
