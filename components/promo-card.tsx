import Image from "next/image"
import { Button } from "@/components/ui/button"

interface PromoCardProps {
    title: string
    image: string
    link?: string
}

export function PromoCard({ title, image }: Readonly<PromoCardProps>) {
    return (
        <div className="group relative overflow-hidden rounded-xl bg-zinc-900 transition-all hover:scale-105">
            <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                    src={image || "/placeholder.svg"}
                    alt={title}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
                <h3 className="text-xl font-bold text-white leading-tight">{title}</h3>
                <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-black transition-colors bg-transparent"
                >
                    Learn More
                </Button>
            </div>
        </div>
    )
}
