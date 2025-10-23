import {EnumTableColum} from "@/utils/enum/EnumTableColum";
import {IStatus} from "@/utils/commons/type";

export interface IMovieResponse{
    [EnumTableColum.ID]:number|null,
    [EnumTableColum.TITLE]:string,
    [EnumTableColum.IMAGE]:string|File|null,
    [EnumTableColum.RATING]:string,
    [EnumTableColum.DURATION]:string,
    [EnumTableColum.GENRE]:string,
    [EnumTableColum.RELEASE_DATE]?:string,
    [EnumTableColum.STATUS]:IStatus|string,
    [EnumTableColum.DATE_SHOWING]?:string,
    [EnumTableColum.DIRECTOR]:string,
    [EnumTableColum.CAST]:string,
    [EnumTableColum.SYNOPSIS]:string,
    [EnumTableColum.TRAILER]:string
}
export interface IMovieRecentResponse{
    [EnumTableColum.TITLE]:string,
    [EnumTableColum.STATUS]?:IStatus,
    [EnumTableColum.BOOKING]:number,
}

export interface ListDateShowingResponse {
    [EnumTableColum.DATE_SHOWING]:string,
}

export const MovieFormData = (movie: IMovieResponse): FormData => {
    const fd = new FormData();

    (Object.values(EnumTableColum) as (keyof IMovieResponse)[]).forEach((key) => {
        const value = movie[key];

        if (value !== null && value !== undefined) {
            if (value instanceof File) {
                fd.append(key, value);
            } else {
                fd.append(key, String(value));
            }
        }
    });

    return fd;
};
