import {baseColumn} from "@/utils/BaseColumn";
import React from "react";

export interface IDashboardResponse extends baseColumn{
    title:string,
    value:number,
    change:string,
    icon: string,
    color:string
}