"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Edit, Trash2, MapPin, Phone, Clock } from "lucide-react"
import { DeleteConfirmationModal } from "@/components/admin/delete-confirmation-modal"
import { Toast } from "@/components/admin/toast"
import {ANY} from "@/utils/commons/type";

export default function CinemasManagement() {
    const [cinemas, setCinemas] = useState([
        {
            id: 1,
            name: "Legend Cinema - Phnom Penh",
            address: "Aeon Mall, St. 245, Phnom Penh",
            phone: "+855 23 123 456",
            email: "phnompenh@legend.com.kh",
            hours: "10:00 AM - 11:00 PM",
            screens: 8,
            seats: 1200,
            facilities: ["IMAX", "4DX", "VIP Lounge", "Parking"],
            status: "Active",
        },
        {
            id: 2,
            name: "Legend Cinema - Siem Reap",
            address: "Lucky Mall, Siem Reap",
            phone: "+855 63 987 654",
            email: "siemreap@legend.com.kh",
            hours: "10:00 AM - 10:00 PM",
            screens: 6,
            seats: 900,
            facilities: ["Standard", "VIP", "Parking"],
            status: "Active",
        },
    ])

    const [showAddModal, setShowAddModal] = useState(false)
    // const [_editModal, setEditModal] = useState<{ show: boolean; cinema: any | null }>({ show: false, cinema: null })
    const [deleteModal, setDeleteModal] = useState<{ show: boolean; cinemaId: number | null; cinemaName: string }>({
        show: false,
        cinemaId: null,
        cinemaName: "",
    })
    const [toast, setToast] = useState<{ show: boolean; message: string; type: "success" | "error" | "warning" } | null>(
        null,
    )
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
        email: "",
        hours: "",
        screens: "",
        seats: "",
        facilities: [] as string[],
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setToast({ show: true, message: "Cinema added successfully!", type: "success" })
        setShowAddModal(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleDeleteClick = (cinemaId: number, cinemaName: string) => {
        setDeleteModal({ show: true, cinemaId, cinemaName })
    }

    const handleDeleteConfirm = () => {
        setCinemas(cinemas.filter((c) => c.id !== deleteModal.cinemaId))
        setToast({ show: true, message: "Cinema deleted successfully!", type: "success" })
        setDeleteModal({ show: false, cinemaId: null, cinemaName: "" })
    }

    const handleEditClick = (cinema: ANY) => {
        console.log(cinema)
        // setEditModal({ show: true, cinema })
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Cinema Management</h1>
                    <p className="text-gray-400 mt-1">Manage cinema locations and details</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add New Cinema
                </button>
            </div>

            {/* Cinemas Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {cinemas.map((cinema) => (
                    <div
                        key={cinema.id}
                        className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 p-6 hover:border-red-500 transition-colors"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-lg font-semibold text-white">{cinema.name}</h3>
                                <span
                                    className={`inline-block mt-2 px-2 py-1 text-xs font-semibold rounded-full ${
                                        cinema.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                    }`}
                                >
                  {cinema.status}
                </span>
                            </div>
                        </div>

                        <div className="space-y-3 mb-4">
                            <div className="flex items-start gap-2 text-sm text-gray-400">
                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>{cinema.address}</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <Phone className="w-4 h-4 flex-shrink-0" />
                                <span>{cinema.phone}</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <Clock className="w-4 h-4 flex-shrink-0" />
                                <span>{cinema.hours}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-gray-800 rounded-lg">
                            <div>
                                <p className="text-xs text-gray-500">Screens</p>
                                <p className="text-lg font-semibold text-white">{cinema.screens}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Total Seats</p>
                                <p className="text-lg font-semibold text-white">{cinema.seats}</p>
                            </div>
                        </div>

                        <div className="mb-4">
                            <p className="text-xs text-gray-500 mb-2">Facilities</p>
                            <div className="flex flex-wrap gap-2">
                                {cinema.facilities.map((facility, index) => (
                                    <span
                                        key={index}
                                        className="px-2 py-1 bg-blue-900/50 text-blue-300 text-xs rounded-full border border-blue-800"
                                    >
                    {facility}
                  </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => handleEditClick(cinema)}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm"
                            >
                                <Edit className="w-4 h-4" />
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteClick(cinema.id, cinema.name)}
                                className="bg-red-900/30 hover:bg-red-900/50 text-red-500 px-4 py-2 rounded-lg transition-colors border border-red-800"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Cinema Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-sm overflow-y-auto">
                    <div className="bg-gray-900 rounded-lg shadow-2xl max-w-2xl w-full border border-gray-800 my-8">
                        <div className="p-6 border-b border-gray-800">
                            <h2 className="text-xl font-bold text-white">Add New Cinema</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Cinema Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    placeholder="Legend Cinema - Location"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Address *</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    rows={2}
                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    placeholder="Full address"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                        placeholder="+855 XX XXX XXX"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                        placeholder="cinema@legend.com.kh"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Operating Hours *</label>
                                <input
                                    type="text"
                                    name="hours"
                                    value={formData.hours}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    placeholder="10:00 AM - 11:00 PM"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Number of Screens *</label>
                                    <input
                                        type="number"
                                        name="screens"
                                        value={formData.screens}
                                        onChange={handleChange}
                                        required
                                        min="1"
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                        placeholder="8"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Total Seats *</label>
                                    <input
                                        type="number"
                                        name="seats"
                                        value={formData.seats}
                                        onChange={handleChange}
                                        required
                                        min="1"
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                        placeholder="1200"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Facilities</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {["IMAX", "4DX", "VIP Lounge", "Standard", "Parking", "Restaurant", "Arcade"].map((facility) => (
                                        <label key={facility} className="flex items-center gap-2">
                                            <input type="checkbox" className="w-4 h-4 text-red-600 rounded focus:ring-red-500" />
                                            <span className="text-sm text-gray-700">{facility}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
                                >
                                    Add Cinema
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

            {/* Delete Confirmation Modal */}
            {deleteModal.show && (
                <DeleteConfirmationModal
                    title="Delete Cinema"
                    message={`Are you sure you want to delete "${deleteModal.cinemaName}"? This action cannot be undone.`}
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setDeleteModal({ show: false, cinemaId: null, cinemaName: "" })}
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
