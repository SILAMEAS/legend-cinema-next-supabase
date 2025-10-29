import React from 'react';
import {Controller, useForm} from "react-hook-form";
import {EnumSupabseColumn, EnumTableColum} from "@/utils/enum/EnumTableColum";
import {ConvertFromObjToFormData, IEditMovieModalProps, IMovieRequest} from "@/redux/services/movie/type";
import Dropzone from "@/components/dropzone";
import {useCreateUpdateMovieMutation, useGetMovieStatusQuery} from "@/redux/services/movie/movie";
import {useGetCinemaQuery} from "@/redux/services/cinema/cinema";
import {$ok} from "@/utils/commons/$ok";
import {EnumMethod} from "@/utils/enum/EnumMethod";
import RenderImage from "@/components/RenderImage";

const CreateEditMovieModal = ({editModal, setEditModal, setToast}: IEditMovieModalProps) => {
    const {data: statuses} = useGetMovieStatusQuery();
    const [createUpdateMovie] = useCreateUpdateMovieMutation();
    const {data: cinemas} = useGetCinemaQuery();

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: {errors},
        watch
    } = useForm<IMovieRequest>({
        defaultValues: {
            [EnumTableColum.ID]: editModal?.movie?.id ?? null,
            [EnumTableColum.TITLE]: editModal?.movie?.title ?? "",
            [EnumTableColum.GENRE]: editModal?.movie?.genre ?? "",
            [EnumTableColum.DURATION]: editModal?.movie?.duration ?? "",
            [EnumTableColum.RATING]: editModal?.movie?.rating ?? "",
            [EnumTableColum.RELEASE_DATE]: editModal?.movie?.releaseDate
                ? new Date(editModal.movie.releaseDate).toISOString().split("T")[0]
                : "",

            [EnumTableColum.DIRECTOR]: editModal?.movie?.director ?? "",
            [EnumTableColum.CAST]: editModal?.movie?.cast ?? "",
            [EnumTableColum.SYNOPSIS]: editModal?.movie?.synopsis ?? "",
            [EnumTableColum.TRAILER]: editModal?.movie?.trailer ?? "",
            [EnumTableColum.IMAGE]: $ok(editModal?.movie?.image) ? editModal?.movie?.image as File : null,
            [EnumSupabseColumn.CINEMA_ID]: $ok(editModal?.movie?.cinema?.id) ? Number(editModal?.movie?.cinema?.id) : null,
            [EnumSupabseColumn.MOVIE_STATUS_ID]: $ok(editModal?.movie?.status?.id) ? Number(editModal?.movie?.cinema?.id) : null
        },
    })
    const closeMovieModal = () => {
        setEditModal({show: false})
        reset()
    }
    const onSubmit = async (data: IMovieRequest) => {
        try {
            if (!data.image) {
                console.error("File not found")
                return
            }
            await createUpdateMovie({
                formData: ConvertFromObjToFormData(data),
                method: editModal?.movie?.id ? EnumMethod.PUT : EnumMethod.POST
            }).unwrap().then(() => {
                setToast({
                    show: true,
                    message: `Movie ${editModal?.movie?.id ? "updated" : "created"} successfully!`,
                    type: "success"
                })
                closeMovieModal()
            })
        } catch (err) {
            console.error(err)
        }
    }
    const previewImage = watch(EnumTableColum.IMAGE);
    return (
        <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-sm overflow-y-auto">
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}
                  className="bg-gray-900 rounded-lg shadow-md border border-gray-200 p-6 w-[50%]">
                {/* TITLE of Modal */}
                <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">{`${editModal?.movie ? `Editing Movie  (${editModal?.movie[EnumTableColum.TITLE]})` : "Create New Movie"}`}
                    </h2>
                    {
                        previewImage &&
                        <RenderImage src={previewImage} alt={`RenderImage previewImage`}/>
                    }
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Dropzone */}
                    <Controller
                        name={EnumTableColum.IMAGE}
                        control={control}
                        render={({field}) => (
                            <Dropzone
                                inputProps={{
                                    type: "file",
                                    ...register(EnumTableColum.IMAGE, {
                                        required: editModal?.movie?.id ? false : "Image is required", // ✅ only require if creating
                                    }),
                                }}
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
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
                    >
                        {`${editModal?.movie?.id ? "Update Movie" : "Create Movie"}`}
                    </button>
                    <button
                        type="button"
                        onClick={closeMovieModal}
                        className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors border border-gray-700"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
};

export default CreateEditMovieModal;