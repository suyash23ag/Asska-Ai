# 🚀 Vercel Deployment - Complete Setup Guide

## 📋 Prerequisites Checklist

Before deploying to Vercel, ensure you have:
- ✅ GitHub repository: https://github.com/suyash23ag/Asska-Ai
- ✅ Vercel account (sign up at https://vercel.com)
- ✅ Backend deployed on Render: https://asska-ai-1.onrender.com
- ✅ All environment variables ready

---

## 🎯 Step-by-Step Vercel Deployment

### Step 1: Push Latest Code to GitHub

```bash
git add .
git commit -m "chore: prepare for Vercel deployment with production configs"
git push origin main
```

---

### Step 2: Import Project to Vercel

1. Go to: https://vercel.com/
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Find and select: **suyash23ag/Asska-Ai**
5. Click **"Import"**

---

### Step 3: Configure Build Settings

Vercel will auto-detect settings, but verify:

**Framework Preset:** Vite
**Root Directory:** `./` (leave as is)
**Build Command:** `cd client && npm install --legacy-peer-deps && npm run build`
**Output Directory:** `client/dist`
**Install Command:** `npm install` (or leave default)

Click **"Override"** if you need to change these settings.

---

### Step 4: Add Environment Variables

**CRITICAL:** Add these environment variables before deploying!

Click **"Environment Variables"** section and add:

#### Variable 1: VITE_CLERK_PUBLISHABLE_KEY
```
Key: VITE_CLERK_PUBLISHABLE_KEY
Value: pk_test_bWlnaHR5LWhlcm9uLTQ3LmNsZXJrLmFjY291bnRzLmRldiQ
Environments: ✅ Production ✅ Preview ✅ Development
```

#### Variable 2: VITE_API_URL
```
Key: VITE_API_URL
Value: https://asska-ai-1.onrender.com
Environments: ✅ Production ✅ Preview ✅ Development
```

#### Variable 3: VITE_IMAGE_KIT_ENDPOINT
```
Key: VITE_IMAGE_KIT_ENDPOINT
Value: https://ik.imagekit.io/0hvfqww6f
Environments: ✅ Production ✅ Preview ✅ Development
```

#### Variable 4: VITE_IMAGE_KIT_PUBLIC_KEY
```
Key: VITE_IMAGE_KIT_PUBLIC_KEY
Value: public_D5AM85PP+FTLF4/pilrp81Buf8M=
Environments: ✅ Production ✅ Preview ✅ Development
```

---

### Step 5: Deploy!

1. After adding all environment variables, click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. You'll see "Congratulations!" when done
4. Click **"Visit"** to see your live site

---

## 🔧 Post-Deployment Configuration

### A. Update Render Backend

Your backend needs to allow requests from Vercel:

1. Go to: https://dashboard.render.com/
2. Find service: **asska-ai-1**
3. Click **"Environment"** tab
4. Update `CLIENT_URL` to:
   ```
   https://asska-ai-x9ca.vercel.app
   ```
   (Or use your actual Vercel URL if different)
5. Click **"Save Changes"**
6. Wait for automatic redeploy (2-3 minutes)

---

### B. Configure MongoDB Atlas

Allow connections from anywhere (for Render):

1. Go to: https://cloud.mongodb.com/
2. Click **"Network Access"** (left sidebar)
3. Click **"Add IP Address"**
4. Click **"Allow Access from Anywhere"**
5. It will auto-fill: `0.0.0.0/0`
6. Click **"Confirm"**

---

### C. Configure Clerk (Optional but Recommended)

Add your Vercel domain to Clerk:

1. Go to: https://dashboard.clerk.com/
2. Select your application
3. Go to **"Domains"** section
4. Add domain: `https://asska-ai-x9ca.vercel.app`
5. Save changes

---

### D. Configure ImageKit (Optional but Recommended)

Add allowed origins:

1. Go to: https://imagekit.io/dashboard/
2. Go to **"Settings"** → **"URL Endpoints"**
3. Add allowed origins:
   - `https://asska-ai-x9ca.vercel.app`
   - `https://asska-ai-1.onrender.com`
4. Save changes

---

## 🧪 Testing Your Deployment

### Test 1: Check Deployment Status
Go to: https://vercel.com/dashboard

- Deployment should show **"Ready"** status
- Build logs should show no errors

### Test 2: Visit Your Site
Open: https://asska-ai-x9ca.vercel.app

Expected results:
- ✅ Page loads (not 404)
- ✅ Clerk login page appears (not white screen)
- ✅ No console errors (press F12)

### Test 3: Sign In
1. Click "Sign In" or "Sign Up"
2. Complete Clerk authentication
3. Should redirect to dashboard

### Test 4: Create Chat
1. Click "Create a new chat" or type in input
2. Send a message: "Hello, explain React hooks"
3. Wait 5-10 seconds (first Render request is slow)
4. Should receive AI response with code examples

### Test 5: Upload Image
1. Click attachment icon
2. Upload an image
3. Ask: "What's in this image?"
4. Should get AI response about the image

### Test 6: Generate Image
1. Type: "generate image of a futuristic AI robot"
2. Should receive DALL-E generated image

---

## 🐛 Troubleshooting

### Issue: 404 Not Found
**Cause:** Incorrect build configuration

**Fix:**
1. Go to Vercel project settings
2. Check `vercel.json` has correct routing
3. Verify output directory is `client/dist`
4. Redeploy

### Issue: White Screen
**Cause:** Missing environment variables or Clerk issue

**Fix:**
1. Check all 4 environment variables are set in Vercel
2. Verify `VITE_CLERK_PUBLISHABLE_KEY` is correct
3. Check browser console (F12) for specific error
4. Redeploy after adding variables

### Issue: "Something went wrong!" in chat
**Cause:** Frontend can't reach backend

**Fix:**
1. Verify `VITE_API_URL` is set to Render URL
2. Check Render backend is running (visit API endpoint)
3. Verify Render `CLIENT_URL` allows Vercel domain
4. Check CORS configuration in backend

### Issue: Build Failed - React Version Conflict
**Cause:** Clerk requires React 18, not React 19

**Fix:** Already fixed! `client/package.json` uses React 18.3.1

### Issue: Images Not Uploading
**Cause:** ImageKit CORS or authentication

**Fix:**
1. Verify ImageKit keys in Vercel environment variables
2. Check ImageKit dashboard for allowed origins
3. Check browser console for specific error

### Issue: Backend Shows "ENOENT" Error
**Cause:** Backend trying to serve static files

**Fix:** Already fixed! Removed static file serving from `backend/index.js`

---

## 📊 Deployment Checklist

Use this checklist to ensure everything is configured:

```
VERCEL SETUP:
[ ] Project imported from GitHub
[ ] Build command set correctly
[ ] Output directory set to client/dist
[ ] VITE_CLERK_PUBLISHABLE_KEY added
[ ] VITE_API_URL added (Render backend URL)
[ ] VITE_IMAGE_KIT_ENDPOINT added
[ ] VITE_IMAGE_KIT_PUBLIC_KEY added
[ ] Deployment successful (Ready status)

RENDER SETUP:
[ ] Backend deployed and running
[ ] CLIENT_URL updated to Vercel URL
[ ] All backend environment variables set
[ ] Backend logs show "Server running on 3000"
[ ] Backend logs show "Connected to MongoDB"

EXTERNAL SERVICES:
[ ] MongoDB Atlas allows 0.0.0.0/0
[ ] Clerk domain added (optional)
[ ] ImageKit origins added (optional)

TESTING:
[ ] Site loads without 404
[ ] Clerk login works
[ ] Dashboard loads after login
[ ] Can create new chat
[ ] Can send messages and get AI responses
[ ] Can upload images
[ ] Can generate images with DALL-E
[ ] Can delete chats
[ ] No console errors
```

---

## 🔄 Redeploying After Changes

### Automatic Deployment (Recommended)
1. Make changes to your code locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "your changes"
   git push origin main
   ```
3. Vercel automatically detects and redeploys
4. Wait 2-3 minutes for deployment

### Manual Deployment
1. Go to Vercel dashboard
2. Click on your project
3. Go to **"Deployments"** tab
4. Click 3 dots (...) on latest deployment
5. Click **"Redeploy"**
6. Confirm redeploy

---

## 🌐 Custom Domain (Optional)

To use your own domain:

1. Go to Vercel project settings
2. Click **"Domains"** tab
3. Click **"Add"**
4. Enter your domain (e.g., `asska-ai.com`)
5. Follow DNS configuration instructions
6. Update Clerk and ImageKit with new domain

---

## 📈 Monitoring Your Deployment

### View Logs
1. Go to Vercel dashboard
2. Click on your project
3. Click **"Deployments"** tab
4. Click on a deployment
5. View **"Build Logs"** and **"Function Logs"**

### View Analytics
1. Go to Vercel dashboard
2. Click on your project
3. Click **"Analytics"** tab
4. See visitor stats, performance metrics

### View Errors
1. Check browser console (F12) for frontend errors
2. Check Vercel function logs for API errors
3. Check Render logs for backend errors

---

## 💡 Pro Tips

1. **Environment Variables:** Changes require redeployment
2. **Build Time:** First build takes 3-5 minutes, subsequent builds are faster
3. **Preview Deployments:** Every PR gets a preview URL
4. **Rollback:** Can rollback to previous deployment instantly
5. **Edge Network:** Vercel uses global CDN for fast loading
6. **Automatic HTTPS:** SSL certificate included free
7. **Git Integration:** Push to deploy automatically

---

## 🎯 Expected URLs

| Service | URL |
|---------|-----|
| Frontend (Vercel) | https://asska-ai-x9ca.vercel.app |
| Backend (Render) | https://asska-ai-1.onrender.com |
| GitHub Repo | https://github.com/suyash23ag/Asska-Ai |

---

## 📞 Quick Commands

### Check Vercel CLI (Optional)
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy from CLI
vercel --prod
```

### Check Backend Status
```bash
curl https://asska-ai-1.onrender.com/api/upload
```

### Check Frontend Status
```bash
curl -I https://asska-ai-x9ca.vercel.app
```

---

## ✅ Success Indicators

Your deployment is successful when:

1. ✅ Vercel deployment shows "Ready" status
2. ✅ Site loads at Vercel URL
3. ✅ Clerk authentication works
4. ✅ Dashboard loads after login
5. ✅ Can create and send chat messages
6. ✅ AI responses work (may take 30-60s first time due to Render cold start)
7. ✅ Image upload works
8. ✅ Image generation works
9. ✅ No errors in browser console
10. ✅ All features from local development work in production

---

## 🚀 You're Ready to Deploy!

Follow the steps above in order, and your app will be live on Vercel in about 10 minutes!

**Start with Step 1: Push to GitHub** 👆
