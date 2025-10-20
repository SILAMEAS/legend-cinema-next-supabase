export const formatDate=(dateInput:string)=>{
    const date = new Date(dateInput);
    // Extract parts
    const weekday = date.toLocaleString("en-US", { weekday: "short" }); // Mon
    const day = date.getDate().toString().padStart(2, "0"); // 20
    const month = date.toLocaleString("en-US", { month: "short" }); // Oct
    return {
        weekday,
        day,
        month
    }
}