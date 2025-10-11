import Image from "next/image"
import { Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MovieCardProps {
    title: string
    image: string
    rating?: string
    duration?: string
    genre?: string
}

export function MovieCard({ title, image, rating, duration, genre }: MovieCardProps) {
    return (
        <div className="group relative overflow-hidden rounded-lg bg-zinc-900 transition-all hover:scale-105 hover:shadow-xl hover:shadow-red-900/20">
            {/* Movie Poster */}
            <div className="relative aspect-[2/3] overflow-hidden">
                <Image
                    src={image || "/placeholder.svg"}
                    alt={title}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
                        {duration && (
                            <div className="flex items-center gap-2 text-sm text-zinc-300">
                                <Clock className="w-4 h-4" />
                                <span>{duration}</span>
                            </div>
                        )}
                        {genre && <div className="text-sm text-zinc-400">{genre}</div>}
                        <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Book Now</Button>
                    </div>
                </div>
            </div>

            {/* Movie Info */}
            <div className="p-4">
                <h3 className="font-semibold text-white line-clamp-2 mb-2">{title}</h3>
                {rating && (
                    <div className="flex items-center gap-1 text-amber-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">{rating}</span>
                    </div>
                )}
            </div>
        </div>
    )
}
