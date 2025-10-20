"use client";
export default function Loading() {
    return (
        <div className="flex items-center justify-center w-[100vw] h-[100vh] gap-3">
            <div className="h-3 w-3 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
            <div className="h-3 w-3 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
            <div className="h-3 w-3 animate-bounce rounded-full bg-primary" />
        </div>
    )
}
