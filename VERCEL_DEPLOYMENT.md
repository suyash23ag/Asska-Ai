# Vercel Deployment Guide for ASSka AI

## 🚀 Quick Deployment Steps

### Step 1: Push to GitHub ✅
Already completed with:
```bash
git remote add origin https://github.com/suyash23ag/Asska-Ai.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel Dashboard (Recommended)

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub

2. **Import Project**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Choose `suyash23ag/Asska-Ai`

3. **Configure Project**
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Build Command**: `cd client && npm install && npm run build && cd ../backend && npm install`
   - **Output Directory**: `client/dist`
   - **Install Command**: `npm install`

4. **Environment Variables**
   Add these in Vercel dashboard:

   ```
   # Backend Variables
   PORT=3000
   MONGO_URL=your_mongodb_atlas_url
   CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   OPENAI_API_KEY=your_openai_api_key
   IMAGE_KIT_ENDPOINT=your_imagekit_endpoint
   IMAGE_KIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGE_KIT_PRIVATE_KEY=your_imagekit_private_key
   CLIENT_URL=https://your-vercel-domain.vercel.app

   # Frontend Variables
   VITE_API_URL=https://your-vercel-domain.vercel.app
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_IMAGE_KIT_ENDPOINT=your_imagekit_endpoint
   VITE_IMAGE_KIT_PUBLIC_KEY=your_imagekit_public_key
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `https://your-project.vercel.app`

#### Option B: Using Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd c:\Users\suyas\Desktop\chatgpt-clone-completed\chatgpt-clone-completed
   vercel
   ```

4. **Follow Prompts**
   - Set up and deploy: Yes
   - Which scope: Your account
   - Link to existing project: No
   - Project name: asska-ai
   - Directory: ./
   - Override settings: No

5. **Add Environment Variables**
   ```bash
   vercel env add MONGO_URL
   vercel env add OPENAI_API_KEY
   vercel env add CLERK_SECRET_KEY
   # ... add all other variables
   ```

6. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## 🔧 Post-Deployment Configuration

### 1. Update Clerk Dashboard
- Go to [clerk.com](https://clerk.com) dashboard
- Add your Vercel domain to allowed origins:
  - `https://your-project.vercel.app`
  - `https://your-project-*.vercel.app` (for preview deployments)

### 2. Update MongoDB Atlas
- Go to MongoDB Atlas dashboard
- Network Access → Add IP Address
- Allow access from anywhere: `0.0.0.0/0`
- Or add Vercel's IP ranges

### 3. Update ImageKit
- Go to ImageKit dashboard
- Add your Vercel domain to allowed origins

### 4. Test Deployment
- Visit your Vercel URL
- Test authentication
- Test chat functionality
- Test image upload
- Test image generation

## 📝 Vercel Configuration Explained

### vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/index.js",
      "use": "@vercel/node"
    },
    {
      "src": "client/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "backend/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "client/dist/$1"
    }
  ]
}
```

**Explanation:**
- **builds**: Defines how to build backend (Node.js) and frontend (static)
- **routes**: Routes `/api/*` to backend, everything else to frontend

## 🐛 Troubleshooting

### Build Fails
**Issue**: Build fails during deployment

**Solution**:
```bash
# Test build locally first
cd client
npm run build

cd ../backend
npm install
```

### Environment Variables Not Working
**Issue**: App can't connect to services

**Solution**:
- Check all environment variables are added in Vercel
- Ensure no typos in variable names
- Redeploy after adding variables

### MongoDB Connection Error
**Issue**: Can't connect to MongoDB

**Solution**:
- Check MongoDB Atlas IP whitelist
- Verify connection string is correct
- Ensure network access is configured

### Clerk Authentication Fails
**Issue**: Can't sign in

**Solution**:
- Add Vercel domain to Clerk allowed origins
- Check Clerk keys are correct
- Verify CLIENT_URL matches your Vercel domain

### API Routes Not Working
**Issue**: 404 on API calls

**Solution**:
- Check `vercel.json` routes configuration
- Ensure `VITE_API_URL` points to your Vercel domain
- Verify backend is deployed correctly

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main
```

Vercel will:
1. Detect the push
2. Build your project
3. Deploy automatically
4. Provide preview URL

## 📊 Monitoring

### Vercel Dashboard
- View deployment logs
- Monitor performance
- Check analytics
- View error logs

### Useful Commands
```bash
# View deployments
vercel ls

# View logs
vercel logs

# View domains
vercel domains ls

# Remove deployment
vercel remove [deployment-url]
```

## 🎯 Production Checklist

Before going live:

- [ ] All environment variables configured
- [ ] MongoDB Atlas IP whitelist updated
- [ ] Clerk domains configured
- [ ] ImageKit origins configured
- [ ] Test all features on Vercel URL
- [ ] Check mobile responsiveness
- [ ] Verify API endpoints work
- [ ] Test authentication flow
- [ ] Check image upload/generation
- [ ] Monitor initial deployment logs
- [ ] Set up custom domain (optional)

## 🌐 Custom Domain (Optional)

1. **Add Domain in Vercel**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Update Environment Variables**
   - Update `CLIENT_URL` to your custom domain
   - Update `VITE_API_URL` to your custom domain

3. **Update Service Configurations**
   - Update Clerk allowed origins
   - Update ImageKit allowed origins

## 💰 Pricing

**Vercel Free Tier Includes:**
- Unlimited deployments
- 100 GB bandwidth/month
- Serverless function execution
- Automatic HTTPS
- Preview deployments

**Upgrade if you need:**
- More bandwidth
- Longer function execution time
- Team collaboration
- Advanced analytics

## 📞 Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

---

**Deployment Status**: Ready to Deploy ✅
**Last Updated**: May 18, 2026
