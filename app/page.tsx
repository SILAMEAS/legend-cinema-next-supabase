"use client"
import {Header} from "@/components/header"
import {Footer} from "@/components/footer"
import {HeroCarousel} from "@/components/hero-carousel"
import {MovieCard} from "@/components/movie-card"
import {PromoCard} from "@/components/promo-card"
import {useGetListDateShowingQuery, useGetMovieQuery} from "@/redux/services/movie/movie";
import {useGetPromotionQuery} from "@/redux/services/promotion/promotion";
import LoadingSkeleton from "@/app/loadingSkeleton";
import {EnumTableColum} from "@/utils/enum/EnumTableColum";
import {compareDate, formatDate} from "@/utils/commons/formatDate";
import {useAppSelector} from "@/redux/hooks";
import {EnumSort} from "@/utils/enum/EnumSort";
import {PAGE_SIZE} from "@/utils/constants/constants";
import {useEffect, useState} from "react";

export default function Home() {
    const movieRedux= useAppSelector(state => state.counter.movie);
    const cinema= useAppSelector(state => state.counter.cinema);
    const {currentData: dates,isLoading: datesLoading} = useGetListDateShowingQuery({
        pageSize:PAGE_SIZE,
        orderBy:EnumTableColum.CREATED_AT,
        orderDirection:EnumSort.DESC
    });
    /** state */
    const [selectedDate, setSelectedDate] = useState<string|undefined>(undefined);
    const cinemaId=cinema?.selected?.split("_")[0]??undefined;
    const { data: movies, isLoading: moviesLoading } = useGetMovieQuery(
        {
            search: movieRedux?.search,
            searchColumn: EnumTableColum.TITLE,
            date: selectedDate,
            cinemaId:cinemaId,
        },
        {
            refetchOnMountOrArgChange: false,
            refetchOnReconnect: false,
            refetchOnFocus: false,
            skip: !selectedDate, // prevent fetch until date ready
        }
    );
    const {currentData: promotion, isLoading: promotionLoading} = useGetPromotionQuery();

    useEffect(()=>{
        if(dates?.contents){
            setSelectedDate(dates?.contents[0][EnumTableColum.DATE_SHOWING]);
        }
    },[dates])
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

                    <div className="flex gap-3 md:gap-4 mb-8 md:mb-12 overflow-x-auto pb-2 scrollbar-hide h-30">
                        {datesLoading?<LoadingSkeleton height={30}/>:dates?.contents?.map((date, index) => (
                            <button
                                key={index}
                                className={`flex flex-col items-center justify-center px-6 md:px-8 py-3 md:py-4 rounded-lg border-2 transition-colors flex-shrink-0 ${
                                    selectedDate&& compareDate({dateInput1:date[EnumTableColum.DATE_SHOWING],dateInput2:selectedDate}) ? "border-red-600 bg-red-600/10" : "border-zinc-800 hover:border-zinc-700"
                                }`}
                                onClick={() => setSelectedDate(date[EnumTableColum.DATE_SHOWING])}
                            >
                                <div
                                    className="text-xs text-zinc-400 mb-1">{formatDate(date[EnumTableColum.DATE_SHOWING]).weekday}</div>
                                <div
                                    className="text-xl md:text-2xl font-bold">{formatDate(date[EnumTableColum.DATE_SHOWING]).day}</div>
                                <div
                                    className="text-xs text-zinc-400 mt-1">{formatDate(date[EnumTableColum.DATE_SHOWING]).month}</div>
                            </button>
                        ))}
                    </div>

                    <div
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                        {
                            moviesLoading ? <LoadingSkeleton ArrayLength={9}/> :
                                movies?.contents?.map((movie) => (
                                    <MovieCard
                                        key={movie.id}
                                        title={movie.title}
                                        image={movie.image}
                                        rating={movie.rating}
                                        duration={movie.duration}
                                        genre={movie.genre}
                                        dateShowing={movie[EnumTableColum.DATE_SHOWING]}
                                    />
                                ))
                        }
                    </div>
                </div>
            </section>

            {/* What's New Section */}
            <section className="py-12 md:py-16 bg-zinc-950">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">What is new?</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {promotionLoading ? <LoadingSkeleton/> :
                            promotion?.contents?.map((promo) => (
                                <PromoCard key={promo.id} title={promo.title} image={promo.image}/>
                            ))}
                    </div>
                </div>
            </section>

            <Footer/>
        </div>
    )
}