# 🚀 Deployment Fix Guide

## ✅ Changes Made

### 1. Backend .env Updated
- Changed `CLIENT_URL` from `http://localhost:5173` to `https://asska-ai-x9ca.vercel.app`
- This allows CORS to accept requests from your Vercel frontend

### 2. Frontend .env Updated
- Changed `VITE_API_URL` from `http://localhost:3000` to `https://asska-ai-1.onrender.com`
- This makes frontend API calls go to your Render backend

### 3. vercel.json Fixed
- Simplified configuration to avoid build warnings
- Proper routing for SPA (Single Page Application)

---

## 🔧 Next Steps

### Step 1: Update Render Environment Variables
Go to your Render dashboard: https://dashboard.render.com/web/srv-cvrqvvbtq21c73a5rvog

Click on **Environment** tab and update:
```
CLIENT_URL=https://asska-ai-x9ca.vercel.app
```

Then click **Save Changes** - Render will automatically redeploy.

---

### Step 2: Update Vercel Environment Variables
Go to your Vercel dashboard: https://vercel.com/suyash23ags-projects/asska-ai

Click on **Settings** → **Environment Variables**

**ADD THIS NEW VARIABLE:**
```
Key: VITE_API_URL
Value: https://asska-ai-1.onrender.com
Environments: Production, Preview, Development (check all)
```

**VERIFY THESE EXISTING VARIABLES ARE SET:**
```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_bWlnaHR5LWhlcm9uLTQ3LmNsZXJrLmFjY291bnRzLmRldiQ
VITE_IMAGE_KIT_ENDPOINT=https://ik.imagekit.io/0hvfqww6f
VITE_IMAGE_KIT_PUBLIC_KEY=public_D5AM85PP+FTLF4/pilrp81Buf8M=
```

---

### Step 3: Push Changes to GitHub
```bash
git add .
git commit -m "fix: update deployment configuration for production"
git push origin main
```

This will trigger automatic redeployment on Vercel.

---

### Step 4: Configure External Services

#### A. MongoDB Atlas
1. Go to: https://cloud.mongodb.com/
2. Click on **Network Access** (left sidebar)
3. Click **Add IP Address**
4. Click **Allow Access from Anywhere** (0.0.0.0/0)
5. Click **Confirm**

#### B. Clerk Dashboard
1. Go to: https://dashboard.clerk.com/
2. Select your application
3. Go to **Domains** section
4. Add these domains:
   - `https://asska-ai-x9ca.vercel.app`
   - `https://asska-ai-1.onrender.com`

#### C. ImageKit Dashboard
1. Go to: https://imagekit.io/dashboard/
2. Go to **Settings** → **URL Endpoints**
3. Add allowed origins:
   - `https://asska-ai-x9ca.vercel.app`
   - `https://asska-ai-1.onrender.com`

---

## 🧪 Testing After Deployment

### 1. Test Backend (Render)
Open: https://asska-ai-1.onrender.com/api/upload

You should see JSON response like:
```json
{
  "token": "...",
  "expire": ...,
  "signature": "..."
}
```

### 2. Test Frontend (Vercel)
Open: https://asska-ai-x9ca.vercel.app

- Should load without white screen
- Should show Clerk sign-in
- After sign-in, dashboard should load
- Try creating a new chat
- Try sending a message

---

## 🐛 Troubleshooting

### Issue: "Something went wrong!" in chat
**Cause:** Frontend can't reach backend API

**Fix:**
1. Check browser console (F12) for errors
2. Verify `VITE_API_URL` is set in Vercel
3. Check Render logs for backend errors
4. Verify CORS is allowing Vercel domain

### Issue: White screen on Vercel
**Cause:** Clerk authentication issue

**Fix:**
1. Verify `VITE_CLERK_PUBLISHABLE_KEY` in Vercel
2. Check Clerk dashboard has correct domains
3. Clear browser cache and try again

### Issue: Images not uploading
**Cause:** ImageKit CORS or authentication issue

**Fix:**
1. Verify ImageKit keys in both Vercel and Render
2. Check ImageKit dashboard for allowed origins
3. Check browser console for specific error

### Issue: Backend shows "ENOENT: no such file"
**Cause:** Backend trying to serve static files (already fixed)

**Fix:** Already removed static file serving code from backend/index.js

---

## 📊 Deployment Status Checklist

- [x] Backend deployed on Render
- [x] Frontend deployed on Vercel
- [x] Local .env files updated
- [ ] Render environment variables updated
- [ ] Vercel environment variables updated
- [ ] Changes pushed to GitHub
- [ ] MongoDB Atlas IP whitelist configured
- [ ] Clerk domains configured
- [ ] ImageKit origins configured
- [ ] Backend API tested
- [ ] Frontend tested
- [ ] Chat functionality tested

---

## 🎯 Expected Result

After completing all steps:
1. ✅ Frontend loads at https://asska-ai-x9ca.vercel.app
2. ✅ Clerk authentication works
3. ✅ Dashboard loads with chat list
4. ✅ Can create new chats
5. ✅ Can send messages and get AI responses
6. ✅ Can upload images
7. ✅ Can generate images with DALL-E
8. ✅ Can delete chats

---

## 📝 Important Notes

1. **Render Free Tier:** Backend may sleep after 15 minutes of inactivity. First request after sleep takes 30-60 seconds.

2. **Environment Variables:** Changes to environment variables in Vercel/Render require redeployment.

3. **Local Development:** To run locally again, create `.env.local` files with localhost URLs.

4. **Git Ignore:** `.env` files are in `.gitignore` - environment variables must be set manually in Vercel/Render dashboards.

---

## 🆘 Still Having Issues?

Check these logs:
1. **Vercel Logs:** https://vercel.com/suyash23ags-projects/asska-ai/deployments
2. **Render Logs:** https://dashboard.render.com/web/srv-cvrqvvbtq21c73a5rvog/logs
3. **Browser Console:** Press F12 in browser and check Console tab
