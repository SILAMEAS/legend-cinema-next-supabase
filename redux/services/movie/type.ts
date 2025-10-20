import {EnumTableColum} from "@/utils/enum/EnumTableColum";
import {IStatus} from "@/utils/commons/type";

export interface IMovieResponse{
    [EnumTableColum.ID]:number,
    [EnumTableColum.TITLE]:string,
    [EnumTableColum.IMAGE]:string,
    [EnumTableColum.RATING]:string,
    [EnumTableColum.DURATION]:string,
    [EnumTableColum.GENRE]:string,
    [EnumTableColum.RELEASE_DATE]?:string,
    [EnumTableColum.STATUS]?:IStatus,
    [EnumTableColum.DATE_SHOWING]:string,
}
export interface IMovieRecentResponse{
    [EnumTableColum.TITLE]:string,
    [EnumTableColum.STATUS]?:IStatus,
    [EnumTableColum.BOOKING]:number,
}

export interface ListDateShowingResponse {
    [EnumTableColum.DATE_SHOWING]:string,
}

