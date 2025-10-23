"use client"

import type React from "react"
import {useState} from "react"
import {ArrowLeft} from "lucide-react"
import Link from "next/link"
import {EnumPage} from "@/utils/enum/EnumPage";
import Dropzone from "@/components/dropzone";
import {IMovieResponse, MovieFormData} from "@/redux/services/movie/type";
import {EnumTableColum} from "@/utils/enum/EnumTableColum";
import {useCreateMovieMutation} from "@/redux/services/movie/movie";

export default function NewMovie() {
    /** calling end point*/
    const [createMovie] = useCreateMovieMutation({});
    /** state  */
    const [file, setFile] = useState<File | null>(null);
    const [formData, setFormData] = useState<IMovieResponse>({
        [EnumTableColum.ID]:null,
        [EnumTableColum.TITLE]: "",
        [EnumTableColum.GENRE]: "",
        [EnumTableColum.DURATION]: "",
        [EnumTableColum.RATING]: "",
        [EnumTableColum.STATUS]: "Coming Soon",
        [EnumTableColum.RELEASE_DATE]: "",
        [EnumTableColum.DIRECTOR]: "",
        [EnumTableColum.CAST]: "",
        [EnumTableColum.SYNOPSIS]: "",
        [EnumTableColum.TRAILER]: "",
        [EnumTableColum.IMAGE]: null
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setFormData({...formData,image:file});
        try {
            await createMovie(MovieFormData(formData)).unwrap();
        }catch(err) {
            console.log(err)
        }
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
            <div className="flex items-center gap-4">
                <Link href={EnumPage.ADMIN_MOVIES} className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                    <ArrowLeft className="w-5 h-5"/>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Add New Movie</h1>
                    <p className="text-white mt-1">Fill in the movie details</p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-black rounded-lg shadow-md border border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {
                        formData[EnumTableColum.IMAGE]&&<p>{JSON.stringify(formData[EnumTableColum.IMAGE])}</p>
                    }
                    <Dropzone
                        inputProps={{
                        type:"file",
                        name:"image"
                        }}
                        setFile={setFile}
                        file={file}
                    />

                    {/* Title */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-white mb-2">Movie Title *</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-transparent text-white"
                            placeholder="Enter movie title"
                        />
                    </div>

                    {/* Genre */}
                    <div>
                        <label className="block text-sm font-medium text-white mb-2">Genre *</label>
                        <input
                            type="text"
                            name="genre"
                            value={formData.genre}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-transparent text-white"
                            placeholder="e.g., Action, Drama"
                        />
                    </div>

                    {/* Duration */}
                    <div>
                        <label className="block text-sm font-medium text-white mb-2">Duration *</label>
                        <input
                            type="text"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-transparent text-white"
                            placeholder="e.g., 120 min"
                        />
                    </div>

                    {/* Rating */}
                    <div>
                        <label className="block text-sm font-medium text-white mb-2">Rating *</label>
                        <select
                            name="rating"
                            value={formData.rating}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-transparent text-white"
                        >
                            <option value="" className={'bg-black'}>Select rating</option>
                            <option value="G" className={'bg-black'}>G</option>
                            <option value="PG" className={'bg-black'}>PG</option>
                            <option value="PG-13" className={'bg-black'}>PG-13</option>
                            <option value="R" className={'bg-black'}>R</option>
                            <option value="NC-17" className={'bg-black'}>NC-17</option>
                        </select>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-white mb-2">Status *</label>
                        <select
                            name="status"
                            value={typeof formData.status === 'string' ? formData.status : formData[EnumTableColum.STATUS][EnumTableColum.NAME]}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-transparent text-white"
                        >
                            <option value="Coming Soon" className={'bg-black'}>Coming Soon</option>
                            <option value="Now Showing" className={'bg-black'}>Now Showing</option>
                        </select>
                    </div>

                    {/* Release Date */}
                    <div>
                        <label className="block text-sm font-medium text-white mb-2">Release Date *</label>
                        <input
                            type="date"
                            name="releaseDate"
                            value={formData.releaseDate}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-transparent text-white"
                        />
                    </div>

                    {/* Director */}
                    <div>
                        <label className="block text-sm font-medium text-white mb-2">Director</label>
                        <input
                            type="text"
                            name="director"
                            value={formData.director}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-transparent text-white"
                            placeholder="Director name"
                        />
                    </div>

                    {/* Cast */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-white mb-2">Cast</label>
                        <input
                            type="text"
                            name="cast"
                            value={formData.cast}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-transparent text-white"
                            placeholder="Comma-separated cast names"
                        />
                    </div>

                    {/* Synopsis */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-white mb-2">Synopsis</label>
                        <textarea
                            name="synopsis"
                            value={formData.synopsis}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-transparent text-white"
                            placeholder="Enter movie synopsis"
                        />
                    </div>

                    {/* Trailer URL */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-white mb-2">Trailer URL</label>
                        <input
                            type="url"
                            name="trailer"
                            value={formData.trailer}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-transparent text-white"
                            placeholder="https://youtube.com/..."
                        />
                    </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 mt-6">
                    <button
                        type="submit"
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                        Add Movie
                    </button>
                    <Link
                        href={EnumPage.ADMIN_MOVIES}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg transition-colors"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    )
}
