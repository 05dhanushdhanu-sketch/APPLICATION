'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { db } from '@/db';
import { users } from '@/db/schema';
import { hash } from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', { ...Object.fromEntries(formData), redirectTo: '/dashboard' });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function register(
    prevState: string | undefined,
    formData: FormData,
) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password || !name) {
        return 'Please fill in all fields.';
    }

    const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
    });

    if (existingUser) {
        return 'User already exists.';
    }

    const hashedPassword = await hash(password, 10);

    // Check if this is the first user to make them admin
    const allUsers = await db.select().from(users).limit(1);
    const isFirstUser = allUsers.length === 0;

    try {
        await db.insert(users).values({
            name,
            email,
            password: hashedPassword,
            role: isFirstUser ? 'admin' : 'user',
            isApproved: isFirstUser, // First user is auto-approved
        });
    } catch (error) {
        return 'Failed to register user.';
    }

    redirect('/login');
}
