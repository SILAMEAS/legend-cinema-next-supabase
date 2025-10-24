"use client"

import React from "react"
import Link from "next/link"
import {Controller, useForm} from "react-hook-form"
import {ArrowLeft} from "lucide-react"
import {EnumPage} from "@/utils/enum/EnumPage"
import Dropzone from "@/components/dropzone"
import {ConvertFromObjToFormData, IMovieRequest} from "@/redux/services/movie/type"
import {EnumSupabseColumn, EnumTableColum} from "@/utils/enum/EnumTableColum"
import {useCreateMovieMutation, useGetMovieStatusQuery} from "@/redux/services/movie/movie"
import {useGetCinemaQuery} from "@/redux/services/cinema/cinema";

export default function NewMovie() {
    const {data: statuses} = useGetMovieStatusQuery();
    const [createMovie] = useCreateMovieMutation();
    const {data: cinemas} = useGetCinemaQuery()

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: {errors},
        watch,
    } = useForm<IMovieRequest>({
        defaultValues: {
            [EnumTableColum.TITLE]: "",
            [EnumTableColum.GENRE]: "",
            [EnumTableColum.DURATION]: "",
            [EnumTableColum.RATING]: "",
            [EnumTableColum.RELEASE_DATE]: "",
            [EnumTableColum.DIRECTOR]: "",
            [EnumTableColum.CAST]: "",
            [EnumTableColum.SYNOPSIS]: "",
            [EnumTableColum.TRAILER]: "",
            [EnumTableColum.IMAGE]: null,
            [EnumSupabseColumn.CINEMA_ID]: null,
            [EnumSupabseColumn.MOVIE_STATUS_ID]: null
        },
    })

    const onSubmit = async (data: IMovieRequest) => {
        try {
            if (!data.image) {
                console.error("File not found")
                return
            }
            await createMovie(ConvertFromObjToFormData(data)).unwrap().then(() => {
                reset()
            })
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href={EnumPage.ADMIN_MOVIES}
                      className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-white">
                    <ArrowLeft className="w-5 h-5"/>
                </Link>
                <div className={'text-white'}>
                    <h1 className="text-2xl font-bold ">Add New Movie</h1>
                    <p className="text-white mt-1">Fill in the movie details</p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}
                  className="bg-black rounded-lg shadow-md border border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Dropzone */}
                    <Controller
                        name="image"
                        control={control}
                        render={({field}) => (
                            <Dropzone
                                inputProps={{type: "file", ...register(EnumTableColum.IMAGE, {required: "Image is required"})}}
                                setFile={(file: File | null) => field.onChange(file)}
                                file={field.value}
                            />
                        )}
                    />
                    {errors[EnumTableColum.IMAGE] &&
                        <p className="text-red-400 text-sm">{errors[EnumTableColum.IMAGE].message}</p>}
                    {/* Title */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-white mb-2">Movie Title *</label>
                        <input
                            {...register(EnumTableColum.TITLE, {required: "Title is required"})}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 bg-transparent text-white"
                            placeholder="Enter movie title"
                        />
                        {errors[EnumTableColum.TITLE] &&
                            <p className="text-red-400 text-sm">{errors[EnumTableColum.TITLE].message}</p>}
                    </div>

                    {/* Genre */}
                    <div>
                        <label className="block text-sm font-medium text-white mb-2">Genre *</label>
                        <input
                            {...register(EnumTableColum.GENRE, {required: "Genre is required"})}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 bg-transparent text-white"
                            placeholder="e.g., Action, Drama"
                        />
                        {errors[EnumTableColum.GENRE] &&
                            <p className="text-red-400 text-sm">{errors[EnumTableColum.GENRE].message}</p>}
                    </div>

                    {/* Duration */}
                    <div>
                        <label className="block text-sm font-medium text-white mb-2">Duration *</label>
                        <input
                            {...register(EnumTableColum.DURATION, {required: "Duration is required"})}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 bg-transparent text-white"
                            placeholder="e.g., 120 min"
                        />
                        {errors[EnumTableColum.DURATION] &&
                            <p className="text-red-400 text-sm">{errors[EnumTableColum.DURATION].message}</p>}
                    </div>

                    {/* Rating */}
                    <div>
                        <label className="block text-sm font-medium text-white mb-2">Rating *</label>
                        <select
                            {...register(EnumTableColum.RATING, {required: "Rating is required"})}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 bg-transparent text-white"
                        >
                            <option value="">Select rating</option>
                            {["G", "PG", "PG-13", "R", "NC-17"].map(r => (
                                <option key={r} value={r} className="bg-black">
                                    {r}
                                </option>
                            ))}
                        </select>
                        {errors[EnumTableColum.RATING] &&
                            <p className="text-red-400 text-sm">{errors[EnumTableColum.RATING].message}</p>}
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-white mb-2">Status *</label>
                        <select
                            {...register(EnumSupabseColumn.MOVIE_STATUS_ID, {required: "Status is required"})}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 bg-transparent text-white"
                        >
                            <option value="">Select status</option>
                            {statuses?.contents?.map(st => (
                                <option key={st.id} value={st.id} className="bg-black">
                                    {st.name}
                                </option>
                            ))}
                        </select>
                        {errors[EnumSupabseColumn.MOVIE_STATUS_ID] &&
                            <p className="text-red-400 text-sm">{errors[EnumSupabseColumn.MOVIE_STATUS_ID].message}</p>}
                    </div>

                    {/* Release Date */}
                    <div>
                        <label className="block text-sm font-medium text-white mb-2">Release Date *</label>
                        <input
                            type="date"
                            {...register(EnumTableColum.RELEASE_DATE, {required: "Release date is required"})}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 bg-transparent text-white"
                        />
                        {errors[EnumTableColum.RELEASE_DATE] &&
                            <p className="text-red-400 text-sm">{errors[EnumTableColum.RELEASE_DATE].message}</p>}
                    </div>

                    {/* Director */}
                    <div>
                        <label className="block text-sm font-medium text-white mb-2">Director</label>
                        <input
                            {...register(EnumTableColum.DIRECTOR, {required: "director is required"})}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 bg-transparent text-white"
                            placeholder="Director name"
                        />
                        {errors[EnumTableColum.DIRECTOR] &&
                            <p className="text-red-400 text-sm">{errors[EnumTableColum.DIRECTOR].message}</p>}
                    </div>

                    {/* Cinema */}
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-white mb-2">Cinema *</label>
                        <select
                            {...register(EnumSupabseColumn.CINEMA_ID, {required: "cinema_id is required"})}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 bg-transparent text-white"
                        >
                            <option value="">Select cinema</option>
                            {cinemas?.contents?.map(c => (
                                <option key={c.id} value={c.id} className="bg-black">
                                    {c.name}
                                </option>
                            ))}
                        </select>
                        {errors[EnumSupabseColumn.CINEMA_ID] &&
                            <p className="text-red-400 text-sm">{errors[EnumSupabseColumn.CINEMA_ID].message}</p>}
                    </div>
                    {/* Cast */}
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-white mb-2">Cast</label>
                        <input
                            {...register(EnumTableColum.CAST)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 bg-transparent text-white"
                            placeholder="Comma-separated cast names"
                        />
                    </div>

                    {/* Synopsis */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-white mb-2">Synopsis</label>
                        <textarea
                            {...register(EnumTableColum.SYNOPSIS)}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 bg-transparent text-white"
                            placeholder="Enter movie synopsis"
                        />
                    </div>

                    {/* Trailer */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-white mb-2">Trailer URL</label>
                        <input
                            type="url"
                            {...register(EnumTableColum.TRAILER)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 bg-transparent text-white"
                            placeholder="https://youtube.com/..."
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 mt-6">
                    <button
                        type="submit"
                        className={` text-white px-6 py-2 rounded-lg transition-colors ${!watch(EnumTableColum.IMAGE) ? "bg-gray-700" : "bg-red-600 hover:bg-red-700"}`}
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
