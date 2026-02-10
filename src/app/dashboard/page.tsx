import { auth, signOut } from '@/auth';
import Link from 'next/link';
import { Activity, BarChart3, Bell, Home, Settings, User, Shield } from 'lucide-react';

export default async function DashboardPage() {
    const session = await auth();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Top Navigation Bar */}
            <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-2">
                    <div className="bg-red-600 p-2 rounded-lg text-white">
                        <BarChart3 size={24} />
                    </div>
                    <span className="text-xl font-bold text-gray-800">RedDash Panel</span>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-gray-600 hover:text-red-600 flex items-center gap-2 font-medium transition-colors">
                        <Home size={18} />
                        Home
                    </Link>
                    <form
                        action={async () => {
                            'use server';
                            await signOut();
                        }}
                    >
                        <button className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
                            Sign Out
                        </button>
                    </form>
                </div>
            </nav>

            <div className="flex-1 p-8 max-w-7xl mx-auto w-full">
                {/* Welcome Section */}
                <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                        <p className="text-gray-500 mt-1">Here is what's happening with your account today.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 font-medium py-2 px-4 rounded-lg shadow-sm flex items-center gap-2">
                            <Settings size={16} />
                            Settings
                        </button>
                        <button className="bg-red-600 text-white hover:bg-red-700 font-medium py-2 px-4 rounded-lg shadow-md flex items-center gap-2">
                            <Activity size={16} />
                            View Reports
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard
                        title="Account Status"
                        value="Active"
                        icon={<Shield className="text-green-600" size={24} />}
                        trend="Verified"
                        trendColor="text-green-600"
                        bgColor="bg-green-50"
                    />
                    <StatCard
                        title="Role"
                        value={session?.user?.role || 'User'}
                        icon={<User className="text-blue-600" size={24} />}
                        trend="Permanent"
                        trendColor="text-blue-600"
                        bgColor="bg-blue-50"
                    />
                    <StatCard
                        title="Notifications"
                        value="3 New"
                        icon={<Bell className="text-red-600" size={24} />}
                        trend="+2 since yesterday"
                        trendColor="text-red-600"
                        bgColor="bg-red-50"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Chart Placeholder */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">User Activity</h3>
                            <div className="h-64 bg-gray-50 rounded-xl flex items-end justify-between p-4 px-8 pb-0 gap-2">
                                {/* Fake Chart Bars */}
                                {[30, 45, 25, 60, 75, 50, 80].map((h, i) => (
                                    <div key={i} className="w-full bg-red-200 rounded-t-lg hover:bg-red-300 transition-colors relative group" style={{ height: `${h}%` }}>
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                            {h}%
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-2 text-xs text-gray-400">
                                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                            </div>
                        </div>

                        {/* Recent Activity Table */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Transactions</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 rounded-l-lg">Transaction</th>
                                            <th className="px-4 py-3">Date</th>
                                            <th className="px-4 py-3">Amount</th>
                                            <th className="px-4 py-3 rounded-r-lg">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3 font-medium text-gray-900">Subscription Renewal</td>
                                            <td className="px-4 py-3 text-gray-500">Today, 10:23 AM</td>
                                            <td className="px-4 py-3 text-gray-900">$29.00</td>
                                            <td className="px-4 py-3"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">Completed</span></td>
                                        </tr>
                                        <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3 font-medium text-gray-900">New Feature Unlocked</td>
                                            <td className="px-4 py-3 text-gray-500">Yesterday</td>
                                            <td className="px-4 py-3 text-gray-900">-</td>
                                            <td className="px-4 py-3"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">Update</span></td>
                                        </tr>
                                        <tr className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3 font-medium text-gray-900">Account Verified</td>
                                            <td className="px-4 py-3 text-gray-500">Feb 10, 2026</td>
                                            <td className="px-4 py-3 text-gray-900">-</td>
                                            <td className="px-4 py-3"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">Success</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Profile Section */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-3xl mb-4">
                                    {session?.user?.name?.[0] || 'U'}
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">{session?.user?.name || 'User Name'}</h2>
                                <p className="text-sm text-gray-500 mb-4">{session?.user?.email}</p>
                                <button className="w-full bg-red-50 text-red-600 hover:bg-red-100 font-semibold py-2 px-4 rounded-lg transition-colors">
                                    Edit Profile
                                </button>
                            </div>
                            <div className="mt-6 space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Member Since</span>
                                    <span className="font-semibold text-gray-800">Feb 2026</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Plan</span>
                                    <span className="font-semibold text-gray-800">Pro Team</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-2xl p-6 text-white shadow-lg">
                            <h3 className="font-bold text-lg mb-2">Pro Tip</h3>
                            <p className="text-red-100 text-sm mb-4">
                                Did you know you can customize your dashboard layout? Go to settings to explore new themes!
                            </p>
                            <button className="bg-white/20 hover:bg-white/30 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors w-full">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon, trend, trendColor, bgColor }: any) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
                </div>
                <div className={`p-2 rounded-lg ${bgColor}`}>
                    {icon}
                </div>
            </div>
            <p className={`text-xs font-medium ${trendColor}`}>
                {trend}
            </p>
        </div>
    )
}
