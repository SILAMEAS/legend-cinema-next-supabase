"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, MoveUp, MoveDown, Eye, EyeOff, Upload } from "lucide-react"
import { DeleteConfirmationModal } from "@/components/admin/delete-confirmation-modal"
import { Toast } from "@/components/admin/toast"
import {ANY} from "@/utils/commons/type";
import Image from "next/image";

export default function BannersManagement() {
    const [banners, setBanners] = useState([
        {
            id: 1,
            title: "Gold Class Package",
            image: "/gold-class-banner.jpg",
            link: "/offers/gold-class",
            active: true,
            order: 1,
        },
        {
            id: 2,
            title: "Student Discount",
            image: "/student-discount-banner.jpg",
            link: "/offers/student",
            active: true,
            order: 2,
        },
        {
            id: 3,
            title: "Weekend Special",
            image: "/weekend-special-banner.jpg",
            link: "/offers/weekend",
            active: false,
            order: 3,
        },
    ])

    const [showAddModal, setShowAddModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState<{ show: boolean; bannerId: number | null; bannerTitle: string }>({
        show: false,
        bannerId: null,
        bannerTitle: "",
    })
    const [toast, setToast] = useState<{ show: boolean; message: string; type: "success" | "error" | "warning" } | null>(
        null,
    )
    const [editModal, setEditModal] = useState<{ show: boolean; banner: ANY | null }>({ show: false, banner: null })

    const toggleActive = (id: number) => {
        setBanners(banners.map((banner) => (banner.id === id ? { ...banner, active: !banner.active } : banner)))
    }

    const moveUp = (id: number) => {
        const index = banners.findIndex((b) => b.id === id)
        if (index > 0) {
            const newBanners = [...banners]
            ;[newBanners[index - 1], newBanners[index]] = [newBanners[index], newBanners[index - 1]]
            setBanners(newBanners)
        }
    }

    const moveDown = (id: number) => {
        const index = banners.findIndex((b) => b.id === id)
        if (index < banners.length - 1) {
            const newBanners = [...banners]
            ;[newBanners[index], newBanners[index + 1]] = [newBanners[index + 1], newBanners[index]]
            setBanners(newBanners)
        }
    }

    const handleDeleteClick = (bannerId: number, bannerTitle: string) => {
        setDeleteModal({ show: true, bannerId, bannerTitle })
    }

    const handleDeleteConfirm = () => {
        setBanners(banners.filter((b) => b.id !== deleteModal.bannerId))
        setToast({ show: true, message: "Banner deleted successfully!", type: "success" })
        setDeleteModal({ show: false, bannerId: null, bannerTitle: "" })
    }

    const handleEditClick = (banner: ANY) => {
        setEditModal({ show: true, banner })
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Banner Management</h1>
                    <p className="text-gray-400 mt-1">Manage homepage carousel banners</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add New Banner
                </button>
            </div>

            {/* Banners List */}
            <div className="space-y-4">
                {banners.map((banner, index) => (
                    <div
                        key={banner.id}
                        className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 overflow-hidden hover:border-red-500 transition-colors"
                    >
                        <div className="flex flex-col md:flex-row">
                            {/* Banner Preview */}
                            <div className="md:w-1/3 relative">
                                <Image
                                    src={banner.image || "/placeholder.svg?height=200&width=400"}
                                    alt={banner.title}
                                    fill
                                    className="w-full h-48 md:h-full object-cover"
                                />
                                {!banner.active && (
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                        <span className="text-white font-semibold">Inactive</span>
                                    </div>
                                )}
                            </div>

                            {/* Banner Details */}
                            <div className="flex-1 p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">{banner.title}</h3>
                                        <p className="text-sm text-gray-400 mt-1">Link: {banner.link}</p>
                                        <p className="text-sm text-gray-400">Order: #{banner.order}</p>
                                    </div>
                                    <span
                                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                            banner.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                                        }`}
                                    >
                    {banner.active ? "Active" : "Inactive"}
                  </span>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => {
                                            toggleActive(banner.id)
                                            setToast({
                                                show: true,
                                                message: `Banner ${banner.active ? "deactivated" : "activated"} successfully!`,
                                                type: "success",
                                            })
                                        }}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm"
                                    >
                                        {banner.active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        {banner.active ? "Deactivate" : "Activate"}
                                    </button>

                                    <button
                                        onClick={() => handleEditClick(banner)}
                                        className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm border border-gray-700"
                                    >
                                        <Edit className="w-4 h-4" />
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => moveUp(banner.id)}
                                        disabled={index === 0}
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <MoveUp className="w-4 h-4" />
                                    </button>

                                    <button
                                        onClick={() => moveDown(banner.id)}
                                        disabled={index === banners.length - 1}
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <MoveDown className="w-4 h-4" />
                                    </button>

                                    <button
                                        onClick={() => handleDeleteClick(banner.id, banner.title)}
                                        className="bg-red-900/30 hover:bg-red-900/50 text-red-500 px-3 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm ml-auto border border-red-800"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Banner Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                    <div className="bg-gray-900 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-800">
                        <div className="p-6 border-b border-gray-800">
                            <h2 className="text-xl font-bold text-white">Add New Banner</h2>
                        </div>

                        <form className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Banner Title *</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    placeholder="Enter banner title"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Banner Image *</label>
                                <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-red-500 transition-colors cursor-pointer bg-gray-800/50">
                                    <Upload className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                                    <p className="text-sm text-gray-400">Click to upload banner image</p>
                                    <p className="text-xs text-gray-500 mt-1">Recommended: 1920x600px, PNG or JPG</p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Link URL</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    placeholder="/offers/special-deal"
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-red-600 rounded focus:ring-red-500 bg-gray-800 border-gray-700"
                                    />
                                    <span className="text-sm text-gray-300">Set as active immediately</span>
                                </label>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setToast({ show: true, message: "Banner added successfully!", type: "success" })
                                        setShowAddModal(false)
                                    }}
                                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
                                >
                                    Add Banner
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors border border-gray-700"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Banner Modal */}
            {editModal.show && editModal.banner && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                    <div className="bg-gray-900 rounded-lg shadow-2xl max-w-2xl w-full border border-gray-800">
                        <div className="p-6 border-b border-gray-800">
                            <h2 className="text-xl font-bold text-white">Edit Banner</h2>
                        </div>

                        <form className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Banner Title *</label>
                                <input
                                    type="text"
                                    defaultValue={editModal.banner.title}
                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Link URL</label>
                                <input
                                    type="text"
                                    defaultValue={editModal.banner.link}
                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setToast({ show: true, message: "Banner updated successfully!", type: "success" })
                                        setEditModal({ show: false, banner: null })
                                    }}
                                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditModal({ show: false, banner: null })}
                                    className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors border border-gray-700"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteModal.show && (
                <DeleteConfirmationModal
                    title="Delete Banner"
                    message={`Are you sure you want to delete "${deleteModal.bannerTitle}"? This action cannot be undone.`}
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setDeleteModal({ show: false, bannerId: null, bannerTitle: "" })}
                />
            )}

            {/* Toast */}
            {toast?.show && (
                <div className="fixed bottom-4 right-4 z-50">
                    <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
                </div>
            )}
        </div>
    )
}
