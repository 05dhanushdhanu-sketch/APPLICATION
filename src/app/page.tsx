import Link from 'next/link';
import { auth } from '@/auth';

export default async function Home() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 border-b border-red-100 shadow-sm relative z-10">
        <div className="text-2xl font-bold text-red-600 tracking-tight">RedDash</div>
        <div className="flex gap-4">
          {session ? (
            <>
              <Link href="/dashboard" className="text-red-600 hover:text-red-800 font-medium transition-colors">
                Dashboard
              </Link>
              {session.user?.role === 'admin' && (
                <Link href="/admin" className="text-red-600 hover:text-red-800 font-medium transition-colors">
                  Admin
                </Link>
              )}
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-600 hover:text-red-600 font-medium transition-colors">
                Log In
              </Link>
              <Link href="/register" className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-full transition-colors shadow-md hover:shadow-lg">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center text-center py-20 px-4 bg-gradient-to-b from-red-50 to-white">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          Welcome to <span className="text-red-600">RedDash</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl">
          A powerful, secure, and modern dashboard solution designed to streamline your workflow.
          Experience seamless user management and real-time data visualization.
        </p>

        <Link href={session ? "/dashboard" : "/register"} className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-full text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-200">
          {session ? "Go to Dashboard" : "Get Started"}
        </Link>
      </main>

      {/* Features / Content Section */}
      <section className="py-20 px-8 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10">
          <FeatureCard
            title="Secure Authentication"
            description="Enterprise-grade security with NextAuth.js, ensuring your data remains safe and accessible only to authorized personnel."
          />
          <FeatureCard
            title="Role-Based Access"
            description="Granular control over user permissions. Admins approve users, ensuring a curated and secure environment."
          />
          <FeatureCard
            title="Modern Interface"
            description="Built with React and Tailwind CSS for a lightning-fast, responsive, and aesthetically pleasing user experience."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} RedDash Inc. All rights reserved.
      </footer>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string, description: string }) {
  return (
    <div className="p-8 bg-white rounded-2xl border border-red-50 shadow-lg hover:shadow-xl transition-shadow">
      <div className="w-12 h-12 bg-red-100 rounded-lg mb-6 flex items-center justify-center text-red-600">
        {/* Simple Icon Placeholder */}
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  )
}
