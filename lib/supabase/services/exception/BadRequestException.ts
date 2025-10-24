

export const BadRequestException=({message}:{message:string})=>{
    return Response.json({
        status: 400,
        message,
    })
}