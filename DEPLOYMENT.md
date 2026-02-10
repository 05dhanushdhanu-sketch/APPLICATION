# Deployment Guide (Vercel)

## Prerequisites
- A GitHub repository with this project pushed to it.
- A Vercel account.
- A Neon DB project.

## Steps

1.  **Push to GitHub**:
    - Initialize git in the `dashboard` folder (if not already): `git init`
    - Commit all changes: `git add . && git commit -m "Initial commit"`
    - Push to your remote repository.

2.  **Import to Vercel**:
    - Go to your Vercel Dashboard.
    - Click **"Add New..."** -> **"Project"**.
    - Import your GitHub repository.

3.  **Configure Project**:
    - **Framework Preset**: Next.js
    - **Root Directory**: `dashboard` (Important! Since the app is in a specific folder).

4.  **Environment Variables**:
    Add the following environment variables in the Vercel project settings:
    - `DATABASE_URL`: Your Neon DB connection string.
    - `AUTH_SECRET`: Your generated potential secret (same as local or new one).

5.  **Deploy**:
    - Click **"Deploy"**.

## Post-Deployment
- Vercel will build and deploy your application.
- Once live, you can register the first user (Admin) at your production URL.
