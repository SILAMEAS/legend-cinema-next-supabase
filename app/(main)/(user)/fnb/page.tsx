"use client"
import {Header} from "@/components/header"
import {Footer} from "@/components/footer"
import {useQueryParams} from "@/utils/hooks/useQueryParams";
import {EnumSearchQuery} from "@/utils/enum/EnumSearchQuery";
import React from "react";
import {FnbItemCard} from "@/components/fnb-item-card";
import {useGetCategoryQuery} from "@/redux/services/category/category";
import {useGetFoodAndBeverageQuery} from "@/redux/services/food_and_beverage/food_and_beverage";
import LoadingSkeleton from "@/app/loadingSkeleton";

export default function FnbPage() {
    const {getParam, setParam} = useQueryParams();
    const categoryParam = getParam(EnumSearchQuery.CATEGORY) ?? "all";
    const {currentData: categories, isLoading: loadingCategory} = useGetCategoryQuery();
    const {currentData: fnbItems, isLoading:loadingFnbItems, isFetching:fetchingFnbItems} = useGetFoodAndBeverageQuery({
        categoryName: getParam(EnumSearchQuery.CATEGORY) ?? "all"
    }, {
        refetchOnFocus: true
    });
    return (
        <div className="min-h-screen bg-black text-white">
            <Header/>

            <section className="py-8 md:py-16">
                <div className="container mx-auto px-4 md:px-6">
                    <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">Food & Beverage</h1>
                    <p className="text-zinc-400 mb-6 md:mb-8 text-base md:text-lg">
                        Enhance your movie experience with our delicious snacks and refreshing drinks
                    </p>

                    <div>
                        {/* Categories List */}
                        <div className="flex gap-2 md:gap-3 mb-8 md:mb-12 overflow-x-auto pb-2 scrollbar-hide">
                            {categories?.contents?.map((category) => {
                                const isSelected = category.name.toLowerCase() === categoryParam.toLowerCase();
                                return (
                                    <button
                                        key={category.id}
                                        onClick={() => setParam(EnumSearchQuery.CATEGORY, category.name)}
                                        className={`px-4 md:px-6 py-2 rounded-full border-2 transition-colors whitespace-nowrap text-sm md:text-base
                ${isSelected ? "border-red-600 bg-red-600/10 text-red-500" : "border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white"}
                ${isSelected && loadingCategory ? "opacity-50 cursor-wait" : ""}
              `}
                                        disabled={isSelected && loadingCategory} // prevent double click
                                    >
                                        {isSelected && loadingCategory ? "Loading..." : category.name}
                                    </button>
                                );
                            })}
                        </div>

                        {/* FNB Items Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                            {(fetchingFnbItems || loadingFnbItems)
                                ? <LoadingSkeleton ArrayLength={9}/>
                                : fnbItems?.contents?.map((item) => (
                                    <FnbItemCard
                                        key={item.id}
                                        name={item.name}
                                        description={item.description}
                                        price={item.price}
                                        image={item.image}
                                        category={item.category?.name ?? "Unknown"}
                                    />
                                ))}
                        </div>
                    </div>

                </div>
            </section>

            <Footer/>
        </div>
    )
}
