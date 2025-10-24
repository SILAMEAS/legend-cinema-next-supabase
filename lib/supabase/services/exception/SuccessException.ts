import {ANY} from "@/utils/commons/type";


export const SuccessException=({message,data={}}:{message:string,data?:ANY})=>{
    return Response.json({
        status: 200,
        message,
        data
    })
}