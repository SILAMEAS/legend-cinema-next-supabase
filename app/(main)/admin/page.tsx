"use client"
import {DollarSign, Film, MapPin, Tag, TrendingUp, Users, UtensilsCrossed} from "lucide-react"
import useFetchDataObject from "@/utils/hooks/useFetchDataObject";
import {_getDashboard} from "@/utils/api/__dashboard";
import {_tb_dashboard} from "@/utils/api/supabase_tb/_tb_dashboard";
import {getMoviesClient} from "@/utils/api/__general";

export default function AdminDashboard() {
    const stats = [
        {
            title: "Total Movies",
            value: "24",
            change: "+3 this week",
            icon: Film,
            color: "bg-blue-500",
        },
        {
            title: "Active Cinemas",
            value: "8",
            change: "All operational",
            icon: MapPin,
            color: "bg-green-500",
        },
        {
            title: "Active Offers",
            value: "12",
            change: "4 expiring soon",
            icon: Tag,
            color: "bg-purple-500",
        },
        {
            title: "Today's Revenue",
            value: "$12,450",
            change: "+15% vs yesterday",
            icon: DollarSign,
            color: "bg-yellow-500",
        },
        {
            title: "Total Bookings",
            value: "1,234",
            change: "+8% this week",
            icon: TrendingUp,
            color: "bg-red-500",
        },
        {
            title: "Active Users",
            value: "8,456",
            change: "+234 new users",
            icon: Users,
            color: "bg-indigo-500",
        },
    ]

    const recentMovies = [
        {title: "Venom: The Last Dance", status: "Now Showing", bookings: 456},
        {title: "Terrifier 3", status: "Now Showing", bookings: 389},
        {title: "Smile 2", status: "Coming Soon", bookings: 0},
        {title: "Joker: Folie à Deux", status: "Now Showing", bookings: 567},
    ]

    const {data} = useFetchDataObject<_tb_dashboard>({
        fetcher: _getDashboard
    })
    console.log("data", data);


    const FetchPagination = async () => {
        const res = await getMoviesClient({page: 1, limit: 5});
        console.table(res.data);
    }

    return (
        <div className="space-y-8">
            <button onClick={FetchPagination}>Fetch</button>
            {/* Stats Grid - Updated to dark mode */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400 mb-1">{stat.title}</p>
                                <p className="text-3xl font-bold text-white">{stat.value}</p>
                                <p className="text-sm text-gray-500 mt-2">{stat.change}</p>
                            </div>
                            <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                                <stat.icon className="w-6 h-6 text-white"/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Movies Table - Updated to dark mode */}
            <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-800">
                <div className="px-6 py-4 border-b border-gray-800">
                    <h3 className="text-lg font-semibold text-white">Recent Movies</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-800">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Movie Title
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Bookings
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-gray-900 divide-y divide-gray-800">
                        {recentMovies.map((movie, index) => (
                            <tr key={index} className="hover:bg-gray-800">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{movie.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                    <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            movie.status === "Now Showing" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                        }`}
                    >
                      {movie.status}
                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{movie.bookings}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <button className="text-blue-400 hover:text-blue-300 mr-3">Edit</button>
                                    <button className="text-red-400 hover:text-red-300">Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Quick Actions - Updated to dark mode */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button className="bg-red-600 hover:bg-red-700 text-white rounded-lg p-6 text-left transition-colors">
                    <Film className="w-8 h-8 mb-2"/>
                    <h4 className="font-semibold">Add New Movie</h4>
                    <p className="text-sm text-red-100 mt-1">Create a new movie listing</p>
                </button>

                <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-6 text-left transition-colors">
                    <Film className="w-8 h-8 mb-2"/>
                    <h4 className="font-semibold">Add Banner</h4>
                    <p className="text-sm text-blue-100 mt-1">Upload promotional banner</p>
                </button>

                <button
                    className="bg-green-600 hover:bg-green-700 text-white rounded-lg p-6 text-left transition-colors">
                    <Tag className="w-8 h-8 mb-2"/>
                    <h4 className="font-semibold">Create Offer</h4>
                    <p className="text-sm text-green-100 mt-1">Add new promotional offer</p>
                </button>

                <button
                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg p-6 text-left transition-colors">
                    <UtensilsCrossed className="w-8 h-8 mb-2"/>
                    <h4 className="font-semibold">Add F&B Item</h4>
                    <p className="text-sm text-purple-100 mt-1">Add menu item</p>
                </button>
            </div>
        </div>
    )
}
