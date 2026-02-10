# FIX: Vercel Build Error - Missing Environment Variables

## The Problem
Your build failed because the environment variables (`DATABASE_URL` and `AUTH_SECRET`) were not added to Vercel.

## The Solution (Takes 2 minutes)

### Step 1: Go to Project Settings
1. In your Vercel dashboard, find your deployed project
2. Click on the project name
3. Click **"Settings"** tab (top navigation)

### Step 2: Add Environment Variables
1. In the left sidebar, click **"Environment Variables"**
2. Add the first variable:
   - **Key:** `DATABASE_URL`
   - **Value:** `postgresql://neondb_owner:npg_HOIrCwN1m8nf@ep-nameless-voice-aig4fki3-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
   - **Environments:** Check all three boxes (Production, Preview, Development)
   - Click **"Save"**

3. Add the second variable:
   - **Key:** `AUTH_SECRET`
   - **Value:** `fc831518f95c46e38708c0235b2e3271c7263543665a0453716d843825946114`
   - **Environments:** Check all three boxes (Production, Preview, Development)
   - Click **"Save"**

### Step 3: Redeploy
1. Go to **"Deployments"** tab
2. Find the latest (failed) deployment
3. Click the **three dots (⋯)** on the right
4. Click **"Redeploy"**
5. Confirm by clicking **"Redeploy"** again

### Step 4: Wait for Success
- The build will take 2-3 minutes
- You'll see a green checkmark when it's done
- Click on the deployment to get your live URL

---

## Quick Copy-Paste Values

**DATABASE_URL:**
```
postgresql://neondb_owner:npg_HOIrCwN1m8nf@ep-nameless-voice-aig4fki3-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

**AUTH_SECRET:**
```
fc831518f95c46e38708c0235b2e3271c7263543665a0453716d843825946114
```

---

## Visual Guide

**Where to find Environment Variables:**
```
Project → Settings → Environment Variables (left sidebar)
```

**What it should look like when done:**
- DATABASE_URL ✓ (Production, Preview, Development)
- AUTH_SECRET ✓ (Production, Preview, Development)

---

Once you've added the variables and redeployed, the build will succeed and your app will be live!
