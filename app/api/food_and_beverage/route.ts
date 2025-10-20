import {EnumTableName} from "@/utils/enum/EnumTable";
import {getPaginationParams} from "@/utils/commons/getPaginationParams";
import {fetchPaginatedData} from "@/utils/commons/fetchPaginatedData";
import {EnumTableColum} from "@/utils/enum/EnumTableColum";
import {EnumOperator} from "@/utils/enum/EnumOperator";
import {ANY} from "@/utils/commons/type";


export async function GET(request: Request) {
    try {
        const {page, pageSize, search, orderBy, orderDirection,searchParams,searchColumn} =
            getPaginationParams(request);
        const categoryName = searchParams?.get("categoryName");
        const filters=categoryName?.toLowerCase()==='all'?[]:[
            {
                column: EnumTableColum.CATEGORY_NAME, // ✅ path to related table column
                operator:EnumOperator.in,
                value: [categoryName],
            },
        ]
        const selected=[
            EnumTableColum.ID,
            EnumTableColum.NAME,
            EnumTableColum.IMAGE,
            EnumTableColum.PRICE,
            EnumTableColum.DESCRIPTION,
            `${EnumTableColum.CATEGORY}:${EnumTableName.Category} ( ${EnumTableColum.NAME} ,${EnumTableColum.ID})`
        ];
        const result = await fetchPaginatedData(EnumTableName.FoodAndBeverage, {
            page,
            pageSize,
            orderBy,
            orderDirection,
            searchColumn,
            searchValue: search,
            selected:selected.join(","),
            filters,
            notNull: [EnumTableColum.CATEGORY], // ✅ ensures category is not null
        }).then(res=>{
            return {
                ...res,
                contents: res.contents.map((item : ANY) => ({
                    ...item,
                    category: item.category?.name ?? null, // <-- just take the name
                }))
            }
        });
        return Response.json(result);
    } catch (error) {
        console.error("Unexpected error:", error);
        return Response.json({error: "Internal Server Error"}, {status: 500});
    }
}