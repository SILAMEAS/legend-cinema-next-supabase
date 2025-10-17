import {baseColumn} from "@/utils/BaseColumn";
import {EnumTableColum} from "@/utils/enum/EnumTableColum";

export interface IOfferResponse extends baseColumn{
    [EnumTableColum.TITLE]:string,
    [EnumTableColum.DESCRIPTION]:string,
    [EnumTableColum.IMAGE]:string,
    [EnumTableColum.VALID_UNTIL]:string,
    [EnumTableColum.DISCOUNT]?:string
}