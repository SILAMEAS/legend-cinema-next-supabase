import {_tb_promotion} from "@/utils/api/supabase_tb/_tb_promotion";

export const BackupPromotion: Array<_tb_promotion> = [
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
];

/**
 * use this :   <button onClick={async ()=> await _insertPromotions(BackupPromotion)}>insert data</button>
 * */