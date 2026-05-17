# 🚨 URGENT: Fix Vercel "Something went wrong!" Error

## 🔴 The Problem

Your Vercel deployment shows "Something went wrong!" because:
- Environment variable `VITE_API_URL` is NOT set in Vercel
- OR it's set to `localhost` instead of Render URL

## ✅ The Solution (5 Minutes)

### Step 1: Go to Vercel Dashboard
**Click here:** https://vercel.com/dashboard

### Step 2: Find Your Project
Look for: **asska-ai** or **Asska-Ai**
Click on it

### Step 3: Go to Settings
Click **"Settings"** at the top navigation

### Step 4: Click Environment Variables
On the left sidebar, click **"Environment Variables"**

### Step 5: Check if VITE_API_URL Exists

#### If VITE_API_URL EXISTS:
1. Click the **3 dots (...)** next to it
2. Click **"Edit"**
3. Change value to: `https://asska-ai-1.onrender.com`
4. Make sure all 3 environments are checked:
   - ✅ Production
   - ✅ Preview  
   - ✅ Development
5. Click **"Save"**

#### If VITE_API_URL DOES NOT EXIST:
1. Click **"Add New"** button
2. Fill in:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://asska-ai-1.onrender.com`
   - **Environments:** Check all 3 boxes
3. Click **"Save"**

### Step 6: Add Other Required Variables

Make sure these 4 variables exist:

#### 1. VITE_CLERK_PUBLISHABLE_KEY
```
Value: pk_test_bWlnaHR5LWhlcm9uLTQ3LmNsZXJrLmFjY291bnRzLmRldiQ
```

#### 2. VITE_API_URL
```
Value: https://asska-ai-1.onrender.com
```

#### 3. VITE_IMAGE_KIT_ENDPOINT
```
Value: https://ik.imagekit.io/0hvfqww6f
```

#### 4. VITE_IMAGE_KIT_PUBLIC_KEY
```
Value: public_D5AM85PP+FTLF4/pilrp81Buf8M=
```

### Step 7: Redeploy

1. Go to **"Deployments"** tab (top navigation)
2. Find the latest deployment (top of the list)
3. Click the **3 dots (...)** on the right
4. Click **"Redeploy"**
5. Click **"Redeploy"** again to confirm
6. Wait 2-3 minutes

---

## 🧪 Test After Redeployment

### Step 1: Open Your Site
Go to: https://asska-ai-x9ca.vercel.app

### Step 2: Check Dashboard
- Should NOT show "Something went wrong!"
- Should show "No chats yet" or your existing chats

### Step 3: Create a Chat
1. Type a message in the input box
2. Press Enter
3. Wait 30-60 seconds (Render cold start)
4. Should get AI response! ✅

---

## 🐛 If Still Not Working

### Check 1: Verify Environment Variables
1. Go to Vercel → Settings → Environment Variables
2. Make sure `VITE_API_URL=https://asska-ai-1.onrender.com`
3. Make sure it's checked for Production

### Check 2: Check Render Backend
1. Go to: https://dashboard.render.com/
2. Find: **asska-ai-1**
3. Check it's running (green status)
4. Go to **Environment** tab
5. Make sure `CLIENT_URL=https://asska-ai-x9ca.vercel.app`

### Check 3: Test Backend Directly
Open: https://asska-ai-1.onrender.com/api/upload

Should see JSON response (not error page)

### Check 4: Check Browser Console
1. Open your Vercel site
2. Press **F12** to open developer tools
3. Go to **Console** tab
4. Look for errors
5. Common errors:
   - `Failed to fetch` → VITE_API_URL not set
   - `CORS error` → Render CLIENT_URL wrong
   - `401 Unauthorized` → Clerk issue

---

## 📋 Quick Checklist

```
VERCEL ENVIRONMENT VARIABLES:
[ ] VITE_CLERK_PUBLISHABLE_KEY exists
[ ] VITE_API_URL = https://asska-ai-1.onrender.com
[ ] VITE_IMAGE_KIT_ENDPOINT exists
[ ] VITE_IMAGE_KIT_PUBLIC_KEY exists
[ ] All variables checked for Production
[ ] Redeployed after adding variables

RENDER ENVIRONMENT VARIABLES:
[ ] CLIENT_URL = https://asska-ai-x9ca.vercel.app
[ ] Backend is running (green status)
[ ] Can access /api/upload endpoint

TESTING:
[ ] Site loads without errors
[ ] Dashboard shows chats or "No chats yet"
[ ] Can create new chat
[ ] Can send message and get response
```

---

## 🎯 Most Common Issue

**Problem:** Forgot to set `VITE_API_URL` in Vercel

**Solution:** 
1. Vercel → Settings → Environment Variables
2. Add: `VITE_API_URL=https://asska-ai-1.onrender.com`
3. Redeploy

---

## 💡 Why This Happens

Vite environment variables (starting with `VITE_`) are:
- **Embedded at build time** (not runtime)
- Must be set in Vercel dashboard
- Require redeployment after changes

Your local `.env` file is NOT used by Vercel!

---

## ✅ Expected Result

After fixing:
- ✅ No "Something went wrong!" error
- ✅ Dashboard loads properly
- ✅ Can see chat list
- ✅ Can create and send messages
- ✅ AI responds (may take 30-60s first time)

---

## 🚀 DO THIS NOW!

1. **Go to Vercel:** https://vercel.com/dashboard
2. **Add/Update:** `VITE_API_URL=https://asska-ai-1.onrender.com`
3. **Redeploy**
4. **Wait 2-3 minutes**
5. **Test:** https://asska-ai-x9ca.vercel.app

**It will work! 🎉**
