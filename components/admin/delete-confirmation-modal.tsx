"use client"

import { AlertTriangle } from "lucide-react"

interface DeleteConfirmationModalProps {
    title: string
    message: string
    onConfirm: () => void
    onCancel: () => void
}

export function DeleteConfirmationModal({ title, message, onConfirm, onCancel }: DeleteConfirmationModalProps) {
    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-gray-800 rounded-lg shadow-2xl max-w-md w-full border border-gray-700">
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                            <AlertTriangle className="w-6 h-6 text-red-500" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white">{title}</h3>
                            <p className="text-sm text-gray-400 mt-1">{message}</p>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button
                            onClick={onConfirm}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors"
                        >
                            Delete
                        </button>
                        <button
                            onClick={onCancel}
                            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2.5 rounded-lg font-medium transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
