import {EnumTableName} from "@/utils/enum/EnumTable";

export const logCallingAPI=(name:string,from:EnumTableName)=>{
    console.log("=====================================================================");
    console.log("__________________ ",name," calling from ", from);
    console.log("=====================================================================");
}