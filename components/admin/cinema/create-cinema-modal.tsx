import React, {useState} from 'react';
import { IToast} from "@/utils/commons/type";
import {IModalCreateCinemaFormData} from "@/redux/services/cinema/type";

interface IModalCreateCinema {
    setToast: React.Dispatch<React.SetStateAction<IToast | null>>,
    setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>

}

const CreateCinemaModal = ({setToast, setShowAddModal}: IModalCreateCinema) => {


    const [formData, setFormData] = useState<IModalCreateCinemaFormData>({
        name: "",
        address: "",
        phone: "",
        email: "",
        hours: "",
        screens: "",
        seats: "",
        facilities: [],
    })
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setToast({show: true, message: "Cinema added successfully!", type: "success"})
        setShowAddModal(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }
    return <div
        className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-sm overflow-y-auto">
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
                                <input type="checkbox" className="w-4 h-4 text-red-600 rounded focus:ring-red-500"/>
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
};

export default CreateCinemaModal;