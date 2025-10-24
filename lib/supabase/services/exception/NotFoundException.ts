

export const NotFoundException=({message}:{message:string})=>{
    return Response.json({
        status: 404,
        message,
    })
}