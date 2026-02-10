'use client';

import { useActionState, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { register } from '@/app/lib/actions';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
    const [errorMessage, dispatch] = useActionState(register, undefined);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-red-50">
            <div className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-xl border border-red-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-red-600">Create Account</h1>
                    <p className="text-gray-500 mt-2">Join us to get started</p>
                </div>

                <form action={dispatch} className="space-y-5">
                    <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="name">
                            Full Name
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-3 transition-colors"
                            id="name"
                            type="text"
                            name="name"
                            placeholder="John Doe"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-3 transition-colors"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="user@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-3 pr-10 transition-colors"
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="••••••••"
                                required
                                minLength={6}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-red-500 focus:outline-none"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                    <Eye className="h-5 w-5" aria-hidden="true" />
                                )}
                            </button>
                        </div>
                    </div>
                    <RegisterButton />
                    <div
                        className="flex h-8 items-end space-x-1"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {errorMessage && (
                            <p className="text-sm text-red-500 font-medium">{errorMessage}</p>
                        )}
                    </div>
                </form>
                <p className="mt-8 text-center text-sm text-gray-600">
                    Already have an account? <Link href="/login" className="text-red-600 hover:text-red-700 font-semibold hover:underline">Log in</Link>
                </p>
            </div>
        </main>
    );
}

function RegisterButton() {
    const { pending } = useFormStatus();

    return (
        <button
            className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-200 font-bold rounded-lg text-sm px-5 py-3 transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            aria-disabled={pending}
            disabled={pending}
        >
            {pending ? 'Signing Up...' : 'Sign Up'}
        </button>
    );
}
