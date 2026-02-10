import { auth, signOut } from '@/auth';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq, ne } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export default async function AdminPage() {
    const session = await auth();

    if (session?.user?.role !== 'admin') {
        return <div className="p-8 text-red-500">Access Denied. Admins only.</div>
    }

    const pendingUsers = await db.select().from(users).where(eq(users.isApproved, false));

    async function approveUser(userId: string) {
        'use server';
        await db.update(users).set({ isApproved: true }).where(eq(users.id, userId));
        revalidatePath('/admin');
    }

    async function deleteUser(userId: string) {
        'use server';
        await db.delete(users).where(eq(users.id, userId));
        revalidatePath('/admin');
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
            <div className="mb-8">
                <p>Welcome, Admin {session?.user?.name}!</p>
            </div>

            <h2 className="text-xl font-semibold mb-4">Pending Approvals</h2>
            {pendingUsers.length === 0 ? (
                <p className="text-gray-500">No pending users.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Name</th>
                                <th className="py-2 px-4 border-b">Email</th>
                                <th className="py-2 px-4 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingUsers.map(user => (
                                <tr key={user.id}>
                                    <td className="py-2 px-4 border-b">{user.name}</td>
                                    <td className="py-2 px-4 border-b">{user.email}</td>
                                    <td className="py-2 px-4 border-b flex gap-2">
                                        <form action={approveUser.bind(null, user.id)}>
                                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-sm">Approve</button>
                                        </form>
                                        <form action={deleteUser.bind(null, user.id)}>
                                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm">Reject</button>
                                        </form>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <form
                action={async () => {
                    'use server';
                    await signOut();
                }}
                className="mt-6"
            >
                <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                    Sign Out
                </button>
            </form>
        </div>
    );
}
