import {IBannerResponse} from "@/redux/services/banner/type";
import {EnumTableColum} from "@/utils/enum/EnumTableColum";

export const BackupBanners: Array<IBannerResponse> = [
    {
        id: 1,
        image: "https://coolbeans.sgp1.digitaloceanspaces.com/legend-cinema-prod/e4996ca9-03d4-4a65-8374-10ee99c5be23.jpeg",
        alt: "Movie promotion banner 1",
        [EnumTableColum.ACTIVE]: true,
        [EnumTableColum.LINK]: "/",
        [EnumTableColum.ORDER]: 0
    },
    {
        id: 2,
        image: "https://coolbeans.sgp1.digitaloceanspaces.com/legend-cinema-prod/5fc3097e-92d6-40a9-ad08-57da9cf79ece.jpeg",
        alt: "Movie promotion banner 2",
        [EnumTableColum.ACTIVE]: true,
        [EnumTableColum.LINK]: "/",
        [EnumTableColum.ORDER]: 1
    },
    {
        id: 3,
        image: "https://coolbeans.sgp1.digitaloceanspaces.com/legend-cinema-prod/bab652d6-8f39-42d8-98c5-2661fc0a3bdd.jpeg",
        alt: "Movie promotion banner 3",
        [EnumTableColum.ACTIVE]:true,
        [EnumTableColum.LINK]:"/",
        [EnumTableColum.ORDER]: 2
    },
    {
        id: 4,
        image: "https://coolbeans.sgp1.digitaloceanspaces.com/legend-cinema-prod/0ee58116-137c-4301-a9dd-875bb7d74bd9.jpeg",
        alt: "Movie promotion banner 4",
        [EnumTableColum.ACTIVE]:true,
        [EnumTableColum.LINK]:"/",
        [EnumTableColum.ORDER]: 3
    },
    {
        id: 5,
        image: "https://coolbeans.sgp1.digitaloceanspaces.com/legend-cinema-prod/c4d845c4-8144-4aff-8a05-7cee65183da3.jpeg",
        alt: "Movie promotion banner 5",
        [EnumTableColum.ACTIVE]:true,
        [EnumTableColum.LINK]:"/",
        [EnumTableColum.ORDER]: 4
    },
];

/**
 * use this :   <button onClick={async ()=> await _insertBanners(BackupPromotion)}>insert data</button>
 * */