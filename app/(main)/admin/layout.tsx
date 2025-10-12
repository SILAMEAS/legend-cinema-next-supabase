import type React from "react"
import {Film, ImageIcon, LayoutDashboard, LogOut, MapPin, Settings, Tag, UtensilsCrossed} from "lucide-react"
import Link from "next/link"
import {EnumPage} from "@/utils/enum/EnumPage";

export default function AdminLayout({
                                        children,
                                    }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="flex h-screen bg-gray-950">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white flex flex-col border-r border-gray-800">
                <div className="p-6 border-b border-gray-800">
                    <h1 className="text-2xl font-bold text-red-600">LEGEND</h1>
                    <p className="text-sm text-gray-400">Admin Panel</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link
                        href={EnumPage.ADMIN}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        <LayoutDashboard className="w-5 h-5"/>
                        <span>Dashboard</span>
                    </Link>

                    <Link
                        href={EnumPage.ADMIN_MOVIES}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        <Film className="w-5 h-5"/>
                        <span>Movies</span>
                    </Link>

                    <Link
                        href={EnumPage.ADMIN_BANNERS}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        <ImageIcon className="w-5 h-5"/>
                        <span>Banners</span>
                    </Link>

                    <Link
                        href={EnumPage.ADMIN_CINENMAS}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        <MapPin className="w-5 h-5"/>
                        <span>Cinemas</span>
                    </Link>

                    <Link
                        href={EnumPage.ADMIN_OFFERS}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        <Tag className="w-5 h-5"/>
                        <span>Offers</span>
                    </Link>

                    <Link
                        href={EnumPage.ADMIN_FNB}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        <UtensilsCrossed className="w-5 h-5"/>
                        <span>F&B Menu</span>
                    </Link>

                    <Link
                        href={EnumPage.ADMIN_SETTINGS}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        <Settings className="w-5 h-5"/>
                        <span>Settings</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <button
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors w-full text-left">
                        <LogOut className="w-5 h-5"/>
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="bg-gray-900 border-b border-gray-800 px-8 py-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold text-white">Admin Dashboard</h2>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-400">Welcome, Admin</span>
                            <div
                                className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-semibold">
                                A
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 bg-gray-950">{children}</div>
            </main>
        </div>
    )
}
