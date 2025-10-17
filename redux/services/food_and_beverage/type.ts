import {baseColumn} from "@/utils/api/supabase_tb/BaseColumn";
import {EnumTableColum} from "@/utils/enum/EnumTableColum";
import {IStatus} from "@/utils/commons/type";

export interface IFoodAndBeverageResponse extends baseColumn {
    [EnumTableColum.NAME]:string;
    [EnumTableColum.IMAGE]:string;
    [EnumTableColum.DESCRIPTION]:string;
    [EnumTableColum.PRICE]:number;
    [EnumTableColum.CATEGORY]:IStatus;
}