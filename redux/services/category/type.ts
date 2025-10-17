import {baseColumn} from "@/utils/BaseColumn";
import {EnumTableColum} from "@/utils/enum/EnumTableColum";

export interface ICategoryResponse extends baseColumn {
    [EnumTableColum.NAME]: string;
}