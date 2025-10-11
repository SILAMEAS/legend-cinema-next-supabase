"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
    {
        image: "https://coolbeans.sgp1.digitaloceanspaces.com/legend-cinema-prod/e4996ca9-03d4-4a65-8374-10ee99c5be23.jpeg",
        alt: "Movie promotion banner 1",
    },
    {
        image: "https://coolbeans.sgp1.digitaloceanspaces.com/legend-cinema-prod/5fc3097e-92d6-40a9-ad08-57da9cf79ece.jpeg",
        alt: "Movie promotion banner 2",
    },
    {
        image: "https://coolbeans.sgp1.digitaloceanspaces.com/legend-cinema-prod/bab652d6-8f39-42d8-98c5-2661fc0a3bdd.jpeg",
        alt: "Movie promotion banner 3",
    },
    {
        image: "https://coolbeans.sgp1.digitaloceanspaces.com/legend-cinema-prod/0ee58116-137c-4301-a9dd-875bb7d74bd9.jpeg",
        alt: "Movie promotion banner 4",
    },
    {
        image: "https://coolbeans.sgp1.digitaloceanspaces.com/legend-cinema-prod/c4d845c4-8144-4aff-8a05-7cee65183da3.jpeg",
        alt: "Movie promotion banner 5",
    },
]

export function HeroCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 5000)

        return () => clearInterval(timer)
    }, [])

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    }

    return (
        <section className="relative w-full h-[500px] overflow-hidden bg-black">
            {/* Slides */}
            <div className="relative w-full h-full">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-700 ${
                            index === currentSlide ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <Image
                            src={slide.image || "/placeholder.svg"}
                            alt={slide.alt}
                            fill
                            className="object-cover"
                            priority={index === 0}
                        />
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                aria-label="Next slide"
            >
                <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 rounded-full transition-all ${
                            index === currentSlide ? "w-8 bg-red-600" : "w-2 bg-white/50 hover:bg-white/70"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    )
}
