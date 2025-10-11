import Image from "next/image"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FnbItemCardProps {
    name: string
    description: string
    price: string
    image: string
    category: string
}

export function FnbItemCard({ name, description, price, image, category }: FnbItemCardProps) {
    return (
        <div className="group relative overflow-hidden rounded-xl bg-zinc-900 transition-all hover:scale-105">
            <div className="relative aspect-square overflow-hidden">
                <Image
                    src={image || "/placeholder.svg"}
                    alt={name}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {category}
                </div>
            </div>

            <div className="p-5 space-y-3">
                <div>
                    <h3 className="text-lg font-bold text-white mb-1">{name}</h3>
                    <p className="text-sm text-zinc-400 line-clamp-2">{description}</p>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-red-500">{price}</span>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                        <Plus className="w-4 h-4 mr-1" />
                        Add
                    </Button>
                </div>
            </div>
        </div>
    )
}
