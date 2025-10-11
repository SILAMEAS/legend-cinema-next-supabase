import Image from "next/image"
import { MapPin, Phone, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CinemaCardProps {
    name: string
    address: string
    phone: string
    hours: string
    image: string
}

export function CinemaCard({ name, address, phone, hours, image }: CinemaCardProps) {
    return (
        <div className="group relative overflow-hidden rounded-xl bg-zinc-900 transition-all hover:scale-105">
            <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                    src={image || "/placeholder.svg"}
                    alt={name}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                <h3 className="text-2xl font-bold text-white">{name}</h3>

                <div className="space-y-2 text-sm text-zinc-300">
                    <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>{address}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 flex-shrink-0" />
                        <span>{phone}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 flex-shrink-0" />
                        <span>{hours}</span>
                    </div>
                </div>

                <Button className="w-full bg-red-600 hover:bg-red-700 text-white mt-4">View Showtimes</Button>
            </div>
        </div>
    )
}
