"use client"
import React from "react";

export default function LoadingSkeleton({ArrayLength=8,height}: {ArrayLength?:number,height?:number}): React.JSX.Element[] {
    return Array.from({length: ArrayLength}).map((_, idx) => (
        <div
            key={idx}
            className={`h-${height??40} bg-zinc-800 animate-pulse rounded-lg`}
        />
    ))
}
