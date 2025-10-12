import {EnumTableName} from "@/utils/enum/EnumTable";
import {_gets, _inserts} from "@/utils/api/__general";
import {_tb_food_and_beverage} from "@/utils/api/supabase_tb/_tb_food_and_beverage";
import {EnumTableColum} from "@/utils/enum/EnumTableColum";
import {EnumOperator} from "@/utils/enum/EnumOperator";

export async function _insertFoodAndBeverage<T extends _tb_food_and_beverage>(data: Array<T>) {
    return await _inserts<T>({tableName: EnumTableName.FoodAndBeverage, data})
}

export async function _getFoodAndBeverages(categoryName:string) {
    const filters=categoryName.toLowerCase()==='all'?[]:[
        {
            column: EnumTableColum.CATEGORY_NAME, // ✅ path to related table column
            operator:EnumOperator.in,
            value: [categoryName],
        },
    ]
    return await _gets<Array<_tb_food_and_beverage>>({
        tableName: EnumTableName.FoodAndBeverage,
        select: `
      ${EnumTableColum.ID},
      ${EnumTableColum.NAME},
      ${EnumTableColum.IMAGE},
      ${EnumTableColum.PRICE},
      ${EnumTableColum.DESCRIPTION},
      ${EnumTableColum.CATEGORY}:${EnumTableName.Category} ( ${EnumTableColum.NAME} ,${EnumTableColum.ID})
    `,
        filters,
        notNull: [EnumTableColum.CATEGORY], // ✅ ensures category is not null
    });
}