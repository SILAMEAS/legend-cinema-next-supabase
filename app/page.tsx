"use client"
import {Header} from "@/components/header"
import {Footer} from "@/components/footer"
import {HeroCarousel} from "@/components/hero-carousel"
import {MovieCard} from "@/components/movie-card"
import {PromoCard} from "@/components/promo-card"
import {useGetMovieQuery} from "@/redux/services/movie/movie";
import {useGetPromotionQuery} from "@/redux/services/promotion/promotion";

export default function Home() {
    const dates = [
        {day: "Today", date: "10", month: "Oct"},
        {day: "Sat", date: "11", month: "Oct"},
        {day: "Sun", date: "12", month: "Oct"},
        {day: "Mon", date: "13", month: "Oct"},
        {day: "Tue", date: "14", month: "Oct"},
    ];
    const {currentData: movies} = useGetMovieQuery({});
    const {currentData: promotion}=useGetPromotionQuery();
    return (
        <div className="min-h-screen bg-black text-white">
            <Header/>

            {/* Hero Section */}
            <HeroCarousel/>

            {/* Now Showing Section */}
            <section className="py-8 md:py-12">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold">Now Showing</h2>
                        <span className="text-zinc-600">|</span>
                        <button className="text-zinc-400 hover:text-white text-lg md:text-xl">Coming Soon</button>
                    </div>

                    <div className="flex gap-3 md:gap-4 mb-8 md:mb-12 overflow-x-auto pb-2 scrollbar-hide">
                        {dates.map((date, index) => (
                            <button
                                key={index}
                                className={`flex flex-col items-center justify-center px-6 md:px-8 py-3 md:py-4 rounded-lg border-2 transition-colors flex-shrink-0 ${
                                    index === 0 ? "border-red-600 bg-red-600/10" : "border-zinc-800 hover:border-zinc-700"
                                }`}
                            >
                                <div className="text-xs text-zinc-400 mb-1">{date.day}</div>
                                <div className="text-xl md:text-2xl font-bold">{date.date}</div>
                                <div className="text-xs text-zinc-400 mt-1">{date.month}</div>
                            </button>
                        ))}
                    </div>

                    <div
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                        {movies?.contents?.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                title={movie.title}
                                image={movie.image}
                                rating={movie.rating}
                                duration={movie.duration}
                                genre={movie.genre}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* What's New Section */}
            <section className="py-12 md:py-16 bg-zinc-950">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">What is new?</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {promotion?.contents?.map((promo) => (
                            <PromoCard key={promo.id} title={promo.title} image={promo.image}/>
                        ))}
                    </div>
                </div>
            </section>

            <Footer/>
        </div>
    )
}