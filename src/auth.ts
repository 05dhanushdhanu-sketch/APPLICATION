import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { db } from './db';
import { users } from './db/schema';
import { eq } from 'drizzle-orm';
import { compare } from 'bcryptjs';
import { authConfig } from './auth.config';

// Validate environment variables
if (!process.env.AUTH_SECRET) {
    throw new Error('AUTH_SECRET environment variable is not set');
}

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    secret: process.env.AUTH_SECRET,
    trustHost: true,
    debug: process.env.NODE_ENV === 'development',
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    const { email, password } = credentials ?? {};
                    if (!email || !password) {
                        console.log('Missing email or password');
                        return null;
                    }

                    const user = await db.query.users.findFirst({
                        where: eq(users.email, String(email)),
                    });

                    if (!user) {
                        console.log('User not found');
                        return null;
                    }

                    const passwordsMatch = await compare(String(password), user.password);

                    if (!passwordsMatch) {
                        console.log('Invalid password');
                        return null;
                    }

                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                        isApproved: user.isApproved,
                    };
                } catch (error) {
                    console.error('Authorization error:', error);
                    return null;
                }
            },
        }),
    ],
});
