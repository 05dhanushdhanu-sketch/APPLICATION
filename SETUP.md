# Setup Instructions

## 1. Database Setup (Neon)
1. Go to [Neon Console](https://console.neon.tech/).
2. Create a new project.
3. Copy the **Connection String** (e.g., `postgresql://...`).

## 2. Environment Variables
1. Open `dashboard/.env.local`.
2. Paste your connection string into `DATABASE_URL`.
3. Generate a random secret for `AUTH_SECRET` (e.g., using `openssl rand -base64 32` or just a long random string).

## 3. Run Migrations
In the `dashboard` directory, run:
```bash
npx drizzle-kit push
```
This will create the tables in your Neon database.

## 4. First User Setup
- The **first user** to sign up will automatically be assigned the **Admin** role and be **Approved**.
- Subsequent users will be **User** role and **Unapproved** until an admin approves them.

## 5. Run the App
```bash
npm run dev
```
