export const setDailyWord = (word: string) => {
    localStorage.setItem('word', word);
}

export const getDailyWord = (): (string | null) => {
    let word = localStorage.getItem('word');
    return word;
}