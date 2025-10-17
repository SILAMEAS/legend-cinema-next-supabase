import {IOfferResponse} from "@/redux/services/offer/type";

export const BackupOffer: Array<IOfferResponse> = [
    {
        id: 1,
        title: "Student Discount",
        description: "Special price for students. Show your student ID and enjoy movies at discounted rates!",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
        validUntil: "Dec 31, 2024",
        discount: "20% OFF",
    },
    {
        id: 2,
        title: "Senior Citizen Special",
        description: "Exclusive pricing for senior citizens. Applicable on weekdays, weekends and public holidays.",
        image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80",
        validUntil: "Dec 31, 2024",
        discount: "25% OFF",
    },
    {
        id: 3,
        title: "Weekday Special",
        description: "Enjoy special pricing on all movies from Monday to Thursday. Perfect for mid-week entertainment!",
        image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&q=80",
        validUntil: "Ongoing",
        discount: "15% OFF",
    },
    {
        id: 4,
        title: "Gold Class Package",
        description: "Premium movie experience with welcome drink, gourmet snacks, and luxury seating.",
        image: "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?w=800&q=80",
        validUntil: "Limited Time",
    },
    {
        id: 5,
        title: "Family Bundle",
        description: "4 tickets + 2 large popcorns + 4 drinks. Perfect for family movie nights!",
        image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80",
        validUntil: "Dec 31, 2024",
        discount: "30% OFF",
    },
    {
        id: 6,
        title: "Diamond Member Exclusive",
        description: "Unlock premium privileges, priority booking, and exclusive discounts as a Diamond Member.",
        image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80",
        validUntil: "Ongoing",
    },
];

/**
 * use this :   <button onClick={async ()=> await _insertPromotions(BackupPromotion)}>insert data</button>
 * */