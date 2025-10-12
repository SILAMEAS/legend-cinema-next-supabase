"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Edit, Trash2, DollarSign } from "lucide-react"
import Image from "next/image";

export default function FnBManagement() {
    const [items] = useState([
        {
            id: 1,
            name: "Large Popcorn",
            category: "Popcorn",
            price: 5.5,
            description: "Freshly popped buttery popcorn",
            image: "/large-popcorn.jpg",
            available: true,
        },
        {
            id: 2,
            name: "Coca-Cola (Large)",
            category: "Drinks",
            price: 4.0,
            description: "Ice-cold Coca-Cola",
            image: "/coca-cola-large.jpg",
            available: true,
        },
        {
            id: 3,
            name: "Nachos with Cheese",
            category: "Snacks",
            price: 6.5,
            description: "Crispy nachos with melted cheese",
            image: "/nachos-cheese.jpg",
            available: true,
        },
        {
            id: 4,
            name: "Combo Deal",
            category: "Combos",
            price: 12.0,
            description: "Popcorn + Drink + Snack",
            image: "/combo-deal.jpg",
            available: true,
        },
    ])

    const [filterCategory, setFilterCategory] = useState("all")
    const [showAddModal, setShowAddModal] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        category: "Popcorn",
        price: "",
        description: "",
    })

    const categories = ["all", "Popcorn", "Drinks", "Snacks", "Combos"]

    const filteredItems = items.filter((item) => filterCategory === "all" || item.category === filterCategory)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("[v0] F&B item form submitted:", formData)
        setShowAddModal(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-900 p-4 rounded-lg shadow-lg">
                <div>
                    <h1 className="text-2xl font-bold text-white">F&B Menu Management</h1>
                    <p className="text-gray-400 mt-1">Manage food and beverage items</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add New Item
                </button>
            </div>

            {/* Category Filter */}
            <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 p-4">
                <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setFilterCategory(category)}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                filterCategory === category ? "bg-red-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                            }`}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((item) => (
                    <div
                        key={item.id}
                        className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 overflow-hidden hover:border-red-500 transition-colors"
                    >
                        <div className="relative">
                            <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="w-full h-48 object-cover" />
                            <span
                                className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full ${
                                    item.available ? "bg-green-500 text-white" : "bg-red-500 text-white"
                                }`}
                            >
                {item.available ? "Available" : "Unavailable"}
              </span>
                            <span className="absolute top-2 left-2 px-2 py-1 text-xs font-semibold rounded-full bg-blue-500 text-white">
                {item.category}
              </span>
                        </div>

                        <div className="p-4">
                            <h3 className="font-semibold text-white mb-1">{item.name}</h3>
                            <p className="text-sm text-gray-400 mb-3 line-clamp-2">{item.description}</p>

                            <div className="flex items-center gap-2 mb-4">
                                <DollarSign className="w-4 h-4 text-green-600" />
                                <span className="text-lg font-bold text-white">${item.price.toFixed(2)}</span>
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

            {filteredItems.length === 0 && (
                <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 p-12 text-center">
                    <p className="text-gray-400">No items found in this category.</p>
                </div>
            )}

            {/* Add Item Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-900 rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-800">
                            <h2 className="text-xl font-bold text-white">Add New F&B Item</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">Item Image</label>
                                <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-red-500 transition-colors cursor-pointer">
                                    <Plus className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-400">Click to upload item image</p>
                                    <p className="text-xs text-gray-500 mt-1">PNG or JPG, recommended 600x600px</p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white mb-2">Item Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-800 text-white"
                                    placeholder="Large Popcorn"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-white mb-2">Category *</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-800 text-white"
                                    >
                                        <option value="Popcorn">Popcorn</option>
                                        <option value="Drinks">Drinks</option>
                                        <option value="Snacks">Snacks</option>
                                        <option value="Combos">Combos</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white mb-2">Price ($) *</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                        step="0.01"
                                        min="0"
                                        className="w-full px-4 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-800 text-white"
                                        placeholder="5.50"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-800 text-white"
                                    placeholder="Brief description of the item"
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-white">
                                    <input type="checkbox" className="w-4 h-4 text-red-600 rounded focus:ring-red-500" defaultChecked />
                                    <span className="text-sm">Available for purchase</span>
                                </label>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
                                >
                                    Add Item
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-6 py-2 rounded-lg transition-colors"
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
