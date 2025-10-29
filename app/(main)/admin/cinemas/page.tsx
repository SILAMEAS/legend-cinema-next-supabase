"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Edit, Trash2, MapPin, Phone, Clock } from "lucide-react"
import { DeleteConfirmationModal } from "@/components/admin/delete-confirmation-modal"
import { Toast } from "@/components/admin/toast"
import {ANY, IToast} from "@/utils/commons/type";
import CreateCinemaModal from "@/components/admin/cinema/create-cinema-modal";
import {IDeleteCinemaModal} from "@/redux/services/cinema/type";

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
    const [toast, setToast] = useState<IToast | null>(
        null,
    );
    const [showAddModal, setShowAddModal] = useState(false)
    // const [_editModal, setEditModal] = useState<{ show: boolean; cinema: any | null }>({ show: false, cinema: null })
    const [deleteModalCinema, setDeleteModalCinema] = useState<IDeleteCinemaModal>({
        show: false,
        cinemaId: null,
        cinemaName: "",
    })



    const handleDeleteClick = (cinemaId: number, cinemaName: string) => {
        setDeleteModalCinema({ show: true, cinemaId, cinemaName })
    }

    const handleDeleteConfirm = () => {
        setCinemas(cinemas.filter((c) => c.id !== deleteModalCinema.cinemaId))
        setToast({ show: true, message: "Cinema deleted successfully!", type: "success" })
        setDeleteModalCinema({ show: false, cinemaId: null, cinemaName: "" })
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
                <CreateCinemaModal setShowAddModal={setShowAddModal} setToast={setToast} />
            )}

            {/* Delete Confirmation Modal */}
            {deleteModalCinema.show && (
                <DeleteConfirmationModal
                    title="Delete Cinema"
                    message={`Are you sure you want to delete "${deleteModalCinema.cinemaName}"? This action cannot be undone.`}
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setDeleteModalCinema({ show: false, cinemaId: null, cinemaName: "" })}
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
