import Image from "next/image"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

interface OfferCardProps {
    title: string
    description: string
    image: string
    validUntil?: string
    discount?: string
}

export function OfferCard({ title, description, image, validUntil, discount }: OfferCardProps) {
    return (
        <div className="group relative overflow-hidden rounded-xl bg-zinc-900 transition-all hover:scale-105">
            <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                    src={image || "/placeholder.svg"}
                    alt={title}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                />
                {discount && (
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold text-lg">
                        {discount}
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                <h3 className="text-2xl font-bold text-white leading-tight">{title}</h3>
                <p className="text-zinc-300 text-sm line-clamp-2">{description}</p>

                {validUntil && (
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <Calendar className="w-4 h-4" />
                        <span>Valid until {validUntil}</span>
                    </div>
                )}

                <Button className="w-full bg-red-600 hover:bg-red-700 text-white mt-4">Get Offer</Button>
            </div>
        </div>
    )
}
