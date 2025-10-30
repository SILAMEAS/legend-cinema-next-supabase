"use client";
import {EnumSize} from "@/utils/enum/EnumSize";

export default function Loading({ className ,size=EnumSize.large}: Readonly<{ className?: string ,size?:EnumSize}>) {
    return (
        <div className={`flex items-center justify-center w-auto h-[100vh] gap-${size} ${className ?? ""}`}>
            <div className={`h-${size} w-${size} animate-bounce rounded-full bg-primary [animation-delay:-0.3s]`} />
            <div className={`h-${size} w-${size} animate-bounce rounded-full bg-primary [animation-delay:-0.15s]`} />
            <div className={`h-${size} w-${size} animate-bounce rounded-full bg-primary`} />
        </div>
    );
}
