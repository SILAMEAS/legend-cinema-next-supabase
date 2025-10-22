import {IUserResponse} from "@/redux/services/user/type";

export interface IMovieRedux{
    search?:string;
}

export type IUserRedux = IUserResponse;

export interface ICinemaRedux{
    selected?:string,
    listCinemas?:Array<string>
}