import {baseColumn} from "@/utils/BaseColumn";
import {EnumTableColum} from "@/utils/enum/EnumTableColum";

export interface IBannerResponse extends baseColumn {
    [EnumTableColum.IMAGE]:string,
    [EnumTableColum.ALT]:string

}