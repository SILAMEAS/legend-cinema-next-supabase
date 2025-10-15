"use client"

import {useEffect, useState} from "react"
import Image from "next/image"
import {ChevronLeft, ChevronRight} from "lucide-react"
import useFetchData from "@/utils/hooks/useFetchData";
import {_getBanners} from "@/utils/api/__banner";


export function HeroCarousel() {
    const {data: slides} = useFetchData({
        fetcher: _getBanners
    })
    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 5000)

        return () => clearInterval(timer)
    }, [slides.length])

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    }

    return (
        <section className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] overflow-hidden bg-black">
            {/* Slides */}
            <div className="relative w-full h-full">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id+slide.alt}
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
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-white"/>
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                aria-label="Next slide"
            >
                <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-white"/>
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-3 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-1.5 md:h-2 rounded-full transition-all ${
                            index === currentSlide ? "w-6 md:w-8 bg-red-600" : "w-1.5 md:w-2 bg-white/50 hover:bg-white/70"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    )
}
