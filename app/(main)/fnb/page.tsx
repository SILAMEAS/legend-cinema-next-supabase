import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FnbItemCard } from "@/components/fnb-item-card"

export default function FnbPage() {
  const categories = ["All", "Popcorn", "Drinks", "Snacks", "Combos"]

  const fnbItems = [
    {
      id: 1,
      name: "Classic Popcorn",
      description: "Freshly popped buttery popcorn, perfect for your movie experience",
      price: "$4.50",
      image: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=800&q=80",
      category: "Popcorn",
    },
    {
      id: 2,
      name: "Matcha Popcorn",
      description: "New! Delicious matcha-flavored popcorn for a unique taste",
      price: "$5.50",
      image: "https://images.unsplash.com/photo-1585238341710-4a8e9e1f1e1e?w=800&q=80",
      category: "Popcorn",
    },
    {
      id: 3,
      name: "Caramel Popcorn",
      description: "Sweet and crunchy caramel-coated popcorn",
      price: "$5.00",
      image: "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?w=800&q=80",
      category: "Popcorn",
    },
    {
      id: 4,
      name: "Coca-Cola",
      description: "Ice-cold Coca-Cola in large size",
      price: "$3.50",
      image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=800&q=80",
      category: "Drinks",
    },
    {
      id: 5,
      name: "Bottled Water",
      description: "Refreshing bottled water",
      price: "$2.00",
      image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&q=80",
      category: "Drinks",
    },
    {
      id: 6,
      name: "Tropical Cocktail",
      description: "Non-alcoholic tropical fruit cocktail with orange gradient",
      price: "$6.00",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
      category: "Drinks",
    },
    {
      id: 7,
      name: "Nachos with Cheese",
      description: "Crispy nachos served with warm cheese sauce",
      price: "$5.50",
      image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=800&q=80",
      category: "Snacks",
    },
    {
      id: 8,
      name: "Hot Dog",
      description: "Classic hot dog with your choice of toppings",
      price: "$4.50",
      image: "https://images.unsplash.com/photo-1612392062798-2dbaa2c2c993?w=800&q=80",
      category: "Snacks",
    },
    {
      id: 9,
      name: "French Fries",
      description: "Golden crispy french fries, lightly salted",
      price: "$4.00",
      image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=80",
      category: "Snacks",
    },
    {
      id: 10,
      name: "Movie Combo",
      description: "Large popcorn + Large drink + Nachos",
      price: "$12.00",
      image: "https://images.unsplash.com/photo-1585238341710-4a8e9e1f1e1e?w=800&q=80",
      category: "Combos",
    },
    {
      id: 11,
      name: "Family Combo",
      description: "2 Large popcorns + 4 Drinks + 2 Hot dogs",
      price: "$25.00",
      image: "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?w=800&q=80",
      category: "Combos",
    },
    {
      id: 12,
      name: "Gold Class Combo",
      description: "Premium popcorn + Cocktail + Gourmet snacks",
      price: "$18.00",
      image: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=800&q=80",
      category: "Combos",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <section className="py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Food & Beverage</h1>
          <p className="text-zinc-400 mb-8 text-lg">
            Enhance your movie experience with our delicious snacks and refreshing drinks
          </p>

          {/* Category Filter */}
          <div className="flex gap-3 mb-12 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-full border-2 transition-colors whitespace-nowrap ${
                  category === "All"
                    ? "border-red-600 bg-red-600/10 text-red-500"
                    : "border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {fnbItems.map((item) => (
              <FnbItemCard
                key={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                category={item.category}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
