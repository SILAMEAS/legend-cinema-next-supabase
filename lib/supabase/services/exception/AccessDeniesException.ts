

export const AccessDeniesException=()=>{
    return Response.json({
        status: 403,
        message:"AccessDenies",
    })
}