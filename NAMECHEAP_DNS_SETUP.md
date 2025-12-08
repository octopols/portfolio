# ⚡ Quick DNS Setup for Namecheap → GitHub Pages

## Step 1: Access DNS Settings

1. Log into Namecheap
2. Go to **Dashboard** → **Domain List**
3. Click **Manage** next to `hirnaymay.com`
4. Click **Advanced DNS** tab

## Step 2: Add DNS Records

Delete any existing A records or CNAME for @ and www, then add these:

### A Records (Required - Add all 4):
```
Type: A Record
Host: @
Value: 185.199.108.153
TTL: Automatic

Type: A Record
Host: @
Value: 185.199.109.153
TTL: Automatic

Type: A Record
Host: @
Value: 185.199.110.153
TTL: Automatic

Type: A Record
Host: @
Value: 185.199.111.153
TTL: Automatic
```

### CNAME Record (Required):
```
Type: CNAME Record
Host: www
Value: octopols.github.io
TTL: Automatic
```

### Example in Namecheap Interface:
| Type | Host | Value | TTL |
|------|------|-------|-----|
| A Record | @ | 185.199.108.153 | Automatic |
| A Record | @ | 185.199.109.153 | Automatic |
| A Record | @ | 185.199.110.153 | Automatic |
| A Record | @ | 185.199.111.153 | Automatic |
| CNAME Record | www | octopols.github.io | Automatic |

## Step 3: Save Changes

Click **Save All Changes** button

## Step 4: Verify GitHub Pages Settings

1. Go to: https://github.com/octopols/portfolio/settings/pages
2. Verify these settings:
   - **Source**: GitHub Actions ✅
   - **Custom domain**: hirnaymay.com ✅
   - **Enforce HTTPS**: Wait until DNS propagates (will show checkbox)

## Step 5: Check DNS Propagation

DNS takes 30 minutes to 48 hours to fully propagate.

**Check status:**
```bash
# Check if DNS is working
dig hirnaymay.com +short

# Should show (once propagated):
# 185.199.108.153
# 185.199.109.153
# 185.199.110.153
# 185.199.111.153

# Or use online tool:
# https://dnschecker.org/#A/hirnaymay.com
```

## Step 6: Enable HTTPS (After DNS Propagates)

Once DNS propagates (you'll see green checkmark in GitHub Pages settings):
1. Go back to GitHub Pages settings
2. Check **"Enforce HTTPS"**
3. Wait 5-10 minutes for certificate provisioning

## Timeline:

| Time | Status | What to Do |
|------|--------|------------|
| **Now** | DNS configured | Wait for propagation |
| **30 min - 2 hours** | DNS starts working | Check with dig command |
| **2-48 hours** | Fully propagated | Enable HTTPS in GitHub |
| **After HTTPS** | ✅ LIVE! | Share your portfolio! |

## Your Site URLs:

- **GitHub subdomain** (works immediately): https://octopols.github.io/portfolio
- **Custom domain** (after DNS): https://hirnaymay.com
- **WWW redirect** (after DNS): https://www.hirnaymay.com → https://hirnaymay.com

## Troubleshooting:

**DNS not updating?**
- Make sure you deleted old records
- Check you're editing the right domain
- Namecheap sometimes caches - try clearing DNS cache

**GitHub shows "DNS check unsuccessful"?**
- Be patient - can take up to 48 hours
- Check DNS with: https://dnschecker.org
- Make sure all 4 A records are added

**Need to speed up DNS?**
- Cloudflare DNS is faster (can migrate later)
- Use lower TTL values
- Wait 24 hours before troubleshooting

---

**Current Status:**
- ✅ Domain purchased (hirnaymay.com)
- ✅ GitHub Pages configured
- ⏳ DNS configuration (in progress)
- ⏳ Waiting for propagation
- ⏳ HTTPS setup (after DNS)

**Next:** Configure DNS as shown above, then wait for propagation!
