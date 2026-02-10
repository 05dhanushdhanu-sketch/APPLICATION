import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { db } from './db';
import { users } from './db/schema';
import { eq } from 'drizzle-orm';
import { compare } from 'bcryptjs';
import { authConfig } from './auth.config';

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    secret: process.env.AUTH_SECRET,
    trustHost: true,
    providers: [
        Credentials({
            async authorize(credentials) {
                const { email, password } = credentials ?? {};
                if (!email || !password) return null;

                const user = await db.query.users.findFirst({
                    where: eq(users.email, String(email)),
                });

                if (!user) return null;

                const passwordsMatch = await compare(String(password), user.password);

                if (passwordsMatch) return user;

                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
});
