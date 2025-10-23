"use client"

import {useState} from "react"
import {Edit, Eye, Plus, Search, Trash2} from "lucide-react"
import Link from "next/link"
import {DeleteConfirmationModal} from "@/components/admin/delete-confirmation-modal"
import {Toast} from "@/components/admin/toast"
import {EnumPage} from "@/utils/enum/EnumPage";
import {ANY, IStatus} from "@/utils/commons/type";
import Image from "next/image";
import {EnumTableColum} from "@/utils/enum/EnumTableColum";
import {useGetMovieQuery} from "@/redux/services/movie/movie";
import {$ok} from "@/utils/commons/$ok";

export default function MoviesManagement() {
    const [searchQuery, setSearchQuery] = useState("")
    const [filterStatus, setFilterStatus] = useState("all")
    const [deleteModal, setDeleteModal] = useState<{ show: boolean; movieId: number | null; movieTitle: string }>({
        show: false,
        movieId: null,
        movieTitle: "",
    })
    const [toast, setToast] = useState<{
        show: boolean;
        message: string;
        type: "success" | "error" | "warning"
    } | null>(
        null,
    )
    const [editModal, setEditModal] = useState<{ show: boolean; movie: ANY | null }>({show: false, movie: null});
    const {currentData: movies} = useGetMovieQuery({title: searchQuery, status: filterStatus});

    const handleDeleteClick = (movieId: number | null, movieTitle: string) => {
        if (!movies) {
            console.error("No movies found for this page movieId", movieId);
        }
        setDeleteModal({show: true, movieId, movieTitle})
    }

    const handleDeleteConfirm = () => {
        // Perform delete operation here
        setToast({show: true, message: "Movie deleted successfully!", type: "success"})
        setDeleteModal({show: false, movieId: null, movieTitle: ""})
    }

    const handleEditClick = (movie: ANY) => {
        setEditModal({show: true, movie})
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Movie Management</h1>
                    <p className="text-gray-400 mt-1">Manage all movies and showtimes</p>
                </div>
                <Link
                    href={EnumPage.ADMIN_MOVIES_NEW}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                    <Plus className="w-5 h-5"/>
                    Add New Movie
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5"/>
                        <input
                            type="text"
                            placeholder="Search movies..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        <option value="all">All Status</option>
                        <option value="Now Showing">Now Showing</option>
                        <option value="Coming Soon">Coming Soon</option>
                    </select>
                </div>
            </div>

            {/* Movies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {movies?.contents?.map((movie) => (
                    <div
                        key={movie.id}
                        className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 overflow-hidden hover:border-red-500 transition-colors"
                    >
                        <div className="relative">
                            <Image fill
                                   src={$ok(movie[EnumTableColum.IMAGE]) ? movie[EnumTableColum.IMAGE] as string : "/placeholder.svg"}
                                   alt={movie.title}
                                   className="w-full h-64 object-cover"/>
                            <span
                                className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full ${
                                    (movie[EnumTableColum.STATUS] as unknown as IStatus)?.name === "Now Showing" ? "bg-green-500 text-white" : "bg-blue-500 text-white"
                                }`}
                            >
                {(movie[EnumTableColum.STATUS] as unknown as IStatus)?.name}
              </span>
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-white mb-2 line-clamp-1">{movie.title}</h3>
                            <div className="space-y-1 text-sm text-gray-400 mb-4">
                                <p>Genre: {movie.genre}</p>
                                <p>Duration: {movie.duration}</p>
                                <p>Rating: {movie.rating}</p>
                                <p>Release: {movie.releaseDate}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEditClick(movie)}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm"
                                >
                                    <Edit className="w-4 h-4"/>
                                    Edit
                                </button>
                                <button
                                    className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-2 rounded-lg transition-colors border border-gray-700">
                                    <Eye className="w-4 h-4"/>
                                </button>
                                <button
                                    onClick={() => {
                                        handleDeleteClick(movie.id, movie.title)
                                    }}
                                    className="bg-red-900/30 hover:bg-red-900/50 text-red-500 px-3 py-2 rounded-lg transition-colors border border-red-800"
                                >
                                    <Trash2 className="w-4 h-4"/>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {movies?.contents.length === 0 && (
                <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 p-12 text-center">
                    <p className="text-gray-500">No movies found matching your criteria.</p>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteModal.show && (
                <DeleteConfirmationModal
                    title="Delete Movie"
                    message={`Are you sure you want to delete "${deleteModal.movieTitle}"? This action cannot be undone.`}
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setDeleteModal({show: false, movieId: null, movieTitle: ""})}
                />
            )}

            {/* Edit Modal */}
            {editModal.show && editModal.movie && (
                <div
                    className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-sm overflow-y-auto">
                    <div className="bg-gray-900 rounded-lg shadow-2xl max-w-2xl w-full border border-gray-800 my-8">
                        <div className="p-6 border-b border-gray-800">
                            <h2 className="text-xl font-bold text-white">Edit Movie</h2>
                        </div>

                        <form className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Movie Title
                                        *</label>
                                    <input
                                        type="text"
                                        defaultValue={editModal.movie.title}
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Genre *</label>
                                    <input
                                        type="text"
                                        defaultValue={editModal.movie.genre}
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Duration *</label>
                                    <input
                                        type="text"
                                        defaultValue={editModal.movie.duration}
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Rating *</label>
                                    <select
                                        defaultValue={editModal.movie.rating}
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        <option value="G">G</option>
                                        <option value="PG">PG</option>
                                        <option value="PG-13">PG-13</option>
                                        <option value="R">R</option>
                                        <option value="NC-17">NC-17</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Status *</label>
                                    <select
                                        defaultValue={editModal.movie.status}
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        <option value="Now Showing">Now Showing</option>
                                        <option value="Coming Soon">Coming Soon</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Release Date
                                        *</label>
                                    <input
                                        type="date"
                                        defaultValue={editModal.movie.releaseDate}
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setToast({show: true, message: "Movie updated successfully!", type: "success"})
                                        setEditModal({show: false, movie: null})
                                    }}
                                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditModal({show: false, movie: null})}
                                    className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors border border-gray-700"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Toast Notification */}
            {toast?.show && (
                <div className="fixed bottom-4 right-4 z-50">
                    <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)}/>
                </div>
            )}
        </div>
    )
}
