import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const staticFiles = [
                '/_next',
                '/static',
                '/favicon.ico',
                '/images'
            ];

            const isStaticPath = staticFiles.some(path => nextUrl.pathname.startsWith(path));
            if (isStaticPath) return true;

            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            const isOnAdmin = nextUrl.pathname.startsWith('/admin');

            if (isOnDashboard || isOnAdmin) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn && (nextUrl.pathname === '/' || nextUrl.pathname === '/login' || nextUrl.pathname === '/register')) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role;
                token.isApproved = (user as any).isApproved;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.role = token.role as string;
                session.user.id = token.id as string;
                // session.user.isApproved = token.isApproved as boolean; // Add to type definition later
            }
            return session;
        }
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
