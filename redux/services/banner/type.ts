import {baseColumn} from "@/utils/BaseColumn";
import {EnumTableColum} from "@/utils/enum/EnumTableColum";

export interface IBannerResponse extends baseColumn {
    [EnumTableColum.ID]:number,
    [EnumTableColum.IMAGE]:string,
    [EnumTableColum.ALT]:string,
    [EnumTableColum.LINK]:string,
    [EnumTableColum.ORDER]:number,
    [EnumTableColum.ACTIVE]:boolean

}