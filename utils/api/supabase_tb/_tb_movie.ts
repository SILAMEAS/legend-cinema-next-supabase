import {EnumTableColum} from "@/utils/enum/EnumTableColum";
import {IStatus} from "@/utils/commons/type";
export interface _tb_movie{
    [EnumTableColum.ID]:number,
    [EnumTableColum.TITLE]:string,
    [EnumTableColum.IMAGE]:string,
    [EnumTableColum.RATING]:string,
    [EnumTableColum.DURATION]:string,
    [EnumTableColum.GENRE]:string,
    [EnumTableColum.RELEASE_DATE]?:string,
    [EnumTableColum.STATUS]?:IStatus,
}
