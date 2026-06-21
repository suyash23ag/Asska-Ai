# ASSka AI - Deployment & Integration Guide

## 🚀 Production Deployment (Integrated Backend + Frontend)

Your application is now configured to run as a single integrated server where the backend serves both the API and the frontend static files.

---

## 📋 Prerequisites

Before deploying, ensure you have:
- Node.js 18+ installed
- MongoDB database (local or MongoDB Atlas)
- All required API keys:
  - OpenAI API Key
  - Clerk Authentication Keys
  - ImageKit Keys
  hello my name is utkarsh 
  

---

## 🔧 Environment Configuration

### Backend Environment Variables (`.env`)

Create or update `backend/.env`:

```env
# Server Configuration
PORT=3000
CLIENT_URL=http://localhost:3000

# Database
MONGO_URL=your_mongodb_connection_string

# Authentication (Clerk)
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# AI Services
OPENAI_API_KEY=your_openai_api_key

# Image Storage (ImageKit)
IMAGE_KIT_ENDPOINT=your_imagekit_endpoint
IMAGE_KIT_PUBLIC_KEY=your_imagekit_public_key
IMAGE_KIT_PRIVATE_KEY=your_imagekit_private_key
```

### Frontend Environment Variables (`.env`)

Update `client/.env` for production:

```env
# API URL (same as backend in production)
VITE_API_URL=http://localhost:3000

# Authentication (Clerk)
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

# Image Storage (ImageKit)
VITE_IMAGE_KIT_ENDPOINT=your_imagekit_endpoint
VITE_IMAGE_KIT_PUBLIC_KEY=your_imagekit_public_key
```

---

## 🏗️ Build & Deploy Steps

### Step 1: Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../client
npm install
```

### Step 2: Build Frontend for Production

```bash
cd client
npm run build
```

This creates an optimized production build in `client/dist/` folder.

**Build Output:**
- `dist/index.html` - Main HTML file
- `dist/assets/` - Optimized CSS and JavaScript bundles
- Total size: ~1.2 MB (minified)

### Step 3: Start Production Server

```bash
cd backend
npm start
```

The backend will:
1. Start Express server on port 3000
2. Connect to MongoDB
3. Serve API endpoints at `/api/*`
4. Serve frontend static files from `client/dist/`
5. Handle all routes and redirect to `index.html` for client-side routing

### Step 4: Access Application

Open your browser and navigate to:
```
http://localhost:3000
```

---

## 🌐 Production Deployment Options

### Option 1: Traditional VPS/Server Deployment

#### Using PM2 (Recommended)

```bash
# Install PM2 globally
npm install -g pm2

# Start application with PM2
cd backend
pm2 start index.js --name "asska-ai"

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup
```

**PM2 Commands:**
```bash
pm2 status              # Check status
pm2 logs asska-ai       # View logs
pm2 restart asska-ai    # Restart app
pm2 stop asska-ai       # Stop app
pm2 delete asska-ai     # Remove app
```

#### Using systemd (Linux)

Create `/etc/systemd/system/asska-ai.service`:

```ini
[Unit]
Description=ASSka AI Application
After=network.target

[Service]
Type=simple
User=your_username
WorkingDirectory=/path/to/chatgpt-clone-completed/backend
ExecStart=/usr/bin/node index.js
Restart=on-failure
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

**Commands:**
```bash
sudo systemctl start asska-ai
sudo systemctl enable asska-ai
sudo systemctl status asska-ai
```

---

### Option 2: Cloud Platform Deployment

#### Heroku

1. **Create `Procfile` in root:**
```
web: cd backend && npm start
```

2. **Deploy:**
```bash
heroku create asska-ai
heroku config:set MONGO_URL=your_mongodb_url
heroku config:set OPENAI_API_KEY=your_key
# ... set all environment variables
git push heroku main
```

#### Render

1. Create new Web Service
2. Build Command: `cd client && npm install && npm run build && cd ../backend && npm install`
3. Start Command: `cd backend && npm start`
4. Add environment variables in dashboard

#### Railway

1. Connect GitHub repository
2. Set root directory to `backend`
3. Add build command: `cd ../client && npm install && npm run build`
4. Add environment variables
5. Deploy

#### DigitalOcean App Platform

1. Create new app from GitHub
2. Configure build:
   - Build Command: `cd client && npm install && npm run build`
   - Run Command: `cd backend && npm start`
3. Add environment variables
4. Deploy

---

### Option 3: Docker Deployment

#### Create `Dockerfile` in root:

```dockerfile
# Multi-stage build
FROM node:18-alpine AS frontend-build

# Build frontend
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy backend
COPY backend/package*.json ./
RUN npm install --production
COPY backend/ ./

# Copy built frontend
COPY --from=frontend-build /app/client/dist ./client/dist

EXPOSE 3000

CMD ["node", "index.js"]
```

#### Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - MONGO_URL=${MONGO_URL}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - CLERK_PUBLISHABLE_KEY=${CLERK_PUBLISHABLE_KEY}
      - CLERK_SECRET_KEY=${CLERK_SECRET_KEY}
      - IMAGE_KIT_ENDPOINT=${IMAGE_KIT_ENDPOINT}
      - IMAGE_KIT_PUBLIC_KEY=${IMAGE_KIT_PUBLIC_KEY}
      - IMAGE_KIT_PRIVATE_KEY=${IMAGE_KIT_PRIVATE_KEY}
    depends_on:
      - mongo
    restart: unless-stopped

  mongo:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
    restart: unless-stopped

volumes:
  mongo-data:
```

**Deploy with Docker:**
```bash
docker-compose up -d
```

---

## 🔒 Security Considerations

### 1. Environment Variables
- Never commit `.env` files to version control
- Use secure secret management in production
- Rotate API keys regularly

### 2. HTTPS/SSL
- Use reverse proxy (Nginx/Apache) with SSL certificate
- Let's Encrypt for free SSL certificates
- Force HTTPS redirects

### 3. CORS Configuration
Update `backend/index.js` for production:
```javascript
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'https://yourdomain.com',
    credentials: true,
  })
);
```

### 4. Rate Limiting
Add rate limiting to prevent abuse:
```bash
npm install express-rate-limit
```

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### 5. Helmet.js for Security Headers
```bash
npm install helmet
```

```javascript
import helmet from 'helmet';
app.use(helmet());
```

---

## 🌍 Nginx Reverse Proxy Configuration

For production deployment with Nginx:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## 📊 Monitoring & Logging

### Application Monitoring

1. **PM2 Monitoring:**
```bash
pm2 monit
```

2. **Log Management:**
```bash
pm2 logs asska-ai --lines 100
```

3. **Error Tracking:**
- Integrate Sentry for error tracking
- Set up log aggregation (ELK Stack, Papertrail)

### Performance Monitoring

- Use New Relic or DataDog for APM
- Monitor MongoDB performance
- Track API response times
- Monitor OpenAI API usage and costs

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy ASSka AI

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: |
        cd client && npm install
        cd ../backend && npm install
    
    - name: Build frontend
      run: cd client && npm run build
    
    - name: Deploy to server
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.SSH_KEY }}
        script: |
          cd /path/to/app
          git pull
          cd client && npm install && npm run build
          cd ../backend && npm install
          pm2 restart asska-ai
```

---

## 🧪 Testing Before Deployment

### 1. Build Test
```bash
cd client
npm run build
```

### 2. Production Test Locally
```bash
cd backend
NODE_ENV=production npm start
```

### 3. Check All Features
- [ ] User authentication (Clerk)
- [ ] Chat creation and deletion
- [ ] AI responses (OpenAI)
- [ ] Image upload (ImageKit)
- [ ] Image generation (DALL-E 3)
- [ ] Code syntax highlighting
- [ ] Responsive design
- [ ] All routes working

---

## 📈 Scaling Considerations

### Horizontal Scaling
- Use load balancer (Nginx, HAProxy)
- Deploy multiple backend instances
- Use Redis for session management
- Implement sticky sessions

### Database Scaling
- MongoDB replica sets
- Read replicas for queries
- Sharding for large datasets
- Regular backups

### CDN Integration
- Serve static assets via CDN
- Use CloudFlare or AWS CloudFront
- Cache API responses where appropriate

---

## 🆘 Troubleshooting

### Common Issues

**1. Build Fails:**
```bash
# Clear cache and rebuild
cd client
rm -rf node_modules dist
npm install
npm run build
```

**2. Backend Can't Find Frontend:**
- Ensure `client/dist` folder exists
- Check path in `backend/index.js`
- Verify build completed successfully

**3. API Calls Fail:**
- Check `VITE_API_URL` in production
- Verify CORS configuration
- Check environment variables

**4. MongoDB Connection Issues:**
- Verify `MONGO_URL` is correct
- Check network access (MongoDB Atlas IP whitelist)
- Ensure MongoDB is running

**5. Clerk Authentication Issues:**
- Verify Clerk keys are correct
- Check domain configuration in Clerk dashboard
- Ensure cookies are enabled

---

## 📝 Maintenance Checklist

### Daily
- [ ] Monitor error logs
- [ ] Check server resources (CPU, RAM, Disk)
- [ ] Verify API response times

### Weekly
- [ ] Review MongoDB performance
- [ ] Check OpenAI API usage and costs
- [ ] Update dependencies (security patches)
- [ ] Backup database

### Monthly
- [ ] Review and rotate API keys
- [ ] Analyze user metrics
- [ ] Performance optimization
- [ ] Security audit

---

## 🎯 Performance Optimization

### Frontend
- Code splitting with dynamic imports
- Lazy load components
- Optimize images
- Enable compression (gzip/brotli)
- Use service workers for caching

### Backend
- Implement Redis caching
- Database query optimization
- Connection pooling
- Response compression
- API response caching

---

## 📞 Support & Resources

### Documentation
- [Express.js Docs](https://expressjs.com/)
- [React Docs](https://react.dev/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Clerk Docs](https://clerk.com/docs)

### Monitoring Tools
- PM2: Process management
- New Relic: APM
- Sentry: Error tracking
- MongoDB Atlas: Database monitoring

---

## ✅ Deployment Checklist

Before going live:

- [ ] All environment variables configured
- [ ] Frontend built successfully
- [ ] Backend tested locally
- [ ] Database connected and tested
- [ ] All API keys valid
- [ ] HTTPS/SSL configured
- [ ] Domain configured
- [ ] Monitoring setup
- [ ] Backup strategy in place
- [ ] Error tracking configured
- [ ] Rate limiting enabled
- [ ] Security headers configured
- [ ] CORS properly configured
- [ ] Documentation updated

---

**Last Updated:** May 18, 2026  
**Version:** 1.0.0  
**Status:** Production Ready ✅
