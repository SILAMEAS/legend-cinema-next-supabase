"use client"

import React, {useState} from "react"
import {Edit, Eye, Plus, Search, Trash2} from "lucide-react"
import {DeleteConfirmationModal} from "@/components/admin/delete-confirmation-modal"
import {Toast} from "@/components/admin/toast"
import {IStatus, IToast} from "@/utils/commons/type";
import {EnumTableColum} from "@/utils/enum/EnumTableColum";
import {useGetMovieQuery} from "@/redux/services/movie/movie";
import CreateEditMovieModal from "@/components/admin/movie/create-edit-movie-modal";
import {Button} from "@/components/ui/button";
import {IDeleteMovieModal, IEditMovieModal, IMovieResponse} from "@/redux/services/movie/type";
import RenderImage from "@/components/RenderImage";

export default function MoviesManagement() {
    const [searchQuery, setSearchQuery] = useState("")
    const [filterStatus, setFilterStatus] = useState("all")
    const [deleteModal, setDeleteModal] = useState<IDeleteMovieModal>({
        show: false,
        movieId: null,
        movieTitle: "",
    })
    const [toast, setToast] = useState<IToast | null>(
        null,
    )
    const [editModal, setEditModal] = useState<IEditMovieModal>({show: false});
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

    const handleEditClick = (movie?: IMovieResponse) => {
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
                <Button
                    onClick={() => handleEditClick()}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                    <Plus className="w-5 h-5"/>
                    Add New Movie
                </Button>
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
                            {
                                movie[EnumTableColum.IMAGE]&&
                                <RenderImage src={movie[EnumTableColum.IMAGE]} alt={movie[EnumTableColum.IMAGE] as string}/>
                            }
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
            {editModal.show && (
                <CreateEditMovieModal editModal={editModal} setEditModal={setEditModal} setToast={setToast}/>
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
