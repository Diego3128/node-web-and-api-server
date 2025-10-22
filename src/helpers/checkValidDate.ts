export const checkValidDate = (dateInput: any) => {
    const date = new Date(dateInput);
    // check if it's a valid date object and not Invalid Date
    return Object.prototype.toString.call(date) === '[object Date]' && !Number.isNaN(date.valueOf())
}