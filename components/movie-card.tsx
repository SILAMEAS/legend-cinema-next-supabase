import Image from "next/image"
import {Clock, Star} from "lucide-react"
import {Button} from "@/components/ui/button"
import {formatDate} from "@/utils/commons/formatDate";

interface MovieCardProps {
    title: string
    image: string
    rating?: string
    duration?: string
    genre?: string,
    dateShowing?: string
}

export function MovieCard({title, image, rating, duration, genre, dateShowing}: Readonly<MovieCardProps>) {
    return (
        <div
            className="group relative overflow-hidden rounded-lg bg-zinc-900 transition-all hover:scale-105 hover:shadow-xl hover:shadow-red-900/20">
            {/* Movie Poster */}
            <div className="relative aspect-[2/3] overflow-hidden">
                <Image
                    src={image || "/placeholder.svg"}
                    alt={title}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                />
                {/* Overlay on hover */}
                <div
                    className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 space-y-2 md:space-y-3">
                        {duration && (
                            <div className="flex items-center gap-2 text-xs md:text-sm text-zinc-300">
                                <Clock className="w-3 h-3 md:w-4 md:h-4"/>
                                <span>{duration}</span>
                            </div>
                        )}
                        {genre && <div className="text-xs md:text-sm text-zinc-400">{genre}</div>}
                        {dateShowing &&
                            <div className="text-xs md:text-sm text-zinc-400">{formatDate(dateShowing).day}</div>}
                        <Button className="w-full bg-red-600 hover:bg-red-700 text-white text-xs md:text-sm py-2">Book
                            Now</Button>
                    </div>
                </div>
            </div>

            <div className="p-3 md:p-4">
                <h3 className="font-semibold text-white line-clamp-2 mb-2 text-sm md:text-base">{title}</h3>
                {rating && (
                    <div className="flex items-center gap-1 text-amber-400">
                        <Star className="w-3 h-3 md:w-4 md:h-4 fill-current"/>
                        <span className="text-xs md:text-sm font-medium">{rating}</span>
                    </div>
                )}
            </div>
        </div>
    )
}
