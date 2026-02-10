# Quick Vercel Deployment Guide

Since CLI deployment had network issues, follow these simple steps to deploy via the Vercel dashboard:

## Step 1: Go to Vercel
Open: https://vercel.com/05dhanushdhanu-sketchs-projects

## Step 2: Import Project
1. Click **"Add New..."** button (top right)
2. Select **"Project"**
3. Click **"Import Git Repository"**
4. Find and select: **`APPLICATION`** repository
5. Click **"Import"**

## Step 3: Configure (CRITICAL!)

### Root Directory
⚠️ **MOST IMPORTANT STEP:**
- Find "Root Directory" setting
- Click **"Edit"**
- Type: `dashboard`
- Click **"Continue"**

### Framework
- Should auto-detect as **Next.js** ✓

## Step 4: Environment Variables
Click **"Environment Variables"** and add these TWO variables:

**Variable 1:**
- Name: `DATABASE_URL`
- Value: `postgresql://neondb_owner:npg_HOIrCwN1m8nf@ep-nameless-voice-aig4fki3-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
- Select: Production, Preview, Development (all three)

**Variable 2:**
- Name: `AUTH_SECRET`
- Value: `fc831518f95c46e38708c0235b2e3271c7263543665a0453716d843825946114`
- Select: Production, Preview, Development (all three)

## Step 5: Deploy
1. Click **"Deploy"** button
2. Wait 2-3 minutes for build
3. You'll get a live URL like: `https://application-xyz.vercel.app`

## Step 6: Test Your App
1. Visit your live URL
2. Click "Sign Up"
3. Create first admin account
4. Test login → should redirect to dashboard

---

## If Deployment Fails

### Error: "Module not found"
→ Go back and verify Root Directory is set to `dashboard`

### Error: "Build failed"
→ Check the build logs in Vercel dashboard
→ Verify environment variables are set correctly

### Database Connection Error
→ Verify DATABASE_URL is copied exactly (no extra spaces)
→ Check Neon DB is active at https://console.neon.tech

---

**Need help?** Share the error message and I'll help you fix it!
