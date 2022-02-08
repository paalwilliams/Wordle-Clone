export const storeSettingsInLocalStorage = (settings: any) => {
    localStorage.setItem('wordleCloneSettings', JSON.stringify(settings))
}

export const getSettingsFromLocalStorage = () => {
    const retrievedSettings = localStorage.getItem('wordleCloneSettings');
    let parsedSettings: any;
    if (retrievedSettings) {
        parsedSettings = JSON.parse(retrievedSettings);
        if (parsedSettings) {
            return parsedSettings
        }
    }
}

export const setDailyWordIndex = (index: number): void => {
    let existingSettings = getSettingsFromLocalStorage();
    existingSettings.dailyWordIndex = index;
    storeSettingsInLocalStorage(existingSettings);
}

export const enablePlayAgain = () => {
    let existingSettings = getSettingsFromLocalStorage();
    if (existingSettings.dailyWordChallenge) {
        existingSettings.dailyWordChallenge = false;
        storeSettingsInLocalStorage(existingSettings);
    }
    window.location.reload()

}