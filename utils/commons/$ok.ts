import {ANY} from "@/utils/commons/type";

export const $ok=(k:ANY)=>{
    return k!=null&&k!="null"&&k!="undefined";
}