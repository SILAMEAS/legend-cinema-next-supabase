import {_tb_base} from "@/utils/api/supabase_tb/_tb_base";
import {EnumTableColum} from "@/utils/enum/EnumTableColum";
import {IStatus} from "@/utils/commons/type";

export interface _tb_food_and_beverage extends _tb_base {
   [EnumTableColum.NAME]:string;
    [EnumTableColum.IMAGE]:string;
    [EnumTableColum.DESCRIPTION]:string;
    [EnumTableColum.PRICE]:number;
    [EnumTableColum.CATEGORY]:IStatus;
}