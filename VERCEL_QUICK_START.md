# ⚡ Vercel Deployment - Quick Start (5 Minutes)

## ✅ Code Pushed to GitHub!

Your latest code is now on GitHub: https://github.com/suyash23ag/Asska-Ai

**Vercel will automatically detect the push and redeploy if already connected.**

---

## 🚀 If This is Your First Vercel Deployment

### Step 1: Go to Vercel (1 minute)
1. Open: https://vercel.com/
2. Sign in with GitHub
3. Click **"Add New..."** → **"Project"**
4. Find: **suyash23ag/Asska-Ai**
5. Click **"Import"**

---

### Step 2: Configure Build (1 minute)

Vercel will show configuration screen. Set these:

**Build Command:**
```
cd client && npm install --legacy-peer-deps && npm run build
```

**Output Directory:**
```
client/dist
```

**Root Directory:** Leave as `./`

---

### Step 3: Add Environment Variables (2 minutes)

**CRITICAL:** Add these 4 variables before clicking Deploy!

```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_bWlnaHR5LWhlcm9uLTQ3LmNsZXJrLmFjY291bnRzLmRldiQ

VITE_API_URL=https://asska-ai-1.onrender.com

VITE_IMAGE_KIT_ENDPOINT=https://ik.imagekit.io/0hvfqww6f

VITE_IMAGE_KIT_PUBLIC_KEY=public_D5AM85PP+FTLF4/pilrp81Buf8M=
```

For each variable:
- Click **"Add"** under Environment Variables
- Paste Key and Value
- Check all 3 boxes: Production, Preview, Development
- Click **"Add"**

---

### Step 4: Deploy! (1 minute)
1. Click **"Deploy"** button
2. Wait 2-3 minutes
3. You'll see "Congratulations!" 🎉
4. Click **"Visit"** to see your live site

---

## 🔧 If Vercel is Already Connected

Your push to GitHub will automatically trigger a new deployment!

### Check Deployment Status:
1. Go to: https://vercel.com/dashboard
2. Click on your project: **asska-ai**
3. Go to **"Deployments"** tab
4. Latest deployment should show "Building..." or "Ready"

### If Environment Variables Are Missing:
1. Go to **"Settings"** → **"Environment Variables"**
2. Add the 4 variables from Step 3 above
3. Go to **"Deployments"** tab
4. Click 3 dots (...) on latest deployment
5. Click **"Redeploy"**

---

## 🎯 After Deployment

### Your Live URL:
https://asska-ai-x9ca.vercel.app
(Or check Vercel dashboard for your actual URL)

### Test Your Site:
1. ✅ Open the URL - should load (not 404)
2. ✅ See Clerk login page (not white screen)
3. ✅ Sign in with Clerk
4. ✅ Dashboard loads
5. ✅ Send a message - get AI response

---

## 🐛 If Something's Wrong

### White Screen?
- Missing environment variables
- Go to Vercel Settings → Environment Variables
- Add all 4 variables from Step 3
- Redeploy

### "Something went wrong!" in chat?
- Backend not configured
- Go to: https://dashboard.render.com/
- Update `CLIENT_URL` to your Vercel URL
- Wait for Render to redeploy

### 404 Error?
- Wrong build configuration
- Check `vercel.json` exists in root
- Check output directory is `client/dist`
- Redeploy

---

## 📋 Complete Setup Checklist

```
VERCEL:
[ ] Project imported from GitHub
[ ] Build command set
[ ] Output directory set to client/dist
[ ] 4 environment variables added
[ ] Deployment successful

RENDER (Backend):
[ ] CLIENT_URL = https://asska-ai-x9ca.vercel.app
[ ] Backend redeployed
[ ] Logs show "Server running on 3000"

MONGODB:
[ ] Network Access allows 0.0.0.0/0

TESTING:
[ ] Site loads
[ ] Can sign in
[ ] Can send messages
[ ] AI responds
```

---

## 🎉 Success!

When everything works:
- ✅ Your site is live at Vercel URL
- ✅ Backend on Render responds
- ✅ MongoDB connected
- ✅ Clerk authentication works
- ✅ Chat functionality works
- ✅ Image upload works
- ✅ Image generation works

---

## 📞 Quick Links

| Service | URL |
|---------|-----|
| Vercel Dashboard | https://vercel.com/dashboard |
| Render Dashboard | https://dashboard.render.com/ |
| MongoDB Atlas | https://cloud.mongodb.com/ |
| GitHub Repo | https://github.com/suyash23ag/Asska-Ai |

---

## 💡 Pro Tip

Every time you push to GitHub, Vercel automatically redeploys!

```bash
# Make changes
git add .
git commit -m "your changes"
git push origin main

# Vercel automatically deploys! 🚀
```

---

**Your code is ready! Go to Vercel now! 🚀**

https://vercel.com/
