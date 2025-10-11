import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroCarousel } from "@/components/hero-carousel"
import { MovieCard } from "@/components/movie-card"
import { PromoCard } from "@/components/promo-card"

export default function Home() {
  const dates = [
    { day: "Today", date: "10", month: "Oct" },
    { day: "Sat", date: "11", month: "Oct" },
    { day: "Sun", date: "12", month: "Oct" },
    { day: "Mon", date: "13", month: "Oct" },
    { day: "Tue", date: "14", month: "Oct" },
  ]

  const movies = [
    {
      id: 1,
      title: "Venom: The Last Dance",
      image: "https://image.tmdb.org/t/p/w500/aosm8NMQ3UyoBVpSxyimorCQykC.jpg",
      rating: "7.2",
      duration: "109 min",
      genre: "Action, Sci-Fi",
    },
    {
      id: 2,
      title: "Terrifier 3",
      image: "https://image.tmdb.org/t/p/w500/7NDHoebflLwL1CcgLJ9wZbbDrmV.jpg",
      rating: "6.8",
      duration: "125 min",
      genre: "Horror, Thriller",
    },
    {
      id: 3,
      title: "Smile 2",
      image: "https://image.tmdb.org/t/p/w500/aE85MnPIsSoSs3978Noo16BRsKN.jpg",
      rating: "7.1",
      duration: "132 min",
      genre: "Horror, Mystery",
    },
    {
      id: 4,
      title: "The Wild Robot",
      image: "https://image.tmdb.org/t/p/w500/wTnV3PCVW5O92JMrFvvrRcV39RU.jpg",
      rating: "8.5",
      duration: "102 min",
      genre: "Animation, Family",
    },
    {
      id: 5,
      title: "Joker: Folie à Deux",
      image: "https://image.tmdb.org/t/p/w500/if8QiqCI7WAGImKcJCfzp6VTyKA.jpg",
      rating: "5.7",
      duration: "138 min",
      genre: "Drama, Thriller",
    },
    {
      id: 6,
      title: "Transformers One",
      image: "https://image.tmdb.org/t/p/w500/qbkAqmmEIZfrCO8ZQAuIuVMlWoV.jpg",
      rating: "8.1",
      duration: "104 min",
      genre: "Animation, Action",
    },
    {
      id: 7,
      title: "Beetlejuice Beetlejuice",
      image: "https://image.tmdb.org/t/p/w500/kKgQzkUCnQmeTPkyIwHly2t6ZFI.jpg",
      rating: "7.2",
      duration: "105 min",
      genre: "Comedy, Fantasy",
    },
    {
      id: 8,
      title: "The Substance",
      image: "https://image.tmdb.org/t/p/w500/lqoMzCcZYEFK729d6qzt349fB4o.jpg",
      rating: "7.3",
      duration: "140 min",
      genre: "Horror, Sci-Fi",
    },
  ]

  const promos = [
    {
      id: 1,
      title: "Khmer New Year Combo",
      image:
          "https://coolbeans.sgp1.digitaloceanspaces.com/legend-cinema-prod/4e18d9e9-e303-4cf3-a0fd-8cc65e3e7862.jpeg",
    },
    {
      id: 2,
      title:
          "Try our new Matcha Popcorn at Legend Cinema! Make your movie time even more delightful with this delicious treat.",
      image:
          "https://coolbeans.sgp1.digitaloceanspaces.com/legend-cinema-prod/a7e9854e-dea4-4c14-a1f8-5e6ae2adfca7.jpeg",
    },
    {
      id: 3,
      title:
          "Become a Legend Diamond Member Unlock a world of exclusivity and premium privileges by becoming a Legend Diamond Member",
      image:
          "https://coolbeans.sgp1.digitaloceanspaces.com/legend-cinema-prod/24f5e3a1-3c99-4544-90d5-0f77be765276.jpeg",
    },
    {
      id: 4,
      title: "Let's enjoy the special price from Legend Toul Kork Cinema!",
      image:
          "https://coolbeans.sgp1.digitaloceanspaces.com/legend-cinema-prod/5bb25e91-4c54-4dc4-acbb-a1c6f7474c9d.jpeg",
    },
    {
      id: 5,
      title: "Special price for students and senior citizen. Applicable on week days, weekends and public Holiday",
      image:
          "https://coolbeans.sgp1.digitaloceanspaces.com/legend-cinema-prod/42704358-5548-4d22-aab5-023fe818d6a7.jpeg",
    },
  ]

  return (
      <div className="min-h-screen bg-black text-white">
        <Header />

        {/* Hero Section */}
        <HeroCarousel />

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

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
              {movies.map((movie) => (
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
              {promos.map((promo) => (
                  <PromoCard key={promo.id} title={promo.title} image={promo.image} />
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
  )
}