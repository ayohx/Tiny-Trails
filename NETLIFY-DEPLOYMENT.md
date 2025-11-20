# Netlify Deployment Guide for Tiny Trails

## 🚀 Quick Setup

Your Tiny Trails app is now optimized for Netlify deployment!

---

## 📋 Prerequisites

1. ✅ GitHub repository: `https://github.com/ayohx/Tiny-Trails`
2. ✅ Netlify account (free tier works great!)
3. ✅ Configuration files in place

---

## 🔧 Configuration Files

### 1. `netlify.toml` ✅
Located in project root. Contains:
- Build command: `npm run build:web`
- Publish directory: `dist`
- Security headers
- SPA routing configuration
- Cache control settings

### 2. `package.json` ✅
Added build script:
```json
"build:web": "expo export --platform web --output-dir dist"
```

---

## 📤 Deployment Steps

### Option A: Deploy via Netlify Dashboard (Recommended for first time)

1. **Go to Netlify Dashboard**
   - Visit: https://app.netlify.com/

2. **Import from Git**
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub"
   - Authorize Netlify to access your repositories

3. **Select Repository**
   - Find and select: `ayohx/Tiny-Trails`

4. **Configure Build Settings**
   - **Base directory:** (leave blank)
   - **Build command:** `npm run build:web`
   - **Publish directory:** `dist`
   - **Node version:** 18 (set in Environment variables)

5. **Add Environment Variables** (if needed)
   - Go to Site settings → Build & deploy → Environment variables
   - Currently no env vars needed, but for future:
     - `NODE_VERSION` = `18`

6. **Deploy!**
   - Click "Deploy site"
   - Wait 3-5 minutes for first build
   - Your site will be live at: `https://random-name-12345.netlify.app`

7. **Custom Domain** (optional)
   - Go to Site settings → Domain management
   - Add custom domain or change site name
   - Example: `tiny-trails.netlify.app`

---

### Option B: Deploy via Netlify CLI

```bash
# Install Netlify CLI globally (one time)
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize Netlify for this project (from project root)
cd /Users/ayo.ogunrekun/Projects/Tiny-Trails
netlify init

# Build the project
npm run build:web

# Deploy
netlify deploy --prod
```

---

## 🔄 Continuous Deployment

Once set up, Netlify automatically deploys when you push to GitHub:

```bash
# Make changes locally
git add .
git commit -m "feat: your changes"
git push origin main

# Netlify automatically:
# 1. Detects the push
# 2. Runs npm run build:web
# 3. Deploys the dist folder
# 4. Your site updates in ~3-5 minutes!
```

---

## 📊 Build Process

### What Happens During Build

1. **Netlify clones your repo**
2. **Installs dependencies:** `npm install`
3. **Runs build command:** `npm run build:web`
   - This runs: `expo export --platform web --output-dir dist`
   - Expo optimizes for web
   - Outputs to `/dist` folder
4. **Deploys dist folder** to CDN
5. **Site goes live!**

### Expected Build Time
- First build: ~3-5 minutes
- Subsequent builds: ~2-3 minutes

---

## ⚡ Optimization Features

### Already Configured

✅ **Asset Optimization**
- Images automatically optimized
- JS/CSS minified and bundled
- Tree-shaking removes unused code

✅ **Caching Strategy**
- Static assets: 1 year cache
- HTML: No cache (always fresh)
- Service worker: No cache

✅ **Security Headers**
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection enabled
- Strict Referrer-Policy

✅ **SPA Routing**
- All routes redirect to index.html
- Expo Router handles client-side navigation

---

## 🐛 Troubleshooting

### Build Fails

**Error: "Command failed: npm run build:web"**
- **Solution**: Check build works locally first
  ```bash
  npm run build:web
  ```
- **Check**: All dependencies installed
- **Check**: No TypeScript errors

**Error: "Module not found"**
- **Solution**: Clear cache and rebuild
  - In Netlify Dashboard: Site settings → Build & deploy → Clear cache

**Error: "Out of memory"**
- **Solution**: Contact Netlify support (usually free tier is enough)

### Site Loads But Features Don't Work

**Gestures not working**
- **Check**: react-native-gesture-handler is in dependencies ✅
- **Solution**: Usually works fine in web build

**Animations not smooth**
- **Check**: react-native-reanimated is installed ✅
- **Note**: Web animations may differ slightly from native

**Audio not playing**
- **Check**: Browser permissions
- **Note**: Web Audio API has limitations

---

## 📈 Monitoring

### Netlify Analytics
- Go to Site Overview → Analytics
- View:
  - Page views
  - Unique visitors
  - Top pages
  - Bandwidth usage

### Build Logs
- Go to Deploys tab
- Click any deploy
- View full build log

---

## 🔐 Environment Variables (Future Use)

If you need to add API keys or secrets later:

1. **In Netlify Dashboard:**
   - Site settings → Build & deploy → Environment variables
   - Click "Add a variable"
   - Add key-value pairs

2. **Access in code:**
   ```javascript
   const apiKey = process.env.REACT_APP_API_KEY;
   ```

3. **Never commit secrets to Git!**

---

## 🎯 Performance Tips

### Current Performance
- ✅ Lighthouse score should be 90+
- ✅ First Contentful Paint: <2s
- ✅ Time to Interactive: <3s

### Future Optimizations
- Add service worker for offline support
- Implement code splitting
- Add image lazy loading
- Use Netlify Edge Functions for dynamic content

---

## 📝 Deployment Checklist

Before going live:

- [ ] Test build locally (`npm run build:web`)
- [ ] Verify all features work in production build
- [ ] Test on multiple browsers (Chrome, Safari, Firefox)
- [ ] Test on mobile devices
- [ ] Set up custom domain (optional)
- [ ] Configure SSL/HTTPS (Netlify does this automatically)
- [ ] Add site to Google Search Console (optional)
- [ ] Set up form handling if needed (Netlify Forms)

---

## 🔗 Useful Links

- **Netlify Documentation:** https://docs.netlify.com/
- **Expo Web Documentation:** https://docs.expo.dev/workflow/web/
- **Your GitHub Repo:** https://github.com/ayohx/Tiny-Trails
- **Netlify Dashboard:** https://app.netlify.com/

---

## 📞 Support

**Netlify Issues:**
- Check: https://answers.netlify.com/
- Status: https://www.netlifystatus.com/

**Expo Issues:**
- Check: https://docs.expo.dev/
- Forum: https://forums.expo.dev/

---

## 🎉 Next Steps

Once deployed:

1. **Test the live site** thoroughly
2. **Share the URL** with testers
3. **Monitor analytics** to see usage
4. **Continue to Phase 2** for UI/UX improvements
5. **Push updates** - they auto-deploy!

---

**Your site will be live at a Netlify URL after deployment! 🚀**

Example: `https://tiny-trails-123456.netlify.app`

---

## Current Status

✅ All configuration files created
✅ Build script added to package.json
✅ Ready to deploy to Netlify
✅ Continuous deployment will work automatically

**Next Action:** Deploy via Netlify Dashboard or CLI!
