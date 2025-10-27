import {EnumSupabseColumn, EnumTableColum} from "@/utils/enum/EnumTableColum";
import {ANY, IStatus} from "@/utils/commons/type";

export interface IMovieResponse {
    [EnumTableColum.ID]: number | null,
    [EnumTableColum.TITLE]: string,
    [EnumTableColum.IMAGE]: string | File | null,
    [EnumTableColum.RATING]: string,
    [EnumTableColum.DURATION]: string,
    [EnumTableColum.GENRE]: string,
    [EnumTableColum.RELEASE_DATE]?: string,
    [EnumTableColum.STATUS]: IStatus,
    [EnumTableColum.DATE_SHOWING]?: string,
    [EnumTableColum.DIRECTOR]: string,
    [EnumTableColum.CAST]: string,
    [EnumTableColum.SYNOPSIS]: string,
    [EnumTableColum.TRAILER]:string,
    [EnumTableColum.CINEMA]: IStatus,
}

export interface IMovieRecentResponse {
    [EnumTableColum.TITLE]: string,
    [EnumTableColum.STATUS]?: IStatus,
    [EnumTableColum.BOOKING]: number,
}

export interface ListDateShowingResponse {
    [EnumTableColum.DATE_SHOWING]: string,
}


export const ConvertFromObjToFormData = <T extends Record<string, ANY>>(data: T): FormData => {
    const fd = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        if (value === null || value === undefined) return;

        // ✅ Handle single File
        if (value instanceof File) {
            fd.append(key, value);
        }
        // ✅ Handle FileList
        else if (value instanceof FileList) {
            Array.from(value).forEach((file) => fd.append(key, file));
        }
        // ✅ Handle Date
        else if (value instanceof Date) {
            fd.append(key, value.toISOString());
        }
        // ✅ Handle object/array (stringify to JSON)
        else if (typeof value === "object") {
            fd.append(key, JSON.stringify(value));
        }
        // ✅ Handle string, number, boolean
        else {
            fd.append(key, String(value));
        }
    });

    return fd;
};


export interface IMovieRequest {
    [EnumTableColum.IMAGE]: File|null,
    [EnumTableColum.TITLE]: string,
    [EnumTableColum.GENRE]: string,
    [EnumTableColum.DURATION]: string,
    [EnumTableColum.RATING]: string,
    [EnumTableColum.RELEASE_DATE]: string,
    [EnumTableColum.DIRECTOR]: string,
    [EnumTableColum.CAST]: string,
    [EnumTableColum.SYNOPSIS]: string,
    [EnumTableColum.TRAILER]: string,

    [EnumSupabseColumn.MOVIE_STATUS_ID]: number|null;
    [EnumSupabseColumn.CINEMA_ID]: number|null;
}