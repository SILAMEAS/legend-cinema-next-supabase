import {baseColumn} from "@/utils/BaseColumn";
import {EnumTableColum} from "@/utils/enum/EnumTableColum";
import {IStatus} from "@/utils/commons/type";

export interface IFoodAndBeverageResponse extends baseColumn {
    [EnumTableColum.NAME]:string;
    [EnumTableColum.IMAGE]:string;
    [EnumTableColum.DESCRIPTION]:string;
    [EnumTableColum.PRICE]:number;
    [EnumTableColum.CATEGORY]:IStatus;
}