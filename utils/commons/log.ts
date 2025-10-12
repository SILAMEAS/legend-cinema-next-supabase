import {EnumTableName} from "@/utils/enum/EnumTable";
import {EnumMethod} from "@/utils/enum/EnumMethod";
import {ANY} from "@/utils/commons/type";

export const logCallingAPI=(method:EnumMethod,name:string,from:EnumTableName,data:ANY)=>{
    console.log(`========== ${method} : <${name}> : ${from} `);
    if(data){
        console.log(`response : `);
        console.log(data)
    }
}