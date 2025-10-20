import {IUserResponse} from "@/redux/services/user/type";

export interface IMovieRedux{
    search?:string;
}

export interface IUserRedux extends IUserResponse{}