import {EnumTableName} from "@/utils/enum/EnumTable";
import {_gets, _inserts} from "@/utils/api/__general";
import {_tb_food_and_beverage} from "@/utils/api/type-from-tb/_tb_food_and_beverage";

export async function _insertFoodAndBeverage<T extends _tb_food_and_beverage>(data: Array<T>) {
    return await _inserts<T>({tableName: EnumTableName.FoodAndBeverage, data})
}

export async function _getFoodAndBeverages() {
    return await _gets<Array<_tb_food_and_beverage>>({
        tableName: EnumTableName.FoodAndBeverage,
        select: `
      id,
      name,
      image,
      price,
      description,
      category:${EnumTableName.Category} ( name ,id)
    `
    });
}