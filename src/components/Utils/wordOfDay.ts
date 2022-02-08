export const getWordOfDayIndex = () => {
    var date1 = new Date("01/01/2022");
    var date2 = new Date();

    // To calculate the time difference of two dates
    var difTime = date2.getTime() - date1.getTime();
    // To calculate the no. of days between two dates
    var difDays = difTime / (1000 * 3600 * 24);
    return Math.round(difDays);
}

export const getWordListBasedOnDifficulty = (hardMode: boolean) => {
    if (hardMode) {
        return "sevenLetters"
    }
    return "fiveLetters"
}