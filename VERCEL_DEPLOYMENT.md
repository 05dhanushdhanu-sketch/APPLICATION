# Vercel Deployment Guide

## Prerequisites
✅ GitHub repository pushed: https://github.com/05dhanushdhanu-sketch/APPLICATION
✅ Neon DB connection string ready
✅ All code committed and pushed

## Step-by-Step Deployment

### 1. Import Project to Vercel

1. Go to https://vercel.com/05dhanushdhanu-sketchs-projects
2. Click **"Add New..."** → **"Project"**
3. Select **"Import Git Repository"**
4. Choose: `05dhanushdhanu-sketch/APPLICATION`
5. Click **"Import"**

### 2. Configure Project Settings

**Framework Preset:** Next.js (should auto-detect)

**Root Directory:** 
- Click **"Edit"** next to Root Directory
- Select or type: `dashboard`
- This is CRITICAL - the app is in the `dashboard` folder!

**Build Settings:**
- Build Command: `npm run build` (default is fine)
- Output Directory: `.next` (default is fine)
- Install Command: `npm install` (default is fine)

### 3. Add Environment Variables

Click **"Environment Variables"** and add these:

| Name | Value |
|------|-------|
| `DATABASE_URL` | `postgresql://neondb_owner:npg_HOIrCwN1m8nf@ep-nameless-voice-aig4fki3-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require` |
| `AUTH_SECRET` | `fc831518f95c46e38708c0235b2e3271c7263543665a0453716d843825946114` |

**Important:** Make sure to select **"Production"**, **"Preview"**, and **"Development"** for both variables.

### 4. Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (2-3 minutes)
3. Vercel will show you the deployment URL

### 5. Post-Deployment

Once deployed, your app will be live at: `https://your-project-name.vercel.app`

**First Steps:**
1. Visit your live URL
2. Click "Sign Up"
3. Create the first admin account
4. Test the login flow

## Common Issues & Fixes

### Issue: "Module not found" errors
**Fix:** Make sure Root Directory is set to `dashboard`

### Issue: "Environment variables not found"
**Fix:** 
- Go to Project Settings → Environment Variables
- Verify both `DATABASE_URL` and `AUTH_SECRET` are added
- Redeploy: Deployments → ⋯ → Redeploy

### Issue: Database connection fails
**Fix:**
- Verify your Neon DB is active
- Check the connection string is correct
- Ensure SSL mode is enabled

### Issue: Authentication not working
**Fix:**
- Verify `AUTH_SECRET` is set
- Check that `NEXTAUTH_URL` is not needed (Vercel auto-configures this)

## Redeployment

To redeploy after making changes:
1. Push changes to GitHub: `git push`
2. Vercel will automatically redeploy
3. Or manually redeploy from Vercel dashboard

## Custom Domain (Optional)

To add a custom domain:
1. Go to Project Settings → Domains
2. Add your domain
3. Follow DNS configuration instructions
