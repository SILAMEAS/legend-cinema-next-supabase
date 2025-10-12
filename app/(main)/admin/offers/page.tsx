"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Edit, Trash2, Calendar, Percent } from "lucide-react"
import Image from "next/image";

export default function OffersManagement() {
    const [offers] = useState([
        {
            id: 1,
            title: "Student Discount",
            description: "20% off on all tickets with valid student ID",
            discount: "20%",
            validFrom: "2024-01-01",
            validUntil: "2024-12-31",
            terms: "Valid student ID required",
            status: "Active",
            image: "/student-offer.jpg",
        },
        {
            id: 2,
            title: "Senior Citizen Special",
            description: "15% discount for seniors aged 60+",
            discount: "15%",
            validFrom: "2024-01-01",
            validUntil: "2024-12-31",
            terms: "Valid ID required",
            status: "Active",
            image: "/senior-offer.jpg",
        },
        {
            id: 3,
            title: "Weekend Special",
            description: "Buy 2 tickets, get 1 free on weekends",
            discount: "BOGO",
            validFrom: "2024-10-01",
            validUntil: "2024-10-31",
            terms: "Valid on Saturdays and Sundays only",
            status: "Expired",
            image: "/weekend-offer.jpg",
        },
    ])

    const [showAddModal, setShowAddModal] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        discount: "",
        validFrom: "",
        validUntil: "",
        terms: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("[v0] Offer form submitted:", formData)
        setShowAddModal(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Offers Management</h1>
                    <p className="text-gray-400 mt-1">Manage promotional offers and discounts</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add New Offer
                </button>
            </div>

            {/* Offers Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {offers.map((offer) => (
                    <div
                        key={offer.id}
                        className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 overflow-hidden hover:border-red-500 transition-colors"
                    >
                        <div className="relative">
                            <Image
                                src={offer.image || "/placeholder.svg?height=200&width=400"}
                                alt={offer.title}
                                fill
                                className="w-full h-48 object-cover"
                            />
                            <div className="absolute top-2 right-2 flex gap-2">
                <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        offer.status === "Active" ? "bg-green-500 text-white" : "bg-gray-500 text-white"
                    }`}
                >
                  {offer.status}
                </span>
                                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-500 text-white flex items-center gap-1">
                  <Percent className="w-3 h-3" />
                                    {offer.discount}
                </span>
                            </div>
                        </div>

                        <div className="p-4">
                            <h3 className="font-semibold text-white mb-2">{offer.title}</h3>
                            <p className="text-sm text-gray-400 mb-4">{offer.description}</p>

                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                    <Calendar className="w-4 h-4" />
                                    <span>
                    Valid: {offer.validFrom} to {offer.validUntil}
                  </span>
                                </div>
                                <p className="text-xs text-gray-300 italic">{offer.terms}</p>
                            </div>

                            <div className="flex gap-2">
                                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm">
                                    <Edit className="w-4 h-4" />
                                    Edit
                                </button>
                                <button className="bg-red-100 hover:bg-red-200 text-red-600 px-3 py-2 rounded-lg transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Offer Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900">Add New Offer</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Offer Image</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-red-500 transition-colors cursor-pointer">
                                    <Plus className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-600">Click to upload offer image</p>
                                    <p className="text-xs text-gray-500 mt-1">PNG or JPG, recommended 800x600px</p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Offer Title *</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    placeholder="Student Discount"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    placeholder="Brief description of the offer"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Discount Value *</label>
                                <input
                                    type="text"
                                    name="discount"
                                    value={formData.discount}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    placeholder="20% or BOGO"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Valid From *</label>
                                    <input
                                        type="date"
                                        name="validFrom"
                                        value={formData.validFrom}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Valid Until *</label>
                                    <input
                                        type="date"
                                        name="validUntil"
                                        value={formData.validUntil}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Terms & Conditions</label>
                                <textarea
                                    name="terms"
                                    value={formData.terms}
                                    onChange={handleChange}
                                    rows={2}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    placeholder="Terms and conditions for this offer"
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
                                >
                                    Add Offer
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
