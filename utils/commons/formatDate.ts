export const formatDate = (dateInput: string) => {
    const date = new Date(dateInput);
    const now = new Date();

    // ✅ Compare year, month, and day
    const isToday =
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate();

    const weekday = date.toLocaleString("en-US", { weekday: "short" }); // Mon
    const day = date.getDate().toString().padStart(2, "0"); // 20
    const month = date.toLocaleString("en-US", { month: "short" }); // Oct

    return {
        weekday: isToday ? "Today" : weekday,
        day,
        month,
    };
};
export const compareDate = ({dateInput1,dateInput2}:{dateInput1:string,dateInput2:string}   ) => {
    const date1 = new Date(dateInput1);
    const date2 = new Date(dateInput2);
    // ✅ Compare year, month, and day
  return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();
};
export const fromDateToStartEndDate=(date:string)=>{
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    return {startOfDay:startOfDay.toISOString(),endOfDay:endOfDay.toISOString()}
}