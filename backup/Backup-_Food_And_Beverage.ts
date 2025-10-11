import {_tb_food_and_beverage} from "@/utils/api/type-from-tb/_tb_food_and_beverage";

export const Backup_Food_And_Beverage: Array<_tb_food_and_beverage> = [
    {
        id: 1,
        name: "Classic Popcorn",
        description: "Freshly popped buttery popcorn, perfect for your movie experience",
        price: 4.50,
        image: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=800&q=80",
        category: {name: "Popcorn"},
    },
    {
        id: 2,
        name: "Matcha Popcorn",
        description: "New! Delicious matcha-flavored popcorn for a unique taste",
        price: 5.50,
        image: "https://images.unsplash.com/photo-1585238341710-4a8e9e1f1e1e?w=800&q=80",
        category: {name: "Popcorn"},
    },
    {
        id: 3,
        name: "Caramel Popcorn",
        description: "Sweet and crunchy caramel-coated popcorn",
        price: 5.00,
        image: "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?w=800&q=80",
        category: {name: "Popcorn"},
    },
    {
        id: 4,
        name: "Coca-Cola",
        description: "Ice-cold Coca-Cola in large size",
        price: 3.50,
        image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=800&q=80",
        category: {name: "Drinks"},
    },
    {
        id: 5,
        name: "Bottled Water",
        description: "Refreshing bottled water",
        price: 2.00,
        image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&q=80",
        category: {name: "Drinks"},
    },
    {
        id: 6,
        name: "Tropical Cocktail",
        description: "Non-alcoholic tropical fruit cocktail with orange gradient",
        price: 6.00,
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
        category: {name: "Drinks"},
    },
    {
        id: 7,
        name: "Nachos with Cheese",
        description: "Crispy nachos served with warm cheese sauce",
        price: 5.50,
        image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=800&q=80",
        category: {name: "Snacks"},
    },
    {
        id: 8,
        name: "Hot Dog",
        description: "Classic hot dog with your choice of toppings",
        price: 4.50,
        image: "https://images.unsplash.com/photo-1612392062798-2dbaa2c2c993?w=800&q=80",
        category: {name: "Snacks"},
    },
    {
        id: 9,
        name: "French Fries",
        description: "Golden crispy french fries, lightly salted",
        price: 4.00,
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=80",
        category: {name: "Snacks"},
    },
    {
        id: 10,
        name: "Movie Combo",
        description: "Large popcorn + Large drink + Nachos",
        price: 12.00,
        image: "https://images.unsplash.com/photo-1585238341710-4a8e9e1f1e1e?w=800&q=80",
        category: {name: "Combos"},
    },
    {
        id: 11,
        name: "Family Combo",
        description: "2 Large popcorns + 4 Drinks + 2 Hot dogs",
        price: 25.00,
        image: "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?w=800&q=80",
        category: {name: "Combos"},
    },
    {
        id: 12,
        name: "Gold Class Combo",
        description: "Premium popcorn + Cocktail + Gourmet snacks",
        price: 18.00,
        image: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=800&q=80",
        category: {name: "Combos"},
    },
]

/**
 * use this :   <button onClick={async ()=>   await _insertFoodAndBeverage(Backup_Food_And_Beverage)}>insert data</button>
 * */