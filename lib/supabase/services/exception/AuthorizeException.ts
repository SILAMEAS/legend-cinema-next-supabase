

export const AuthorizeException=({message}:{message:string})=>{
    return Response.json({
        status: 401,
        message,
    })
}