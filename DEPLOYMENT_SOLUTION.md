# 🚀 Deployment Solution - Local & Production

## 🎯 The Problem

You need **different URLs** for local development vs production:
- **Local:** Frontend at `localhost:5173`, Backend at `localhost:3000`
- **Production:** Frontend at Vercel, Backend at Render

## ✅ The Solution

**DON'T commit `.env` files to git!** Instead:
1. Keep `.env` files with localhost URLs for local development
2. Set production URLs directly in Vercel and Render dashboards
3. `.env` files are already in `.gitignore` so they won't be pushed

---

## 📝 Current Setup (Correct!)

### Local Development (.env files - NOT in git)

**client/.env** (localhost):
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_bWlnaHR5LWhlcm9uLTQ3LmNsZXJrLmFjY291bnRzLmRldiQ
VITE_API_URL=http://localhost:3000
VITE_IMAGE_KIT_ENDPOINT=https://ik.imagekit.io/0hvfqww6f
VITE_IMAGE_KIT_PUBLIC_KEY=public_D5AM85PP+FTLF4/pilrp81Buf8M=
VITE_GEMINI_PUBLIC_KEY=AIzaSyBI20XGVMVDFsHDpLrLaOiUkNYIVbr7p_g
```

**backend/.env** (localhost):
```env
PORT=3000
CLIENT_URL=http://localhost:5173
MONGO_URL=mongodb+srv://backend:QtDYC554RNnlURAM@cluster0.ix5qlgi.mongodb.net/hello
IMAGE_KIT_ENDPOINT=https://ik.imagekit.io/0hvfqww6f
IMAGE_KIT_PUBLIC_KEY=public_D5AM85PP+FTLF4/pilrp81Buf8M=
IMAGE_KIT_PRIVATE_KEY=private_Qa8zPtRdbyje7ZXvdtURjv7vfNk=
CLERK_SECRET_KEY=sk_test_unbnaG72lyEfiKmnqBctB8zx3gFLdw7B4kcyBgs7kf
CLERK_PUBLISHABLE_KEY=pk_test_bWlnaHR5LWhlcm9uLTQ3LmNsZXJrLmFjY291bnRzLmRldiQ
OPENAI_API_KEY=your_openai_api_key_hereRVYz3D1XHmXzs1cIi9g36aU4Ff_r8gPtyvJ2AtLsyvH0qT3BlbkFJ92iC58KBXDZyFfKGjQm-GnviPSkBakn8hnTMg3KZJUJFsHhIJJP_1DRxwuoObCcqI_-fvTVpEA
```

---

## 🌐 Vercel Configuration (Production)

### Step 1: Go to Vercel Dashboard
https://vercel.com/dashboard

### Step 2: Select Your Project
Click on: **asska-ai** (or your project name)

### Step 3: Go to Settings → Environment Variables

### Step 4: Add These Variables

**IMPORTANT:** Add these with production URLs, NOT localhost!

#### Variable 1: VITE_CLERK_PUBLISHABLE_KEY
```
Key: VITE_CLERK_PUBLISHABLE_KEY
Value: pk_test_bWlnaHR5LWhlcm9uLTQ3LmNsZXJrLmFjY291bnRzLmRldiQ
Environments: ✅ Production ✅ Preview ✅ Development
```

#### Variable 2: VITE_API_URL (PRODUCTION URL!)
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

#### Variable 5: VITE_GEMINI_PUBLIC_KEY (Optional)
```
Key: VITE_GEMINI_PUBLIC_KEY
Value: AIzaSyBI20XGVMVDFsHDpLrLaOiUkNYIVbr7p_g
Environments: ✅ Production ✅ Preview ✅ Development
```

### Step 5: Redeploy
1. Go to **Deployments** tab
2. Click 3 dots (...) on latest deployment
3. Click **"Redeploy"**
4. Wait 2-3 minutes

---

## 🔧 Render Configuration (Production Backend)

### Step 1: Go to Render Dashboard
https://dashboard.render.com/

### Step 2: Select Your Service
Click on: **asska-ai-1**

### Step 3: Go to Environment Tab

### Step 4: Update These Variables

**IMPORTANT:** Use production URLs, NOT localhost!

```
PORT=3000

CLIENT_URL=https://asska-ai-x9ca.vercel.app

MONGO_URL=mongodb+srv://backend:QtDYC554RNnlURAM@cluster0.ix5qlgi.mongodb.net/hello

IMAGE_KIT_ENDPOINT=https://ik.imagekit.io/0hvfqww6f

IMAGE_KIT_PUBLIC_KEY=public_D5AM85PP+FTLF4/pilrp81Buf8M=

IMAGE_KIT_PRIVATE_KEY=private_Qa8zPtRdbyje7ZXvdtURjv7vfNk=

CLERK_SECRET_KEY=sk_test_unbnaG72lyEfiKmnqBctB8zx3gFLdw7B4kcyBgs7kf

CLERK_PUBLISHABLE_KEY=pk_test_bWlnaHR5LWhlcm9uLTQ3LmNsZXJrLmFjY291bnRzLmRldiQ

OPENAI_API_KEY=your_openai_api_key_hereRVYz3D1XHmXzs1cIi9g36aU4Ff_r8gPtyvJ2AtLsyvH0qT3BlbkFJ92iC58KBXDZyFfKGjQm-GnviPSkBakn8hnTMg3KZJUJFsHhIJJP_1DRxwuoObCcqI_-fvTVpEA
```

### Step 5: Save Changes
Render will automatically redeploy (2-3 minutes)

---

## 📊 How It Works

### Local Development:
1. You run `npm run dev` in both folders
2. Vite reads from `client/.env` file → uses `http://localhost:3000`
3. Backend reads from `backend/.env` file → allows `http://localhost:5173`
4. Everything works locally! ✅

### Production Deployment:
1. You push code to GitHub (`.env` files are NOT pushed - they're in `.gitignore`)
2. Vercel builds your frontend
3. Vercel uses environment variables from dashboard → uses `https://asska-ai-1.onrender.com`
4. Render uses environment variables from dashboard → allows `https://asska-ai-x9ca.vercel.app`
5. Everything works in production! ✅

---

## 🔄 Workflow

### When Working Locally:
```bash
# Your .env files have localhost URLs
# Just run the servers
cd backend
npm run dev

cd ../client
npm run dev

# Test at http://localhost:5173
```

### When Deploying:
```bash
# Make your code changes
git add .
git commit -m "your changes"
git push origin main

# Vercel automatically deploys with production URLs from dashboard
# No need to change .env files!
```

---

## ✅ Verification Checklist

### Local Development Working:
- [ ] `client/.env` has `VITE_API_URL=http://localhost:3000`
- [ ] `backend/.env` has `CLIENT_URL=http://localhost:5173`
- [ ] Both servers running
- [ ] Can chat at http://localhost:5173
- [ ] No CORS errors

### Production Deployment Working:
- [ ] Vercel has `VITE_API_URL=https://asska-ai-1.onrender.com`
- [ ] Render has `CLIENT_URL=https://asska-ai-x9ca.vercel.app`
- [ ] Both deployed and running
- [ ] Can chat at https://asska-ai-x9ca.vercel.app
- [ ] No CORS errors

---

## 🐛 Troubleshooting

### Issue: Local works but Vercel doesn't
**Cause:** Environment variables not set in Vercel dashboard

**Fix:**
1. Go to Vercel → Settings → Environment Variables
2. Make sure `VITE_API_URL=https://asska-ai-1.onrender.com` is set
3. Redeploy

### Issue: Vercel works but local doesn't
**Cause:** Local `.env` files have production URLs

**Fix:**
1. Update `client/.env` to `VITE_API_URL=http://localhost:3000`
2. Update `backend/.env` to `CLIENT_URL=http://localhost:5173`
3. Restart both servers

### Issue: CORS error on Vercel
**Cause:** Render backend doesn't allow Vercel domain

**Fix:**
1. Go to Render → Environment
2. Update `CLIENT_URL=https://asska-ai-x9ca.vercel.app`
3. Save (auto-redeploys)

### Issue: Changes not reflecting on Vercel
**Cause:** Need to redeploy

**Fix:**
1. Go to Vercel → Deployments
2. Click 3 dots → Redeploy
3. Or push new commit to GitHub

---

## 📝 Important Notes

1. **NEVER commit `.env` files** - they're in `.gitignore` for a reason
2. **Keep localhost URLs in local `.env` files** - for development
3. **Set production URLs in dashboards** - Vercel and Render
4. **`.env.example` files** - committed to git as templates (no real keys)
5. **Environment variables in dashboards override `.env` files** in production

---

## 🎯 Summary

| Environment | Frontend URL | Backend URL | Where Configured |
|-------------|-------------|-------------|------------------|
| **Local** | http://localhost:5173 | http://localhost:3000 | `.env` files (not in git) |
| **Production** | https://asska-ai-x9ca.vercel.app | https://asska-ai-1.onrender.com | Vercel/Render dashboards |

**The key:** Local `.env` files stay with localhost URLs. Production uses dashboard environment variables.

---

## ✅ Current Status

- ✅ Local `.env` files configured for localhost
- ✅ `.env` files in `.gitignore` (won't be pushed)
- ✅ `.env.example` files created (safe to commit)
- ✅ Both servers running locally
- ⏳ **Next:** Set production URLs in Vercel/Render dashboards

---

## 🚀 Deploy Now!

### Step 1: Commit Example Files
```bash
git add .env.example backend/.env.example client/.env.example
git commit -m "docs: add .env.example files for deployment"
git push origin main
```

### Step 2: Configure Vercel
Follow "Vercel Configuration" section above

### Step 3: Configure Render
Follow "Render Configuration" section above

### Step 4: Test Production
Open: https://asska-ai-x9ca.vercel.app

**Done! Both local and production will work! 🎉**
