"use client"
import {Header} from "@/components/header"
import {Footer} from "@/components/footer"
import {CinemaCard} from "@/components/cinema-card"
import {useGetCinemaQuery} from "@/redux/services/cinema/cinema";
import LoadingSkeleton from "@/app/loadingSkeleton";

export default function CinemasPage() {
    const {currentData, isLoading} = useGetCinemaQuery();
    return (
        <div className="min-h-screen bg-black text-white">
            <Header/>

            <section className="py-8 md:py-16">
                <div className="container mx-auto px-4 md:px-6">
                    <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">Our Cinemas</h1>
                    <p className="text-zinc-400 mb-8 md:mb-12 text-base md:text-lg">
                        Find a Legend Cinema near you and experience premium movie entertainment
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                        {
                            isLoading ? <LoadingSkeleton/> : currentData?.contents?.map((cinema) => (
                                <CinemaCard
                                    key={cinema.id}
                                    name={cinema.name}
                                    address={cinema.address}
                                    phone={cinema.phone}
                                    hours={cinema.hours}
                                    image={cinema.image}
                                />
                            ))}
                    </div>
                </div>
            </section>

            <Footer/>
        </div>
    )
}
