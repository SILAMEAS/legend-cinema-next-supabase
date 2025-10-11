import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CinemaCard } from "@/components/cinema-card"

export default function CinemasPage() {
    const cinemas = [
        {
            id: 1,
            name: "Legend Cinema Phnom Penh",
            address: "Vattanac Capital Mall, Level 5, Phnom Penh",
            phone: "+855 23 969 696",
            hours: "10:00 AM - 11:00 PM",
            image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80",
        },
        {
            id: 2,
            name: "Legend Cinema Toul Kork",
            address: "Chip Mong 271 Mega Mall, Level 4, Toul Kork",
            phone: "+855 23 969 697",
            hours: "10:00 AM - 11:00 PM",
            image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&q=80",
        },
        {
            id: 3,
            name: "Legend Cinema Aeon Mall",
            address: "Aeon Mall Sen Sok City, Level 3, Sen Sok",
            phone: "+855 23 969 698",
            hours: "10:00 AM - 11:00 PM",
            image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80",
        },
        {
            id: 4,
            name: "Legend Cinema Siem Reap",
            address: "Lucky Mall, Level 2, Siem Reap",
            phone: "+855 63 969 699",
            hours: "10:00 AM - 11:00 PM",
            image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&q=80",
        },
    ]

    return (
        <div className="min-h-screen bg-black text-white">
            <Header />

            <section className="py-8 md:py-16">
                <div className="container mx-auto px-4 md:px-6">
                    <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">Our Cinemas</h1>
                    <p className="text-zinc-400 mb-8 md:mb-12 text-base md:text-lg">
                        Find a Legend Cinema near you and experience premium movie entertainment
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                        {cinemas.map((cinema) => (
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

            <Footer />
        </div>
    )
}
