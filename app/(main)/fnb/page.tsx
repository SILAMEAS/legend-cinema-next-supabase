import {Header} from "@/components/header"
import {Footer} from "@/components/footer"
import {FnbItemCard} from "@/components/fnb-item-card"
import {_getFoodAndBeverages} from "@/utils/api/__foodAndBeverage";

export default async function FnbPage() {
  const categories = ["All", "Popcorn", "Drinks", "Snacks", "Combos"];
  const fnbItems = await _getFoodAndBeverages();

  return (
      <div className="min-h-screen bg-black text-white">
        <Header />

        <section className="py-8 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">Food & Beverage</h1>
            <p className="text-zinc-400 mb-6 md:mb-8 text-base md:text-lg">
              Enhance your movie experience with our delicious snacks and refreshing drinks
            </p>

            <div className="flex gap-2 md:gap-3 mb-8 md:mb-12 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                  <button
                      key={category}
                      className={`px-4 md:px-6 py-2 rounded-full border-2 transition-colors whitespace-nowrap text-sm md:text-base ${
                          category === "All"
                              ? "border-red-600 bg-red-600/10 text-red-500"
                              : "border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white"
                      }`}
                  >
                    {category}
                  </button>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {fnbItems?.data?.map((item) => (
                  <FnbItemCard
                      key={item.id}
                      name={item.name}
                      description={item.description}
                      price={item.price}
                      image={item.image}
                      category={item.category.name}
                  />
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
  )
}
