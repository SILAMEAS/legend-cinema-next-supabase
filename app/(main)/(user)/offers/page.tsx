"use client"
import {Header} from "@/components/header"
import {Footer} from "@/components/footer"
import {OfferCard} from "@/components/offer-card"
import Loading from "@/app/loading";
import {useGetOfferQuery} from "@/redux/services/offer/offer";

export default function OffersPage() {

    const {currentData: offers, isLoading: loading} = useGetOfferQuery();

    return (
        <div className="min-h-screen bg-black text-white">
            <Header/>

            <section className="py-8 md:py-16">
                <div className="container mx-auto px-4 md:px-6">
                    <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">Special Offers</h1>
                    <p className="text-zinc-400 mb-8 md:mb-12 text-base md:text-lg">
                        Discover amazing deals and exclusive promotions for your next movie experience
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {loading ? <Loading/> : offers?.contents?.map((offer) => (
                            <OfferCard
                                key={offer.id}
                                title={offer.title}
                                description={offer.description}
                                image={offer.image}
                                validUntil={offer.validUntil}
                                discount={offer.discount}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <Footer/>
        </div>
    )
}
