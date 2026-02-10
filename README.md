# RedDash - React Dashboard Application

A modern, secure dashboard application built with Next.js, featuring user authentication, role-based access control, and admin approval workflows.

## Features

- 🔐 **Secure Authentication** - NextAuth.js with credential-based login
- 👥 **Role-Based Access** - Admin and User roles with granular permissions
- ✅ **Admin Approval** - New users require admin approval before accessing the dashboard
- 🎨 **Modern UI** - Beautiful red & white theme with Tailwind CSS
- 📊 **Rich Dashboard** - Activity charts, stats widgets, and transaction tables
- 🗄️ **PostgreSQL Database** - Powered by Neon DB with Drizzle ORM

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL (Neon)
- **ORM:** Drizzle
- **Authentication:** NextAuth.js v5
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Neon DB account ([neon.tech](https://neon.tech))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/05dhanushdhanu-sketch/APPLICATION.git
cd APPLICATION/dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Add your Neon DB connection string
   - Generate a random AUTH_SECRET

4. Run database migrations:
```bash
npx drizzle-kit push
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## First User Setup

The **first user** to register will automatically be assigned the **Admin** role and be approved. Subsequent users will need admin approval.

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for Vercel deployment instructions.

## License

MIT
