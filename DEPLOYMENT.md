# 🚀 Deployment Guide - LinguaVerse

## 🌟 Option 1: Vercel (Recommended - Easiest)

### Step 1: Prepare Your Project

1. **Ensure your code is ready:**
   ```bash
   # Test build locally
   npm run build
   ```

2. **Create a `.env.production` file:**
   ```env
   # Google Gemini AI (Required for real translations)
   GEMINI_API_KEY=your_production_gemini_api_key_here
   
   # App Configuration
   NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app
   NODE_ENV=production
   ```

### Step 2: Deploy to Vercel

#### Method A: Using Vercel CLI (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy your project:**
   ```bash
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? → `Y`
   - Which scope? → Select your account
   - Link to existing project? → `N`
   - Project name? → `linguaverse-landing`
   - Directory? → `./` (current directory)
   - Override settings? → `N`

#### Method B: Using GitHub Integration

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/linguaverse-landing.git
   git push -u origin main
   ```

2. **Go to [vercel.com](https://vercel.com)**
3. **Sign up/Login with GitHub**
4. **Click "New Project"**
5. **Import your repository**
6. **Configure project settings**
7. **Deploy**

### Step 3: Configure Environment Variables

1. **Go to your Vercel dashboard**
2. **Select your project**
3. **Go to Settings → Environment Variables**
4. **Add these variables:**
   ```
   GEMINI_API_KEY = your_actual_gemini_api_key
   NEXT_PUBLIC_APP_URL = https://your-app-name.vercel.app
   NODE_ENV = production
   ```

### Step 4: Get Your Gemini API Key

1. **Visit [Google AI Studio](https://makersuite.google.com/app/apikey)**
2. **Sign in with your Google account**
3. **Click "Create API Key"**
4. **Copy the key**
5. **Add it to Vercel environment variables**

### Step 5: Test Your Deployment

1. **Visit your deployed URL** (e.g., `https://linguaverse-landing.vercel.app`)
2. **Test all features:**
   - Landing page
   - Translation functionality
   - User registration/login
   - All pages work correctly

---

## 🌐 Option 2: Netlify

### Step 1: Prepare for Netlify

1. **Create `netlify.toml`:**
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"
   
   [build.environment]
     NODE_VERSION = "18"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Push to GitHub** (same as Vercel Method B)

### Step 2: Deploy to Netlify

1. **Go to [netlify.com](https://netlify.com)**
2. **Sign up/Login with GitHub**
3. **Click "New site from Git"**
4. **Connect your repository**
5. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`
6. **Deploy site**

### Step 3: Configure Environment Variables

1. **Go to Site settings → Environment variables**
2. **Add your Gemini API key and other variables**

---

## ☁️ Option 3: Railway

### Step 1: Prepare for Railway

1. **Create `railway.json`:**
   ```json
   {
     "$schema": "https://railway.app/railway.schema.json",
     "build": {
       "builder": "NIXPACKS"
     },
     "deploy": {
       "startCommand": "npm start",
       "healthcheckPath": "/",
       "healthcheckTimeout": 100,
       "restartPolicyType": "ON_FAILURE"
     }
   }
   ```

### Step 2: Deploy to Railway

1. **Go to [railway.app](https://railway.app)**
2. **Sign up/Login with GitHub**
3. **Click "New Project"**
4. **Deploy from GitHub repo**
5. **Add environment variables in Railway dashboard**

---

## 🐳 Option 4: Docker Deployment

### Step 1: Create Dockerfile

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Step 2: Create docker-compose.yml

```yaml
version: '3.8'
services:
  linguaverse:
    build: .
    ports:
      - "3000:3000"
    environment:
      - GEMINI_API_KEY=${GEMINI_API_KEY}
      - NODE_ENV=production
    restart: unless-stopped
```

### Step 3: Deploy with Docker

```bash
# Build and run
docker-compose up -d

# Or build and push to registry
docker build -t linguaverse .
docker tag linguaverse your-registry/linguaverse:latest
docker push your-registry/linguaverse:latest
```

---

## 🔧 Pre-Deployment Checklist

### ✅ Code Quality
- [ ] All features work locally
- [ ] No console errors
- [ ] Responsive design tested
- [ ] Build succeeds (`npm run build`)

### ✅ Environment Variables
- [ ] Gemini API key ready
- [ ] Production URLs configured
- [ ] No sensitive data in code

### ✅ Performance
- [ ] Images optimized
- [ ] Bundle size reasonable
- [ ] Loading times acceptable

### ✅ Security
- [ ] API keys in environment variables
- [ ] No hardcoded secrets
- [ ] HTTPS enabled

---

## 🚨 Post-Deployment Checklist

### ✅ Functionality
- [ ] Landing page loads
- [ ] Translation works
- [ ] User registration/login works
- [ ] All pages accessible
- [ ] Mobile responsive

### ✅ Performance
- [ ] Page load times < 3 seconds
- [ ] No 404 errors
- [ ] API endpoints working

### ✅ Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Set up analytics (Google Analytics)
- [ ] Monitor API usage

---

## 📊 Recommended Hosting Comparison

| Platform | Ease | Cost | Performance | Features |
|----------|------|------|-------------|----------|
| **Vercel** | ⭐⭐⭐⭐⭐ | Free tier | Excellent | Auto-deploy, edge functions |
| **Netlify** | ⭐⭐⭐⭐ | Free tier | Good | Form handling, functions |
| **Railway** | ⭐⭐⭐ | $5/month | Good | Database included |
| **Docker** | ⭐⭐ | Varies | Excellent | Full control |

---

## 🎯 Quick Start (Vercel)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# 4. Add environment variables in dashboard
# 5. Test your live site!
```

**Your LinguaVerse app will be live in minutes!** 🌍✨ 